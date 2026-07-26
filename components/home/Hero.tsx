"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Server, Code2, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "@/components/home/HeroVisual";
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

const HIGHLIGHTS = [
  { icon: Server, label: "Enterprise IT Solutions" },
  { icon: Code2, label: "Custom Software Development" },
  { icon: GraduationCap, label: "Professional Technology Training" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-14 md:pb-24 md:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-eyebrow">Enterprise Technology Partner</span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] text-brand-navy sm:text-5xl lg:text-[3.25rem]">
            Technology Solutions Built for Modern Organizations
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-slate/70">
            We help organizations leverage technology to solve operational challenges,
            modernize infrastructure, improve efficiency, and stay ahead in an increasingly
            connected world. From enterprise IT solutions and software development to
            intelligent automation and professional technology training, M-CEL TECH delivers
            practical, scalable, and future-ready solutions.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)} size="lg">
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </Button>
            <Button href="#services" variant="outline" size="lg">
              Explore Our Services
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <ul className="mt-10 flex flex-col gap-3 border-t border-brand-slate/10 pt-6 sm:flex-row sm:gap-8">
            {HIGHLIGHTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-blue-50 text-brand-blue-600">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-brand-navy/80">{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}
