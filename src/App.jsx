import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { LangProvider, useLang } from "./LangContext";
import { InjectStyles } from "./styles/globalKeyframes";
import { BruteSecLogo } from "./components/shared/BruteSecLogo";
import { Cursor, isFinePointer } from "./components/shared/Cursor";
import { BottomNav } from "./components/shared/BottomNav";
import { Footer } from "./components/shared/Footer";

/* ── Code splitting: páginas cargadas bajo demanda (Task 11) ── */
const HomePage    = lazy(() => import("./pages/HomePage").then(m => ({ default: m.HomePage })));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage").then(m => ({ default: m.ProjectsPage })));
const AboutPage   = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then(m => ({ default: m.ContactPage })));

/* ── AppInner ── */
function AppInner() {
  const { lang, setLang } = useLang();
  const [page, setPage] = useState("Home");
  const [displayPage, setDisplayPage] = useState("Home");
  const [overlay, setOverlay] = useState(null);
  const t1Ref = useRef(null);
  const t2Ref = useRef(null);

  /* Actualizar lang en <html> al cambiar idioma (Task 2) */
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const navigate = (newPage) => {
    if (newPage === displayPage) return;
    clearTimeout(t1Ref.current);
    clearTimeout(t2Ref.current);
    setOverlay("in");
    t1Ref.current = setTimeout(() => {
      setDisplayPage(newPage);
      setPage(newPage);
      window.scrollTo(0, 0);
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

      {/* Skip link — Task 4 */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Transition overlay */}
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            background: "#0a0a0a",
            zIndex: 200,
            animation: `${overlay === "in" ? "overlayIn" : "overlayOut"} 0.32s cubic-bezier(0.76, 0, 0.24, 1) forwards`,
          }}
        />
      )}

      {/* Header — Task 4 */}
      <header
        aria-label="Site header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 150,
          background: headerBg,
          transition: "background 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 48px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button
            onClick={() => navigate("Home")}
            aria-label="Go to home"
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

          {/* Language toggle */}
          <div
            role="group"
            aria-label="Language selection"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              background: isHome ? "rgba(255,255,255,0.08)" : "#f0f0f0",
              borderRadius: 999,
              padding: "3px 4px",
            }}
          >
            {["en", "es"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                aria-label={l === "en" ? "Switch to English" : "Cambiar a Español"}
                style={{
                  background: lang === l ? (isHome ? "#fff" : "#111") : "transparent",
                  color: lang === l ? (isHome ? "#111" : "#fff") : (isHome ? "rgba(255,255,255,0.5)" : "#888"),
                  border: "none",
                  borderRadius: 999,
                  padding: "4px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textTransform: "uppercase",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content — Tasks 4 & 11 */}
      <main id="main-content">
        <Suspense fallback={null}>
          {displayPage === "Home"     && <HomePage onDone={() => navigate("Projects")} />}
          {displayPage === "Projects" && <ProjectsPage />}
          {displayPage === "About us" && <AboutPage />}
          {displayPage === "Contact"  && <ContactPage />}
        </Suspense>
        {displayPage !== "Home" && <Footer />}
      </main>

      <BottomNav page={page} setPage={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
