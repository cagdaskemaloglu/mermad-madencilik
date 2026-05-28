"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);
  return (
    <div ref={ref} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#C9A84C", lineHeight: 1 }}>
      {count}{suffix}
    </div>
  );
}

export default function StatsSection() {
  const t = useTranslations("stats");
  const stats = [
    { value: 15, suffix: "+", label: t("experience") },
    { value: 8, suffix: "", label: t("sites") },
    { value: 500, suffix: "K+", label: t("capacity") },
    { value: 120, suffix: "+", label: t("staff") },
  ];
  return (
    <section style={{ background: "#111", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", padding: "4rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }}>
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center", padding: "1.5rem" }}>
              <Counter value={stat.value} suffix={stat.suffix} />
              <div style={{ width: "40px", height: "1px", background: "rgba(201,168,76,0.4)", margin: "1rem auto" }} />
              <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A8A7A" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
