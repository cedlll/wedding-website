import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

function CopyIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/** Chevron that flips to point up when the card is open — a functional toggle cue. */
function ToggleIcon({ open }: { open: boolean }) {
  return (
    <motion.svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <polyline points="6 9 12 15 18 9" />
    </motion.svg>
  );
}

function CopyButton({
  value,
  active,
  onCopy,
  ariaLabel,
}: {
  value: string;
  active: boolean;
  onCopy: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onCopy();
      }}
      className="shrink-0 p-2 transition-colors"
      style={{ color: active ? "var(--gold)" : "var(--text-muted)" }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = "var(--charcoal)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = "var(--text-muted)";
      }}
      aria-label={ariaLabel}
    >
      {active ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
}

function DetailRow({
  label,
  value,
  emphasize = false,
  copied,
  onCopy,
  copyLabel,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
  copied: boolean;
  onCopy: () => void;
  copyLabel: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-left">
      <div className="min-w-0">
        <p
          className="text-[10px] tracking-[0.18em] uppercase mb-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </p>
        <p
          className="truncate"
          style={{
            color: "var(--charcoal)",
            fontSize: emphasize ? "1.05rem" : "0.9rem",
            letterSpacing: emphasize ? "0.08em" : "normal",
            fontWeight: emphasize ? 500 : 400,
          }}
        >
          {value}
        </p>
      </div>
      <CopyButton value={value} active={copied} onCopy={onCopy} ariaLabel={copyLabel} />
    </div>
  );
}

function GiftCard({ gift }: { gift: (typeof config.gifts)[number] }) {
  const [revealed, setRevealed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const accent = revealed || hovered;

  return (
    <div
      className="h-full transition-shadow duration-300"
      style={{
        border: `1px solid ${accent ? "var(--gold)" : "var(--divider)"}`,
        backgroundColor: revealed ? "var(--white)" : hovered ? "var(--cream-dark)" : "transparent",
        boxShadow: hovered && !revealed ? "0 10px 30px rgba(0,0,0,0.06)" : "none",
        transition: "border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Trigger row */}
      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full flex items-center justify-between gap-4 px-6 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A572] focus-visible:ring-inset"
        aria-expanded={revealed}
        aria-label={`${gift.label} payment details`}
      >
        {gift.logo ? (
          <img
            src={gift.logo}
            alt={gift.label}
            className="h-7 md:h-8 w-auto object-contain"
            loading="lazy"
          />
        ) : (
          <span className="font-display text-xl leading-none" style={{ color: "var(--charcoal)" }}>
            {gift.label}
          </span>
        )}
        <span className="shrink-0" style={{ color: accent ? "var(--gold)" : "var(--text-muted)" }}>
          <ToggleIcon open={revealed} />
        </span>
      </button>

      {/* Revealed details — expands within the same card */}
      <AnimatePresence initial={false}>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="px-6 pb-6 pt-5 space-y-4"
              style={{ borderTop: "1px solid var(--divider)" }}
            >
              <DetailRow
                label="Account Name"
                value={gift.accountName}
                copied={copiedField === "name"}
                onCopy={() => handleCopy(gift.accountName, "name")}
                copyLabel={`Copy ${gift.label} account name`}
              />
              <DetailRow
                label="Account Number"
                value={gift.accountNumber}
                emphasize
                copied={copiedField === "number"}
                onCopy={() => handleCopy(gift.accountNumber, "number")}
                copyLabel={`Copy ${gift.label} account number`}
              />

              {gift.qrImagePath && (
                <div className="pt-2 text-center">
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase mb-3"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Scan to pay
                  </p>
                  <img
                    src={gift.qrImagePath}
                    alt={`${gift.label} QR code`}
                    className="w-32 h-32 mx-auto object-contain"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy toast */}
      <AnimatePresence>
        {copiedField && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 text-xs tracking-wider uppercase shadow-lg"
            style={{ backgroundColor: "var(--charcoal)", color: "var(--cream)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GiftRegistry() {
  return (
    <div>
      <motion.p
        className="font-serif text-lg md:text-xl leading-relaxed text-center max-w-xl mx-auto mb-14"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Your presence at our celebration is the greatest gift we could ask for.
        But if you wish to bless our new beginning...
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto items-start">
        {config.gifts.map((gift, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <GiftCard gift={gift} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
