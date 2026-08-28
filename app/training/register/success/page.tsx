import type { Metadata } from "next";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { registrationRepository } from "@/lib/database/repositories/registration.repository";
import { formatNaira } from "@/lib/utils";
import { DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Registration Successful",
};

export const dynamic = "force-dynamic";

export default async function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const registration = ref
    ? await registrationRepository.findByPaymentReference(ref)
    : null;

  // findByPaymentReference doesn't include relations by default; fetch the
  // fuller record (with program/cohort/payment) once we have an id.
  const full = registration ? await registrationRepository.findById(registration.id) : null;
  const confirmed = full?.registrationStatus === "CONFIRMED";

  return (
    <section className="flex min-h-[70vh] items-center bg-bg-secondary py-20">
      <Container className="mx-auto max-w-lg text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-state-success/10 text-state-success">
          <CheckCircle2 className="h-8 w-8" />
        </span>

        <h1 className="mt-6 text-3xl font-bold text-ink">
          {confirmed ? "You're Registered!" : "Registration Received"}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-ink-muted/70">
          {confirmed
            ? `Thanks${full ? `, ${full.fullName.split(" ")[0]}` : ""}. A confirmation email with your details is on its way.`
            : "We're finalizing your payment confirmation. If this doesn't update shortly, contact us on WhatsApp with your reference."}
        </p>

        {full && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-bg-primary p-6 text-left shadow-card">
            <dl className="space-y-4 text-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3">
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted/60">Programme</dt>
                <dd className="font-semibold text-ink sm:text-right">{full.program.title}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3">
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted/60">Session</dt>
                <dd className="font-semibold text-ink sm:text-right">
                  {full.cohort.name}
                  {full.cohort.startTime ? ` (${full.cohort.startTime} – ${full.cohort.endTime})` : ""}
                </dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3">
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted/60">Amount Paid</dt>
                <dd className="font-bold text-cyan-400 sm:text-right text-base">
                  {formatNaira(Number(full.payment?.amount ?? 0))}
                </dd>
              </div>
              {full.receiptNumber && (
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-3">
                  <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted/60">Receipt No.</dt>
                  <dd className="font-mono text-xs font-semibold text-slate-200 sm:text-right">{full.receiptNumber}</dd>
                </div>
              )}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <dt className="text-xs font-bold uppercase tracking-wider text-ink-muted/60">Registration No.</dt>
                <dd className="font-mono text-xs font-semibold text-slate-200 sm:text-right">{full.registrationNumber}</dd>
              </div>
            </dl>
          </div>
        )}

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          {full?.registrationNumber && (
            <Button
              href={`/verify?id=${full.registrationNumber}`}
              variant="primary"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
            >
              Verify Certificate
            </Button>
          )}
          <Button href="/" variant="outline">
            Back to Home
          </Button>
          <Button
            href={getWhatsAppLink(
              `${DEFAULT_WHATSAPP_MESSAGE} My registration reference is ${ref ?? ""}.`
            )}
          >
            <MessageCircle className="h-4 w-4" />
            Chat With Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
