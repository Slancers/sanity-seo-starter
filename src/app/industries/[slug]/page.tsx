import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import IndustryDetail from "@/components/IndustryDetail";
import Footer from "@/components/Footer";
import { getIndustryBySlug, getAllIndustrySlugs } from "@/data/industries";
import { buildMetadata, faqSchema, organizationRef, absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/config/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${site.tagline} for ${industry.name}`,
      description: industry.heroDescription,
      provider: organizationRef,
      areaServed: { "@type": "Country", name: site.areaServed },
      url: absoluteUrl(`/industries/${industry.slug}`),
    },
    faqSchema(industry.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Industries", path: "/industries" },
      { name: industry.name, path: `/industries/${industry.slug}` },
    ]),
  ];

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <IndustryDetail slug={slug} />
      <Footer />
    </>
  );
}
