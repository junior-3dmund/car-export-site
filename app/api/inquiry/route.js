import { Resend } from "resend";

export async function POST(req) {
  const body = await req.json();
  const {
    carId,
    carName,
    name,
    fullName,
    email,
    phone,
    carType,
    message
  } = body;

  const senderName = fullName || name;

  if (!senderName || !email) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("New inquiry (email not configured):", body);
    return Response.json({ ok: true });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const recipient = process.env.INQUIRY_TO_EMAIL || "kingzamazingimport@gmail.com";
  const inquiryDetails = [
    `Full name: ${senderName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "",
    carType ? `Car type / model: ${carType}` : "",
    carId || carName ? `Vehicle: ${carName || carId}` : "",
    "",
    message || "No message provided."
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await resend.emails.send({
      from: "Kingdom AutoMobile Dealership <inquiries@yourdomain.com>",
      to: recipient,
      subject: carName ? `New inquiry: ${carName} (#${carId})` : "New customer inquiry",
      text: inquiryDetails
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return Response.json({ error: "Failed to send" }, { status: 500 });
  }
}
