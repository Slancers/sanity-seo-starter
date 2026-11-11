"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getSolutionBySlug, solutions } from "@/data/solutions";

interface Props {
  slug: string;
}

export default function SolutionDetail({ slug }: Props) {
  const solution = getSolutionBySlug(slug)!;
  const relatedSolutions = solutions
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: featuresEl, visible: featuresVisible } = useScrollReveal(0.1);
  const { revealRef: benefitsEl, visible: benefitsVisible } = useScrollReveal(0.1);
  const { revealRef: faqRefEl, visible: faqRefVisible } = useScrollReveal(0.1);
  const { revealRef: relatedEl, visible: relatedVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  const Icon = solution.icon;

  return (
    <>
      {/* Hero */}
      <section className="ui-sold-hero" ref={heroEl}>
        <div className={`ui-sold-hero-inner${heroVisible ? " visible" : ""}`}>
          <Link href="/solutions" className="ui-sold-back">
            &larr; All Solutions
          </Link>
          <div className="ui-sold-hero-icon">
            <Icon size={32} strokeWidth={1.5} />
          </div>
          <h1 className="ui-sold-headline">{solution.name}</h1>
          <p className="ui-sold-tagline">{solution.tagline}</p>
          <p className="ui-sold-hero-desc">{solution.heroDescription}</p>
          <div className="ui-sold-hero-actions">
            <Link href="/contact" className="ui-sold-btn-primary">
              Get a Consultation <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="ui-sold-features" ref={featuresEl}>
        <div className={`ui-sold-features-inner${featuresVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title">What We Deliver</h2>
          <p className="ui-sold-section-sub">
            Key capabilities within our {solution.name.toLowerCase()} service.
          </p>
          <div className="ui-sold-features-grid">
            {solution.features.map((f, i) => (
              <div
                key={f.title}
                className="ui-sold-feature-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h3 className="ui-sold-feature-title">{f.title}</h3>
                <p className="ui-sold-feature-desc">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Technologies */}
      <section className="ui-sold-benefits" ref={benefitsEl}>
        <div className={`ui-sold-benefits-inner${benefitsVisible ? " visible" : ""}`}>
          <div className="ui-sold-benefits-col">
            <h2 className="ui-sold-section-title">Why Choose Us</h2>
            <ul className="ui-sold-benefits-list">
              {solution.benefits.map((b) => (
                <li key={b} className="ui-sold-benefit-item">
                  <span className="ui-sold-benefit-check">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="ui-sold-tech-col">
            <h2 className="ui-sold-section-title">Tools &amp; Materials</h2>
            <div className="ui-sold-tech-tags">
              {solution.technologies.map((t) => (
                <span key={t} className="ui-sold-tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="ui-sold-faq" ref={faqRefEl}>
        <div className={`ui-sold-faq-inner${faqRefVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            Frequently Asked Questions
          </h2>
          <div className="ui-sold-faq-list">
            {solution.faqs.map((faq) => (
              <div key={faq.question} className="ui-sold-faq-item">
                <h3 className="ui-sold-faq-q">{faq.question}</h3>
                <p className="ui-sold-faq-a">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="ui-sold-related" ref={relatedEl}>
        <div className={`ui-sold-related-inner${relatedVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            Related Solutions
          </h2>
          <div className="ui-sold-related-grid">
            {relatedSolutions.map((s) => {
              const RelIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="ui-sold-related-card"
                >
                  <span className="ui-sold-related-icon">
                    <RelIcon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="ui-sold-related-name">{s.name}</h3>
                  <p className="ui-sold-related-desc">{s.tagline}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-cta" ref={ctaEl}>
        <div className={`ui-cta-inner${ctaVisible ? " visible" : ""}`}>
          <h2 className="ui-cta-title">
            Ready to Get Started?
          </h2>
          <p className="ui-cta-sub">
            Tell us about your project and get a free consultation from our
            infrastructure team.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
