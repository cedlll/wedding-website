import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

function CopyIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function GiftCard({ gift }: { gift: (typeof config.gifts)[number] }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gift.accountNumber);
    } catch {
      const t = document.createElement("textarea");
      t.value = gift.accountNumber;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      document.body.removeChild(t);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center">
      {/* Card */}
      <button
        onClick={() => setRevealed(!revealed)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-warm"
        aria-expanded={revealed}
        aria-label={`${gift.label} details`}
      >
        <div
          className="py-8 px-6 transition-all duration-300 hover:shadow-md text-center"
          style={{
            border: "1px solid rgba(44,44,44,0.08)",
            backgroundColor: revealed ? "var(--cream-dark)" : "transparent",
          }}
        >
          <p
            className="font-display text-xl mb-2"
            style={{ color: "var(--forest-dark)" }}
          >
            {gift.label}
          </p>
          <p className="text-xs tracking-wider uppercase" style={{ color: "var(--forest)" }}>
            {revealed ? "Tap to hide" : "Tap to reveal"}
          </p>
        </div>
      </button>

      {/* Revealed details */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="mt-4 py-6 px-6 text-center"
            style={{ border: "1px solid rgba(44,44,44,0.08)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm mb-1" style={{ color: "var(--forest-dark)" }}>
              {gift.accountName}
            </p>

            <div className="flex items-center justify-center gap-2 mb-4">
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--forest)" }}
              >
                {gift.accountNumber}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy();
                }}
                className="p-1 transition-colors hover:opacity-70"
                style={{ color: "var(--forest)" }}
                aria-label={`Copy ${gift.label} account number`}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>

            <img
              src={gift.qrImagePath}
              alt={`${gift.label} QR code`}
              className="w-32 h-32 mx-auto object-contain"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 text-xs tracking-wider uppercase shadow-lg"
            style={{ backgroundColor: "var(--forest-dark)", color: "var(--cream)" }}
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
        className="font-serif text-lg md:text-xl italic leading-relaxed text-center max-w-xl mx-auto mb-14"
        style={{ color: "var(--forest)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        Your presence at our celebration is the greatest gift we could ask for.
        But if you wish to bless our new beginning...
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
