"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isWebGLAvailable } from "@/lib/webgl";
import { useInViewport } from "@/hooks/useInViewport";

// Three.js is lazy-loaded and never touches the SSR render or the
// initial bundle — Section 3.26 requires dynamic imports for exactly this.
const NetworkGlobe = dynamic(() => import("./NetworkGlobe"), { ssr: false, loading: () => null });

export function HeroGlobeCanvas({ className }: { className?: string }) {
  const [supported, setSupported] = useState(false);
  const { ref, inView } = useInViewport<HTMLDivElement>("300px");
  useEffect(() => setSupported(isWebGLAvailable()), []);

  return (
    <div ref={ref} className={className}>
      {/* Unmounted (not just visually hidden) once scrolled well away — a WebGL
          context left running off-screen forever is pure wasted GPU/battery. */}
      {supported && inView && <NetworkGlobe />}
    </div>
  );
}
