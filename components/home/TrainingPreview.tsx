import { Laptop, Users, Award, Hammer, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { TRAINING_HIGHLIGHTS, TRAINING_DETAILS } from "@/constants/homepage";

const META = [
  { icon: Laptop, label: TRAINING_DETAILS.format },
  { icon: Tag, label: TRAINING_DETAILS.priceLabel },
  { icon: Users, label: TRAINING_DETAILS.cohortNote },
  { icon: Award, label: TRAINING_DETAILS.perks[0] },
  { icon: Hammer, label: TRAINING_DETAILS.perks[1] },
];

export function TrainingPreview() {
  return (
    <section className="bg-brand-mist py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <Reveal>
            <span className="section-eyebrow">Flagship Program</span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-brand-navy md:text-4xl">
              {TRAINING_DETAILS.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-slate/70 md:text-lg">
              Participants will learn practical, industry-relevant digital skills covering
              prompt engineering, cinematic AI video generation, vibe coding, AI automation,
              and project management.
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {META.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-brand-slate/10 bg-white px-4 py-2 text-sm font-medium text-brand-navy"
                >
                  <Icon className="h-4 w-4 text-brand-blue-500" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/training" variant="outline" size="lg">
                View Training
              </Button>
              <Button href="/training/register" size="lg">
                Register Now
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {TRAINING_HIGHLIGHTS.map(({ icon: Icon, title }) => (
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-card border border-brand-slate/8 bg-white p-5 shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-blue-50 text-brand-blue-600">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="pt-1.5 text-sm font-semibold leading-snug text-brand-navy">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
