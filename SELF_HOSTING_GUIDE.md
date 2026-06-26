# How to Host Codestarix on Your Own Machine

Since we've hit the Vercel deployment limit for today, you can easily host the project on your own computer. This guide will show you how to run the production build locally.

---

## Prerequisites

Ensure you have the following installed on your machine:
*   **Node.js** (v18 or higher recommended)
*   **pnpm** (Install via `npm install -g pnpm`)

---

## Option 1: Quick Hosting (Production Build)

This is the best way to run the site as it would appear on Vercel.

1.  **Open your terminal** and navigate to the project folder.
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Build the project:**
    ```bash
    pnpm --filter @workspace/codestarix run build
    ```
4.  **Serve the production build:**
    We'll use a simple static server called `serve`.
    ```bash
    npx serve -s artifacts/codestarix/dist/public
    ```
5.  **Access the site:**
    Open your browser and go to `http://localhost:3000`. All routes (like `/about`) will work correctly!

---

## Option 2: Development Mode

Use this if you want to make changes to the code and see them update instantly.

1.  **Navigate to the app directory:**
    ```bash
    cd artifacts/codestarix
    ```
2.  **Start the dev server:**
    ```bash
    pnpm dev
    ```
3.  **Access the site:**
    Open your browser and go to `http://localhost:5173`.

---

## Troubleshooting SPA Routing (The 404 Issue)

When hosting on your own machine using `npx serve -s`, the `-s` flag (single) automatically handles the rewrite rules we added to `vercel.json`. This ensures that navigating directly to `/about` will not result in a 404 error.

---

## Environment Variables

If the application requires Supabase or other services, make sure to create a `.env` file in `artifacts/codestarix/` with the following content:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

**You're all set! Your project is now running locally on your machine.**
