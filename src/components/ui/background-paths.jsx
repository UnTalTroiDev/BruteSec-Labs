import { motion, useReducedMotion } from "framer-motion";

function FloatingPaths({ position }) {
  const shouldReduce = useReducedMotion();
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M${-380 + i * 5 * position} ${-189 + i * 6}C${-380 + i * 5 * position} ${-189 + i * 6} ${-312 + i * 5} ${216 - i * 6} ${152 + i * 5} ${343 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  if (shouldReduce) {
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <svg style={{ width: "100%", height: "100%", color: "#fff" }} viewBox="0 0 696 316" fill="none" aria-hidden="true">
          <defs>
            <radialGradient id={`fade-${position}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="black" stopOpacity="1" />
              <stop offset="55%" stopColor="black" stopOpacity="1" />
              <stop offset="80%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="1" />
            </radialGradient>
            <mask id={`mask-${position}`}>
              <rect width="696" height="316" fill={`url(#fade-${position})`} />
            </mask>
          </defs>
          <g mask={`url(#mask-${position})`}>
            {paths.map((path) => (
              <path
                key={path.id}
                d={path.d}
                stroke="currentColor"
                strokeWidth={path.width}
                strokeOpacity={0.1 + path.id * 0.03}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <svg style={{ width: "100%", height: "100%", color: "#fff" }} viewBox="0 0 696 316" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id={`fade-${position}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="1" />
            <stop offset="55%" stopColor="black" stopOpacity="1" />
            <stop offset="80%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </radialGradient>
          <mask id={`mask-${position}`}>
            <rect width="696" height="316" fill={`url(#fade-${position})`} />
          </mask>
        </defs>
        <g mask={`url(#mask-${position})`}>
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              initial={{ pathLength: 0.3, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: [0, 1, 1, 0],
                pathOffset: [0, 1, 2],
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                delay: -5 * path.id,
              }}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function BackgroundPaths({ title = "Background Paths", tagline, subtitle }) {
  const shouldReduce = useReducedMotion();
  const words = title.split(" ");

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "#0a0a0a",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={shouldReduce ? { duration: 0 } : { duration: 2 }}
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(52px, 10vw, 128px)",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            margin: 0,
            lineHeight: 1,
          }}
        >
          {words.map((word, wordIndex) => (
            <span key={wordIndex} style={{ display: "inline-block", marginRight: "0.25em" }}>
              {word.split("").map((letter, letterIndex) =>
                shouldReduce ? (
                  <span
                    key={letterIndex}
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.75))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {letter}
                  </span>
                ) : (
                  <motion.span
                    key={letterIndex}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    style={{
                      display: "inline-block",
                      background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.75))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {letter}
                  </motion.span>
                )
              )}
            </span>
          ))}
        </h1>

        {tagline && (
          shouldReduce ? (
            <p
              style={{
                marginTop: 16,
                fontSize: "clamp(18px, 3.5vw, 52px)",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {tagline}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
              style={{
                marginTop: 16,
                fontSize: "clamp(18px, 3.5vw, 52px)",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                background: "linear-gradient(to right, #ffffff, rgba(255,255,255,0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {tagline}
            </motion.p>
          )
        )}

        {subtitle && (
          shouldReduce ? (
            <p
              style={{
                marginTop: 24,
                fontSize: "clamp(16px, 2vw, 26px)",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.02em",
                fontWeight: 400,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {subtitle}
            </p>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              style={{
                marginTop: 24,
                fontSize: "clamp(16px, 2vw, 26px)",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.02em",
                fontWeight: 400,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {subtitle}
            </motion.p>
          )
        )}
      </motion.div>
    </div>
  );
}
