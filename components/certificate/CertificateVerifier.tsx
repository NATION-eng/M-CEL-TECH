"use client";

import { useState, useEffect, useTransition, useId } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Award,
  ArrowRight,
  HelpCircle,
  Lock,
  GraduationCap,
  BadgeCheck,
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

  // If URL has `?id=` or `?ref=` or `?reg=` on load and initial was not passed, verify automatically
  useEffect(() => {
    const urlId =
      searchParams.get("id") ||
      searchParams.get("reg") ||
      searchParams.get("ref") ||
      searchParams.get("code");
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
          ? `${window.location.origin}/verify?id=${encodeURIComponent(certificate.registrationNumber)}`
          : certificate.verificationUrl;

      generateQRCodeDataURL(url, {
        width: 280,
        margin: 1,
        color: { dark: "#060d1f", light: "#ffffff" },
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

  return (
    <div className="w-full">
      {/* Search Input Card */}
      <div className="no-print relative mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          {/* Subtle Cyber Grid & Lighting Effect */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-600/15 blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300">
              <Lock className="h-3.5 w-3.5 text-cyan-400" />
              <span>Official Academic Registry Verification</span>
            </div>

            <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">
              Enter Student Registration Number
            </h2>
            <p className="mt-1.5 text-xs text-slate-400 sm:text-sm">
              Enter your assigned <span className="font-semibold text-cyan-300">Registration Number</span> (found in your confirmation email or student record) to verify your certificate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative mt-6">
            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <input
                  id={inputId}
                  name="registrationNumber"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. REG-2026-000001"
                  aria-label="Student Registration Number"
                  className="w-full rounded-2xl border border-white/20 bg-slate-950/80 px-5 py-4 pl-12 font-mono text-base font-bold uppercase tracking-wider text-white shadow-inner backdrop-blur-xl transition-all placeholder:font-sans placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-500 focus:border-cyan-400 focus:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 sm:text-lg"
                />
                <GraduationCap className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-400" />
              </div>

              <button
                type="submit"
                disabled={isPending || !query.trim()}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 px-8 text-base font-black uppercase tracking-wider text-white shadow-[0_0_25px_rgba(34,211,238,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <>
                    <span>Verify Record</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Registration Numbers */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-400">
            <span className="font-medium">Quick Test Numbers:</span>
            <button
              type="button"
              onClick={() => {
                setQuery("REG-2026-000001");
                performVerification("REG-2026-000001");
              }}
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono font-bold text-cyan-300 transition-all hover:bg-cyan-500/25 hover:border-cyan-400"
            >
              REG-2026-000001
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("REG-2026-000002");
                performVerification("REG-2026-000002");
              }}
              className="rounded-lg border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 font-mono font-bold text-blue-300 transition-all hover:bg-blue-500/25 hover:border-blue-400"
            >
              REG-2026-000002
            </button>
            <button
              type="button"
              onClick={() => {
                setQuery("REG-2026-000003");
                performVerification("REG-2026-000003");
              }}
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono font-bold text-emerald-300 transition-all hover:bg-emerald-500/25 hover:border-emerald-400"
            >
              REG-2026-000003
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="no-print mx-auto mt-8 max-w-xl rounded-3xl border border-red-500/30 bg-red-950/40 p-6 text-center backdrop-blur-xl shadow-2xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-red-200">
              Registration Record Not Found
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-red-300/80">{error}</p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="/contact"
                variant="outline"
                size="sm"
                className="border-red-500/40 text-red-300 hover:bg-red-500/20"
              >
                <HelpCircle className="h-4 w-4 mr-1.5" />
                Contact Academic Registry
              </Button>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setError(null);
                }}
                className="rounded-xl border border-white/10 bg-slate-800/80 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:text-white"
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
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-10 max-w-4xl"
          >
            {/* Top Verification Status Bar */}
            <div className="no-print mb-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-emerald-950/60 px-6 py-4 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <div className="flex items-center gap-3.5">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <ShieldCheck className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black uppercase tracking-wider text-emerald-400">
                      Authentic Certificate Verified
                    </span>
                    <span className="hidden sm:inline-block rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-[10px] font-black tracking-wider text-emerald-300">
                      LIVE REGISTRY
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200/70">
                    Registration No: <span className="font-mono font-bold text-white">{certificate.registrationNumber}</span> • Status: <span className="font-semibold text-emerald-400">Active & Valid</span>
                  </p>
                </div>
              </div>
            </div>

            {/* The Master Certificate Verification Document */}
            <div
              id="certificate-print-area"
              className="relative overflow-hidden rounded-3xl border-2 border-cyan-500/30 bg-gradient-to-b from-[#080d1a] via-[#0b1329] to-[#060a14] p-7 shadow-2xl backdrop-blur-2xl md:p-12"
            >
              {/* Luxury Guilloche Security Background & Corner Ornaments */}
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-cyan-500/30" />
              <div className="pointer-events-none absolute inset-5 rounded-xl border border-white/5" />

              {/* Watermark Crest */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
                <GraduationCap className="h-[450px] w-[450px] text-white" />
              </div>

              {/* Top Certificate Header */}
              <div className="relative flex flex-col items-center justify-between gap-6 border-b border-cyan-500/20 pb-8 sm:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 font-black text-2xl text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                    M
                  </div>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-white">
                      M-CEL TECH
                    </h2>
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                      Academic & Professional Training Directorate
                    </p>
                  </div>
                </div>

                {/* Registration & Credential Stamp Badge */}
                <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 px-5 py-3 text-center sm:text-right">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Student Registration Number
                  </div>
                  <div className="font-mono text-base font-black text-cyan-300">
                    {certificate.registrationNumber}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    ID: {certificate.certificateId}
                  </div>
                </div>
              </div>

              {/* Certificate Formal Title */}
              <div className="relative mt-10 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-cyan-300">
                  <BadgeCheck className="h-4 w-4 text-cyan-400" />
                  <span>Certificate of Professional Completion & Excellence</span>
                </div>

                <div className="mt-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                  This is to officially certify that
                </div>

                {/* Recipient Full Name */}
                <h3 className="mt-2 text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 sm:text-4xl md:text-5xl">
                  {certificate.studentName}
                </h3>

                <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
                  has successfully fulfilled all curriculum requirements, practical capstone projects, and rigorous technical evaluations for the professional programme:
                </p>
              </div>

              {/* Programme Title Banner */}
              <div className="relative mt-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-cyan-950/30 to-slate-900/90 p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 shadow-inner">
                    <Award className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xl font-black text-white sm:text-2xl">
                        {certificate.programTitle}
                      </h4>
                      {certificate.grade && (
                        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                          {certificate.grade}
                        </span>
                      )}
                    </div>
                    {certificate.programDescription && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {certificate.programDescription}
                      </p>
                    )}
                  </div>
                </div>

                {/* Core Competencies Checklist */}
                {certificate.curriculumHighlights &&
                  certificate.curriculumHighlights.length > 0 && (
                    <div className="mt-5 border-t border-cyan-500/20 pt-4">
                      <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
                        Demonstrated Competencies & Core Modules:
                      </span>
                      <ul className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-300">
                        {certificate.curriculumHighlights.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              {/* Metadata Details Matrix */}
              <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-left">
                <div className="border-r border-white/5 pr-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Registration No.
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-cyan-300">
                    {certificate.registrationNumber}
                  </div>
                </div>
                <div className="sm:border-r sm:border-white/5 sm:pr-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Training Mode
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white">
                    {certificate.trainingMode}
                  </div>
                </div>
                <div className="border-r border-white/5 pr-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Cohort Session
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white">
                    {certificate.cohortName}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Date of Issuance
                  </div>
                  <div className="mt-1 text-xs font-semibold text-white">
                    September 30, 2026
                  </div>
                </div>
              </div>

              {/* Signatories & Holographic Cryptographic Seal */}
              <div className="relative mt-10 grid grid-cols-1 gap-8 border-t border-cyan-500/20 pt-8 sm:grid-cols-3 items-center">
                {/* QR Code & Mobile Verification */}
                <div className="flex items-center gap-4">
                  {qrCodeDataUrl ? (
                    <div className="rounded-2xl border-2 border-white/30 bg-white p-1.5 shadow-xl">
                      <Image
                        src={qrCodeDataUrl}
                        alt={`QR Code verification for Reg No ${certificate.registrationNumber}`}
                        width={100}
                        height={100}
                        className="h-[90px] w-[90px] rounded-xl"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="flex h-[90px] w-[90px] items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
                      <QrCode className="h-10 w-10" />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-cyan-400">
                      Scan To Authenticate
                    </span>
                    <p className="mt-1 text-[11px] text-slate-400 max-w-[160px]">
                      Point phone camera to verify this record live on mceltech.com
                    </p>
                  </div>
                </div>

                {/* Signatory 1 */}
                <div className="text-center sm:text-left border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                  <div className="font-serif italic text-base text-cyan-200 tracking-wider">
                    {certificate.signatories[0]?.name}
                  </div>
                  <div className="mt-1 text-xs font-bold text-white">
                    {certificate.signatories[0]?.title}
                  </div>
                </div>

                {/* Signatory 2 & Official Seal */}
                <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                  <div className="font-serif italic text-base text-cyan-200 tracking-wider">
                    {certificate.signatories[1]?.name}
                  </div>
                  <div className="mt-1 text-xs font-bold text-white">
                    {certificate.signatories[1]?.title}
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash Trail */}
              <div className="relative mt-8 border-t border-white/10 pt-4 text-center">
                <p className="font-mono text-[9px] text-slate-500 tracking-wider">
                  CRYPTOGRAPHIC REGISTRY SIGNATURE: {certificate.verificationHash} • VERIFIED ISSUER: {certificate.issuer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
