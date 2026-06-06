import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import config from "../../lib/wedding-config";

// Hero carousel images
const heroImages = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  const filename = String(n).padStart(2, "0");
  return `/images/hero/hero-${filename}.jpg`;
});

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

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
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
            fetchPriority={currentIndex === 0 ? "high" : "low"}
            animate={kenBurnsVariants[currentIndex % kenBurnsVariants.length]}
            transition={{ duration: 5, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === currentIndex ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)",
              width: i === currentIndex ? "32px" : "8px",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

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

        <motion.a
          href="#rsvp"
          className="inline-block px-12 py-4 text-xs font-semibold tracking-wider uppercase border-2 border-white text-charcoal bg-white transition-all duration-300 hover:bg-transparent hover:text-white"
          style={{ letterSpacing: "0.15em" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RSVP Now
        </motion.a>
      </motion.div>
    </div>
  );
}
