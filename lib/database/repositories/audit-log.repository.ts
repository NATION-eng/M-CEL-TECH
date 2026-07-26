import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/database/client";

export const auditLogRepository = {
  create: (data: Prisma.AuditLogCreateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.auditLog.create({ data }),
};
