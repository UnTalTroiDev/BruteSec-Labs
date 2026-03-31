import { useState, useEffect, useRef } from "react";
import { PROJECTS } from "./data/projects";
import { TEAM } from "./data/team";
import { BackgroundPaths } from "@/components/ui/background-paths";


/* ─────────────────────────────────────────────
   KEYFRAMES (inyectados una sola vez)
───────────────────────────────────────────── */
const KEYFRAMES = `
  @keyframes waveLetter {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  @keyframes fadeSubtitle {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes overlayIn {
    from { transform: translateY(100%); }
    to   { transform: translateY(0%); }
  }
  @keyframes overlayOut {
    from { transform: translateY(0%); }
    to   { transform: translateY(-100%); }
  }
  *:focus-visible {
    outline: 2px solid #111;
    outline-offset: 3px;
    border-radius: 4px;
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .clients-track:hover { animation-play-state: paused; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  html, body { margin: 0; overflow-x: hidden; }
  @media (max-width: 680px) {
    .page-wrap { padding-left: 20px !important; padding-right: 20px !important; }
    .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .footer-top-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    .advisory-row { grid-template-columns: 1fr !important; gap: 6px !important; }
    .advisory-arrow { display: none !important; }
  }
  @media (max-width: 480px) {
    .footer-top-grid { grid-template-columns: 1fr !important; }
  }
`;

/* ─────────────────────────────────────────────
   LOGO SVG (vectorizado)
───────────────────────────────────────────── */
function BruteSecLogo({ height = 24, color = "currentColor" }) {
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

function InjectStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}

/* ─────────────────────────────────────────────
   HOOK: fade-in on mount
───────────────────────────────────────────── */
function useFadeIn(delay = 60) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

const fadeStyle = (visible) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(18px)",
  transition: "opacity 0.5s ease, transform 0.5s ease",
  padding: "0 48px",
  paddingBottom: 120,
  maxWidth: 1200,
  margin: "0 auto",
});

/* ─────────────────────────────────────────────
   CUSTOM CURSOR (fine pointer devices only)
───────────────────────────────────────────── */
const isFinePointer =
  typeof window !== "undefined"
    ? window.matchMedia("(pointer: fine)").matches
    : false;

