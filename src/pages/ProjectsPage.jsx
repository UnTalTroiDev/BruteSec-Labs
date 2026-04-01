import { useState } from "react";
import { PROJECTS } from "@/data/projects";
import { useLang } from "@/LangContext";
import { useFadeIn, fadeStyle } from "@/hooks/useFadeIn";
import { BruteSecLogo } from "@/components/shared/BruteSecLogo";

const FILTER_KEYS = ["All", "Red Team", "Threat Intel", "Architecture"];

/* ── SVG patterns por tipo de proyecto ── */
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
      <path d="M 170 150 L 270 150 A 100 100 0 0 0 170 50 Z" fill={accent} opacity="0.08"/>
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

/* ── ProjectCard — accesible con teclado (Task 5) ── */
function ProjectCard({ project }) {
  const { t } = useLang();
  const [highlighted, setHighlighted] = useState(false);
  const PatternSVG = PATTERNS[project.pattern];

  return (
    <article
      tabIndex={0}
      role="article"
      aria-label={`${project.title} — ${t.projects.categories[project.category] ?? project.category}`}
      onMouseEnter={() => setHighlighted(true)}
      onMouseLeave={() => setHighlighted(false)}
      onFocus={() => setHighlighted(true)}
      onBlur={() => setHighlighted(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // Placeholder for future project link navigation
        }
      }}
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
        transform: highlighted ? "scale(1.015)" : "scale(1)",
        boxShadow: highlighted
          ? `0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}33`
          : "0 2px 12px rgba(0,0,0,0.3)",
        outline: "none",
      }}
    >
      {PatternSVG && PatternSVG(project.accent)}

      <div style={{
        position: "absolute",
        inset: 0,
        background: `linear-gradient(to top, ${project.color} 30%, transparent 70%)`,
        pointerEvents: "none",
      }} />

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
        {t.projects.categories[project.category] ?? project.category}
      </span>

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

      <span
        aria-hidden={!highlighted}
        style={{
          position: "relative",
          fontSize: 13,
          color: project.accent,
          marginTop: 8,
          opacity: highlighted ? 1 : 0,
          transform: highlighted ? "translateX(0)" : "translateX(-8px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          display: "block",
        }}
      >
        {t.projects.viewProject}
      </span>
    </article>
  );
}

/* ── ClientsCarousel — aria-hidden en duplicados (Task 6) ── */
const LOGO_COPIES = Array.from({ length: 14 });

function ClientsCarousel() {
  const { t } = useLang();
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
        {t.projects.trustedBy}
      </p>
      <div
        aria-hidden="true"
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

/* ── ProjectsPage ── */
export function ProjectsPage() {
  const { t } = useLang();
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
        {t.projects.heading}
      </h1>

      {/* Filter tabs — role tablist (Task 7) */}
      <div
        role="tablist"
        aria-label="Filter projects by category"
        style={{
          display: "flex",
          gap: 28,
          borderBottom: "1px solid #e0e0e0",
          marginBottom: 40,
          paddingBottom: 12,
        }}
      >
        {FILTER_KEYS.map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={active === key}
            onClick={() => setActive(key)}
            style={{
              background: "none",
              border: "none",
              fontSize: 14,
              cursor: "pointer",
              color: active === key ? "#111" : "#999",
              fontWeight: active === key ? 600 : 400,
              fontFamily: "inherit",
              padding: "0 0 4px",
              borderBottom: active === key ? "2px solid #111" : "2px solid transparent",
              letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
          >
            {t.projects.filters[key]}
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
