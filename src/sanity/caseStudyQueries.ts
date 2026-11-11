import { client } from "./client";

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  clientName: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  result: string;
  technologies?: string[];
  services?: string[];
  heroImage?: { asset: { _ref: string } };
  publishedAt: string;
  featured?: boolean;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  gallery?: { asset: { _ref: string } }[];
  faqItems?: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return client.fetch(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      clientName,
      industry,
      location,
      challenge,
      solution,
      result,
      technologies,
      services,
      heroImage,
      publishedAt,
      featured,
      testimonialQuote,
      testimonialAuthor,
      metaTitle,
      metaDescription
    }`
  );
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return client.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      clientName,
      industry,
      location,
      challenge,
      solution,
      result,
      technologies,
      services,
      heroImage,
      publishedAt,
      featured,
      testimonialQuote,
      testimonialAuthor,
      gallery,
      faqItems,
      metaTitle,
      metaDescription
    }`,
    { slug }
  );
}

export interface FeaturedClient {
  _id: string;
  clientName: string;
  industry: string;
  slug: { current: string };
  heroImageUrl: string | null;
}

export async function getFeaturedCaseStudies(): Promise<FeaturedClient[]> {
  return client.fetch(
    `*[_type == "caseStudy"] | order(publishedAt desc) {
      _id,
      clientName,
      industry,
      slug,
      "heroImageUrl": heroImage.asset->url
    }`
  );
}

export async function getAllCaseStudySlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "caseStudy"].slug.current`
  );
}