function Cursor({ dark }) {
  const cursorRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const curr = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    if (!isFinePointer) return;

    const animate = () => {
      const dx = pos.current.x - curr.current.x;
      const dy = pos.current.y - curr.current.y;
      curr.current.x += dx * 0.12;
      curr.current.y += dy * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${curr.current.x - 8}px, ${curr.current.y - 8}px)`;
      }
      // Only continue the loop while the cursor is still moving
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        raf.current = null;
      }
    };

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      // Restart loop on movement if it stopped
      if (!raf.current) {
        raf.current = requestAnimationFrame(animate);
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: dark ? "#fff" : "#111",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "background 0.3s ease",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   BOTTOM FLOATING NAV
───────────────────────────────────────────── */
function BottomNav({ page, setPage }) {
  const links = ["Projects", "About us", "Contact"];
  return (
    <nav
      aria-label="Page navigation"
      style={{
        position: "fixed",
        bottom: 28,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#fff",
        borderRadius: 999,
        padding: "10px 6px",
        display: "flex",
        gap: 2,
        boxShadow: "0 2px 24px rgba(0,0,0,0.13)",
        zIndex: 100,
        border: "1px solid #e8e8e8",
      }}
    >
      {links.map((link) => {
        const active = page === link;
        return (
          <button
            key={link}
            onClick={() => setPage(link)}
            aria-current={active ? "page" : undefined}
            style={{
              background: active ? "#111" : "transparent",
              color: active ? "#fff" : "#111",
              border: "none",
              borderRadius: 999,
              padding: "8px 20px",
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.01em",
              transition: "background 0.2s, color 0.2s",
              fontFamily: "inherit",
            }}
          >
            {link}
          </button>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   PAGE: HOME
───────────────────────────────────────────── */
const TITLE_CHARS = "BruteSec Labs".split("");

function HomePage({ onDone }) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  useEffect(() => {
    // 1. aparece el texto
    const t1 = setTimeout(() => setReady(true), 80);
    // 2. después de 4s empieza el fade-out
    const t2 = setTimeout(() => setLeaving(true), 4000);
    // 3. cuando termina el fade-out (~400ms) navega
    const t3 = setTimeout(() => onDoneRef.current(), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        marginTop: "-76px",
        opacity: leaving ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
    >
      <BackgroundPaths title="BruteSec Labs" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: PROJECTS
───────────────────────────────────────────── */
const FILTERS = ["All", "Red Team", "Threat Intel", "Architecture"];

function ProjectsPage() {
  const [active, setActive] = useState("All");
  const visible = useFadeIn();

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <div className="page-wrap" style={fadeStyle(visible)}>
      <h1
        style={{
          fontSize: "clamp(28px, 4.5vw, 54px)",
          fontWeight: 400,
          lineHeight: 1.12,
          maxWidth: 640,
          marginTop: 48,
          marginBottom: 48,
          fontFamily: "'Georgia', 'Times New Roman', serif",
          letterSpacing: "-0.02em",
        }}
      >
        Compelling security research sits at the core of everything we do
      </h1>

      {/* Filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 28,
          borderBottom: "1px solid #e0e0e0",
          marginBottom: 40,
          paddingBottom: 12,
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              background: "none",
              border: "none",
              fontSize: 14,
              cursor: "pointer",
              color: active === f ? "#111" : "#999",
              fontWeight: active === f ? 600 : 400,
              fontFamily: "inherit",
              padding: "0 0 4px",
              borderBottom: active === f ? "2px solid #111" : "2px solid transparent",
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 16,
        }}
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <ClientsCarousel />
    </div>
  );
}

/* SVG patterns por tipo de proyecto */
const PATTERNS = {
  terminal: (accent) => (
    <svg width="100%" height="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false"
      style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
      <text x="24" y="60"  fontFamily="monospace" fontSize="11" fill={accent}>$ nmap -sS -O 192.168.1.0/24</text>
      <text x="24" y="80"  fontFamily="monospace" fontSize="11" fill="#fff">Starting Nmap 7.94 scan...</text>
      <text x="24" y="100" fontFamily="monospace" fontSize="11" fill={accent}>Host: 192.168.1.1 [open]</text>
      <text x="24" y="120" fontFamily="monospace" fontSize="11" fill="#fff">22/tcp  open  ssh</text>
      <text x="24" y="140" fontFamily="monospace" fontSize="11" fill="#fff">80/tcp  open  http</text>
      <text x="24" y="160" fontFamily="monospace" fontSize="11" fill={accent}>443/tcp open  https</text>
      <text x="24" y="180" fontFamily="monospace" fontSize="11" fill="#fff">$ _</text>
    </svg>
  ),
  network: (accent) => (
    <svg width="100%" height="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false"
      style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
      <circle cx="170" cy="150" r="30" stroke={accent} strokeWidth="1"/>
      <circle cx="170" cy="150" r="60" stroke={accent} strokeWidth="0.5" strokeDasharray="4 4"/>
      <circle cx="170" cy="150" r="90" stroke={accent} strokeWidth="0.5" strokeDasharray="2 6"/>
      <circle cx="60"  cy="80"  r="8"  fill={accent} opacity="0.6"/>
      <circle cx="280" cy="100" r="8"  fill={accent} opacity="0.6"/>
      <circle cx="90"  cy="220" r="8"  fill={accent} opacity="0.6"/>
      <circle cx="260" cy="230" r="8"  fill={accent} opacity="0.6"/>
      <line x1="60"  y1="80"  x2="170" y2="150" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
      <line x1="280" y1="100" x2="170" y2="150" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
      <line x1="90"  y1="220" x2="170" y2="150" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
      <line x1="260" y1="230" x2="170" y2="150" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
    </svg>
  ),
  grid: (accent) => (
    <svg width="100%" height="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false"
      style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
      {[...Array(8)].map((_, i) => (
        <line key={`v${i}`} x1={i * 48} y1="0" x2={i * 48} y2="300" stroke={accent} strokeWidth="0.5"/>
      ))}
      {[...Array(7)].map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="340" y2={i * 50} stroke={accent} strokeWidth="0.5"/>
      ))}
      <rect x="96" y="100" width="48" height="50" fill={accent} opacity="0.3"/>
      <rect x="144" y="50"  width="48" height="100" fill={accent} opacity="0.3"/>
      <rect x="192" y="150" width="48" height="50" fill={accent} opacity="0.3"/>
      <rect x="240" y="0"   width="48" height="200" fill={accent} opacity="0.2"/>
    </svg>
  ),
  hook: (accent) => (
    <svg width="100%" height="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false"
      style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
      <path d="M 170 40 L 170 160 Q 170 210 210 210 Q 250 210 250 170 Q 250 140 220 140"
        stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M 205 125 L 220 140 L 205 155" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="170" cy="36" r="6" fill={accent} opacity="0.7"/>
      {[...Array(5)].map((_, i) => (
        <line key={i} x1={80 + i * 40} y1="250" x2={80 + i * 40} y2="270"
          stroke={accent} strokeWidth="1" opacity="0.3"/>
      ))}
    </svg>
  ),
  radar: (accent) => (
    <svg width="100%" height="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false"
      style={{ position: "absolute", inset: 0, opacity: 0.2 }}>
      <circle cx="170" cy="150" r="100" stroke={accent} strokeWidth="0.5"/>
      <circle cx="170" cy="150" r="70"  stroke={accent} strokeWidth="0.5"/>
      <circle cx="170" cy="150" r="40"  stroke={accent} strokeWidth="0.5"/>
      <line x1="70"  y1="150" x2="270" y2="150" stroke={accent} strokeWidth="0.5"/>
      <line x1="170" y1="50"  x2="170" y2="250" stroke={accent} strokeWidth="0.5"/>
      <line x1="99"  y1="79"  x2="241" y2="221" stroke={accent} strokeWidth="0.5"/>
      <line x1="241" y1="79"  x2="99"  y2="221" stroke={accent} strokeWidth="0.5"/>
      <path d="M 170 150 L 270 150 A 100 100 0 0 0 170 50 Z"
        fill={accent} opacity="0.08"/>
      <circle cx="230" cy="100" r="5" fill={accent} opacity="0.8"/>
      <circle cx="140" cy="200" r="3" fill={accent} opacity="0.5"/>
    </svg>
  ),
  shield: (accent) => (
    <svg width="100%" height="100%" viewBox="0 0 340 300" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false"
      style={{ position: "absolute", inset: 0, opacity: 0.18 }}>
      <path d="M 170 40 L 240 70 L 240 155 Q 240 210 170 240 Q 100 210 100 155 L 100 70 Z"
        stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.05"/>
      <path d="M 170 40 L 240 70 L 240 155 Q 240 210 170 240 Q 100 210 100 155 L 100 70 Z"
        stroke={accent} strokeWidth="0.5" fill="none"
        transform="scale(0.75) translate(56 50)"/>
      <path d="M 148 145 L 163 160 L 195 128" stroke={accent} strokeWidth="2.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const PatternSVG = PATTERNS[project.pattern];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: project.color,
        borderRadius: 10,
        overflow: "hidden",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 28,
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        transform: hovered ? "scale(1.015)" : "scale(1)",
        boxShadow: hovered
          ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}33`
          : "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Patrón SVG de fondo */}
      {PatternSVG && PatternSVG(project.accent)}

      {/* Gradiente oscuro en la parte baja para legibilidad del título */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(to top, ${project.color} 30%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Category tag con color de acento */}
      <span
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: project.accent,
          background: `${project.accent}18`,
          border: `1px solid ${project.accent}40`,
          padding: "4px 10px",
          borderRadius: 999,
        }}
      >
        {project.category}
      </span>

      {/* Título */}
      <h3
        style={{
          position: "relative",
          fontSize: 22,
          fontWeight: 400,
          fontFamily: "'Georgia', 'Times New Roman', serif",
          color: "#fff",
          margin: 0,
          letterSpacing: "-0.01em",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>

      {/* Flecha hover */}
      <span
        style={{
          position: "relative",
          fontSize: 13,
          color: project.accent,
          marginTop: 8,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          display: "block",
        }}
      >
        View project →
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CLIENTS CAROUSEL
───────────────────────────────────────────── */
const LOGO_COPIES = Array.from({ length: 14 });

function ClientsCarousel() {
  return (
    <div style={{ marginTop: 80 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#bbb",
          marginBottom: 28,
        }}
      >
        Trusted by
      </p>
      <div
        style={{
          maskImage: "linear-gradient(to right, transparent, #fff 10%, #fff 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #fff 10%, #fff 90%, transparent)",
          overflow: "hidden",
        }}
      >
        <div
          className="clients-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            width: "max-content",
            animation: "marquee 28s linear infinite",
          }}
        >
          {LOGO_COPIES.map((_, i) => (
            <BruteSecLogo key={i} height={28} color="#c8c8c8" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: ABOUT US
───────────────────────────────────────────── */
const SERVICES = [
  "Penetration Testing",
  "Red Team Operations",
  "Threat Intelligence",
  "Security Architecture Review",
  "Incident Response Readiness",
];

function AboutPage() {
  const visible = useFadeIn();

  return (
    <div className="page-wrap" style={fadeStyle(visible)}>
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          marginTop: 48,
          alignItems: "start",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(28px, 4.5vw, 54px)",
              fontWeight: 400,
              lineHeight: 1.12,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: "-0.02em",
              marginTop: 0,
              marginBottom: 32,
            }}
          >
            We break things so others don't have to.
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "#444",
              marginBottom: 24,
              maxWidth: 480,
            }}
          >
            BruteSec Labs is an offensive security consultancy focused on
            adversarial simulation, threat intelligence, and zero-trust
            architecture. We operate at the intersection of research and
            real-world impact.
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.75,
              color: "#444",
              maxWidth: 480,
            }}
          >
            Our team is built from practitioners — red teamers, malware
            analysts, and researchers who have spent years working in
            environments where failure is not an option.
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: 24,
              marginTop: 4,
            }}
          >
            Our Team
          </p>
          {TEAM.map((member) => (
            <div
              key={member.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 0",
                borderBottom: "1px solid #e8e8e8",
              }}
            >
              <span
                style={{
                  fontSize: 16,
                  fontFamily: "'Georgia', 'Times New Roman', serif",
                  fontWeight: 400,
                }}
              >
                {member.name}
              </span>
              <span style={{ fontSize: 13, color: "#888" }}>{member.role}</span>
            </div>
          ))}

          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#999",
              marginBottom: 16,
              marginTop: 48,
            }}
          >
            Services
          </p>
          {SERVICES.map((s) => (
            <div
              key={s}
              style={{
                padding: "14px 0",
                borderBottom: "1px solid #e8e8e8",
                fontSize: 15,
                color: "#222",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: CONTACT
───────────────────────────────────────────── */
const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Blog", href: "#" },
];

function ContactPage() {
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
          Let's work together. We'd love to hear from you.
        </h1>

        {/* Middle: general enquiries */}
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.01em",
              marginBottom: 10,
              marginTop: 8,
            }}
          >
            General Enquiries
          </p>
          <p style={{ fontSize: 14, color: "#444", margin: 0, lineHeight: 1.7 }}>
            hello@bruteseclabs.io
            <br />
            +1 (555) 0198 2847
          </p>

          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.01em",
              marginTop: 28,
              marginBottom: 10,
            }}
          >
            Address
          </p>
          <p style={{ fontSize: 14, color: "#444", margin: 0, lineHeight: 1.7 }}>
            Cyber District
            <br />
            420 Binary Lane
            <br />
            Austin, TX 78701
          </p>

          {/* Live clock */}
          <div
            style={{
              marginTop: 28,
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "#666",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: isOpen ? "#22c55e" : "#f97316",
                flexShrink: 0,
              }}
            />
            It's {time},{" "}
            {isOpen ? "we're open" : "we're closed"}
          </div>
        </div>

        {/* Right: social */}
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.01em",
              marginBottom: 10,
              marginTop: 8,
            }}
          >
            Social
          </p>
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.textDecorationColor = "#444")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.textDecorationColor = "transparent")
              }
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          marginTop: 80,
          borderRadius: 12,
          overflow: "hidden",
          height: 240,
          background:
            "linear-gradient(135deg, #0f0f1a 0%, #1a1a3e 50%, #0a0a0f 100%)",
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
        }}
      >
        <div>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Ready when you are
          </p>
          <p
            style={{
              color: "#fff",
              fontSize: "clamp(22px, 3vw, 38px)",
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontWeight: 400,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Start a conversation →
          </p>
        </div>
      </div>
    </div>
  );
}

