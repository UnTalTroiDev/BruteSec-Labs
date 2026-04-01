import { useEffect } from "react";

export const KEYFRAMES = `
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
  /* Skip link */
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #111;
    color: #fff;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    text-decoration: none;
    border-radius: 0 0 4px 0;
    transition: top 0.2s;
  }
  .skip-link:focus {
    top: 0;
  }
`;

export function InjectStyles() {
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
    return () => document.head.removeChild(el);
  }, []);
  return null;
}
