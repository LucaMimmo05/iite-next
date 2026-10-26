"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import type { ContactState } from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };

type FieldProps = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  multiline?: boolean;
  defaultValue?: string;
  errors?: string[];
};

function Field({ name, label, type = "text", autoComplete, required = false, multiline = false, defaultValue, errors }: FieldProps) {
  const id = `contact-${name}`;
  const inputProps = {
    id,
    name,
    required,
    defaultValue,
    "aria-invalid": Boolean(errors),
    "aria-describedby": errors ? `${id}-error` : undefined,
    className:
      "w-full rounded-sm border border-neutral-400 bg-white px-4 py-3 hover:border-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-800 aria-invalid:border-red-600",
  };

  return (
    <div className={`flex flex-col gap-2 ${multiline ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="font-medium">
        {label}
        {!required && <span className="font-normal text-neutral-400"> (optional)</span>}
      </label>
      {multiline ? (
        <textarea rows={6} minLength={10} {...inputProps} />
      ) : (
        <input type={type} autoComplete={autoComplete} {...inputProps} />
      )}
      {errors && (
        <p id={`${id}-error`} className="animate-fade text-sm font-medium text-red-600">
          {errors[0]}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const errors = state.status === "error" ? state.errors : {};
  const values = state.status === "error" ? state.values : {};

  useEffect(() => {
    if (state.status === "idle") return;
    const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
    (firstInvalid ?? statusRef.current)?.focus();
  }, [state]);

  let statusText = "";
  let statusStyle = "";
  if (isPending) {
    statusText = "Sending your message…";
    statusStyle = "border-neutral-400 bg-neutral-50";
  } else if (state.status === "error") {
    statusText = state.message;
    statusStyle = "border-red-600 bg-white text-red-600";
  } else if (state.status === "success") {
    statusText = state.message;
    statusStyle = "border-brand-dark bg-brand-soft";
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="grid max-w-3xl gap-6 rounded-md border border-neutral-100 bg-white p-6 sm:grid-cols-2 sm:p-10"
    >
      <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <Field name="firstName" label="First name" autoComplete="given-name" required defaultValue={values.firstName} errors={errors.firstName} />
      <Field name="lastName" label="Last name" autoComplete="family-name" required defaultValue={values.lastName} errors={errors.lastName} />
      <Field name="email" label="Email" type="email" autoComplete="email" required defaultValue={values.email} errors={errors.email} />
      <Field name="company" label="Company" autoComplete="organization" defaultValue={values.company} errors={errors.company} />
      <Field name="message" label="Message" multiline required defaultValue={values.message} errors={errors.message} />

      <div className="flex flex-col gap-2 sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id="contact-privacy"
            name="privacy"
            type="checkbox"
            required
            defaultChecked={values.privacy === "on"}
            aria-invalid={Boolean(errors.privacy)}
            aria-describedby={errors.privacy ? "contact-privacy-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-800"
          />
          <label htmlFor="contact-privacy">
            I have read and accept the{" "}
            <a
              href="/legal/privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline decoration-brand-dark decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-neutral-800"
            >
              Privacy Policy
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
            .
          </label>
        </div>
        {errors.privacy && (
          <p id="contact-privacy-error" className="animate-fade text-sm font-medium text-red-600">
            {errors.privacy[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Send message"}
        </Button>
        <p
          ref={statusRef}
          role="status"
          tabIndex={-1}
          className={statusText ? `w-full rounded-md border-l-4 px-4 py-3 focus:outline-none ${statusStyle}` : "sr-only"}
        >
          {statusText && (
            <span key={statusText} className="animate-fade block">
              {statusText}
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
