import "server-only";
import { createResendProvider } from "@/lib/services/email/resend-provider";
import type { EmailProvider } from "@/lib/services/email/email-provider";
import { emailLogRepository } from "@/lib/database/repositories/email-log.repository";
import { renderRegistrationConfirmationEmail } from "@/emails/registration-confirmation";
import { renderAdminNotificationEmail } from "@/emails/admin-notification";
import { logger } from "@/lib/utils/logger";
import { formatNaira } from "@/lib/utils";

let provider: EmailProvider = createResendProvider();

/** Swap providers (tests, migrating off Resend) without touching any call site below. */
export function setEmailProvider(customProvider: EmailProvider) {
  provider = customProvider;
}

async function dispatch(params: { to: string; subject: string; html: string; registrationId?: string }) {
  const log = await emailLogRepository.create({
    email: params.to,
    subject: params.subject,
    provider: "resend",
    status: "PENDING",
    ...(params.registrationId ? { registration: { connect: { id: params.registrationId } } } : {}),
  });

  try {
    const result = await provider.send(params);
    await emailLogRepository.markSent(log.id, result.id);
    logger.info("EmailService", "Email sent", { to: params.to, subject: params.subject });
  } catch (err) {
    await emailLogRepository.markFailed(log.id, err instanceof Error ? err.message : "Unknown error");
    logger.error("EmailService", "Email failed", { to: params.to, error: err });
    throw err;
  }
}

/**
 * Reusable email service. The provider underneath is swappable (see
 * setEmailProvider) and every send is logged to email_logs regardless of
 * outcome, so delivery can be audited and retried later.
 */
export const emailService = {
  async sendRegistrationConfirmation(params: {
    registrationId: string;
    to: string;
    fullName: string;
    programTitle: string;
    cohortLabel: string;
    amountNaira: number;
    receiptNumber: string;
  }) {
    await dispatch({
      to: params.to,
      subject: `You're registered — ${params.programTitle}`,
      html: renderRegistrationConfirmationEmail({
        fullName: params.fullName,
        programTitle: params.programTitle,
        cohortLabel: params.cohortLabel,
        amountFormatted: formatNaira(params.amountNaira),
        receiptNumber: params.receiptNumber,
      }),
      registrationId: params.registrationId,
    });
  },

  async sendPaymentReceipt(params: {
    registrationId: string;
    to: string;
    fullName: string;
    amountNaira: number;
    receiptNumber: string;
  }) {
    await dispatch({
      to: params.to,
      subject: `Payment Receipt — ${params.receiptNumber}`,
      html: renderRegistrationConfirmationEmail({
        fullName: params.fullName,
        programTitle: "Payment Receipt",
        cohortLabel: "",
        amountFormatted: formatNaira(params.amountNaira),
        receiptNumber: params.receiptNumber,
      }),
      registrationId: params.registrationId,
    });
  },

  async sendAdminNotification(params: { subject: string; message: string }) {
    // Admin/internal notifications are always routed to the training inbox.
    const adminEmail = process.env.ADMIN_EMAIL ?? "training@mceltech.com";
    await dispatch({
      to: adminEmail,
      subject: params.subject,
      html: renderAdminNotificationEmail({ message: params.message }),
    });
  },
};
