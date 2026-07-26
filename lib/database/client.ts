import { PrismaClient } from "@prisma/client";

// Singleton pattern — avoids exhausting DB connections during Next.js
// dev-mode hot reloads, where this module would otherwise re-evaluate
// on every file change.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
