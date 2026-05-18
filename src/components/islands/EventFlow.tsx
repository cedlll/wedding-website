import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import config from "../../lib/wedding-config";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const icons = ["◇", "○", "□", "△"];

export default function EventFlow() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Timeline spine */}
      <div className="relative">
        {/* Vertical gold line */}
        <motion.div
          className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px"
          style={{ backgroundColor: "var(--divider)", transformOrigin: "top", marginLeft: "-0.5px" }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.6, ease }}
        />

        <div className="space-y-0">
          {config.eventFlow.map((event, i) => {
            const isRight = i % 2 === 0;
            return (
              <motion.div
                key={i}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
              >
                {/* Left column (odd items on mobile become hidden left side) */}
                <div className={`py-10 md:py-14 ${isRight ? "md:pr-16 text-left md:text-right" : "md:col-start-2 md:pl-16"} pl-10 md:pl-0`}>
                  {isRight ? (
                    <EventCard event={event} index={i} align="right" />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                {/* Center dot */}
                <div className="absolute left-0 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex items-center justify-center" style={{ width: "28px", height: "28px" }}>
                  <motion.div
                    style={{
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      backgroundColor: "var(--gold)",
                      border: "2px solid var(--cream-dark)",
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                  />
                </div>

                {/* Right column */}
                <div className={`py-10 md:py-14 ${!isRight ? "md:pl-16" : "md:col-start-2 hidden md:block"} pl-10 md:pl-0`}>
                  {!isRight ? (
                    <EventCard event={event} index={i} align="left" />
                  ) : (
                    <div className="hidden md:block" />
                  )}
                </div>

                {/* Mobile: always show content */}
                <div className="md:hidden pl-10 pb-10 -mt-2">
                  {isRight ? null : <EventCard event={event} index={i} align="left" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EventCard({
  event,
  index,
  align,
}: {
  event: (typeof config.eventFlow)[number];
  index: number;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p
        style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
          fontWeight: 300,
          color: "var(--gold)",
          letterSpacing: "0.01em",
          lineHeight: 1,
          marginBottom: "6px",
        }}
      >
        {event.time}
      </p>
      <h3
        style={{
          fontFamily: "'Marcellus', serif",
          fontSize: "clamp(1.15rem, 2.5vw, 1.6rem)",
          fontWeight: 400,
          color: "var(--charcoal)",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          marginBottom: "12px",
        }}
      >
        {event.title}
      </h3>
      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "13px",
          color: "var(--text-muted)",
          lineHeight: 1.8,
          fontWeight: 400,
          maxWidth: "32ch",
          marginLeft: align === "right" ? "auto" : undefined,
        }}
      >
        {event.description}
      </p>
    </div>
  );
}
