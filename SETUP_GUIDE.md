
# Codestarix — Supabase & Webhook Setup Guide

> Complete instructions to connect your Codestarix waitlist to **Supabase** (primary database) and a **Google Sheets Webhook** (backup).

---

## Table of Contents

1. [Supabase Setup](#1-supabase-setup)
2. [Google Sheets Webhook Setup](#2-google-sheets-webhook-setup)
3. [Environment Variables (.env.local)](#3-environment-variables)
4. [Phone Field Format (International)](#4-phone-field-format)
5. [How the Data Flow Works](#5-data-flow)

---

## 1. Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Click **"New Project"**, choose an org, name it (e.g. `codestarix`), set a DB password, pick a region.
3. Wait for provisioning (~2 min).

### 1.2 Create the `waitlist_entries` Table

Go to **SQL Editor** in the Supabase dashboard and run this:

```sql
-- Create the waitlist entries table
CREATE TABLE public.waitlist_entries (
  id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT DEFAULT '',          -- Stores full international format, e.g. "+14155551234" or ""
  referral_code TEXT NOT NULL,
  referred_by   TEXT,
  source        TEXT DEFAULT 'organic'    -- "organic" or "referral"
);

-- Unique constraint on email to prevent double sign-ups
ALTER TABLE public.waitlist_entries
  ADD CONSTRAINT waitlist_entries_email_unique UNIQUE (email);

-- Index for fast referral code lookups
CREATE INDEX idx_waitlist_referral_code ON public.waitlist_entries (referral_code);
```

### 1.3 Enable Row Level Security (RLS)

Still in the SQL Editor, run:

```sql
-- Enable RLS on the table
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (the website uses the anon key)
CREATE POLICY "Allow anonymous inserts"
  ON public.waitlist_entries
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Block anonymous reads/updates/deletes (only you can view data via dashboard)
-- No SELECT/UPDATE/DELETE policies = denied by default with RLS enabled
```

> **Why?** The anon key is exposed in the browser. RLS ensures visitors can _only_ insert rows — they cannot read, modify, or delete other entries.

### 1.4 Get Your API Keys

1. Go to **Settings → API** in the Supabase dashboard.
2. Copy:
   - **Project URL** → e.g. `https://abcdefghij.supabase.co`
   - **Anon (public) key** → starts with `eyJ...`

You'll paste these into `.env.local` (see [Section 3](#3-environment-variables)).

---

## 2. Google Sheets Webhook Setup

This is a **backup layer** — every waitlist sign-up also gets POSTed to a Google Sheet so you have a copy outside Supabase.

### 2.1 Create the Google Sheet

1. Create a new Google Sheet (e.g. "Codestarix Waitlist Backup").
2. In **Row 1**, set these headers (exact names):

| A | B | C | D | E |
|---|---|---|---|---|
| `name` | `email` | `phone` | `referralCode` | `createdAt` |

### 2.2 Create the Apps Script Web App

1. In your Google Sheet, go to **Extensions → Apps Script**.
2. Replace the default code with:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.name        || "",
      data.email       || "",
      data.phone       || "",    // Full international format, e.g. "+919876543210" or ""
      data.referralCode || "",
      data.createdAt   || new Date().toISOString()
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Deploy → New Deployment**.
4. Set type to **Web App**.
5. Set:
   - **Execute as**: Me
   - **Who has access**: Anyone
6. Click **Deploy** and copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### 2.3 Important Notes

- The webhook runs in **`no-cors`** mode from the browser, so the response isn't readable — but the data still arrives in the Sheet.
- Webhook failures are caught silently and **never block** the main Supabase submission.
- The `phone` field now stores the full international number (e.g. `+14155551234`) or an empty string if the user skipped it.

---

## 3. Environment Variables

Create or update the file **`.env.local`** in the project root:

```env
# ─── Supabase ───────────────────────────────────────────
# From: Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ─── Google Sheets Webhook ──────────────────────────────
# From: Apps Script → Deploy → Web App URL
NEXT_PUBLIC_WAITLIST_WEBHOOK=https://script.google.com/macros/s/AKfycb.../exec
```

> ⚠️ **Both values use `NEXT_PUBLIC_` prefix** because they run in the browser. This is safe because:
> - The Supabase anon key is designed to be public (RLS protects data).
> - The webhook URL only accepts POST inserts.

### Fallback Mode (No Keys)

If Supabase keys are missing or set to placeholder values, the app automatically falls back to an **in-memory mock database** for demo/development purposes. The UI works identically — data just isn't persisted.

---

## 4. Phone Field Format

### What Changed

The phone field was updated from India-only (`+91` hardcoded) to **international support** with these improvements:

| Before | After |
|--------|-------|
| Hardcoded `+91` prefix | Dropdown with **240+ countries** (India as default) |
| Required field | **Optional** field (labeled with "optional" badge) |
| Indian regex validation | Flexible 4–15 digit validation |
| Stored as raw digits | Stored as full international format: `+{code}{number}` |

### Data Format in Supabase / Google Sheets

The `phone` column now stores the **full E.164-style string**:

| User Input | Country Code Selected | Stored Value |
|---|---|---|
| `9876543210` | `+91` (India) | `+919876543210` |
| `4155551234` | `+1` (US) | `+14155551234` |
| `7911123456` | `+44` (UK) | `+447911123456` |
| _(left empty)_ | _(any)_ | `""` (empty string) |

### Updating an Existing Table

If you already have data in the `waitlist_entries` table and want to migrate old Indian-only phone numbers:

```sql
-- Prepend +91 to old 10-digit Indian numbers that don't have a country code
UPDATE public.waitlist_entries
SET phone = '+91' || phone
WHERE phone ~ '^\d{10}$'
  AND phone NOT LIKE '+%';
```

---

## 5. Data Flow

```
┌─────────────────────────────────────────────────┐
│              User fills Waitlist Form            │
│  (Name, Email, Optional Phone + Country Code)    │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
              ┌────────────────┐
              │  Form Submit   │
              │  (onSubmit)    │
              └───┬────────┬───┘
                  │        │
        ┌─────────▼──┐  ┌──▼──────────┐
        │  Supabase  │  │  Webhook    │
        │  INSERT    │  │  POST       │
        │ (primary)  │  │ (backup)    │
        └─────┬──────┘  └──┬──────────┘
              │             │
              ▼             ▼
        ┌──────────┐  ┌──────────────┐
        │ Postgres │  │ Google Sheet  │
        │   Row    │  │    Row       │
        └──────────┘  └──────────────┘
```

### Error Handling

| Scenario | Behavior |
|----------|----------|
| Supabase keys missing | Falls back to in-memory mock DB |
| Duplicate email | Shows "Already registered" error |
| Webhook URL missing | Silently skips backup (logged to console) |
| Webhook fails | Silently caught — main submission succeeds |
| Network error | Shows generic error message |

---

## Quick Start Checklist

- [ ] Create Supabase project & run the SQL to create `waitlist_entries` table
- [ ] Enable RLS and create the anonymous insert policy
- [ ] Copy **Project URL** and **Anon Key** from Supabase dashboard
- [ ] Create Google Sheet with headers: `name`, `email`, `phone`, `referralCode`, `createdAt`
- [ ] Deploy the Apps Script Web App and copy the URL
- [ ] Paste all three values into `.env.local`
- [ ] Run `npm run dev` and test a submission
- [ ] Verify the row appears in both Supabase and the Google Sheet
