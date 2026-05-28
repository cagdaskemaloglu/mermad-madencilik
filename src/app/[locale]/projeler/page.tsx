import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Calendar, Layers } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "tr" ? "Projeler" : "Projects" };
}

const statusColors: Record<string, string> = {
  "Aktif": "#4CAF50", "Active": "#4CAF50",
  "Arama Aşaması": "#C9A84C", "Exploration": "#C9A84C",
  "Geliştirme": "#2196F3", "Development": "#2196F3",
  "Tamamlandı": "#9E9E9E", "Completed": "#9E9E9E",
};

export default async function ProjelerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects_page" });
  const projects = t.raw("projects") as { name: string; location: string; status: string; type: string; mineral: string; capacity: string; year: string; desc: string }[];

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
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
            {projects.map((project) => (
              <div key={project.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "4px", overflow: "hidden", transition: "all 0.3s" }} className="project-card">
                <div style={{ background: "rgba(201,168,76,0.06)", padding: "1.5rem", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C" }}>{project.type}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: statusColors[project.status] || "#C9A84C" }} />
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", color: statusColors[project.status] || "#C9A84C" }}>{project.status}</span>
                    </div>
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#F5F0E8", lineHeight: 1.2 }}>{project.name}</h3>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1rem", color: "#8A8A7A", lineHeight: 1.8, marginBottom: "1.25rem" }}>{project.desc}</p>
                  {[
                    { icon: MapPin, val: project.location },
                    { icon: Layers, val: `${project.mineral} · ${project.capacity}` },
                    { icon: Calendar, val: `${t("startLabel")}: ${project.year}` },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.5rem" }}>
                      <item.icon size={14} color="#C9A84C" />
                      <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem", color: "#6A6A6A" }}>{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`.project-card:hover { border-color: rgba(201,168,76,0.35) !important; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }`}</style>
      </section>
    </>
  );
}
