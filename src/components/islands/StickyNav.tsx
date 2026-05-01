import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const sections = [
  { id: "our-story", label: "Story" },
  { id: "details", label: "Details" },
  { id: "event-flow", label: "Schedule" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
  { id: "gifts", label: "Gifts" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  useEffect(() => {
    const heroHeight = window.innerHeight;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (delta > 30) scrollDirection.current = "down";
      else if (delta < -10) scrollDirection.current = "up";

      const pastHero = currentY > heroHeight * 0.8;
      setVisible(pastHero && scrollDirection.current === "up");

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
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

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-40 py-3 px-6"
          style={{
            backgroundColor: "rgba(250,247,240,0.95)",
            backdropFilter: "blur(4px)",
            borderBottom: "1px solid rgba(107,79,58,0.1)",
          }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-label="Section navigation"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <a
              href="#"
              className="font-script text-xl"
              style={{ color: "var(--gold)" }}
              aria-label="Back to top"
            >
              C &amp; K
            </a>

            <div className="hidden md:flex items-center gap-6">
              {sections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="font-mono-micro relative transition-colors duration-200"
                  style={{
                    color: activeSection === id ? "var(--olive)" : "var(--wood)",
                  }}
                >
                  {label}
                  {activeSection === id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ backgroundColor: "var(--olive)" }}
                      layoutId="nav-underline"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Mobile: simplified nav */}
            <div className="md:hidden">
              <a
                href="#rsvp"
                className="font-mono-micro px-3 py-1 rounded-sm"
                style={{
                  backgroundColor: "var(--olive)",
                  color: "var(--paper)",
                }}
              >
                RSVP
              </a>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
