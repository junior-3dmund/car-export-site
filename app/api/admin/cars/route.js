import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isAdminByUserId, isAdminByEmail } from "@/lib/admins";

export async function POST(req) {
  const authHeader = req.headers.get("authorization");
  let authorized = false;

  // Allow ADMIN_PASSWORD in body as before
  const body = await req.json();
  const { password, car } = body;
  if (password && password === process.env.ADMIN_PASSWORD) authorized = true;

  // Allow Supabase access token via Authorization: Bearer <token>
  if (!authorized && authHeader && authHeader.startsWith("Bearer ") && supabaseAdmin) {
    const token = authHeader.split(" ")[1];
    try {
      const { data } = await supabaseAdmin.auth.getUser(token);
      const user = data?.user;
      if (user) {
        // require admin membership in the admins table
        const admin = await isAdminByUserId(user.id) || await isAdminByEmail(user.email);
        if (admin) authorized = true;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!authorized) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabaseAdmin.from("cars").insert([
    {
      ...car,
      year: Number(car.year),
      price: Number(car.price),
      mileage: Number(car.mileage || 0)
    }
  ]);

  if (error) {
    console.error("Insert error:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
