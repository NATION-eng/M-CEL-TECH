import { prisma } from "@/lib/database/client";
import { apiSuccess, apiError } from "@/lib/utils/api-response";

export const dynamic = "force-dynamic";

/** GET /api/health — used by uptime/deployment monitors. */
export async function GET() {
  const startedAt = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    return apiSuccess(
      {
        status: "ok",
        database: "connected",
        version: process.env.npm_package_version ?? "1.0.0",
        environment: process.env.NODE_ENV ?? "development",
        serverTime: new Date().toISOString(),
        latencyMs: Date.now() - startedAt,
      },
      "M-CEL TECH API is healthy."
    );
  } catch {
    return apiError("Database connection failed.", [], 503);
  }
}
