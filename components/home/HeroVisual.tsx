"use client";

import { motion } from "framer-motion";
import { Server, Cloud, Cpu, Network, ShieldCheck, Activity } from "lucide-react";

const cards = [
  { icon: Cloud, label: "Cloud Infrastructure", top: "6%", left: "4%", delay: 0 },
  { icon: Cpu, label: "AI & Automation", top: "14%", left: "58%", delay: 0.4 },
  { icon: Network, label: "Enterprise Networking", top: "56%", left: "0%", delay: 0.8 },
  { icon: ShieldCheck, label: "Cybersecurity", top: "68%", left: "56%", delay: 1.2 },
];

/**
 * Signature hero visual: a Midnight Navy panel carrying a soft Royal
 * Blue → Electric Cyan gradient mesh with floating capability cards and
 * a central server/data-flow glyph. Replaces a generic stock photo.
 */
export function HeroVisual() {
  return (
    <div
      className="relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl bg-brand-navy shadow-card-hover md:aspect-[4/5]"
      role="img"
      aria-label="Illustration of connected cloud, AI, networking, and security systems representing M-CEL TECH's technology stack"
    >
      {/* gradient mesh */}
      <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-brand-blue-500/40 blur-3xl" />
      <div className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-brand-cyan/25 blur-3xl" />

      {/* grid texture */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" aria-hidden="true">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* data flow lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" aria-hidden="true">
        <motion.path
          d="M60 340 C 140 260, 260 260, 340 120"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3D63F0" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>

      {/* central glyph */}
      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <Server className="h-10 w-10 text-brand-cyan" />
      </div>
      <motion.div
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-brand-cyan/30"
        animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating capability cards */}
      {cards.map(({ icon: Icon, label, top, left, delay }) => (
        <motion.div
          key={label}
          className="absolute flex w-36 items-center gap-2 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-md"
          style={{ top, left }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
          }}
        >
          <Icon className="h-4 w-4 shrink-0 text-brand-cyan" />
          <span className="text-[11px] font-medium leading-tight text-white/90">{label}</span>
        </motion.div>
      ))}

      <motion.div
        className="absolute right-6 top-1/2 flex items-center gap-1.5 rounded-full bg-brand-success/90 px-2.5 py-1 text-[10px] font-semibold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <Activity className="h-3 w-3" />
        99.9% Uptime
      </motion.div>
    </div>
  );
}
