"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [adminKey, setAdminKey] = useState(() => typeof window !== 'undefined' ? localStorage.getItem('adminKey') || '' : '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadAdmins();
    // load session user if supabase available
    (async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user ?? null);
    })();
  }, []);

  async function getHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (adminKey) headers["x-admin-key"] = adminKey;
    try {
      const { data } = await supabase?.auth.getSession();
      const token = data?.session?.access_token;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch (e) {}
    return headers;
  }

  async function loadAdmins() {
    setLoading(true);
    try {
      const res = await fetch("/api/admins", { headers: await getHeaders() });
      if (res.ok) setAdmins(await res.json());
      else {
        const body = await res.json().catch(() => ({}));
        alert(body.error || "Failed to load admins");
      }
    } catch (err) {
      alert("Failed to load admins");
    }
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: await getHeaders(),
        body: JSON.stringify({ email: email || null, user_id: userId || null })
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setEmail("");
        setUserId("");
        loadAdmins();
      } else {
        alert(body.error || "Failed to add admin");
      }
    } catch (err) {
      alert("Failed to add admin");
    }
    setActionLoading(false);
  }

  async function handleRemove(a) {
    if (!confirm(`Remove admin ${a.email || a.user_id}?`)) return;
    setRemovingId(a.id);
    try {
      const res = await fetch("/api/admins", {
        method: "DELETE",
        headers: await getHeaders(),
        body: JSON.stringify({ id: a.id, email: a.email, user_id: a.user_id })
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) loadAdmins();
      else alert(body.error || "Failed to remove admin");
    } catch (err) {
      alert("Failed to remove admin");
    }
    setRemovingId(null);
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-2xl font-bold mb-4">Admin users</h1>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-silver">Admin API Key (optional)</label>
        <input value={adminKey} onChange={(e) => { setAdminKey(e.target.value); try { localStorage.setItem('adminKey', e.target.value); } catch {} }} className="w-full bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm" />
      </div>

      <form onSubmit={handleAdd} className="grid sm:grid-cols-3 gap-3 mb-6">
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm" />
        <input placeholder="Supabase user id" value={userId} onChange={(e) => setUserId(e.target.value)} className="bg-charcoal border border-steel2 rounded-sm px-3 py-2 text-sm" />
        <div>
          <button className="bg-ignition text-charcoal px-3 py-2 rounded-sm">Add admin</button>
        </div>
      </form>

      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-silver"><th>Email</th><th>User ID</th><th>Role</th><th></th></tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} className="border-t border-steel2">
                  <td className="py-2">{a.email}</td>
                  <td>{a.user_id}</td>
                  <td>{a.role}</td>
                  <td className="text-right">
                    <button disabled={removingId === a.id} onClick={() => handleRemove(a)} className="text-red-400">
                      {removingId === a.id ? "Removing..." : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
