import { useState, useEffect, useRef } from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { useLang } from "@/LangContext";

export function HomePage({ onDone }) {
  const { t } = useLang();
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; });

  useEffect(() => {
    const t1 = setTimeout(() => setReady(true), 80);
    const t2 = setTimeout(() => setLeaving(true), 4000);
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
      <BackgroundPaths title="BruteSec Labs" subtitle={t.home.subtitle} />
    </div>
  );
}
