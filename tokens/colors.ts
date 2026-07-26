/** Section 2.5 — Primary Color Palette */
export const colors = {
  background: {
    primary: "#050816", // Midnight Black — hero, 3D, nav, footer, dark storytelling
    secondary: "#0B1120", // Deep Navy — content sections, cards, glass backgrounds
  },
  surface: "rgba(255,255,255,0.06)", // glass panels, floating nav, cards, overlays
  accent: {
    primary: "#2563EB", // Electric Blue — buttons, links, highlights
    secondary: "#22D3EE", // Neon Cyan — gradients, hover glow, particles
    highlight: "#8B5CF6", // Aurora Violet — used sparingly, premium gradients, AI visuals
  },
  text: {
    primary: "#F8FAFC", // Soft White — never pure white
    secondary: "#CBD5E1", // Muted Gray — supporting content
  },
  state: {
    success: "#22C55E",
    warning: "#FACC15",
    error: "#EF4444",
  },
} as const;
