import { z } from "zod";

/**
 * Shared between the client-side registration form and the /api/register
 * route — the server never trusts client validation alone (the service
 * layer re-checks business rules like cohort capacity independently),
 * but the shape of a valid request is defined once, here.
 */
export const createRegistrationSchema = z.object({
  programSlug: z.string().min(1, "Programme is required."),
  cohortId: z.string().uuid("Session unavailable — please refresh the page."),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  certificateName: z.string().trim().max(120, "Certificate name is too long.").optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .regex(/^[0-9+()\-\s]+$/, "Use digits only, e.g. +234 800 000 0000."),
  gender: z.string().trim().max(20).optional().or(z.literal("")),
  state: z.string().trim().max(100).optional().or(z.literal("")),
  occupation: z.string().trim().max(120).optional().or(z.literal("")),
  organization: z.string().trim().max(150, "Organization name is too long.").optional().or(z.literal("")),
  promoCode: z.string().trim().max(50).optional().or(z.literal("")),
  referralCode: z.string().trim().max(100).optional().or(z.literal("")),
});

export type CreateRegistrationInput = z.infer<typeof createRegistrationSchema>;

/**
 * The subset of fields the registration form actually collects
 * (programSlug is implicit — the form only exists on that programme's
 * page — and is added by the server action before calling the service).
 */
export const registrationFormSchema = z.object({
  cohortId: z.string().uuid("Session unavailable — please refresh the page."),
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Phone number is too long.")
    .regex(/^[0-9+()\-\s]+$/, "Use digits only, e.g. +234 800 000 0000."),
  organization: z.string().trim().max(150, "Organization name is too long.").optional().or(z.literal("")),
  promoCode: z.string().trim().max(50).optional().or(z.literal("")),
  referralCode: z.string().trim().max(100).optional().or(z.literal("")),
});

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
