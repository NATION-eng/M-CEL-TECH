import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, Mail, MapPin, QrCode } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { ConstellationCanvas } from "@/components/shared/ConstellationCanvas";
import { FOOTER_LINKS } from "@/constants/nav";
import { SITE, DEFAULT_WHATSAPP_MESSAGE, getWhatsAppLink } from "@/constants/site";

/** Section 4 Footer Experience — the constellation continues from Chapter 9; this is the final scene, not an afterthought. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-primary text-ink">
      <ConstellationCanvas density={90} />
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-60" />

      <Container className="relative py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1 lg:max-w-xs">
            <div className="drop-shadow-[0_0_24px_rgba(37,99,235,0.35)]">
              <Logo size="lg" />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{SITE.description}</p>

            {/* Quick Site QR Code Scan */}
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 backdrop-blur-sm">
              <a
                href="/qr-code.svg"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-white p-1 transition-transform hover:scale-105"
                title="Scan or download full site QR Code"
              >
                <Image
                  src="/qr-code.svg"
                  alt="M-CEL TECH Site QR Code"
                  width={64}
                  height={64}
                  className="h-16 w-16"
                />
              </a>
              <div className="text-xs">
                <div className="flex items-center gap-1 font-bold text-cyan-400">
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Scan to Visit</span>
                </div>
                <p className="mt-0.5 text-[11px] text-ink-muted/70">
                  Point camera to open mceltech.com on mobile
                </p>
                <a
                  href="/qr-code.svg"
                  download="mceltech-qr-code.svg"
                  className="mt-1 inline-block text-[10px] font-semibold text-accent-cyan underline hover:text-white"
                >
                  Download QR Code
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted/60">Company</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted/60">Services</h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-muted hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted/60">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-accent-cyan" />
                <a href="tel:+2348161237136" className="hover:text-ink">
                  Phone: 08161237136
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-accent-cyan" />
                <a
                  href="https://wa.me/2348116079309"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink"
                >
                  WhatsApp: 08116079309
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted/40">General</span>
                  <a href={`mailto:${SITE.contactEmail}`} className="text-sm hover:text-ink">
                    {SITE.contactEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted/40">Support</span>
                  <a href={`mailto:${SITE.supportEmail}`} className="text-sm hover:text-ink">
                    {SITE.supportEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted/40">Training</span>
                  <a href={`mailto:${SITE.trainingEmail}`} className="text-sm hover:text-ink">
                    {SITE.trainingEmail}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-cyan" />
                <span>{SITE.officeAddress}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink-muted/60">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-xs text-ink-muted/60 hover:text-ink">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
