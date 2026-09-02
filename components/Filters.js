"use client";

import { useState } from "react";

export default function Filters({ filters, brands }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xl font-bold">Filters</h2>
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className="md:hidden bg-steel2 text-silver px-3 py-2 rounded-sm"
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"}
        </button>
      </div>

      <div className={`${open ? "block" : "hidden"} md:block`}>
        <form className="grid sm:grid-cols-5 gap-3 mb-4 bg-steel border border-steel2 p-4 rounded-sm">
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Search model"
            className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm sm:col-span-2 w-full"
          />
          <select
            name="brand"
            defaultValue={filters.brand}
            className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm w-full"
          >
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <input
            name="minPrice"
            type="number"
            placeholder="Min price"
            defaultValue={filters.minPrice || ""}
            className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm w-full"
          />
          <input
            name="maxPrice"
            type="number"
            placeholder="Max price"
            defaultValue={filters.maxPrice || ""}
            className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm w-full"
          />
          <button className="sm:col-span-5 bg-ignition text-charcoal font-medium rounded-sm py-2 hover:brightness-110 transition w-full sm:w-auto">
            Apply filters
          </button>
        </form>
      </div>
    </div>
  );
}
