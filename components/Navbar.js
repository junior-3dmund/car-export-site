"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (mounted) setNotifications(data);
      } catch (e) {
        // ignore
      }
    }

    load();
    const id = setInterval(load, 30000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  "use client";

  import { useState, useEffect } from "react";
  import Link from "next/link";

  export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      let mounted = true;

      async function load() {
        try {
          const res = await fetch("/api/notifications");
          const data = await res.json();
          if (mounted) setNotifications(Array.isArray(data) ? data : []);
        } catch (e) {
          // ignore
        }
      }

      load();
      const id = setInterval(load, 30000);
      return () => {
        mounted = false;
        "use client";

        import { useState, useEffect } from "react";
        import Link from "next/link";

        export default function Navbar() {
          const [open, setOpen] = useState(false);
          const [notifOpen, setNotifOpen] = useState(false);
          const [notifications, setNotifications] = useState([]);

          useEffect(() => {
            let mounted = true;

            async function load() {
              try {
                const res = await fetch("/api/notifications");
                const data = await res.json();
                if (mounted) setNotifications(Array.isArray(data) ? data : []);
              } catch (e) {
                // ignore
              }
            }

            load();
            const id = setInterval(load, 30000);
            return () => {
              mounted = false;
              clearInterval(id);
            };
          }, []);

          const unreadCount = notifications.filter((n) => !n.read).length;

          async function markRead(id) {
            try {
              await fetch("/api/notifications/read", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
              });
              setNotifications((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));
            } catch (e) {
              // ignore
            }
          }

          return (
            <header className="border-b border-steel2 bg-charcoal/95 backdrop-blur sticky top-0 z-50">
              <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="font-display text-xl font-bold tracking-tight">
                  Kingdom AutoMobile <span className="text-ignition">Dealership</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm text-silver">
                  <Link href="/cars" className="hover:text-offwhite transition-colors">Inventory</Link>
                  <Link href="/contact" className="hover:text-offwhite transition-colors">Contact</Link>
                  <Link href="/cars" className="bg-ignition text-charcoal font-medium px-4 py-2 rounded-sm hover:brightness-110 transition">Browse cars</Link>

                  <button onClick={() => setNotifOpen((s) => !s)} aria-label="Notifications" className="relative p-2 rounded-sm bg-steel2 text-silver">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 2a4 4 0 00-4 4v2.586L4.293 11.293A1 1 0 004 12h12a1 1 0 00-.293-.707L14 8.586V6a4 4 0 00-4-4z" />
                      <path d="M8.25 15a1.75 1.75 0 003.5 0" />
                    </svg>
                    {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-ignition text-charcoal text-[10px] px-1 rounded-md">{unreadCount}</span>}
                  </button>
                </nav>

                <div className="flex items-center gap-3">
                  <div className="hidden md:block">
                    <button onClick={() => setNotifOpen((s) => !s)} aria-label="Notifications" className="relative p-2 rounded-sm bg-steel2 text-silver">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a4 4 0 00-4 4v2.586L4.293 11.293A1 1 0 004 12h12a1 1 0 00-.293-.707L14 8.586V6a4 4 0 00-4-4z" />
                        <path d="M8.25 15a1.75 1.75 0 003.5 0" />
                      </svg>
                      {unreadCount > 0 && <span className="absolute -top-1 -right-1 bg-ignition text-charcoal text-[10px] px-1 rounded-md">{unreadCount}</span>}
                    </button>
                  </div>

                  <div className="md:hidden">
                    <button onClick={() => setOpen((s) => !s)} aria-label={open ? "Close menu" : "Open menu"} className="p-2 rounded-sm bg-steel2 text-silver">
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
              </div>

              {open && (
                <div className="md:hidden bg-charcoal border-t border-steel2">
                  <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 text-silver">
                    <Link href="/cars" onClick={() => setOpen(false)} className="py-2 hover:text-offwhite">Inventory</Link>
                    <Link href="/contact" onClick={() => setOpen(false)} className="py-2 hover:text-offwhite">Contact</Link>
                    <Link href="/cars" onClick={() => setOpen(false)} className="bg-ignition text-charcoal font-medium px-4 py-2 rounded-sm w-max hover:brightness-110 transition">Browse cars</Link>
                  </div>
                </div>
              )}

              {notifOpen && (
                <div className="bg-charcoal border-t border-steel2">
                  <div className="max-w-6xl mx-auto px-6 py-4 text-silver">
                    <div className="flex items-center justify-between mb-3">
                      <strong>Notifications</strong>
                      <button
                        onClick={async () => {
                          await fetch("/api/notifications/read", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
                          setNotifications((prev) => prev.map((p) => ({ ...p, read: true })));
                        }}
                        className="text-sm text-silver/80"
                      >
                        Mark all read
                      </button>
                    </div>

                    {notifications.length === 0 ? (
                      <p className="text-silver text-sm">No notifications</p>
                    ) : (
                      <ul className="flex flex-col gap-2">
                        {notifications.map((n) => (
                          <li key={n.id} className={`p-3 rounded-sm border border-steel2 ${n.read ? "bg-steel" : "bg-steel/80"}`}>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="font-medium">{n.title}</div>
                                <div className="text-silver text-sm mt-1">{n.message}</div>
                                <div className="text-silver/70 text-xs mt-2">{n.timestamp ? new Date(n.timestamp).toLocaleString() : ''}</div>
                              </div>
                              {!n.read && <button onClick={() => markRead(n.id)} className="text-sm text-ignition">Mark read</button>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </header>
          );
        }
