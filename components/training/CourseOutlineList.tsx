"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TRAINING_MODULES } from "@/constants/training";
import { cn } from "@/lib/utils";

/** Compact, clickable course outline — tap a module to reveal what students actually learn, without leaving the registration page. */
export function CourseOutlineList() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="mt-8 space-y-2.5">
      {TRAINING_MODULES.map(({ id, icon: Icon, title, description }, i) => {
        const isOpen = openId === id;
        return (
          <li key={id} className="glass overflow-hidden rounded-md">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : id)}
              aria-expanded={isOpen}
              aria-controls={`course-outline-${id}`}
              className="flex w-full items-center gap-3 p-3 text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent-cyan">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm font-medium text-ink/90">
                Module {String(i + 1).padStart(2, "0")}: {title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-ink-muted/60 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`course-outline-${id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="px-3 pb-4 pl-14 text-xs leading-relaxed text-ink-muted">
                    {description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
