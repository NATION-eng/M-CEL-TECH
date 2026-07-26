import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/services/payment.service";
import { registrationService } from "@/lib/services/registration.service";
import { auditService } from "@/lib/services/audit.service";
import { logger } from "@/lib/utils/logger";

export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/paystack — the authoritative payment-confirmation
 * channel. This is the only endpoint guaranteed to fire even if the
 * customer closes their browser mid-redirect, so it (not the GET
 * redirect in /api/payment/verify) is the source of truth. Configure
 * this URL in the Paystack dashboard under Settings → API Keys & Webhooks.
 *
 * Signature verification prevents replay/forged requests — anything that
 * doesn't carry a valid x-paystack-signature is rejected before any
 * business logic runs.
 */
export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const isValid = await paymentService.validateWebhookSignature(rawBody, signature);
  if (!isValid) {
    logger.warn("Webhook:Paystack", "Rejected — invalid or missing signature");
    return NextResponse.json({ received: false }, { status: 401 });
  }

  const event = JSON.parse(rawBody) as { event: string; data: { reference: string } };
  await auditService.log("Webhook Received", `Paystack event: ${event.event}`, {
    reference: event.data?.reference,
  });

  if (event.event !== "charge.success") {
    // Acknowledge other event types without processing them, so Paystack doesn't retry.
    return NextResponse.json({ received: true });
  }

  try {
    await registrationService.confirmPayment(event.data.reference);
    return NextResponse.json({ received: true });
  } catch (err) {
    logger.error("Webhook:Paystack", "Failed to process charge.success", { error: err });
    // 500 tells Paystack to retry delivery.
    return NextResponse.json({ received: false }, { status: 500 });
  }
}
