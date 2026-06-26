import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://tdbpialntxtdofqirsfj.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_3g59OncFH5WFNr7BSGyCNg_Zzq1Tjb2";

// Export a flag to check if Supabase is properly configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Custom mock DB layer to support safe demonstration if keys are missing
export interface WaitlistEntry {
  name: string;
  email: string;
  phone: string;
  source?: string;
  referral_code: string;
  referred_by?: string;
}

export const mockWaitlistDb = {
  entries: [] as WaitlistEntry[],
  insert: async (entry: WaitlistEntry) => {
    // Check if email already exists
    const exists = mockWaitlistDb.entries.some(e => e.email === entry.email);
    if (exists) {
      throw new Error("Email already registered on waitlist");
    }
    mockWaitlistDb.entries.push(entry);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { data: entry, error: null };
  }
};

// Initialize the real client only if variables are active
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
