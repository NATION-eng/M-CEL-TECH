# M-CEL TECH — Official Website

Enterprise IT solutions, software development, networking, cybersecurity, IoT, engineering
technology, equipment supply, and professional technology training — with a full Clean
Architecture backend powering paid registration for the AI Productivity & Digital
Innovation Bootcamp.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger ·
Lenis (smooth scroll) · Three.js + React Three Fiber · React Hook Form + Zod · Prisma ·
Supabase (Postgres) · Paystack · Resend

## Backend architecture

Requests flow through four layers, each with one responsibility:

```
Route handler (app/api/**)   → validates input, calls a service, formats the response
  ↓
Service (lib/services/**)    → business rules, orchestration, external APIs (Paystack, Resend)
  ↓
Repository (lib/database/repositories/**) → the only code that talks to Prisma
  ↓
Database (Supabase Postgres via prisma/schema.prisma)
```

Route handlers never contain business logic and never query the database directly — grep
for `prisma.` outside `lib/database/` and `app/api/health` to confirm (health checks are the
one deliberate exception, since they need a raw connectivity ping).

### API endpoints

All responses share one envelope: `{ success, message, data }` on success, `{ success,
message, errors }` on failure.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/register` | Create a registration + initialize payment |
| GET | `/api/programs` | List active training programmes |
| GET | `/api/cohorts?programSlug=...` | List active cohorts with live availability |
| POST | `/api/payment/initialize` | Re-initialize payment for an existing registration |
| GET / POST | `/api/payment/verify` | Browser redirect target / programmatic verify |
| POST | `/api/webhooks/paystack` | Authoritative payment confirmation (signature-verified) |
| POST | `/api/contact` | Reserved for a future contact form (WhatsApp is used today) |
| GET | `/api/health` | DB connectivity + app status, for uptime monitoring |

The registration **form** on the site doesn't call `/api/register` over HTTP — it uses a
Next.js server action (`actions/registration.ts`) that calls the exact same
`registrationService` the API route calls, so business rules can't drift between the two
entry points.

### Data integrity

- **Idempotent payment confirmation** (`registrationService.confirmPayment`) — safe to call
  from both the redirect and the webhook for the same reference.
- **Transactional writes** — payment update → registration update → cohort seat increment →
  receipt number → audit log all happen inside one `prisma.$transaction`.
- **Sequential receipt/registration numbers** (`MCEL-2026-000001`, `REG-2026-000001`) are
  generated with an atomic Postgres upsert against `system_settings`, safe under concurrent
  requests.
- **Rate limiting** on `/api/register`, `/api/payment/initialize`, and `/api/contact`
  (in-memory — see the note in `lib/utils/rate-limit.ts` about swapping in Redis for
  multi-instance deployments).
- **Origin validation** on the same routes via `middleware.ts`.
- **Webhook signature verification** (`x-paystack-signature`, HMAC SHA-512).

## Brand & motion system (Master Blueprint Sections 1–4)

The homepage was rebuilt from scratch against a new brand direction: dark (`#050816` /
`#0B1120`), glassmorphic, Electric Blue → Neon Cyan → Aurora Violet gradients, Sora/Inter/
JetBrains Mono typography, and a full motion system (Lenis smooth scroll, GSAP ScrollTrigger,
React Three Fiber, a custom cursor, magnetic buttons). Design tokens live in `tokens/*.ts` and
are mirrored into `tailwind.config.ts` so nothing is hardcoded twice.

**What's fully rebuilt to the new spec:** the homepage (`app/page.tsx`, all nine chapters in
`components/home/chapters/`), the global Navbar/Footer, the Button/Logo/cursor/loading-screen
system.

**What's dark-theme-corrected but not yet redesigned:** About, Services, Training, Register,
and the legal pages. These still use their original layouts and copy — I mechanically migrated
every color/shadow/radius class to the new tokens so nothing is visually broken (light text on
light backgrounds, mismatched cards, etc.), but they haven't received the cinematic treatment
the homepage did, because that hasn't been specified for them yet. Expect another visual pass
here once those sections of the Blueprint arrive.

**Two decisions worth knowing about:**
- The logo file is dark-navy-on-transparent, and the entire site is now dark. `Logo.tsx`
  defaults to rendering it as a white silhouette via CSS filter (`variant="light"`) to
  guarantee contrast — this trades away the logo's blue color. A real reversed/white logo
  file would remove the need for this.
- Chapter 8 (Social Proof) uses clearly-labeled placeholder tiles, not invented client names,
  logos, or metrics — the Blueprint explicitly allows placeholders when real content isn't
  available yet, and fabricating numbers would misrepresent the company.

**A real caveat:** this environment can't run `npm install` or a browser, so the Three.js/GSAP/
Lenis code (globe, AI-brain, horizontal-pin scroll, custom cursor) is written correctly against
each library's documented API but has not been visually verified. Run `npm run dev` and check
the homepage first — if anything in the motion layer misbehaves, it's most likely in
`components/three/`, `components/home/chapters/Chapter4WhatWeBuild.tsx` (the GSAP pin), or
`components/providers/SmoothScrollProvider.tsx`.

## 1. Install

```bash
npm install
```

## 2. Configure environment variables

```bash
cp .env.example .env.local
```

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `DIRECT_URL` | See "Connect to Supabase" below — full walkthrough |
| `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY` | Paystack → Settings → API Keys & Webhooks |
| `PAYSTACK_WEBHOOK_SECRET` | Optional — only if Paystack issues a distinct webhook secret for your account |
| `RESEND_API_KEY`, `EMAIL_FROM` | resend.com → API Keys (verify your sending domain first) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp Business number, digits only with country code |

