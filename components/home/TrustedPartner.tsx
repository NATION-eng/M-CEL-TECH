import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { TRUST_HIGHLIGHTS } from "@/constants/homepage";

export function TrustedPartner() {
  return (
    <section className="bg-brand-mist py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Organizations Choose Us"
            title="Your Trusted Technology Partner"
            description="Organizations choose M-CEL TECH because we focus on delivering dependable technology solutions backed by technical expertise, professional service, and long-term support."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_HIGHLIGHTS.map(({ icon: Icon, title }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="group flex h-full items-center gap-4 rounded-card border border-brand-slate/8 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-600 transition-colors duration-300 group-hover:bg-brand-blue-500 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-brand-navy">{title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
