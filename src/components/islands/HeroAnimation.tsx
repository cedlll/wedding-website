import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import config from "../../lib/wedding-config";

// Hero carousel images
const heroImages = [
  config.images.hero,
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1920&h=1080&fit=crop",
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
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <img
            src={heroImages[currentIndex]}
            alt=""
            className="w-full h-full object-cover"
            fetchPriority={currentIndex === 0 ? "high" : "low"}
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
        <motion.h1
          className="font-display text-white leading-tight mb-6"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)", letterSpacing: "0.03em", fontWeight: 400 }}
        >
          {config.couple.partner1} <span className="text-6xl mx-2">&</span> {config.couple.partner2}
        </motion.h1>

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
          href="#details"
          className="inline-block px-12 py-4 text-xs font-semibold tracking-wider uppercase border-2 border-white text-white bg-transparent transition-all duration-300 hover:bg-white hover:text-charcoal"
          style={{ letterSpacing: "0.15em" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
        </motion.a>
      </motion.div>
    </div>
  );
}
