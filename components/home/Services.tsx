import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { SERVICES } from "@/constants/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-brand-mist py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Comprehensive Technology Services"
            description="From enterprise infrastructure to professional training, every service is delivered with the same standard of technical rigor."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ slug, icon: Icon, title, description }, i) => (
            <Reveal key={slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/services#${slug}`}
                id={slug}
                className="group flex h-full scroll-mt-24 flex-col rounded-card border border-brand-slate/8 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-blue-500/20 hover:shadow-card-hover"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-600 transition-colors duration-300 group-hover:bg-brand-blue-500 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-brand-navy">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-slate/65">
                  {description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-600">
                  Learn More
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
