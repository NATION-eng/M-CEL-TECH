/** Section 5.5 — five-level elevation system. Each level has its own shadow/blur/lighting character, not just a bigger blur radius. */
export const elevation = {
  0: "none", // flat
  1: "0 1px 2px rgba(0,0,0,0.4), 0 4px 12px -4px rgba(0,0,0,0.4)", // subtle shadow
  2: "0 2px 8px rgba(0,0,0,0.35), 0 0 32px -8px rgba(37,99,235,0.25)", // soft glow
  3: "0 8px 24px -8px rgba(0,0,0,0.5), 0 0 48px -12px rgba(255,255,255,0.06)", // glass depth
  4: "0 16px 40px -12px rgba(0,0,0,0.55), 0 0 60px -14px rgba(34,211,238,0.2)", // floating layer
  5: "0 24px 64px -16px rgba(0,0,0,0.6), 0 0 90px -16px rgba(139,92,246,0.3)", // hero floating objects
} as const;

export const shadows = {
  depth: elevation[1],
  ambient: "0 0 60px -12px rgba(255,255,255,0.06)",
  glowBlue: "0 0 40px -8px rgba(37,99,235,0.45)",
  glowCyan: "0 0 40px -8px rgba(34,211,238,0.4)",
  glowViolet: "0 0 40px -8px rgba(139,92,246,0.4)",
  card: elevation[3],
} as const;
