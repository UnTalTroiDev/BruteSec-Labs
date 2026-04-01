import { useRef, useEffect } from "react";

export const isFinePointer =
  typeof window !== "undefined"
    ? window.matchMedia("(pointer: fine)").matches
    : false;

export function Cursor({ dark }) {
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
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        raf.current = requestAnimationFrame(animate);
      } else {
        raf.current = null;
      }
    };

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
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
      aria-hidden="true"
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
