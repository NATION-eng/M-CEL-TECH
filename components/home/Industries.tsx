import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { INDUSTRIES } from "@/constants/industries";

export function Industries() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Who We Serve"
            title="Industries We Serve"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {INDUSTRIES.map(({ name, icon: Icon }, i) => (
            <Reveal key={name} delay={(i % 5) * 0.05}>
              <div className="group flex flex-col items-center gap-3 rounded-card border border-brand-slate/8 bg-white px-4 py-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue-500/20 hover:shadow-card-hover">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-600 transition-colors duration-300 group-hover:bg-brand-blue-500 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-brand-navy/85">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
