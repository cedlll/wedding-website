import { motion } from "framer-motion";
import config from "../../lib/wedding-config";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 as const },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
};

export default function AttireSection() {
  const { attire } = config;

  return (
    <div>
      {/* Description */}
      <motion.p
        className="font-serif text-lg md:text-xl italic leading-relaxed text-center max-w-2xl mx-auto mb-16 md:mb-20"
        style={{ color: "var(--forest)" }}
        {...fadeUp}
      >
        {attire.description}
      </motion.p>

      {/* Color Palette */}
      <motion.div
        className="mb-20 md:mb-28"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="label-text text-center mb-8">Wedding Palette</p>
        <div className="flex justify-center gap-5 md:gap-8 flex-wrap">
          {attire.colorPalette.map((color, i) => (
            <motion.div
              key={color.name}
              className="flex flex-col items-center gap-3 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-full border transition-shadow duration-300 group-hover:shadow-lg"
                style={{
                  backgroundColor: color.hex,
                  borderColor: "rgba(44,44,44,0.08)",
                }}
                whileHover={{ scale: 1.08, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <span
                className="text-xs tracking-wider uppercase"
                style={{ color: "var(--forest)" }}
              >
                {color.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Attire Pegs — Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Men — Barong */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="aspect-[3/4] overflow-hidden mb-8 relative">
            <motion.img
              src={attire.men.image}
              alt="Barong Tagalog peg"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            {/* Subtle overlay label */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
              <span className="text-white/80 text-xs tracking-widest uppercase">
                Barong Tagalog
              </span>
            </div>
          </div>
          <h3
            className="font-display text-xl md:text-2xl mb-3"
            style={{ color: "var(--forest-dark)" }}
          >
            {attire.men.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--forest)" }}
          >
            {attire.men.description}
          </p>
        </motion.div>

        {/* Women — Filipiniana */}
        <motion.div
          className="group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="aspect-[3/4] overflow-hidden mb-8 relative">
            <motion.img
              src={attire.women.image}
              alt="Modern Filipiniana peg"
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/40 to-transparent">
              <span className="text-white/80 text-xs tracking-widest uppercase">
                Filipiniana / Terno
              </span>
            </div>
          </div>
          <h3
            className="font-display text-xl md:text-2xl mb-3"
            style={{ color: "var(--forest-dark)" }}
          >
            {attire.women.title}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--forest)" }}
          >
            {attire.women.description}
          </p>
        </motion.div>
      </div>

      {/* Avoid note */}
      <motion.p
        className="text-center mt-16 text-xs tracking-wider uppercase"
        style={{ color: "var(--forest)", opacity: 0.7 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.7 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        Please avoid wearing white, all-black, or neon colors
      </motion.p>
    </div>
  );
}
