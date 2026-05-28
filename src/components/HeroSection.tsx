"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ChevronRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 2 + 0.5, speedX: (Math.random() - 0.5) * 0.3, speedY: -Math.random() * 0.5 - 0.1, opacity: Math.random() * 0.4 + 0.1 });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`; ctx.fill();
        p.x += p.speedX; p.y += p.speedY;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  return (
    <section style={{ position: "relative", height: "100vh", minHeight: "700px", display: "flex", alignItems: "center", overflow: "hidden", background: "linear-gradient(135deg, #0D0D0D 0%, #1A1510 50%, #0A0A0A 100%)" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "linear-gradient(135deg, transparent 50%, rgba(201,168,76,0.03) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "40%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)", zIndex: 2 }} />
      <div style={{ position: "absolute", right: "-2%", bottom: "5%", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(8rem, 18vw, 22rem)", color: "rgba(201,168,76,0.04)", letterSpacing: "-0.05em", lineHeight: 1, userSelect: "none", zIndex: 1 }}>
        {locale === "tr" ? "MADEN" : "MINE"}
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 2rem", width: "100%" }}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px", padding: "0.4rem 1rem", marginBottom: "2rem" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C9A84C" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C" }}>{t("badge")}</span>
          </div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.0, letterSpacing: "-0.01em", color: "#F5F0E8", marginBottom: "1.5rem" }}>
            {t("line1")}<br />
            <span style={{ background: "linear-gradient(135deg, #E8C97A, #C9A84C, #9A7A2E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t("line2")}</span><br />
            {t("line3")}
          </h1>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: "#B5B5A8", lineHeight: 1.9, maxWidth: "560px", marginBottom: "2.5rem" }}>{t("desc")}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href={`/${locale}/faaliyetler`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #E8C97A, #C9A84C)", color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2rem", borderRadius: "2px", textDecoration: "none" }}>
              {t("btnActivities")} <ChevronRight size={18} />
            </Link>
            <Link href={`/${locale}/iletisim`} style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", color: "#C9A84C", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2rem", borderRadius: "2px", border: "1px solid rgba(201,168,76,0.4)", textDecoration: "none" }}>
              {t("btnContact")}
            </Link>
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", zIndex: 10 }}>
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#5A5A5A" }}>{t("scroll")}</span>
        <ArrowDown size={16} color="#C9A84C" style={{ animation: "bounce 2s infinite" }} />
      </div>
      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(6px)} }`}</style>
    </section>
  );
}
