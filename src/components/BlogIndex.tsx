"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { urlFor } from "@/sanity/image";
import type { BlogPost } from "@/sanity/queries";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: gridEl, visible: gridVisible } = useScrollReveal(0.1);

  const hasPosts = posts.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="ui-blog-hero" ref={heroEl}>
        <div className={`ui-blog-hero-inner${heroVisible ? " visible" : ""}`}>
          <p className="ui-blog-eyebrow">Blog</p>
          <h1 className="ui-blog-headline">
            Design Ideas &amp; Project Stories
          </h1>
          <p className="ui-blog-hero-sub">
            Practical articles on workplace design, hospitality interiors,
            lighting and materials from our team.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="ui-blog-grid-section" ref={gridEl}>
        <div className={`ui-blog-grid-inner${gridVisible ? " visible" : ""}`}>
          {hasPosts ? (
            <div className="ui-blog-grid">
              {posts.map((post, i) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="ui-blog-card"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {post.featuredImage && (
                    <div className="ui-blog-card-image">
                      <Image
                        src={urlFor(post.featuredImage).width(900).fit("max").url()}
                        alt={post.title}
                        width={800}
                        height={400}
                        className="ui-blog-card-img"
                      />
                    </div>
                  )}
                  <div className="ui-blog-card-meta">
                    <span className="ui-blog-card-category">{post.category}</span>
                    <span className="ui-blog-card-date">
                      <Calendar size={13} strokeWidth={1.8} />
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h2 className="ui-blog-card-title">{post.title}</h2>
                  <p className="ui-blog-card-excerpt">{post.excerpt}</p>
                  <span className="ui-blog-card-link">
                    Read Article <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="ui-blog-empty">
              <BookOpen size={48} strokeWidth={1.2} />
              <h2 className="ui-blog-empty-title">Coming Soon</h2>
              <p className="ui-blog-empty-text">
                We&rsquo;re working on our first articles. Check back soon for
                practical ideas on designing and building better spaces.
              </p>
              <Link href="/contact" className="ui-blog-empty-cta">
                Get Notified When We Publish
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
