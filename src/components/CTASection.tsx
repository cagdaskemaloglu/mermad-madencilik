"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function CTASection() {
  const t = useTranslations("cta");
  const locale = useLocale();
  return (
    <section style={{ padding: "6rem 0", background: "linear-gradient(135deg, #0D0D0A 0%, #1A150A 50%, #0D0D0A 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 2rem", textAlign: "center", position: "relative" }}>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>{t("tag")}</div>
        <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.05, color: "#F5F0E8", marginBottom: "1.5rem" }}>
          {t("title1")}<br />
          <span style={{ background: "linear-gradient(135deg, #E8C97A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t("title2")}</span><br />
          {t("title3")}
        </h2>
        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.2rem", color: "#8A8A7A", lineHeight: 1.9, marginBottom: "2.5rem" }}>{t("desc")}</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`/${locale}/iletisim`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #E8C97A, #C9A84C)", color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "2px", textDecoration: "none" }}>
            {t("btnContact")} <ChevronRight size={18} />
          </Link>
          <Link href={`/${locale}/projeler`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#C9A84C", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "2px", border: "1px solid rgba(201,168,76,0.4)", textDecoration: "none" }}>
            {t("btnProjects")}
          </Link>
        </div>
      </div>
    </section>
  );
}
