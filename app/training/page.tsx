import type { Metadata } from "next";
import { TrainingHero } from "@/components/training/TrainingHero";
import { ProgrammeOverview } from "@/components/training/ProgrammeOverview";
import { WhyBootcamp } from "@/components/training/WhyBootcamp";
import { LearningModules } from "@/components/training/LearningModules";
import { WhoShouldAttend } from "@/components/training/WhoShouldAttend";
import { TrainingStructure } from "@/components/training/TrainingStructure";
import { CohortSelection } from "@/components/training/CohortSelection";
import { Pricing } from "@/components/training/Pricing";
import { FAQAccordion } from "@/components/training/FAQAccordion";
import { RegistrationCTA } from "@/components/training/RegistrationCTA";
import { programService } from "@/lib/services/program.service";

const PROGRAM_SLUG = "ai-productivity-digital-innovation-bootcamp";

export const metadata: Metadata = {
  title: "AI Productivity & Digital Innovation Bootcamp",
  description:
    "Master practical AI tools, automation workflows, modern digital productivity, and project delivery skills through M-CEL TECH's intensive hybrid training programme.",
};

// Cohort availability and pricing are read live from the database on every request.
export const dynamic = "force-dynamic";

export default async function TrainingPage() {
  const program = await programService.getBySlug(PROGRAM_SLUG);
  const price = Number(program.price);

  return (
    <>
      <TrainingHero title={program.title} price={price} />
      <ProgrammeOverview />
      <WhyBootcamp />
      <LearningModules />
      <WhoShouldAttend />
      <TrainingStructure />
      <CohortSelection />
      <Pricing title={program.title} price={price} />
      <FAQAccordion />
      <RegistrationCTA />
    </>
  );
}
