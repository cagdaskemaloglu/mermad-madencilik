import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0D0D0D", textAlign: "center", padding: "2rem" }}>
      <div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "8rem", color: "rgba(201,168,76,0.1)", lineHeight: 1, marginBottom: "1rem" }}>404</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "2rem", color: "#F5F0E8", marginBottom: "1rem" }}>Page Not Found</h1>
        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: "1.1rem", color: "#8A8A7A", marginBottom: "2rem" }}>The page you are looking for does not exist.</p>
        <Link href="/tr" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "linear-gradient(135deg, #E8C97A, #C9A84C)", color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.9rem 2rem", borderRadius: "2px", textDecoration: "none" }}>
          Return to Home
        </Link>
      </div>
    </section>
  );
}
