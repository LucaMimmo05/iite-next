import { site } from "@/data/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <h1 id="hero-title">{site.tagline}</h1>
    </section>
  );
}
