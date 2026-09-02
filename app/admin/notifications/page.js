"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [adminKey, setAdminKey] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('adminKey') || '' : '');
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ title, message })
      });

      if (res.ok) {
        setStatus("sent");
        setTitle("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Admin — Send Notification</h1>
        <p className="text-silver text-sm mt-2">Create an admin notice to show to users.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-steel border border-steel2 p-6 rounded-sm">
        <label className="block">
          <span className="block text-sm text-silver mb-2">Admin API Key</span>
          <input
            value={adminKey}
            onChange={(e) => { setAdminKey(e.target.value); try { localStorage.setItem('adminKey', e.target.value); } catch {} }}
            required
            type="password"
            className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm"
            placeholder="Enter admin API key"
          />
        </label>
        <label className="block">
          <span className="block text-sm text-silver mb-2">Title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm"
            placeholder="Short title"
          />
        </label>

        <label className="block">
          <span className="block text-sm text-silver mb-2">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm"
            placeholder="Detailed message for users"
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-ignition text-charcoal font-medium px-4 py-2 rounded-sm hover:brightness-110 transition disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Publish notice"}
          </button>

          {status === "sent" && <div className="text-ignition text-sm">Notice published.</div>}
          {status === "error" && <div className="text-red-400 text-sm">Failed to publish.</div>}
        </div>
      </form>

      <div className="mt-6 text-sm text-silver">
        <p>Note: This admin page is not authenticated. Restrict access or secure the API in production.</p>
        <p className="mt-2">Back to <Link href="/admin" className="text-ignition">admin</Link></p>
      </div>
    </main>
  );
}
