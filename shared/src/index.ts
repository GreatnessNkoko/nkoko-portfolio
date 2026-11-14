import { z } from "zod";

/**
 * The contact form contract, shared by the website (browser-side checks)
 * and the API (the checks that actually count).
 */
export const contactMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Your name is too long."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(200, "Your email address is too long."),
  subject: z
    .string()
    .trim()
    .max(150, "The subject is too long.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more (at least 10 characters).")
    .max(5000, "Your message is too long (5000 characters at most)."),
  /** Honeypot: hidden from people, filled in by spam bots. Must stay empty. */
  website: z.string().max(0).optional().default(""),
});

export type ContactMessageInput = z.input<typeof contactMessageSchema>;
export type ContactMessage = z.output<typeof contactMessageSchema>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; field?: string };
