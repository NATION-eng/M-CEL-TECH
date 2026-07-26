import { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validators/contact.validator";
import { auditService } from "@/lib/services/audit.service";
import { emailService } from "@/lib/services/email.service";
import { apiSuccess, apiError } from "@/lib/utils/api-response";
import { handleApiError } from "@/lib/utils/handle-api-error";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";

export const dynamic = "force-dynamic";

/**
 * POST /api/contact — reserved for future use. The live site currently
 * routes all contact through WhatsApp, but this stays fully functional
 * (validated, rate-limited, audit-logged, and notifies the team by
 * email) so a contact form can be wired in later with zero backend changes.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
    return apiError("Too many requests. Please try again shortly.", [], 429);
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return apiError("Invalid contact form data.", parsed.error.issues.map((i) => i.message), 422);
  }

  try {
    await auditService.log("Contact Form Submitted", parsed.data.email, { name: parsed.data.name }, ip, "public");
    await emailService.sendAdminNotification({
      subject: `New contact form message from ${parsed.data.name}`,
      message: `${parsed.data.message}\n\nFrom: ${parsed.data.name} <${parsed.data.email}>`,
    });
    return apiSuccess(null, "Message received. We'll be in touch shortly.");
  } catch (err) {
    return handleApiError("POST /api/contact", err);
  }
}
