/** Shared easing/duration vocabulary so motion feels consistent across every component. */
export const easing = {
  premium: [0.16, 1, 0.3, 1] as const, // signature "effortless" ease-out
  inOut: [0.65, 0, 0.35, 1] as const,
  magnetic: [0.2, 0.9, 0.3, 1] as const,
};

export const duration = {
  fast: 0.25,
  base: 0.5,
  slow: 0.9,
  cinematic: 1.6,
};

export const lenisConfig = {
  duration: 1.2,
  smoothWheel: true,
  touchMultiplier: 1.5,
};
