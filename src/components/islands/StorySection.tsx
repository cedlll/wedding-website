import { motion } from "framer-motion";
import config from "../../lib/wedding-config";

const tiltClasses = ["scrapbook-tilt-1", "scrapbook-tilt-3", "scrapbook-tilt-5"];
const tapePositions = ["washi-tape--top-left", "washi-tape--top-right", "washi-tape--top-left"];

export default function StorySection() {
  return (
    <div className="space-y-24 md:space-y-32">
      {config.story.map((chapter, i) => {
        const isReversed = i % 2 !== 0;

        return (
          <motion.div
            key={i}
            className={`flex flex-col ${
              isReversed ? "md:flex-row-reverse" : "md:flex-row"
            } items-center gap-10 md:gap-16`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Image — Scrapbook style */}
            <motion.div
              className="w-full md:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className={`relative scrapbook-photo ${tiltClasses[i]} mx-auto max-w-md`}>
                {/* Washi tape accent */}
                <div className={`washi-tape ${tapePositions[i]}`} />

                <div className="aspect-[4/5] overflow-hidden">
                  <motion.img
                    src={chapter.image}
                    alt={`${chapter.title} - ${chapter.year}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>

                {/* Handwritten caption inside polaroid frame */}
                <p className="scrapbook-caption text-center mt-2 pb-1">
                  {chapter.year} — {chapter.title}
                </p>
              </div>
            </motion.div>

            {/* Text */}
            <div className={`w-full md:w-1/2 ${isReversed ? "md:text-right" : "md:text-left"} text-center`}>
              <motion.p
                className="label-text mb-4"
                style={{ color: "var(--gold)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {chapter.year}
              </motion.p>
              <motion.h3
                className="font-display text-3xl md:text-4xl mb-6"
                style={{ color: "var(--charcoal)", letterSpacing: "0.02em", fontWeight: 400 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {chapter.title}
              </motion.h3>
              <motion.p
                className="leading-relaxed text-base font-body max-w-md"
                style={{
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginLeft: isReversed ? "auto" : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {chapter.description}
              </motion.p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
