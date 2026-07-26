-- ─────────────────────────────────────────────────────────────────────
-- Row Level Security — Database Architecture Spec: "Public users should
-- never have unrestricted database access. All writes should occur
-- through secure backend API routes."
--
-- This app's own backend (Prisma, via DATABASE_URL) connects as the
-- `postgres` role, which bypasses RLS by default — so enabling this
-- does NOT break anything the app currently does. What it does do: lock
-- out any direct query against these tables using the public anon key
-- (e.g. if the browser Supabase client in lib/supabase/client.ts is
-- ever used for something in the future) unless explicitly allowed
-- below. Defense in depth, not a change to current app behavior.
--
-- Apply this via: npx prisma migrate dev --name enable_row_level_security --create-only
-- then paste this file's contents into the generated (empty) migration.sql,
-- then: npx prisma migrate dev
-- ─────────────────────────────────────────────────────────────────────

ALTER TABLE training_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cohorts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs        ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs        ENABLE ROW LEVEL SECURITY;

-- training_programs and cohorts are public marketing/browsing data —
-- the website's /api/programs and /api/cohorts endpoints are meant to
-- show this to anyone. Allow read-only public access to the active/open
-- subset only (never drafts, closed, or archived programmes).
CREATE POLICY "Public can view active training programs"
  ON training_programs FOR SELECT
  TO anon, authenticated
  USING (status = 'ACTIVE');

CREATE POLICY "Public can view open cohorts"
  ON cohorts FOR SELECT
  TO anon, authenticated
  USING (status IN ('OPEN', 'FULL'));

-- registrations, payments, email_logs, system_settings, audit_logs get
-- NO policies at all. With RLS enabled and zero policies, every role
-- except the table owner / service_role is denied by default — exactly
-- what we want for financial records and personal data. All access to
-- these tables goes through the backend API routes only.
