"use client";

import Link from "next/link";
import {
  ArrowRight,
  Check,
  CalendarCheck,
  Wrench,
  Headphones,
  Sparkles,
  TrendingUp,
  Clock,
  Sofa,
  Lamp,
  Paintbrush,
  Leaf,
  Layers,
  ClipboardList,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* DEMO CONTENT — a subscription/retainer page. Rename or delete /plans if you don't offer one. */

const benefits = [
  { icon: CalendarCheck, title: "Scheduled Upkeep", description: "Regular visits to touch up finishes, tighten fixtures and catch small issues before they become big ones." },
  { icon: Wrench, title: "Fast Repairs", description: "Damaged furniture, chipped surfaces or failed lighting fixed quickly by the team that built your space." },
  { icon: Headphones, title: "Priority Support", description: "A direct line to your project team, with priority scheduling over one-off requests." },
  { icon: Sparkles, title: "Seasonal Refreshes", description: "Planned updates to soft furnishings, plants and decor so the space never feels tired." },
  { icon: TrendingUp, title: "Predictable Costs", description: "One monthly fee instead of surprise repair bills, so budgeting is simple." },
  { icon: Clock, title: "Less Downtime", description: "Work scheduled outside business hours to keep your space open and working." },
];

const categories = [
  { icon: Sofa, title: "Furniture", items: ["Repairs & reupholstery", "Hardware tightening", "Replacement parts", "Reconfiguration"] },
  { icon: Lamp, title: "Lighting", items: ["Fixture replacement", "Control adjustments", "Scene updates", "Lamp audits"] },
  { icon: Paintbrush, title: "Finishes", items: ["Paint touch-ups", "Surface repairs", "Floor care", "Wall protection"] },
  { icon: Leaf, title: "Plants & Decor", items: ["Plant care", "Seasonal styling", "Artwork rotation", "Soft furnishings"] },
  { icon: Layers, title: "Millwork", items: ["Hinge & drawer repairs", "Edge banding", "Counter care", "Adjustments"] },
  { icon: ClipboardList, title: "Reporting", items: ["Visit reports", "Condition logs", "Budget forecasts", "Upgrade advice"] },
];

const howItWorks = [
  { step: "1", title: "Walkthrough", description: "We review your space, how it is used and what tends to wear first." },
  { step: "2", title: "Plan", description: "We recommend a visit schedule and scope that fits your space and budget." },
  { step: "3", title: "Care", description: "Our team visits on schedule and handles repair requests as they come up." },
  { step: "4", title: "Review", description: "Quarterly check-ins on condition, spend and upcoming improvements." },
];

const faqs = [
  { question: "What does a care plan include?", answer: "Scheduled maintenance visits, minor repairs, seasonal refreshes and priority support, all for one monthly fee. Larger upgrades are quoted separately." },
  { question: "Do you only maintain spaces you built?", answer: "No. We can take on spaces designed or built by others after an initial walkthrough." },
  { question: "What is the minimum term?", answer: "Plans typically run for 12 months, with flexible terms available for larger portfolios." },
  { question: "How quickly do you respond to repairs?", answer: "Plan members get priority scheduling; urgent issues are usually addressed within one to two business days." },
  { question: "Can we change the plan later?", answer: "Yes. You can adjust visit frequency or scope as your needs change." },
  { question: "Is a care plan worth it for a small space?", answer: "Often, yes. Regular upkeep extends the life of finishes and furniture, which usually costs less than repairing neglect later." },
];

export default function PlansContent() {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: benefitsRefEl, visible: benefitsRefVisible } = useScrollReveal(0.1);
  const { revealRef: categoriesRefEl, visible: categoriesRefVisible } = useScrollReveal(0.1);
  const { revealRef: howRefEl, visible: howRefVisible } = useScrollReveal(0.1);
  const { revealRef: faqRefEl, visible: faqRefVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-plans-hero" ref={heroEl}>
        <div className={`ui-plans-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-plans-eyebrow">Care Plans</p>
          <h1 className="ui-plans-headline">
            Keep Your Space Looking Like Opening Day
          </h1>
          <p className="ui-plans-hero-sub">
            A monthly care plan covers scheduled upkeep, quick repairs and
            seasonal refreshes — so your space keeps working as hard as the day
            it opened.
          </p>
          <div className="ui-bd-hero-actions">
            <Link href="/contact" className="ui-sold-btn-primary">
              Ask About Care Plans <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="ui-plans-benefits" ref={benefitsRefEl}>
        <div className={`ui-plans-benefits-inner${benefitsRefVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">Why a Care Plan?</h2>
          <p className="ui-sold-section-sub">
            Small, regular care beats big, expensive fixes.
          </p>
          <div className="ui-plans-benefits-grid">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="ui-plans-benefit-card"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <span className="ui-plans-benefit-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="ui-plans-benefit-title">{b.title}</h3>
                  <p className="ui-plans-benefit-desc">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Available */}
      <section className="ui-plans-categories" ref={categoriesRefEl}>
        <div className={`ui-plans-categories-inner${categoriesRefVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">What a Care Plan Covers</h2>
          <p className="ui-sold-section-sub">
            The parts of your space we look after.
          </p>
          <div className="ui-plans-categories-grid">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div key={cat.title} className="ui-plans-category-card">
                  <span className="ui-plans-category-icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3 className="ui-plans-category-title">{cat.title}</h3>
                  <ul className="ui-plans-category-list">
                    {cat.items.map((item) => (
                      <li key={item}>
                        <Check size={14} strokeWidth={2.5} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="ui-plans-how" ref={howRefEl}>
        <div className={`ui-plans-how-inner${howRefVisible ? " visible" : ""}`}>
          <h2 className="ui-sold-section-title centered">How It Works</h2>
          <p className="ui-sold-section-sub">
            From first walkthrough to ongoing care — in four steps.
          </p>
          <div className="ui-plans-steps">
            {howItWorks.map((s) => (
              <div key={s.step} className="ui-plans-step">
                <span className="ui-plans-step-number">{s.step}</span>
                <h3 className="ui-plans-step-title">{s.title}</h3>
                <p className="ui-plans-step-desc">{s.description}</p>
              </div>
            ))}
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
            {faqs.map((faq) => (
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
            Ready to Protect Your Investment?
          </h2>
          <p className="ui-cta-sub">
            Tell us about your space and we&rsquo;ll recommend a care plan that
            fits.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Quote <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
