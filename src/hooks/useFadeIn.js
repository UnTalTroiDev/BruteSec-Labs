import { useState, useEffect } from "react";

export function useFadeIn(delay = 60) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

export const fadeStyle = (visible) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(18px)",
  transition: "opacity 0.5s ease, transform 0.5s ease",
  padding: "0 48px",
  paddingBottom: 120,
  maxWidth: 1200,
  margin: "0 auto",
});
