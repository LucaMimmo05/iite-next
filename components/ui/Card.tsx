import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  image?: { src: StaticImageData; alt: string };
  layout?: "stacked" | "row";
  children?: ReactNode;
};

export function Card({ title, subtitle, href, image, layout = "stacked", children }: CardProps) {
  const isRow = layout === "row";

  return (
    <article
      className={`group relative border-t border-neutral-100 pt-6 pb-8 ${isRow && image ? "grid gap-6 sm:grid-cols-[2fr_3fr] sm:gap-10" : ""}`}
    >
      {image && (
        <div className="overflow-hidden rounded-sm">
          <Image
            src={image.src}
            alt={image.alt}
            sizes="(min-width: 640px) 40vw, 100vw"
            placeholder="blur"
            className="aspect-[4/3] w-full object-cover transition duration-700 motion-safe:group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="flex flex-col gap-3">
        <h3 className={`font-semibold tracking-tight font-stretch-condensed ${isRow ? "text-4xl sm:text-5xl" : "text-xl"}`}>
          {href ? (
            <Link
              href={href}
              className="rounded-sm decoration-brand-dark decoration-2 underline-offset-8 group-hover:underline after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {subtitle && <p className={isRow ? "text-xl leading-snug font-medium" : "text-neutral-400"}>{subtitle}</p>}
        {children && <div className="leading-relaxed text-neutral-400">{children}</div>}
      </div>
    </article>
  );
}
