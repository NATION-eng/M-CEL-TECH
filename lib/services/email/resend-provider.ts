import "server-only";
import { Resend } from "resend";
import type { EmailProvider } from "@/lib/services/email/email-provider";

export function createResendProvider(): EmailProvider {
  return {
    async send({ to, subject, html }) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        throw new Error(
          "RESEND_API_KEY is not set. Add it to your environment variables before sending emails."
        );
      }
      const from = process.env.EMAIL_FROM ?? "M-CEL TECH <training@mceltech.com>";
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({ from, to, subject, html });
      if (result.error) throw new Error(result.error.message);
      return { id: result.data?.id ?? "" };
    },
  };
}
