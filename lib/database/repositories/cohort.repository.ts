import "server-only";
import { type Cohort } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/database/client";
import { logger } from "@/lib/utils/logger";

/**
 * Fallback used only when the database is unreachable — same rationale
 * as MOCK_PROGRAM in program.repository.ts. Read-only display data for
 * the single Evening Class cohort, shown open. Never used by the
 * registration/payment transaction path (incrementRegisteredCount,
 * markStatus, or findById-within-a-transaction) — those still hit the
 * real database and fail loudly if it's unavailable, since seats and
 * payments can't be safely faked.
 */
function mockCohorts(programId: string): Cohort[] {
  const now = new Date();
  return [
    {
      id: "00000000-0000-0000-0000-000000000001",
      programId,
      name: "Evening Class (Aug 5 – Aug 20, 2026)",
      startDate: null,
      endDate: null,
      startTime: "7:00 PM",
      endTime: "9:00 PM",
      capacity: 999999, // No cap — permanently open
      registeredCount: 0,
      status: "OPEN",
      location: null,
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export const cohortRepository = {
  async findActiveByProgramId(programId: string): Promise<Cohort[]> {
    try {
      const cohorts = await prisma.cohort.findMany({
        where: { programId, status: { in: ["OPEN", "FULL"] } },
        orderBy: { createdAt: "asc" },
      });
      return cohorts.length > 0 ? cohorts : mockCohorts(programId);
    } catch (err) {
      logger.warn("cohortRepository.findActiveByProgramId", "Database unavailable — returning mock cohorts", { error: err });
      return mockCohorts(programId);
    }
  },

  findById: (id: string, tx: Prisma.TransactionClient = prisma) => tx.cohort.findUnique({ where: { id } }),

  incrementRegisteredCount: (id: string, tx: Prisma.TransactionClient = prisma) =>
    tx.cohort.update({
      where: { id },
      data: { registeredCount: { increment: 1 } },
    }),

  markStatus: (id: string, status: "OPEN" | "FULL" | "CLOSED" | "CANCELLED", tx: Prisma.TransactionClient = prisma) =>
    tx.cohort.update({ where: { id }, data: { status } }),
};
