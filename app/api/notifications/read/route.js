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
  const items = await readNotifications();
  let changed = false;

  const updated = items.map((it) => {
    if (id == null) return { ...it, read: true };
    if (it.id === id) {
      changed = true;
      return { ...it, read: true };
    }
    return it;
  });

  if (changed || id == null) {
    await writeNotifications(updated);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 404 });
}
