import { useState } from "react";
import { useLang } from "@/LangContext";
import { BruteSecLogo } from "@/components/shared/BruteSecLogo";

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com" },
  { label: "LinkedIn",    href: "https://linkedin.com" },
  { label: "GitHub",      href: "https://github.com" },
  { label: "Instagram",   href: "https://www.instagram.com/bruteseclabs/" },
];

export function Footer() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer
      style={{
        background: "#0a0a0a",
        color: "#fff",
        padding: "48px 48px 32px",
        marginTop: 0,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Top row */}
        <div
          className="footer-top-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 1fr 1fr 1.4fr",
            gap: 48,
            paddingBottom: 32,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <BruteSecLogo height={20} color="#fff" />
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 300 }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Address */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
              {t.footer.address}
            </p>
            <address style={{ fontStyle: "normal", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              CRA 29C #10C 125<br />
              Edificio SELECT<br />
              Barrio Poblado<br />
              Medellín, Colombia
            </address>
          </div>

          {/* Contact & social */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
              {t.footer.contact}
            </p>
            <address style={{ fontStyle: "normal", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 24 }}>
              <a href="mailto:brutek-sec@proton.me" style={{ color: "inherit", textDecoration: "none" }}>brutek-sec@proton.me</a>
            </address>

            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>
              {t.footer.social}
            </p>
            <nav aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.9, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
              {t.footer.advisories}
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
              {t.footer.newsletterText}
            </p>

            {sent ? (
              <p role="status" style={{ fontSize: 14, color: "#4ade80" }}>
                {t.footer.subscribed}
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 6,
                    padding: "10px 14px",
                    fontSize: 14,
                    color: "#fff",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#fff",
                    color: "#0a0a0a",
                    border: "none",
                    borderRadius: 6,
                    padding: "10px 14px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    letterSpacing: "0.02em",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {t.footer.subscribe}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            fontSize: 13,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          <span>© {new Date().getFullYear()} BruteSec Labs. {t.footer.allRights}</span>
          <span>{t.footer.legal}</span>
        </div>

      </div>
    </footer>
  );
}

export { SOCIAL_LINKS };
