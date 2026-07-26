/**
 * Seeds the data this application treats as configuration, not code:
 * the bootcamp programme, its three cohorts, and baseline system
 * settings. Run with `npm run prisma:seed` (or automatically via
 * `prisma migrate dev`, which invokes the "prisma.seed" script in
 * package.json).
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PROGRAM_SLUG = "ai-productivity-digital-innovation-bootcamp";

async function main() {
  const program = await prisma.trainingProgram.upsert({
    where: { slug: PROGRAM_SLUG },
    update: {},
    create: {
      title: "AI Productivity & Digital Innovation Bootcamp",
      slug: PROGRAM_SLUG,
      description:
        "An intensive hybrid training programme covering prompt engineering, cinematic AI video generation, vibe coding, AI automation, and project management — designed for students, professionals, entrepreneurs, and organizations.",
      shortDescription:
        "Master practical AI tools, automation workflows, modern digital productivity, and project delivery skills.",
      price: 15000,
      currency: "NGN",
      trainingMode: "HYBRID",
      duration: "2 Weeks — Evening Class (7:00 PM – 9:00 PM)",
      registrationOpen: true,
      certificateAvailable: true,
      featured: true,
      status: "ACTIVE",
      maxParticipants: 30,
    },
  });

  const cohorts: {
    name: string;
    startTime: string;
    endTime: string;
    capacity: number;
  }[] = [{ name: "Evening Class", startTime: "7:00 PM", endTime: "9:00 PM", capacity: 30 }];

  for (const cohort of cohorts) {
    const existing = await prisma.cohort.findFirst({
      where: { programId: program.id, name: cohort.name },
    });
    if (existing) continue;
    await prisma.cohort.create({
      data: {
        programId: program.id,
        name: cohort.name,
        startTime: cohort.startTime,
        endTime: cohort.endTime,
        capacity: cohort.capacity,
        status: "OPEN",
      },
    });
  }

  const settings: { key: string; value: string; description: string }[] = [
    { key: "whatsapp_number", value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348000000000", description: "Primary WhatsApp contact number" },
    { key: "support_email", value: "support@mceltech.com", description: "Support/contact email" },
    { key: "default_currency", value: "NGN", description: "Default currency for pricing" },
    { key: "certificate_prefix", value: "MCEL", description: "Prefix used in receipt numbers" },
    { key: "company_address", value: "Port Harcourt, Rivers State, Nigeria", description: "Registered company address" },
    { key: "training_location", value: "Hybrid — Online & On-site", description: "Default training location" },
  ];

  for (const setting of settings) {
    await prisma.systemSetting.upsert({
      where: { settingKey: setting.key },
      update: {},
      create: { settingKey: setting.key, settingValue: setting.value, description: setting.description },
    });
  }

  console.log(`Seeded programme "${program.title}" with ${cohorts.length} cohorts and ${settings.length} settings.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
