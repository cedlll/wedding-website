import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import config from "../../lib/wedding-config";

function EnvelopeCard({ gift }: { gift: (typeof config.gifts)[number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gift.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = gift.accountNumber;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* Envelope button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
        aria-expanded={isOpen}
        aria-label={`${gift.label} payment details`}
      >
        <div className="relative card-bordered rounded-sm p-6 transition-shadow hover:shadow-warm-md">
          {/* Envelope SVG */}
          <svg viewBox="0 0 120 80" className="w-20 h-14 mx-auto mb-3" fill="none" aria-hidden="true">
            <rect x="4" y="20" width="112" height="56" rx="2" stroke="var(--wood)" strokeWidth="1.25" />
            <motion.path
              d={isOpen ? "M4 20 L60 8 L116 20" : "M4 20 L60 52 L116 20"}
              stroke="var(--wood)"
              strokeWidth="1.25"
              strokeLinejoin="round"
              animate={{ d: isOpen ? "M4 20 L60 8 L116 20" : "M4 20 L60 52 L116 20" }}
              transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.5 }}
            />
            {!isOpen && (
              <>
                <path d="M55 32 C58 28, 62 26, 65 28" stroke="var(--olive-soft)" strokeWidth="1" strokeLinecap="round" />
                <path d="M58 30 C56 27, 58 24, 60 26" stroke="var(--olive-soft)" strokeWidth="1" />
                <path d="M62 28 C64 25, 67 24, 66 27" stroke="var(--olive-soft)" strokeWidth="1" />
              </>
            )}
          </svg>

          <p
            className="font-display text-xl text-center font-normal"
            style={{ color: "var(--wood-deep)" }}
          >
            {gift.label}
          </p>
        </div>
      </button>

      {/* Revealed content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mt-4 p-6 card-bordered rounded-sm text-center"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            {/* QR code */}
            <img
              src={gift.qrImagePath}
              alt={`${gift.label} QR code`}
              className="w-40 h-40 mx-auto mb-4 object-contain"
              width="160"
              height="160"
              loading="lazy"
            />

            <p className="font-body mb-1" style={{ color: "var(--wood-deep)" }}>
              {gift.accountName}
            </p>

            <div className="flex items-center justify-center gap-2">
              <span className="font-mono-micro" style={{ color: "var(--wood)" }}>
                {gift.accountNumber}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); handleCopy(); }}
                className="p-1 rounded transition-colors hover:bg-paper-fold"
                aria-label={`Copy ${gift.label} account number`}
              >
                {copied ? (
                  <Check size={14} style={{ color: "var(--olive)" }} />
                ) : (
                  <Copy size={14} style={{ color: "var(--wood)" }} />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-sm font-mono-micro shadow-warm-md"
            style={{ backgroundColor: "var(--paper-deep)", color: "var(--olive)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GiftEnvelopes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {config.gifts.map((gift, i) => (
        <EnvelopeCard key={i} gift={gift} />
      ))}
    </div>
  );
}
