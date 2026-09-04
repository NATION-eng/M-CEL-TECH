export interface PromoCode {
  code: string;
  /** The amount the registrant actually pays in Naira (0 = free) */
  finalPrice: number;
  label: string;
  isActive: boolean;
}

export const PROMO_CODES: Record<string, PromoCode> = {
  "MCELTECH-FREE": {
    code: "MCELTECH-FREE",
    finalPrice: 0,
    label: "Full Scholarship — Free Registration",
    isActive: true,
  },
  "MCELTECH-3K": {
    code: "MCELTECH-3K",
    finalPrice: 3000,
    label: "Special Discount — Pay Only ₦3,000",
    isActive: true,
  },
  "MCELTECH-5K": {
    code: "MCELTECH-5K",
    finalPrice: 5000,
    label: "Special Discount — Pay Only ₦5,000",
    isActive: true,
  },
  "MCELTECH-10K": {
    code: "MCELTECH-10K",
    finalPrice: 10000,
    label: "Special Discount — Pay Only ₦10,000",
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

