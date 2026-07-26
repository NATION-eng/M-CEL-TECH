"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * GSAP + ScrollTrigger must only register once, and only on the client
 * (importing ScrollTrigger during SSR touches `window`). Every component
 * that needs scroll-triggered animation calls this before using gsap.
 */
export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
