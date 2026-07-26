"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Sparkles, Video, Bot, Workflow, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

const MODULES = [
  {
    id: "prompt-engineering",
    number: "01",
    title: "Prompt Engineering",
    icon: Sparkles,
    shortDescription:
      "Learn to craft precise AI prompts to generate high-quality content, analyze business data, solve complex problems, and automate everyday tasks.",
    keyOutcome: "Confidently command AI models (ChatGPT, Claude, Gemini) for professional work.",
  },
  {
    id: "cinematic-ai-video",
    number: "02",
    title: "Cinematic AI Video Generation",
    icon: Video,
    shortDescription:
      "Master modern AI tools to transform text and images into professional marketing videos, product demos, and engaging social content.",
    keyOutcome: "Produce high-impact promotional and educational videos without traditional filming equipment.",
  },
  {
    id: "vibe-coding",
    number: "03",
    title: "Vibe Coding",
    icon: Bot,
    shortDescription:
      "Build functional web applications and digital tools rapidly using AI coding assistants without needing deep traditional coding experience.",
    keyOutcome: "Turn business ideas into working web software applications in hours.",
  },
  {
    id: "ai-automation",
    number: "04",
    title: "AI Automation",
    icon: Workflow,
    shortDescription:
      "Connect business applications to automatically process documents, send instant notifications, and run repetitive tasks on autopilot.",
    keyOutcome: "Eliminate repetitive administrative tasks and save hours of manual labor every week.",
  },
  {
    id: "project-management",
    number: "05",
    title: "Project Management",
    icon: ClipboardList,
    shortDescription:
      "Learn modern Agile and Scrum methodologies to plan project milestones, manage team workflows, and ensure on-time delivery.",
    keyOutcome: "Lead digital projects smoothly from initial scope through final launch.",
  },
];

export function CourseOutline() {
  const [openId, setOpenId] = useState<string | null>(MODULES[0]?.id ?? null);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-ink">Course Outline</h3>
        <span className="text-xs text-accent-cyan font-medium">Click any module to view details</span>
      </div>

      <div className="space-y-3">
        {MODULES.map((module) => {
          const isOpen = openId === module.id;
          const Icon = module.icon;

          return (
            <div
              key={module.id}
              className={cn(
                "overflow-hidden rounded-xl border transition-all duration-300",
                isOpen
                  ? "border-accent-cyan/40 bg-accent-cyan/5 shadow-glow-cyan"
                  : "border-white/10 bg-white/5 hover:border-white/20"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : module.id)}
                className="flex w-full items-center justify-between p-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-bold transition-colors",
                      isOpen
                        ? "bg-accent-cyan/20 border-accent-cyan/40 text-accent-cyan"
                        : "bg-white/5 border-white/10 text-ink-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent-cyan">
                      Module {module.number}
                    </span>
                    <h4 className="text-sm font-bold text-ink">{module.title}</h4>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-ink-muted transition-transform duration-300",
                    isOpen && "rotate-180 text-accent-cyan"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="border-t border-white/10 px-4 pb-4 pt-3 text-xs leading-relaxed text-ink-muted space-y-2">
                      <p>{module.shortDescription}</p>
                      <div className="flex items-start gap-1.5 pt-1 text-ink font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-state-success shrink-0 mt-0.5" />
                        <span>{module.keyOutcome}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
