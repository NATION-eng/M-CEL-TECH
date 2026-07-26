"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Building2, Code2, Network, ShieldCheck, Cpu, Wrench, GraduationCap, ArrowRight } from "lucide-react";
import { ensureGsap } from "@/lib/motion/gsap";
import { ServicePanel } from "@/components/home/chapters/ServicePanel";
import {
  ServerRackMotif,
  TerminalMotif,
  NetworkMotif,
  ShieldMotif,
  IoTMotif,
  BlueprintMotif,
  TrainingMotif,
} from "@/components/home/chapters/motifs";

const PANELS = [
  { icon: Building2, title: "Enterprise IT", description: "End-to-end IT strategy, infrastructure, and support built for reliability at scale.", motif: <ServerRackMotif /> },
  { icon: Code2, title: "Software Development", description: "Custom web, mobile, and enterprise applications engineered for performance and longevity.", motif: <TerminalMotif /> },
  { icon: Network, title: "Networking", description: "Resilient network infrastructure designed for uptime and future growth.", motif: <NetworkMotif /> },
  { icon: ShieldCheck, title: "Cybersecurity", description: "Proactive threat protection and risk assessment for critical business systems.", motif: <ShieldMotif /> },
  { icon: Cpu, title: "IoT", description: "Connected device ecosystems that turn physical operations into real-time data.", motif: <IoTMotif /> },
  { icon: Wrench, title: "Engineering Technology", description: "Applied engineering and technical solutions for industrial and infrastructure work.", motif: <BlueprintMotif /> },
  { icon: GraduationCap, title: "Technology Training", description: "Structured, practical programmes that build in-demand digital skills.", motif: <TrainingMotif /> },
];

/**
 * Chapter 4 — What We Build. Section 3.22 / Chapter 4: the section pins
 * and content scrolls horizontally on desktop with motion enabled. On
 * mobile, or under prefers-reduced-motion, it's a plain native
 * horizontally-scrollable row instead — no scroll-jacking, no GSAP.
 */
export function Chapter4WhatWeBuild() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const scrollAmount = track.scrollWidth - section.clientWidth;
      const tween = gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="chapter-4" ref={sectionRef} className="relative bg-bg-secondary lg:h-screen lg:overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] hidden h-40 bg-gradient-to-b from-bg-secondary via-bg-secondary/70 to-transparent lg:block" />
      <div className="container-page pt-20 lg:absolute lg:left-0 lg:top-10 lg:z-10 lg:pt-0">
        <span className="section-eyebrow">Core Solutions</span>
        <h2 className="mt-4 max-w-lg text-2xl font-bold text-ink md:text-3xl">
          Seven Capabilities. One Team.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto pb-4 lg:h-full lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {PANELS.map((panel) => (
          <div key={panel.title} className="snap-center lg:snap-align-none">
            <ServicePanel {...panel} />
          </div>
        ))}
      </div>

      <motion.div
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="container-page flex items-center justify-center gap-1.5 pb-6 text-xs font-medium text-ink-muted/60 lg:hidden"
      >
        Swipe horizontally
        <ArrowRight className="h-3.5 w-3.5" />
      </motion.div>
    </section>
  );
}
