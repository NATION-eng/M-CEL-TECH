-- ─────────────────────────────────────────────────────────────────────────
-- EQUIP 2027 CSR Subsidized Scholarship — Supabase SQL Migration
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Create Enums
DO $$ BEGIN
  CREATE TYPE "EquipCategory" AS ENUM ('TEENAGER', 'UNIVERSITY_STUDENT', 'WORKING_ADULT', 'SPONSOR');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "EquipTrack" AS ENUM ('ONLINE_EVENING', 'PHYSICAL_SPRINT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "EquipCadenceStep" AS ENUM ('STEP1_OFFER_SENT', 'STEP2_WHATSAPP_CONTACTED', 'STEP3_VERIFIED_REMINDED', 'STEP4_PAYMENT_CONFIRMED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Create equip_applications table
CREATE TABLE IF NOT EXISTS "equip_applications" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
  "reference_code" TEXT NOT NULL,
  "full_name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "conference" TEXT NOT NULL,
  "local_church" TEXT NOT NULL,
  "category" "EquipCategory" NOT NULL,
  "slots" INTEGER NOT NULL DEFAULT 1,
  "track" "EquipTrack" NOT NULL,
  "has_device" BOOLEAN NOT NULL DEFAULT true,
  "notes" TEXT,
  "amount_naira" INTEGER NOT NULL DEFAULT 10000,
  "status" "EquipCadenceStep" NOT NULL DEFAULT 'STEP1_OFFER_SENT',
  "paid_at" TIMESTAMP(3),
  "payment_reference" TEXT,
  "payment_method" TEXT,
  "whatsapp_notes" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "equip_applications_pkey" PRIMARY KEY ("id")
);

-- 3. Unique Constraints and Indexes
CREATE UNIQUE INDEX IF NOT EXISTS "equip_applications_reference_code_key" ON "equip_applications"("reference_code");
CREATE UNIQUE INDEX IF NOT EXISTS "equip_applications_payment_reference_key" ON "equip_applications"("payment_reference");
CREATE INDEX IF NOT EXISTS "equip_applications_email_idx" ON "equip_applications"("email");
CREATE INDEX IF NOT EXISTS "equip_applications_conference_idx" ON "equip_applications"("conference");
CREATE INDEX IF NOT EXISTS "equip_applications_status_idx" ON "equip_applications"("status");

-- 4. Enable Row Level Security (RLS)
ALTER TABLE "equip_applications" ENABLE ROW LEVEL SECURITY;
