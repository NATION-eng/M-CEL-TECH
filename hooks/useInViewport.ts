"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mounts expensive content (Three.js canvases) only while their
 * container is near the viewport, and unmounts it once scrolled well
 * away — without this, every WebGL scene on the page keeps rendering
 * every frame forever, even when the user is nowhere near it.
 */
export function useInViewport<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}
