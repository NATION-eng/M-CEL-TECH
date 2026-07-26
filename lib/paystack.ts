import "server-only";

const PAYSTACK_BASE_URL = "https://api.paystack.co";

function getSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) {
    throw new Error(
      "PAYSTACK_SECRET_KEY is not set. Add it to your environment variables before accepting live payments."
    );
  }
  return key;
}

type InitializeTransactionParams = {
  email: string;
  amountKobo: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
};

type InitializeTransactionResponse = {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

/** Initializes a Paystack transaction and returns the checkout URL. */
export async function initializeTransaction(
  params: InitializeTransactionParams
): Promise<InitializeTransactionResponse> {
  const res = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getSecretKey()}`,
      "Content-Type": "application/json",
    },
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

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Paystack initialize failed (${res.status}): ${body}`);
  }

  return res.json();
}

export type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data: {
    status: "success" | "failed" | "abandoned";
    reference: string;
    amount: number;
    currency: string;
    paid_at: string | null;
    customer: { email: string };
    metadata: Record<string, unknown>;
  };
};

/** Verifies a Paystack transaction by reference. Always re-verify server-side before granting access. */
export async function verifyTransaction(
  reference: string
): Promise<PaystackVerifyResponse> {
  const res = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: { Authorization: `Bearer ${getSecretKey()}` },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Paystack verify failed (${res.status}): ${body}`);
  }

  return res.json();
}

/**
 * Verifies the `x-paystack-signature` header on incoming webhooks using
 * HMAC SHA512 of the raw request body, per Paystack's docs.
 */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string | null
): Promise<boolean> {
  if (!signature) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecretKey()),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  const digest = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
  const computed = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return computed === signature;
}

/** Generates a unique, prefixed reference for a registration payment. */
export function generatePaymentReference(prefix = "MCEL"): string {
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  return `${prefix}_${Date.now()}_${random}`;
}
