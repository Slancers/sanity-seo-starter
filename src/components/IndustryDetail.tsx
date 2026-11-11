"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getIndustryBySlug } from "@/data/industries";

export default function IndustryDetail({ slug }: { slug: string }) {
  const industry = getIndustryBySlug(slug)!;
  const Icon = industry.icon;

  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: useCasesEl, visible: useCasesVisible } = useScrollReveal(0.1);
  const { revealRef: solutionsEl, visible: solutionsVisible } = useScrollReveal(0.1);
  const { revealRef: faqRefEl, visible: faqRefVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-indd-hero" ref={heroEl}>
        <div className={`ui-indd-hero-inner${heroVisible ? " visible" : ""}`}>
          <Link href="/industries" className="ui-bd-back">
            <ArrowLeft size={14} strokeWidth={2} /> All Industries
          </Link>
          <div className="ui-bd-hero-icon">
            <Icon size={36} strokeWidth={1.4} />
          </div>
          <h1 className="ui-indd-headline">
            Interior Design &amp; Build for {industry.name}
          </h1>
          <p className="ui-indd-tagline">{industry.tagline}</p>
          <p className="ui-indd-hero-desc">{industry.heroDescription}</p>
          <div className="ui-bd-hero-actions">
            <Link href="/contact" className="ui-sold-btn-primary">
              Discuss Your Project <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="ui-indd-usecases" ref={useCasesEl}>
        <div className={`ui-indd-usecases-inner${useCasesVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            How We Help {industry.name}
          </h2>
          <p className="ui-sold-section-sub">
            Infrastructure solutions tailored for {industry.name.toLowerCase()} environments.
          </p>
          <div className="ui-indd-usecases-grid">
            {industry.useCases.map((uc, i) => (
              <div
                key={uc.title}
                className="ui-indd-usecase-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <h3 className="ui-indd-usecase-title">{uc.title}</h3>
                <p className="ui-indd-usecase-desc">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions + Clients */}
      <section className="ui-indd-solutions" ref={solutionsEl}>
        <div className={`ui-indd-solutions-inner${solutionsVisible ? " visible" : ""}`}>
          <div className="ui-indd-solutions-col">
            <h2 className="ui-sold-section-title">Solutions We Deliver</h2>
            <ul className="ui-sold-benefits-list">
              {industry.solutions.map((s) => (
                <li key={s} className="ui-sold-benefit-item">
                  <span className="ui-sold-benefit-check">
                    <Check size={16} strokeWidth={2.5} />
                  </span>
                  <Link href={`/solutions/${s.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {industry.clients && industry.clients.length > 0 && (
            <div className="ui-indd-clients-col">
              <h2 className="ui-sold-section-title">Clients</h2>
              <div className="ui-indd-clients-list">
                {industry.clients.map((c) => (
                  <span key={c} className="ui-indd-client-tag">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FAQs */}
      <section className="ui-sold-faq" ref={faqRefEl}>
        <div className={`ui-sold-faq-inner${faqRefVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            Frequently Asked Questions
          </h2>
          <div className="ui-sold-faq-list">
            {industry.faqs.map((faq) => (
              <div key={faq.question} className="ui-sold-faq-item">
                <h3 className="ui-sold-faq-q">{faq.question}</h3>
                <p className="ui-sold-faq-a">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-cta" ref={ctaEl}>
        <div className={`ui-cta-inner${ctaVisible ? " visible" : ""}`}>
          <h2 className="ui-cta-title">
            Ready to Upgrade Your {industry.name} Infrastructure?
          </h2>
          <p className="ui-cta-sub">
            Tell us about your project and get a free consultation from our team.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
