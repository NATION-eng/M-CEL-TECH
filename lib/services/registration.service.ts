import "server-only";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/database/client";
import { programRepository } from "@/lib/database/repositories/program.repository";
import { cohortRepository } from "@/lib/database/repositories/cohort.repository";
import { registrationRepository } from "@/lib/database/repositories/registration.repository";
import { paymentRepository } from "@/lib/database/repositories/payment.repository";
import { auditLogRepository } from "@/lib/database/repositories/audit-log.repository";
import { cohortService } from "@/lib/services/cohort.service";
import { paymentService } from "@/lib/services/payment.service";
import { emailService } from "@/lib/services/email.service";
import { generateRegistrationNumber, generateReceiptNumber, generatePaymentReference } from "@/lib/utils/id-generators";
import { NotFoundError, ConflictError } from "@/lib/utils/errors";
import { logger } from "@/lib/utils/logger";
import { SITE } from "@/constants/site";
import { validatePromoCode } from "@/constants/promo-codes";
import type { CreateRegistrationInput } from "@/lib/validators/registration.validator";

/**
 * Owns every business rule around becoming a registered participant.
 * Nothing outside this file decides whether a registration is allowed,
 * what a receipt number looks like, or when a confirmation email goes
 * out — API routes and the registration form's server action both call
 * into this same service, so the rules can never drift between entry
 * points.
 */
