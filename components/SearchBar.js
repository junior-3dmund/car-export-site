"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") || "");

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }
    router.push(`/cars?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        type="text"
        placeholder="Search by model — e.g. Land Cruiser"
        className="flex-1 bg-steel border border-steel2 rounded-sm px-4 py-3 text-sm placeholder:text-silver focus:border-ignition outline-none"
      />
      <button
        type="submit"
        className="bg-ignition text-charcoal font-medium px-6 rounded-sm hover:brightness-110 transition"
      >
        Search
      </button>
    </form>
  );
}
