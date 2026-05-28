import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const locales = ["tr", "en"];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";
  return {
    metadataBase: new URL("https://mermad.com.tr"),
    title: {
      default: isTr ? "MERMAD Madencilik | Türkiye'de Güvenilir Madencilik Çözümleri" : "MERMAD Mining | Reliable Mining Solutions in Turkey",
      template: "%s | MERMAD " + (isTr ? "Madencilik" : "Mining"),
    },
    description: isTr
      ? "MERMAD Madencilik, Türkiye'nin dört bir yanında sürdürülebilir ve güvenli madencilik faaliyetleri yürüten lider bir madencilik şirketidir."
      : "MERMAD Mining is a leading mining company conducting sustainable and safe mining operations across Turkey.",
    keywords: isTr
      ? ["madencilik", "maden", "Türkiye madencilik", "MERMAD", "sürdürülebilir madencilik"]
      : ["mining", "mineral", "Turkey mining", "MERMAD", "sustainable mining"],
    alternates: {
      canonical: `https://mermad.com.tr/${locale}`,
      languages: { tr: "https://mermad.com.tr/tr", en: "https://mermad.com.tr/en" },
    },
    openGraph: {
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      url: `https://mermad.com.tr/${locale}`,
      siteName: isTr ? "MERMAD Madencilik" : "MERMAD Mining",
    },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Barlow+Condensed:wght@300;400;500;600;700&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
