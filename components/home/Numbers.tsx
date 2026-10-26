import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { stats } from "@/data/numbers";

export function Numbers() {
  return (
    <Section
      id="numbers"
      title="Today’s panorama"
      tone="dark"
      divider={false}
      intro="Institute Itech works for a future in which technology strengthens human wellbeing, societal resilience and environmental sustainability."
    >
      <ul className="grid gap-12 sm:grid-cols-3 sm:gap-0">
        {stats.map((stat) => (
          <li key={stat.label} className="border-l border-neutral-600 pl-6 sm:pr-6">
            <p className="text-7xl leading-none font-semibold tracking-tight text-brand font-stretch-condensed sm:text-8xl">
              {stat.prefix}
              {stat.value}
              {stat.suffix}
            </p>
            <p className="mt-4 max-w-[28ch] text-lg leading-snug text-neutral-100">{stat.label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-2xl text-2xl leading-snug font-medium text-balance sm:text-3xl">
          We turn advanced research into technologies that improve the air we breathe, help regenerate urban
          environments and support smarter, less invasive diagnostic methods.
        </p>
        <Button href="#contact">Partner with us</Button>
      </div>
    </Section>
  );
}
