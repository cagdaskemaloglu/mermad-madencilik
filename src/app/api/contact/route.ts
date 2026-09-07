import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_RECIPIENT = "info@mermad.com.tr";

// mermad.com.tr must be verified as a sending domain in the Resend dashboard
// before this "from" address will actually deliver.
const CONTACT_SENDER = "Mermad Madencilik Web Sitesi <iletisim@mermad.com.tr>";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY tanımlı değil; e-posta gönderilemedi.");
    return NextResponse.json(
      { error: "E-posta servisi şu anda yapılandırılmamış." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Yeni İletişim Formu: ${subject}`,
      html: `
        <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone || "-")}</p>
        <p><strong>Konu:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend gönderim hatası:", error);
      return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 502 });
    }
  } catch (err) {
    console.error("İletişim formu gönderim hatası:", err);
    return NextResponse.json({ error: "E-posta gönderilemedi." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
