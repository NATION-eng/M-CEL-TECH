import { SITE } from "@/constants/site";

export const EQUIP_2027 = {
  name: "EQUIP 2027 CSR Subsidized Scholarship",
  year: 2027,
  subsidizedFeePerSlot: 10000, // ₦10,000
  standardPrice: 20000,       // ₦20,000 (50% Discount)
  kickoffDate: "January 11, 2027",

  // ── Approved Conferences ───────────────────────────────────────────────
  conferences: [
    "Port Harcourt East",
    "Port Harcourt West",
    "Rivers East",
    "Rivers West-Central",
    "Rivers North",
    "Bayelsa",
    "Cross River",
    "Campus Fellowship / Other",
  ] as const,

  // ── Applicant Categories ───────────────────────────────────────────────
  categories: [
    {
      id: "TEENAGER",
      label: "Teenager (Secondary / High School)",
      description: "Young tech enthusiasts building their first digital skills.",
    },
    {
      id: "UNIVERSITY_STUDENT",
      label: "University / Tertiary Student",
      description: "Undergraduates & graduates accelerating technical readiness.",
    },
    {
      id: "WORKING_ADULT",
      label: "Working Adult / Career Pivot",
      description: "Professionals enhancing digital innovation & AI productivity.",
    },
    {
      id: "SPONSOR",
      label: "Church / Conference Sponsor (Bulk Slots)",
      description: "Pastors, leaders & sponsors empowering 2, 5, 10 or 50 youth.",
    },
  ] as const,

  // ── Learning Tracks ───────────────────────────────────────────────────
  tracks: [
    {
      id: "ONLINE_EVENING",
      shortLabel: "Track 1: Evening Online",
      fullTitle: "Track 1: 3-Week Evening Online Cohort",
      duration: "Jan 11 – Jan 30, 2027",
      mode: "Virtual (Interactive Live Labs + Replays)",
      description: "Flexible evening sessions tailored for students and working participants.",
    },
    {
      id: "PHYSICAL_SPRINT",
      shortLabel: "Track 2: Physical Sprint",
      fullTitle: "Track 2: 1-Week Intensive Physical Sprint",
      duration: "Jan 11 – Jan 16, 2027",
      mode: "In-Person (Port Harcourt Tech Hub)",
      description: "High-immersion daytime sprint with direct hardware and real-time project builds.",
    },
  ] as const,

  // ── Sponsor Slot Tiers ─────────────────────────────────────────────────
  sponsorSlots: [2, 5, 10, 50] as const,

  // ── Corporate Bank Account for Wire/Direct Transfer ───────────────────
  corporateBank: {
    bankName: "Wema Bank",
    accountName: "M-CEL TECH HUB",
    accountNumber: "0128003905",
    narrationPrefix: "EQUIP2027",
  },

  supportPhone: SITE.whatsappDisplayNumber,
  supportEmail: SITE.contactEmail,
} as const;

export type EquipConference = (typeof EQUIP_2027.conferences)[number];
export type EquipCategoryType = (typeof EQUIP_2027.categories)[number]["id"];
export type EquipTrackType = (typeof EQUIP_2027.tracks)[number]["id"];

/**
 * Calculates total subsidized payable amount based on requested slots.
 */
export function calculateEquipPayable(slots: number = 1): number {
  const safeSlots = Math.max(1, Math.floor(slots || 1));
  return safeSlots * EQUIP_2027.subsidizedFeePerSlot;
}

/**
 * Calculates savings compared to standard pricing (50% discount).
 */
export function calculateEquipSavings(slots: number = 1): {
  savedAmount: number;
  discountPercentage: number;
  standardTotal: number;
} {
  const safeSlots = Math.max(1, Math.floor(slots || 1));
  return {
    savedAmount: safeSlots * (EQUIP_2027.standardPrice - EQUIP_2027.subsidizedFeePerSlot),
    discountPercentage: 50,
    standardTotal: safeSlots * EQUIP_2027.standardPrice,
  };
}

/**
 * Generates the WhatsApp message sent by the student to M-CEL TECH Enrollment Team.
 */
export function generateEquipWhatsAppOutreachMessage(params: {
  fullName: string;
  conference: string;
  localChurch: string;
  trackLabel?: string;
  referenceCode?: string;
}): string {
  const track = params.trackLabel || "Track 1: Evening Online vs Track 2: Physical Sprint";
  const refText = params.referenceCode ? ` (Ref: ${params.referenceCode})` : "";
  return `Hello M-CEL TECH Enrollment Team! 👋
My name is ${params.fullName}. I just applied for the EQUIP 2027 CSR Subsidized Scholarship${refText} under the ${params.conference} Conference (${params.localChurch}).

I am reaching out to:
1. Confirm that I received my official ₦10,000 subsidized scholarship offer email.
2. Confirm my spot for my preferred track (${track}).
3. Confirm that my laptop/device is ready for the hands-on sessions.

Please guide me on the next steps to complete my payment and confirm my enrollment. Thank you!`;
}

/**
 * Generates the wa.me link for an applicant to chat directly with M-CEL TECH Enrollment Team.
 */
export function getEquipWhatsAppLink(params: {
  fullName: string;
  conference: string;
  localChurch: string;
  trackLabel?: string;
  referenceCode?: string;
}): string {
  const message = generateEquipWhatsAppOutreachMessage(params);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
