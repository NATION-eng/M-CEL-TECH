import { z } from "zod";

export const COHORT_IDS = ["morning", "afternoon", "evening"] as const;

export const registrationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+()\-\s]+$/, "Use digits only, e.g. +234 800 000 0000"),
  organization: z
    .string()
    .trim()
    .max(150, "Organization name is too long")
    .optional()
    .or(z.literal("")),
  cohort: z.enum(COHORT_IDS, {
    errorMap: () => ({ message: "Please select a cohort" }),
  }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
