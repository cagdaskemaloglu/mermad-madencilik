"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

const regions = [
  { nameTr: "Ege Bölgesi", nameEn: "Aegean Region", minerals: "Bor, Trona", mineralsEn: "Boron, Trona", cx: 92, cy: 126 },
  { nameTr: "Orta Anadolu", nameEn: "Central Anatolia", minerals: "Krom, Bakır", mineralsEn: "Chrome, Copper", cx: 226, cy: 81 },
  { nameTr: "Doğu Anadolu", nameEn: "Eastern Anatolia", minerals: "Demir, Çinko", mineralsEn: "Iron, Zinc", cx: 423, cy: 82 },
  { nameTr: "Karadeniz", nameEn: "Black Sea Region", minerals: "Bakır, Kurşun", mineralsEn: "Copper, Lead", cx: 307, cy: 40 },
  { nameTr: "Güneydoğu Anadolu", nameEn: "Southeast Anatolia", minerals: "Fosfat, Kaya Tuzu", mineralsEn: "Phosphate, Rock Salt", cx: 399, cy: 142 },
];

// Accurate Turkey outline, derived from real country border data (Natural Earth /
// simplified GeoJSON boundary), equirectangular projection with latitude
// correction, fitted to viewBox 0 0 570 220.
const TURKEY_POLYGON = "63.7,83.9 67.9,82.5 71.2,71.8 70.1,68.2 82.1,61.6 67.8,61.2 65.6,58.4 72.7,49.9 72.6,40.9 79.8,37.4 78.6,30.4 72.6,26.0 77.7,23.4 79.6,19.0 90.2,15.6 95.4,15.5 101.4,20.6 112.9,18.8 112.0,23.5 117.2,31.9 133.0,39.8 155.3,43.8 165.3,41.7 182.4,45.8 189.3,44.3 191.3,38.8 217.2,23.8 236.6,17.5 269.3,19.5 276.2,15.0 280.9,17.0 278.9,21.3 286.6,28.0 298.2,25.9 301.8,27.8 303.1,34.2 309.4,40.5 315.3,36.5 335.4,47.1 342.2,44.5 344.2,48.4 356.6,50.4 379.7,44.8 397.8,50.5 418.0,41.4 429.4,32.7 451.3,35.2 454.4,30.8 459.6,30.6 459.4,33.7 468.7,39.2 469.4,42.9 474.2,43.1 475.0,47.6 479.7,50.6 481.3,58.3 477.3,64.3 479.8,75.6 497.0,78.6 506.3,89.0 501.0,85.7 498.5,88.0 497.1,96.3 488.4,97.5 494.5,114.6 494.7,127.0 499.2,128.7 492.6,142.1 501.0,146.0 501.4,155.5 506.3,160.6 505.6,164.7 501.8,163.6 494.4,170.2 491.5,166.0 493.4,162.1 490.2,159.6 483.2,163.2 458.7,157.9 453.9,164.7 448.5,166.1 447.9,161.8 444.6,160.5 429.5,166.6 411.6,165.4 389.5,176.4 374.9,179.1 363.7,177.9 352.4,171.5 334.1,180.2 325.1,180.1 322.5,176.3 315.9,174.4 312.4,184.5 315.8,191.9 309.0,193.3 308.4,198.9 304.0,201.1 303.3,205.0 297.6,201.3 298.6,198.3 294.2,189.7 304.1,179.8 303.1,173.9 299.9,171.6 289.4,182.5 284.0,183.2 268.3,175.3 258.8,182.4 251.9,192.4 249.8,190.2 245.5,195.5 232.6,195.4 224.6,199.0 214.6,194.4 206.4,183.5 189.9,175.1 174.8,173.0 172.4,177.0 171.4,189.6 168.4,194.3 165.1,189.9 150.7,195.5 137.8,188.0 135.4,178.6 131.8,181.8 125.4,175.4 119.5,175.4 112.8,182.7 110.3,177.2 96.8,178.9 99.1,175.8 111.4,174.7 113.3,169.4 94.7,170.4 94.3,165.1 99.3,165.2 100.4,162.9 92.7,158.5 91.9,151.6 88.3,149.4 93.9,146.9 94.2,140.0 87.8,137.0 85.7,138.5 82.3,133.0 78.6,136.0 70.2,130.2 74.8,118.2 82.2,122.7 84.3,127.4 86.5,126.7 81.2,117.6 88.0,111.9 83.6,111.2 84.7,105.5 77.3,99.1 86.7,92.3 67.6,95.7 66.0,95.0 67.6,86.1 63.7,83.9";

