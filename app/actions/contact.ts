"use server";

import { z } from "zod";
import { contactSchema, type ContactState } from "@/lib/contact-schema";

export async function sendContact(_previousState: ContactState, formData: FormData): Promise<ContactState> {
  const values = Object.fromEntries(formData) as Record<string, string>;

  if (values.website) {
    return { status: "success", message: "Thank you, your message has been sent." };
  }

  const result = contactSchema.safeParse(values);

  if (!result.success) {
    const errors = z.flattenError(result.error).fieldErrors;
    return { status: "error", message: "Some fields need your attention. Please check them and try again.", errors, values };
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (result.data.email.endsWith("@fail.test")) {
    return { status: "error", message: "We couldn’t send your message. Please try again later.", errors: {}, values };
  }

  return { status: "success", message: `Thank you, ${result.data.firstName}. Your message has been sent.` };
}
