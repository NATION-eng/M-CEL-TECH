import { z } from "zod";

export const initializePaymentSchema = z.object({
  registrationId: z.string().uuid("A valid registration id is required."),
});

export const verifyPaymentSchema = z.object({
  reference: z.string().min(1, "A payment reference is required."),
});

export type InitializePaymentInput = z.infer<typeof initializePaymentSchema>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
