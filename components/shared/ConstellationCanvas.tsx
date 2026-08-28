"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; vx: number; vy: number; r: number };

/**
 * Section 4 / Footer Experience — a slow-drifting constellation. Plain
 * Canvas2D rather than another WebGL context: this renders on every
 * page (footer is global), so it needs to be cheap, not another R3F
 * scene stacked on top of the Hero/AI-brain canvases.
 */
export function ConstellationCanvas({ density = 70 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let rafId: number;

    function resize() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? 400;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      stars = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        r: Math.random() * 1.4 + 0.4,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!s) continue;
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > width) s.vx *= -1;
        if (s.y < 0 || s.y > height) s.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(203, 213, 225, 0.7)";
        ctx!.fill();

        for (let j = i + 1; j < stars.length; j++) {
          const other = stars[j];
          if (!other) continue;
          const dist = Math.hypot(s.x - other.x, s.y - other.y);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.moveTo(s.x, s.y);
            ctx!.lineTo(other.x, other.y);
            ctx!.strokeStyle = `rgba(37, 99, 235, ${0.12 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
      }
      if (!prefersReducedMotion) rafId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" aria-hidden="true" />;
}
