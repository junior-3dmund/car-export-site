import { Resend } from "resend";

export async function POST(req) {
  const body = await req.json();
  const { carId, carName, name, email, message } = body;

  if (!name || !email) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    // Not configured yet — log instead of failing, so the form still works
    // while you're setting things up.
    console.log("New inquiry (email not configured):", body);
    return Response.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "Route One Motors <inquiries@yourdomain.com>",
      to: "kingzamazingimport@gmail.com",
      subject: `New inquiry: ${carName} (#${carId})`,
      text: `From: ${name} <${email}>\n\n${message}`
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}
