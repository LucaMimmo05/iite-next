import Image from "next/image";
import heroImg from "@/public/images/home/hero.webp";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-ink text-white">
      <Image
        src={heroImg}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        className="-z-10 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
      <div className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl flex-col justify-end gap-8 px-4 py-16 sm:px-8 sm:py-24">
        <h1 id="hero-title" className="max-w-4xl text-4xl leading-tight font-semibold text-balance sm:text-6xl">
          {site.tagline}
        </h1>
        <div className="flex flex-wrap gap-4">
          <Button href="#contact">Get in touch</Button>
          <Button href="#projects" variant="outline">
            Discover our projects
          </Button>
        </div>
      </div>
    </section>
  );
}
