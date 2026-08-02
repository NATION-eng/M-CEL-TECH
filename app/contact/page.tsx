import type { Metadata } from "next";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { SITE, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with M-CEL TECH. Office location, direct phone lines, official email departments, and instant WhatsApp support.",
};

const CONTACT_DEPARTMENTS = [
  { label: "General Enquiries", email: SITE.contactEmail, role: "Official Business & Partnerships" },
  { label: "Technical Support Desk", email: SITE.supportEmail, role: "Infrastructure & Systems Support" },
  { label: "Bootcamp & Training", email: SITE.trainingEmail, role: "Student & Corporate Admissions" },
  { label: "Customer Care", email: SITE.customerCareEmail, role: "Client Success & Escalations" },
];

export default function ContactPage() {
  const whatsappUrl = getWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Let's Engineer Your Next Tech Breakthrough"
        description="Have a project in mind, need enterprise IT support, or want to register for our bootcamp? Our engineering and support team is here to assist you."
      />

      <section className="bg-bg-secondary py-16 md:py-24">
        <Container>
          {/* Top Info Cards Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Address Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-card backdrop-blur-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
                <MapPin className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">Physical Address</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {SITE.officeAddress}
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-cyan-300">
                <Building2 className="h-4 w-4 text-cyan-400" />
                Headquarters & Operations Center
              </div>
            </div>

            {/* Direct Phone Lines Card */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-7 shadow-card backdrop-blur-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-400/20">
                <Phone className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">Direct Phone Lines</h3>
              <p className="mt-2 text-sm text-slate-300">
                Speak directly with our technical support and client relations team.
              </p>
              <div className="mt-5 space-y-2">
                <a
                  href={`tel:+${SITE.phoneNumbers[0]}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                >
                  <span>Line 1: 0816 123 7136</span>
                  <Phone className="h-4 w-4 text-cyan-400" />
                </a>
                <a
                  href={`tel:+${SITE.phoneNumbers[1]}`}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                >
                  <span>Line 2: 0811 607 9309</span>
                  <Phone className="h-4 w-4 text-cyan-400" />
                </a>
              </div>
            </div>

            {/* Instant WhatsApp Support Card */}
            <div className="rounded-3xl border border-emerald-500/30 bg-slate-900/90 p-7 shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-xl md:col-span-2 lg:col-span-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-400/30">
                <MessageCircle className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-xl font-bold text-white">Instant WhatsApp Chat</h3>
              <p className="mt-2 text-sm text-slate-300">
                Need quick answers? Connect instantly with our senior technology consultants on WhatsApp.
              </p>
              <div className="mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                >
                  <MessageCircle className="h-5 w-5 fill-slate-950" />
                  Chat on WhatsApp Now
                </a>
              </div>
              <p className="mt-3 text-center text-[11px] font-semibold text-emerald-300/80">
                Typical response time: Under 15 minutes
              </p>
            </div>
          </div>

          {/* Department Emails & Business Hours Section */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Email Channels List */}
            <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-slate-900/80 p-7 sm:p-9 shadow-card backdrop-blur-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">Department Email Channels</h3>
                  <p className="text-xs text-slate-400">Direct inquiries to the right specialized team</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_DEPARTMENTS.map((dept) => (
                  <div
                    key={dept.email}
                    className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 transition-all hover:border-cyan-400/40 hover:bg-slate-900/60"
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-300">
                      {dept.label}
                    </span>
                    <a
                      href={`mailto:${dept.email}`}
                      className="mt-1.5 block text-sm font-bold text-white hover:text-cyan-400 truncate"
                    >
                      {dept.email}
                    </a>
                    <span className="mt-1 block text-[11px] text-slate-400 font-medium">
                      {dept.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours & Assistance Card */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/80 p-7 sm:p-9 shadow-card backdrop-blur-xl">
              <div>
                <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">Hours of Operation</h3>
                    <p className="text-xs text-slate-400">Standard business & support availability</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-200 font-medium">
                  <li className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-slate-400">Monday – Friday:</span>
                    <span className="font-bold text-white">8:00 AM – 6:00 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2.5">
                    <span className="text-slate-400">Bootcamp Dates (Aug 5 – Aug 20, 2026):</span>
                    <span className="font-bold text-cyan-300">7:00 PM – 9:00 PM (Evening)</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Emergency IT Support:</span>
                    <span className="font-bold text-emerald-400">24 / 7 Available</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3 text-xs text-slate-400">
                <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0" />
                <span>All corporate inquiries are protected under NDA & Strict Privacy Guidelines.</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
