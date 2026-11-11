import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import PartnerDetail from "@/components/PartnerDetail";
import Footer from "@/components/Footer";
import { getPartnerBySlug, getAllPartnerSlugs } from "@/data/partners";
import { buildMetadata, faqSchema, organizationRef, breadcrumbSchema } from "@/lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllPartnerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) return {};
  return buildMetadata({
    title: partner.metaTitle,
    description: partner.metaDescription,
    path: `/partners/${partner.slug}`,
  });
}

export default async function PartnerPage({ params }: { params: Params }) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      ...organizationRef,
      brand: { "@type": "Brand", name: partner.name },
    },
    faqSchema(partner.faqs),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Partners", path: "/partners" },
      { name: partner.name, path: `/partners/${partner.slug}` },
    ]),
  ];

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PartnerDetail slug={slug} />
      <Footer />
    </>
  );
}
