// Kept as a thin re-export so existing imports of "@/lib/prisma" keep
// working. New code should import from "@/lib/database/client" directly,
// per the database/ folder convention.
export { prisma } from "@/lib/database/client";
