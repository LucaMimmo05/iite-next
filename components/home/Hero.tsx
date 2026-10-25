import Image from "next/image";
import heroImg from "@/public/images/home/hero.webp";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-neutral-50 px-4 sm:px-8">
      <Image
        src={heroImg}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        className="animate-settle -z-10 object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50/95 via-neutral-50/75 to-neutral-50/30 sm:bg-gradient-to-r sm:from-neutral-50 sm:via-neutral-50/70 sm:to-transparent"
      />
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-12 pt-14 pb-12 sm:min-h-[calc(100svh-4rem)] sm:gap-16 sm:pt-24 sm:pb-16">
        <h1
          id="hero-title"
          className="animate-lift max-w-[16ch] text-5xl leading-[0.95] font-semibold tracking-tight text-balance font-stretch-condensed sm:text-7xl xl:text-8xl"
        >
          {site.tagline}
        </h1>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="animate-rise max-w-md text-lg leading-relaxed text-neutral-600 [animation-delay:250ms]">{site.description}</p>
          <div className="animate-rise flex flex-wrap gap-3 [animation-delay:400ms]">
            <Button href="#contact">Get in touch</Button>
            <Button href="#projects" variant="outline">
              See our projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