export default function MapSection() {
  const t = useTranslations("map");
  const locale = useLocale();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ padding: "7rem 0", background: "linear-gradient(180deg, #141410 0%, #1A1A1A 100%)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>{t("tag")}</div>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#F5F0E8" }}>{t("title1")}<br />{t("title2")}</h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, transparent, #C9A84C, transparent)", margin: "1.5rem auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "3rem", alignItems: "center" }} className="map-grid">
          {/* SVG Map */}
          <div style={{ position: "relative", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)", borderRadius: "12px", padding: "1.5rem 1.5rem 1rem", overflow: "hidden" }}>
            {/* Subtle grid */}
            <svg viewBox="0 0 570 220" style={{ width: "100%", display: "block" }} xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="mapglow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Background glow */}
              <ellipse cx="285" cy="110" rx="260" ry="95" fill="url(#mapglow)" />

              {/* Grid lines */}
              {[100,200,300,400,500].map(x => (
                <line key={x} x1={x} y1="5" x2={x} y2="215" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
              ))}
              {[55,110,165].map(y => (
                <line key={y} x1="5" y1={y} x2="565" y2={y} stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
              ))}

              {/* Turkey shape - outer glow */}
              <polygon
                points={TURKEY_POLYGON}
                fill="none"
                stroke="rgba(201,168,76,0.15)"
                strokeWidth="6"
                strokeLinejoin="round"
              />

              {/* Turkey fill */}
              <polygon
                points={TURKEY_POLYGON}
                fill="rgba(201,168,76,0.07)"
                stroke="rgba(201,168,76,0.5)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />

              {/* Istanbul marker (Bosphorus, where Europe meets Asia) */}
              <circle cx="108" cy="20" r="2.5" fill="#C9A84C" opacity="0.8" />

              {/* Region markers with pulse */}
              {regions.map((region, i) => (
                <g key={region.nameTr}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse ring */}
                  <circle cx={region.cx} cy={region.cy} r={hovered === i ? 20 : 14}
                    fill="rgba(201,168,76,0.12)"
                    stroke="rgba(201,168,76,0.35)"
                    strokeWidth="1"
                    style={{ transition: "r 0.3s ease" }}
                  >
                    {hovered !== i && (
                      <>
                        <animate attributeName="r" values="12;18;12" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.3;0.8" dur={`${2.5 + i * 0.4}s`} repeatCount="indefinite" />
                      </>
                    )}
                  </circle>
                  {/* Dot */}
                  <circle cx={region.cx} cy={region.cy} r={hovered === i ? 6 : 4}
                    fill="#C9A84C"
                    filter="url(#glow)"
                    style={{ transition: "r 0.2s ease" }}
                  />
                  {/* Number label */}
                  <text
                    x={region.cx}
                    y={region.cy - 18}
                    textAnchor="middle"
                    fontFamily="'Barlow Condensed', sans-serif"
                    fontSize="10"
                    fontWeight="700"
                    fill={hovered === i ? "#E8C97A" : "rgba(201,168,76,0.7)"}
                    style={{ transition: "fill 0.2s ease", userSelect: "none" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              ))}

              {/* Compass rose */}
              <g transform="translate(535,185)">
                <circle cx="0" cy="0" r="12" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.25)" strokeWidth="1" />
                <text x="0" y="-5" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="7" fontWeight="700" fill="rgba(201,168,76,0.7)">N</text>
                <line x1="0" y1="-10" x2="0" y2="-3" stroke="rgba(201,168,76,0.6)" strokeWidth="1.5" />
                <line x1="0" y1="3" x2="0" y2="10" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
                <line x1="-10" y1="0" x2="10" y2="0" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
              </g>

              {/* Scale label */}
              <text x="15" y="212" fontFamily="'Barlow', sans-serif" fontSize="7" fill="rgba(201,168,76,0.4)" letterSpacing="1">{t("label").toUpperCase()}</text>
            </svg>
          </div>

          {/* Region list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {regions.map((region, i) => (
              <div
                key={region.nameTr}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  background: hovered === i ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hovered === i ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.1)"}`,
                  borderRadius: "4px", padding: "1rem 1.25rem",
                  cursor: "pointer", transition: "all 0.25s ease",
                  transform: hovered === i ? "translateX(4px)" : "none",
                }}
              >
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: hovered === i ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.18)", minWidth: "2.2rem", transition: "color 0.25s" }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: hovered === i ? "#F5F0E8" : "#C8C8BE", marginBottom: "0.2rem", transition: "color 0.25s" }}>
                    {locale === "tr" ? region.nameTr : region.nameEn}
                  </div>
                  <div style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "#6A6A60" }}>
                    {locale === "tr" ? region.minerals : region.mineralsEn}
                  </div>
                </div>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: hovered === i ? "#C9A84C" : "rgba(201,168,76,0.3)", transition: "background 0.25s", flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){ .map-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
