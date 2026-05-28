import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import MapSection from "@/components/MapSection";
import CTASection from "@/components/CTASection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: locale === "tr" ? "MERMAD Madencilik | Türkiye'de Güvenilir Madencilik Çözümleri" : "MERMAD Mining | Reliable Mining Solutions in Turkey",
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <MapSection />
      <CTASection />
    </>
  );
}
