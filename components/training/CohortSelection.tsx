import { CalendarClock, Clock3 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { programService } from "@/lib/services/program.service";
import { cohortService } from "@/lib/services/cohort.service";

const PROGRAM_SLUG = "ai-productivity-digital-innovation-bootcamp";

/**
 * Single-cohort model — one Evening Class cohort, permanently open.
 * No capacity limit — enrolment is always available.
 */
export async function CohortSelection() {
  const program = await programService.getBySlug(PROGRAM_SLUG);
  const cohorts = await cohortService.getActiveCohortsForProgram(program.id);
  const cohort = cohorts[0];

  if (!cohort) return null;

  return (
    <section id="cohorts" className="scroll-mt-20 bg-bg-secondary py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Training Schedule"
            title="Interactive Evening Schedule"
            description="An intensive Evening Class bootcamp — August 5 to August 20, 2026 — designed for practical mastery, interactive building, and direct expert mentorship."
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-md">
            <div className="flex flex-col items-center rounded-md border border-white/8 bg-bg-primary p-8 text-center shadow-card">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent-cyan">
                <Clock3 className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-ink">{cohort.name}</h3>
              <p className="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-ink-muted/60">
                <CalendarClock className="h-4 w-4" />
                Aug 5 – Aug 20, 2026
                {(cohort.startTime || cohort.endTime) && (
                  <>
                    {" · "}
                    {cohort.startTime}
                    {cohort.startTime && cohort.endTime ? " – " : ""}
                    {cohort.endTime}
                  </>
                )}
              </p>

              {/* Always open — no cap, no "spots left" counter */}
              <span className="mt-4 rounded-full bg-state-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-state-success">
                Enrolment Open
              </span>

              <div className="mt-6 w-full">
                <Button
                  href="/training/register"
                  size="lg"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white text-base font-black uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
