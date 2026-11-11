"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { partners as brands } from "@/data/partners";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PartnersIndex() {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: gridEl, visible: gridVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-brands-hero" ref={heroEl}>
        <div className={`ui-brands-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-brands-eyebrow">Our Partners</p>
          <h1 className="ui-brands-headline">
            The Makers Behind Our Spaces
          </h1>
          <p className="ui-brands-hero-sub">
            We work with a small group of trusted suppliers for timber, lighting,
            furniture and surfaces — so every material we specify is one we
            know how to install and stand behind.
          </p>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="ui-brands-grid-section" ref={gridEl}>
        <div className={`ui-brands-grid-inner${gridVisible ? " visible" : ""}`}>
          <div className="ui-brands-grid">
            {brands.map((b, i) => {
              const Icon = b.icon;
              const logoSrc = b.logo;
              return (
                <Link
                  key={b.slug}
                  href={`/partners/${b.slug}`}
                  className="ui-brands-card"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {logoSrc ? (
                    <span className="ui-brands-card-logo">
                      <Image
                        src={logoSrc}
                        alt={`${b.name} logo`}
                        width={56}
                        height={56}
                        className="ui-brands-card-logo-img"
                      />
                    </span>
                  ) : (
                    <span className="ui-brands-card-icon">
                      <Icon size={28} strokeWidth={1.5} />
                    </span>
                  )}
                  <h2 className="ui-brands-card-name">{b.name}</h2>
                  <p className="ui-brands-card-level">{b.partnerLevel}</p>
                  <p className="ui-brands-card-desc">{b.description}</p>
                  <span className="ui-brands-card-link">
                    Explore {b.name} <ArrowRight size={14} strokeWidth={2} />
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
          <h2 className="ui-cta-title">Have a Project in Mind?</h2>
          <p className="ui-cta-sub">
            Tell us what you are planning and we will recommend the right
            materials and partners for it.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Quote <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
