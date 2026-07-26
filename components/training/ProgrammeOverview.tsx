import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { TRAINING_MODULES } from "@/constants/training";

export function ProgrammeOverview() {
  return (
    <section id="overview" className="scroll-mt-20 py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Programme Overview"
            title="What You'll Learn"
            description="This intensive bootcamp combines artificial intelligence, automation, software-assisted productivity, and modern project management into one comprehensive learning experience. Participants complete one programme covering every module — no separate course selection."
          />
        </Reveal>

        <ol className="relative mt-14 max-w-2xl">
          <div
            className="absolute left-5 top-2 h-[calc(100%-16px)] w-px bg-white/12"
            aria-hidden="true"
          />
          {TRAINING_MODULES.map(({ id, icon: Icon, title, description }, i) => (
            <Reveal key={id} delay={i * 0.08}>
              <li className="relative flex gap-5 pb-10 last:pb-0">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-accent/100 text-white shadow-card">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="pt-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">
                    Module {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted/65">
                    {description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
