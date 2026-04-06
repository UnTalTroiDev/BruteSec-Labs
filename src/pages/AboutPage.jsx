import { useLang } from "@/LangContext";
import { useFadeIn, fadeStyle } from "@/hooks/useFadeIn";
import { TEAM } from "@/data/team";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw, Bot, GitBranch, Shield } from "lucide-react";

function AboutFeatureCards() {
  const { t } = useLang();
  const shouldReduceMotion = useReducedMotion();

  const features = [
    { key: "continuous", icon: RefreshCw },
    { key: "ai",         icon: Bot       },
    { key: "devsecops",  icon: GitBranch },
    { key: "redteam",    icon: Shield    },
  ].map(({ key, icon }) => ({
    title: t.about.bento[key].title,
    description: t.about.bento[key].desc,
    icon,
  }));

  const words = t.about.differential.heading.split(" ");

  return (
    <div style={{ marginTop: 80 }}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: 16,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.25em",
        }}>
          {words.map((word, i) =>
            shouldReduceMotion ? (
              <span key={i}>{word}</span>
            ) : (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                style={{ display: "inline-block" }}
              >
                {word}
              </motion.span>
            )
          )}
        </h2>

        {shouldReduceMotion ? (
          <p style={{ fontSize: 15, color: "#888", marginBottom: 0 }}>
            {t.about.differential.sub}
          </p>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: words.length * 0.12 + 0.1, duration: 0.5, ease: "easeOut" }}
            style={{ fontSize: 15, color: "#888", marginBottom: 0 }}
          >
            {t.about.differential.sub}
          </motion.p>
        )}
      </div>

      <div
        style={{ marginTop: 40 }}
        className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-4"
      >
        {features.map((feature, i) =>
          shouldReduceMotion ? (
            <FeatureCard key={i} feature={feature} index={i} />
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5, ease: "easeOut" }}
            >
              <FeatureCard feature={feature} index={i} />
            </motion.div>
          )
        )}
      </div>

      {/* CTA post-bento */}
      <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
        <a
          href="mailto:brutek-sec@proton.me"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "#111",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            letterSpacing: "0.01em",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          {t.about.bentoCta}
        </a>
      </div>
    </div>
  );
}

export function AboutPage() {
  const { t, lang } = useLang();
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
            {t.about.heading}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#444", marginBottom: 24, maxWidth: 480 }}>
            {t.about.p1}
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: "#444", maxWidth: 480 }}>
            {t.about.p2}
          </p>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 24, marginTop: 4 }}>
            {t.about.ourTeam}
          </p>
          {TEAM.map((member) => (
            <div
              key={member.name}
              style={{ padding: "18px 0", borderBottom: "1px solid #e8e8e8" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 400 }}>
                  {member.name}
                </span>
                <span style={{ fontSize: 13, color: "#888" }}>
                  {t.about.roles[member.role] ?? member.role}
                </span>
              </div>
              {member.bio && (
                <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 4px", lineHeight: 1.5 }}>
                  {lang === "es" && member.bioEs ? member.bioEs : member.bio}
                </p>
              )}
              {member.certs && member.certs.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {member.certs.map((cert) => (
                    <span
                      key={cert}
                      style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", color: "#666", background: "#f0f0f0", padding: "2px 8px", borderRadius: 999 }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 16, marginTop: 48 }}>
            {t.about.services}
          </p>
          {t.about.servicesList.map((s) => (
            <div
              key={s.name}
              style={{ padding: "14px 0", borderBottom: "1px solid #e8e8e8" }}
            >
              <p style={{ fontSize: 15, color: "#222", margin: "0 0 4px", fontWeight: 500 }}>{s.name}</p>
              {s.desc && (
                <p style={{ fontSize: 12, color: "#888", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <AboutFeatureCards />
    </div>
  );
}
