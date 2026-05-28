"use client";
import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm({ locale }: { locale?: string }) {
  const t = useTranslations("contact_page");
  const opts = t.raw("formSubjectOpts") as { value: string; label: string }[];
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", padding: "0.85rem 1rem", color: "#F5F0E8", fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", outline: "none", transition: "border-color 0.3s" };
  const labelStyle = { display: "block" as const, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#8A8A7A", marginBottom: "0.5rem" };

  if (status === "success") {
    return (
      <div style={{ background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "4px", padding: "3rem", textAlign: "center" }}>
        <CheckCircle size={48} color="#4CAF50" style={{ margin: "0 auto 1rem" }} />
        <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "0.75rem" }}>{t("formSuccess")}</h3>
        <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem", color: "#8A8A7A" }}>{t("formSuccessDesc")}</p>
        <button onClick={() => setStatus("idle")} style={{ marginTop: "1.5rem", background: "transparent", border: "1px solid rgba(201,168,76,0.4)", color: "#C9A84C", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "0.7rem 1.5rem", borderRadius: "2px", cursor: "pointer" }}>
          {t("formNewMsg")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: "4px", padding: "2.5rem" }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "#F5F0E8", marginBottom: "2rem" }}>{t("formTitle")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }} className="form-grid">
        <div><label style={labelStyle}>{t("formName")} *</label><input name="name" value={form.name} onChange={handleChange} required placeholder={t("formNamePh")} style={inputStyle} /></div>
        <div><label style={labelStyle}>{t("formEmail")} *</label><input type="email" name="email" value={form.email} onChange={handleChange} required placeholder={t("formEmailPh")} style={inputStyle} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }} className="form-grid">
        <div><label style={labelStyle}>{t("formPhone")}</label><input name="phone" value={form.phone} onChange={handleChange} placeholder={t("formPhonePh")} style={inputStyle} /></div>
        <div>
          <label style={labelStyle}>{t("formSubject")} *</label>
          <select name="subject" value={form.subject} onChange={handleChange} required style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="">{t("formSubjectPh")}</option>
            {opts.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "1.75rem" }}>
        <label style={labelStyle}>{t("formMessage")} *</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5} placeholder={t("formMessagePh")} style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }} />
      </div>
      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(244,67,54,0.08)", border: "1px solid rgba(244,67,54,0.3)", borderRadius: "2px", padding: "0.75rem 1rem", marginBottom: "1.25rem" }}>
          <AlertCircle size={16} color="#F44336" />
          <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", color: "#F44336" }}>{t("formError")}</span>
        </div>
      )}
      <button type="submit" disabled={status === "loading"} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: status === "loading" ? "rgba(201,168,76,0.5)" : "linear-gradient(135deg, #E8C97A, #C9A84C)", color: "#1A1A1A", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", padding: "1rem 2rem", border: "none", borderRadius: "2px", cursor: status === "loading" ? "not-allowed" : "pointer", width: "100%", justifyContent: "center" }}>
        {status === "loading" ? t("formSending") : <><Send size={18} /> {t("formSubmit")}</>}
      </button>
      <style>{`input:focus, textarea:focus, select:focus { border-color: rgba(201,168,76,0.5) !important; } @media(max-width:600px){ .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}
