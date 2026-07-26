"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { isWebGLAvailable } from "@/lib/webgl";
import { useInViewport } from "@/hooks/useInViewport";

const AIBrain = dynamic(() => import("./AIBrain"), { ssr: false, loading: () => null });

export function AIBrainCanvas({ className }: { className?: string }) {
  const [supported, setSupported] = useState(false);
  const { ref, inView } = useInViewport<HTMLDivElement>("300px");
  useEffect(() => setSupported(isWebGLAvailable()), []);

  return (
    <div ref={ref} className={className}>
      {supported && inView && <AIBrain />}
    </div>
  );
}
