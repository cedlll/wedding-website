import { motion } from "framer-motion";

interface TimelineCardProps {
  date: string;
  title: string;
  description: string;
  image: string;
  index: number;
}

export default function TimelineCard({ date, title, description, image, index }: TimelineCardProps) {
  const isEven = index % 2 === 0;
  const rotation = isEven ? -2 : 1.5;

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Photo with washi tape effect */}
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div
          className="relative shadow-warm-md"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Washi tape top-left */}
          <div
            className="absolute -top-3 -left-2 w-16 h-6 z-10"
            style={{ transform: "rotate(-8deg)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 24" className="w-full h-full">
              <rect width="64" height="24" fill="rgba(122,139,106,0.35)" rx="1" />
              <line x1="0" y1="8" x2="64" y2="8" stroke="rgba(122,139,106,0.15)" strokeWidth="2" />
              <line x1="0" y1="16" x2="64" y2="16" stroke="rgba(122,139,106,0.15)" strokeWidth="2" />
            </svg>
          </div>

          {/* Washi tape bottom-right */}
          <div
            className="absolute -bottom-3 -right-2 w-16 h-6 z-10"
            style={{ transform: "rotate(5deg)" }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 64 24" className="w-full h-full">
              <rect width="64" height="24" fill="rgba(180,130,100,0.3)" rx="1" />
              <line x1="0" y1="8" x2="64" y2="8" stroke="rgba(180,130,100,0.12)" strokeWidth="2" />
              <line x1="0" y1="16" x2="64" y2="16" stroke="rgba(180,130,100,0.12)" strokeWidth="2" />
            </svg>
          </div>

          <img
            src={image}
            alt={`${title} - milestone photo`}
            className="w-72 h-52 object-cover"
            loading="lazy"
            width="288"
            height="208"
          />
        </div>
      </div>

      {/* Text content */}
      <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-right"} text-center`}>
        <span className="font-script text-2xl" style={{ color: "var(--gold)" }}>
          {date}
        </span>
        <h3
          className="font-display text-3xl font-normal mt-2 mb-3"
          style={{ color: "var(--wood-deep)" }}
        >
          {title}
        </h3>
        <p className="font-body leading-relaxed" style={{ color: "var(--wood-deep)", opacity: 0.85 }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
