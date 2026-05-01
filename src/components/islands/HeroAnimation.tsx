import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import config from "../../lib/wedding-config";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

export default function HeroAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const smoothImageY = useSpring(imageY, { stiffness: 100, damping: 30 });

  const springConfig = { type: "spring" as const, stiffness: 120, damping: 20 };

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background photo */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: prefersReduced ? 0 : smoothImageY }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/images/prenup/01.jpg)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(250,247,240,0.75) 0%, rgba(250,247,240,0.4) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 py-20">
        {/* Date & city */}
        <motion.p
          className="font-mono-micro mb-8"
          style={{ color: "var(--olive-soft)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          {config.date.display.toLowerCase()} · {config.venue.city.toLowerCase()}
        </motion.p>

        {/* Partner 1 name */}
        <motion.h1
          className="font-display font-light leading-none"
          style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "var(--wood-deep)" }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springConfig, delay: 0.2, duration: 0.9 }}
        >
          {config.couple.partner1}
        </motion.h1>

        {/* Ampersand */}
        <motion.span
          className="font-script block my-2"
          style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: "var(--gold)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.3 }}
        >
          &amp;
        </motion.span>

        {/* Partner 2 name */}
        <motion.h1
          className="font-display font-light leading-none"
          style={{ fontSize: "clamp(4rem, 8vw, 7rem)", color: "var(--wood-deep)" }}
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springConfig, delay: 0.2, duration: 0.9 }}
        >
          {config.couple.partner2}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-body italic mt-8 text-lg"
          style={{ color: "var(--wood-deep)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          invite you to celebrate with them
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#our-story"
          className="inline-block mt-10 px-8 py-3 font-mono-micro transition-colors duration-300"
          style={{
            border: "1px solid var(--wood)",
            color: "var(--wood)",
            borderRadius: "2px",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          whileHover={{
            backgroundColor: "var(--olive)",
            color: "var(--paper)",
            borderColor: "var(--olive)",
          }}
        >
          Open the Invitation
        </motion.a>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <span className="font-mono-micro" style={{ color: "var(--wood)", opacity: 0.4 }}>
            scroll
          </span>
          <div className="scroll-cue-line" />
        </motion.div>
      </div>
    </div>
  );
}
