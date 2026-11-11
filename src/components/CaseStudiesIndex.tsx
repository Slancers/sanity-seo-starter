"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";
import { urlFor } from "@/sanity/image";
import type { CaseStudy } from "@/sanity/caseStudyQueries";

const industries = [
  "All",
  "Hospitality",
  "Education",
  "Healthcare",
  "Corporate",
  "Real Estate",
  "Manufacturing",
];

export default function CaseStudiesIndex({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) {
  const [filter, setFilter] = useState("All");
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: gridEl, visible: gridVisible } = useScrollReveal(0.1);

  const filtered =
    filter === "All"
      ? caseStudies
      : caseStudies.filter((cs) => cs.industry === filter);

  const hasPosts = caseStudies.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="ui-cs-hero" ref={heroEl}>
        <div className={`ui-cs-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-cs-eyebrow">Case Studies</p>
          <h1 className="ui-cs-headline">
            Real Projects. Real Results.
          </h1>
          <p className="ui-cs-hero-sub">
            See how we&rsquo;ve helped businesses create spaces that are beautiful,
            practical and built to last.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="ui-cs-grid-section" ref={gridEl}>
        <div className={`ui-cs-grid-inner${gridVisible ? " visible" : ""}`}>
          {hasPosts ? (
            <>
              {/* Industry filter pills */}
              <div className="ui-cs-filters">
                {industries.map((ind) => (
                  <button
                    key={ind}
                    className={`ui-cs-filter-pill${filter === ind ? " active" : ""}`}
                    onClick={() => setFilter(ind)}
                  >
                    {ind}
                  </button>
                ))}
              </div>

              <div className="ui-cs-grid">
                {filtered.map((cs, i) => (
                  <Link
                    key={cs._id}
                    href={`/case-studies/${cs.slug.current}`}
                    className="ui-cs-card"
                    style={{ transitionDelay: `${i * 60}ms` }}
                    onClick={() => trackEvent("case_study_view", { case_study: cs.title, industry: cs.industry })}
                  >
                    {cs.heroImage && (
                      <div className="ui-cs-card-image">
                        <Image
                          src={urlFor(cs.heroImage).width(800).height(600).url()}
                          alt={cs.title}
                          width={800}
                          height={600}
                          className="ui-cs-card-img"
                        />
                      </div>
                    )}
                    <div className="ui-cs-card-header">
                      <span className="ui-cs-card-industry">{cs.industry}</span>
                      <span className="ui-cs-card-location">
                        <MapPin size={12} strokeWidth={1.8} /> {cs.location}
                      </span>
                    </div>
                    <h2 className="ui-cs-card-title">{cs.title}</h2>
                    <p className="ui-cs-card-client">
                      <Briefcase size={13} strokeWidth={1.8} /> {cs.clientName}
                    </p>
                    <p className="ui-cs-card-challenge">{cs.challenge}</p>
                    {cs.services && cs.services.length > 0 && (
                      <div className="ui-cs-card-services">
                        {cs.services.slice(0, 3).map((svc) => (
                          <span key={svc} className="ui-cs-card-service-tag">
                            {svc}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="ui-cs-card-link">
                      Read Case Study <ArrowRight size={14} strokeWidth={2} />
                    </span>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="ui-cs-no-results">
                  No case studies in this industry yet. Check back soon.
                </p>
              )}
            </>
          ) : (
            <div className="ui-blog-empty">
              <Briefcase size={48} strokeWidth={1.2} />
              <h2 className="ui-blog-empty-title">Coming Soon</h2>
              <p className="ui-blog-empty-text">
                We&rsquo;re documenting our latest projects. Check back soon for
                detailed case studies from across industries.
              </p>
              <Link href="/contact" className="ui-blog-empty-cta">
                Discuss Your Project
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
