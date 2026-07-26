import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/database/client";

export const paymentRepository = {
  create: (data: Prisma.PaymentCreateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.payment.create({ data }),

  findByReference: (reference: string, tx: Prisma.TransactionClient = prisma) =>
    tx.payment.findUnique({ where: { paymentReference: reference } }),

  findByRegistrationId: (registrationId: string, tx: Prisma.TransactionClient = prisma) =>
    tx.payment.findUnique({ where: { registrationId } }),

  updateStatus: (id: string, data: Prisma.PaymentUpdateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.payment.update({ where: { id }, data }),
};
