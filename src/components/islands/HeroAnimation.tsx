import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import config from "../../lib/wedding-config";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function WordReveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span style={{ display: "block", overflow: "hidden" }}>
      <motion.span
        style={{ display: "block", ...style }}
        initial={{ y: "108%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.6, 0.82]);

  return (
    <div ref={containerRef} className="relative overflow-hidden" style={{ height: "100svh", minHeight: "600px" }}>

      {/* Parallax image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <img
          src={config.images.hero}
          alt=""
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.12)", transformOrigin: "center center" }}
          fetchPriority="high"
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: overlayOpacity,
            background: "linear-gradient(165deg, #1A1A18 0%, #251e10 100%)",
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(26,26,24,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* Left vertical rule */}
      <div className="absolute left-8 md:left-14 top-0 bottom-0 z-10 flex flex-col items-center">
        <motion.div
          style={{ width: "1px", backgroundColor: "rgba(184,150,90,0.35)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.6, delay: 1.7, ease }}
          className="h-40 md:h-56 mt-24"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          style={{
            writingMode: "vertical-rl",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "9px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(255,251,245,0.35)",
            fontWeight: 500,
            marginTop: "14px",
          }}
        >
          Tagaytay · Philippines
        </motion.span>
      </div>

      {/* Main content — bottom-anchored */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col justify-end px-6 pb-14 md:px-20 lg:px-28 md:pb-18"
        style={{ y: contentY }}
      >
        {/* Couple names */}
        <div
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: "clamp(4rem, 12.5vw, 10.5rem)",
            fontWeight: 400,
            color: "var(--cream)",
            lineHeight: 0.88,
            letterSpacing: "-0.01em",
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <WordReveal delay={0.25}>{config.couple.partner1}</WordReveal>

          {/* & row */}
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(0.8rem, 2.5vw, 2.5rem)", overflow: "hidden", marginTop: "0.05em" }}>
            <motion.div
              style={{ height: "1px", background: "var(--gold)", opacity: 0.4, flexShrink: 0 }}
              initial={{ width: 0 }}
              animate={{ width: "clamp(36px, 5.5vw, 72px)" }}
              transition={{ duration: 1, delay: 0.9, ease }}
            />
            <span style={{ overflow: "hidden", display: "block" }}>
              <motion.span
                style={{
                  display: "block",
                  fontFamily: "'Cormorant', serif",
                  fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--gold)",
                  lineHeight: 1.05,
                  letterSpacing: "0.02em",
                }}
                initial={{ y: "108%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.5, ease }}
              >
                &amp;
              </motion.span>
            </span>
            <motion.div
              style={{ height: "1px", background: "var(--gold)", opacity: 0.4, flexShrink: 0 }}
              initial={{ width: 0 }}
              animate={{ width: "clamp(36px, 5.5vw, 72px)" }}
              transition={{ duration: 1, delay: 0.9, ease }}
            />
          </div>

          <WordReveal delay={0.62}>{config.couple.partner2}</WordReveal>
        </div>

        {/* Info row */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 mb-10 md:mb-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
        >
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "5px" }}>
              Date
            </p>
            <p style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,251,245,0.7)", fontWeight: 300, letterSpacing: "0.04em" }}>
              {config.date.dayOfWeek}, {config.date.display}
            </p>
          </div>
          <div style={{ width: "1px", height: "32px", background: "rgba(184,150,90,0.22)" }} className="hidden sm:block" />
          <div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "5px" }}>
              Venue
            </p>
            <p style={{ fontFamily: "'Cormorant', serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "rgba(255,251,245,0.7)", fontWeight: 300, letterSpacing: "0.04em" }}>
              {config.venue.name}, {config.venue.city}
            </p>
          </div>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="flex flex-wrap items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.35, ease }}
        >
          <motion.a
            href="#rsvp"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--cream)",
              padding: "15px 38px",
              border: "1px solid rgba(255,251,245,0.28)",
              display: "inline-block",
              transition: "border-color 0.35s ease, color 0.35s ease",
            }}
            whileHover={{ borderColor: "rgba(184,150,90,0.7)", color: "var(--gold-light)" }}
          >
            Reserve Your Seat
          </motion.a>

          <motion.a
            href="#our-story"
            className="inline-flex items-center gap-3"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,251,245,0.4)",
              transition: "color 0.3s ease",
            }}
            whileHover={{ color: "rgba(255,251,245,0.8)" }}
          >
            <span>Our Story</span>
            <svg width="22" height="8" viewBox="0 0 22 8" fill="none">
              <path d="M0 4H20M17 1L20 4L17 7" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round"/>
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Right scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-14 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.1 }}
      >
        <motion.span
          style={{
            writingMode: "vertical-rl",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "8px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(255,251,245,0.32)",
            fontWeight: 500,
          }}
        >
          Scroll
        </motion.span>
        <motion.div
          style={{ width: "1px", backgroundColor: "rgba(255,251,245,0.22)", transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.3, delay: 2.3, ease }}
          className="h-20 md:h-28"
        />
      </motion.div>

      {/* Top-right date stamp */}
      <motion.div
        className="absolute z-10 hidden md:block"
        style={{ top: "96px", right: "56px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
      >
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "8px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,251,245,0.28)", fontWeight: 500 }}>
          11 · 07 · 2026
        </p>
      </motion.div>
    </div>
  );
}
