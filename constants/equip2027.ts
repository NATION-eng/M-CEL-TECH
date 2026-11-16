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
    bankName: "Moniepoint Microfinance Bank",
    accountName: "M-CEL TECH INTEGRATED SERVICES",
    accountNumber: "8116079309",
    secondaryAccount: {
      bankName: "First Bank of Nigeria",
      accountName: "M-CEL TECH INTEGRATED SERVICES",
      accountNumber: "2041237136",
    },
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
 * Generates the EXACT WhatsApp outreach copy specified for Step 2 follow-up cadence.
 */
export function generateEquipWhatsAppOutreachMessage(params: {
  fullName: string;
  conference: string;
  localChurch: string;
  trackLabel?: string;
}): string {
  const track = params.trackLabel || "Track 1: Evening Online vs Track 2: Physical Sprint";
  return `Hello ${params.fullName}! 👋 
this M-CEL TECH Enrollment Team.
We received your application for the EQUIP 2027 CSR Subsidized Scholarship under the ${params.conference} Conference (${params.localChurch}). 
I'm reaching out to:
1. Confirm you received your official ₦10,000 subsidized scholarship offer email.
2. Check if you have any questions about your preferred track (${track}).
3. Ensure you have your laptop/device ready for hands-on sessions.
Let me know if you need help with payment instructions or require our corporate bank account details!`;
}

/**
 * Generates the wa.me link for an applicant or admin to chat directly.
 */
export function getEquipWhatsAppLink(params: {
  fullName: string;
  conference: string;
  localChurch: string;
  trackLabel?: string;
}): string {
  const message = generateEquipWhatsAppOutreachMessage(params);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
