"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
};

export function CountUp({ value, prefix = "", suffix = "", durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = `${prefix}${value}${suffix}`;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    let started = false;

    const render = (current: number) => {
      element.textContent = `${prefix}${current}${suffix}`;
    };

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        render(Math.round(value * eased));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
      fallback = setTimeout(() => {
        cancelAnimationFrame(frame);
        render(value);
      }, durationMs + 200);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (started) return;
        if (!entry.isIntersecting) {
          render(0);
          return;
        }
        if (entry.intersectionRatio === 1 && element.textContent === finalText) {
          started = true;
          observer.disconnect();
          return;
        }
        started = true;
        observer.disconnect();
        run();
      },
      { threshold: [0, 1] },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      render(value);
    };
  }, [value, prefix, suffix, durationMs, finalText]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {finalText}
      </span>
      <span className="sr-only">{finalText}</span>
    </>
  );
}
