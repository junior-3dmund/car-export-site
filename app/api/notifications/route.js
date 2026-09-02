import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) return NextResponse.json({ error: "admin key not configured" }, { status: 500 });

  const provided = request.headers.get("x-admin-key");
  if (provided !== adminKey) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

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
