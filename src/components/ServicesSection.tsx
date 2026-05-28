"use client";
import Link from "next/link";
import { Search, Pickaxe, Cog, TreePine, BarChart3, HardHat } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();
  const icons = [Search, Pickaxe, Cog, TreePine, BarChart3, HardHat];
  const services = icons.map((icon, i) => ({
    icon,
    title: t(`s${i+1}Title`),
    desc: t(`s${i+1}Desc`),
  }));
  return (
    <section style={{ padding: "7rem 0", background: "#1A1A1A" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>{t("tag")}</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: "#F5F0E8" }}>{t("title")}</h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "1.5rem auto 0" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {services.map((service, i) => (
            <div key={service.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "4px", padding: "2.5rem", position: "relative", overflow: "hidden", transition: "all 0.3s" }} className="service-card">
              <div style={{ position: "absolute", top: "1rem", right: "1.5rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "4rem", color: "rgba(201,168,76,0.05)", lineHeight: 1, userSelect: "none" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ background: "rgba(201,168,76,0.08)", borderRadius: "2px", padding: "1rem", display: "inline-block", marginBottom: "1.5rem" }}><service.icon size={24} color="#C9A84C" /></div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#F5F0E8", marginBottom: "0.75rem" }}>{service.title}</h3>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#8A8A7A", lineHeight: 1.7 }}>{service.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href={`/${locale}/faaliyetler`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", borderRadius: "2px", textDecoration: "none" }}>
            {t("link")}
          </Link>
        </div>
      </div>
      <style>{`.service-card:hover { border-color: rgba(201,168,76,0.35) !important; background: rgba(201,168,76,0.03) !important; transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }`}</style>
    </section>
  );
}
