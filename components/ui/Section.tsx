import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  intro?: ReactNode;
  tone?: "light" | "dark" | "brand";
  children?: ReactNode;
};

const tones = {
  light: { section: "bg-neutral-50 text-neutral-800", rule: "bg-neutral-100", node: "bg-brand" },
  dark: { section: "bg-neutral-800 text-white", rule: "bg-neutral-600", node: "bg-brand" },
  brand: { section: "bg-brand-soft text-neutral-800", rule: "bg-brand", node: "bg-brand" },
} satisfies Record<NonNullable<SectionProps["tone"]>, { section: string; rule: string; node: string }>;

export function Section({ id, title, intro, tone = "light", children }: SectionProps) {
  const titleId = `${id}-title`;
  const styles = tones[tone];

  return (
    <section id={id} aria-labelledby={titleId} className={`${styles.section} px-4 sm:px-8`}>
      <div
        className={`relative mx-auto max-w-6xl py-16 sm:py-24 lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12`}
      >
        <span aria-hidden="true" className={`reveal-rule absolute top-0 left-0 h-px w-full ${styles.rule}`} />
        <span aria-hidden="true" className={`reveal-node absolute -top-[4px] left-0 size-[9px] ${styles.node}`} />
        <h2 id={titleId} className="text-2xl font-semibold tracking-tight font-stretch-condensed">
          {title}
        </h2>
        <div className="mt-6 lg:mt-0">
          {intro && (
            <div className="max-w-3xl text-2xl leading-snug font-medium text-balance sm:text-4xl sm:leading-tight">
              {intro}
            </div>
          )}
          {children && <div className={intro ? "mt-12 sm:mt-16" : undefined}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
