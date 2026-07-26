import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address."),
  message: z.string().trim().min(10, "Message is too short.").max(2000, "Message is too long."),
});

export type ContactInput = z.infer<typeof contactSchema>;
