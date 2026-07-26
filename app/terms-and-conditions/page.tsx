import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SITE } from "@/constants/site";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" />
      <section className="py-16 md:py-24">
        <Container className="prose prose-invert max-w-3xl">
          <p className="text-sm text-ink-muted/60">
            Last updated: {new Date().toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing this website or registering for any M-CEL TECH program, you agree
            to be bound by these Terms & Conditions.
          </p>

          <h2>2. Services</h2>
          <p>
            M-CEL TECH provides enterprise IT solutions, software development, networking,
            cybersecurity, IoT solutions, engineering technology, equipment supply, and
            professional technology training, as described on this website.
          </p>

          <h2>3. Training Registration</h2>
          <p>
            Registration for the AI Productivity & Digital Innovation Bootcamp or any other
            program is confirmed only upon successful payment via Paystack. Session dates and
            scheduling will be communicated after registration.
          </p>

          <h2>4. Payments</h2>
          <p>
            All fees are stated in Nigerian Naira (NGN) and processed securely through
            Paystack. Refunds are governed by our separate Refund Policy.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on this website, including training materials, is the property of
            M-CEL TECH and may not be reproduced without permission.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            M-CEL TECH provides its services on an as-is basis and shall not be liable for
            indirect or consequential damages arising from use of this website or its
            services.
          </p>

          <h2>7. Contact</h2>
          <p>
            Questions about these terms can be sent to{" "}
            <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
