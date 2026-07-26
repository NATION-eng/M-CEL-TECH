"use client";

import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/home/WordReveal";
import { Reveal } from "@/components/shared/Reveal";
import { ConstellationCanvas } from "@/components/shared/ConstellationCanvas";
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

/** Chapter 9 — Final Invitation: the constellation that carries into the Footer begins here, so the two blend into one closing scene. */
export function Chapter9FinalInvitation() {
  return (
    <section className="relative overflow-hidden bg-bg-primary py-32 md:py-44">
      <ConstellationCanvas density={110} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/40 to-bg-primary" />

      <Container className="relative text-center">
        <WordReveal
          text="Let's Engineer the Future Together."
          as="h2"
          emphasize="Together."
          className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl"
        />

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Whether you&apos;re modernizing infrastructure, building custom software, or
            training your team for what&apos;s next — this is where that conversation starts.
          </p>
          <div className="mt-10 flex justify-center">
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
