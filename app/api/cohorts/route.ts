import { NextRequest } from "next/server";
import { programService } from "@/lib/services/program.service";
import { cohortService } from "@/lib/services/cohort.service";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";

export const dynamic = "force-dynamic";

/** GET /api/cohorts?programSlug=... — active cohorts with live availability for a programme. */
export async function GET(request: NextRequest) {
  const programSlug = request.nextUrl.searchParams.get("programSlug");
  if (!programSlug) {
    return apiError("Query parameter 'programSlug' is required.", [], 400);
  }

  try {
    const program = await programService.getBySlug(programSlug);
    const cohorts = await cohortService.getActiveCohortsForProgram(program.id);
    return apiSuccess(cohorts, "Active cohorts retrieved.");
  } catch (err) {
    return handleApiError("GET /api/cohorts", err);
  }
}
