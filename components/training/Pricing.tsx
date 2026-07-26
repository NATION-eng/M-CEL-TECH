import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { formatNaira } from "@/lib/utils";
import { PRICING_INCLUDES } from "@/constants/training";

export function Pricing({ title, price }: { title: string; price: number }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Investment" title="Pricing" align="center" className="mx-auto" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-md border border-accent/20 bg-bg-secondary shadow-card">
            <div className="bg-bg-primary px-8 py-7 text-center text-white">
              <p className="text-sm font-medium text-white/60">{title}</p>
              <p className="mt-2 text-4xl font-extrabold">{formatNaira(price)}</p>
              <p className="mt-1 text-xs text-white/50">One-time payment · Full programme</p>
            </div>

            <div className="p-8">
              <ul className="space-y-3">
                {PRICING_INCLUDES.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-ink/85">
                    <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-state-success" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button href="/training/register" size="lg" className="mt-7 w-full">
                Register Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
