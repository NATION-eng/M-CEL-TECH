export interface PromoCode {
  code: string;
  /** The amount the registrant actually pays in Naira (0 = free) */
  finalPrice: number;
  label: string;
  isActive: boolean;
}

export const PROMO_CODES: Record<string, PromoCode> = {
  "FREE-8K2A-91": {
    code: "FREE-8K2A-91",
    finalPrice: 0,
    label: "Full Scholarship — Free Registration (Single-Use)",
    isActive: true,
  },
  "3K-9B1X-42": {
    code: "3K-9B1X-42",
    finalPrice: 3000,
    label: "Special Discount — Pay Only ₦3,000 (Single-Use)",
    isActive: true,
  },
  "5K-7M4P-63": {
    code: "5K-7M4P-63",
    finalPrice: 5000,
    label: "Special Discount — Pay Only ₦5,000 (Single-Use)",
    isActive: true,
  },
  "10K-2T8W-55": {
    code: "10K-2T8W-55",
    finalPrice: 10000,
    label: "Special Discount — Pay Only ₦10,000 (Single-Use)",
    isActive: true,
  },
};

export type PromoValidationResult =
  | {
      isValid: true;
      code: string;
      finalPrice: number;
      label: string;
      isFree: boolean;
    }
  | {
      isValid: false;
      finalPrice: null;
      error: string;
    };

export function validatePromoCode(rawCode?: string | null): PromoValidationResult {
  if (!rawCode || !rawCode.trim()) {
    return {
      isValid: false,
      finalPrice: null,
      error: "Please enter a promo code.",
    };
  }

  const normalized = rawCode.trim().toUpperCase();
  const found = PROMO_CODES[normalized];

  if (found && found.isActive) {
    return {
      isValid: true,
      code: found.code,
      finalPrice: found.finalPrice,
      label: found.label,
      isFree: found.finalPrice === 0,
    };
  }

  return {
    isValid: false,
    finalPrice: null,
    error: `Promo code "${rawCode.trim()}" is invalid or not active.`,
  };
}

