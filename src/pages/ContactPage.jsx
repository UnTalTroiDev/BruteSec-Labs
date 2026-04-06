import { useState, useEffect } from "react";
import { useLang } from "@/LangContext";
import { useFadeIn, fadeStyle } from "@/hooks/useFadeIn";

const CONTACT_EMAIL = "brutek-sec@proton.me";

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com" },
  { label: "LinkedIn",    href: "https://linkedin.com" },
  { label: "GitHub",      href: "https://github.com" },
  { label: "Instagram",   href: "https://www.instagram.com/bruteseclabs/" },
];

const inputStyle = {
  width: "100%",
  background: "#f8f8f8",
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  padding: "10px 14px",
  fontSize: 14,
  color: "#111",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

function ContactForm() {
  const { t } = useLang();
  const tf = t.contact.form;
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xdapyror", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" style={{ fontSize: 14, color: "#16a34a", padding: "12px 0", lineHeight: 1.6 }}>
        {tf.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 32 }}>
      <h2 style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em", marginBottom: 4 }}>
        {tf.heading}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <label htmlFor="cf-name" style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>
            {tf.name}
          </label>
          <input id="cf-name" name="name" type="text" required autoComplete="name"
            value={form.name} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#111")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>
        <div>
          <label htmlFor="cf-company" style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>
            {tf.company}
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization"
            value={form.company} onChange={handleChange} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#111")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>
          {tf.email}
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email"
          value={form.email} onChange={handleChange} style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#111")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div>
        <label htmlFor="cf-message" style={{ display: "block", fontSize: 12, color: "#666", marginBottom: 4 }}>
          {tf.message}
        </label>
        <textarea
          id="cf-message" name="message" required rows={4}
          placeholder={tf.messagePlaceholder}
          value={form.message} onChange={handleChange}
          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
          onFocus={(e) => (e.target.style.borderColor = "#111")}
          onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
        />
      </div>

      {status === "error" && (
        <p role="alert" style={{ fontSize: 13, color: "#dc2626" }}>{tf.error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: "#111",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "11px 20px",
          fontSize: 13,
          fontWeight: 600,
          cursor: status === "sending" ? "wait" : "pointer",
          fontFamily: "inherit",
          letterSpacing: "0.02em",
          alignSelf: "flex-start",
          transition: "opacity 0.2s",
          opacity: status === "sending" ? 0.6 : 1,
        }}
      >
        {status === "sending" ? tf.sending : tf.submit}
      </button>
    </form>
  );
}

export function ContactPage() {
  const { t } = useLang();
  const visible = useFadeIn();
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      // Show Medellín time (COT = UTC-5)
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Bogota" }));
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m} COT`);
      setIsOpen(now.getHours() >= 9 && now.getHours() < 18);
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="page-wrap" style={fadeStyle(visible)}>
      <div
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gap: 60,
          marginTop: 48,
          alignItems: "start",
        }}
      >
        {/* Left: headline + form */}
        <div>
          <h1
            style={{
              fontSize: "clamp(30px, 5vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.1,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            {t.contact.heading}
          </h1>
          <ContactForm />
        </div>

        {/* Middle: general enquiries */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em", marginBottom: 10, marginTop: 8 }}>
            {t.contact.generalEnquiries}
          </p>
          <address style={{ fontStyle: "normal", fontSize: 14, color: "#444", margin: 0, lineHeight: 1.7 }}>
            <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "inherit", textDecoration: "none" }}>
              {CONTACT_EMAIL}
            </a>
          </address>

          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em", marginTop: 28, marginBottom: 10 }}>
            {t.contact.address}
          </p>
          <address style={{ fontStyle: "normal", fontSize: 14, color: "#444", margin: 0, lineHeight: 1.7 }}>
            CRA 29C #10C 125<br />
            Edificio SELECT<br />
            Barrio Poblado<br />
            Medellín, Colombia
          </address>

          {/* Live clock — COT */}
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#666" }}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isOpen ? "#22c55e" : "#f97316",
                flexShrink: 0,
              }}
            />
            <span>
              {t.contact.timePrefix} <time dateTime={time}>{time}</time>,{" "}
              {isOpen ? t.contact.open : t.contact.closed}
            </span>
          </div>
        </div>

        {/* Right: social */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em", marginBottom: 10, marginTop: 8 }}>
            {t.contact.social}
          </p>
          <nav aria-label="Social media links">
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="block text-sm text-[#444] leading-loose underline decoration-transparent hover:decoration-[#444] focus-visible:decoration-[#444] transition-[text-decoration-color] duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom strip — CTA mailto */}
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 80,
          borderRadius: 12,
          overflow: "hidden",
          minHeight: 240,
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0a0a0f 100%)",
          padding: "0 48px",
          textDecoration: "none",
          cursor: "pointer",
          transition: "filter 0.25s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
        onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
      >
        <div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            {t.contact.readyWhen}
          </p>
          <p style={{ color: "#fff", fontSize: "clamp(22px, 3vw, 38px)", fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400, margin: 0, letterSpacing: "-0.01em" }}>
            {t.contact.startConversation}
          </p>
        </div>
      </a>
    </div>
  );
}
