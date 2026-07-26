import { MessageCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/shared/Reveal";
import { BOOTCAMP_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

export function RegistrationCTA() {
  return (
    <section
      id="registration"
      className="relative scroll-mt-24 overflow-hidden bg-bg-primary py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-accent-cyan/15 blur-3xl" />

      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Ready to Build Your Future?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Secure your place in the upcoming 2-week Evening Class. Limited spaces available.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/training/register" size="lg">
              Register Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href={getWhatsAppLink(BOOTCAMP_WHATSAPP_MESSAGE)} variant="outline" size="lg">
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
