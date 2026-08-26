import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
  const { password, car } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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
