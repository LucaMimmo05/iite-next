import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

const variants = {
  primary: "bg-brand text-neutral-800 hover:opacity-90 focus-visible:outline-neutral-800",
  outline: "border border-current hover:opacity-75 focus-visible:outline-current",
};

export function Button({ children, variant = "primary", href, type = "button", disabled }: ButtonProps) {
  const className = `inline-flex min-h-12 items-center justify-center rounded-full px-6 font-semibold transition motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={className}>
      {children}
    </button>
  );
}
