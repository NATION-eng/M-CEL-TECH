import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { WHY_BOOTCAMP } from "@/constants/training";

export function WhyBootcamp() {
  return (
    <section className="bg-bg-primary py-16 text-white md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why This Bootcamp"
            title="Built for Outcomes, Not Just Attendance"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_BOOTCAMP.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-md border border-white/10 bg-white/[0.04] p-7 transition-colors duration-300 hover:bg-white/[0.07]">
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-cyan/15 text-accent-cyan">
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
