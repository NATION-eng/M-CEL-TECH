import "server-only";
import { logger } from "@/lib/utils/logger";
import { AppError } from "@/lib/utils/errors";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new AppError(
      "Payments are not configured yet. Add PAYSTACK_SECRET_KEY to your environment variables.",
      503
    );
  }
  return key;
}

/** Paystack signs webhooks with the secret key by default; PAYSTACK_WEBHOOK_SECRET overrides that if your setup issues a distinct one. */
function getWebhookSigningKey(): string {
  return process.env.PAYSTACK_WEBHOOK_SECRET || getSecretKey();
}

export type InitializeTransactionParams = {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
};

export type InitializeTransactionResult = {
  status: boolean;
  message: string;
  data: { authorization_url: string; access_code: string; reference: string };
};

export type VerifyTransactionResult = {
  status: boolean;
  message: string;
  data: {
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number;
    paid_at: string | null;
    customer: { email: string };
    metadata: Record<string, unknown>;
  };
};

/**
 * All Paystack API interaction is isolated here. Nothing else in the
 * codebase talks to Paystack directly, so swapping or adding a payment
 * gateway later only touches this file.
 */
export const paymentService = {
  async initializeTransaction(params: InitializeTransactionParams): Promise<InitializeTransactionResult> {
    const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: "POST",
      headers: { Authorization: `Bearer ${getSecretKey()}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: params.email,
        amount: params.amountKobo,
        reference: params.reference,
        callback_url: params.callbackUrl,
        metadata: params.metadata ?? {},
        currency: "NGN",
      }),
      cache: "no-store",
    });

    const body = await res.json();
    if (!res.ok || !body.status) {
      logger.error("PaymentService", "Paystack initialize failed", { status: res.status, body });
      throw new AppError(body?.message ?? "Could not start payment. Please try again.", 502);
    }
    return body as InitializeTransactionResult;
  },

  async verifyTransaction(reference: string): Promise<VerifyTransactionResult> {
    const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
      cache: "no-store",
    });

    const body = await res.json();
    if (!res.ok) {
      logger.error("PaymentService", "Paystack verify failed", { status: res.status, body });
      throw new AppError("Could not verify payment. Please contact support with your reference.", 502);
    }
    return body as VerifyTransactionResult;
  },

  /** HMAC SHA512 of the raw request body, per Paystack's webhook signing spec. */
  async validateWebhookSignature(rawBody: string, signature: string | null): Promise<boolean> {
    if (!signature) return false;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(getWebhookSigningKey()),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
    const computed = Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return computed === signature;
  },

  /** Stub — wire up Paystack's Refunds API here when refund support is actually needed. */
  async refundPayment(_transactionReference: string, _amountKobo?: number): Promise<never> {
    throw new AppError(
      "Refunds are not yet automated. Please process this refund manually via the Paystack dashboard.",
      501
    );
  },

  /** Shapes the data a receipt needs. A PDF/print renderer can consume this later without touching payment logic. */
  generateReceipt(params: { receiptNumber: string; amountNaira: number; paidAt: Date; payerName: string }) {
    return params;
  },
};
