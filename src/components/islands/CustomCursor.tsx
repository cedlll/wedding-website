import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [label, setLabel] = useState("");

  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isInteractive = el?.closest("a, button, [data-cursor]");
      const cursorLabel = (el?.closest("[data-cursor-label]") as HTMLElement)?.dataset.cursorLabel ?? "";

      setHovered(!!isInteractive);
      setLabel(cursorLabel);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onDown = () => setClicked(true);
    const onUp = () => setClicked(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99999,
          pointerEvents: "none",
          width: hovered ? "6px" : "5px",
          height: hovered ? "6px" : "5px",
          borderRadius: "50%",
          backgroundColor: hovered ? "var(--gold)" : "var(--charcoal)",
          transition: "width 0.3s ease, height 0.3s ease, background-color 0.3s ease",
          willChange: "transform",
        }}
      />

      {/* Ring — follows with lag */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 99998,
          pointerEvents: "none",
          width: clicked ? "28px" : hovered ? "52px" : "36px",
          height: clicked ? "28px" : hovered ? "52px" : "36px",
          borderRadius: "50%",
          border: `1px solid ${hovered ? "var(--gold)" : "rgba(26,26,24,0.35)"}`,
          backgroundColor: hovered && label ? "var(--charcoal)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94), height 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.3s ease, background-color 0.3s ease",
          willChange: "transform",
          overflow: "hidden",
        }}
      >
        {label && (
          <span
            style={{
              color: "var(--white)",
              fontSize: "8px",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}
