import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  image?: { src: StaticImageData; alt: string };
  imageSizes?: string;
  layout?: "stacked" | "row";
  children?: ReactNode;
};

function GridPlaceholder() {
  return (
    <div aria-hidden="true" className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-brand-soft">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-neutral-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-100)_1px,transparent_1px)] bg-[size:25%_33.333%]" />
      <span className="absolute top-1/3 left-1/2 size-[9px] -translate-x-1/2 -translate-y-1/2 bg-brand transition-[left] duration-700 ease-out motion-safe:group-hover:left-3/4" />
      <span className="absolute top-2/3 left-3/4 size-[9px] -translate-x-1/2 -translate-y-1/2 bg-neutral-800 transition-[left] duration-700 ease-out motion-safe:group-hover:left-1/4" />
    </div>
  );
}

export function Card({
  title,
  subtitle,
  href,
  image,
  imageSizes = "(min-width: 640px) 40vw, 100vw",
  layout = "stacked",
  children,
}: CardProps) {
  const isExternal = href?.startsWith("http") ?? false;
  const isRow = layout === "row";

  const media = image ? (
    <div className="overflow-hidden rounded-sm">
      <Image
        src={image.src}
        alt={image.alt}
        sizes={imageSizes}
        placeholder="blur"
        className={`aspect-[4/3] w-full object-cover ${
          href ? "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]" : ""
        }`}
      />
    </div>
  ) : isRow ? (
    <GridPlaceholder />
  ) : null;

  return (
    <article
      className={`group relative border-t border-neutral-100 pt-6 ${
        isRow ? "grid gap-6 pb-10 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-10" : "flex h-full flex-col gap-2 pb-6"
      }`}
    >
      {media}
      <div className="flex flex-col gap-3">
        <h3 className={`font-semibold tracking-tight font-stretch-condensed ${isRow ? "text-4xl sm:text-5xl" : "text-xl"}`}>
          {href ? (
            <Link
              href={href}
              className="decoration-brand-dark decoration-2 underline-offset-8 group-hover:underline after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {title}
              {isExternal && <span className="sr-only"> (page on iite.eu)</span>}
            </Link>
          ) : (
            title
          )}
        </h3>
        {subtitle && <p className={isRow ? "text-xl leading-snug font-medium" : "text-neutral-400"}>{subtitle}</p>}
        {children && <div className="leading-relaxed text-neutral-400">{children}</div>}
      </div>
      {href && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 rounded-md ring-neutral-800 group-has-[:focus-visible]:ring-2"
        />
      )}
    </article>
  );
}
