"use client";

import type { LucideIcon } from "lucide-react";

/** One full-viewport panel inside Chapter 4's horizontal track, each with a small bespoke motion motif matching its service. */
export function ServicePanel({
  icon: Icon,
  title,
  description,
  motif,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  motif: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-screen shrink-0 items-center justify-center px-6 md:px-16">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent-cyan">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-6 text-3xl font-bold text-ink md:text-4xl">{title}</h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">{description}</p>
        </div>
        <div className="glass-panel flex h-64 items-center justify-center overflow-hidden md:h-80">{motif}</div>
      </div>
    </div>
  );
}
