import "server-only";
import type { Prisma } from "@prisma/client";
import { auditLogRepository } from "@/lib/database/repositories/audit-log.repository";

export const auditService = {
  log: (
    event: string,
    description?: string,
    metadata?: Record<string, unknown>,
    ipAddress?: string,
    userType: string = "system"
  ) =>
    auditLogRepository.create({
      event,
      description,
      userType,
      ipAddress,
      metadata: metadata as Prisma.InputJsonValue,
    }),
};
