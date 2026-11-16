"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, MessageCircle, CalendarClock, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { WordReveal } from "@/components/home/WordReveal";
import { AIBrainCanvas } from "@/components/three/AIBrainCanvas";
import { TRAINING_MODULES } from "@/constants/training";
import { TRAINING_DETAILS } from "@/constants/homepage";
import { BOOTCAMP_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";
import { formatNaira, roundForSSR } from "@/lib/utils";

const RADIUS = 36; // kept well inside the box so wrapped labels never spill past its edge
const CENTER = 50;

const SCHEDULE_BADGES = [
  { icon: CalendarClock, label: `Date: ${TRAINING_DETAILS.duration}` },
  { icon: Clock3, label: "Evening Online (7–9 PM) & Physical Sprint" },
];

/** Chapter 7 — mood shift into deep aurora violet, AI-brain centerpiece, modules orbiting it, pricing glowing below. */
export function Chapter7Training() {
  const [active, setActive] = useState<string | null>(null);
  const modules = TRAINING_MODULES;

  const positions = useMemo(
    () =>
      modules.map((_, i) => {
        const angle = (i / modules.length) * Math.PI * 2 - Math.PI / 2;
        return {
          x: roundForSSR(CENTER + RADIUS * Math.cos(angle)),
          y: roundForSSR(CENTER + RADIUS * Math.sin(angle)),
        };
      }),
    [modules.length]
  );

  return (
    <section className="relative overflow-hidden bg-bg-primary py-16 md:py-28 lg:py-36">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(139,92,246,0.22) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 50% 80%, rgba(37,99,235,0.15) 0%, transparent 60%)",
        }}
      />

      <Container className="relative">
        <Reveal>
          <span className="section-eyebrow mx-auto flex w-fit">Technical Capacity Building</span>
        </Reveal>

        <WordReveal
          text="Build the Skills That Build the Future."
          as="h2"
          emphasize="Future."
          className="mx-auto mt-5 max-w-3xl text-center text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-xl text-center text-base leading-relaxed text-ink-muted">
            One intensive programme, five practical modules, delivered in a single evening
            class built for hands-on learning.
          </p>
        </Reveal>

        {/* Desktop/tablet: modules orbit the AI-brain scene, with hover/focus tooltips. */}
        <div className="relative mx-auto mt-16 hidden aspect-square w-full max-w-md md:block md:max-w-lg">
          <AIBrainCanvas className="absolute inset-0 h-full w-full" />

          {modules.map((mod, i) => {
            const pos = positions[i];
            if (!pos) return null;
            const { x, y } = pos;
            const Icon = mod.icon;
            const isActive = active === mod.id;
            const isBottomHalf = y > CENTER;

            return (
              <div key={mod.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                <motion.button
                  type="button"
                  onMouseEnter={() => setActive(mod.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(mod.id)}
                  onBlur={() => setActive(null)}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  className="glass flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-md px-2.5 py-2.5 text-center sm:w-28"
                >
                  <Icon className="h-4 w-4 shrink-0 text-accent-cyan" />
                  <span className="text-[10px] font-medium leading-tight text-ink">{mod.title}</span>
                </motion.button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: isBottomHalf ? -8 : 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: isBottomHalf ? -8 : 8, scale: 0.95 }}
                      className="glass-panel absolute z-20 w-48 -translate-x-1/2 p-3.5 text-xs leading-relaxed text-ink-muted sm:w-56"
                      style={
                        isBottomHalf
                          ? { bottom: "calc(100% + 10px)", left: "50%" }
                          : { top: "calc(100% + 10px)", left: "50%" }
                      }
                    >
                      {mod.outcome}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile: a plain 2-column grid — title and outcome fully visible, no hover-dependent tooltips. */}
        <div className="mt-14 grid grid-cols-2 gap-3 md:hidden">
          {modules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <Reveal key={mod.id} delay={i * 0.06}>
                <div className="glass-panel h-full p-4">
                  <Icon className="h-5 w-5 text-accent-cyan" />
                  <h3 className="mt-2.5 text-xs font-semibold leading-tight text-ink">{mod.title}</h3>
                  <p className="mt-1.5 text-[11px] leading-snug text-ink-muted">{mod.outcome}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 flex max-w-md flex-wrap justify-center gap-2.5">
            {SCHEDULE_BADGES.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="glass flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink"
              >
                <Icon className="h-3.5 w-3.5 text-accent-cyan" />
                {label}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="glass-panel mx-auto mt-8 flex max-w-xl flex-col items-center gap-4 p-6 sm:p-10 text-center shadow-glow-violet border border-white/15 rounded-3xl">
            <span className="text-sm font-semibold text-slate-300 sm:text-base">
              EQUIP 2027: AI Productivity & Digital Innovation
            </span>
            <div className="flex items-baseline justify-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-gradient-electric">
                {formatNaira(10000)}
              </span>
              <span className="text-base text-slate-400 line-through">
                ₦45,000
              </span>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                SAVE ₦35,000
              </span>
            </div>
            <span className="text-sm font-medium text-slate-400">
              ₦10,000 Subsidized CSR Grant · Standard ₦45,000 · Certificate
            </span>
            
            <div className="mt-6 flex w-full flex-col gap-3">
              {/* Primary Conversion CTA to EQUIP 2027 */}
              <Button
                href="/equip2027"
                size="lg"
                className="w-full min-h-12 py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-sm sm:text-base font-extrabold uppercase tracking-wide rounded-full shadow-[0_0_25px_rgba(34,211,238,0.45)] border border-cyan-300/40 hover:shadow-[0_0_35px_rgba(34,211,238,0.75)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for EQUIP 2027</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Button>

              {/* Secondary Buttons */}
              <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
                <Button
                  href="/equip2027"
                  variant="outline"
                  size="md"
                  className="flex-1 min-h-10 py-2.5 px-3 bg-cyan-500/10 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.15)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold"
                  title="View Tracks & Details"
                  aria-label="View Tracks & Details"
                >
                  <BookOpen className="h-4 w-4 text-cyan-400 shrink-0" />
                  <span>Tracks & Details</span>
                </Button>

                <Button
                  href={getWhatsAppLink("Hello M-CEL TECH, I would like to know more about the EQUIP 2027 CSR Subsidized Scholarship.")}
                  variant="secondary"
                  size="md"
                  className="flex-1 min-h-10 py-2.5 px-3 bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold"
                  title="Talk to an Expert on WhatsApp"
                  aria-label="Talk to an Expert on WhatsApp"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp</span>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
