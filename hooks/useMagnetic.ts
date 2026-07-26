"use client";

import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Section 3.10 — subtle magnetic pull for buttons/cards. Attach the
 * returned ref to the element and spread the style/handlers. Strength
 * defaults small on purpose — "never exaggerated."
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300, mass: 0.5 });
  const springY = useSpring(y, { damping: 20, stiffness: 300, mass: 0.5 });

  function onMouseMove(e: React.MouseEvent<T>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
}
