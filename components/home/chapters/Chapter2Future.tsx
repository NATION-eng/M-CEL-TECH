"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Code2,
  Network,
  Cloud,
  Shield,
  Radio,
  Sparkles,
  Zap,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WordReveal } from "@/components/home/WordReveal";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const TECH_ECOSYSTEM = [
  {
    id: "ai-ml",
    label: "AI & Automation",
    shortLabel: "AI & ML",
    icon: Bot,
    color: "from-cyan-500 to-blue-600",
    tag: "Next-Gen Intelligence",
    description: "Custom AI integrations, LLM workflows, and intelligent business automation to eliminate manual work.",
    capabilities: ["LLM & Agent Workflows", "Predictive Analytics", "Document Automation"],
  },
  {
    id: "software",
    label: "Custom Software",
    shortLabel: "Software",
    icon: Code2,
    color: "from-blue-600 to-indigo-600",
    tag: "High-Performance Systems",
    description: "Scalable web apps, enterprise software, and mobile platforms engineered for speed and longevity.",
    capabilities: ["Web & Mobile Apps", "Enterprise API Portals", "Legacy System Refactoring"],
  },
  {
    id: "networks",
    label: "Network Infrastructure",
    shortLabel: "Networks",
    icon: Network,
    color: "from-cyan-400 to-emerald-500",
    tag: "Zero-Downtime Connectivity",
    description: "Enterprise networking, structured cabling, routing, and high-speed multi-site interconnectivity.",
    capabilities: ["Enterprise Fiber & Wireless", "SD-WAN Optimization", "VLAN & Network Segmentation"],
  },
  {
    id: "cloud",
    label: "Cloud Architecture",
    shortLabel: "Cloud",
    icon: Cloud,
    color: "from-sky-500 to-blue-700",
    tag: "Resilient & Elastic",
    description: "Cloud migration, hybrid cloud management, containerization, and cost-optimized server infrastructure.",
    capabilities: ["AWS & Azure Setup", "DevOps & CI/CD", "Automated Backup & DR"],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity & Risk",
    shortLabel: "Cybersecurity",
    icon: Shield,
    color: "from-indigo-500 to-purple-600",
    tag: "Enterprise Protection",
    description: "Proactive threat management, vulnerability audits, firewall policy design, and security compliance.",
    capabilities: ["Vulnerability Audits", "Firewall & Endpoint Shield", "Access Controls & SSO"],
  },
  {
    id: "iot",
    label: "IoT & Smart Systems",
    shortLabel: "IoT",
    icon: Radio,
    color: "from-emerald-400 to-teal-600",
    tag: "Real-Time Telemetry",
    description: "Connected sensors, hardware integration, and telemetry monitoring for industrial and commercial environments.",
    capabilities: ["Sensor Telemetry", "Industrial Hardware Integration", "Real-Time Alerts"],
  },
];

export function Chapter2Future() {
  const [selectedId, setSelectedId] = useState<string>(TECH_ECOSYSTEM[0]!.id);
  const activeTech = TECH_ECOSYSTEM.find((t) => t.id === selectedId) || TECH_ECOSYSTEM[0]!;
  const ActiveIcon = activeTech.icon;

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-20 md:py-32">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <Reveal className="text-center">
          <span className="section-eyebrow mx-auto flex w-fit">
            <Activity className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            Our Connected Technology Stack
          </span>
        </Reveal>

        <WordReveal
          text="Engineering the Digital Future."
          emphasize="Future."
          as="h2"
          className="mx-auto mt-4 max-w-3xl text-center text-3xl font-black leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-slate-300 sm:text-base">
            One engineering team bridging every layer of modern technology — connected disciplines operating as a unified ecosystem.
          </p>
        </Reveal>

        {/* Central Core & Matrix Explorer Layout */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Tech Domain Navigation Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            {TECH_ECOSYSTEM.map((tech) => {
              const Icon = tech.icon;
              const isSelected = tech.id === selectedId;

              return (
                <button
                  key={tech.id}
                  type="button"
                  onClick={() => setSelectedId(tech.id)}
                  onMouseEnter={() => setSelectedId(tech.id)}
                  className={cn(
                    "group relative flex flex-col items-start justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer border text-left overflow-hidden min-h-[110px] sm:min-h-[125px]",
                    isSelected
                      ? "bg-slate-900/90 border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.25)] scale-[1.02]"
                      : "bg-slate-950/60 border-white/10 hover:bg-slate-900/60 hover:border-cyan-400/40"
                  )}
                >
                  {/* Subtle hover gradient behind card */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 pointer-events-none",
                      tech.color,
                      isSelected ? "opacity-15" : "group-hover:opacity-10"
                    )}
                  />

                  <div className="flex w-full items-center justify-between z-10">
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 border",
                        isSelected
                          ? "bg-gradient-to-br from-blue-600 to-cyan-400 border-cyan-300 text-white shadow-lg shadow-cyan-500/30"
                          : "bg-white/5 border-white/10 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    {isSelected && (
                      <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-ping" />
                    )}
                  </div>

                  <div className="mt-3 z-10">
                    <span
                      className={cn(
                        "block text-xs sm:text-sm font-extrabold tracking-wide transition-colors",
                        isSelected ? "text-white" : "text-slate-300 group-hover:text-white"
                      )}
                    >
                      {tech.label}
                    </span>
                    <span className="block text-[10px] font-semibold text-slate-400 mt-0.5">
                      {tech.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Core Inspector Panel */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-3xl border border-cyan-500/40 bg-slate-900/95 p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              >
                {/* Glowing status indicator ribbon */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      M-CEL TECH CORE // {activeTech.shortLabel.toUpperCase()}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-cyan-300">
                    <Zap className="h-3 w-3 text-cyan-400" />
                    Active Node
                  </span>
                </div>

                {/* Domain Header */}
                <div className="mt-6 flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] border border-white/20">
                    <ActiveIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      {activeTech.label}
                    </h3>
                    <p className="text-xs font-bold text-cyan-300 mt-1 uppercase tracking-wider">
                      {activeTech.tag}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
                  {activeTech.description}
                </p>

                {/* Key Capability Badges */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                    Core Engineering Focus:
                  </span>
                  <div className="space-y-2.5">
                    {activeTech.capabilities.map((cap) => (
                      <div
                        key={cap}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-100"
                      >
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar Indicator */}
                <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    Integrated into all M-CEL solutions
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">SYS_VER // 2026.4</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}

