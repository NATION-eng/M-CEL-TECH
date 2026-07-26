"use client";

import { motion } from "framer-motion";
import { roundForSSR } from "@/lib/utils";

/** Enterprise IT — a server rack with blinking status lights. */
export function ServerRackMotif() {
  return (
    <div className="flex flex-col gap-2">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5">
          <div className="h-1.5 flex-1 rounded-full bg-white/10" />
          <motion.span
            className="h-2 w-2 rounded-full bg-state-success"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: row * 0.25 }}
          />
        </div>
      ))}
    </div>
  );
}

/** Software Development — a terminal that types itself out. */
export function TerminalMotif() {
  const line = "$ deploy --env production \u2713";
  return (
    <div className="w-full max-w-xs rounded-md border border-white/10 bg-black/40 p-4 font-mono text-xs text-accent-cyan">
      <motion.span
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "linear" }}
        className="inline-block overflow-hidden whitespace-nowrap align-bottom"
      >
        {line}
      </motion.span>
      <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.7, repeat: Infinity }} className="ml-0.5">
        {"\u258d"}
      </motion.span>
    </div>
  );
}

/** Networking — a packet travelling along a fiber line between two nodes. */
export function NetworkMotif() {
  return (
    <svg viewBox="0 0 200 60" className="w-full max-w-xs">
      <line x1="10" y1="30" x2="190" y2="30" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <circle cx="10" cy="30" r="5" fill="#2563EB" />
      <circle cx="190" cy="30" r="5" fill="#22D3EE" />
      <motion.circle
        r="3.5"
        fill="#22D3EE"
        animate={{ cx: [10, 190, 10], cy: 30 }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

/** Cybersecurity — a shield that forms and pulses with a protective ring. */
export function ShieldMotif() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <motion.div
        className="absolute inset-0 rounded-full border border-state-success/40"
        animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.svg
        viewBox="0 0 24 24"
        className="h-12 w-12 text-state-success"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <motion.path
          d="M12 2 L21 6 V12 C21 17 17 21 12 22 C7 21 3 17 3 12 V6 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </motion.svg>
    </div>
  );
}

/** IoT — small sensor nodes pinging outward, signalling communication. */
export function IoTMotif() {
  const nodes = [
    { top: "20%", left: "20%" },
    { top: "30%", left: "75%" },
    { top: "75%", left: "30%" },
    { top: "70%", left: "80%" },
  ];
  return (
    <div className="relative h-full w-full">
      {nodes.map((n, i) => (
        <motion.span
          key={i}
          style={{ top: n.top, left: n.left }}
          className="absolute h-2.5 w-2.5 rounded-full bg-accent-violet"
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}

/** Engineering Technology — a blueprint grid that draws itself in. */
export function BlueprintMotif() {
  return (
    <svg viewBox="0 0 160 100" className="w-full max-w-xs text-accent">
      <motion.rect
        x="20" y="15" width="120" height="70" fill="none" stroke="currentColor" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}
      />
      <motion.line x1="20" y1="50" x2="140" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.6 }} />
      <motion.line x1="80" y1="15" x2="80" y2="85" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 3"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} />
    </svg>
  );
}

/** Technology Training — a light node cluster standing in for the full AI-brain scene reserved for Chapter 7. */
export function TrainingMotif() {
  const nodes = Array.from({ length: 10 });
  return (
    <div className="relative h-32 w-32">
      <motion.div
        className="absolute inset-0 rounded-full border border-accent-violet/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((_, i) => {
          const angle = (i / nodes.length) * Math.PI * 2;
          return (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent-cyan"
              style={{
                top: `${roundForSSR(50 + 48 * Math.sin(angle))}%`,
                left: `${roundForSSR(50 + 48 * Math.cos(angle))}%`,
              }}
            />
          );
        })}
      </motion.div>
      <div className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-accent-violet/40 blur-md" />
    </div>
  );
}
