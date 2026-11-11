import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import Footer from "@/components/Footer";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/config/site";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/sanity/caseStudyQueries";

type Params = Promise<{ slug: string }>;

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};

  const title = cs.metaTitle || `${cs.title} — Case Study`;
  const description = cs.metaDescription || cs.challenge;

  return {
    title: `${title} | ${site.name}`,
    description,
    alternates: {
      canonical: absoluteUrl(`/case-studies/${slug}`),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/case-studies/${slug}`),
      siteName: site.name,
      locale: site.locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: cs.title,
      description: cs.challenge,
      author: {
        "@type": "Organization",
        name: site.name,
        url: site.url,
      },
      datePublished: cs.publishedAt,
      url: absoluteUrl(`/case-studies/${slug}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Case Studies", item: absoluteUrl("/case-studies") },
        { "@type": "ListItem", position: 3, name: cs.title },
      ],
    },
    ...(cs.testimonialQuote
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Review",
            reviewBody: cs.testimonialQuote,
            author: { "@type": "Person", name: cs.testimonialAuthor || cs.clientName },
            itemReviewed: {
              "@type": "Organization",
              name: site.name,
            },
          },
        ]
      : []),
    ...(cs.faqItems && cs.faqItems.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: cs.faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CaseStudyDetail caseStudy={cs} />

      <Footer />
    </>
  );
}
