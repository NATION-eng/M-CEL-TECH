import type { LucideIcon } from "lucide-react";
import {
  HardHat,
  Building,
  Fuel,
  Landmark,
  GraduationCap,
  HeartPulse,
  Factory,
  Radio,
  Zap,
  Banknote,
  Truck,
  Briefcase,
  Store,
} from "lucide-react";

export type Industry = {
  name: string;
  icon: LucideIcon;
  /** One-line summary of what M-CEL TECH builds for this sector, shown in the Industries "solution spotlight" panel. */
  summary: string;
  /** 2-3 short deliverable labels shown as chips alongside the summary. */
  deliverables: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    name: "Engineering",
    icon: HardHat,
    summary: "Digital tools that connect design, documentation, and field execution.",
    deliverables: ["CAD Integration", "Digital Twin Modeling", "Technical Documentation Systems"],
  },
  {
    name: "Construction",
    icon: Building,
    summary: "Site visibility and project tracking from groundbreaking to handover.",
    deliverables: ["Site Monitoring Systems", "BIM Integration", "Progress Tracking Dashboards"],
  },
  {
    name: "Oil & Gas",
    icon: Fuel,
    summary: "Monitoring and safety systems for remote, high-stakes operations.",
    deliverables: ["SCADA Pipeline Monitoring", "Remote Asset Tracking", "Safety Compliance Systems"],
  },
  {
    name: "Government",
    icon: Landmark,
    summary: "Secure digital transformation for public service delivery.",
    deliverables: ["Secure Citizen Portals", "Digital Records Management", "Interagency Data Systems"],
  },
  {
    name: "Education",
    icon: GraduationCap,
    summary: "Learning infrastructure built for institutions, not just classrooms.",
    deliverables: ["Learning Management Systems", "Student Information Systems", "Virtual Classroom Infrastructure"],
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    summary: "Patient data and care coordination systems built to stay compliant.",
    deliverables: ["Electronic Health Records", "Telemedicine Portals", "Medical Data Security"],
  },
  {
    name: "Manufacturing",
    icon: Factory,
    summary: "Connected production floors with real-time visibility into output.",
    deliverables: ["Production Line IoT", "Predictive Maintenance", "Inventory Automation"],
  },
  {
    name: "Telecommunications",
    icon: Radio,
    summary: "Infrastructure and monitoring for networks that can't go down.",
    deliverables: ["Network Infrastructure Design", "Signal Monitoring Systems", "Customer Billing Platforms"],
  },
  {
    name: "Energy",
    icon: Zap,
    summary: "Grid visibility and consumption analytics for modern utilities.",
    deliverables: ["Smart Grid Monitoring", "Energy Consumption Analytics", "Remote Metering Systems"],
  },
  {
    name: "Financial Services",
    icon: Banknote,
    summary: "Secure, resilient systems built for regulated financial operations.",
    deliverables: ["FinTech Microservices", "Fraud Detection Systems", "Secure Payment Infrastructure"],
  },
  {
    name: "Logistics",
    icon: Truck,
    summary: "End-to-end visibility from warehouse to last-mile delivery.",
    deliverables: ["Fleet Tracking Systems", "Supply Chain Visibility", "Route Optimization Software"],
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    summary: "Workflow and client systems that scale with a growing practice.",
    deliverables: ["Workflow Automation", "Client Management Systems", "Document Collaboration Tools"],
  },
  {
    name: "SMEs",
    icon: Store,
    summary: "Enterprise-grade technology, sized and priced for growing businesses.",
    deliverables: ["Affordable Cloud Infrastructure", "Point-of-Sale Systems", "Digital Marketing Tools"],
  },
];
