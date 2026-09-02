import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminByUserId, isAdminByEmail } from "@/lib/admins";

const filePath = path.join(process.cwd(), "data", "notifications.json");

async function readNotifications() {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    return [];
  }
}

async function writeNotifications(data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function POST(request) {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = request.headers.get("x-admin-key");
  if (adminKey && provided === adminKey) {
    // allowed
  } else {
    const auth = request.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ") || !supabaseAdmin) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    try {
      const { data } = await supabaseAdmin.auth.getUser(token);
      const user = data?.user;
      if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      const admin = await isAdminByUserId(user.id) || await isAdminByEmail(user.email);
      if (!admin) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    } catch (e) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const body = await request.json();
  const { id } = body;

  if (supabaseAdmin) {
    try {
      if (id == null) {
        // mark all as read
        const { error } = await supabaseAdmin.from("notifications").update({ read: true }).neq("id", "");
        if (error) throw error;
        return NextResponse.json({ ok: true });
      }
      const { data, error } = await supabaseAdmin.from("notifications").update({ read: true }).eq("id", id).select().single();
      if (error) return NextResponse.json({ ok: false }, { status: 404 });
      return NextResponse.json({ ok: true });
    } catch (e) {
      console.error('Supabase update failed:', e.message || e);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  const { id: _id } = body;
  const items = await readNotifications();
  let changed = false;

  const updated = items.map((it) => {
    if (_id == null) return { ...it, read: true };
    if (it.id === _id) {
      changed = true;
      return { ...it, read: true };
    }
    return it;
  });

  if (changed || _id == null) {
    await writeNotifications(updated);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 404 });
}
