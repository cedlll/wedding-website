import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "our-story", label: "Our Story", num: "01" },
  { id: "the-day", label: "The Day", num: "02" },
  { id: "rsvp", label: "RSVP", num: "03" },
  { id: "faq", label: "FAQ", num: "04" },
];

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const onWhite = scrolled || menuOpen;

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: scrolled ? "rgba(255,251,245,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(226,221,214,0.7)" : "1px solid transparent",
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 md:py-6">
          {/* Monogram */}
          <motion.a
            href="#"
            aria-label="Back to top"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
            style={{ position: "relative", zIndex: 60 }}
          >
            <span
              style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "1.25rem",
                letterSpacing: "0.06em",
                color: onWhite ? "var(--charcoal)" : "var(--cream)",
                transition: "color 0.4s ease",
                fontWeight: 400,
              }}
            >
              C &amp; K
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {sections.map(({ id, label, num }) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "9px",
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "var(--gold)"
                      : onWhite
                      ? "var(--charcoal)"
                      : "rgba(255,251,245,0.75)",
                    transition: "color 0.3s ease",
                    position: "relative",
                    paddingBottom: "2px",
                  }}
                >
                  {label}
                  {/* Active underline */}
                  <span
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "1px",
                      backgroundColor: "var(--gold)",
                      width: isActive ? "100%" : "0%",
                      transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                    }}
                  />
                </a>
              );
            })}
          </div>

          {/* Hamburger */}
          <motion.button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            style={{ position: "relative", zIndex: 60 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.88 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                style={{
                  display: "block",
                  height: "1px",
                  backgroundColor: onWhite ? "var(--charcoal)" : "var(--cream)",
                  transformOrigin: "center",
                  transition: "background-color 0.4s ease",
                }}
                animate={
                  menuOpen
                    ? i === 0
                      ? { rotate: 45, y: 6, width: "24px" }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -6, width: "24px" }
                    : { rotate: 0, y: 0, opacity: 1, width: i === 1 ? "16px" : "24px" }
                }
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            ))}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-start justify-end px-8 pb-16"
            style={{ backgroundColor: "var(--charcoal)" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Ghost number background */}
            <div
              className="absolute top-1/2 right-8 -translate-y-1/2 select-none pointer-events-none"
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "clamp(8rem, 25vw, 18rem)",
                fontWeight: 300,
                color: "rgba(255,251,245,0.03)",
                lineHeight: 1,
              }}
            >
              {sections.find(s => s.id === activeSection)?.num ?? "01"}
            </div>

            <div className="flex flex-col gap-2">
              {sections.map(({ id, label, num }, i) => (
                <motion.a
                  key={id}
                  href={`#${id}`}
                  className="flex items-baseline gap-4 group"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.45, ease: "easeOut" }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "9px",
                      letterSpacing: "0.18em",
                      color: "rgba(255,251,245,0.3)",
                      fontWeight: 500,
                      minWidth: "24px",
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Marcellus', serif",
                      fontSize: "clamp(2.5rem, 8vw, 4rem)",
                      color: "var(--cream)",
                      letterSpacing: "0.02em",
                      fontWeight: 400,
                      transition: "color 0.25s ease",
                    }}
                    className="group-hover:text-gold"
                  >
                    {label}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Bottom meta */}
            <motion.p
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "9px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,251,245,0.25)",
                fontWeight: 500,
              }}
            >
              November 7, 2026 · Hacienda Solange
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
