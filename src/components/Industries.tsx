"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { industries as industryData } from "@/data/industries";

// Homepage cards are generated from src/data/industries.ts
const industries = industryData.map((i) => ({
  icon: i.icon,
  name: i.name,
  description: i.description,
  href: `/industries/${i.slug}`,
}));

export default function Industries() {
  const { revealRef, visible } = useScrollReveal();

  return (
    <section className="ui-industries" ref={revealRef}>
      <div className="ui-industries-inner">
        <h2 className={`ui-industries-title${visible ? " visible" : ""}`}>
          Industries We Serve
        </h2>
        <p className={`ui-industries-sub${visible ? " visible" : ""}`}>
          Every kind of space has its own rhythm. We design for it.
        </p>

        <div className="ui-industries-grid">
          {industries.map((industry, i) => (
            <Link
              href={industry.href}
              key={industry.name}
              className={`ui-industry-card${visible ? " visible" : ""}`}
              style={{ transitionDelay: visible ? `${i * 0.08}s` : "0s" }}
            >
              <div className="ui-industry-icon">
                <industry.icon size={26} strokeWidth={1.5} />
              </div>
              <h3 className="ui-industry-name">{industry.name}</h3>
              <p className="ui-industry-desc">{industry.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
