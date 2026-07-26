import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Chapter6Industries } from "@/components/home/chapters/Chapter6Industries";
import { Chapter9FinalInvitation } from "@/components/home/chapters/Chapter9FinalInvitation";
import { SERVICES } from "@/constants/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Enterprise IT solutions, software development, networking, cybersecurity, IoT, engineering technology, equipment supply, and professional technology training.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Comprehensive Technology Services for Modern Organizations"
        description="Every engagement is backed by technical expertise, structured delivery, and long-term support."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES.map(({ slug, icon: Icon, title, description }) => (
              <div
                key={slug}
                id={slug}
                className="scroll-mt-24 rounded-md border border-white/8 bg-bg-secondary p-7 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted/65">{description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Chapter6Industries />
      <Chapter9FinalInvitation />
    </>
  );
}
