import { CheckCircle2, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { formatNaira } from "@/lib/utils";
import { PRICING_INCLUDES } from "@/constants/training";

export function Pricing({ title = "EQUIP 2027 CSR Subsidized Scholarship", price = 10000 }: { title?: string; price?: number }) {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="Investment" title="Pricing & Sponsorship" align="center" className="mx-auto" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-2xl border border-cyan-400/30 bg-bg-secondary shadow-card">
            <div className="bg-bg-primary px-8 py-7 text-center text-white border-b border-white/10">
              <span className="inline-block rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 mb-2">
                50% CSR Subsidized Grant
              </span>
              <p className="text-sm font-semibold text-cyan-300">EQUIP 2027 CSR Subsidized Scholarship</p>
              <div className="mt-2 flex items-baseline justify-center gap-2.5">
                <span className="text-4xl font-extrabold text-white">{formatNaira(10000)}</span>
                <span className="text-lg text-slate-400 line-through">₦20,000</span>
              </div>
              <p className="mt-1 text-xs text-slate-400">Subsidized per seat · Full programme · Kickoff Jan 11, 2027</p>
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

              <Button href="/equip2027" size="lg" className="mt-7 w-full">
                EQUIP 2027
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
