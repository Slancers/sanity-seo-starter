import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import Services from "@/components/Services";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import StatsBar from "@/components/StatsBar";
import { getFeaturedCaseStudies } from "@/sanity/caseStudyQueries";
import { organizationSchema, localBusinessSchema } from "@/lib/seo";

const Industries = dynamic(() => import("@/components/Industries"), { ssr: true });
const PartnersTestimonial = dynamic(() => import("@/components/PartnersTestimonial"), { ssr: true });
const CTASection = dynamic(() => import("@/components/CTASection"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export const revalidate = 30;

const jsonLd = [organizationSchema, localBusinessSchema];

export default async function Home() {
  const clients = await getFeaturedCaseStudies();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <TrustedBy clients={clients} />
      <Services />
      <FeaturedCaseStudy />
      <StatsBar />
      <Industries />
      <PartnersTestimonial />
      <CTASection />
      <Footer />
    </>
  );
}
