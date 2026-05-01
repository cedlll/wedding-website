import { motion } from "framer-motion";
import { useState } from "react";
import config from "../../lib/wedding-config";
import Lightbox from "./Lightbox";

const rotations = [-2, 1.5, -1, 2, -3, 0.5, -1.5, 2.5, -0.5, 1, -2.5, 3];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = config.gallery.photos;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {photos.map((photo, i) => {
          const rotation = rotations[i % rotations.length];
          const hasClip = i % 4 === 1;
          const tapeVariant = i % 3 === 0 ? "top-left" : i % 3 === 1 ? "top-right" : "none";

          return (
            <motion.div
              key={i}
              className="relative break-inside-avoid cursor-pointer group"
              style={{ transform: `rotate(${rotation}deg)` }}
              whileHover={{
                rotate: 0,
                boxShadow: "0 16px 48px rgba(62,44,31,0.13)",
              }}
              transition={{ duration: 0.3, type: "spring" }}
              onClick={() => setLightboxIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLightboxIndex(i); }}
              aria-label={`View photo: ${photo.alt}`}
            >
              {/* Washi tape decorations */}
              {tapeVariant === "top-left" && (
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
              )}
              {tapeVariant === "top-right" && (
                <div
                  className="absolute -top-3 -right-2 w-16 h-6 z-10"
                  style={{ transform: "rotate(5deg)" }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 64 24" className="w-full h-full">
                    <rect width="64" height="24" fill="rgba(180,130,100,0.3)" rx="1" />
                    <line x1="0" y1="8" x2="64" y2="8" stroke="rgba(180,130,100,0.12)" strokeWidth="2" />
                    <line x1="0" y1="16" x2="64" y2="16" stroke="rgba(180,130,100,0.12)" strokeWidth="2" />
                  </svg>
                </div>
              )}

              {/* Paperclip */}
              {hasClip && (
                <svg
                  className="absolute -top-4 right-4 z-10"
                  viewBox="0 0 20 50"
                  width="16"
                  height="40"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 2 C6 2, 2 2, 2 8 L2 38 C2 44, 8 48, 14 48 C20 48, 18 44, 18 38 L18 12 C18 8, 14 6, 10 6 C6 6, 6 10, 6 12 L6 36"
                    stroke="var(--wood)"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              )}

              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full rounded-sm"
                loading="lazy"
                width="600"
                height="450"
              />
            </motion.div>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
