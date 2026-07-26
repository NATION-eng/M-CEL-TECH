import type { Metadata } from "next";
import { Target, Eye, Gem } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { WhyChooseUsSection } from "@/components/shared/WhyChooseUsSection";
import { Chapter9FinalInvitation } from "@/components/home/chapters/Chapter9FinalInvitation";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "M-CEL TECH is a technology solutions company specializing in enterprise IT services, engineering technology, software development, and professional technology training.",
};

const PILLARS = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To equip organizations and individuals with dependable, future-ready technology that solves real operational challenges.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "To be the most trusted technology partner for enterprises and professionals across the region.",
  },
  {
    icon: Gem,
    title: "Our Values",
    body: "Technical excellence, integrity, innovation, and long-term partnership over short-term transactions.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About M-CEL TECH"
        title="Technology That Drives Business Growth"
        description="M-CEL TECH is a technology solutions company specializing in enterprise IT services, engineering technology, software development, intelligent automation, cybersecurity, networking, cloud technologies, and professional technology training."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-md border border-white/8 bg-bg-secondary p-7 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent-cyan">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted/65">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <WhyChooseUsSection />
      <Chapter9FinalInvitation />
    </>
  );
}
