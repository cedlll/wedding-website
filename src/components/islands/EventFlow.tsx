import { motion } from "framer-motion";
import config from "../../lib/wedding-config";

export default function EventFlow() {
  return (
    <div className="max-w-3xl mx-auto">
      {config.eventFlow.map((event, i) => (
        <motion.div
          key={i}
          className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] gap-8 md:gap-12 py-12"
          style={{
            borderBottom:
              i < config.eventFlow.length - 1
                ? "1px solid var(--divider)"
                : "none",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        >
          <div>
            <span
              className="font-display text-3xl md:text-4xl"
              style={{ color: "var(--gold)", letterSpacing: "0.02em", fontWeight: 400 }}
            >
              {event.time}
            </span>
          </div>
          <div>
            <h3
              className="font-display text-2xl md:text-3xl mb-4"
              style={{ color: "var(--charcoal)", letterSpacing: "0.02em", fontWeight: 400 }}
            >
              {event.title}
            </h3>
            <p
              className="leading-relaxed text-base font-body"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            >
              {event.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
