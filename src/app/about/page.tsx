import Navbar from "@/components/Navbar";
import AboutContent from "@/components/AboutContent";
import Footer from "@/components/Footer";
import { buildMetadata, organizationSchema } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: `About ${site.name} — ${site.tagline} Since ${site.foundingYear}`,
  description: `Meet ${site.name}: one team of designers and builders creating workplaces, restaurants, clinics and retail spaces since ${site.foundingYear}.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <AboutContent />
      <Footer />
    </>
  );
}
