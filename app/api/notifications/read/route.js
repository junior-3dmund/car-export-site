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

export async function POST(request) {
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
