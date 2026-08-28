"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/**
 * Section 3.20 — no spinner. The logo assembles while thin circuit lines
 * draw themselves and particles converge toward center, then the whole
 * screen fades to reveal the page. Runs once per session (not on every
 * client-side navigation) and never blocks longer than the animation
 * itself needs — there's no artificial delay beyond a small minimum so
 * the sequence doesn't feel like it flashed and vanished.
 */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.sessionStorage?.getItem("mcel-loaded")) {
        setVisible(false);
        return;
      }
    } catch {
      // Ignore storage access restrictions
    }
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const minDisplay = prefersReducedMotion ? 200 : 1700;

    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage?.setItem("mcel-loaded", "1");
        }
      } catch {
        // Ignore storage access restrictions
      }
      setVisible(false);
    }, minDisplay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            {[
              "M10 20 L40 20 L40 50",
              "M90 15 L60 15 L60 45",
              "M8 80 L35 80 L35 55",
              "M92 85 L65 85 L65 55",
            ].map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="url(#circuitGradient)"
                strokeWidth="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.1, delay: 0.15 * i, ease: "easeOut" }}
              />
            ))}
            <defs>
              <linearGradient id="circuitGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-3xl"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image src="/logo-main.png" alt="M-CEL TECH" width={220} height={91} priority className="brightness-0 invert" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
