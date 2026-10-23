export type Stat = {
  slug: string;
  value: number;
  prefix?: string; 
  suffix?: string;
  label: string;
};

export const stats = [
  {
    slug: "air-pollution-deaths",
    value: 10,
    suffix: "%",
    label: "of global deaths are caused by air pollution.",
  },
  {
    slug: "neurological-conditions",
    value: 33,
    suffix: "%",
    label: "of the global population lives with neurological conditions.",
  },
  {
    slug: "connected-pollution",
    value: 50,
    prefix: "+",
    suffix: "%",
    label:
      "of cities show connected pollution patterns, indicating shared sources across air and environmental degradation.",
  },
] satisfies Stat[];
