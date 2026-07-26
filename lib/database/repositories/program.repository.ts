import "server-only";
import { Prisma, type TrainingProgram } from "@prisma/client";
import { prisma } from "@/lib/database/client";
import { logger } from "@/lib/utils/logger";

/**
 * Fallback used only when the database is unreachable (e.g. DATABASE_URL
 * not yet configured in local dev) — lets marketing/browsing pages
 * render instead of crashing. Registration and payment still require a
 * real database; this fallback is read-only display data, never used to
 * accept money or seats.
 */
const MOCK_PROGRAM: TrainingProgram = {
  id: "mock-program-bootcamp",
  title: "AI Productivity & Digital Innovation Bootcamp",
  slug: "ai-productivity-digital-innovation-bootcamp",
  description:
    "An intensive hybrid training programme covering prompt engineering, cinematic AI video generation, vibe coding, AI automation, and project management.",
  shortDescription:
    "Master practical AI tools, automation workflows, modern digital productivity, and project delivery skills.",
  price: new Prisma.Decimal(15000),
  currency: "NGN",
  trainingMode: "HYBRID",
  duration: "Intensive cohort-based programme",
  registrationOpen: true,
  certificateAvailable: true,
  featured: true,
  status: "ACTIVE",
  maxParticipants: 30,
  bannerImage: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

/**
 * Talks to the database and nothing else — no business rules, no
 * validation, no external calls. Services decide what the data means.
 */
export const programRepository = {
  async findActive(): Promise<TrainingProgram[]> {
    try {
      return await prisma.trainingProgram.findMany({
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "asc" },
      });
    } catch (err) {
      logger.warn("programRepository.findActive", "Database unavailable — returning mock programme", { error: err });
      return [MOCK_PROGRAM];
    }
  },

  async findBySlug(slug: string): Promise<TrainingProgram | null> {
    try {
      return await prisma.trainingProgram.findUnique({ where: { slug } });
    } catch (err) {
      logger.warn("programRepository.findBySlug", "Database unavailable — returning mock programme", { error: err });
      return slug === MOCK_PROGRAM.slug ? MOCK_PROGRAM : null;
    }
  },

  async findById(id: string): Promise<TrainingProgram | null> {
    try {
      return await prisma.trainingProgram.findUnique({ where: { id } });
    } catch (err) {
      logger.warn("programRepository.findById", "Database unavailable — returning mock programme", { error: err });
      return id === MOCK_PROGRAM.id ? MOCK_PROGRAM : null;
    }
  },
};
