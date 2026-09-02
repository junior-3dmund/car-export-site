import { supabaseAdmin } from "./supabaseAdmin";

export async function isAdminByUserId(userId) {
  if (!supabaseAdmin || !userId) return false;
  try {
    const { data, error } = await supabaseAdmin.from("admins").select("user_id").eq("user_id", userId).limit(1).maybeSingle();
    return !!data;
  } catch (e) {
    return false;
  }
}

export async function isAdminByEmail(email) {
  if (!supabaseAdmin || !email) return false;
  try {
    const { data, error } = await supabaseAdmin.from("admins").select("email").eq("email", email).limit(1).maybeSingle();
    return !!data;
  } catch (e) {
    return false;
  }
}
