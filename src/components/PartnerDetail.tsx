"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Check, Package } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getPartnerBySlug } from "@/data/partners";

export default function PartnerDetail({ slug }: { slug: string }) {
  const brand = getPartnerBySlug(slug)!;
  const Icon = brand.icon;
  const logoSrc = brand.logo;

  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: productsEl, visible: productsVisible } = useScrollReveal(0.1);
  const { revealRef: whyUsEl, visible: whyUsVisible } = useScrollReveal(0.1);
  const { revealRef: faqRefEl, visible: faqRefVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-bd-hero" ref={heroEl}>
        <div className={`ui-bd-hero-inner${heroVisible ? " visible" : ""}`}>
          <Link href="/partners" className="ui-bd-back">
            <ArrowLeft size={14} strokeWidth={2} /> All Partners
          </Link>
          {logoSrc ? (
            <div className="ui-bd-hero-logo">
              <Image
                src={logoSrc}
                alt={`${brand.name} logo`}
                width={80}
                height={80}
                className="ui-bd-logo-img"
              />
            </div>
          ) : (
            <div className="ui-bd-hero-icon">
              <Icon size={36} strokeWidth={1.4} />
            </div>
          )}
          <h1 className="ui-bd-headline">{brand.name}</h1>
          <p className="ui-bd-partner-level">{brand.partnerLevel}</p>
          <p className="ui-bd-hero-desc">{brand.heroDescription}</p>
          <div className="ui-bd-hero-actions">
            <Link href="/contact" className="ui-sold-btn-primary">
              Get a Quote <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="ui-bd-products" ref={productsEl}>
        <div className={`ui-bd-products-inner${productsVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            What We Use From {brand.name}
          </h2>
          <p className="ui-sold-section-sub">
            Products we specify and install on our projects.
          </p>
          <div className="ui-bd-products-grid">
            {brand.products.map((p, i) => (
              <div
                key={p.name}
                className="ui-bd-product-card"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="ui-bd-product-icon">
                  <Package size={20} strokeWidth={1.6} />
                </span>
                <h3 className="ui-bd-product-name">{p.name}</h3>
                <p className="ui-bd-product-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Us */}
      <section className="ui-bd-whyus" ref={whyUsEl}>
        <div className={`ui-bd-whyus-inner${whyUsVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            Why Work With Us on {brand.name}
          </h2>
          <ul className="ui-bd-whyus-list">
            {brand.whyUs.map((item) => (
              <li key={item} className="ui-bd-whyus-item">
                <span className="ui-sold-benefit-check">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="ui-sold-faq" ref={faqRefEl}>
        <div className={`ui-sold-faq-inner${faqRefVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">
            Frequently Asked Questions
          </h2>
          <div className="ui-sold-faq-list">
            {brand.faqs.map((faq) => (
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
            Planning a Project With {brand.name}?
          </h2>
          <p className="ui-cta-sub">
            Talk to our team about design, pricing and installation.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
