"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";
import { TRAINING_FAQS } from "@/constants/training";

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title="Frequently Asked Questions"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl space-y-3">
          {TRAINING_FAQS.map(({ question, answer }, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={question} delay={(i % 4) * 0.05}>
                <div className="overflow-hidden rounded-md border border-white/8 bg-bg-primary shadow-card">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-ink md:text-base">
                      {question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4.5 w-4.5 shrink-0 text-ink-muted/50 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/8 px-5 pb-5 pt-4 text-sm leading-relaxed text-ink-muted/65">
                          {answer}
                        </p>
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
