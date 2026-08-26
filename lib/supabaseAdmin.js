import { createClient } from "@supabase/supabase-js";

// This client uses the SERVICE ROLE key and must NEVER be imported into
// any file that ships to the browser. Only use it inside app/api/* routes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin =
  supabaseUrl && serviceRoleKey ? createClient(supabaseUrl, serviceRoleKey) : null;
