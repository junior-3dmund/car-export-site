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

export async function GET() {
  const items = await readNotifications();
  return NextResponse.json(items);
}

export async function POST(request) {
  // Allow either an ADMIN_API_KEY via header, or a valid Supabase access token
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = request.headers.get("x-admin-key");
  if (adminKey && provided === adminKey) {
    // allowed
  } else {
    // try Supabase token
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
  const items = await readNotifications();

  const id = Date.now().toString();
  const newItem = {
    id,
    title: body.title || "Admin notice",
    message: body.message || "",
    timestamp: new Date().toISOString(),
    read: false
  };

  items.unshift(newItem);
  await writeNotifications(items);

  return NextResponse.json(newItem, { status: 201 });
}
