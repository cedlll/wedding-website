import { motion } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

export default function ExperienceCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {config.experience.map((item, i) => (
        <motion.div
          key={i}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.7,
            delay: i * 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{ y: -12 }}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          {/* Image */}
          <div className="aspect-[3/4] overflow-hidden mb-6 relative">
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              loading="lazy"
              animate={{
                scale: hoveredIndex === i ? 1.1 : 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{
                opacity: hoveredIndex === i ? 1 : 0,
              }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Text */}
          <motion.h3
            className="font-display text-2xl mb-3"
            style={{ color: "var(--charcoal)", letterSpacing: "0.02em", fontWeight: 400 }}
            animate={{
              color: hoveredIndex === i ? "var(--gold)" : "var(--charcoal)",
            }}
            transition={{ duration: 0.3 }}
          >
            {item.title}
          </motion.h3>
          <motion.p
            className="text-sm leading-relaxed font-body"
            style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
            animate={{
              opacity: hoveredIndex === i ? 0.7 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {item.description}
          </motion.p>
        </motion.div>
      ))}
    </div>
  );
}
