"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PortableText } from "next-sanity";
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

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  const { revealRef: heroEl, visible: heroVisible } = useScrollReveal(0.15);
  const { revealRef: bodyEl, visible: bodyVisible } = useScrollReveal(0.05);

  return (
    <>
      {/* Hero */}
      <section className="ui-blogpost-hero" ref={heroEl}>
        <div className={`ui-blogpost-hero-inner${heroVisible ? " visible" : ""}`}>
          <Link href="/blog" className="ui-blogpost-back">
            <ArrowLeft size={14} strokeWidth={2} /> All Articles
          </Link>

          <span className="ui-blogpost-category">{post.category}</span>
          <h1 className="ui-blogpost-headline">{post.title}</h1>
          <p className="ui-blogpost-excerpt">{post.excerpt}</p>

          <div className="ui-blogpost-meta">
            <span className="ui-blogpost-meta-item">
              <User size={14} strokeWidth={1.8} /> {post.author}
            </span>
            <span className="ui-blogpost-meta-item">
              <Calendar size={14} strokeWidth={1.8} /> {formatDate(post.publishedAt)}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="ui-blogpost-image-wrap">
          <Image
            src={urlFor(post.featuredImage).width(1600).fit("max").url()}
            alt={post.title}
            width={1600}
            height={800}
            className="ui-blogpost-image"
            priority
          />
        </div>
      )}

      {/* Body */}
      <section className="ui-blogpost-body" ref={bodyEl}>
        <div className={`ui-blogpost-body-inner${bodyVisible ? " visible" : ""}`}>
          <div className="ui-blogpost-content">
            {post.body && <PortableText value={post.body} />}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="ui-blogpost-tags">
              <Tag size={14} strokeWidth={1.8} />
              {post.tags.map((tag) => (
                <span key={tag} className="ui-blogpost-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="ui-blogpost-footer">
            <Link href="/blog" className="ui-blogpost-back-link">
              &larr; Back to Blog
            </Link>
            <Link href="/contact" className="ui-blogpost-cta">
              Discuss This With Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
