"use client";

import { useState, useEffect, useTransition, useId } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Printer,
  Copy,
  Check,
  Calendar,
  Award,
  ExternalLink,
  Building2,
  Sparkles,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import {
  verifyCertificateAction,
  type VerifiedCertificate,
} from "@/actions/certificate";
import { generateQRCodeDataURL } from "@/lib/utils/qrcode";
import { Button } from "@/components/ui/Button";

interface CertificateVerifierProps {
  initialQuery?: string;
  initialCertificate?: VerifiedCertificate | null;
  initialError?: string | null;
}

export function CertificateVerifier({
  initialQuery = "",
  initialCertificate = null,
  initialError = null,
}: CertificateVerifierProps) {
  const searchParams = useSearchParams();
  const inputId = useId();
  const [query, setQuery] = useState(initialQuery);
  const [certificate, setCertificate] = useState<VerifiedCertificate | null>(
    initialCertificate
  );
  const [error, setError] = useState<string | null>(initialError);
  const [isPending, startTransition] = useTransition();
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // If URL has `?id=` or `?ref=` on load and initial was not passed, verify automatically
  useEffect(() => {
    const urlId = searchParams.get("id") || searchParams.get("ref") || searchParams.get("code");
    if (urlId && !initialCertificate) {
      setQuery(urlId);
      performVerification(urlId);
    }
  }, [searchParams]);

  // Generate QR code data URL whenever a certificate is loaded
  useEffect(() => {
    if (certificate) {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}/verify?id=${encodeURIComponent(certificate.certificateId)}`
          : certificate.verificationUrl;

      generateQRCodeDataURL(url, {
        width: 260,
        margin: 1,
        color: { dark: "#0f172a", light: "#ffffff" },
      })
        .then(setQrCodeDataUrl)
        .catch((err) => console.error("QR Code rendering error", err));
    } else {
      setQrCodeDataUrl(null);
    }
  }, [certificate]);

  const performVerification = (searchQuery: string) => {
    const clean = searchQuery.trim();
    if (!clean) return;

    setError(null);
    startTransition(async () => {
      const result = await verifyCertificateAction(clean);
      if (result.success) {
        setCertificate(result.certificate);
        setError(null);
      } else {
        setCertificate(null);
        setError(result.error);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performVerification(query);
  };

  const handleCopyLink = () => {
    if (!certificate) return;
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/verify?id=${encodeURIComponent(certificate.certificateId)}`
        : certificate.verificationUrl;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="w-full">
      {/* Search Header Form */}
      <div className="relative mx-auto max-w-2xl text-center">
        <form onSubmit={handleSubmit} className="relative mt-2">
          <div className="relative flex items-center">
            <input
              id={inputId}
              name="certificateQuery"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. MCEL-2026-000001 or REG-2026-000001"
              aria-label="Certificate ID or Registration Number"
              className="w-full rounded-2xl border border-white/20 bg-slate-900/90 px-5 py-4.5 pl-12 pr-36 text-base font-medium text-white shadow-2xl backdrop-blur-xl transition-all placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
            />
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-cyan-400" />
            <button
              type="submit"
              disabled={isPending || !query.trim()}
              className="absolute right-2 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Checking...</span>
                </div>
              ) : (
                <>
                  <span>Verify</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Sample / Test Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
          <span>Try quick demo IDs:</span>
          <button
            type="button"
            onClick={() => {
              setQuery("MCEL-2026-000001");
              performVerification("MCEL-2026-000001");
            }}
            className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-cyan-300 transition-colors hover:bg-cyan-500/20"
          >
            MCEL-2026-000001
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery("MCEL-2026-DEMO");
              performVerification("MCEL-2026-DEMO");
            }}
            className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 font-mono text-blue-300 transition-colors hover:bg-blue-500/20"
          >
            MCEL-2026-DEMO
          </button>
        </div>
      </div>

      {/* Error state */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center backdrop-blur-md"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h3 className="mt-3 text-lg font-bold text-red-200">
              Verification Failed
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-red-300/80">{error}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button
                href="/contact"
                variant="outline"
                size="sm"
                className="border-red-500/40 text-red-300 hover:bg-red-500/20"
              >
                <HelpCircle className="h-4 w-4 mr-1.5" />
                Contact Support
              </Button>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setError(null);
                }}
                className="text-xs font-semibold text-slate-400 underline hover:text-white px-3 py-2"
              >
                Clear Search
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Verified Certificate Card */}
      <AnimatePresence>
        {certificate && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-10 max-w-3xl"
          >
            {/* Top Verification Status Banner */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 px-6 py-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black uppercase tracking-wider text-emerald-400">
                      Official Certificate Verified
                    </span>
                    <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      AUTHENTIC RECORD
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200/70">
                    Validated against M-CEL TECH official registry
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700 hover:text-white"
                  title="Copy verification link"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Share Link</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/20"
                  title="Print verification document"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>

            {/* The Certificate Verification Slip Document */}
            <div
              id="certificate-print-area"
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 p-8 shadow-2xl backdrop-blur-2xl md:p-10"
            >
              {/* Background ambient lighting */}
              <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

              {/* Security Guilloche Grid Border */}
              <div className="pointer-events-none absolute inset-2 rounded-2xl border border-dashed border-cyan-500/20" />

              {/* Header: Issuer Brand */}
              <div className="relative flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 font-black text-white shadow-lg">
                      M
                    </span>
                    <div>
                      <h2 className="text-xl font-black tracking-tight text-white">
                        M-CEL TECH
                      </h2>
                      <p className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
                        Digital Credential Verification
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-800/60 px-4 py-2.5 text-right sm:text-right">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Credential ID
                  </div>
                  <div className="font-mono text-sm font-bold text-cyan-300">
                    {certificate.certificateId}
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="relative mt-8">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  This Certifies That
                </span>
                <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl text-gradient-cyan">
                  {certificate.studentName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  has successfully completed all required training modules,
                  assessments, and hands-on projects for:
                </p>
              </div>

              {/* Programme Details Box */}
              <div className="relative mt-6 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-cyan-500/20 p-3 text-cyan-400 shrink-0 mt-1">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-black text-white">
                      {certificate.programTitle}
                    </h4>
                    {certificate.programDescription && (
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300">
                        {certificate.programDescription}
                      </p>
                    )}

                    {/* Highlights */}
                    {certificate.curriculumHighlights &&
                      certificate.curriculumHighlights.length > 0 && (
                        <div className="mt-4 border-t border-cyan-500/20 pt-3">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                            Core Competencies Covered:
                          </span>
                          <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-xs text-slate-300">
                            {certificate.curriculumHighlights.map((item, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Credential Attributes Grid */}
              <div className="relative mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5 sm:grid-cols-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cohort / Term
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white">
                    {certificate.cohortName}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Training Mode
                  </div>
                  <div className="mt-1 text-xs font-semibold text-cyan-400">
                    {certificate.trainingMode}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Issue Date
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white">
                    {certificate.issueDate}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Registration No.
                  </div>
                  <div className="mt-1 font-mono text-xs font-semibold text-slate-300">
                    {certificate.registrationNumber}
                  </div>
                </div>
              </div>

              {/* Footer: QR Code & Verification Seal */}
              <div className="relative mt-8 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 sm:flex-row">
                <div className="flex items-center gap-4">
                  {qrCodeDataUrl ? (
                    <div className="rounded-xl border border-white/20 bg-white p-1.5 shadow-md">
                      <Image
                        src={qrCodeDataUrl}
                        alt={`QR Code verification for ${certificate.certificateId}`}
                        width={90}
                        height={90}
                        className="h-[80px] w-[80px] rounded-lg"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex h-[80px] w-[80px] items-center justify-center rounded-xl bg-slate-800 text-slate-500">
                      <QrCode className="h-8 w-8" />
                    </div>
                  )}
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      Scan to Verify
                    </span>
                    <p className="mt-0.5 text-xs text-slate-400 max-w-[220px]">
                      Anyone can scan this QR code to view this live verification record.
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right">
                  <div className="flex items-center justify-center gap-1.5 sm:justify-end text-emerald-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Verified Issuer
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-medium text-slate-300">
                    {certificate.issuer} Academic Registry
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {certificate.issuerAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Next step / Enroll CTA */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-6 text-center backdrop-blur-md">
              <h4 className="text-base font-bold text-white">
                Looking to build in-demand digital & tech skills?
              </h4>
              <p className="mt-1 text-xs text-slate-400">
                Explore our current professional cohorts in AI, Software Engineering, and Enterprise Technology.
              </p>
              <div className="mt-4 flex justify-center gap-3">
                <Button href="/training" variant="primary" size="sm">
                  <BookOpen className="h-4 w-4 mr-1.5" />
                  View Bootcamps & Training
                </Button>
                <Button href="/training/register" variant="secondary" size="sm">
                  Register for Upcoming Cohort
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
