import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ShieldCheck,
  Award,
  QrCode,
  CheckCircle2,
  Search,
  Lock,
  FileText,
  HelpCircle,
  Building2,
  CheckCircle,
  KeyRound,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { CertificateVerifier } from "@/components/certificate/CertificateVerifier";
import { verifyCertificateAction } from "@/actions/certificate";
import { SITE, getWhatsAppLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Verify Student Certificate | Official Credential Registry",
  description:
    "Instantly verify the authenticity of certificates and training credentials issued by M-CEL TECH by entering the student Registration Number.",
};

export const dynamic = "force-dynamic";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; reg?: string; ref?: string; code?: string }>;
}) {
  const params = await searchParams;
  const query = params.id || params.reg || params.ref || params.code || "";

  let initialCertificate = null;
  let initialError = null;

  if (query.trim()) {
    const result = await verifyCertificateAction(query.trim());
    if (result.success) {
      initialCertificate = result.certificate;
    } else {
      initialError = result.error;
    }
  }

  return (
    <div className="relative min-h-screen bg-bg-primary text-ink">
      <PageHero
        eyebrow="Official Credential Registry"
        title="Student Certificate Verification"
        description="Validate official M-CEL TECH digital certificates, bootcamps, and professional training credentials using the student Registration Number."
      />

      <section className="relative -mt-10 pb-24 md:pb-32">
        <Container>
          <Suspense
            fallback={
              <div className="mx-auto flex max-w-xl items-center justify-center p-12 text-center text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                  <span>Loading credential portal...</span>
                </div>
              </div>
            }
          >
            <CertificateVerifier
              initialQuery={query}
              initialCertificate={initialCertificate}
              initialError={initialError}
            />
          </Suspense>

          {/* Detailed Verification Information & Guide Grid */}
          <div className="mx-auto mt-20 max-w-5xl border-t border-white/10 pt-16">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Tamper-Resistant Verification Architecture</span>
              </div>
              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                How Certificate Verification Works
              </h3>
              <p className="mt-2 text-sm text-slate-400 max-w-xl mx-auto">
                Every certificate issued by M-CEL TECH is backed by an immutable registration record in our database.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]">
                  <KeyRound className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  1. Registration Number
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Every participant receives an assigned Registration Number formatted as <span className="font-mono text-cyan-300">REG-YYYY-XXXXXX</span> upon enrolment and completion.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                  <QrCode className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  2. QR Scanning
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Certificates feature an active dynamic QR code. Employers and evaluators can point any smartphone camera to open and inspect the live verification file.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="mt-4 text-base font-bold text-white">
                  3. Official Validation
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  The verification portal queries live academic databases to return full student credentials, completion date, program scope, and cryptographic signature.
                </p>
              </div>
            </div>

            {/* Assistance & Employer Verification Strip */}
            <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              <div>
                <h4 className="text-lg font-bold text-white">
                  Need Help Finding Your Registration Number?
                </h4>
                <p className="mt-1 text-xs text-slate-400 max-w-xl">
                  Check your original admission/enrolment email from M-CEL TECH, or contact the academic registry on WhatsApp with your payment reference or full name.
                </p>
              </div>
              <a
                href={getWhatsAppLink("Hello M-CEL TECH, I need assistance retrieving my student Registration Number for certificate verification.")}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 px-6 py-3 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25 transition-all shadow-md"
              >
                Contact Registry Support
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
