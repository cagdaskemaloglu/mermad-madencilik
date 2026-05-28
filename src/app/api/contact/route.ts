import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  // Resend entegrasyonu buraya eklenecek
  // Şimdilik log basıyoruz
  console.log("Yeni iletişim formu:", { name, email, phone, subject, message });

  // TODO: Resend ile e-posta gönderimi
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: "iletisim@mermad.com.tr",
  //   to: "info@mermad.com.tr",
  //   subject: `Yeni İletişim Formu: ${subject}`,
  //   html: `<p><strong>Ad:</strong> ${name}</p><p><strong>E-posta:</strong> ${email}</p><p><strong>Telefon:</strong> ${phone}</p><p><strong>Mesaj:</strong> ${message}</p>`,
  // });

  return NextResponse.json({ success: true });
}
