"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ShieldCheck, CalendarClock, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registerForBootcamp } from "@/actions/registration";
import {
  registrationFormSchema,
  type RegistrationFormValues,
} from "@/lib/validators/registration.validator";
import { formatNaira } from "@/lib/utils";
import type { CohortSummary } from "@/types/cohort";

const fields: {
  name: keyof Omit<RegistrationFormValues, "cohortId">;
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
}: {
  cohorts: CohortSummary[];
  initialCohortId?: string;
  price: number;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const cohort = cohorts[0];
  const isFull = cohort ? cohort.isFull : false;
  // cohortId is always available synchronously — the hidden field is pre-populated
  // on first render, so Zod validation can never fail on it.
  const cohortId = cohort?.id ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organization: "",
      cohortId,
    },
  });

  async function onSubmit(values: RegistrationFormValues) {
    setServerError(null);
    const result = await registerForBootcamp(values);

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    window.location.href = result.data.authorizationUrl;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-md border border-white/8 bg-bg-primary p-7 shadow-card md:p-9"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <p className="text-sm font-medium text-ink-muted/60">Registration Fee</p>
          <p className="text-2xl font-bold text-ink">{formatNaira(price)}</p>
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
              Date: Aug 5 – Aug 20, 2026
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

      {serverError && (
        <p className="mt-5 rounded-lg bg-state-error/10 px-4 py-3 text-sm text-state-error">{serverError}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting || isFull}
        className="mt-7 w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-lg font-black uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)] border border-cyan-300/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Processing...
          </>
        ) : isFull ? (
          "This Cohort Is Full"
        ) : (
          <>
            <ShieldCheck className="h-5 w-5 text-white" />
            Pay
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-xs text-ink-muted/50">
        You&apos;ll be redirected to Paystack to complete payment securely. Your seat is
        confirmed automatically once payment succeeds.
      </p>
    </form>
  );
}
