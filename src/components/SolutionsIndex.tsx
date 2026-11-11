"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/data/solutions";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

export default function SolutionsIndex() {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: gridEl, visible: gridVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-sol-hero" ref={heroEl}>
        <div className={`ui-sol-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-sol-eyebrow">Our Services</p>
          <h1 className="ui-sol-headline">
            Interior Design &amp; Build Services
          </h1>
          <p className="ui-sol-hero-sub">
            From space planning to final styling — everything your commercial
            interior needs, delivered by one accountable team.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="ui-sol-grid-section" ref={gridEl}>
        <div className={`ui-sol-grid-inner${gridVisible ? " visible" : ""}`}>
          <div className="ui-sol-grid">
            {solutions.map((s, i) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="ui-sol-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="ui-sol-card-icon">
                  <s.icon size={24} strokeWidth={1.6} />
                </span>
                <h2 className="ui-sol-card-title">{s.name}</h2>
                <p className="ui-sol-card-tagline">{s.tagline}</p>
                <p className="ui-sol-card-desc">{s.description}</p>
                <span className="ui-sol-card-link">
                  Learn More <ArrowRight size={14} strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-cta" ref={ctaEl}>
        <div className={`ui-cta-inner${ctaVisible ? " visible" : ""}`}>
          <h2 className="ui-cta-title">
            Not Sure Which Solution Fits?
          </h2>
          <p className="ui-cta-sub">
            Talk to our team — we&rsquo;ll assess your infrastructure needs and
            recommend the right approach.
          </p>
          <Link href="/contact" className="ui-cta-btn" onClick={() => trackEvent("cta_click", { cta_location: "solutions_page", cta_text: "Get a Consultation" })}>
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
