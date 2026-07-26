import "server-only";
import { prisma } from "@/lib/prisma";

export const COHORT_MAX_PARTICIPANTS = 30;

export const COHORTS = [
  { id: "evening-cohort", label: "Evening Class (2 Weeks)", time: "7:00 PM – 9:00 PM" },
] as const;

export type CohortId = (typeof COHORTS)[number]["id"];

export type CohortAvailability = {
  id: CohortId;
  label: string;
  time: string;
  spotsLeft: number;
  isFull: boolean;
};

/**
 * Counts PENDING + SUCCESS registrations per cohort (a PENDING row is a
 * reservation mid-checkout) so cohorts close the moment they're full,
 * rather than only once payment confirms. Abandoned PENDING rows should
 * be periodically cleared by a scheduled job so seats aren't held
 * forever by incomplete checkouts.
 */
export async function getCohortAvailability(): Promise<CohortAvailability[]> {
  try {
    const counts = await prisma.registration.groupBy({
      by: ["cohortId"],
      where: { payment: { status: { in: ["PENDING", "SUCCESS"] } } },
      _count: { _all: true },
    });

    const countByCohort = new Map(counts.map((c) => [c.cohortId, c._count?._all ?? 0]));

    return COHORTS.map((cohort) => {
      const taken = countByCohort.get(cohort.id) ?? 0;
      const spotsLeft = Math.max(COHORT_MAX_PARTICIPANTS - taken, 0);
      return { ...cohort, spotsLeft, isFull: spotsLeft <= 0 };
    });
  } catch (error) {
    console.warn("⚠ Could not fetch cohort availability from database, using defaults:", error instanceof Error ? error.message : error);
    return COHORTS.map((cohort) => ({
      ...cohort,
      spotsLeft: COHORT_MAX_PARTICIPANTS,
      isFull: false,
    }));
  }
}

export async function isCohortFull(cohortId: string): Promise<boolean> {
  try {
    const taken = await prisma.registration.count({
      where: { cohortId, payment: { status: { in: ["PENDING", "SUCCESS"] } } },
    });
    return taken >= COHORT_MAX_PARTICIPANTS;
  } catch (error) {
    console.warn(`⚠ Could not fetch cohort count for ${cohortId} from database:`, error instanceof Error ? error.message : error);
    return false;
  }
}

/** Resolves a cohort id (e.g. "morning") to its display label + time, for emails and UI. */
export function getCohortLabel(cohortId: string): string {
  const cohort = COHORTS.find((c) => c.id === cohortId);
  return cohort ? `${cohort.label} (${cohort.time})` : cohortId;
}
