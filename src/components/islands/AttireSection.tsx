import { motion } from "framer-motion";
import config from "../../lib/wedding-config";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function palettesMatch(
  a: Array<{ name: string; hex: string }>,
  b: Array<{ name: string; hex: string }>
) {
  if (a.length !== b.length) return false;
  return a.every((c, i) => c.hex === b[i].hex);
}

function PaletteRow({
  colors,
}: {
  colors: Array<{ name: string; hex: string }>;
}) {
  return (
    <div className="flex justify-center gap-4 md:gap-5">
      {colors.map((color) => (
        <div key={color.name} className="flex flex-col items-center gap-2">
          <div
            className="w-12 h-12 md:w-14 md:h-14 rounded-lg border shadow-sm"
            style={{
              backgroundColor: color.hex,
              borderColor: "rgba(44,44,44,0.08)",
            }}
          />
          <span
            className="text-[9px] md:text-[11px] tracking-wider uppercase font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            {color.name}
          </span>
        </div>
      ))}
    </div>
  );
}

function AttireCard({
  role,
  index,
}: {
  role: {
    title: string;
    description: string;
    image: string;
    colorPalette: Array<{ name: string; hex: string }>;
  };
  index: number;
}) {
  if (!role.image) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
    >
      {/* Role title */}
      <p
        className="text-[11px] md:text-xs tracking-[0.15em] uppercase font-medium text-center mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        {role.title}
      </p>

      {/* Single large image */}
      <div
        className="relative w-full overflow-hidden rounded-sm"
        style={{
          backgroundColor: "var(--cream-dark)",
          aspectRatio: "3 / 4",
        }}
      >
        <img
          src={role.image}
          alt={`${role.title} attire reference`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Description */}
      {role.description && (
        <p
          className="text-xs md:text-sm leading-relaxed text-center mt-4 max-w-sm mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          {role.description}
        </p>
      )}
    </motion.div>
  );
}

export default function AttireSection() {
  const { attire } = config;

  return (
    <div className="space-y-20 md:space-y-28">
      {attire.groups.map((group) => {
        const shared = palettesMatch(
          group.men.colorPalette,
          group.women.colorPalette
        );

        return (
          <div key={group.label}>
            {/* Group Label */}
            <motion.h3
              className="font-display text-xl md:text-2xl text-center mb-10 md:mb-12"
              style={{ color: "var(--charcoal)" }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease }}
            >
              {group.label}
            </motion.h3>

            {/* Two-column: men + women side by side at large, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 px-4 md:px-8 max-w-5xl mx-auto">
              <AttireCard role={group.men} index={0} />
              <AttireCard role={group.women} index={1} />
            </div>

            {/* Shared palette below both cards */}
            {shared && (
              <motion.div
                className="mt-10 md:mt-12"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15, ease }}
              >
                <PaletteRow colors={group.men.colorPalette} />
              </motion.div>
            )}

            {/* Per-role palettes when they differ */}
            {!shared && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 px-4 md:px-8 max-w-5xl mx-auto mt-8">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease }}
                >
                  <PaletteRow colors={group.men.colorPalette} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease }}
                >
                  <PaletteRow colors={group.women.colorPalette} />
                </motion.div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
