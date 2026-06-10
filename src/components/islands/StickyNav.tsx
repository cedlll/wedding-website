import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const tallyAttrs = {
  "data-tally-open": "dWzjaA",
  "data-tally-layout": "modal",
  "data-tally-overlay": "1",
  "data-tally-width": "700",
  "data-tally-emoji-text": "\u{1F48D}",
  "data-tally-emoji-animation": "wave",
};

const sections = [
  { id: "the-day", label: "Our day" },
  { id: "gifts", label: "Gifts" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact", mailto: "cedricandkaren2026@gmail.com" },
  { id: "rsvp", label: "RSVP", isTally: true },
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
          backgroundColor: scrolled ? "rgba(255, 251, 245, 0.7)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(232, 228, 222, 0.3)" : "1px solid transparent",
        }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <motion.a
            href="#"
            style={{ zIndex: 60, position: "relative" }}
            aria-label="Back to top"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="/images/ck-logo.png"
              alt="C & K"
              className="h-10 w-auto transition-all duration-300"
              style={{
                filter: scrolled || menuOpen ? "invert(1)" : "none",
              }}
            />
          </motion.a>

          <div className="hidden md:flex items-center gap-12">
            {sections.map(({ id, label, isTally, mailto }) => (
              <motion.a
                key={id}
                href={mailto ? `mailto:${mailto}` : isTally ? "#" : `#${id}`}
                onClick={isTally ? (e: React.MouseEvent) => e.preventDefault() : undefined}
                {...(isTally ? tallyAttrs : {})}
                className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 relative cursor-pointer ${
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
            type="button"
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
            {sections.map(({ id, label, isTally, mailto }, i) => (
              <motion.a
                key={id}
                href={mailto ? `mailto:${mailto}` : isTally ? "#" : `#${id}`}
                onClick={(e: React.MouseEvent) => {
                  if (isTally) e.preventDefault();
                  setMenuOpen(false);
                }}
                {...(isTally ? tallyAttrs : {})}
                className="font-display text-4xl relative cursor-pointer"
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
