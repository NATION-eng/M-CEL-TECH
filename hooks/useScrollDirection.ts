"use client";

import { useEffect, useRef, useState } from "react";

/** Section 6.4 — nav hides on scroll down, reveals on scroll up. Ignores tiny jitter near the top so it doesn't flicker. */
export function useScrollDirection(threshold = 8) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const currentY = window.scrollY;
      const diff = currentY - lastY.current;

      if (currentY < 80) {
        setDirection("up");
      } else if (Math.abs(diff) > threshold) {
        setDirection(diff > 0 ? "down" : "up");
      }
      lastY.current = currentY;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
