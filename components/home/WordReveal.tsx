"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Section 3.14 — word-by-word heading reveal. `emphasize` gets a stronger, glowing treatment. */
export function WordReveal({
  text,
  emphasize,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  emphasize?: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2";
}) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        const isEmphasis = Boolean(emphasize && word.replace(/[.,]/g, "") === emphasize.replace(/[.,]/g, ""));
        return (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-2 align-bottom">
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={cn("inline-block", isEmphasis && "text-gradient-electric font-black")}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
