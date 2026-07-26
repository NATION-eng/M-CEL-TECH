import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/database/client";

export const emailLogRepository = {
  create: (data: Prisma.EmailLogCreateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.emailLog.create({ data }),

  markSent: (id: string, messageId?: string) =>
    prisma.emailLog.update({
      where: { id },
      data: { status: "SENT", messageId, sentAt: new Date() },
    }),

  markFailed: (id: string, errorMessage: string) =>
    prisma.emailLog.update({
      where: { id },
      data: { status: "FAILED", errorMessage },
    }),
};
