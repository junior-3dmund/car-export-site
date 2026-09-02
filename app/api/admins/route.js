import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminByUserId, isAdminByEmail } from "@/lib/admins";

async function checkAdmin(request) {
  // Allow ADMIN_API_KEY via x-admin-key header
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = request.headers.get("x-admin-key");
  if (adminKey && provided === adminKey) return { ok: true, user: null };

  // Otherwise require Authorization: Bearer <supabase_token> and membership in admins table
  const auth = request.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ") || !supabaseAdmin) return { ok: false };
  const token = auth.split(" ")[1];
  try {
    const { data } = await supabaseAdmin.auth.getUser(token);
    const user = data?.user;
    if (!user) return { ok: false };
    const admin = await isAdminByUserId(user.id) || await isAdminByEmail(user.email);
    return { ok: !!admin, user };
  } catch (e) {
    return { ok: false };
  }
}

export async function GET(request) {
  const allowed = await checkAdmin(request);
  if (!allowed.ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!supabaseAdmin) return NextResponse.json({ error: "supabase not configured" }, { status: 500 });

  const { data, error } = await supabaseAdmin.from("admins").select("id, user_id, email, role, created_at").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const allowed = await checkAdmin(request);
  if (!allowed.ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!supabaseAdmin) return NextResponse.json({ error: "supabase not configured" }, { status: 500 });

  const body = await request.json();
  const { email, user_id, role } = body;
  if (!email && !user_id) return NextResponse.json({ error: "email or user_id required" }, { status: 400 });

  const payload = { email: email || null, user_id: user_id || null, role: role || "admin" };
  const { data, error } = await supabaseAdmin.from("admins").insert([payload]).select().maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request) {
  const allowed = await checkAdmin(request);
  if (!allowed.ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!supabaseAdmin) return NextResponse.json({ error: "supabase not configured" }, { status: 500 });

  const body = await request.json();
  const { id, email, user_id } = body;
  if (!id && !email && !user_id) return NextResponse.json({ error: "id, email or user_id required" }, { status: 400 });

  let query = supabaseAdmin.from("admins");
  if (id) query = query.delete().eq("id", id);
  else if (email) query = query.delete().eq("email", email);
  else query = query.delete().eq("user_id", user_id);

  const { data, error } = await query.select().maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
