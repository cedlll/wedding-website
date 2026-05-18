interface Props {
  items?: string[];
  dark?: boolean;
  reverse?: boolean;
  size?: "sm" | "md" | "lg";
}

const defaultItems = [
  "Cedric & Karen",
  "November 7, 2026",
  "Hacienda Solange",
  "Tagaytay City",
  "Philippines",
];

export default function MarqueeBand({
  items = defaultItems,
  dark = false,
  reverse = false,
  size = "md",
}: Props) {
  const doubled = [...items, ...items];

  const fontSize =
    size === "lg" ? "clamp(1.8rem, 4vw, 3rem)" :
    size === "sm" ? "clamp(0.6rem, 1.2vw, 0.8rem)" :
    "clamp(0.75rem, 1.5vw, 1rem)";

  const py =
    size === "lg" ? "py-6 md:py-8" :
    size === "sm" ? "py-3" :
    "py-4 md:py-5";

  return (
    <div
      className={`overflow-hidden border-y ${py} ${
        dark
          ? "border-white/10 bg-[var(--charcoal)]"
          : "border-[var(--divider)] bg-transparent"
      } ${reverse ? "marquee-reverse" : ""}`}
    >
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center"
            style={{
              fontFamily: size === "lg" ? "'Marcellus', serif" : "'Montserrat', sans-serif",
              fontSize,
              fontWeight: size === "lg" ? 400 : 500,
              letterSpacing: size === "lg" ? "0.04em" : "0.18em",
              textTransform: size === "lg" ? "none" : "uppercase",
              color: dark ? "rgba(255,251,245,0.7)" : "var(--text-muted)",
            }}
          >
            {item}
            {/* Separator diamond */}
            <span
              style={{
                display: "inline-block",
                width: size === "lg" ? "6px" : "4px",
                height: size === "lg" ? "6px" : "4px",
                borderRadius: "50%",
                backgroundColor: "var(--gold)",
                opacity: 0.6,
                margin: size === "lg" ? "0 2.5rem" : "0 2rem",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
