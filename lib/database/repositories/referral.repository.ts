import "server-only";
import { prisma } from "@/lib/database/client";

export const referralRepository = {
  /**
   * Look up an active referral partner by code (case-insensitive)
   */
  async findByCode(rawCode: string) {
    if (!rawCode || !rawCode.trim()) return null;
    const normalized = rawCode.trim().toLowerCase();

    try {
      return await prisma.referralPartner.findFirst({
        where: {
          code: { equals: normalized, mode: "insensitive" },
          status: "ACTIVE",
        },
      });
    } catch {
      // If table is not yet created in DB or connection issue, gracefully return null
      return null;
    }
  },

  /**
   * Get all referral partners along with their confirmed registration count
   */
  async getAllWithStats() {
    try {
      const partners = await prisma.referralPartner.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          registrations: {
            where: {
              registrationStatus: { in: ["CONFIRMED", "COMPLETED"] },
            },
            select: { id: true, registrationStatus: true },
          },
        },
      });

      return partners.map((p) => ({
        id: p.id,
        code: p.code,
        name: p.name,
        xHandle: p.xHandle,
        status: p.status,
        confirmedCount: p.registrations.length,
        createdAt: p.createdAt,
      }));
    } catch {
      return [];
    }
  },
};
