import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHO_SHOULD_ATTEND } from "@/constants/training";

export function WhoShouldAttend() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Is This For You?"
            title="Who Should Attend"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHO_SHOULD_ATTEND.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-md border border-white/8 bg-bg-secondary p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10 text-accent-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted/65">
                  {description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
