/** Section 2.9 / 2.10 — Font System & Typography Scale */
export const fontFamily = {
  heading: "var(--font-sora)",
  body: "var(--font-inter)",
  mono: "var(--font-jetbrains-mono)",
} as const;

/** Values are the top of each documented range for desktop; components clamp() down for mobile. */
export const typeScale = {
  hero: { min: "3.5rem", max: "7.5rem" }, // 56px – 120px, clamped per-component
  sectionTitle: { min: "2.5rem", max: "4.5rem" }, // 40px – 72px
  cardTitle: { min: "1.5rem", max: "2rem" }, // 24px – 32px
  paragraph: { min: "1.125rem", max: "1.25rem" }, // 18px – 20px
  label: { min: "0.875rem", max: "1rem" }, // 14px – 16px
  button: { min: "1rem", max: "1.125rem" }, // 16px – 18px
} as const;
