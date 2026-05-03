import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      className="border-b"
      style={{ borderColor: "var(--divider)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold group"
        aria-expanded={isOpen}
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          className="font-display text-xl md:text-2xl pr-8"
          style={{ color: "var(--charcoal)", letterSpacing: "0.01em", fontWeight: 400 }}
          animate={{
            color: isOpen ? "var(--gold)" : "var(--charcoal)"
          }}
          transition={{ duration: 0.3 }}
        >
          {question}
        </motion.span>
        <motion.span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <motion.line
              x1="9" y1="3" x2="9" y2="15"
              stroke="var(--charcoal)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                stroke: isOpen ? "var(--gold)" : "var(--charcoal)"
              }}
            />
            <motion.line
              x1="3" y1="9" x2="15" y2="9"
              stroke="var(--charcoal)"
              strokeWidth="1.5"
              strokeLinecap="round"
              animate={{
                stroke: isOpen ? "var(--gold)" : "var(--charcoal)"
              }}
            />
          </svg>
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.35, ease: "easeOut" },
              opacity: { duration: 0.25, delay: 0.08 }
            }}
            className="overflow-hidden"
          >
            <motion.p
              className="pb-7 pr-12 leading-relaxed text-base font-body"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
              initial={{ y: -8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto">
      {config.faqs.map((faq, i) => (
        <FaqItem
          key={i}
          index={i}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
