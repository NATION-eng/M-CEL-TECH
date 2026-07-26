import "server-only";
import { Resend } from "resend";
import { renderRegistrationConfirmationEmail } from "@/emails/registration-confirmation";
import { formatNaira } from "@/lib/utils";

function getResendClient(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY is not set. Add it to your environment variables before sending emails."
    );
  }
  return new Resend(key);
}

import { getCohortLabel } from "@/lib/cohorts";

export async function sendRegistrationConfirmationEmail(params: {
  to: string;
  fullName: string;
  programTitle: string;
  amountNaira: number;
  reference: string;
  cohort?: string | null;
}) {
  const resend = getResendClient();
  const fromAddress = process.env.RESEND_FROM_EMAIL ?? "M-CEL TECH <training@mceltech.com>";

  return resend.emails.send({
    from: fromAddress,
    to: params.to,
    subject: `You're registered — ${params.programTitle}`,
    html: renderRegistrationConfirmationEmail({
      fullName: params.fullName,
      programTitle: params.programTitle,
      amountFormatted: formatNaira(params.amountNaira),
      receiptNumber: params.reference,
      cohortLabel: params.cohort ? getCohortLabel(params.cohort) : "",
    }),
  });
}
