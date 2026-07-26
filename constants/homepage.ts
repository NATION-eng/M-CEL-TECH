import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Layers,
  Code2,
  Cpu,
  GraduationCap,
  LifeBuoy,
  Target,
  Puzzle,
  Workflow,
  Lightbulb,
  BadgeCheck,
  Handshake,
  Sparkles,
  Video,
  Bot,
  Users2,
  ClipboardList,
} from "lucide-react";

export const TRUST_HIGHLIGHTS: { icon: LucideIcon; title: string }[] = [
  { icon: Layers, title: "Enterprise Technology Solutions" },
  { icon: ShieldCheck, title: "End-to-End IT Services" },
  { icon: Code2, title: "Custom Software Development" },
  { icon: Cpu, title: "Smart IoT Integration" },
  { icon: GraduationCap, title: "Professional Technology Training" },
  { icon: LifeBuoy, title: "Nationwide Technical Support" },
];

export const WHY_CHOOSE_US: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Target,
    title: "Technical Expertise",
    description:
      "A multidisciplinary team with deep, hands-on experience across software, infrastructure, and engineering technology.",
  },
  {
    icon: Puzzle,
    title: "Tailored Solutions",
    description:
      "Every engagement is scoped around your organization's real operational challenges, not a one-size-fits-all package.",
  },
  {
    icon: Workflow,
    title: "End-to-End Service",
    description:
      "From strategy and design through deployment and support, we stay accountable for the full lifecycle of your project.",
  },
  {
    icon: Lightbulb,
    title: "Innovation Driven",
    description:
      "We continuously evaluate emerging technology to keep your organization ahead of the curve, not chasing it.",
  },
  {
    icon: BadgeCheck,
    title: "Quality Delivery",
    description:
      "Rigorous engineering standards and structured project management ensure dependable, on-time delivery.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "We build relationships designed to grow with your organization, well beyond the initial project handover.",
  },
];

export const TRAINING_HIGHLIGHTS: { icon: LucideIcon; title: string }[] = [
  { icon: Sparkles, title: "Prompt Engineering" },
  { icon: Video, title: "Cinematic AI Video Generation" },
  { icon: Bot, title: "Vibe Coding" },
  { icon: Workflow, title: "AI Automation" },
  { icon: ClipboardList, title: "Project Management" },
];

export const TRAINING_DETAILS = {
  title: "AI Productivity & Digital Innovation Bootcamp",
  format: "Evening Hybrid Class",
  duration: "2 Weeks",
  schedule: "7:00 PM – 9:00 PM",
  price: 15000,
  priceLabel: "\u20a615,000",
  cohortNote: "Single Cohort",
  perks: ["Certificate", "Practical Projects"],
};
