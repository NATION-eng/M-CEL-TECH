import "server-only";
import { prisma } from "@/lib/database/client";

export const systemSettingRepository = {
  get: (key: string) => prisma.systemSetting.findUnique({ where: { settingKey: key } }),

  set: (key: string, value: string, description?: string) =>
    prisma.systemSetting.upsert({
      where: { settingKey: key },
      update: { settingValue: value },
      create: { settingKey: key, settingValue: value, description },
    }),

  all: () => prisma.systemSetting.findMany({ orderBy: { settingKey: "asc" } }),
};
