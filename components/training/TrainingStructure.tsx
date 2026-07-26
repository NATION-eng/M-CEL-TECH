import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { TRAINING_STRUCTURE } from "@/constants/training";

export function TrainingStructure() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="section-eyebrow">How It Works</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-ink md:text-4xl">
              Training Structure
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-muted/70 md:text-lg">
              The bootcamp is delivered hybrid, combining live interactive sessions with
              structured practical work, so every concept is reinforced by something you
              actually build.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TRAINING_STRUCTURE.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-white/8 bg-bg-secondary p-4 shadow-card"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-state-success" />
                  <span className="text-sm font-medium text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
