import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "M-CEL TECH Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16 md:py-24">
        <Container className="prose prose-invert max-w-3xl">
          <p className="text-sm text-ink-muted/60">Last updated: 26 July 2025</p>

          <h2>1. Information We Collect</h2>
          <p>
            When you register for training, contact us, or use this website, we may collect
            your name, email address, phone number, organization, and payment-related
            information processed on our behalf by Paystack.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to process registrations, confirm payments, communicate
            about programs and services, and improve our offerings. We do not sell your
            personal information to third parties.
          </p>

          <h2>3. Payment Processing</h2>
          <p>
            All payments are processed securely by Paystack. M-CEL TECH does not store your
            card details on its own servers.
          </p>

          <h2>4. Data Storage</h2>
          <p>
            Registration data is stored securely in our database, hosted on Supabase, with
            access restricted to authorized personnel.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal
            information by contacting us at{" "}
            <a href={`mailto:${SITE.customerCareEmail}`}>{SITE.customerCareEmail}</a>.
          </p>

          <h2>6. Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${SITE.customerCareEmail}`}>{SITE.customerCareEmail}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
