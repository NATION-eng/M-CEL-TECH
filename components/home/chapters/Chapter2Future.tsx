"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Code2,
  Cloud,
  Shield,
  Server,
  Terminal,
  Database,
  Sparkles,
  Zap,
  CheckCircle2,
  Layers,
  Radio,
  Lock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { WordReveal } from "@/components/home/WordReveal";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

const TECH_CATEGORIES = [
  {
    id: "ai-data",
    category: "AI & Data Intelligence",
    icon: Cpu,
    color: "from-cyan-500 to-blue-600",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-400/30",
    headline: "Machine Learning & LLM Automation",
    description:
      "We build intelligent agentic workflows, custom RAG systems, and automated data processing tools powered by leading AI models.",
    tools: [
      { name: "Python", role: "AI & Backend Logic" },
      { name: "OpenAI / LLMs", role: "Generative AI Integration" },
      { name: "LangChain", role: "Agentic Automation" },
      { name: "PyTorch", role: "Machine Learning" },
      { name: "Pandas / NumPy", role: "Data Processing" },
    ],
    highlights: ["Custom AI Agent Workflows", "Automated Document Extraction", "Predictive Analytics Models"],
  },
  {
    id: "software-dev",
    category: "Software & Web Development",
    icon: Code2,
    color: "from-blue-600 to-indigo-600",
    badgeColor: "bg-blue-500/10 text-blue-300 border-blue-400/30",
    headline: "Modern Full-Stack Engineering",
    description:
      "We craft fast, accessible, and high-performance software using production-tested web, mobile, and API technologies.",
    tools: [
      { name: "Next.js 15 / React", role: "Web Application Framework" },
      { name: "TypeScript", role: "Type-Safe Enterprise Code" },
      { name: "Node.js", role: "High-Concurrence APIs" },
      { name: "PostgreSQL / Supabase", role: "Relational Database" },
      { name: "TailwindCSS", role: "Responsive Styling" },
    ],
    highlights: ["Sub-second Page Loads & SEO", "Clean Microservice APIs", "Cross-Platform Compatibility"],
  },
  {
    id: "cloud-devops",
    category: "Cloud & DevOps Infrastructure",
    icon: Cloud,
    color: "from-sky-500 to-blue-700",
    badgeColor: "bg-sky-500/10 text-sky-300 border-sky-400/30",
    headline: "Scalable Cloud Architectures",
    description:
      "We design zero-downtime deployment pipelines, containerized microservices, and resilient cloud environments.",
    tools: [
      { name: "Amazon Web Services (AWS)", role: "Cloud Hosting & Services" },
      { name: "Microsoft Azure", role: "Enterprise Cloud" },
      { name: "Docker & Containers", role: "Isolated Environment Packaging" },
      { name: "Linux Systems", role: "Server Operating System" },
      { name: "CI/CD Pipelines", role: "Automated Deployments" },
    ],
    highlights: ["99.9% Server Uptime", "Automated Nightly Backups", "Elastic Auto-Scaling"],
  },
  {
    id: "network-security",
    category: "Networks, Cyber & Hardware",
    icon: Shield,
    color: "from-indigo-500 to-purple-600",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-400/30",
    headline: "Enterprise Connectivity & Defense",
    description:
      "We deploy physical network infrastructure, hardware firewalls, and IoT telemetry systems for industrial reliability.",
    tools: [
      { name: "Cisco & Mikrotik", role: "Enterprise Routing & Switching" },
      { name: "Ubiquiti UniFi", role: "High-Density Wireless Systems" },
      { name: "Fiber Optic Cabling", role: "High-Speed Backbone Connections" },
      { name: "Enterprise Firewalls", role: "Perimeter Threat Defense" },
      { name: "IoT Sensors & Telemetry", role: "Real-Time Telemetry Hardware" },
    ],
    highlights: ["Multi-Site Mesh Interconnects", "Proactive Endpoint Shielding", "Industrial IoT Telemetry"],
  },
];

export function Chapter2Future() {
  const [selectedId, setSelectedId] = useState<string>(TECH_CATEGORIES[0]!.id);
  const activeCategory = TECH_CATEGORIES.find((c) => c.id === selectedId) || TECH_CATEGORIES[0]!;
  const ActiveIcon = activeCategory.icon;

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-20 md:py-32">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-aurora opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <Container className="relative z-10">
        <Reveal className="text-center">
          <span className="section-eyebrow mx-auto flex w-fit">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            Our Engineering Tech Stack
          </span>
        </Reveal>

        <WordReveal
          text="Built With Modern, Enterprise-Grade Technology."
          emphasize="Technology."
          as="h2"
          className="mx-auto mt-4 max-w-4xl text-center text-3xl font-black leading-tight text-ink sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-300 sm:text-base">
            We leverage industry-standard frameworks, AI models, cloud infrastructure, and enterprise hardware to engineer robust, high-availability solutions.
          </p>
        </Reveal>

        {/* Category Navigation Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {TECH_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = cat.id === selectedId;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedId(cat.id)}
                className={cn(
                  "flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer border whitespace-nowrap",
                  isSelected
                    ? "bg-slate-800/90 border-cyan-400/80 shadow-[0_0_25px_rgba(34,211,238,0.3)] text-white scale-[1.02]"
                    : "bg-slate-950/60 border-white/10 text-slate-300 hover:bg-slate-900/60 hover:border-cyan-400/40 hover:text-white"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg transition-colors border",
                    isSelected
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-white/5 border-white/10 text-slate-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Stack Details Display */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-900/95 p-6 sm:p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            >
              {/* Top Category Badge */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] border border-white/20">
                    <ActiveIcon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                      {activeCategory.category}
                    </h3>
                    <p className="text-xs font-bold text-cyan-300 mt-0.5">
                      {activeCategory.headline}
                    </p>
                  </div>
                </div>

                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wide",
                    activeCategory.badgeColor
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  Verified Stack
                </span>
              </div>

              {/* Category Overview */}
              <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-200 font-medium">
                {activeCategory.description}
              </p>

              {/* Tools & Frameworks Grid */}
              <div className="mt-7 pt-6 border-t border-white/10">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">
                  Technologies & Frameworks We Use:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeCategory.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="group flex flex-col justify-between rounded-xl border border-white/10 bg-slate-950/70 p-4 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/90"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {tool.name}
                        </span>
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 mt-2">
                        {tool.role}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Deliverables Highlights */}
              <div className="mt-7 pt-6 border-t border-white/10">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-3">
                  Engineering Benefits:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeCategory.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 text-xs font-bold text-slate-200"
                    >
                      <span className="flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}


