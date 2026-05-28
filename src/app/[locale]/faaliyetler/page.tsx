import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Search, Pickaxe, Cog, TreePine, BarChart3, HardHat, CheckCircle } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "tr" ? "Faaliyetlerimiz" : "Our Activities" };
}

const icons = [Search, Pickaxe, Cog, TreePine, BarChart3, HardHat];

export default async function FaaliyetlerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "activities_page" });
  const activities = t.raw("activities") as { title: string; desc: string; details: string[] }[];

  return (
    <>
      <section style={{ paddingTop: "120px", paddingBottom: "5rem", background: "linear-gradient(135deg, #0D0D0D, #1A150A)", position: "relative", overflow: "hidden" }}>
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
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", flexDirection: "column", gap: "4rem" }}>
          {activities.map((activity, i) => {
            const Icon = icons[i];
            return (
              <div key={activity.title} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="act-grid">
                <div style={{ order: i % 2 !== 0 ? 2 : 1 }}>
                  <div style={{ background: "rgba(201,168,76,0.08)", borderRadius: "2px", padding: "1rem", display: "inline-block", marginBottom: "1.5rem" }}><Icon size={28} color="#C9A84C" /></div>
                  <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#F5F0E8", marginBottom: "1rem" }}>{activity.title}</h2>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.1rem", color: "#B5B5A8", lineHeight: 1.9 }}>{activity.desc}</p>
                </div>
                <div style={{ order: i % 2 !== 0 ? 1 : 2, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "4px", padding: "2rem" }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.25rem" }}>{t("scopeLabel")}</div>
                  {activity.details.map((d) => (
                    <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                      <CheckCircle size={16} color="#C9A84C" style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", color: "#B5B5A8" }}>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width:768px){ .act-grid { grid-template-columns: 1fr !important; } .act-grid > div { order: unset !important; } }`}</style>
      </section>
    </>
  );
}
