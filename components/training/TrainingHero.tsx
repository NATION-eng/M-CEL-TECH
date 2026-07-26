"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, BookOpen, Award, Hammer, CalendarClock, Clock3, Tag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BOOTCAMP_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";
import { TRAINING_DETAILS } from "@/constants/homepage";
import { formatNaira } from "@/lib/utils";

export function TrainingHero({ title, price }: { title: string; price: number }) {
  const badges = [
    { icon: CalendarClock, label: `${TRAINING_DETAILS.duration} Duration` },
    { icon: Clock3, label: `${TRAINING_DETAILS.schedule} (Evening Class)` },
    { icon: Award, label: "Certificate of Completion" },
    { icon: Hammer, label: "Hands-on Projects" },
    { icon: Tag, label: formatNaira(price) },
  ];

  return (
    <section className="border-b border-white/8 bg-bg-secondary py-16 md:py-24">
      <Container className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">M-CEL TECH Bootcamp</span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink-muted/70 md:text-lg">
            Master practical AI tools, automation workflows, modern digital productivity, and
            project delivery skills through an intensive hybrid training programme designed
            for students, professionals, entrepreneurs, and organizations.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {badges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="glass flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink"
              >
                <Icon className="h-3.5 w-3.5 text-accent" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/training/register" size="lg">
              Register Now
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#overview" variant="outline" size="lg">
              <BookOpen className="h-4 w-4" />
              View Curriculum
            </Button>
            <Button href={getWhatsAppLink(BOOTCAMP_WHATSAPP_MESSAGE)} variant="secondary" size="lg">
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
