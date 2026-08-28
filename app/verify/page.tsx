import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Award, QrCode, CheckCircle, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { CertificateVerifier } from "@/components/certificate/CertificateVerifier";
import { verifyCertificateAction } from "@/actions/certificate";

export const metadata: Metadata = {
  title: "Verify Certificate | Official Credential Registry",
  description:
    "Verify the authenticity of certificates, diplomas, and training credentials issued by M-CEL TECH.",
};

export const dynamic = "force-dynamic";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; ref?: string; code?: string }>;
}) {
  const params = await searchParams;
  const query = params.id || params.ref || params.code || "";

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
        title="Verify Certificate Authenticity"
        description="Instantly validate official training certificates, digital credentials, and bootcamp completions issued by M-CEL TECH."
      />

      <section className="relative -mt-10 pb-24 md:pb-32">
        <Container>
          <Suspense
            fallback={
              <div className="mx-auto flex max-w-xl items-center justify-center p-12 text-center text-slate-400">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
                  <span>Loading verification portal...</span>
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

          {/* Verification Assurance & Information Cards */}
          <div className="mx-auto mt-20 max-w-4xl border-t border-white/10 pt-12">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">
                How Certificate Verification Works
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                M-CEL TECH uses tamper-evident digital tracking for every issued credential.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Search className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-white">
                  1. Enter Credential ID
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  Input the unique Certificate ID or Registration Number printed on the certificate document.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <QrCode className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-white">
                  2. QR Code Scanning
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  Employers and evaluators can scan the QR code directly using any smartphone camera for instant validation.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h4 className="mt-3 text-sm font-bold text-white">
                  3. Verified Authenticity
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  The system queries real-time official graduation records to verify recipient name, curriculum, and completion status.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