function Footer() {
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
        padding: "72px 48px 40px",
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
            paddingBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <BruteSecLogo height={20} color="#fff" />
            </div>
            <p
              style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                maxWidth: 300,
              }}
            >
              Offensive security consultancy focused on adversarial simulation,
              threat intelligence, and zero-trust architecture.
            </p>
          </div>

          {/* Address */}
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Address
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              Cyber District
              <br />
              420 Binary Lane
              <br />
              Austin, TX 78701
            </p>
          </div>

          {/* Contact & social */}
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Contact
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 24 }}>
              hello@bruteseclabs.io
              <br />
              +1 (555) 0198 2847
            </p>

            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 12,
              }}
            >
              Social
            </p>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.9,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Newsletter */}
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              Security Advisories
            </p>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20 }}>
              Get our latest advisories, writeups, and threat reports directly in your inbox.
            </p>

            {sent ? (
              <p style={{ fontSize: 14, color: "#4ade80" }}>
                ✓ Successfully subscribed
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
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
                  Subscribe
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
          <span>© {new Date().getFullYear()} BruteSec Labs. All rights reserved.</span>
          <span>Privacy Policy · Terms of Service</span>
        </div>

      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("Home");
  const [displayPage, setDisplayPage] = useState("Home");
  // overlay: null | "in" | "out"
  const [overlay, setOverlay] = useState(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);

  const navigate = (newPage) => {
    if (newPage === displayPage) return;
    // Clear any in-flight timers to prevent race conditions on rapid clicks
    clearTimeout(t1Ref.current);
    clearTimeout(t2Ref.current);
    // 1. overlay entra desde abajo (320ms)
    setOverlay("in");
    t1Ref.current = setTimeout(() => {
      // 2. cambia la página cuando está cubierta
      setDisplayPage(newPage);
      setPage(newPage);
      window.scrollTo(0, 0);
      // 3. overlay sale hacia arriba (320ms)
      setOverlay("out");
      t2Ref.current = setTimeout(() => setOverlay(null), 320);
    }, 320);
  };

  const isHome = displayPage === "Home";
  const isOverlayActive = overlay !== null;
  const headerBg = isHome ? "#0a0a0a" : "#fff";
  const logoColor = isHome ? "#fff" : "#111";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isHome ? "#0a0a0a" : "#fff",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        cursor: isFinePointer ? "none" : "auto",
        color: "#111",
        overflowX: "hidden",
      }}
    >
      <InjectStyles />
      <Cursor dark={isHome || isOverlayActive} />

      {/* Overlay de transición */}
      {overlay && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#0a0a0a",
            zIndex: 200,
            animation: `${overlay === "in" ? "overlayIn" : "overlayOut"} 0.32s cubic-bezier(0.76, 0, 0.24, 1) forwards`,
          }}
        />
      )}

      {/* Logo / wordmark */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 150,
          background: headerBg,
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 48px 0" }}>
          <button
            onClick={() => navigate("Home")}
            style={{
              background: "none",
              border: "none",
              cursor: isFinePointer ? "none" : "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => { if (!isFinePointer) e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <BruteSecLogo height={22} color={logoColor} />
          </button>
        </div>
      </header>

      {/* Page content */}
      <main>
        {displayPage === "Home"     && <HomePage onDone={() => navigate("Projects")} />}
        {displayPage === "Projects" && <ProjectsPage />}
        {displayPage === "About us" && <AboutPage />}
        {displayPage === "Contact"  && <ContactPage />}
        {displayPage !== "Home"     && <Footer />}
      </main>

      <BottomNav page={page} setPage={navigate} />
    </div>
  );
}
