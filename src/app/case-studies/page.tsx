import Navbar from "@/components/Navbar";
import CaseStudiesIndex from "@/components/CaseStudiesIndex";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { getAllCaseStudies } from "@/sanity/caseStudyQueries";

export const metadata = buildMetadata({
  title: `Case Studies — Commercial Interior Projects | ${site.name}`,
  description:
    `See how ${site.name} designs and builds workplaces, restaurants, clinics and retail spaces — the brief, the approach and the results.`,
  path: "/case-studies",
});

export const revalidate = 30;

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <Navbar />
      <CaseStudiesIndex caseStudies={caseStudies} />
      <Footer />
    </>
  );
}
