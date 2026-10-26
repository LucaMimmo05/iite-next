import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  divider?: boolean;
  children?: ReactNode;
};

const tones = {
  light: "bg-neutral-50 text-neutral-800",
  dark: "bg-neutral-800 text-white",
};

export function Section({ id, title, intro, tone = "light", divider = true, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`px-4 sm:px-8 ${tones[tone]}`}>
      <div className="relative mx-auto max-w-6xl py-16 sm:py-24 lg:grid lg:grid-cols-[12rem_1fr] lg:gap-12">
        {divider && (
          <>
            <span aria-hidden="true" className="absolute top-0 left-0 h-px w-full bg-brand" />
            <span aria-hidden="true" className="absolute -top-1 left-0 size-[9px] bg-brand" />
          </>
        )}

        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight font-stretch-condensed">
          {title}
        </h2>

        <div className="mt-6 lg:mt-0">
          {intro && <p className="max-w-3xl text-2xl leading-snug font-medium text-balance sm:text-4xl">{intro}</p>}
          {children && <div className={intro ? "mt-12 sm:mt-16" : ""}>{children}</div>}
        </div>
      </div>
    </section>
  );
}
