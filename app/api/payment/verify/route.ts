import { NextRequest, NextResponse } from "next/server";
import { registrationService } from "@/lib/services/registration.service";
import { verifyPaymentSchema } from "@/lib/validators/payment.validator";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";
import { logger } from "@/lib/utils/logger";
import { SITE } from "@/constants/site";

export const dynamic = "force-dynamic";

/**
 * GET /api/payment/verify — the browser redirect target Paystack sends
 * the customer back to after checkout (set as `callback_url` when the
 * transaction is initialized). Verifies, then redirects to a status page.
 */
export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.redirect(`${SITE.url}/training/register?status=error`);
  }

  try {
    const result = await registrationService.confirmPayment(reference);
    return NextResponse.redirect(
      result.success
        ? `${SITE.url}/training/register/success?ref=${reference}`
        : `${SITE.url}/training/register?status=failed`
    );
  } catch (err) {
    logger.error("GET /api/payment/verify", "Verification failed", { error: err });
    return NextResponse.redirect(`${SITE.url}/training/register?status=error`);
  }
}

/** POST /api/payment/verify — programmatic verification (e.g. a "check my payment status" call). */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = verifyPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("A payment reference is required.", parsed.error.issues.map((i) => i.message), 422);
  }

  try {
    const result = await registrationService.confirmPayment(parsed.data.reference);
    return apiSuccess(
      { confirmed: result.success, registrationStatus: result.registration.registrationStatus },
      "Payment verification complete."
    );
  } catch (err) {
    return handleApiError("POST /api/payment/verify", err);
  }
}
