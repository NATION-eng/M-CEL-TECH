import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-cyan/15 blur-3xl" />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Let&apos;s Build the Future of Your Business Together
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            Whether you&apos;re modernizing your IT infrastructure, developing custom software,
            implementing intelligent automation, sourcing enterprise technology, or building
            your team&apos;s technical capacity, M-CEL TECH is ready to help you achieve your
            goals with confidence.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)} size="lg">
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
