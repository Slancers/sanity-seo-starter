"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

/**
 * Homepage featured project. DEMO CONTENT — point this at one of your own
 * case studies: update the text, the link and (optionally) set `imageUrl`
 * to a Sanity CDN or /public image.
 */
const featured = {
  title: "Sample Bistro — A 60-Seat Restaurant, Designed and Built in 14 Weeks",
  description:
    "A tired former retail unit became a warm, lively neighborhood restaurant. We reworked the layout for better kitchen flow, added layered lighting and acoustic timber panels, and built custom banquettes — all delivered in time for a fixed opening date.",
  tags: ["Hospitality", "Design & Build", "Lighting", "Custom Millwork"],
  href: "/case-studies",
  imageUrl: "" as string,
  imageAlt: "Sample Bistro restaurant interior",
  industry: "Hospitality",
};

export default function FeaturedCaseStudy() {
  const { revealRef, visible } = useScrollReveal(0.2);

  return (
    <section className="ui-fcs" ref={revealRef}>
      <div className="ui-fcs-inner">
        <div className={`ui-fcs-content${visible ? " visible" : ""}`}>
          <p className="ui-fcs-label">Featured Project</p>
          <h2 className="ui-fcs-title">{featured.title}</h2>
          <p className="ui-fcs-desc">{featured.description}</p>
          <div className="ui-fcs-tags">
            {featured.tags.map((tag) => (
              <span key={tag} className="ui-fcs-tag">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={featured.href}
            className="ui-fcs-cta"
            onClick={() => trackEvent("case_study_view", { case_study: featured.title, industry: featured.industry })}
          >
            View Case Studies <ArrowRight size={16} strokeWidth={2} />
          </a>
        </div>

        <div className={`ui-fcs-visual${visible ? " visible" : ""}`}>
          <div className="ui-fcs-image-wrap">
            {featured.imageUrl ? (
              <Image src={featured.imageUrl} alt={featured.imageAlt} width={590} height={443} className="ui-fcs-image" />
            ) : (
              <div className="ui-fcs-placeholder" role="img" aria-label={featured.imageAlt}>
                Your project photo here
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
