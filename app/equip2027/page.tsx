import type { Metadata } from "next";
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  Laptop,
  Users,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { EquipApplicationForm } from "@/components/forms/EquipApplicationForm";
import { EQUIP_2027 } from "@/constants/equip2027";

export const metadata: Metadata = {
  title: "EQUIP 2027 CSR Subsidized Scholarship — M-CEL TECH",
  description:
    "Apply for the EQUIP 2027 CSR Subsidized Scholarship. Subsidized tech empowerment training for youth, university students, and church sponsors at ₦10,000 per slot. Kickoff January 11, 2027.",
};

const CADENCE_STEPS = [
  {
    step: "01",
    title: "Instant Scholarship Offer",
    desc: "Submit your application to receive an official offer letter, reference code, and flexible payment instructions instantly.",
  },
  {
    step: "02",
    title: "24-Hour WhatsApp Check-in",
    desc: "Our Enrollment Team reaches out via WhatsApp to assist with track selection, device readiness, and answer questions.",
  },
  {
    step: "03",
    title: "Conference Verification",
    desc: "Church & conference slots are verified with leadership; individual applicants receive seat reservation updates.",
  },
  {
    step: "04",
    title: "Seat Confirmation & Onboarding",
    desc: "Once payment of ₦10,000/slot is confirmed, your cohort onboarding package and access credentials are fully activated.",
  },
];

export default function Equip2027Page() {
  return (
    <>
      <PageHero
        eyebrow="EQUIP 2027 • CSR Subsidized Scholarship"
        title="Engineering Future Tech Innovators at ₦10,000 Subsidized Rate"
        description="M-CEL TECH's flagship Corporate Social Responsibility initiative empowering church youth, university students, and leaders with practical AI, programming, and digital productivity skills. Kickoff: January 11, 2027."
      />

      {/* Program Highlights Grid */}
      <section className="border-b border-white/8 bg-bg-primary py-12">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-950/20 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 mb-4">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="text-2xl font-black text-white">₦10,000</div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 mt-1">
                Subsidized CSR Rate / Seat
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Standard price ₦20,000 (50% Subsidized CSR Scholarship Grant).
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">
                <Calendar className="h-5 w-5" />
              </span>
              <div className="text-2xl font-black text-white">Jan 11, 2027</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                Official Program Kickoff
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Two tracks available: 3-Week Online Evening vs 1-Week Physical Sprint.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                <Users className="h-5 w-5" />
              </span>
              <div className="text-2xl font-black text-white">8 Conferences</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                Approved CSR Quotas
              </div>
              <p className="mt-2 text-xs text-slate-400">
                PH East, PH West, Rivers East, Rivers West-Central, Rivers North, Bayelsa, Cross River.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4">
                <Award className="h-5 w-5" />
              </span>
              <div className="text-2xl font-black text-white">Bulk Sponsorship</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mt-1">
                Sponsor 2, 5, 10 or 50 Youth
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Churches and pastors can sponsor delegates with simplified bulk seat allocation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tracks Breakdown Section */}
      <section className="bg-bg-secondary py-16 md:py-20 border-b border-white/8">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">Choose Your Track</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              Two Learning Formats Designed for Maximum Flexibility
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Both tracks follow the same rigorous hands-on curriculum, interactive lab exercises, and verifiable graduation credential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {EQUIP_2027.tracks.map((track) => (
              <div
                key={track.id}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex rounded-full bg-cyan-500/10 border border-cyan-400/30 px-3 py-1 text-xs font-bold text-cyan-300 mb-4">
                    {track.shortLabel}
                  </div>
                  <h3 className="text-xl font-bold text-white">{track.fullTitle}</h3>
                  <div className="mt-2 text-sm font-semibold text-cyan-400 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {track.duration}
                  </div>
                  <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                    {track.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>Format: <strong>{track.mode}</strong></span>
                  <span className="text-emerald-400 font-semibold">₦10,000 / seat</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4-Step Follow-Up Cadence */}
      <section className="bg-bg-primary py-16 md:py-20 border-b border-white/8">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
              The 4-Step Enrollment & Verification Cadence
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              We operate an &ldquo;Apply Now, Confirm Later&rdquo; process to ensure all conference delegates and sponsors receive personalized onboarding support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CADENCE_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative rounded-2xl border border-white/10 bg-slate-900/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-3xl font-black text-cyan-400/40">
                    {step.step}
                  </span>
                  <h4 className="mt-3 text-base font-bold text-white">{step.title}</h4>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-cyan-300">
                  <CheckCircle className="h-3.5 w-3.5 text-cyan-400" />
                  M-CEL TECH Standard
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Application Form Section */}
      <section id="apply-form" className="bg-bg-secondary py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="section-eyebrow">Apply Today</span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Secure Your Subsidized ₦10,000 Scholarship Seat
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Fill out the 5 quick sections below. Your official scholarship offer letter and reference code will be generated immediately.
            </p>
          </div>

          <EquipApplicationForm />
        </Container>
      </section>

      {/* FAQ & Support Section */}
      <section className="bg-bg-primary py-16 border-t border-white/8">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-eyebrow">Assistance & Questions</span>
              <h3 className="mt-2 text-2xl font-bold text-white">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
                <h4 className="font-bold text-white">Do I need a laptop to participate?</h4>
                <p className="mt-2 text-slate-300 leading-relaxed text-xs sm:text-sm">
                  You need any device available to you (laptop, tablet, desktop, or smartphone) and a stable internet connection. Hands-on coding exercises are optimized for multi-device environments.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
                <h4 className="font-bold text-white">Can church leaders sponsor multiple youth delegates?</h4>
                <p className="mt-2 text-slate-300 leading-relaxed text-xs sm:text-sm">
                  Yes! Choose the &ldquo;Church / Conference Sponsor&rdquo; category on the form and select 2, 5, 10, 50, or a custom number of slots. The subsidized rate of ₦10,000 per seat applies automatically, and corporate bank transfer invoices are issued instantly.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
                <h4 className="font-bold text-white">What payment methods are supported?</h4>
                <p className="mt-2 text-slate-300 leading-relaxed text-xs sm:text-sm">
                  We accept online payments via Paystack (card, bank transfer, USSD) and direct wire transfers to our official corporate account at Moniepoint Microfinance Bank (Account: 8116079309, M-CEL TECH INTEGRATED SERVICES).
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
