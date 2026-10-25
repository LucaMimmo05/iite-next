import type { Stat } from "@/data/numbers";

type StatListProps = {
  stats: Stat[];
};

export function StatList({ stats }: StatListProps) {
  return (
    <ul className="grid gap-10 sm:grid-cols-3">
      {stats.map((stat) => (
        <li key={stat.slug} className="border-t border-white/30 pt-6">
          <p className="text-6xl font-semibold text-brand tabular-nums">
            {stat.prefix}
            {stat.value}
            {stat.suffix}
          </p>
          <p className="mt-3 text-lg text-neutral-200">{stat.label}</p>
        </li>
      ))}
    </ul>
  );
}
