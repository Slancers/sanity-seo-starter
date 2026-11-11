"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Quote,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";
import { urlFor } from "@/sanity/image";
import type { CaseStudy } from "@/sanity/caseStudyQueries";

export default function CaseStudyDetail({
  caseStudy: cs,
}: {
  caseStudy: CaseStudy;
}) {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: bodyEl, visible: bodyVisible } = useScrollReveal(0.1);
  const { revealRef: techEl, visible: techVisible } = useScrollReveal(0.1);
  const { revealRef: testimonialEl, visible: testimonialVisible } = useScrollReveal(0.15);
  const { revealRef: faqRefEl, visible: faqRefVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-csd-hero" ref={heroEl}>
        <div className={`ui-csd-hero-inner${heroVisible ? " visible" : ""}`}>
          <Link href="/case-studies" className="ui-csd-back">
            <ArrowLeft size={14} strokeWidth={2} /> All Case Studies
          </Link>

          <div className="ui-csd-hero-meta">
            <span className="ui-csd-industry">{cs.industry}</span>
            <span className="ui-csd-location">
              <MapPin size={13} strokeWidth={1.8} /> {cs.location}
            </span>
          </div>

          <h1 className="ui-csd-headline">{cs.title}</h1>

          <p className="ui-csd-client">
            <Briefcase size={15} strokeWidth={1.8} /> {cs.clientName}
          </p>
        </div>
      </section>

      {/* Hero Image */}
      {cs.heroImage && (
        <div className="ui-csd-hero-image-wrap">
          <Image
            src={urlFor(cs.heroImage).width(1600).fit("max").url()}
            alt={cs.title}
            width={1200}
            height={1600}
            className="ui-csd-hero-image"
            priority
          />
        </div>
      )}

      {/* Challenge / Solution / Result */}
      <section className="ui-csd-body" ref={bodyEl}>
        <div className={`ui-csd-body-inner${bodyVisible ? " visible" : ""}`}>
          <div className="ui-csd-section-block">
            <div className="ui-csd-section-icon challenge">
              <AlertTriangle size={22} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="ui-csd-section-title">The Challenge</h2>
              <p className="ui-csd-section-text">{cs.challenge}</p>
            </div>
          </div>

          <div className="ui-csd-section-block">
            <div className="ui-csd-section-icon solution">
              <CheckCircle size={22} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="ui-csd-section-title">Our Solution</h2>
              <p className="ui-csd-section-text">{cs.solution}</p>
            </div>
          </div>

          <div className="ui-csd-section-block">
            <div className="ui-csd-section-icon result">
              <TrendingUp size={22} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="ui-csd-section-title">The Result</h2>
              <p className="ui-csd-section-text">{cs.result}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies & Services */}
      {((cs.technologies && cs.technologies.length > 0) ||
        (cs.services && cs.services.length > 0)) && (
        <section className="ui-csd-tech" ref={techEl}>
          <div className={`ui-csd-tech-inner${techVisible ? " visible" : ""}`}>
            {cs.services && cs.services.length > 0 && (
              <div>
                <h3 className="ui-csd-tech-heading">Services Delivered</h3>
                <div className="ui-csd-tech-tags">
                  {cs.services.map((svc) => (
                    <span key={svc} className="ui-csd-tech-tag brand">
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {cs.technologies && cs.technologies.length > 0 && (
              <div>
                <h3 className="ui-csd-tech-heading">Technologies Used</h3>
                <div className="ui-csd-tech-tags">
                  {cs.technologies.map((t) => (
                    <span key={t} className="ui-csd-tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonial */}
      {cs.testimonialQuote && (
        <section className="ui-csd-testimonial" ref={testimonialEl}>
          <div
            className={`ui-csd-testimonial-inner${testimonialVisible ? " visible" : ""}`}
          >
            <Quote size={32} strokeWidth={1.2} className="ui-csd-quote-icon" />
            <blockquote className="ui-csd-quote">
              {cs.testimonialQuote}
            </blockquote>
            {cs.testimonialAuthor && (
              <p className="ui-csd-quote-author">
                — {cs.testimonialAuthor}, {cs.clientName}
              </p>
            )}
          </div>
        </section>
      )}

      {/* FAQs */}
      {cs.faqItems && cs.faqItems.length > 0 && (
        <section className="ui-sold-faq" ref={faqRefEl}>
          <div
            className={`ui-sold-faq-inner${faqRefVisible ? " visible" : ""}`}
          >
            <h2 className="ui-sold-section-title centered">
              Frequently Asked Questions
            </h2>
            <div className="ui-sold-faq-list">
              {cs.faqItems.map((faq) => (
                <div key={faq.question} className="ui-sold-faq-item">
                  <h3 className="ui-sold-faq-q">{faq.question}</h3>
                  <p className="ui-sold-faq-a">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="ui-cta" ref={ctaEl}>
        <div className={`ui-cta-inner${ctaVisible ? " visible" : ""}`}>
          <h2 className="ui-cta-title">Have a Similar Project?</h2>
          <p className="ui-cta-sub">
            Tell us about your requirements and get a free consultation from our
            team.
          </p>
          <Link href="/contact" className="ui-cta-btn" onClick={() => trackEvent("cta_click", { cta_location: "case_study_detail", cta_text: "Get a Consultation" })}>
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
