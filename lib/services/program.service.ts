import "server-only";
import { programRepository } from "@/lib/database/repositories/program.repository";
import { NotFoundError } from "@/lib/utils/errors";

export const programService = {
  getActivePrograms: () => programRepository.findActive(),

  async getBySlug(slug: string) {
    const program = await programRepository.findBySlug(slug);
    if (!program) throw new NotFoundError("Programme not found.");
    return program;
  },

  async getFeatured() {
    const programs = await programRepository.findActive();
    return programs.find((p) => p.featured) ?? programs[0] ?? null;
  },
};
