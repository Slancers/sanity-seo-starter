"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { partners } from "@/data/partners";

export default function PartnersTestimonial() {
  const { revealRef, visible } = useScrollReveal();

  return (
    <section className="ui-partners" ref={revealRef}>
      <div className="ui-partners-inner">
        <h2 className={`ui-partners-title${visible ? " visible" : ""}`}>
          Our Partners
        </h2>

        <div className={`ui-partners-marquee${visible ? " visible" : ""}`}>
          <div className="ui-partners-track">
            {[...partners, ...partners].map((p, i) => (
              <span key={`${p.name}-${i}`} className="ui-partner-item">
                {p.logo ? (
                  <Image
                    src={p.logo}
                    alt={`${p.name} logo`}
                    width={36}
                    height={36}
                    className="ui-partner-logo-img"
                  />
                ) : null}
                <span className="ui-partner-name">{p.name}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={`ui-testimonial${visible ? " visible" : ""}`}>
          <span className="ui-testimonial-quote-mark">&ldquo;</span>
          <blockquote className="ui-testimonial-text">
            We opened on the date we promised our investors, on budget, and the
            room looks exactly like the renderings. Having design and
            construction on one team made every decision faster.
          </blockquote>
          <div className="ui-testimonial-attr">
            <strong>Jordan Ellis</strong>
            <span>Owner, Sample Bistro (demo testimonial)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
