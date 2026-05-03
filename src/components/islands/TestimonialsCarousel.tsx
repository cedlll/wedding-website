import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const testimonials = [
  {
    quote: "Their love story is one for the ages. We couldn't be happier to witness their union and celebrate this beautiful journey together.",
    author: "Maria Santos",
    role: "Close Friend",
  },
  {
    quote: "From the moment they met, it was clear they were meant to be. Their wedding day will be a testament to their incredible bond and shared dreams.",
    author: "James Rodriguez",
    role: "College Friend",
  },
  {
    quote: "Watching them grow together has been a privilege. This celebration is not just about a wedding, but about two souls becoming one.",
    author: "Sofia Chen",
    role: "Childhood Friend",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((curr) => (curr - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-4xl mx-auto px-12 md:px-20">
      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:text-gold z-10"
        style={{ color: "var(--charcoal)" }}
        aria-label="Previous testimonial"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-colors duration-300 hover:text-gold z-10"
        style={{ color: "var(--charcoal)" }}
        aria-label="Next testimonial"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Testimonials */}
      <div className="text-center py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Quote Icon */}
            <motion.div
              className="mb-8"
              style={{ color: "var(--gold)", opacity: 0.3 }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="currentColor"
                className="mx-auto"
              >
                <path d="M12 34h6l4-8V14H10v12h6zm16 0h6l4-8V14H26v12h6z" />
              </svg>
            </motion.div>

            {/* Quote Text */}
            <p
              className="font-serif text-xl md:text-2xl italic leading-relaxed mb-8 max-w-2xl mx-auto"
              style={{ color: "var(--charcoal)", lineHeight: 1.6 }}
            >
              "{testimonials[currentIndex].quote}"
            </p>

            {/* Author */}
            <p
              className="font-display text-lg mb-1"
              style={{ color: "var(--charcoal)", letterSpacing: "0.02em" }}
            >
              {testimonials[currentIndex].author}
            </p>
            <p
              className="text-sm font-body"
              style={{ color: "var(--text-muted)", letterSpacing: "0.08em" }}
            >
              {testimonials[currentIndex].role}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentIndex ? "var(--gold)" : "var(--divider)",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
