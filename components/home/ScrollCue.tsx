"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/** Section 4 Chapter 1 — pulsing circular indicator that morphs into a vertical progress line as the user begins scrolling. */
export function ScrollCue() {
  const { scrollY } = useScroll();
  const circleOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const lineOpacity = useTransform(scrollY, [0, 200, 400], [0, 1, 0]);
  const lineHeight = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2">
      <motion.div style={{ opacity: circleOpacity }} className="flex flex-col items-center gap-2">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
        </motion.div>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-ink-muted">Scroll</span>
      </motion.div>
      <motion.div
        style={{ opacity: lineOpacity, height: lineHeight }}
        className="mx-auto mt-2 w-px bg-gradient-to-b from-accent-cyan to-transparent"
      />
    </div>
  );
}
