import { Container } from "@/components/ui/Container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-white/8 bg-bg-secondary py-16 md:py-20">
      <Container>
        <span className="section-eyebrow">{eyebrow}</span>
        <h1 className="mt-5 max-w-3xl text-2xl font-bold leading-tight text-ink sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted/70 md:text-lg">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
