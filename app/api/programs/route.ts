import { programService } from "@/lib/services/program.service";
import { apiSuccess } from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";

export const dynamic = "force-dynamic";

/** GET /api/programs — all active training programmes. */
export async function GET() {
  try {
    const programs = await programService.getActivePrograms();
    return apiSuccess(programs, "Active training programmes retrieved.");
  } catch (err) {
    return handleApiError("GET /api/programs", err);
  }
}
