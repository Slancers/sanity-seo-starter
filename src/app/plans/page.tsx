import Navbar from "@/components/Navbar";
import PlansContent from "@/components/PlansContent";
import Footer from "@/components/Footer";
import { buildMetadata, organizationRef, absoluteUrl } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: `Care Plans — Ongoing Upkeep for Your Space | ${site.name}`,
  description:
    "Keep your space looking new with a monthly care plan: scheduled maintenance, quick repairs, seasonal refreshes and priority support.",
  path: "/plans",
});

export default function PlansPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Care Plans",
    description:
      "Monthly care plans for commercial interiors — scheduled maintenance, repairs, seasonal refreshes and priority support.",
    provider: organizationRef,
    areaServed: { "@type": "Country", name: site.areaServed },
    url: absoluteUrl("/plans"),
  };

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PlansContent />
      <Footer />
    </>
  );
}
