import "server-only";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/database/client";

/**
 * Atomically increments a named counter stored in system_settings using
 * a single Postgres upsert — safe under concurrent requests without
 * needing row-level locking helpers Prisma doesn't expose directly. This
 * is the one place raw SQL is used, because Prisma has no atomic
 * increment-and-return for arbitrary key/value rows.
 */
async function nextCounter(key: string): Promise<number> {
  const rows = await prisma.$queryRawUnsafe<{ setting_value: string }[]>(
    `INSERT INTO system_settings (id, setting_key, setting_value, description, updated_at)
     VALUES ($1, $2, '1', 'Auto-incrementing counter — do not edit manually', now())
     ON CONFLICT (setting_key)
     DO UPDATE SET setting_value = (system_settings.setting_value::int + 1)::text, updated_at = now()
     RETURNING setting_value`,
    randomUUID(),
    key
  );
  return Number(rows[0]?.setting_value ?? 1);
}

/** Format: MCEL-YYYY-000001. Sequential per year, never reused, never reset mid-year. */
export async function generateReceiptNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const sequence = await nextCounter(`receipt_counter_${year}`);
  return `MCEL-${year}-${String(sequence).padStart(6, "0")}`;
}

/** Format: REG-YYYY-XXXXXX. Internal registration identifier, distinct from the receipt number. */
export async function generateRegistrationNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const sequence = await nextCounter(`registration_counter_${year}`);
  return `REG-${year}-${String(sequence).padStart(6, "0")}`;
}

/** Opaque, unguessable reference sent to Paystack — not sequential, never shown as the "real" ID. */
export function generatePaymentReference(prefix = "MCEL"): string {
  const random = randomUUID().replace(/-/g, "").slice(0, 16);
  return `${prefix}_${Date.now()}_${random}`;
}
