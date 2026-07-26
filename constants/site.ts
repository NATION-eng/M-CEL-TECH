export const SITE = {
  name: "M-CEL TECH",
  tagline: "Engineering Tomorrow's Technology, Today.",
  description:
    "M-CEL TECH delivers enterprise IT solutions, custom software development, networking, cybersecurity, IoT integration, engineering technology, equipment supply, and professional technology training.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mceltech.com",

  // ─── Official Company Emails ───────────────────────────────────────
  contactEmail: "contact@mceltech.com",
  supportEmail: "support@mceltech.com",
  customerCareEmail: "customercare@mceltech.com",
  complainEmail: "complain@mceltech.com",
  trainingEmail: "training@mceltech.com",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348116079309",
  phoneNumber: "08161237136",
  phoneNumbers: ["2348161237136", "2348116079309"],
  whatsappDisplayNumber: "08116079309",
  whatsappNumbersFormatted: ["08161237136", "08116079309"],
  officeAddress: "2nd Floor, Salije Plaza, Ada George Road, Port Harcourt, Nigeria",
} as const;

/**
 * Builds a wa.me deep link with an optional prefilled message. Defaults
 * to the primary WhatsApp number; pass `customPhone` to target the
 * secondary line instead (digits only, no leading +).
 */
export function getWhatsAppLink(message?: string, customPhone?: string): string {
  const base = `https://wa.me/${customPhone ?? SITE.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hello M-CEL TECH, I'd like to speak with an expert about your technology solutions.";

/** Used by every bootcamp-specific "Talk to an Expert" touchpoint, instead of the generic business-solutions message. */
export const BOOTCAMP_WHATSAPP_MESSAGE =
  "Hello M-CEL TECH, I'd like to know more about the AI Productivity & Digital Innovation Bootcamp.";
