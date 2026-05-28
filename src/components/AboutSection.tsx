"use client";
import Link from "next/link";
import { ChevronRight, Shield, Leaf, Award } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const pillars = [
    { icon: Shield, title: t("pillar1Title"), desc: t("pillar1Desc") },
    { icon: Leaf, title: t("pillar2Title"), desc: t("pillar2Desc") },
    { icon: Award, title: t("pillar3Title"), desc: t("pillar3Desc") },
  ];
  return (
    <section style={{ padding: "7rem 0", background: "linear-gradient(180deg, #1A1A1A 0%, #141410 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "1px", height: "60%", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.2), transparent)" }} />
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="about-grid">
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>{t("tag")}</div>
            <div style={{ width: "50px", height: "2px", background: "linear-gradient(90deg, #C9A84C, transparent)", marginBottom: "2rem" }} />
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.1, color: "#F5F0E8", marginBottom: "1.5rem", letterSpacing: "-0.01em" }}>
              {t("title1")}<br />{t("title2")}<br />{t("title3")}
            </h2>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.15rem", color: "#B5B5A8", lineHeight: 1.9, marginBottom: "1.25rem" }}>{t("p1")}</p>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.15rem", color: "#8A8A7A", lineHeight: 1.9, marginBottom: "2.5rem" }}>{t("p2")}</p>
            <Link href={`/${locale}/hakkimizda`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", textDecoration: "none", borderBottom: "1px solid rgba(201,168,76,0.4)", paddingBottom: "4px" }}>
              {t("link")} <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {pillars.map((pillar) => (
              <div key={pillar.title} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "4px", padding: "1.75rem", transition: "all 0.3s" }} className="pillar-card">
                <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: "2px", padding: "0.75rem", flexShrink: 0 }}><pillar.icon size={22} color="#C9A84C" /></div>
                <div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>{pillar.title}</h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#8A8A7A", lineHeight: 1.6 }}>{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pillar-card:hover { border-color: rgba(201,168,76,0.35) !important; background: rgba(201,168,76,0.03) !important; }
        @media(max-width:768px){ .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }
      `}</style>
    </section>
  );
}
