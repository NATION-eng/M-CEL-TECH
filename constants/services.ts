import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Code2,
  Network,
  Cpu,
  ShieldCheck,
  PackageSearch,
  Wrench,
  GraduationCap,
  Users,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    slug: "enterprise-it",
    icon: Building2,
    title: "Enterprise IT Solutions",
    description:
      "End-to-end IT strategy, infrastructure, and support designed to keep enterprise operations reliable, secure, and scalable.",
  },
  {
    slug: "software-development",
    icon: Code2,
    title: "Software Development",
    description:
      "Custom web, mobile, and enterprise applications engineered for performance, security, and long-term maintainability.",
  },
  {
    slug: "networking",
    icon: Network,
    title: "Networking & Infrastructure",
    description:
      "Design, deployment, and management of resilient network infrastructure built for uptime and future growth.",
  },
  {
    slug: "iot",
    icon: Cpu,
    title: "IoT & Smart Technology",
    description:
      "Connected device ecosystems and smart automation that turn physical operations into real-time, actionable data.",
  },
  {
    slug: "cybersecurity",
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Proactive threat protection, risk assessment, and compliance support to safeguard critical business systems.",
  },
  {
    slug: "equipment-supply",
    icon: PackageSearch,
    title: "Technology Equipment Supply",
    description:
      "Sourcing and supply of enterprise-grade hardware and technology equipment backed by expert consultation.",
  },
  {
    slug: "engineering-technology",
    icon: Wrench,
    title: "Engineering Technology Solutions",
    description:
      "Applied engineering and technical solutions for industrial, construction, and infrastructure-driven organizations.",
  },
  {
    slug: "professional-training",
    icon: GraduationCap,
    title: "Professional Technology Training",
    description:
      "Structured, practical training programs that build in-demand digital and technical skills for individuals.",
  },
  {
    slug: "corporate-training",
    icon: Users,
    title: "Corporate Technology Training",
    description:
      "Tailored upskilling programs that strengthen your team's technical capacity and drive organization-wide innovation.",
  },
];
