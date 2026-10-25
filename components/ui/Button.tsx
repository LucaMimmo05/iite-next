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
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-base font-semibold transition-[opacity,transform] duration-150 motion-safe:active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-brand text-neutral-800 hover:opacity-90 focus-visible:outline-neutral-800",
  outline: "border border-current hover:opacity-75 focus-visible:outline-current",
} satisfies Record<NonNullable<CommonProps["variant"]>, string>;

export function Button(props: ButtonProps) {
  const className = [base, variants[props.variant ?? "primary"], props.className]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
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
