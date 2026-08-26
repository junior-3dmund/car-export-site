"use client";

import { useState } from "react";

export default function InquiryForm({ carId, carName }) {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.target);
    const payload = {
      carId,
      carName,
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message")
    };

    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(res.ok ? "sent" : "error");
  }

  if (status === "sent") {
    return <p className="text-ignition text-sm">Thanks — we'll be in touch shortly.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name"
        required
        placeholder="Your name"
        className="w-full bg-steel border border-steel2 rounded-sm px-3 py-2 text-sm"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="w-full bg-steel border border-steel2 rounded-sm px-3 py-2 text-sm"
      />
      <textarea
        name="message"
        rows={3}
        placeholder={`I'm interested in the ${carName}...`}
        className="w-full bg-steel border border-steel2 rounded-sm px-3 py-2 text-sm"
      />
      <button
        disabled={status === "sending"}
        className="bg-ignition text-charcoal font-medium px-5 py-2 rounded-sm hover:brightness-110 transition disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send inquiry"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong — try again.</p>
      )}
    </form>
  );
}
