"use client";

import { useActionState, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { sendContact } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { legalLinks } from "@/data/site";
import {
  contactFields,
  contactSchema,
  getFieldErrors,
  readContactForm,
  type ContactField,
  type ContactFieldErrors,
  type ContactState,
} from "@/lib/contact-schema";

const initialState: ContactState = { status: "idle" };

const privacyLink = legalLinks.find((link) => link.label === "Privacy Policy");

const inputClass =
  "w-full rounded-sm border border-neutral-400 bg-white px-4 py-3 text-base text-neutral-800 transition-colors hover:border-neutral-800 focus-visible:border-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-neutral-800 aria-invalid:border-red-600";

function focusFirstInvalid(form: HTMLFormElement | null, errors: ContactFieldErrors) {
  const first = contactFields.find((field) => errors[field]);
  if (!first || !form) return;
  const element = form.elements.namedItem(first);
  if (element instanceof HTMLElement) element.focus();
}

type FieldProps = {
  name: ContactField;
  label: string;
  error?: string;
  optional?: boolean;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
};

function Field({ name, label, error, optional, children }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-medium">
        {label}
        {optional && <span className="font-normal text-neutral-400"> (optional)</span>}
      </label>
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="animate-fade text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContact, initialState);
  const [clientErrors, setClientErrors] = useState<ContactFieldErrors | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const serverErrors = state.status === "error" ? state.fieldErrors : {};
  const errors = clientErrors ?? serverErrors;
  const values = state.status === "error" ? state.values : {};

  useEffect(() => {
    if (state.status === "idle") return;
    if (state.status === "error" && Object.keys(state.fieldErrors).length > 0) {
      focusFirstInvalid(formRef.current, state.fieldErrors);
    } else {
      statusRef.current?.focus();
    }
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const result = contactSchema.safeParse(readContactForm(new FormData(event.currentTarget)));
    if (result.success) {
      setClientErrors(null);
      return;
    }
    event.preventDefault();
    const fieldErrors = getFieldErrors(result.error);
    setClientErrors(fieldErrors);
    focusFirstInvalid(event.currentTarget, fieldErrors);
  }

  let statusMessage = "";
  if (isPending) statusMessage = "Sending your message…";
  else if (clientErrors) statusMessage = "Some fields need your attention. Please check them and try again.";
  else if (state.status !== "idle") statusMessage = state.message;

  const statusTone =
    !isPending && (clientErrors || state.status === "error")
      ? "border-red-600 bg-white text-red-600"
      : !isPending && state.status === "success"
        ? "border-brand-dark bg-brand-soft text-neutral-800"
        : "border-neutral-400 bg-neutral-50 text-neutral-800";

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      aria-describedby="contact-status"
      className="grid max-w-3xl gap-6 rounded-md border border-neutral-100 bg-white p-6 sm:grid-cols-2 sm:p-10"
    >
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field name="firstName" label="First name" error={errors.firstName}>
        {(props) => (
          <input
            {...props}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            defaultValue={values.firstName}
            className={inputClass}
          />
        )}
      </Field>

      <Field name="lastName" label="Last name" error={errors.lastName}>
        {(props) => (
          <input
            {...props}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            defaultValue={values.lastName}
            className={inputClass}
          />
        )}
      </Field>

      <Field name="email" label="Email" error={errors.email}>
        {(props) => (
          <input
            {...props}
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            className={inputClass}
          />
        )}
      </Field>

      <Field name="company" label="Company" error={errors.company} optional>
        {(props) => (
          <input
            {...props}
            name="company"
            type="text"
            autoComplete="organization"
            defaultValue={values.company}
            className={inputClass}
          />
        )}
      </Field>

      <div className="sm:col-span-2">
        <Field name="message" label="Message" error={errors.message}>
          {(props) => (
            <textarea
              {...props}
              name="message"
              rows={6}
              required
              defaultValue={values.message}
              className={inputClass}
            />
          )}
        </Field>
      </div>

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
              href={privacyLink?.href}
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
          <p id="contact-privacy-error" className="text-sm font-medium text-red-600">
            {errors.privacy}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 sm:col-span-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending…" : "Send message"}
        </Button>
        <p
          id="contact-status"
          ref={statusRef}
          role="status"
          tabIndex={-1}
          className={statusMessage ? `w-full rounded-md border-l-4 px-4 py-3 focus:outline-none ${statusTone}` : "sr-only"}
        >
          <span key={statusMessage} className="animate-fade block">
            {statusMessage}
          </span>
        </p>
      </div>
    </form>
  );
}
