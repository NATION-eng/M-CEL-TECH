"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/home/WordReveal";
import { INDUSTRIES } from "@/constants/industries";
import { getWhatsAppLink } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Chapter6Industries() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const activeIndustry = INDUSTRIES[selectedIndex] ?? INDUSTRIES[0];
  if (!activeIndustry) return null;
  const ActiveIcon = activeIndustry.icon;

  return (
    <section id="industries" className="relative overflow-hidden bg-bg-secondary py-16 md:py-24 lg:py-36">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-aurora opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-0 h-96 w-96 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-eyebrow">Sector Expertise</span>
          <WordReveal
            text="Industries We Transform."
            as="h2"
            emphasize="Transform."
            className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
          />
          <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
            Hover or select an industry to discover how M-CEL TECH engineers custom digital solutions, modernizes infrastructure, and automates operations for your sector.
          </p>
        </div>

        {/* Horizontal Industry Selector Bar */}
        <div className="mb-10 flex flex-row items-center gap-3 overflow-x-auto pb-4 custom-scrollbar">
          {INDUSTRIES.map((industry, index) => {
            const Icon = industry.icon;
            const isSelected = selectedIndex === index;

            return (
              <button
                key={industry.name}
                type="button"
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-3 rounded-2xl px-5 py-3.5 text-left transition-all duration-300 cursor-pointer border whitespace-nowrap",
                  isSelected
                    ? "bg-slate-800/90 border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.3)] text-white scale-[1.02]"
                    : "bg-slate-900/60 border-white/10 text-slate-300 hover:bg-slate-800/60 hover:border-cyan-400/40 hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 border",
                    isSelected
                      ? "bg-gradient-to-br from-blue-600/40 to-cyan-500/40 border-cyan-400/70 text-cyan-300"
                      : "bg-white/5 border-white/10 text-slate-400 group-hover:text-cyan-300"
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-extrabold tracking-wide">{industry.name}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute -bottom-1 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Full-width Transformation Card */}
        <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndustry.name}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/95 p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              >
                {/* Background ambient lighting */}
                <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

                {/* Industry Header Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300 mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Sector #{String(selectedIndex + 1).padStart(2, "0")} · {activeIndustry.name} Solutions</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] border border-white/20">
                    <ActiveIcon className="h-8 w-8" />
                  </span>
                  <div>
                    <h3 className="text-xl font-black text-white leading-tight sm:text-2xl md:text-3xl">
                      {activeIndustry.name} Transformation
                    </h3>
                    <p className="text-sm font-semibold text-cyan-300 mt-1">
                      Engineered for Enterprise & Operational Growth
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2 border-t border-white/10">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    How We Transform {activeIndustry.name}:
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-200 font-medium sm:text-base md:text-lg">
                    {activeIndustry.summary}
                  </p>
                </div>

                {/* Key Deliverables Section */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-3.5">
                    Core Solutions & Key Deliverables
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeIndustry.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 text-sm font-bold text-white shadow-sm"
                      >
                        <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="mt-9 pt-6 border-t border-white/10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button
                    href={getWhatsAppLink(
                      `Hello M-CEL TECH, I'd like to speak with a specialist about your ${activeIndustry.name} technology solutions.`
                    )}
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Consult {activeIndustry.name} Specialist
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
      </Container>
    </section>
  );
}
