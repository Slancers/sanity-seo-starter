"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { trackEvent } from "@/lib/analytics";

export default function CTASection() {
  const { revealRef, visible } = useScrollReveal(0.3);

  return (
    <section className="ui-cta" ref={revealRef}>
      <div className={`ui-cta-inner${visible ? " visible" : ""}`}>
        <h2 className="ui-cta-title">
          Ready to Start Your Project?
        </h2>
        <p className="ui-cta-sub">
          Tell us about your space and book a free consultation with our
          design team.
        </p>
        <a href="/contact" className="ui-cta-btn" onClick={() => trackEvent("cta_click", { cta_location: "cta_section", cta_text: "Get a Consultation" })}>
          Get a Consultation
        </a>
      </div>
    </section>
  );
}
