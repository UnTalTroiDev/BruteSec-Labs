import { motion } from "framer-motion";

function BruteSecLogo({ height = 26, color = "currentColor" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 352 52"
      height={height}
      style={{ display: "block", overflow: "visible", flexShrink: 0 }}
      aria-label="BruteSec Labs"
      role="img"
    >
      <text
        x="2"
        y="40"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontSize="40"
        fill={color}
      >
        <tspan fontWeight="300">] BruteSec </tspan>
        <tspan fontWeight="700">Labs</tspan>
        <tspan fontWeight="300"> [</tspan>
      </text>
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", bounce: 0.3, duration: 1.4, delay },
  }),
};

function HeroHeader() {
  const links = ["Research", "Advisories", "About us", "Contact"];
  return (
    <header
      style={{
        position: "relative",
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: "#ffffff",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <BruteSecLogo height={22} color="#0a0a0a" />

      <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
        {links.map((link) => (
          <a
            key={link}
            href="#"
            style={{
              color: "#555",
              fontSize: 14,
              textDecoration: "none",
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#0a0a0a")}
            onMouseLeave={(e) => (e.target.style.color = "#555")}
          >
            {link}
          </a>
        ))}
      </nav>

      <a
        href="#"
        style={{
          background: "#0a0a0a",
          color: "#fff",
          padding: "8px 20px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
          fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        Get Started
      </a>
    </header>
  );
}

export function HeroSection() {
  return (
    <div
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        position: "relative",
      }}
    >
      <HeroHeader />

      {/* Dark hero content */}
      <div
        style={{
          background: "#0a0a0a",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(255,255,255,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <section
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "80px 40px 96px",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{ display: "inline-flex", marginBottom: 40 }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                padding: "6px 14px 6px 10px",
                fontSize: 13,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ade80",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              New research published — CVE-2025-0149 analysis
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.5 }}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            style={{
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "0 0 24px",
              background: "linear-gradient(to bottom, #ffffff 40%, rgba(255,255,255,0.5))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Compelling security research sits at the core of everything we do
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.5)",
              maxWidth: 580,
              margin: "0 auto 48px",
              lineHeight: 1.7,
            }}
          >
            From red team tooling to threat intelligence reports — our work drives
            real-world impact across the security community.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
          >
            <a
              href="#"
              style={{
                background: "#fff",
                color: "#0a0a0a",
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              View Research
            </a>
            <a
              href="#"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.05)")}
            >
              Request a demo
            </a>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
