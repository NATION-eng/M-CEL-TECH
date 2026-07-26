"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Code2, Network, Cpu, Cloud, Shield, Radio } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WordReveal } from "@/components/home/WordReveal";
import { Reveal } from "@/components/shared/Reveal";

// Positions are plain numbers (0-100) — used directly as SVG viewBox
// coordinates AND formatted as percentages for the HTML chips, so the
// connecting lines and the chips they connect to can never drift apart.
// Spread wide and clear of the exact center so nothing crowds the hub.
const TECH_WORDS = [
  { label: "AI & Machine Learning", icon: Bot, top: 8, left: 50 },
  { label: "Software", icon: Code2, top: 26, left: 15 },
  { label: "Networks", icon: Network, top: 26, left: 85 },
  { label: "Automation", icon: Cpu, top: 52, left: 5 },
  { label: "Cloud", icon: Cloud, top: 52, left: 95 },
  { label: "Cybersecurity", icon: Shield, top: 80, left: 22 },
  { label: "IoT", icon: Radio, top: 80, left: 78 },
];

const CENTER = { top: 50, left: 50 };

/** Chapter 2 — The Future: individual technology words connect into a network around a central node, communicating breadth of capability. */
export function Chapter2Future() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-28 md:py-36">
      <div className="absolute inset-0 bg-aurora opacity-50" />

      <Container className="relative">
        <Reveal>
          <span className="section-eyebrow mx-auto flex w-fit">Our Tech Ecosystem</span>
        </Reveal>

        <WordReveal
          text="Engineering the Digital Future."
          emphasize="Future."
          as="h2"
          className="mx-auto mt-5 max-w-3xl text-center text-4xl font-bold leading-tight text-ink md:text-5xl"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-ink-muted">
            One team, working across every layer of the technology stack — connected
            disciplines, not disconnected services.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-20 h-[520px] max-w-3xl md:h-[580px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ch2-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
            {TECH_WORDS.map((word, i) => {
              const isActive = hovered === i;
              return (
                <motion.line
                  key={word.label}
                  x1={CENTER.left}
                  y1={CENTER.top}
                  x2={word.left}
                  y2={word.top}
                  vectorEffect="non-scaling-stroke"
                  stroke={isActive ? "#22D3EE" : "url(#ch2-line)"}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  animate={{ strokeWidth: isActive ? 2.5 : 1, strokeOpacity: isActive ? 0.9 : 0.35 }}
                  transition={{
                    pathLength: { duration: 1, delay: 0.3 + i * 0.1, ease: "easeOut" },
                    strokeWidth: { duration: 0.3 },
                    strokeOpacity: { duration: 0.3 },
                  }}
                />
              );
            })}
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ top: `${CENTER.top}%`, left: `${CENTER.left}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-accent-cyan/30 blur-lg"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="glass flex h-16 w-16 items-center justify-center rounded-full text-xs font-bold text-ink shadow-glow-blue">
              MCEL
            </div>
          </motion.div>

          {TECH_WORDS.map((word, i) => {
            const Icon = word.icon;
            const isActive = hovered === i;
            return (
              <motion.div
                key={word.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.5, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
                }}
                style={{ top: `${word.top}%`, left: `${word.left}%` }}
                className={`glass absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-ink transition-shadow duration-300 ${
                  isActive ? "shadow-glow-cyan" : ""
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-accent-cyan" : "text-ink-muted"}`} />
                {word.label}
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
