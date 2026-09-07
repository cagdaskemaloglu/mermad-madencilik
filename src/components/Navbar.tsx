"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/hakkimizda`, label: t("about") },
    { href: `/${locale}/faaliyetler`, label: t("activities") },
    { href: `/${locale}/projeler`, label: t("projects") },
    { href: `/${locale}/iletisim`, label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "tr" ? "en" : "tr";
    // Replace locale prefix in pathname
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(20,20,20,0.97)" : "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <Link href={`/${locale}`} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <Image src="/logo.png" alt="Mermad Madencilik" width={44} height={32} style={{ height: "auto", width: "44px", objectFit: "contain" }} priority />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.6rem", letterSpacing: "0.15em", color: "#C9A84C" }}>MERMAD</span>
            <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.55rem", letterSpacing: "0.35em", color: "#B5B5A8", textTransform: "uppercase", marginTop: "1px" }}>
              {locale === "tr" ? "MADENCİLİK" : "MINING"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", color: pathname === link.href ? "#C9A84C" : "#B5B5A8", textDecoration: "none", transition: "color 0.3s" }} className="hover-underline">
              {link.label}
            </Link>
          ))}

          {/* Language Switcher */}
          <button onClick={switchLocale} style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "2px", padding: "0.35rem 0.75rem", cursor: "pointer", transition: "all 0.3s" }} className="lang-btn">
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.15em", color: "#C9A84C" }}>
              {locale === "tr" ? "EN" : "TR"}
            </span>
          </button>

          <Link href={`/${locale}/iletisim`} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#1A1A1A", background: "linear-gradient(135deg, #E8C97A, #C9A84C)", padding: "0.6rem 1.5rem", borderRadius: "2px", textDecoration: "none" }}>
            {t("cta")}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div style={{ display: "none", alignItems: "center", gap: "0.75rem" }} className="mobile-controls">
          <button onClick={switchLocale} style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "2px", padding: "0.3rem 0.6rem", cursor: "pointer" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.75rem", color: "#C9A84C" }}>{locale === "tr" ? "EN" : "TR"}</span>
          </button>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#C9A84C", cursor: "pointer" }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "rgba(20,20,20,0.98)", padding: "1.5rem 2rem", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "1rem", letterSpacing: "0.12em", textTransform: "uppercase", color: pathname === link.href ? "#C9A84C" : "#B5B5A8", textDecoration: "none", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
        .lang-btn:hover { background: rgba(201,168,76,0.15) !important; border-color: rgba(201,168,76,0.5) !important; }
      `}</style>
    </header>
  );
}
