"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Section 6.10 — slim, smooth scroll-position indicator at the very top of every page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[55] h-[2px] w-full origin-left bg-gradient-electric"
      aria-hidden="true"
    />
  );
}
