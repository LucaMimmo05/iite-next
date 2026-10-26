export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 10, suffix: "%", label: "of global deaths are caused by air pollution." },
  { value: 33, suffix: "%", label: "of the global population lives with neurological conditions." },
  {
    value: 50,
    prefix: "+",
    suffix: "%",
    label: "of cities show connected pollution patterns, indicating shared sources across air and environmental degradation.",
  },
];
