"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { ensureGsap } from "@/lib/motion/gsap";
import { lenisConfig } from "@/tokens/animations";

/**
 * Section 3.4 — Lenis-driven smooth scrolling, wired into GSAP's ticker
 * so ScrollTrigger-based animations (horizontal pins, reveals) stay in
 * sync with Lenis's interpolated scroll position instead of the raw
 * native scroll event. Respects prefers-reduced-motion by skipping Lenis
 * entirely and falling back to native scrolling.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = ensureGsap();

    const lenis = new Lenis({
      duration: lenisConfig.duration,
      smoothWheel: lenisConfig.smoothWheel,
      touchMultiplier: lenisConfig.touchMultiplier,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
