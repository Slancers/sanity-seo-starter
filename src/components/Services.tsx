"use client";

import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { solutions } from "@/data/solutions";

// Homepage cards are generated from src/data/solutions.ts
const services = solutions.map((s) => ({
  icon: s.icon,
  name: s.name,
  description: s.description,
  href: `/solutions/${s.slug}`,
}));

export default function Services() {
  const { revealRef, visible } = useScrollReveal();

  return (
    <section className="ui-services" ref={revealRef}>
      <div className="ui-services-inner">
        <p className={`ui-services-label${visible ? " visible" : ""}`}>
          Our Services
        </p>
        <h2 className={`ui-services-title${visible ? " visible" : ""}`}>
          Everything Your Space Needs, Under One Roof
        </h2>
        <p className={`ui-services-sub${visible ? " visible" : ""}`}>
          From space planning to the final piece of furniture, one team takes
          your project from idea to opening day.
        </p>

        <div className="ui-services-grid">
          {services.map((service, i) => (
            <a
              key={service.name}
              href={service.href}
              className={`ui-service-card${visible ? " visible" : ""}`}
              style={{ transitionDelay: visible ? `${i * 0.08}s` : "0s" }}
            >
              <div className="ui-service-icon">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="ui-service-name">{service.name}</h3>
              <p className="ui-service-desc">{service.description}</p>
              <span className="ui-service-link">
                Learn more <ArrowRight size={14} strokeWidth={2} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
