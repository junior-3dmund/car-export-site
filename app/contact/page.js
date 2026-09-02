"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const form = new FormData(e.target);
    const payload = {
      fullName: form.get("fullName"),
      email: form.get("email"),
      phone: form.get("phone"),
      carType: form.get("carType"),
      message: form.get("message")
    };

    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(res.ok ? "sent" : "error");
    if (res.ok) e.target.reset();
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-ignition text-sm uppercase tracking-[0.2em]">Contact</p>
        <h1 className="font-display text-4xl font-bold mt-3 text-center md:text-left">Send us a message</h1>
      </div>

      {status === "sent" ? (
        <div className="rounded-sm border border-ignition/50 bg-steel p-6 text-ignition">
          Thanks — your message has been sent successfully. We will contact you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-sm border border-steel2 bg-steel p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-silver">Full name</span>
              <input
                name="fullName"
                required
                className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-3 text-sm outline-none focus:border-ignition"
                placeholder="Enter your full name"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-silver">Email</span>
              <input
                name="email"
                type="email"
                required
                className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-3 text-sm outline-none focus:border-ignition"
                placeholder="you@example.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-silver">Phone number</span>
              <input
                name="phone"
                type="tel"
                required
                className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-3 text-sm outline-none focus:border-ignition"
                placeholder="+233 55 188 9899"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-silver">Car type / vehicle wanted</span>
              <input
                name="carType"
                required
                className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-3 text-sm outline-none focus:border-ignition"
                placeholder="e.g. Toyota Corolla, SUV, pickup truck"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm text-silver">Message</span>
            <textarea
              name="message"
              rows={6}
              required
              className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-3 text-sm outline-none focus:border-ignition"
              placeholder="Tell us what car you want, your preferred budget, or any other details..."
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-ignition text-charcoal font-medium px-6 py-3 rounded-sm hover:brightness-110 transition disabled:opacity-60 w-full md:w-auto"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </main>
  );
}
