"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  ShieldCheck,
  Calendar,
  Laptop,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Building2,
  User,
  Mail,
  Phone,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  EQUIP_2027,
  calculateEquipPayable,
  calculateEquipSavings,
  type EquipConference,
  type EquipCategoryType,
  type EquipTrackType,
} from "@/constants/equip2027";
import {
  equipApplicationSchema,
  type EquipApplicationInput,
} from "@/lib/validators/equip2027.validator";
import { submitEquipApplicationAction, type EquipSubmissionSuccess } from "@/actions/equip2027";
import { formatNaira } from "@/lib/utils";

export function EquipApplicationForm() {
  const [submissionResult, setSubmissionResult] = useState<EquipSubmissionSuccess | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EquipApplicationInput>({
    resolver: zodResolver(equipApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      conference: "Port Harcourt West",
      localChurch: "",
      category: "UNIVERSITY_STUDENT",
      slots: 1,
      track: "ONLINE_EVENING",
      hasDevice: true,
      notes: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedSlots = watch("slots") || 1;
  const isSponsor = selectedCategory === "SPONSOR";
  const effectiveSlots = isSponsor ? Math.max(1, selectedSlots) : 1;
  const payableAmount = calculateEquipPayable(effectiveSlots);
  const savings = calculateEquipSavings(effectiveSlots);

  async function onSubmit(data: EquipApplicationInput) {
    setServerError(null);
    try {
      const result = await submitEquipApplicationAction({
        ...data,
        slots: effectiveSlots,
      });

      if (!result.success) {
        setServerError(result.error);
        return;
      }

      setSubmissionResult(result.data);
      // Navigate to confirmation page with reference code
      window.location.href = `/equip2027/success?ref=${encodeURIComponent(result.data.referenceCode)}`;
    } catch (err: any) {
      setServerError(err?.message || "Failed to submit application. Please try again.");
    }
  }

  function onInvalid(formErrors: any) {
    const errorList = Object.values(formErrors) as Array<{ message?: string } | undefined>;
    if (errorList.length > 0) {
      const firstMessage = errorList[0]?.message;
      setServerError(
        typeof firstMessage === "string"
          ? firstMessage
          : "Please complete all required fields marked with an asterisk (*)."
      );
      const el = document.getElementById("form-error-banner");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleCopyReference(ref: string) {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  }

  function handleCopyAccount(acc: string) {
    navigator.clipboard.writeText(acc);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2500);
  }

  // ── Success State View ──────────────────────────────────────────────
  if (submissionResult) {
    return (
      <div className="w-full max-w-2xl mx-auto rounded-2xl border border-cyan-400/30 bg-slate-950/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl animate-fade-in">
        {/* Header Icon */}
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-4 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
            <CheckCircle2 className="h-9 w-9" />
          </div>
          <span className="block text-xs font-bold uppercase tracking-widest text-cyan-400">
            Step 1 Completed • Scholarship Offer Issued
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            Application Received, {submissionResult.fullName}!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300">
            Please check your email inbox (<strong>{submissionResult.email}</strong>) — we have reached out to you on your mail with your official ₦10,000 subsidized scholarship offer and corporate payment details!
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
            Check your inbox & spam/promotions folder
          </div>
        </div>

        {/* Reference Code Card */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Your Official Application Reference
          </p>
          <div className="mt-2 flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-cyan-300">
              {submissionResult.referenceCode}
            </span>
            <button
              onClick={() => handleCopyReference(submissionResult.referenceCode)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold text-cyan-300 transition-colors hover:bg-cyan-500/20"
              title="Copy Reference"
            >
              <Copy className="h-3.5 w-3.5" />
              {copiedRef ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            {submissionResult.conference} Conference • {submissionResult.localChurch}
          </p>
        </div>

        {/* Pricing Summary */}
        <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/80 p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-sm text-slate-400">Assigned Track</span>
            <span className="text-sm font-semibold text-white">{submissionResult.trackLabel}</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 py-3">
            <span className="text-sm text-slate-400">Allocated Seats</span>
            <span className="text-sm font-semibold text-white">
              {submissionResult.slots} {submissionResult.slots > 1 ? "Slots (Bulk)" : "Slot"}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div>
              <span className="text-base font-bold text-white">Subsidized Total</span>
              <p className="text-xs text-emerald-400">
                You save ₦{(submissionResult.slots * 10000).toLocaleString()} (50% CSR Grant · Std ₦20,000/seat)
              </p>
            </div>
            <span className="text-2xl font-black text-cyan-300">
              {formatNaira(submissionResult.amountNaira)}
            </span>
          </div>
        </div>

        {/* Corporate Bank Transfer Details */}
        <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-950/30 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-300 mb-3">
            <Building2 className="h-4 w-4" />
            Official Corporate Bank Account (Direct Transfer)
          </div>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Bank:</span>
              <span className="font-semibold text-white">{EQUIP_2027.corporateBank.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Account Name:</span>
              <span className="font-semibold text-white">{EQUIP_2027.corporateBank.accountName}</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400">Account Number:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-cyan-300">
                  {EQUIP_2027.corporateBank.accountNumber}
                </span>
                <button
                  onClick={() => handleCopyAccount(EQUIP_2027.corporateBank.accountNumber)}
                  className="rounded border border-white/20 bg-white/5 px-2 py-1 text-xs text-slate-300 hover:bg-white/10"
                >
                  {copiedAccount ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-2 text-xs">
              <span className="text-slate-400">Narration:</span>
              <span className="font-mono text-amber-300">
                {EQUIP_2027.corporateBank.narrationPrefix}-{submissionResult.referenceCode}
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3">
          {/* WhatsApp Direct Cadence Button */}
          <a
            href={submissionResult.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-6 py-4 text-center text-sm sm:text-base font-extrabold text-white shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-500 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]"
          >
            <MessageSquare className="h-5 w-5" />
            Connect with Enrollment Team on WhatsApp →
          </a>

          {/* Paystack Online Payment (if available) */}
          {submissionResult.paymentUrl && (
            <a
              href={submissionResult.paymentUrl}
              className="flex items-center justify-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-3.5 text-center text-sm font-bold text-cyan-300 transition-colors hover:bg-cyan-500/20"
            >
              <ExternalLink className="h-4 w-4" />
              Pay Subsidized Fee Online via Paystack ({formatNaira(submissionResult.amountNaira)})
            </a>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Our Enrollment Team will review your church allocation and verify your seat within 24 hours.
        </p>
      </div>
    );
  }

  // ── Form View ───────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      className="w-full max-w-3xl mx-auto rounded-2xl border border-white/10 bg-slate-950/80 p-5 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl"
    >
      {/* Real-time Subsidized Pricing Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            EQUIP 2027 CSR Subsidized Scholarship
          </div>
          <div className="mt-1.5 flex items-baseline gap-3">
            <span className="text-3xl font-black text-white">{formatNaira(payableAmount)}</span>
            <span className="text-sm text-slate-400 line-through">
              ₦{(20000 * effectiveSlots).toLocaleString()}
            </span>
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
              50% OFF · Save {formatNaira(savings.savedAmount)}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            ₦10,000 subsidized per slot • Kickoff {EQUIP_2027.kickoffDate}
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />
          Verified Conference CSR Grant
        </div>
      </div>

      {serverError && (
        <div id="form-error-banner" className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300 flex items-start gap-2.5">
          <span className="shrink-0 font-bold">⚠️</span>
          <span>{serverError}</span>
        </div>
      )}

      {/* Field Group 1: Personal Contact */}
      <div className="mt-8">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
          <User className="h-4 w-4 text-cyan-400" />
          1. Applicant Information
        </h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Full Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Samuel Okon"
              {...register("fullName")}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Email Address <span className="text-cyan-400">*</span>
            </label>
            <input
              type="email"
              placeholder="samuel@email.com"
              {...register("email")}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              WhatsApp Phone Number <span className="text-cyan-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="+234 800 000 0000"
              {...register("phone")}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Field Group 2: Church / Conference Affiliation */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
          <Building2 className="h-4 w-4 text-cyan-400" />
          2. Conference & Church Affiliation
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Select your conference to apply the approved CSR subsidy rate.
        </p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Approved Conference <span className="text-cyan-400">*</span>
            </label>
            <select
              {...register("conference")}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            >
              {EQUIP_2027.conferences.map((conf) => (
                <option key={conf} value={conf}>
                  {conf} Conference
                </option>
              ))}
            </select>
            {errors.conference && (
              <p className="mt-1 text-xs text-red-400">{errors.conference.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              Local Church / District Name <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Rumuokwuta Church, PH West"
              {...register("localChurch")}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            {errors.localChurch && (
              <p className="mt-1 text-xs text-red-400">{errors.localChurch.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Field Group 3: Category & Slot Allocation */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
          <BookOpen className="h-4 w-4 text-cyan-400" />
          3. Category & Seat Sponsorship
        </h3>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EQUIP_2027.categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex cursor-pointer flex-col rounded-xl border p-4 transition-all ${
                selectedCategory === cat.id
                  ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  : "border-white/10 bg-slate-900/60 hover:border-white/20 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white">{cat.label}</span>
                <input
                  type="radio"
                  value={cat.id}
                  {...register("category")}
                  className="h-4 w-4 text-cyan-400 focus:ring-cyan-400"
                />
              </div>
              <p className="mt-1.5 text-xs text-slate-400">{cat.description}</p>
            </label>
          ))}
        </div>

        {/* Sponsor Slot Tier Selector */}
        {isSponsor && (
          <div className="mt-5 rounded-xl border border-cyan-400/30 bg-cyan-950/20 p-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-300">
              Bulk Seat Sponsorship Quantity
            </label>
            <p className="mt-1 text-xs text-slate-400">
              Formula: slots × ₦10,000. Choose a tier or enter custom seats.
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {EQUIP_2027.sponsorSlots.map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setValue("slots", num)}
                  className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    selectedSlots === num
                      ? "bg-cyan-400 text-slate-950 shadow-md"
                      : "border border-white/20 bg-slate-900 text-white hover:border-cyan-400/50"
                  }`}
                >
                  {num} Seats ({formatNaira(num * 10000)})
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-xs text-slate-300">Custom Slots:</span>
              <input
                type="number"
                min={1}
                max={500}
                {...register("slots")}
                className="w-24 rounded-lg border border-white/20 bg-slate-900 px-3 py-1.5 text-sm font-bold text-white focus:border-cyan-400 focus:outline-none"
              />
              <span className="text-xs font-semibold text-cyan-300">
                Total: {formatNaira(calculateEquipPayable(selectedSlots))}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Field Group 4: Track Selection */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-200">
          <Calendar className="h-4 w-4 text-cyan-400" />
          4. Preferred Learning Track
        </h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {EQUIP_2027.tracks.map((track) => (
            <label
              key={track.id}
              className={`flex cursor-pointer flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all ${
                watch("track") === track.id
                  ? "border-cyan-400 bg-cyan-950/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  : "border-white/10 bg-slate-900/60 hover:border-white/20 hover:bg-slate-900"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">{track.fullTitle}</span>
                  <input
                    type="radio"
                    value={track.id}
                    {...register("track")}
                    className="h-4 w-4 text-cyan-400 focus:ring-cyan-400"
                  />
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded bg-white/5 px-2 py-0.5 text-xs font-semibold text-cyan-300">
                  {track.duration}
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">{track.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/5 text-[11px] text-slate-500 font-medium">
                {track.mode}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Field Group 5: Device Readiness & Notes */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              {...register("hasDevice")}
              className="mt-1 h-4 w-4 rounded border-white/30 text-cyan-400 focus:ring-cyan-400"
            />
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Laptop className="h-4 w-4 text-cyan-400" />
                Device Readiness Confirmation
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                I confirm that I have a laptop or any device available to me for hands-on sessions.
              </p>
            </div>
          </label>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-xs font-semibold text-slate-300">
            Special Requests / Sponsorship Notes (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Any specific questions, church youth group details, or track preference remarks..."
            {...register("notes")}
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Submit Section */}
      <div className="mt-8 border-t border-white/10 pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Application & Reserving CSR Offer...
            </>
          ) : (
            `Submit Application & Claim ₦10,000 Offer (${formatNaira(payableAmount)}) →`
          )}
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
          <span>Secure Application: No immediate charge. You will instantly receive an official offer letter with bank transfer & online payment options.</span>
        </p>
      </div>
    </form>
  );
}
