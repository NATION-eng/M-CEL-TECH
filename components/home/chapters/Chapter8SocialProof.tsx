"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/shared/Reveal";
import { WordReveal } from "@/components/home/WordReveal";

const PILLARS = [
  {
    value: "2+",
    label: "Years Delivering Technology",
    description: "Building enterprise solutions across multiple sectors in Nigeria.",
  },
  {
    value: "7",
    label: "Core Service Areas",
    description: "From software development to IoT, cybersecurity to equipment supply.",
  },
  {
    value: "13",
    label: "Industries We Serve",
    description: "Engineering, healthcare, finance, logistics, government, and more.",
  },
  {
    value: "5",
    label: "Training Modules",
    description: "Practical, instructor-led AI and digital innovation modules.",
  },
];

export function Chapter8SocialProof() {
  return (
    <section className="bg-bg-secondary py-28 md:py-36">
      <Container>
        <WordReveal
          text="Built to Serve Organizations Across Nigeria."
          as="h2"
          emphasize="Nigeria."
          className="mx-auto max-w-3xl text-center text-4xl font-bold leading-tight text-ink md:text-5xl"
        />
        <p className="mx-auto mt-5 max-w-xl text-center text-sm text-ink-muted">
          From enterprise IT to professional technology training, M-CEL TECH delivers
          dependable solutions for organizations that build for the long term.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {PILLARS.map(({ value, label, description }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="glass-panel flex h-full flex-col items-center p-6 text-center">
                <span className="text-4xl font-black text-accent-cyan">{value}</span>
                <span className="mt-2 text-sm font-bold text-ink">{label}</span>
                <p className="mt-2 text-xs leading-relaxed text-ink-muted/70">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
