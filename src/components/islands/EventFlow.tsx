import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

function LeafMarker({ active }: { active: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="w-8 h-8 cursor-pointer"
      fill="none"
      whileHover={{ scale: 1.08 }}
      aria-hidden="true"
    >
      <path
        d="M12 2 C8 6, 4 12, 6 18 C8 14, 10 10, 12 6 C14 10, 16 14, 18 18 C20 12, 16 6, 12 2Z"
        stroke={active ? "var(--olive)" : "var(--olive-soft)"}
        strokeWidth="1.25"
        fill={active ? "rgba(74,93,58,0.1)" : "none"}
      />
    </motion.svg>
  );
}

export default function EventFlow() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Central branch line */}
      <div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
        style={{ backgroundColor: "rgba(107,79,58,0.2)" }}
        aria-hidden="true"
      />

      <div className="space-y-12">
        {config.eventFlow.map((event, i) => (
          <motion.div
            key={i}
            className="relative flex items-start gap-6 pl-14 md:pl-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.05 }}
          >
            {/* Leaf marker */}
            <div
              className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10 bg-paper rounded-full p-1"
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveIndex(activeIndex === i ? null : i); }}
              role="button"
              tabIndex={0}
              aria-expanded={activeIndex === i}
              aria-label={`${event.title} details`}
            >
              <LeafMarker active={activeIndex === i} />
            </div>

            {/* Content */}
            <div className={`w-full md:w-5/12 ${i % 2 === 0 ? "md:mr-auto md:pr-16 md:text-right" : "md:ml-auto md:pl-16 md:text-left"}`}>
              <span className="font-script text-xl" style={{ color: "var(--gold)" }}>
                {event.time}
              </span>
              <h3
                className="font-display text-2xl font-normal mt-1"
                style={{ color: "var(--wood-deep)" }}
              >
                {event.title}
              </h3>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.p
                    className="font-body text-sm mt-2"
                    style={{ color: "var(--wood-deep)", opacity: 0.8 }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {event.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
