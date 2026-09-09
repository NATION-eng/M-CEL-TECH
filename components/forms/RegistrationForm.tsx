"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, CalendarClock, Clock3, Tag, Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registerForBootcamp, checkPromoCodeAction } from "@/actions/registration";
import {
  registrationFormSchema,
  type RegistrationFormValues,
} from "@/lib/validators/registration.validator";
import { formatNaira } from "@/lib/utils";
import type { CohortSummary } from "@/types/cohort";

const fields: {
  name: keyof Omit<RegistrationFormValues, "cohortId" | "promoCode" | "referralCode">;
  label: string;
  placeholder: string;
  type: string;
}[] = [
  { name: "fullName", label: "Full Name", placeholder: "e.g. Amaka Johnson", type: "text" },
  { name: "email", label: "Email Address", placeholder: "you@email.com", type: "email" },
  { name: "phone", label: "Phone Number", placeholder: "+234 800 000 0000", type: "tel" },
  { name: "organization", label: "Organization (optional)", placeholder: "Company or institution", type: "text" },
];

/**
 * Single-cohort model — there's one Evening Class cohort, so there's
 * nothing to choose. The cohort id is set automatically (hidden field)
 * rather than shown as a picker with one option.
 */
export function RegistrationForm({
  cohorts,
  price,
  referralCode,
}: {
  cohorts: CohortSummary[];
  initialCohortId?: string;
  price: number;
  referralCode?: string;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    finalPrice: number;
    label: string;
    isFree: boolean;
  } | null>(null);

  const cohort = cohorts[0];
  const cohortId = cohort?.id ?? "";

  const finalPrice = appliedPromo ? appliedPromo.finalPrice : price;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      cohortId,
      promoCode: "",
      referralCode: referralCode || "",
    },
  });

  async function handleApplyPromo() {
    if (!promoInput.trim()) {
      setPromoError("Please enter a promo code.");
      return;
    }

    setPromoError(null);
    setIsCheckingPromo(true);

    try {
      const result = await checkPromoCodeAction(promoInput);
      if (result.isValid) {
        setAppliedPromo({
          code: result.code,
          finalPrice: result.finalPrice,
          label: result.label,
          isFree: result.isFree,
        });
        setValue("promoCode", result.code);
        setPromoError(null);
      } else {
        setPromoError(result.error);
        setAppliedPromo(null);
        setValue("promoCode", "");
      }
    } catch {
      setPromoError("Could not validate promo code. Please try again.");
    } finally {
      setIsCheckingPromo(false);
    }
  }

  function handleRemovePromo() {
    setAppliedPromo(null);
    setPromoInput("");
    setPromoError(null);
    setValue("promoCode", "");
  }

  async function onSubmit(values: RegistrationFormValues) {
    setServerError(null);
    const result = await registerForBootcamp({
      ...values,
      promoCode: appliedPromo?.code || values.promoCode || "",
      referralCode: referralCode || values.referralCode || "",
    });

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    if (result.data.isFree) {
      window.location.href = "/training/register/success";
      return;
    }

    if (result.data.authorizationUrl) {
      window.location.href = result.data.authorizationUrl;
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-md border border-white/8 bg-bg-primary p-7 shadow-card md:p-9"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="text-sm font-medium text-ink-muted/60">
            {appliedPromo ? "Total Payable" : "Registration Fee"}
          </p>
          <div className="flex items-baseline gap-2.5">
            <p className="text-2xl font-bold text-ink">{formatNaira(finalPrice)}</p>
            {appliedPromo && (
              <span className="text-sm text-ink-muted/50 line-through">
                {formatNaira(price)}
              </span>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-state-success/10 px-3 py-1.5 text-xs font-semibold text-state-success">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secured by Paystack
        </span>
      </div>

      {cohort && (
        <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted/60">
            Training Schedule
          </p>
          <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink">
            <span className="flex items-center gap-1.5">
              <CalendarClock className="h-4 w-4 text-accent-cyan" />
              Date: Sep 16 – Sep 30, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-accent-cyan" />
              {cohort.startTime && cohort.endTime
                ? `${cohort.startTime} – ${cohort.endTime}`
                : "7:00 PM – 9:00 PM"}
            </span>
          </div>
        </div>
      )}
      <input type="hidden" {...register("cohortId")} />
      <input type="hidden" {...register("promoCode")} />
      <input type="hidden" {...register("referralCode")} />
      {errors.cohortId && <p className="mt-2 text-sm text-state-error">{errors.cohortId.message}</p>}

      <div className="mt-6 flex flex-col gap-5">
        {fields.map((field) => (
          <div key={field.name}>
            <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-ink">
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholder}
              aria-invalid={!!errors[field.name]}
              aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
              className="h-11 w-full rounded-lg border border-white/15 bg-bg-secondary px-3.5 text-sm text-ink placeholder:text-ink-muted/40 focus-visible:border-accent"
              {...register(field.name)}
            />
            {errors[field.name] && (
              <p id={`${field.name}-error`} className="mt-1.5 text-sm text-state-error">
                {errors[field.name]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Promo Code Section */}
      <div className="mt-6 border-t border-white/10 pt-5">
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-muted/80">
          <Tag className="h-3.5 w-3.5 text-accent-cyan" />
          Have a Promo Code?
        </label>

        {appliedPromo ? (
          <div className="flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <Check className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold text-emerald-300">
                  Code &quot;{appliedPromo.code}&quot; Applied!
                </p>
                <p className="text-[11px] text-emerald-200/70">
                  {appliedPromo.label}
                  {appliedPromo.isFree
                    ? " (100% OFF)"
                    : ` (-${formatNaira(price - appliedPromo.finalPrice)})`}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemovePromo}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-slate-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
              title="Remove promo code"
            >
              <X className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              type="text"
              value={promoInput}
              onChange={(e) => {
                setPromoInput(e.target.value);
                if (promoError) setPromoError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleApplyPromo();
                }
              }}
              placeholder="ENTER PROMO CODE"
              className="h-11 flex-1 rounded-lg border border-white/15 bg-bg-secondary px-3.5 text-sm text-ink placeholder:text-ink-muted/40 uppercase tracking-wider focus-visible:border-accent"
            />
            <Button
              type="button"
              onClick={handleApplyPromo}
              disabled={isCheckingPromo || !promoInput.trim()}
              variant="outline"
              size="sm"
              className="h-11 shrink-0 px-4 font-bold border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/20 cursor-pointer"
            >
              {isCheckingPromo ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                  Apply
                </>
              )}
            </Button>
          </div>
        )}

        {promoError && (
          <p className="mt-2 text-xs text-state-error">{promoError}</p>
        )}
      </div>

      {serverError && (
        <p className="mt-5 rounded-lg bg-state-error/10 px-4 py-3 text-sm text-state-error">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting}
        className="mt-7 w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-lg font-black uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)] border border-cyan-300/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : appliedPromo?.isFree ? (
          <>
            <Check className="h-5 w-5 text-white" />
            Complete Free Registration
          </>
        ) : (
          <>
            <ShieldCheck className="h-5 w-5 text-white" />
            Pay {formatNaira(finalPrice)}
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-ink-muted/50">
        {appliedPromo?.isFree
          ? "Your seat will be confirmed immediately upon completion. No payment is required."
          : "You'll be redirected to Paystack to complete payment securely. Your seat is confirmed automatically once payment succeeds."}
      </p>
    </form>
  );
}
