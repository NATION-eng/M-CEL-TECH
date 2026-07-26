/** Section 2.6 — Gradient System. Subtle. Never oversaturated. */
export const gradients = {
  electric: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)", // Gradient One
  spectrum: "linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #22D3EE 100%)", // Gradient Two
  depth: "linear-gradient(180deg, #0B1120 0%, #050816 100%)", // Gradient Three
  aurora:
    "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(37,99,235,0.25) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(139,92,246,0.2) 0%, transparent 60%), radial-gradient(ellipse 90% 70% at 50% 90%, rgba(34,211,238,0.15) 0%, transparent 60%)", // Gradient Four — Aurora Mesh
  textGlow: "linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 100%)",
} as const;
