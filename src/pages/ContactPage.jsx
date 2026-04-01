import { useState, useEffect } from "react";
import { useLang } from "@/LangContext";
import { useFadeIn, fadeStyle } from "@/hooks/useFadeIn";

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com" },
  { label: "LinkedIn",    href: "https://linkedin.com" },
  { label: "GitHub",      href: "https://github.com" },
  { label: "Instagram",   href: "https://www.instagram.com/bruteseclabs/" },
];

export function ContactPage() {
  const { t } = useLang();
  const visible = useFadeIn();
  const [time, setTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      setTime(`${h}:${m}`);
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
        {/* Left: headline */}
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

        {/* Middle: general enquiries */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em", marginBottom: 10, marginTop: 8 }}>
            {t.contact.generalEnquiries}
          </p>
          <address style={{ fontStyle: "normal", fontSize: 14, color: "#444", margin: 0, lineHeight: 1.7 }}>
            <a href="mailto:hello@bruteseclabs.io" style={{ color: "inherit", textDecoration: "none" }}>
              hello@bruteseclabs.io
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

          {/* Live clock */}
          <div
            style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#666" }}
          >
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
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "#444",
                  lineHeight: 2,
                  textDecoration: "underline",
                  textDecorationColor: "transparent",
                  transition: "text-decoration-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.textDecorationColor = "#444")}
                onMouseLeave={(e) => (e.currentTarget.style.textDecorationColor = "transparent")}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom strip — CTA mailto */}
      <a
        href="mailto:hello@bruteseclabs.io"
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
