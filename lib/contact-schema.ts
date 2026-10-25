import { z } from "zod";

export const contactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { error: "Please enter your first name." })
    .max(80, { error: "First name must be at most 80 characters." }),
  lastName: z
    .string()
    .trim()
    .min(1, { error: "Please enter your last name." })
    .max(80, { error: "Last name must be at most 80 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { error: "Please enter your email address." })
    .pipe(z.email({ error: "Please enter a valid email address, like name@company.com." })),
  company: z
    .string()
    .trim()
    .max(120, { error: "Company name must be at most 120 characters." })
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, { error: "Please write a message of at least 10 characters." })
    .max(2000, { error: "Message must be at most 2000 characters." }),
  privacy: z.literal("on", { error: "Please accept the Privacy Policy to send your message." }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactField = keyof ContactInput;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactValues = Partial<Record<ContactField, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "error"; message: string; fieldErrors: ContactFieldErrors; values: ContactValues }
  | { status: "success"; message: string };

export const contactFields = [
  "firstName",
  "lastName",
  "email",
  "company",
  "message",
  "privacy",
] as const satisfies readonly ContactField[];

export function readContactForm(formData: FormData) {
  const entries: Record<string, string> = {};
  for (const field of contactFields) {
    const value = formData.get(field);
    if (typeof value === "string") entries[field] = value;
    else if (field !== "privacy") entries[field] = "";
  }
  return entries;
}

export function getFieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  const { fieldErrors } = z.flattenError(error);
  const result: ContactFieldErrors = {};
  for (const field of contactFields) {
    const first = fieldErrors[field]?.[0];
    if (first) result[field] = first;
  }
  return result;
}
