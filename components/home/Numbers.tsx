import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { StatList } from "@/components/ui/StatList";
import { stats } from "@/data/numbers";

export function Numbers() {
  return (
    <Section
      id="numbers"
      title="Today’s panorama"
      tone="dark"
      intro="Institute Itech works for a future in which technology strengthens human wellbeing, societal resilience and environmental sustainability."
    >
      <StatList stats={stats} />
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
