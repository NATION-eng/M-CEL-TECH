import { NextRequest } from "next/server";
import { initializePaymentSchema } from "@/lib/validators/payment.validator";
import { registrationRepository } from "@/lib/database/repositories/registration.repository";
import { paymentRepository } from "@/lib/database/repositories/payment.repository";
import { paymentService } from "@/lib/services/payment.service";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";
import { NotFoundError, ConflictError } from "@/lib/utils/errors";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import { SITE } from "@/constants/site";

export const dynamic = "force-dynamic";

/**
 * POST /api/payment/initialize
 * Re-initializes payment for an existing PAYMENT_PENDING / PAYMENT_FAILED
 * registration (e.g. the customer's first checkout attempt was
 * abandoned). New registrations get their first payment initialized as
 * part of POST /api/register — this endpoint is for retries.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`payment-init:${ip}`, 10, 60_000)) {
    return apiError("Too many attempts. Please try again shortly.", [], 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = initializePaymentSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Invalid request.", parsed.error.issues.map((i) => i.message), 422);
  }

  try {
    const registration = await registrationRepository.findById(parsed.data.registrationId);
    if (!registration) throw new NotFoundError("Registration not found.");
    if (registration.registrationStatus === "CONFIRMED") {
      throw new ConflictError("This registration is already confirmed — no payment needed.");
    }

    const payment = await paymentRepository.findByReference(registration.paymentReference);
    if (!payment) throw new NotFoundError("Payment record not found for this registration.");

    const init = await paymentService.initializeTransaction({
      email: registration.email,
      amountKobo: Math.round(Number(payment.amount) * 100),
      reference: registration.paymentReference,
      callbackUrl: `${SITE.url}/api/payment/verify`,
      metadata: { registrationId: registration.id },
    });

    return apiSuccess({ authorizationUrl: init.data.authorization_url }, "Payment re-initialized.");
  } catch (err) {
    return handleApiError("POST /api/payment/initialize", err);
  }
}
