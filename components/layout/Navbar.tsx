"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle, ArrowRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/constants/nav";
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

/** Section 3.12 — floating glass nav: transparent at top, becomes glass + shrinks + logo scales down on scroll. */
export function Navbar() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const whatsappLink = getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className={cn("transition-all duration-500", scrolled ? "px-4 pt-3 md:px-6" : "px-0 pt-0")}>
        <div
          className={cn(
            "container-page flex items-center justify-between rounded-lg transition-all duration-500",
            scrolled ? "glass h-16 max-w-container shadow-ambient" : "h-24 bg-transparent"
          )}
        >
          <motion.div animate={{ scale: scrolled ? 0.85 : 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <Logo size={scrolled ? "sm" : "md"} />
          </motion.div>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-text="View"
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href={whatsappLink} variant="primary" size="sm">
              <MessageCircle className="h-4 w-4" />
              Talk to an Expert
            </Button>
          </div>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-slate-800/80 text-ink shadow-lg active:scale-95 transition-all lg:hidden cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-7 w-7 text-cyan-400" /> : <Menu className="h-7 w-7 text-cyan-400" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass mx-4 mt-3 overflow-hidden rounded-3xl border border-white/15 p-2 lg:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-1.5 p-5" aria-label="Mobile">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-lg font-bold text-ink transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex flex-col gap-3 border-t border-white/15 pt-5">
                <Button
                  href="/training/register"
                  variant="primary"
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-base font-black uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Register Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  href={whatsappLink}
                  variant="secondary"
                  size="lg"
                  className="w-full h-14 border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-base font-bold rounded-full flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  Talk to an Expert
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
