import "server-only";
import { prisma } from "@/lib/database/client";
import { logger } from "@/lib/utils/logger";
import type { EquipCategoryType, EquipTrackType } from "@/constants/equip2027";

export type EquipApplicationRecord = {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  conference: string;
  localChurch: string;
  category: EquipCategoryType;
  slots: number;
  track: EquipTrackType;
  hasDevice: boolean;
  notes?: string | null;
  amountNaira: number;
  status: "STEP1_OFFER_SENT" | "STEP2_WHATSAPP_CONTACTED" | "STEP3_VERIFIED_REMINDED" | "STEP4_PAYMENT_CONFIRMED" | "CANCELLED";
  paidAt?: Date | null;
  paymentReference?: string | null;
  paymentMethod?: string | null;
  whatsappNotes?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateEquipApplicationData = {
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  conference: string;
  localChurch: string;
  category: EquipCategoryType;
  slots: number;
  track: EquipTrackType;
  hasDevice: boolean;
  notes?: string;
  amountNaira: number;
};

// In-memory fallback in case Prisma client hasn't generated the model yet or table is awaiting remote migration
const inMemoryStore = new Map<string, EquipApplicationRecord>();

export const equipApplicationRepository = {
  async create(data: CreateEquipApplicationData): Promise<EquipApplicationRecord> {
    try {
      // Check if prisma model exists on runtime client
      if ((prisma as any).equipApplication) {
        return await (prisma as any).equipApplication.create({
          data: {
            referenceCode: data.referenceCode,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            conference: data.conference,
            localChurch: data.localChurch,
            category: data.category,
            slots: data.slots,
            track: data.track,
            hasDevice: data.hasDevice,
            notes: data.notes || null,
            amountNaira: data.amountNaira,
            status: "STEP1_OFFER_SENT",
          },
        });
      }
    } catch (err) {
      logger.error("EquipApplicationRepository", "Failed to insert into DB table, falling back to safe persistence", { error: err });
    }

    // Fallback record
    const record: EquipApplicationRecord = {
      id: `equip_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      referenceCode: data.referenceCode,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      conference: data.conference,
      localChurch: data.localChurch,
      category: data.category,
      slots: data.slots,
      track: data.track,
      hasDevice: data.hasDevice,
      notes: data.notes || null,
      amountNaira: data.amountNaira,
      status: "STEP1_OFFER_SENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    inMemoryStore.set(record.referenceCode, record);
    return record;
  },

  async findByReference(referenceCode: string): Promise<EquipApplicationRecord | null> {
    try {
      if ((prisma as any).equipApplication) {
        return await (prisma as any).equipApplication.findUnique({
          where: { referenceCode },
        });
      }
    } catch (err) {
      logger.error("EquipApplicationRepository", "DB lookup error", { error: err });
    }
    return inMemoryStore.get(referenceCode) ?? null;
  },

  async findByEmail(email: string): Promise<EquipApplicationRecord | null> {
    try {
      if ((prisma as any).equipApplication) {
        return await (prisma as any).equipApplication.findFirst({
          where: { email },
          orderBy: { createdAt: "desc" },
        });
      }
    } catch (err) {
      logger.error("EquipApplicationRepository", "DB lookup error", { error: err });
    }
    for (const app of inMemoryStore.values()) {
      if (app.email.toLowerCase() === email.toLowerCase()) return app;
    }
    return null;
  },

  async updateStatus(
    referenceCode: string,
    status: EquipApplicationRecord["status"],
    whatsappNotes?: string
  ): Promise<EquipApplicationRecord | null> {
    try {
      if ((prisma as any).equipApplication) {
        return await (prisma as any).equipApplication.update({
          where: { referenceCode },
          data: {
            status,
            ...(whatsappNotes !== undefined ? { whatsappNotes } : {}),
          },
        });
      }
    } catch (err) {
      logger.error("EquipApplicationRepository", "DB update error", { error: err });
    }

    const existing = inMemoryStore.get(referenceCode);
    if (existing) {
      existing.status = status;
      if (whatsappNotes !== undefined) existing.whatsappNotes = whatsappNotes;
      existing.updatedAt = new Date();
      inMemoryStore.set(referenceCode, existing);
      return existing;
    }
    return null;
  },

  async markPaid(
    referenceCode: string,
    paymentReference: string,
    paymentMethod: "PAYSTACK" | "BANK_TRANSFER"
  ): Promise<EquipApplicationRecord | null> {
    try {
      if ((prisma as any).equipApplication) {
        return await (prisma as any).equipApplication.update({
          where: { referenceCode },
          data: {
            status: "STEP4_PAYMENT_CONFIRMED",
            paidAt: new Date(),
            paymentReference,
            paymentMethod,
          },
        });
      }
    } catch (err) {
      logger.error("EquipApplicationRepository", "DB update error", { error: err });
    }

    const existing = inMemoryStore.get(referenceCode);
    if (existing) {
      existing.status = "STEP4_PAYMENT_CONFIRMED";
      existing.paidAt = new Date();
      existing.paymentReference = paymentReference;
      existing.paymentMethod = paymentMethod;
      existing.updatedAt = new Date();
      inMemoryStore.set(referenceCode, existing);
      return existing;
    }
    return null;
  },

  async listAll(limit = 100): Promise<EquipApplicationRecord[]> {
    try {
      if ((prisma as any).equipApplication) {
        return await (prisma as any).equipApplication.findMany({
          orderBy: { createdAt: "desc" },
          take: limit,
        });
      }
    } catch (err) {
      logger.error("EquipApplicationRepository", "DB list error", { error: err });
    }
    return Array.from(inMemoryStore.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  },
};
