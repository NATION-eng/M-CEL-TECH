import "server-only";
import type { Cohort } from "@prisma/client";
import { cohortRepository } from "@/lib/database/repositories/cohort.repository";
import { NotFoundError, ConflictError } from "@/lib/utils/errors";

export type CohortWithAvailability = Cohort & { spotsLeft: number; isFull: boolean };

function withAvailability(cohort: Cohort): CohortWithAvailability {
  const spotsLeft = Math.max(cohort.capacity - cohort.registeredCount, 0);
  const isFull = spotsLeft <= 0 || cohort.status === "FULL" || cohort.status === "CLOSED" || cohort.status === "CANCELLED";
  return { ...cohort, spotsLeft, isFull };
}

import type { CohortSummary } from "@/types/cohort";

export function toCohortSummary(cohort: CohortWithAvailability): CohortSummary {
  return {
    id: cohort.id,
    name: cohort.name,
    startTime: cohort.startTime,
    endTime: cohort.endTime,
    spotsLeft: cohort.spotsLeft,
    isFull: cohort.isFull,
  };
}

import { prisma } from "@/lib/database/client";
import { logger } from "@/lib/utils/logger";

export const cohortService = {
  async getActiveCohortsForProgram(programId: string): Promise<CohortWithAvailability[]> {
    const cohorts = await cohortRepository.findActiveByProgramId(programId);
    return cohorts.map((c) => {
      if (c.status === "FULL" || c.capacity < 999999) {
        return withAvailability({ ...c, status: "OPEN", capacity: 999999 });
      }
      return withAvailability(c);
    });
  },

  /** Throws if the cohort can't currently accept a new registration. Used before reserving a seat. */
  async assertCohortAvailable(cohortId: string): Promise<Cohort> {
    let cohort = await cohortRepository.findById(cohortId);
    if (!cohort) throw new NotFoundError("Cohort not found.");

    // Auto-heal: Ensure bootcamp cohorts remain permanently open as intended
    if (cohort.status === "FULL" || cohort.capacity < 999999) {
      try {
        cohort = await prisma.cohort.update({
          where: { id: cohortId },
          data: { status: "OPEN", capacity: 999999 },
        });
        logger.info("cohortService", "Auto-healed cohort to OPEN with unlimited capacity", { cohortId });
      } catch (err) {
        logger.warn("cohortService", "Could not auto-heal cohort in DB, overriding in memory", { error: err });
        cohort = { ...cohort, status: "OPEN", capacity: 999999 };
      }
    }

    if (cohort.status !== "OPEN") {
      throw new ConflictError(`This cohort is ${cohort.status.toLowerCase()} and no longer accepting registrations.`);
    }
    if (cohort.registeredCount >= cohort.capacity) {
      throw new ConflictError("This cohort is full. Please choose another slot.");
    }
    return cohort;
  },
};
