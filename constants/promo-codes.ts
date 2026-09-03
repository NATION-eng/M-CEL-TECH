export interface PromoCode {
  code: string;
  discountAmount: number; // in Naira, e.g. 3000
  label: string;
  isActive: boolean;
}

export const PROMO_CODES: Record<string, PromoCode> = {
  AIFUTURE: {
    code: "aifuture",
    discountAmount: 3000,
    label: "₦3,000 Special Discount",
    isActive: true,
  },
  MAVSALPHA: {
    code: "Mavsalpha",
    discountAmount: 3000,
    label: "₦3,000 Special Discount",
    isActive: true,
  },
  JAHO007: {
    code: "Jaho007",
    discountAmount: 3000,
    label: "₦3,000 Special Discount",
    isActive: true,
  },
  CAUTION: {
    code: "Caution",
    discountAmount: 3000,
    label: "₦3,000 Special Discount",
    isActive: true,
  },
};

export type PromoValidationResult =
  | {
      isValid: true;
      code: string;
      discountAmount: number;
      label: string;
    }
  | {
      isValid: false;
      discountAmount: 0;
      error: string;
    };

export function validatePromoCode(rawCode?: string | null): PromoValidationResult {
  if (!rawCode || !rawCode.trim()) {
    return {
      isValid: false,
      discountAmount: 0,
      error: "Please enter a promo code.",
    };
  }

  const normalized = rawCode.trim().toUpperCase();
  const found = PROMO_CODES[normalized];

  if (found && found.isActive) {
    return {
      isValid: true,
      code: found.code,
      discountAmount: found.discountAmount,
      label: found.label,
    };
  }

  return {
    isValid: false,
    discountAmount: 0,
    error: `Promo code "${rawCode.trim()}" is invalid or not active.`,
  };
}
