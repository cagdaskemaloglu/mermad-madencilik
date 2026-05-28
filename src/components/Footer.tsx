"use client";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const actList = t.raw("actList") as string[];

  return (
    <footer style={{ background: "#111", borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "4rem" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem", paddingBottom: "3rem" }}>
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.8rem", letterSpacing: "0.15em", color: "#C9A84C" }}>MERMAD</div>
              <div style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.6rem", letterSpacing: "0.35em", color: "#8A8A7A", textTransform: "uppercase" }}>
                {locale === "tr" ? "MADENCİLİK" : "MINING"}
              </div>
            </div>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1rem", color: "#8A8A7A", lineHeight: 1.8, maxWidth: "260px" }}>{t("desc")}</p>
          </div>

          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>{t("pages")}</h4>
            {[
              { href: `/${locale}/hakkimizda`, label: locale === "tr" ? "Hakkımızda" : "About Us" },
              { href: `/${locale}/faaliyetler`, label: locale === "tr" ? "Faaliyetler" : "Activities" },
              { href: `/${locale}/projeler`, label: locale === "tr" ? "Projeler" : "Projects" },
              { href: `/${locale}/iletisim`, label: locale === "tr" ? "İletişim" : "Contact" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ display: "block", fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", color: "#8A8A7A", textDecoration: "none", marginBottom: "0.75rem", transition: "color 0.3s" }} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>{t("activities")}</h4>
            {actList.map((item: string) => (
              <div key={item} style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", color: "#8A8A7A", marginBottom: "0.75rem" }}>{item}</div>
            ))}
          </div>

          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>{t("contact")}</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                { icon: MapPin, val: t("address") },
                { icon: Phone, val: "+90 (312) 000 00 00" },
                { icon: Mail, val: "info@mermad.com.tr" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <item.icon size={16} color="#C9A84C" style={{ marginTop: "3px", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", color: "#8A8A7A" }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", color: "#5A5A5A" }}>
            © {new Date().getFullYear()} MERMAD {locale === "tr" ? "Madencilik" : "Mining"}. {t("rights")}
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.8rem", color: "#5A5A5A" }}>{t("slogan")}</p>
        </div>
      </div>
      <style>{`.footer-link:hover { color: #C9A84C !important; }`}</style>
    </footer>
  );
}
