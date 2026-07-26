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
const FLOATING_CARDS = [
  { icon: Server, label: "Enterprise Infrastructure", top: "2%", left: "2%", delay: 1.6 },
  { icon: Cpu, label: "AI & Automation", top: "42%", left: "86%", delay: 1.9 },
  { icon: ShieldCheck, label: "Cybersecurity", top: "84%", left: "2%", delay: 2.2 },
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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-bg-primary pt-24 md:pt-32">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-aurora" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
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
              className="mt-6 text-5xl font-extrabold leading-[1.05] text-ink sm:text-6xl lg:text-7xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted"
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
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/training/register" size="lg">
                Register Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)} variant="secondary" size="lg">
                <MessageCircle className="h-4 w-4" />
                Talk to an Expert
              </Button>
            </motion.div>
          </div>

          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto aspect-square w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[500px]">
              <HeroGlobeCanvas className="absolute inset-0 h-full w-full opacity-90" />

              {FLOATING_CARDS.map(({ icon: Icon, label, top, left, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.8, delay },
                    y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
                  }}
                  style={{ top, left }}
                  className="glass absolute flex items-center gap-2 rounded-md px-3.5 py-2.5 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 text-accent-cyan" />
                  <span className="text-xs font-medium text-ink-muted">{label}</span>
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
