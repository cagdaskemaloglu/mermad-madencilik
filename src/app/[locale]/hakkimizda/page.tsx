import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Shield, Leaf, Award, Users, Target, TrendingUp } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Hakkımızda" : "About Us",
    description: locale === "tr" ? "MERMAD Madencilik hakkında bilgi alın." : "Learn about MERMAD Mining.",
  };
}

const icons = [Shield, Leaf, Award, Users, Target, TrendingUp];

export default async function HakkimizdaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about_page" });
  const values = t.raw("values") as { title: string; desc: string }[];
  const timeline = t.raw("timeline") as { year: string; event: string }[];

  return (
    <>
      <section style={{ paddingTop: "120px", paddingBottom: "6rem", background: "linear-gradient(135deg, #0D0D0D 0%, #1A150A 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "linear-gradient(135deg, transparent, rgba(201,168,76,0.04))" }} />
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>{t("tag")}</div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#F5F0E8", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            {t("title1")}<br />
            <span style={{ background: "linear-gradient(135deg, #E8C97A, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t("title2")}</span>
          </h1>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.2rem", color: "#B5B5A8", lineHeight: 1.9, maxWidth: "600px" }}>{t("desc")}</p>
        </div>
      </section>

      <section style={{ padding: "6rem 0", background: "#1A1A1A" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }} className="mv-grid">
          {[
            { tag: t("missionTag"), title: t("missionTitle"), desc: t("missionDesc"), gold: true },
            { tag: t("visionTag"), title: t("visionTitle"), desc: t("visionDesc"), gold: false },
          ].map((item) => (
            <div key={item.tag} style={{ background: item.gold ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)", border: `1px solid ${item.gold ? "rgba(201,168,76,0.2)" : "rgba(201,168,76,0.1)"}`, borderRadius: "4px", padding: "3rem" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>{item.tag}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "1rem" }}>{item.title}</h3>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.1rem", color: "#B5B5A8", lineHeight: 1.9 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:768px){ .mv-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      <section style={{ padding: "6rem 0", background: "#141414" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>{t("valuesTag")}</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#F5F0E8" }}>{t("valuesTitle")}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {values.map((v, i) => {
              const Icon = icons[i];
              return (
                <div key={v.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "4px", padding: "2rem", transition: "all 0.3s" }} className="val-card">
                  <div style={{ background: "rgba(201,168,76,0.08)", borderRadius: "2px", padding: "0.75rem", display: "inline-block", marginBottom: "1.25rem" }}><Icon size={22} color="#C9A84C" /></div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#F5F0E8", marginBottom: "0.5rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "#8A8A7A", lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
        <style>{`.val-card:hover { border-color: rgba(201,168,76,0.35) !important; transform: translateY(-4px); }`}</style>
      </section>

      <section style={{ padding: "6rem 0", background: "#1A1A1A" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>{t("historyTag")}</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#F5F0E8" }}>{t("historyTitle")}</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "80px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(180deg, transparent, rgba(201,168,76,0.3), transparent)" }} />
            {timeline.map((item) => (
              <div key={item.year} style={{ display: "flex", gap: "2rem", marginBottom: "2.5rem", alignItems: "flex-start" }}>
                <div style={{ minWidth: "80px", textAlign: "right", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#C9A84C", paddingTop: "2px" }}>{item.year}</div>
                <div style={{ position: "relative", paddingLeft: "2rem" }}>
                  <div style={{ position: "absolute", left: "-4px", top: "8px", width: "9px", height: "9px", borderRadius: "50%", background: "#C9A84C", border: "2px solid #1A1A1A" }} />
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.1rem", color: "#B5B5A8", lineHeight: 1.7 }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