## 3. Connect to Supabase

**3a. Create the project** (skip if you already have one): go to
[supabase.com](https://supabase.com) → New Project → set a name, generate and **save** a
database password, pick a region, and create it. Takes ~2 minutes to provision.

**3b. Get your credentials:**

| Where | What to copy | Goes in |
| --- | --- | --- |
| Project Settings → API | Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| Project Settings → API | `anon` `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| Project Settings → API | `service_role` key (click reveal) | `SUPABASE_SERVICE_ROLE_KEY` |
| Project Settings → Database → Connection string → **Connection pooling** (port 6543) | URI, with `[YOUR-PASSWORD]` replaced by your DB password | `DATABASE_URL` — append `?pgbouncer=true&connection_limit=1` |
| Project Settings → Database → Connection string → **Direct connection** (port 5432) | URI, same password substitution | `DIRECT_URL` |

Copy `.env.example` to `.env.local` and fill these in (plus Paystack/Resend/WhatsApp values
whenever you have them — they're not needed to get the database working).

**3c. Apply the schema and seed data:**

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

This creates all 7 tables, then seeds the bootcamp programme, its three cohorts
(Morning/Afternoon/Evening, 10 seats each), and baseline `system_settings` rows. Programme
price, cohort capacity, and schedule all live in the database from this point on — update
them via Prisma Studio (`npm run prisma:studio`), not by editing code.

**3d. Apply Row Level Security:**

```bash
npx prisma migrate dev --name enable_row_level_security --create-only
```

This creates an empty migration file at
`prisma/migrations/<timestamp>_enable_row_level_security/migration.sql`. Paste in the full
contents of `prisma/rls-policies.sql` (already written, sitting in the repo), then run:

```bash
npx prisma migrate dev
```

This locks every table down by default and adds narrow public-read policies for
`training_programs` and `cohorts` only (the two tables the site actually needs to show
visitors). It doesn't change how the app itself behaves — Prisma connects as a role that
bypasses RLS — it's specifically to prevent the public anon key from ever reading
registrations, payments, or logs directly, even by accident later.

**3e. Verify it's working:**

```bash
npm run dev
```

Visit `/api/health` — `database` should say `"connected"`. Visit `/training` — the
programme title and cohort seats should be coming from the database now, not the mock
fallback (if you ran the site before this point, that fallback is what you were seeing —
your server console would have logged a "Database unavailable" warning each time).

## 4. Configure the Paystack webhook

In the Paystack dashboard, set the webhook URL to:

```
https://<your-domain>/api/webhooks/paystack
```

This is the authoritative payment-confirmation channel — `/api/payment/verify` (the browser
redirect target) calls the same underlying service and is idempotent with the webhook, but
the webhook is what guarantees confirmation even if the customer closes their browser.

## 5. Run locally

```bash
npm run dev
```

Check `/api/health` once it's running to confirm the database connection.

## 6. Deploy

Push to GitHub and import the repo in Vercel. Add the same environment variables in
Vercel → Project → Settings → Environment Variables, run the migration + seed against your
production database, then point the Paystack webhook and `NEXT_PUBLIC_SITE_URL` at your
production domain.

## Project structure

```
app/
  api/                  Route handlers — thin controllers only
  training/, about/...  Pages
components/             ui/ layout/ shared/ forms/ home/ training/ — no business logic
lib/
  database/
    client.ts           Prisma client singleton
    repositories/        Only code that talks to Prisma
  services/              Business logic + external APIs (Paystack, Resend)
  validators/            Zod schemas, shared by client forms and API routes
  utils/                 Logger, error classes, API response envelope, rate limiter, ID generators
actions/                 Server actions (thin — delegate to the same services as the API)
prisma/                  schema.prisma + seed.ts
emails/                  HTML email templates
types/                   Shared TypeScript types
constants/               Static marketing copy (nav, services, industries, FAQ content)
middleware.ts            Origin validation for sensitive routes
```

### A note on the spec's exact folder names

The backend spec sketches `lib/repositories/`, `lib/emails/`, `lib/payments/`, and a
top-level `middleware/` folder. This implementation nests repositories under
`lib/database/repositories/` (grouping all DB-access code together), keeps `emails/` at the
project root (a pre-existing convention here), puts Paystack logic in
`lib/services/payment.service.ts` rather than its own folder, and uses Next.js's required
root-level `middleware.ts` file rather than a folder (the framework only recognizes that
exact path). The layering itself — route → service → repository → database, one
responsibility per file — matches the spec; only the folder names differ. Rename freely if
you'd like an exact match.

## Notes for the next phase

- **Waitlist integration**: the existing waitlist was intentionally left untouched. When
  ready, add a `source` column to `registrations` or write a one-off migration script to
  backfill matching rows — no existing lead data needs to move until you're ready.
- **Logo assets**: drop your logo files into `public/` (e.g. `logo-main.png`, `icon.png`)
  and wire them into `components/layout/Logo.tsx` and `app/icon.png`.
- **Refunds**: `paymentService.refundPayment()` is a stub — Paystack's Refunds API isn't
  wired up yet, since no refund policy details were specified for automation.
- **Rate limiting** is in-memory and per-process — fine for a single instance, but swap in
  a shared store (Upstash Redis, etc.) before scaling to multiple instances.
- Only the Homepage and Training page were built from full section-by-section specs. About
  and Services pages are functional and on-brand but intentionally lightweight.
