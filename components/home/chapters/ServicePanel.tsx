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
    <div className="flex h-full w-screen shrink-0 items-center justify-center px-4 sm:px-6 md:px-16">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        <div>
          <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent-cyan sm:h-14 sm:w-14">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <h3 className="mt-5 text-2xl font-bold text-ink sm:text-3xl md:text-4xl">{title}</h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted sm:text-base">{description}</p>
        </div>
        <div className="glass-panel flex h-52 items-center justify-center overflow-hidden sm:h-64 md:h-80">{motif}</div>
      </div>
    </div>
  );
}
