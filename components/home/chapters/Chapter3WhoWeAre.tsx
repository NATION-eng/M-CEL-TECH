"use client";

import { Target, Eye, Gem, Lightbulb, ShieldCheck, Handshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { WordReveal } from "@/components/home/WordReveal";
import { AnimatedCounter } from "@/components/home/AnimatedCounter";

const PILLARS = [
  { icon: Target, title: "Mission", body: "Equip organizations and individuals with dependable, future-ready technology that solves real operational challenges." },
  { icon: Eye, title: "Vision", body: "To be the most trusted technology partner for enterprises and professionals across Africa." },
  { icon: Gem, title: "Values", body: "Technical excellence, integrity, and innovation — built on long-term partnership, not one-off transactions." },
];

const VALUES = [
  { icon: Lightbulb, label: "Innovation Driven" },
  { icon: ShieldCheck, label: "Reliable by Design" },
  { icon: Handshake, label: "Partnership First" },
];

/** Metrics are intentionally structural, not fabricated performance claims — swap in real figures once confirmed. */
const METRICS = [
  { value: 9, suffix: "+", label: "Service Domains" },
  { value: 13, suffix: "+", label: "Industries Served" },
  { value: 100, suffix: "%", label: "Hands-On Delivery" },
];

/** Chapter 3 — Who We Are: mission/vision/values as glass panels rather than paragraphs, with counters that animate into view. */
export function Chapter3WhoWeAre() {
  return (
    <section className="relative bg-bg-primary py-28 md:py-36">
      <Container>
        <Reveal>
          <span className="section-eyebrow">Strategic Partner</span>
        </Reveal>

        <WordReveal
          text="Who We Are."
          as="h2"
          emphasize="Are."
          className="mt-5 text-4xl font-bold leading-tight text-ink md:text-5xl"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PILLARS.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="glass-panel h-full p-8 transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-glow-cyan">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            {VALUES.map(({ icon: Icon, label }) => (
              <span key={label} className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-ink-muted">
                <Icon className="h-4 w-4 text-accent-cyan" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-6 border-t border-white/10 pt-14 sm:grid-cols-3">
          {METRICS.map(({ value, suffix, label }) => (
            <Reveal key={label}>
              <div className="glass-panel p-6 text-center transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-glow-cyan">
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  className="font-mono text-4xl font-bold text-gradient-electric md:text-5xl"
                />
                <p className="mt-2 text-sm text-ink-muted">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
