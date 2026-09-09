"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Server, Cpu, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/home/WordReveal";
import { ScrollCue } from "@/components/home/ScrollCue";
import { HeroGlobeCanvas } from "@/components/three/HeroGlobeCanvas";
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

// Positioned relative to the globe's own square container (not the
// whole viewport) — this guarantees they cluster tightly around it at
// every breakpoint instead of depending on fragile viewport-width math.
interface FloatingCard {
  icon: typeof Server;
  label: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}

// Positioned relative to the globe's own square container.
// Using left for left-side cards and right for right-side cards guarantees
// that badges NEVER overflow the viewport or cut off on tablet/mobile screens.
const FLOATING_CARDS: FloatingCard[] = [
  { icon: Server, label: "Enterprise Infrastructure", top: "4%", left: "0%", delay: 1.6 },
  { icon: Cpu, label: "AI & Automation", top: "44%", right: "0%", delay: 1.9 },
  { icon: ShieldCheck, label: "Cybersecurity", top: "84%", left: "0%", delay: 2.2 },
];

/**
 * Chapter 1 — The Arrival. Full-viewport, dark, particle/grid backdrop
 * with a mouse-reactive Three.js globe, word-by-word headline reveal,
 * and buttons that rise in only after the headline finishes. Text and
 * globe sit in a proper 12-column responsive grid rather than the globe
 * being absolutely positioned over the whole section.
 */
export function Chapter1Arrival() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-bg-primary pt-20 md:pt-28 lg:pt-32">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-aurora" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-6 lg:gap-12">
          <div className="md:col-span-7">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="section-eyebrow"
            >
              Engineering the Future
            </motion.span>

            <WordReveal
              text="Engineering Tomorrow's Technology, TODAY."
              emphasize="TODAY."
              delay={0.6}
              className="mt-5 text-3xl font-extrabold leading-[1.08] text-ink sm:text-4xl md:text-[2.6rem] lg:text-5xl xl:text-6xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base md:text-base lg:text-lg"
            >
              We help organizations leverage technology to solve operational challenges,
              modernize infrastructure, and stay ahead in an increasingly connected world —
              through enterprise IT, custom software, intelligent automation, and professional
              technology training.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5"
            >
              <Button
                href="/training/register"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-7 md:px-5 lg:px-8 text-sm sm:text-base md:text-sm lg:text-base"
              >
                Register Now
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>
              <Button
                href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto px-6 sm:px-7 md:px-5 lg:px-8 text-sm sm:text-base md:text-sm lg:text-base"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Talk to an Expert
              </Button>
            </motion.div>
          </div>

          <div className="relative hidden md:col-span-5 md:flex md:items-center md:justify-center lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-[310px] lg:max-w-[420px] xl:max-w-[480px]">
              <HeroGlobeCanvas className="absolute inset-0 h-full w-full opacity-90" />

              {FLOATING_CARDS.map(({ icon: Icon, label, top, left, right, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: [0, -8, 0] }}
                  transition={{
                    opacity: { duration: 0.8, delay },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
                  }}
                  style={{
                    top,
                    ...(left !== undefined ? { left } : {}),
                    ...(right !== undefined ? { right } : {}),
                  }}
                  className="glass absolute z-20 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2 lg:px-3.5 lg:py-2.5 whitespace-nowrap shadow-lg border border-white/15 pointer-events-none select-none backdrop-blur-md"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-accent-cyan shrink-0" />
                  <span className="text-[11px] sm:text-xs font-medium text-ink-muted">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <ScrollCue />
    </section>
  );
}
