import "server-only";
import { prisma } from "@/lib/database/client";
import { PROMO_CODES, type PromoValidationResult } from "@/constants/promo-codes";
import { logger } from "@/lib/utils/logger";

export const promoCodeRepository = {
  /**
   * Look up a promo code by code string (case-insensitive)
   */
  async findByCode(rawCode: string) {
    if (!rawCode || !rawCode.trim()) return null;
    const normalized = rawCode.trim().toUpperCase();

    try {
      return await prisma.promoCode.findFirst({
        where: {
          code: { equals: normalized, mode: "insensitive" },
        },
      });
    } catch {
      return null;
    }
  },

  /**
   * Validates whether a promo code exists, is active, and has remaining uses
   */
  async validate(rawCode?: string | null, email?: string | null): Promise<PromoValidationResult> {
    if (!rawCode || !rawCode.trim()) {
      return {
        isValid: false,
        finalPrice: null,
        error: "Please enter a promo code.",
      };
    }

    const normalized = rawCode.trim().toUpperCase();

    // 1. Try DB lookup first
    try {
      const dbCode = await prisma.promoCode.findFirst({
        where: {
          code: { equals: normalized, mode: "insensitive" },
        },
      });

      if (dbCode) {
        if (!dbCode.isActive || dbCode.timesUsed >= dbCode.maxUses) {
          return {
            isValid: false,
            finalPrice: null,
            error: `Promo code "${normalized}" has already been redeemed.`,
          };
        }

        if (dbCode.assignedEmail && email && dbCode.assignedEmail.toLowerCase() !== email.toLowerCase().trim()) {
          return {
            isValid: false,
            finalPrice: null,
            error: "This promo code is reserved for a specific recipient.",
          };
        }

        const finalPrice = Number(dbCode.finalPrice);
        return {
          isValid: true,
          code: dbCode.code,
          finalPrice,
          label: dbCode.label,
          isFree: finalPrice === 0,
        };
      }
    } catch (err) {
      logger.warn("PromoCodeRepository", "Database lookup error, falling back to static constants", { error: err });
    }

    // 2. Fallback to static dictionary (if DB table not yet created)
    const staticFound = PROMO_CODES[normalized];
    if (staticFound && staticFound.isActive) {
      return {
        isValid: true,
        code: staticFound.code,
        finalPrice: staticFound.finalPrice,
        label: staticFound.label,
        isFree: staticFound.finalPrice === 0,
      };
    }

    return {
      isValid: false,
      finalPrice: null,
      error: `Promo code "${rawCode.trim()}" is invalid or not active.`,
    };
  },

  /**
   * Redeems and burns the promo code after confirmation or payment
   */
  async redeem(rawCode?: string | null, registrantEmail?: string | null) {
    if (!rawCode || !rawCode.trim()) return null;
    const normalized = rawCode.trim().toUpperCase();

    try {
      const existing = await prisma.promoCode.findFirst({
        where: {
          code: { equals: normalized, mode: "insensitive" },
        },
      });

      if (!existing) {
        logger.info("PromoCodeRepository", "Promo code redeemed via static fallback", { code: normalized, email: registrantEmail });
        return null;
      }

      const nextTimesUsed = existing.timesUsed + 1;
      const shouldDeactivate = nextTimesUsed >= existing.maxUses;

      const updated = await prisma.promoCode.update({
        where: { id: existing.id },
        data: {
          timesUsed: nextTimesUsed,
          isActive: !shouldDeactivate,
          redeemedBy: registrantEmail || null,
          redeemedAt: new Date(),
        },
      });

      logger.info("PromoCodeRepository", "Promo code successfully redeemed and burned", {
        code: updated.code,
        timesUsed: updated.timesUsed,
        maxUses: updated.maxUses,
        isActive: updated.isActive,
        redeemedBy: registrantEmail,
      });

      return updated;
    } catch (err) {
      logger.error("PromoCodeRepository", "Failed to redeem promo code in database", { error: err, code: normalized });
      return null;
    }
  },
};
