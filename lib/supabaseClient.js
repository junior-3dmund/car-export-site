import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const isValidSupabaseConfig =
  !!supabaseUrl &&
  !!supabaseAnonKey &&
  !supabaseUrl.includes("xxxxx") &&
  !supabaseAnonKey.includes("xxxxx");

// Public client — safe to use in the browser, read-only access enforced by
// Row Level Security policies (see README for the exact policies to set).
export const supabase = isValidSupabaseConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
