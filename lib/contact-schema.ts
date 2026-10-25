import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name."),
  lastName: z.string().trim().min(1, "Please enter your last name."),
  email: z.email("Please enter a valid email address, like name@company.com."),
  company: z.string().trim().optional(),
  message: z.string().trim().min(10, "Please write a message of at least 10 characters."),
  privacy: z.literal("on", "Please accept the Privacy Policy to send your message."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactErrors = Partial<Record<keyof ContactInput, string[]>>;

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; errors: ContactErrors; values: Record<string, string> }
  | { status: "success"; message: string };
