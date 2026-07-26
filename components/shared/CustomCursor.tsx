"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const TEXT_INPUT_SELECTOR = "input, textarea, select, [contenteditable='true']";
const INTERACTIVE_SELECTOR = "a, button, [data-cursor], [data-cursor-text]";

/**
 * Section 3.9 — Custom cursor with smooth interpolation, magnetic-hover
 * expansion, a text-label mode for elements tagged data-cursor-text, and
 * a text-input mode (a thin I-beam) for form fields — the native cursor
 * is hidden globally, so without this, hovering an <input> shows no
 * indication at all that it's editable. Disabled entirely on touch
 * devices and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [textMode, setTextMode] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const targetEl = e.target as HTMLElement;
      const isTextInput = !!targetEl?.closest<HTMLElement>(TEXT_INPUT_SELECTOR);
      const interactiveTarget = targetEl?.closest<HTMLElement>(INTERACTIVE_SELECTOR);

      setTextMode(isTextInput);
      setHovering(!isTextInput && !!interactiveTarget);
      setLabel(isTextInput ? null : interactiveTarget?.getAttribute("data-cursor-text") ?? null);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      {textMode ? (
        <motion.div
          animate={{ height: 22, opacity: 1 }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          className="w-[2px] rounded-full bg-white"
        />
      ) : (
        <motion.div
          animate={{
            width: hovering ? (label ? 96 : 56) : 16,
            height: hovering ? (label ? 96 : 56) : 16,
            opacity: 1,
          }}
          transition={{ type: "spring", damping: 24, stiffness: 300 }}
          className="flex items-center justify-center rounded-full border border-white/80 bg-white/90 text-[10px] font-semibold uppercase tracking-wide text-black"
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
}
