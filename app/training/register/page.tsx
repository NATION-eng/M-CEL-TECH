import type { Metadata } from "next";
import { CalendarClock, Clock3, Users2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { RegistrationForm } from "@/components/forms/RegistrationForm";
import { CourseOutlineList } from "@/components/training/CourseOutlineList";
import { programService } from "@/lib/services/program.service";
import { cohortService, toCohortSummary } from "@/lib/services/cohort.service";

const PROGRAM_SLUG = "ai-productivity-digital-innovation-bootcamp";

export const metadata: Metadata = {
  title: "Register — AI Productivity & Digital Innovation Bootcamp",
  description:
    "Register and pay securely for the M-CEL TECH AI Productivity & Digital Innovation Bootcamp.",
};

export const dynamic = "force-dynamic";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const statusMessage: Record<string, string> = {
    failed: "Your last payment attempt was not successful. Please try again.",
    error: "Something went wrong verifying your payment. Please try again or contact us.",
    "not-found": "We couldn't find that registration. Please register again below.",
  };

  const program = await programService.getBySlug(PROGRAM_SLUG);
  const cohorts = (await cohortService.getActiveCohortsForProgram(program.id)).map(toCohortSummary);
  const allFull = cohorts.length > 0 && cohorts.every((c) => c.isFull);

  const scheduleBadges = [
    { icon: CalendarClock, label: "Date: Aug 5 – Aug 20, 2026" },
    { icon: Clock3, label: "Time: 7:00 PM – 9:00 PM" },
    { icon: Users2, label: "Evening Hybrid Class" },
  ];

  return (
    <section className="bg-bg-secondary py-16 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div>
          <span className="section-eyebrow">Secure Registration</span>
          <h1 className="mt-5 text-3xl font-bold leading-tight text-ink md:text-4xl">
            {program.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-ink-muted/70">
            Complete the form to reserve your seat in the upcoming intensive Evening
            Class bootcamp (August 5 – August 20, 2026).
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {scheduleBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="glass flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink"
              >
                <Icon className="h-3.5 w-3.5 text-accent-cyan" />
                {label}
              </span>
            ))}
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-ink-muted/60">
            Course Outline — Tap a Module for Details
          </p>
          <CourseOutlineList />
        </div>

        <div>
          {status && statusMessage[status] && (
            <p className="mb-5 rounded-lg bg-state-error/10 px-4 py-3 text-sm text-state-error">
              {statusMessage[status]}
            </p>
          )}
          {allFull && (
            <p className="mb-5 rounded-lg bg-state-error/10 px-4 py-3 text-sm text-state-error">
              This cohort is currently full. Message us on WhatsApp to be notified when the
              next round opens.
            </p>
          )}
          <RegistrationForm cohorts={cohorts} price={Number(program.price)} />
        </div>
      </Container>
    </section>
  );
}
