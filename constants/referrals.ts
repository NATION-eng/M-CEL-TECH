export const REFERRAL_HANDLES = new Set([
  "aifuture",
  "mavsalpha",
  "jaho007",
  "caution",
  "dconnect",
  "meekybillz",
]);

/**
 * Validates a referral handle from the ?ref= query param.
 * Case-insensitive. Returns the canonical (lowercase) handle or null.
 */
export function validateReferral(ref?: string | null): string | null {
  if (!ref || !ref.trim()) return null;
  const normalized = ref.trim().toLowerCase();
  return REFERRAL_HANDLES.has(normalized) ? normalized : null;
}
