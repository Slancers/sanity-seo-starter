"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { value: 200, suffix: "+", label: "Spaces Delivered" },
  { value: 6, suffix: "", label: "Industries Served" },
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 98, suffix: "%", label: "On-Time Handovers" },
];

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, started]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const count = useCountUp(value, 2000, started);

  return (
    <div className="ui-stat">
      <span className="ui-stat-number">
        {started ? count.toLocaleString() : "0"}
        {suffix}
      </span>
      <span className="ui-stat-label">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const { revealRef, visible } = useScrollReveal(0.3);

  return (
    <section className="ui-stats" ref={revealRef}>
      <div className="ui-stats-inner">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} started={visible} />
        ))}
      </div>
    </section>
  );
}
