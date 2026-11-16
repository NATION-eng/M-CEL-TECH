import { z } from "zod";
import { EQUIP_2027 } from "@/constants/equip2027";

export const equipCategoryEnum = z.enum([
  "TEENAGER",
  "UNIVERSITY_STUDENT",
  "WORKING_ADULT",
  "SPONSOR",
]);

export const equipTrackEnum = z.enum(["ONLINE_EVENING", "PHYSICAL_SPRINT"]);

export const equipApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Full name is too long."),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid WhatsApp phone number.")
    .max(30, "Phone number is too long."),
  conference: z.string().min(2, "Please select your church conference."),
  localChurch: z
    .string()
    .trim()
    .min(2, "Please enter your local church or district name.")
    .max(150, "Church name is too long."),
  category: equipCategoryEnum,
  slots: z.coerce
    .number()
    .int()
    .min(1, "At least 1 slot is required.")
    .max(500, "Maximum slot count exceeded.")
    .default(1),
  track: equipTrackEnum.optional().default("ONLINE_EVENING"),
  hasDevice: z.boolean().optional().default(true),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),
});

export type EquipApplicationInput = z.infer<typeof equipApplicationSchema>;
