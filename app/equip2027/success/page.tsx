import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageSquare, Building2, Copy, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { equipApplicationRepository } from "@/lib/database/repositories/equip-application.repository";
import {
  EQUIP_2027,
  getEquipWhatsAppLink,
  generateEquipWhatsAppOutreachMessage,
} from "@/constants/equip2027";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Application Confirmation — EQUIP 2027",
  description: "EQUIP 2027 CSR Subsidized Scholarship application status and enrollment verification.",
};

export default async function EquipSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const resolvedParams = await searchParams;
  const ref = resolvedParams?.ref?.trim();
  const application = ref ? await equipApplicationRepository.findByReference(ref) : null;

  const whatsappLink = application
    ? getEquipWhatsAppLink({
        fullName: application.fullName,
        conference: application.conference,
        localChurch: application.localChurch,
      })
    : `https://wa.me/${EQUIP_2027.corporateBank.accountNumber}`;

  return (
    <>
      <PageHero
        eyebrow="EQUIP 2027 • Application Status"
        title={application ? `Welcome, ${application.fullName}` : "Scholarship Application Received"}
        description="Your ₦10,000 subsidized scholarship application has been processed. Review your confirmation details below."
      />

      <section className="bg-bg-secondary py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto rounded-3xl border border-cyan-400/30 bg-slate-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <span className="block text-xs font-bold uppercase tracking-widest text-cyan-400">
                Official Scholarship Offer Active
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
                Application Successfully Logged
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Keep your reference code safe. Our enrollment coordinator is available on WhatsApp to assist with questions.
              </p>
            </div>

            {application ? (
              <>
                {/* Reference Code Card */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Your Application Reference Code
                  </p>
                  <p className="mt-2 text-3xl font-mono font-black tracking-wider text-cyan-300">
                    {application.referenceCode}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {application.conference} Conference • {application.localChurch}
                  </p>
                </div>

                {/* Details Summary */}
                <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/80 p-5 space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Applicant:</span>
                    <span className="font-semibold text-white">{application.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-semibold text-white">{application.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Allocated Seats:</span>
                    <span className="font-semibold text-white">
                      {application.slots} {application.slots > 1 ? "Slots (Bulk)" : "Slot"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold text-white">Subsidized Payable:</span>
                    <span className="text-xl font-black text-cyan-300">
                      {formatNaira(application.amountNaira)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              ref && (
                <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-500/10 p-5 text-center text-sm text-amber-200">
                  Reference: <span className="font-mono font-bold">{ref}</span>
                  <p className="mt-1 text-xs text-slate-400">
                    An email offer with bank payment details has been dispatched.
                  </p>
                </div>
              )
            )}

            {/* Corporate Bank Account Card */}
            <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-950/30 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-3">
                <Building2 className="h-4 w-4" />
                Corporate Wire Transfer Details
              </div>
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Bank:</span>
                  <span className="font-semibold text-white">{EQUIP_2027.corporateBank.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Account Name:</span>
                  <span className="font-semibold text-white">{EQUIP_2027.corporateBank.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Account Number:</span>
                  <span className="font-mono font-bold text-cyan-300">
                    {EQUIP_2027.corporateBank.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 text-xs">
                  <span className="text-slate-400">Narration:</span>
                  <span className="font-mono text-amber-300">
                    {EQUIP_2027.corporateBank.narrationPrefix}-{ref || "YOUR_NAME"}
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-6 py-4 text-center text-sm sm:text-base font-extrabold text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-500"
              >
                <MessageSquare className="h-5 w-5" />
                Connect with Enrollment Team on WhatsApp →
              </a>

              <Link
                href="/equip2027"
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-center text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to EQUIP 2027 Portal
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
