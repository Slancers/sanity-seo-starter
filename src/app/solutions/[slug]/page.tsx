import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SolutionDetail from "@/components/SolutionDetail";
import Footer from "@/components/Footer";
import { getSolutionBySlug, getAllSlugs } from "@/data/solutions";
import { buildMetadata, faqSchema, organizationRef, absoluteUrl, breadcrumbSchema } from "@/lib/seo";
import { site } from "@/config/site";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return buildMetadata({
    title: solution.metaTitle,
    description: solution.metaDescription,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: solution.name,
      description: solution.heroDescription,
      provider: organizationRef,
      areaServed: { "@type": "Country", name: site.areaServed },
      url: absoluteUrl(`/solutions/${solution.slug}`),
    },
    faqSchema(solution.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/solutions" },
      { name: solution.name, path: `/solutions/${solution.slug}` },
    ]),
  ];

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SolutionDetail slug={slug} />
      <Footer />
    </>
  );
}
