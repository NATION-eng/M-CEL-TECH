import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHY_CHOOSE_US } from "@/constants/homepage";

/**
 * Dark-theme rebuild of the six-feature "why choose us" grid, used by
 * /about until that page gets its own Master Blueprint section — same
 * data, updated to the current design tokens so it isn't visually broken.
 */
export function WhyChooseUsSection() {
  return (
    <section className="bg-bg-secondary py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Our Advantage" title="Why Choose M-CEL TECH" align="center" className="mx-auto" />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="glass-panel h-full p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
