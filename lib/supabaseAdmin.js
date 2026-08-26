import { createClient } from "@supabase/supabase-js";

// This client uses the SERVICE ROLE key and must NEVER be imported into
// any file that ships to the browser. Only use it inside app/api/* routes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const isValidSupabaseConfig =
  !!supabaseUrl &&
  !!serviceRoleKey &&
  !supabaseUrl.includes("xxxxx") &&
  !serviceRoleKey.includes("xxxxx");

export const supabaseAdmin = isValidSupabaseConfig
  ? createClient(supabaseUrl, serviceRoleKey)
  : null;
