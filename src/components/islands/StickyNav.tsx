import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "our-story", label: "Our Story" },
  { id: "the-day", label: "The Day" },
  { id: "faq", label: "FAQ" },
  { id: "rsvp", label: "RSVP" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(232, 228, 222, 0.6)" : "1px solid transparent",
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <motion.a
            href="#"
            className={`font-display text-xl transition-colors duration-300 ${
              scrolled || menuOpen ? "text-charcoal" : "text-white"
            }`}
            style={{ zIndex: 60, position: "relative", letterSpacing: "0.05em" }}
            aria-label="Back to top"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            C & K
          </motion.a>

          <div className="hidden md:flex items-center gap-12">
            {sections.map(({ id, label }) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 relative ${
                  scrolled ? "text-charcoal" : "text-white"
                }`}
                style={{ letterSpacing: "0.12em" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{
                    backgroundColor: scrolled ? "var(--gold)" : "white",
                  }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.a>
            ))}
          </div>

          <motion.button
            className="md:hidden flex flex-col gap-1.5 p-2 relative"
            style={{ zIndex: 60 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className={`block w-6 h-px transition-colors duration-500 ${
                scrolled || menuOpen ? "bg-charcoal" : "bg-white"
              }`}
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <motion.span
              className={`block w-6 h-px transition-colors duration-500 ${
                scrolled || menuOpen ? "bg-charcoal" : "bg-white"
              }`}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-6 h-px transition-colors duration-500 ${
                scrolled || menuOpen ? "bg-charcoal" : "bg-white"
              }`}
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ backgroundColor: "var(--cream)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {sections.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="font-display text-4xl relative"
                style={{ color: "var(--charcoal)", letterSpacing: "0.02em" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: "easeOut"
                }}
                whileHover={{
                  x: 8,
                  color: "var(--gold)",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
