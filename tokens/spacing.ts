/** Section 5.2 / 5.3 — 8pt spacing scale and the responsive grid system. Never use arbitrary spacing values outside this scale. */
export const spacingScale = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  30: "120px",
  40: "160px",
} as const;

export const grid = {
  maxWidth: "1600px",
  contentWidth: "1320px",
  sectionPaddingY: "120px",
  horizontalPadding: "96px",
  desktopColumns: 12,
  tabletColumns: 8,
  mobileColumns: 4,
} as const;

/** Kept for components that reference the old shorthand names. */
export const spacing = {
  sectionY: { mobile: "5rem", desktop: "7.5rem" }, // 80px / 120px — matches grid.sectionPaddingY on desktop
  cardPadding: { mobile: "1.75rem", desktop: "2.5rem" },
  containerMaxWidth: grid.contentWidth,
  gutter: { mobile: "1.5rem", desktop: "3rem" },
} as const;
