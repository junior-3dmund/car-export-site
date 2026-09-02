"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-steel2 bg-charcoal/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          Kingdom AutoMobile <span className="text-ignition">Dealership</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-silver">
          <Link href="/cars" className="hover:text-offwhite transition-colors">
            Inventory
          </Link>
          <Link href="/contact" className="hover:text-offwhite transition-colors">
            Contact
          </Link>
          <Link
            href="/cars"
            className="bg-ignition text-charcoal font-medium px-4 py-2 rounded-sm hover:brightness-110 transition"
          >
            Browse cars
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="p-2 rounded-sm bg-steel2 text-silver"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal border-t border-steel2">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 text-silver">
            <Link href="/cars" onClick={() => setOpen(false)} className="py-2 hover:text-offwhite">
              Inventory
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="py-2 hover:text-offwhite">
              Contact
            </Link>
            <Link
              href="/cars"
              onClick={() => setOpen(false)}
              className="bg-ignition text-charcoal font-medium px-4 py-2 rounded-sm w-max hover:brightness-110 transition"
            >
              Browse cars
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
