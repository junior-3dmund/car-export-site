"use client";

import { useState } from "react";

const FIELDS = [
  "name",
  "brand",
  "year",
  "price",
  "mileage",
  "fuel",
  "transmission",
  "origin_port",
  "image",
  "description"
];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState("idle");

  async function handleAdd(e) {
    e.preventDefault();
    setStatus("saving");
    const form = new FormData(e.target);
    const car = Object.fromEntries(FIELDS.map((f) => [f, form.get(f)]));

    const res = await fetch("/api/admin/cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, car })
    });

    setStatus(res.ok ? "saved" : "error");
    if (res.ok) e.target.reset();
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24">
        <h1 className="font-display text-2xl font-bold mb-4">Admin</h1>
        <input
          type="password"
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-steel border border-steel2 rounded-sm px-3 py-2 text-sm mb-3"
        />
        <button
          onClick={() => setUnlocked(true)}
          className="bg-ignition text-charcoal font-medium px-5 py-2 rounded-sm"
        >
          Enter
        </button>
        <p className="text-silver text-xs mt-4">
          This is a placeholder gate for local/staging use only — swap for
          real auth (Clerk or Supabase Auth) before going live. See README.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-display text-2xl font-bold mb-6">Add a car</h1>
      <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-3">
        {FIELDS.map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            required={["name", "brand", "year", "price", "image"].includes(field)}
            className="bg-steel border border-steel2 rounded-sm px-3 py-2 text-sm sm:col-span-1"
          />
        ))}
        <button className="sm:col-span-2 bg-ignition text-charcoal font-medium py-2 rounded-sm">
          {status === "saving" ? "Saving..." : "Add car"}
        </button>
        {status === "saved" && (
          <p className="text-ignition text-sm sm:col-span-2">Car added.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm sm:col-span-2">
            Failed — check the password and required fields.
          </p>
        )}
      </form>
    </div>
  );
}
