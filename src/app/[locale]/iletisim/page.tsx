import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: locale === "tr" ? "İletişim" : "Contact" };
}

export default async function IletisimPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact_page" });

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
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.2rem", color: "#B5B5A8", lineHeight: 1.9, maxWidth: "560px" }}>{t("desc")}</p>
        </div>
      </section>
      <section style={{ padding: "6rem 0", background: "#1A1A1A" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem" }} className="contact-grid">
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.8rem", color: "#F5F0E8", marginBottom: "2rem" }}>{t("infoTitle")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { icon: MapPin, title: t("address"), value: t("addressVal") },
                { icon: Phone, title: t("phone"), value: t("phoneVal") },
                { icon: Mail, title: t("email"), value: t("emailVal") },
                { icon: Clock, title: t("hours"), value: t("hoursVal") },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ background: "rgba(201,168,76,0.1)", borderRadius: "2px", padding: "0.6rem", flexShrink: 0 }}><item.icon size={18} color="#C9A84C" /></div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.25rem" }}>{item.title}</div>
                    <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", color: "#B5B5A8" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", padding: "1.5rem" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.75rem" }}>{t("emergencyTitle")}</div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", color: "#8A8A7A", lineHeight: 1.7 }}>
                {t("emergencyDesc")} <strong style={{ color: "#C9A84C" }}>{t("emergencyPhone")}</strong>
              </p>
            </div>
          </div>
          <ContactForm locale={locale} />
        </div>
        <style>{`@media(max-width:768px){ .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  );
}
