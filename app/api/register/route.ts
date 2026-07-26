import { NextRequest } from "next/server";
import { createRegistrationSchema } from "@/lib/validators/registration.validator";
import { registrationService } from "@/lib/services/registration.service";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/register
 * Presentation layer only: rate-limit, parse, validate, delegate to the
 * service, format the response. No business logic lives here.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`register:${ip}`, 5, 60_000)) {
    return apiError("Too many registration attempts. Please try again in a minute.", [], 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = createRegistrationSchema.safeParse(body);
  if (!parsed.success) {
    return apiError(
      "Invalid registration data.",
      parsed.error.issues.map((i) => i.message),
      422
    );
  }

  try {
    const { registration, authorizationUrl } = await registrationService.registerAndInitializePayment(parsed.data);
    return apiSuccess(
      {
        registrationId: registration.id,
        registrationNumber: registration.registrationNumber,
        authorizationUrl,
      },
      "Registration created. Redirect to authorizationUrl to complete payment."
    );
  } catch (err) {
    return handleApiError("POST /api/register", err);
  }
}
