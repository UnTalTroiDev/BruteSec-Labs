import { useState, useEffect, useRef } from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { useLang } from "@/LangContext";

export function HomePage({ onDone }) {
  const { t } = useLang();
  const [leaving, setLeaving] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  const timers = useRef([]);

  const skip = () => {
    timers.current.forEach(clearTimeout);
    setLeaving(true);
    timers.current = [setTimeout(() => onDoneRef.current(), 400)];
  };

  useEffect(() => {
    timers.current = [
      setTimeout(() => setLeaving(true), 4000),
      setTimeout(() => onDoneRef.current(), 4400),
    ];
    return () => timers.current.forEach(clearTimeout);
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
      <BackgroundPaths title="BruteSec Labs" subtitle={t.home.subtitle} />

      {/* Skip intro button */}
      <button
        onClick={skip}
        aria-label="Skip intro"
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          background: "rgba(255,255,255,0.08)",
          color: "rgba(255,255,255,0.5)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 999,
          padding: "8px 18px",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontFamily: "inherit",
          transition: "background 0.2s, color 0.2s, border-color 0.2s",
          zIndex: 50,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.16)";
          e.currentTarget.style.color = "rgba(255,255,255,0.9)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        }}
      >
        Skip intro
      </button>
    </div>
  );
}
