import Link from "next/link";
import type { ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

type LinkButtonProps = CommonProps & {
  href: string;
  type?: never;
  disabled?: never;
  onClick?: never;
};

type NativeButtonProps = CommonProps & {
  href?: never;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export type ButtonProps = LinkButtonProps | NativeButtonProps;

const base =
  "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold tracking-wide uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-brand text-ink hover:bg-[#3bf0a2] focus-visible:outline-brand",
  outline: "border-2 border-current hover:bg-white/10 focus-visible:outline-current",
} satisfies Record<NonNullable<CommonProps["variant"]>, string>;

export function Button(props: ButtonProps) {
  const className = [base, variants[props.variant ?? "primary"], props.className]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
        <span aria-hidden="true">→</span>
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      className={className}
    >
      {props.children}
    </button>
  );
}
