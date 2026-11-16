"use server";

import { equipApplicationSchema, type EquipApplicationInput } from "@/lib/validators/equip2027.validator";
import { equipApplicationRepository, type EquipApplicationRecord } from "@/lib/database/repositories/equip-application.repository";
import { emailService } from "@/lib/services/email.service";
import { paymentService } from "@/lib/services/payment.service";
import {
  EQUIP_2027,
  calculateEquipPayable,
  getEquipWhatsAppLink,
  generateEquipWhatsAppOutreachMessage,
} from "@/constants/equip2027";
import { SITE } from "@/constants/site";
import { logger } from "@/lib/utils/logger";
import type { ActionResult } from "@/types";

function getConferenceAbbreviation(conference: string): string {
  switch (conference) {
    case "Port Harcourt East":
      return "PHE";
    case "Port Harcourt West":
      return "PHW";
    case "Rivers East":
      return "RVE";
    case "Rivers West-Central":
      return "RWC";
    case "Rivers North":
      return "RVN";
    case "Bayelsa":
      return "BYL";
    case "Cross River":
      return "CRR";
    default:
      return "GEN";
  }
}

function generateEquipReference(conference: string): string {
  const prefix = getConferenceAbbreviation(conference);
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `EQ27-${prefix}-${randomSuffix}`;
}

export type EquipSubmissionSuccess = {
  referenceCode: string;
  fullName: string;
  email: string;
  conference: string;
  localChurch: string;
  slots: number;
  amountNaira: number;
  trackLabel: string;
  paymentUrl: string | null;
  whatsappLink: string;
  whatsappMessage: string;
};

/**
 * Server action to process an EQUIP 2027 CSR Subsidized Scholarship application.
 * Executes the core principle: "Apply Now", instant offer email, Paystack & Bank transfer info, and WhatsApp cadence.
 */
export async function submitEquipApplicationAction(
  input: EquipApplicationInput
): Promise<ActionResult<EquipSubmissionSuccess>> {
  const parsed = equipApplicationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid application data.",
    };
  }

  const data = parsed.data;
  const slots = data.category === "SPONSOR" ? Math.max(1, data.slots) : 1;
  const amountNaira = calculateEquipPayable(slots);
  const referenceCode = generateEquipReference(data.conference);

  const trackObj = EQUIP_2027.tracks.find((t) => t.id === data.track);
  const trackLabel = trackObj ? trackObj.fullTitle : data.track;

  // 1. Persist application
  let record: EquipApplicationRecord;
  try {
    record = await equipApplicationRepository.create({
      referenceCode,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      conference: data.conference,
      localChurch: data.localChurch,
      category: data.category,
      slots,
      track: data.track,
      hasDevice: data.hasDevice,
      notes: data.notes,
      amountNaira,
    });
  } catch (err) {
    logger.error("Equip2027Action", "Failed to persist application", { error: err });
    return {
      success: false,
      error: "Unable to process application at this time. Please try again or contact support.",
    };
  }

  // 2. Build WhatsApp Outreach message and wa.me link using the user's corrected template
  const whatsappMessage = generateEquipWhatsAppOutreachMessage({
    fullName: data.fullName,
    conference: data.conference,
    localChurch: data.localChurch,
    trackLabel: trackObj ? trackObj.shortLabel : "Track 1 vs Track 2",
  });

  const whatsappLink = getEquipWhatsAppLink({
    fullName: data.fullName,
    conference: data.conference,
    localChurch: data.localChurch,
    trackLabel: trackObj ? trackObj.shortLabel : "Track 1 vs Track 2",
  });

  // 3. Attempt to initialize Paystack transaction (optional instant online payment link)
  let paymentUrl: string | null = null;
  try {
    const callbackUrl = `${SITE.url}/equip2027/success?ref=${referenceCode}`;
    const initRes = await paymentService.initializeTransaction({
      email: data.email,
      amountKobo: amountNaira * 100,
      reference: `EQ27_${referenceCode}_${Date.now()}`,
      callbackUrl,
      metadata: {
        type: "EQUIP_2027_SCHOLARSHIP",
        referenceCode,
        fullName: data.fullName,
        conference: data.conference,
        localChurch: data.localChurch,
        slots,
        track: data.track,
      },
    });

    if (initRes.status && initRes.data?.authorization_url) {
      paymentUrl = initRes.data.authorization_url;
    }
  } catch (err) {
    // Graceful fallback: Paystack initialization may fail if test/production key is not set in development.
    logger.warn("Equip2027Action", "Paystack checkout link generation skipped", { error: err });
  }

  // 4. Dispatch Step 1 Instant Offer Email via Resend
  try {
    await emailService.sendEquipOfferEmail({
      fullName: data.fullName,
      email: data.email,
      referenceCode,
      conference: data.conference,
      localChurch: data.localChurch,
      slots,
      trackLabel,
      amountNaira,
      paymentUrl: paymentUrl ?? undefined,
      whatsappLink,
    });
  } catch (err) {
    logger.error("Equip2027Action", "Failed to dispatch offer email", { error: err });
    // Non-blocking: we still return success to the applicant with reference and WhatsApp link
  }

  return {
    success: true,
    data: {
      referenceCode,
      fullName: data.fullName,
      email: data.email,
      conference: data.conference,
      localChurch: data.localChurch,
      slots,
      amountNaira,
      trackLabel,
      paymentUrl,
      whatsappLink,
      whatsappMessage,
    },
  };
}

/**
 * Fetch an application by reference code (for success page or verification).
 */
export async function getEquipApplicationAction(
  referenceCode: string
): Promise<ActionResult<EquipApplicationRecord | null>> {
  try {
    const record = await equipApplicationRepository.findByReference(referenceCode);
    return { success: true, data: record };
  } catch (err) {
    return { success: false, error: "Failed to look up application." };
  }
}

/**
 * Update the cadence status of an applicant (for admin follow-up tracking).
 */
export async function updateEquipCadenceStatusAction(
  referenceCode: string,
  status: EquipApplicationRecord["status"],
  notes?: string
): Promise<ActionResult<EquipApplicationRecord>> {
  try {
    const updated = await equipApplicationRepository.updateStatus(referenceCode, status, notes);
    if (!updated) {
      return { success: false, error: "Application record not found." };
    }
    return { success: true, data: updated };
  } catch (err) {
    return { success: false, error: "Failed to update cadence status." };
  }
}
