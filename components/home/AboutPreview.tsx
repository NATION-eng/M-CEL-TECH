import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { AboutVisual } from "@/components/home/AboutVisual";

export function AboutPreview() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <AboutVisual />
        </Reveal>

        <Reveal delay={0.1}>
          <span className="section-eyebrow">About M-CEL TECH</span>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
            Technology That Drives Business Growth
          </h2>
          <p className="mt-5 text-base leading-relaxed text-brand-slate/70 md:text-lg">
            M-CEL TECH is a technology solutions company specializing in enterprise IT
            services, engineering technology, software development, intelligent automation,
            cybersecurity, networking, cloud technologies, and professional technology
            training.
          </p>
          <Button href="/about" variant="outline" className="mt-8">
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
