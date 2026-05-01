import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { stiffness: 300, damping: 30 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, { stiffness: 200, damping: 20 });

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);
    let lastX = 0;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const velocityX = e.clientX - lastX;
      rotation.set(Math.max(-15, Math.min(15, velocityX * 0.5)));
      lastX = e.clientX;
    };

    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches("a, button, [role='button'], input, textarea, select, [tabindex]")) {
        setHovering(true);
      }
    };

    const handleLeave = () => setHovering(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseout", handleLeave);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseout", handleLeave);
    };
  }, [cursorX, cursorY, rotation]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{
        x: cursorX,
        y: cursorY,
        rotate: rotation,
        translateX: "-50%",
        translateY: "-50%",
      }}
      aria-hidden="true"
    >
      <motion.svg
        viewBox="0 0 12 18"
        style={{
          width: hovering ? 17 : 12,
          height: hovering ? 25 : 18,
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: hovering ? 1.4 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <path
          d="M6 1 C4 4, 1 8, 2 14 C3 11, 4 7, 6 3 C8 7, 9 11, 10 14 C11 8, 8 4, 6 1Z"
          stroke="var(--olive)"
          strokeWidth="1.25"
          fill={hovering ? "var(--olive-soft)" : "none"}
          fillOpacity={hovering ? 0.3 : 0}
        />
        <path d="M6 3 L6 16" stroke="var(--olive)" strokeWidth="0.75" />
      </motion.svg>
    </motion.div>
  );
}
