"use server";

import { registrationService } from "@/lib/services/registration.service";
import { createRegistrationSchema } from "@/lib/validators/registration.validator";
import { logger } from "@/lib/utils/logger";
import { AppError } from "@/lib/utils/errors";
import type { ActionResult } from "@/types";

import { validatePromoCode, type PromoValidationResult } from "@/constants/promo-codes";

const PROGRAM_SLUG = "ai-productivity-digital-innovation-bootcamp";

type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  cohortId: string;
  promoCode?: string;
  referralCode?: string;
};

/**
 * Validates a promo code for real-time form feedback.
 */
export async function checkPromoCodeAction(code: string): Promise<PromoValidationResult> {
  return validatePromoCode(code);
}

/**
 * Server action backing the registration form. This is a second entry
 * point into the exact same registrationService used by POST
 * /api/register — business rules live in one place only, never
 * duplicated between the form and the public API.
 */
export async function registerForBootcamp(
  input: RegisterInput
): Promise<ActionResult<{ authorizationUrl: string | null; isFree: boolean }>> {
  const parsed = createRegistrationSchema.safeParse({
    programSlug: PROGRAM_SLUG,
    cohortId: input.cohortId,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    organization: input.organization,
    promoCode: input.promoCode,
    referralCode: input.referralCode,
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    const result = await registrationService.registerAndInitializePayment(parsed.data);
    return { success: true, data: { authorizationUrl: result.authorizationUrl, isFree: result.isFree } };
  } catch (err) {
    if (err instanceof AppError) {
      return { success: false, error: err.message };
    }
    logger.error("registerForBootcamp", "Unexpected error", { error: err });
    return {
      success: false,
      error: "Something went wrong while starting your registration. Please try again shortly.",
    };
  }
}
