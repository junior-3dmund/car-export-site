import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-steel2 bg-charcoal/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          Route One <span className="text-ignition">Motors</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-silver">
          <Link href="/cars" className="hover:text-offwhite transition-colors">
            Inventory
          </Link>
          <Link href="/#contact" className="hover:text-offwhite transition-colors">
            Contact
          </Link>
          <Link
            href="/cars"
            className="bg-ignition text-charcoal font-medium px-4 py-2 rounded-sm hover:brightness-110 transition"
          >
            Browse cars
          </Link>
        </nav>
      </div>
    </header>
  );
}
