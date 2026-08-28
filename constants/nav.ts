import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Code2,
  Network,
  ShieldCheck,
  Cpu,
  Wrench,
  PackageSearch,
  LayoutGrid,
  BookOpen,
  Users,
  Tag,
  HelpCircle,
  ClipboardCheck,
} from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Training", href: "/training" },
  { label: "Verify Certificate", href: "/verify" },
  { label: "Contact", href: "/contact" },
];

/** Section 6.6 — Services mega menu: icon + short description per item, not a plain dropdown list. */
export type MegaMenuItem = {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
};

export const SERVICES_MEGA_MENU: MegaMenuItem[] = [
  { label: "Enterprise IT", href: "/services#enterprise-it", description: "Strategy, infrastructure, and support at scale.", icon: Building2 },
  { label: "Software Development", href: "/services#software-development", description: "Custom web, mobile, and enterprise applications.", icon: Code2 },
  { label: "Networking", href: "/services#networking", description: "Resilient infrastructure built for uptime.", icon: Network },
  { label: "Cybersecurity", href: "/services#cybersecurity", description: "Proactive protection for critical systems.", icon: ShieldCheck },
  { label: "IoT", href: "/services#iot", description: "Connected devices, real-time operational data.", icon: Cpu },
  { label: "Engineering Technology", href: "/services#engineering-technology", description: "Applied engineering for industrial work.", icon: Wrench },
  { label: "Equipment Supply", href: "/services#equipment-supply", description: "Enterprise-grade hardware sourcing.", icon: PackageSearch },
];

/** Section 6.7 — Training submenu, with Register visually emphasized. */
export type TrainingMenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  emphasize?: boolean;
};

export const TRAINING_MENU: TrainingMenuItem[] = [
  { label: "Overview", href: "/training", icon: LayoutGrid },
  { label: "Curriculum", href: "/training#curriculum", icon: BookOpen },
  { label: "Cohorts", href: "/training#cohorts", icon: Users },
  { label: "Pricing", href: "/training#pricing", icon: Tag },
  { label: "Verify Certificate", href: "/verify", icon: ShieldCheck },
  { label: "FAQ", href: "/training#faq", icon: HelpCircle },
  { label: "Register Now", href: "/training/register", icon: ClipboardCheck, emphasize: true },
];

export const FOOTER_LINKS = {
  company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Training", href: "/training" },
    { label: "Verify Certificate", href: "/verify" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Enterprise IT", href: "/services#enterprise-it" },
    { label: "Software Development", href: "/services#software-development" },
    { label: "Networking & Infrastructure", href: "/services#networking" },
    { label: "Cybersecurity", href: "/services#cybersecurity" },
    { label: "Training", href: "/training" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
} as const;
