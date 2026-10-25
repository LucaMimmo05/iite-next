"use server";

import {
  contactSchema,
  getFieldErrors,
  readContactForm,
  type ContactState,
  type ContactValues,
} from "@/lib/contact-schema";

const SIMULATED_DELAY_MS = 1200;

export async function sendContact(_previousState: ContactState, formData: FormData): Promise<ContactState> {
  const raw = readContactForm(formData);
  const values: ContactValues = {
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    company: raw.company,
    message: raw.message,
    privacy: raw.privacy,
  };

  if (formData.get("website")) {
    return { status: "success", message: "Thank you, your message has been sent." };
  }

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return {
      status: "error",
      message: "Some fields need your attention. Please check them and try again.",
      fieldErrors: getFieldErrors(result.error),
      values,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

  if (result.data.email.endsWith("@fail.test")) {
    return {
      status: "error",
      message: "We couldn’t send your message right now. Please try again in a few minutes.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: `Thank you, ${result.data.firstName}. Your message has been sent: we’ll get back to you soon.`,
  };
}
