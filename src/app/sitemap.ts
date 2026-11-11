import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/sanity/queries";
import { getAllCaseStudySlugs } from "@/sanity/caseStudyQueries";
import { getAllSlugs as getAllSolutionSlugs } from "@/data/solutions";
import { getAllPartnerSlugs } from "@/data/partners";
import { getAllIndustrySlugs } from "@/data/industries";
import { absoluteUrl } from "@/lib/seo";

// Regenerate hourly so new Sanity blog posts and case studies appear without a redeploy.
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

const page = (path: string, changeFrequency: Entry["changeFrequency"], priority: number): Entry => ({
  url: absoluteUrl(path),
  changeFrequency,
  priority,
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, caseStudySlugs] = await Promise.all([
    getAllBlogSlugs(),
    getAllCaseStudySlugs(),
  ]);

  return [
    page("/", "weekly", 1),
    page("/about", "monthly", 0.7),
    page("/contact", "monthly", 0.7),
    page("/plans", "monthly", 0.7),
    page("/solutions", "monthly", 0.8),
    page("/partners", "monthly", 0.7),
    page("/industries", "monthly", 0.7),
    page("/case-studies", "weekly", 0.8),
    page("/blog", "weekly", 0.8),
    ...getAllSolutionSlugs().map((slug) => page(`/solutions/${slug}`, "monthly", 0.7)),
    ...getAllPartnerSlugs().map((slug) => page(`/partners/${slug}`, "monthly", 0.6)),
    ...getAllIndustrySlugs().map((slug) => page(`/industries/${slug}`, "monthly", 0.6)),
    ...caseStudySlugs.map((slug) => page(`/case-studies/${slug}`, "monthly", 0.7)),
    ...blogSlugs.map((slug) => page(`/blog/${slug}`, "weekly", 0.6)),
  ];
}
