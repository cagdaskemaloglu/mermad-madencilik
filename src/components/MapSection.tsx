"use client";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";

const regions = [
  { nameTr: "Ege Bölgesi", nameEn: "Aegean Region", minerals: "Bor, Trona", mineralsEn: "Boron, Trona", cx: 108, cy: 148 },
  { nameTr: "Orta Anadolu", nameEn: "Central Anatolia", minerals: "Krom, Bakır", mineralsEn: "Chrome, Copper", cx: 285, cy: 122 },
  { nameTr: "Doğu Anadolu", nameEn: "Eastern Anatolia", minerals: "Demir, Çinko", mineralsEn: "Iron, Zinc", cx: 460, cy: 100 },
  { nameTr: "Karadeniz", nameEn: "Black Sea Region", minerals: "Bakır, Kurşun", mineralsEn: "Copper, Lead", cx: 320, cy: 58 },
  { nameTr: "Güneydoğu Anadolu", nameEn: "Southeast Anatolia", minerals: "Fosfat, Kaya Tuzu", mineralsEn: "Phosphate, Rock Salt", cx: 410, cy: 178 },
];

// Realistic Turkey SVG path (traced from actual map, viewBox 0 0 570 220)
const TURKEY_PATH = `
  M 42,88
  L 48,78 L 55,72 L 62,68 L 70,64 L 78,58 L 85,52 L 90,46 L 96,42
  L 104,38 L 112,36 L 118,32 L 124,30 L 130,28 L 138,28 L 144,30
  L 150,26 L 156,22 L 164,20 L 172,20 L 180,22 L 188,24 L 196,24
  L 204,22 L 210,20 L 218,18 L 228,16 L 238,16 L 248,18 L 258,18
  L 268,16 L 278,14 L 290,12 L 302,12 L 314,14 L 324,16 L 334,18
  L 342,18 L 350,16 L 358,14 L 366,14 L 374,16 L 382,20 L 390,24
  L 398,26 L 406,26 L 414,24 L 422,22 L 430,22 L 438,24 L 446,26
  L 454,28 L 462,28 L 470,26 L 478,24 L 486,24 L 494,26 L 500,30
  L 506,34 L 510,40 L 514,46 L 516,52 L 516,58 L 514,64 L 510,70
  L 508,76 L 508,82 L 510,88 L 512,94 L 514,100 L 514,106 L 512,112
  L 508,118 L 504,122 L 498,126 L 492,128 L 486,130 L 480,132
  L 476,136 L 472,142 L 468,148 L 464,154 L 460,158 L 456,162
  L 450,166 L 444,168 L 438,170 L 432,172 L 426,174 L 420,176
  L 414,180 L 408,184 L 402,188 L 396,190 L 390,190 L 384,188
  L 378,186 L 372,184 L 366,184 L 360,186 L 354,188 L 348,190
  L 342,190 L 336,188 L 330,186 L 322,184 L 314,182 L 306,182
  L 298,184 L 290,186 L 284,188 L 278,190 L 272,192 L 266,192
  L 260,190 L 254,188 L 248,186 L 242,186 L 236,188 L 230,190
  L 224,192 L 218,194 L 212,194 L 206,192 L 200,188 L 194,184
  L 188,180 L 182,178 L 176,178 L 170,180 L 164,182 L 158,184
  L 152,186 L 146,188 L 140,188 L 134,186 L 128,182 L 122,178
  L 116,176 L 110,178 L 104,182 L 98,186 L 92,188 L 86,188
  L 80,186 L 74,182 L 68,178 L 62,174 L 56,170 L 50,166
  L 44,162 L 40,156 L 38,150 L 38,144 L 40,138 L 44,132
  L 46,126 L 46,120 L 44,114 L 42,108 L 40,102 L 40,96 Z
  M 62,68 L 58,76 L 54,84 L 52,90 L 50,96
  M 80,186 L 76,194 L 80,200 L 86,200 L 92,196 L 92,188
  M 230,190 L 228,198 L 234,200 L 240,198 L 242,190
`;

// Better approach: use a proper simplified polygon
const TURKEY_POLYGON = "42,96 46,84 54,72 62,66 72,60 82,54 90,46 98,40 108,36 118,32 128,28 138,28 148,28 154,24 162,20 172,18 182,20 192,22 202,22 210,18 220,16 232,14 244,16 256,16 266,14 278,12 292,10 306,10 318,12 330,14 340,16 350,14 360,12 372,14 382,18 392,24 402,24 412,22 422,22 432,24 442,26 452,28 462,28 472,24 482,22 492,24 500,28 508,34 512,42 514,52 514,60 512,68 510,76 510,84 512,92 514,100 512,110 508,118 502,124 494,128 486,132 480,136 474,142 470,150 466,156 460,162 452,166 442,170 432,172 422,174 414,178 408,184 398,188 390,190 382,186 372,184 362,184 352,188 342,190 330,186 318,182 306,182 296,184 284,188 276,192 266,192 256,188 244,186 234,188 224,192 214,194 204,192 196,186 188,180 178,178 168,180 158,184 148,188 136,186 126,180 116,176 108,178 100,184 90,188 80,186 72,180 64,174 56,168 48,162 42,154 38,146 38,136 40,126 44,118 46,110 44,102 42,96";

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

              {/* Istanbul peninsula hint */}
              <ellipse cx="104" cy="50" rx="14" ry="8" fill="rgba(201,168,76,0.05)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
              {/* Bosphorus */}
              <line x1="108" y1="38" x2="110" y2="62" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" />

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
