import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import config from "../../lib/wedding-config";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const chapterNumbers = ["01", "02", "03"];
const tiltClasses = ["scrapbook-tilt-1", "scrapbook-tilt-3", "scrapbook-tilt-5"];
const tapePositions = ["washi-tape--top-left", "washi-tape--top-right", "washi-tape--top-left"];

function StoryChapter({
  chapter,
  index,
}: {
  chapter: (typeof config.story)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const isReversed = index % 2 !== 0;

  const imgX = useTransform(
    scrollYProgress,
    [0, 0.4],
    [isReversed ? 60 : -60, 0]
  );
  const textX = useTransform(
    scrollYProgress,
    [0, 0.4],
    [isReversed ? -40 : 40, 0]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div
      ref={ref}
      className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16 lg:gap-24`}
    >
      {/* Ghost chapter number */}
      <div
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "clamp(7rem, 18vw, 15rem)",
          fontWeight: 300,
          color: "var(--charcoal)",
          opacity: 0.03,
          lineHeight: 1,
          top: "-2rem",
          [isReversed ? "right" : "left"]: "-1rem",
          letterSpacing: "-0.04em",
        }}
      >
        {chapterNumbers[index]}
      </div>

      {/* Image */}
      <motion.div
        className="w-full md:w-5/12 lg:w-[45%]"
        style={{ x: imgX, opacity }}
      >
        <div className={`relative scrapbook-photo ${tiltClasses[index]} mx-auto max-w-sm md:max-w-none`}>
          <div className={`washi-tape ${tapePositions[index]}`} />
          <div className="aspect-[4/5] overflow-hidden" data-cursor-label="VIEW">
            <motion.img
              src={chapter.image}
              alt={`${chapter.title} — ${chapter.year}`}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
          <p className="scrapbook-caption text-center mt-2">
            {chapter.year} — {chapter.title}
          </p>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        className={`w-full md:w-7/12 lg:w-[55%] ${isReversed ? "md:text-right" : "md:text-left"} text-center`}
        style={{ x: textX, opacity }}
      >
        {/* Large faint year */}
        <div
          style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300,
            color: "var(--gold)",
            opacity: 0.18,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "-0.5rem",
          }}
        >
          {chapter.year}
        </div>

        <p
          className="label-text mb-4"
          style={{ color: "var(--gold)", justifyContent: isReversed ? "flex-end" : "flex-start", display: "flex" }}
        >
          {chapter.year}
        </p>

        <h3
          style={{
            fontFamily: "'Marcellus', serif",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--charcoal)",
            letterSpacing: "0.01em",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          {chapter.title}
        </h3>

        <p
          style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
            fontWeight: 400,
            color: "var(--text-muted)",
            lineHeight: 1.9,
            maxWidth: "38ch",
            marginLeft: isReversed ? "auto" : undefined,
          }}
        >
          {chapter.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function StorySection() {
  return (
    <div className="flex flex-col gap-24 md:gap-36">
      {config.story.map((chapter, i) => (
        <div key={i} className="relative">
          <StoryChapter chapter={chapter} index={i} />
        </div>
      ))}
    </div>
  );
}
