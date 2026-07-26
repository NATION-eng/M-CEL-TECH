"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Target } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { TRAINING_MODULES } from "@/constants/training";

export function LearningModules() {
  const [openId, setOpenId] = useState<string | null>(TRAINING_MODULES[0]?.id ?? null);

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Curriculum"
            title="Learning Modules"
            description="Five focused modules, delivered in sequence, each ending with a practical, hands-on outcome."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {TRAINING_MODULES.map(({ id, icon: Icon, title, description, topics, outcome }, i) => {
            const isOpen = openId === id;
            return (
              <Reveal key={id} delay={i * 0.05}>
                <div className="overflow-hidden rounded-md border border-white/8 bg-bg-primary shadow-card">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    aria-controls={`module-panel-${id}`}
                    className="flex w-full items-center gap-4 p-6 text-left"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-cyan">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                        Module {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-0.5 block text-lg font-semibold text-ink">
                        {title}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-ink-muted/50 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`module-panel-${id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/8 px-6 pb-6 pt-5">
                          <p className="text-sm leading-relaxed text-ink-muted/70">
                            {description}
                          </p>

                          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-ink/60">
                            Topics Covered
                          </p>
                          <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {topics.map((topic) => (
                              <li
                                key={topic}
                                className="flex items-center gap-2 text-sm text-ink/80"
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-state-success" />
                                {topic}
                              </li>
                            ))}
                          </ul>

                          <div className="mt-5 flex items-start gap-2.5 rounded-lg bg-accent/10 p-4">
                            <Target className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                            <p className="text-sm text-ink/85">
                              <span className="font-semibold">Outcome: </span>
                              {outcome}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
