"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AlertCircle, Search, Layers, Code2, Rocket, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { WordReveal } from "@/components/home/WordReveal";

const STAGES = [
  { icon: AlertCircle, title: "Challenge", body: "We start by understanding the real operational problem, not just the request." },
  { icon: Search, title: "Discovery", body: "Technical and business context gathered before a single line of code is written." },
  { icon: Layers, title: "Architecture", body: "A solution designed for today's need and tomorrow's scale." },
  { icon: Code2, title: "Development", body: "Built with engineering discipline, reviewed at every stage." },
  { icon: Rocket, title: "Deployment", body: "Shipped with a plan, not a leap of faith." },
  { icon: LifeBuoy, title: "Support", body: "The relationship continues long after go-live." },
];

/** Chapter 5 — a visual workflow with a connecting line whose draw progress is tied directly to scroll position. */
export function Chapter5HowWeSolve() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.4"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-bg-primary py-28 md:py-36">
      <Container>
        <WordReveal
          text="How We Solve Problems."
          as="h2"
          emphasize="Problems."
          className="text-4xl font-bold leading-tight text-ink md:text-5xl"
        />

        <div ref={ref} className="relative mt-20 max-w-2xl">
          <div className="absolute left-6 top-2 h-[calc(100%-16px)] w-px bg-white/10" aria-hidden="true" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-2 w-px bg-gradient-to-b from-accent-cyan to-accent"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {STAGES.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <li className="relative flex gap-6">
                  <span className="glass relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-accent-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="pt-2">
                    <h3 className="text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-ink-muted">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
