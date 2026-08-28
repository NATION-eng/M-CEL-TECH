import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/database/client";

const CONFIRMED_STATUSES: Prisma.RegistrationWhereInput["registrationStatus"] = {
  in: ["CONFIRMED", "COMPLETED"],
};

const UNCONFIRMED_STATUSES: Prisma.RegistrationWhereInput["registrationStatus"] = {
  in: ["PENDING", "PAYMENT_PENDING", "PAYMENT_FAILED", "CANCELLED"],
};

export const registrationRepository = {
  create: (data: Prisma.RegistrationCreateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.registration.create({ data }),

  findByPaymentReference: (reference: string, tx: Prisma.TransactionClient = prisma) =>
    tx.registration.findUnique({ where: { paymentReference: reference } }),

  /** Checks for an already PAID / CONFIRMED registration for the same programme + email. */
  findConfirmedByEmailAndProgram: (email: string, programId: string) =>
    prisma.registration.findFirst({
      where: { email, programId, registrationStatus: CONFIRMED_STATUSES },
    }),

  /** Finds an unpaid/pending registration for the same programme + email so it can be reused. */
  findPendingByEmailAndProgram: (email: string, programId: string) =>
    prisma.registration.findFirst({
      where: { email, programId, registrationStatus: UNCONFIRMED_STATUSES },
    }),

  update: (id: string, data: Prisma.RegistrationUpdateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.registration.update({ where: { id }, data }),

  updateStatus: (id: string, data: Prisma.RegistrationUpdateInput, tx: Prisma.TransactionClient = prisma) =>
    tx.registration.update({ where: { id }, data }),

  findById: (id: string) =>
    prisma.registration.findUnique({
      where: { id },
      include: { program: true, cohort: true, payment: true },
    }),

  /** Finds a confirmed/completed registration for certificate verification. */
  findCertificate: (query: string) => {
    const trimmed = query.trim();
    return prisma.registration.findFirst({
      where: {
        registrationStatus: CONFIRMED_STATUSES,
        OR: [
          { receiptNumber: { equals: trimmed, mode: "insensitive" } },
          { registrationNumber: { equals: trimmed, mode: "insensitive" } },
          { id: trimmed },
          { email: { equals: trimmed, mode: "insensitive" } },
        ],
      },
      include: {
        program: true,
        cohort: true,
      },
    });
  },
};
