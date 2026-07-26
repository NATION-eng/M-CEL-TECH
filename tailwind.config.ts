import type { Config } from "tailwindcss";

// M-CEL TECH design tokens (Section 2). Mirrors tokens/*.ts so Tailwind
// utilities and JS-side values (Three.js, GSAP) never drift apart.
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#050816",
          secondary: "#0B1120",
        },
        surface: "rgba(255,255,255,0.06)",
        accent: {
          DEFAULT: "#2563EB",
          cyan: "#22D3EE",
          violet: "#8B5CF6",
        },
        ink: {
          DEFAULT: "#F8FAFC",
          muted: "#CBD5E1",
        },
        state: {
          success: "#22C55E",
          warning: "#FACC15",
          error: "#EF4444",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        container: "1320px",
        site: "1600px",
      },
      borderRadius: {
        sm: "16px", // small cards / inputs
        md: "24px", // large cards / images
        lg: "28px", // dialogs
        xl: "32px", // feature panels
        "2xl": "40px", // hero glass panels
      },
      boxShadow: {
        depth: "0 1px 2px rgba(0,0,0,0.4), 0 4px 12px -4px rgba(0,0,0,0.4)",
        ambient: "0 0 60px -12px rgba(255,255,255,0.06)",
        "glow-blue": "0 0 40px -8px rgba(37,99,235,0.45)",
        "glow-cyan": "0 0 40px -8px rgba(34,211,238,0.4)",
        "glow-violet": "0 0 40px -8px rgba(139,92,246,0.4)",
        card: "0 8px 24px -8px rgba(0,0,0,0.5), 0 0 48px -12px rgba(255,255,255,0.06)",
        float: "0 16px 40px -12px rgba(0,0,0,0.55), 0 0 60px -14px rgba(34,211,238,0.2)",
        hero: "0 24px 64px -16px rgba(0,0,0,0.6), 0 0 90px -16px rgba(139,92,246,0.3)",
      },
      backgroundImage: {
        "gradient-electric": "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
        "gradient-spectrum": "linear-gradient(135deg, #2563EB 0%, #8B5CF6 50%, #22D3EE 100%)",
        "gradient-depth": "linear-gradient(180deg, #0B1120 0%, #050816 100%)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" },
        },
        breathe: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        breathe: "breathe 6s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
