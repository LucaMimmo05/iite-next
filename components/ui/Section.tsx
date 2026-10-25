import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  children?: ReactNode;
};

const tones = {
  light: "bg-white text-neutral-900",
  dark: "bg-neutral-950 text-white",
} satisfies Record<NonNullable<SectionProps["tone"]>, string>;

export function Section({ id, title, intro, tone = "light", children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`${tones[tone]} px-4 py-16 sm:px-8 sm:py-24`}>
      <div className="mx-auto max-w-6xl">
        <h2 id={titleId} className="text-sm font-semibold tracking-widest uppercase">
          {title}
        </h2>
        {intro && <div className="mt-4 max-w-3xl text-2xl leading-snug sm:text-3xl">{intro}</div>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
