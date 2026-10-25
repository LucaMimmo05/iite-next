import { CountUp } from "@/components/ui/CountUp";
import type { Stat } from "@/data/numbers";

type StatListProps = {
  stats: Stat[];
};

export function StatList({ stats }: StatListProps) {
  return (
    <ul className="grid gap-12 sm:grid-cols-3 sm:gap-0">
      {stats.map((stat) => (
        <li key={stat.slug} className="border-l border-neutral-600 pl-6 sm:pr-6">
          <p className="text-7xl leading-none font-semibold tracking-tight text-brand tabular-nums font-stretch-condensed sm:text-8xl">
            <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
          </p>
          <p className="mt-4 max-w-[28ch] text-lg leading-snug text-neutral-100">{stat.label}</p>
        </li>
      ))}
    </ul>
  );
}