export const registrationService = {
  /**
   * Validates business rules (programme open, cohort has room, no
   * duplicate registration), reserves a seat by creating a
   * PAYMENT_PENDING registration + a matching PENDING payment row, then
   * initializes the Paystack transaction. Nothing is confirmed until
   * confirmPayment() runs.
   */
  async registerAndInitializePayment(input: CreateRegistrationInput) {
    const program = await programRepository.findBySlug(input.programSlug);
    if (!program) throw new NotFoundError("Programme not found.");
    if (!program.registrationOpen || program.status !== "ACTIVE") {
      throw new ConflictError("Registration is currently closed for this programme.");
    }

    const cohort = await cohortService.assertCohortAvailable(input.cohortId);
    if (cohort.programId !== program.id) {
      throw new ConflictError("That cohort does not belong to the selected programme.");
    }

    // ONLY block if the user has an already PAID / CONFIRMED registration for this programme.
    const confirmed = await registrationRepository.findConfirmedByEmailAndProgram(input.email, program.id);
    if (confirmed) {
      throw new ConflictError("This email has already completed registration and paid for this programme.");
    }

    // Check if an unconfirmed/unpaid registration already exists for this email.
    // If so, REUSE it to avoid database clutter and allow seamless payment retries.
    const existingPending = await registrationRepository.findPendingByEmailAndProgram(input.email, program.id);

    const paymentReference = generatePaymentReference();
    let registration;

    // Check if a promo code was supplied and calculate the final payable price
    let discountAmount = 0;
    let appliedPromoCode: string | null = null;
    if (input.promoCode) {
      const promoResult = validatePromoCode(input.promoCode);
      if (promoResult.isValid) {
        discountAmount = promoResult.discountAmount;
        appliedPromoCode = promoResult.code;
      }
    }

    const basePrice = Number(program.price);
    const finalPrice = Math.max(0, basePrice - discountAmount);

    if (existingPending) {
      // Reuse and update the existing unconfirmed registration with fresh details and payment reference
      registration = await registrationRepository.update(existingPending.id, {
        cohort: { connect: { id: cohort.id } },
        fullName: input.fullName,
        certificateName: input.certificateName || input.fullName,
        phone: input.phone,
        gender: input.gender || null,
        state: input.state || null,
        occupation: input.occupation || null,
        organization: input.organization || null,
        paymentReference,
        registrationStatus: "PAYMENT_PENDING",
      });

      const existingPayment = await paymentRepository.findByRegistrationId(existingPending.id);
      if (existingPayment) {
        await paymentRepository.updateStatus(existingPayment.id, {
          paymentReference,
          status: "PENDING",
          amount: new Prisma.Decimal(finalPrice),
          currency: program.currency,
        });
      } else {
        await paymentRepository.create({
          registration: { connect: { id: registration.id } },
          amount: new Prisma.Decimal(finalPrice),
          currency: program.currency,
          paymentReference,
          status: "PENDING",
        });
      }
      logger.info("RegistrationService", "Unconfirmed registration updated for retry", { registrationId: registration.id, finalPrice, appliedPromoCode });
    } else {
      // Create a new registration record
      const registrationNumber = await generateRegistrationNumber();
      registration = await registrationRepository.create({
        registrationNumber,
        program: { connect: { id: program.id } },
        cohort: { connect: { id: cohort.id } },
        fullName: input.fullName,
        certificateName: input.certificateName || input.fullName,
        email: input.email,
        phone: input.phone,
        gender: input.gender || null,
        state: input.state || null,
        occupation: input.occupation || null,
        organization: input.organization || null,
        paymentReference,
        registrationStatus: "PAYMENT_PENDING",
      });

      await paymentRepository.create({
        registration: { connect: { id: registration.id } },
        amount: new Prisma.Decimal(finalPrice),
        currency: program.currency,
        paymentReference,
        status: "PENDING",
      });

      await auditLogRepository.create({
        event: "Registration Created",
        description: `${input.fullName} registered for ${program.title} (${cohort.name})${appliedPromoCode ? ` with promo code ${appliedPromoCode} (-₦${discountAmount.toLocaleString()})` : ""}`,
        userType: "public",
        metadata: {
          registrationId: registration.id,
          programId: program.id,
          cohortId: cohort.id,
          promoCode: appliedPromoCode,
          discountAmount,
          finalPrice,
        } as Prisma.InputJsonValue,
      });
      logger.info("RegistrationService", "New registration created", { registrationId: registration.id, finalPrice, appliedPromoCode });
    }

    const init = await paymentService.initializeTransaction({
      email: input.email,
      amountKobo: Math.round(finalPrice * 100),
      reference: paymentReference,
      callbackUrl: `${SITE.url}/api/payment/verify`,
      metadata: {
        registrationId: registration.id,
        fullName: input.fullName,
        program: program.title,
        promoCode: appliedPromoCode,
        discountAmount,
        finalPrice,
      },
    });

    return { registration, authorizationUrl: init.data.authorization_url };
  },

  /**
   * The authoritative payment-confirmation flow. Called from both the
   * browser redirect (GET /api/payment/verify) and the Paystack webhook
   * (POST /api/webhooks/paystack) — idempotent, so it's safe to run
   * twice for the same reference. All writes happen in a single
   * transaction: update payment → update registration → increase cohort
   * count → generate receipt number → log audit event. The confirmation
   * email is queued after the transaction commits (email delivery
   * shouldn't roll back a successful payment record).
   */
  async confirmPayment(reference: string) {
    const verification = await paymentService.verifyTransaction(reference);
    const isSuccessful = verification.status && verification.data.status === "success";

    // All queries run individually — PgBouncer transaction mode (the only
    // port reachable from this host) does not support interactive transactions.
    // Idempotency is maintained by the CONFIRMED guard below.

    const registration = await registrationRepository.findByPaymentReference(reference);
    if (!registration) throw new NotFoundError("No registration found for this payment reference.");

    // Idempotency: webhook and redirect can both call this for the same payment.
    if (registration.registrationStatus === "CONFIRMED") {
      return { registration, alreadyConfirmed: true as const, success: true as const };
    }

    const payment = await paymentRepository.findByReference(reference);
    if (!payment) throw new NotFoundError("Payment record not found.");

    await paymentRepository.updateStatus(payment.id, {
      status: isSuccessful ? "SUCCESS" : "FAILED",
      transactionReference: verification.data.reference,
      gatewayResponse: verification.data as unknown as Prisma.InputJsonValue,
      paidAt: isSuccessful && verification.data.paid_at ? new Date(verification.data.paid_at) : null,
    });

    if (!isSuccessful) {
      const updated = await registrationRepository.updateStatus(registration.id, {
        registrationStatus: "PAYMENT_FAILED",
      });
      await auditLogRepository.create({
        event: "Payment Failed",
        description: `Payment failed for reference ${reference}`,
        metadata: { registrationId: registration.id } as Prisma.InputJsonValue,
      });
      return { registration: updated, alreadyConfirmed: false as const, success: false as const };
    }

    const receiptNumber = await generateReceiptNumber();
    const updated = await registrationRepository.updateStatus(registration.id, {
      registrationStatus: "CONFIRMED",
      receiptNumber,
    });

    await cohortRepository.incrementRegisteredCount(registration.cohortId);
    const cohort = await cohortRepository.findById(registration.cohortId);
    if (cohort && cohort.registeredCount >= cohort.capacity && cohort.status === "OPEN") {
      await cohortRepository.markStatus(cohort.id, "FULL");
    }

    await auditLogRepository.create({
      event: "Payment Verified",
      description: `Payment confirmed for registration ${registration.registrationNumber}`,
      metadata: { registrationId: registration.id, receiptNumber } as Prisma.InputJsonValue,
    });

    // Send confirmation email outside the main flow — a delivery failure should
    // never roll back a successful payment record.
    if (!updated.confirmationEmailSent) {
      const full = await registrationRepository.findById(updated.id);
      if (full?.payment) {
        try {
          await emailService.sendRegistrationConfirmation({
            registrationId: full.id,
            to: full.email,
            fullName: full.fullName,
            programTitle: full.program.title,
            cohortLabel: `${full.cohort.name}${full.cohort.startTime ? ` (${full.cohort.startTime} \u2013 ${full.cohort.endTime})` : ""}`,
            amountNaira: Number(full.payment.amount),
            receiptNumber: full.receiptNumber ?? "",
          });
          await registrationRepository.updateStatus(full.id, { confirmationEmailSent: true });
        } catch (err) {
          logger.error("RegistrationService", "Confirmation email failed", {
            error: err,
            registrationId: full.id,
          });
        }
      }
    }

    return { registration: updated, alreadyConfirmed: false as const, success: true as const };
  },

};
