import { useLang } from "@/LangContext";

export function BottomNav({ page, setPage }) {
  const { t } = useLang();
  const links = [
    { key: "Projects", label: t.nav.projects },
    { key: "About us", label: t.nav.aboutUs },
    { key: "Contact",  label: t.nav.contact  },
  ];

  return (
    <nav
      aria-label="Page navigation"
      className="fixed bottom-7 left-1/2 -translate-x-1/2 flex gap-0.5 rounded-full border border-[#e8e8e8] bg-white px-1.5 py-2.5 shadow-[0_2px_24px_rgba(0,0,0,0.13)] z-[100]"
    >
      {links.map(({ key, label }) => {
        const active = page === key;
        return (
          <button
            key={key}
            onClick={() => setPage(key)}
            aria-current={active ? "page" : undefined}
            className={`rounded-full px-5 py-2 text-[13.5px] font-medium tracking-[0.01em] transition-colors duration-200 cursor-pointer border-none font-[inherit] ${
              active ? "bg-[#111] text-white" : "bg-transparent text-[#111]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}
