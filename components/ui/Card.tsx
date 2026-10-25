import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  href?: string;
  image?: { src: StaticImageData; alt: string };
  imageSizes?: string;
  children?: ReactNode;
};

export function Card({
  title,
  subtitle,
  href,
  image,
  imageSizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  children,
}: CardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          sizes={imageSizes}
          placeholder="blur"
          className="aspect-[4/3] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-xl font-semibold">
          {href ? (
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-has-[:focus-visible]:underline"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {subtitle && <p className="font-medium text-neutral-700">{subtitle}</p>}
        {children && <div className="text-neutral-600">{children}</div>}
      </div>
      {href && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-lg ring-emerald-500 ring-offset-2 group-has-[:focus-visible]:ring-2"
        />
      )}
    </article>
  );
}
