import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import config from "../../lib/wedding-config";

// Hero carousel images (WebP for performance), ordered with best-centered photos first
const heroImages = [
  "03", "04", "05", "08", "01", "02", "07", "06", "09", "10",
].map((n) => `/images/hero/hero-${n}.webp`);

// Ken Burns motion variants — alternating subtle pan + zoom directions
const kenBurnsVariants = [
  { scale: [1, 1.08], x: ["0%", "1.5%"], y: ["0%", "1%"] },
  { scale: [1.06, 1], x: ["1%", "-1%"], y: ["-0.5%", "0.5%"] },
  { scale: [1, 1.07], x: ["0%", "-1.5%"], y: ["0%", "-1%"] },
  { scale: [1.05, 1], x: ["-1%", "1%"], y: ["0.5%", "-0.5%"] },
];

export default function HeroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Warm the next slide so the crossfade never reveals a half-loaded image
  useEffect(() => {
    const next = new Image();
    next.src = heroImages[(currentIndex + 1) % heroImages.length];
  }, [currentIndex]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Visually hidden h1 for screen readers and SEO */}
      <h1 className="sr-only">Cedric &amp; Karen — November 7, 2026</h1>
      {/* Image Carousel */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img
            src={heroImages[currentIndex]}
            alt=""
            className="w-full h-full object-cover"
            animate={kenBurnsVariants[currentIndex % kenBurnsVariants.length]}
            transition={{ duration: 5, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div className="mb-6 flex justify-center">
          <img
            src="/images/ck-logo.png"
            alt={`${config.couple.partner1} & ${config.couple.partner2}`}
            className="w-[280px] md:w-[400px] lg:w-[480px] h-auto"
          />
        </motion.div>

        <motion.p
          className="text-white/90 text-lg md:text-xl mb-3"
          style={{ letterSpacing: "0.08em" }}
        >
          {config.date.display}
        </motion.p>

        <motion.p
          className="text-white/80 text-base mb-10"
          style={{ letterSpacing: "0.05em" }}
        >
          {config.venue.name}, {config.venue.city}
        </motion.p>

        <motion.button
          data-tally-open="dWzjaA"
          data-tally-layout="modal"
          data-tally-overlay="1"
          data-tally-width="700"
          data-tally-emoji-text="💍"
          data-tally-emoji-animation="wave"
          className="inline-block px-12 py-4 text-xs font-semibold tracking-wider uppercase border-2 border-white text-charcoal bg-white transition-all duration-300 hover:bg-transparent hover:text-white cursor-pointer"
          style={{ letterSpacing: "0.15em" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Save your seat
        </motion.button>
      </motion.div>
    </div>
  );
}
