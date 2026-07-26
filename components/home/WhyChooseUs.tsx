import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHY_CHOOSE_US } from "@/constants/homepage";

export function WhyChooseUs() {
  return (
    <section className="bg-brand-navy py-20 text-white md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Advantage"
            title="Why Choose M-CEL TECH"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_US.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-card border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:bg-white/[0.07]">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-cyan/15 text-brand-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
