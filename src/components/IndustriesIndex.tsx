"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function IndustriesIndex() {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: gridEl, visible: gridVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-ind-hero" ref={heroEl}>
        <div className={`ui-ind-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-ind-eyebrow">Industries</p>
          <h1 className="ui-ind-headline">
            Interiors Built for How You Work
          </h1>
          <p className="ui-ind-hero-sub">
            Offices, restaurants, clinics and stores all have different rhythms,
            rules and pressures. We design and build for yours.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="ui-ind-grid-section" ref={gridEl}>
        <div className={`ui-ind-grid-inner${gridVisible ? " visible" : ""}`}>
          <div className="ui-ind-grid">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="ui-ind-card"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="ui-ind-card-icon">
                    <Icon size={28} strokeWidth={1.5} />
                  </span>
                  <h2 className="ui-ind-card-name">{ind.name}</h2>
                  <p className="ui-ind-card-tagline">{ind.tagline}</p>
                  <p className="ui-ind-card-desc">{ind.description}</p>
                  <span className="ui-ind-card-link">
                    Learn More <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-cta" ref={ctaEl}>
        <div className={`ui-cta-inner${ctaVisible ? " visible" : ""}`}>
          <h2 className="ui-cta-title">Don&rsquo;t See Your Industry?</h2>
          <p className="ui-cta-sub">
            We&rsquo;ve delivered 1,400+ projects across sectors. Tell us about
            your requirements and we&rsquo;ll design a solution that fits.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
