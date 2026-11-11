"use client";

import Link from "next/link";
import {
  PenTool,
  HardHat,
  Lamp,
  ClipboardCheck,
  Target,
  Eye,
  Award,
  Handshake,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { site } from "@/config/site";

/* ===== Data — DEMO CONTENT for the fictional Harbor & Pine studio ===== */

const milestones = [
  { year: "2014", title: "Studio Founded", desc: "Started as a two-person interior design studio." },
  { year: "2016", title: "Build Team Added", desc: "Brought construction in-house to offer design and build under one roof." },
  { year: "2018", title: "First Restaurant Fit-Out", desc: "Expanded from offices into hospitality projects." },
  { year: "2020", title: "Healthcare Practice", desc: "Started designing clinics and wellness spaces." },
  { year: "2022", title: "Care Plans Launched", desc: "Introduced ongoing upkeep plans for completed spaces." },
  { year: "2024", title: "200+ Spaces Delivered", desc: "Passed 200 completed projects across six industries." },
];

const values = [
  { icon: Award, title: "Craft Matters", desc: "Details are designed, built and checked with care — the parts you notice and the parts you don't." },
  { icon: Handshake, title: "One Accountable Team", desc: "Design and build under one roof means one point of contact and no finger-pointing." },
  { icon: Leaf, title: "Built to Last", desc: "Durable, responsibly sourced materials chosen to age well and reduce waste." },
  { icon: Target, title: "Outcome-Driven", desc: "We measure success by how well the space works for the people who use it." },
];

const capabilities = [
  { icon: PenTool, title: "Design", desc: "Discovery, concepts, materials and construction-ready drawings." },
  { icon: HardHat, title: "Build", desc: "Fit-out, trade coordination, permits and handover." },
  { icon: Lamp, title: "Lighting & Furniture", desc: "Layered lighting, furniture, fixtures and custom millwork." },
  { icon: ClipboardCheck, title: "Project Management", desc: "Budgets, schedules, vendors and move-in planning." },
];

const stats = [
  { number: "200+", label: "Spaces Delivered" },
  { number: "10+", label: "Years in Business" },
  { number: "6", label: "Industries Served" },
  { number: "1", label: "Accountable Team" },
];

/* ===== Component ===== */

export default function AboutContent() {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: storyEl, visible: storyVisible } = useScrollReveal(0.15);
  const { revealRef: valuesRefEl, visible: valuesRefVisible } = useScrollReveal(0.1);
  const { revealRef: timelineEl, visible: timelineVisible } = useScrollReveal(0.1);
  const { revealRef: capsEl, visible: capsVisible } = useScrollReveal(0.1);
  const { revealRef: ctaEl, visible: ctaVisible } = useScrollReveal(0.3);

  return (
    <>
      {/* Hero */}
      <section className="ui-about-hero" ref={heroEl}>
        <div className={`ui-about-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-about-eyebrow">About Us</p>
          <h1 className="ui-about-headline">
            Designing and Building Better Spaces Since {site.foundingYear}
          </h1>
          <p className="ui-about-hero-sub">
            We are designers and builders working as one team — creating
            workplaces, restaurants, clinics and stores that work beautifully
            for the people who use them every day.
          </p>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="ui-about-stats">
        <div className="ui-about-stats-inner">
          {stats.map((stat) => (
            <div key={stat.label} className="ui-about-stat">
              <span className="ui-about-stat-number">{stat.number}</span>
              <span className="ui-about-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="ui-about-story" ref={storyEl}>
        <div className={`ui-about-story-inner${storyVisible ? " visible" : ""}`}>
          <div className="ui-about-story-content">
            <h2 className="ui-about-section-title">Our Story</h2>
            <p className="ui-about-text">
              {site.name} started in {site.foundingYear} as a small design studio
              with a simple belief: the people who design a space and the people
              who build it should be on the same team. Clients kept asking us to
              see projects through to completion, so we did.
            </p>
            <p className="ui-about-text">
              Today our designers, project managers and builders work side by
              side on every project. That means fewer surprises, faster
              decisions and spaces that look exactly like the drawings.
            </p>
            <p className="ui-about-text">
              With 200+ spaces delivered across workplace, hospitality,
              healthcare, retail and education, we know that every kind of space
              has its own rhythm. Designing for that rhythm is what we do best.
            </p>
          </div>
          <div className="ui-about-story-visual">
            <div className="ui-about-story-card">
              <Eye size={28} strokeWidth={1.5} />
              <h3 className="ui-about-card-title">Our Vision</h3>
              <p className="ui-about-card-text">
                A world where every workplace, restaurant and clinic is a space
                people genuinely enjoy being in.
              </p>
            </div>
            <div className="ui-about-story-card">
              <Target size={28} strokeWidth={1.5} />
              <h3 className="ui-about-card-title">Our Mission</h3>
              <p className="ui-about-card-text">
                To design and build spaces that work beautifully — on time, on
                budget and with one team accountable from start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="ui-about-values" ref={valuesRefEl}>
        <div className={`ui-about-values-inner${valuesRefVisible ? " visible" : ""}`}>
          <h2 className="ui-about-section-title centered">What We Stand For</h2>
          <p className="ui-about-section-sub">
            The principles that guide every project we take on.
          </p>
          <div className="ui-about-values-grid">
            {values.map((v) => (
              <div key={v.title} className="ui-about-value-card">
                <span className="ui-about-value-icon">
                  <v.icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="ui-about-value-title">{v.title}</h3>
                <p className="ui-about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="ui-about-timeline" ref={timelineEl}>
        <div className={`ui-about-timeline-inner${timelineVisible ? " visible" : ""}`}>
          <h2 className="ui-about-section-title centered">Key Milestones</h2>
          <p className="ui-about-section-sub">
            A snapshot of our journey so far.
          </p>
          <div className="ui-about-timeline-track">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="ui-about-milestone"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="ui-about-milestone-year">{m.year}</span>
                <div className="ui-about-milestone-dot" />
                <div className="ui-about-milestone-body">
                  <h3 className="ui-about-milestone-title">{m.title}</h3>
                  <p className="ui-about-milestone-desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="ui-about-caps" ref={capsEl}>
        <div className={`ui-about-caps-inner${capsVisible ? " visible" : ""}`}>
          <h2 className="ui-about-section-title centered">What We Do</h2>
          <p className="ui-about-section-sub">
            Everything a commercial interior needs — from first sketch to final
            walkthrough.
          </p>
          <div className="ui-about-caps-grid">
            {capabilities.map((c) => (
              <div key={c.title} className="ui-about-cap-card">
                <span className="ui-about-cap-icon">
                  <c.icon size={22} strokeWidth={1.6} />
                </span>
                <h3 className="ui-about-cap-title">{c.title}</h3>
                <p className="ui-about-cap-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ui-cta" ref={ctaEl}>
        <div className={`ui-cta-inner${ctaVisible ? " visible" : ""}`}>
          <h2 className="ui-cta-title">Ready to Work Together?</h2>
          <p className="ui-cta-sub">
            Tell us about your space and book a free consultation with our
            design team.
          </p>
          <Link href="/contact" className="ui-cta-btn">
            Get a Consultation <ArrowRight size={18} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
