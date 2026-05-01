import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  photos: Array<{ src: string; alt: string }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ photos, currentIndex, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + photos.length) % photos.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % photos.length);
    },
    [currentIndex, photos.length, onClose, onNavigate]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const photo = photos[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo: ${photo.alt}`}
        tabIndex={-1}
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        {/* Overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(42,34,24,0.85)" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Close lightbox"
        >
          <X size={28} />
        </button>

        {/* Navigation */}
        <button
          onClick={() => onNavigate((currentIndex - 1 + photos.length) % photos.length)}
          className="absolute left-4 z-10 p-3 text-white/60 hover:text-white transition-colors"
          aria-label="Previous photo"
        >
          <ChevronLeft size={36} />
        </button>

        <button
          onClick={() => onNavigate((currentIndex + 1) % photos.length)}
          className="absolute right-4 z-10 p-3 text-white/60 hover:text-white transition-colors"
          aria-label="Next photo"
        >
          <ChevronRight size={36} />
        </button>

        {/* Photo in polaroid frame */}
        <motion.div
          className="relative z-10 bg-white p-4 pb-16 shadow-warm-lg max-w-4xl max-h-[85vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          key={currentIndex}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[70vh] w-auto object-contain"
          />
          <p
            className="absolute bottom-4 left-4 right-4 text-center font-body text-sm"
            style={{ color: "var(--wood-deep)" }}
          >
            {photo.alt}
          </p>
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-mono-micro text-white/50">
          {currentIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
