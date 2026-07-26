import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/shared/PageHero";
import { SITE } from "@/constants/site";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Refund Policy" />
      <section className="py-16 md:py-24">
        <Container className="prose prose-invert max-w-3xl">
          <p className="text-sm text-ink-muted/60">Last updated: 26 July 2025</p>

          <h2>1. Training Program Refunds</h2>
          <p>
            Registration fees for the AI Productivity & Digital Innovation Bootcamp and other
            training programs are refundable if a cancellation request is made at least 7
            days before the cohort start date, subject to a processing fee.
          </p>

          <h2>2. Non-Refundable Circumstances</h2>
          <p>
            Fees are not refundable for cancellation requests made less than 7 days before
            the cohort start date, for no-shows, or after training materials have been
            accessed.
          </p>

          <h2>3. How to Request a Refund</h2>
          <p>
            Send a refund request with your registration reference to{" "}
            <a href={`mailto:${SITE.customerCareEmail}`}>{SITE.customerCareEmail}</a> or via WhatsApp.
            Approved refunds are processed back to the original Paystack payment method
            within 5–10 business days.
          </p>

          <h2>4. Enterprise & Custom Engagements</h2>
          <p>
            Refunds for custom software, IT, or engineering engagements are governed by the
            terms of the individual service agreement signed with M-CEL TECH.
          </p>
        </Container>
      </section>
    </>
  );
}
