"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { FeaturedClient } from "@/sanity/caseStudyQueries";

export default function TrustedBy({ clients }: { clients: FeaturedClient[] }) {
  const industries = ["All", ...Array.from(new Set(clients.map((c) => c.industry)))];
  const [activeTab, setActiveTab] = useState("All");
  const [animKey, setAnimKey] = useState(0);
  const { revealRef, visible } = useScrollReveal();

  const filtered =
    activeTab === "All"
      ? clients
      : clients.filter((c) => c.industry === activeTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setAnimKey((prev) => prev + 1);
  };

  return (
    <section className="ui-trusted" ref={revealRef}>
      <div className="ui-trusted-inner">
        <h2 className={`ui-trusted-title ${visible ? "visible" : ""}`}>
          Recent Projects
        </h2>
        <p className={`ui-trusted-sub ${visible ? "visible" : ""}`}>
          From headquarters to neighborhood cafés, every project is designed and built by the same
          team.
        </p>

        {industries.length > 2 && (
          <div className={`ui-trusted-tabs ${visible ? "visible" : ""}`}>
            {industries.map((tab) => (
              <button
                key={tab}
                className={`ui-tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        <div className="ui-client-grid" key={animKey}>
          {filtered.map((client, i) => (
            <Link
              key={client._id}
              href={`/case-studies/${client.slug.current}`}
              className="ui-client-card"
              style={{ animationDelay: `${i * 0.08}s`, textDecoration: "none" }}
            >
              <div className="ui-client-logo" style={{ aspectRatio: "280 / 180" }}>
                {client.heroImageUrl ? (
                  <Image
                    src={client.heroImageUrl}
                    alt={`${client.clientName} project`}
                    width={280}
                    height={180}
                    className="ui-client-logo-image"
                  />
                ) : (
                  <span className="ui-client-logo-text">{client.clientName}</span>
                )}
              </div>
              <span className="ui-client-name">{client.clientName}</span>
              <span className="ui-client-industry">{client.industry}</span>
            </Link>
          ))}
        </div>

        <p className={`ui-trusted-note ${visible ? "visible" : ""}`}>
          <strong>200+</strong> spaces delivered across <strong>6 industries</strong>
        </p>
      </div>
    </section>
  );
}
