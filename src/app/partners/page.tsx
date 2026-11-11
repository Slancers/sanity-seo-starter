import Navbar from "@/components/Navbar";
import PartnersIndex from "@/components/PartnersIndex";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: `Our Partners — Timber, Lighting, Furniture & Surfaces | ${site.name}`,
  description: `The suppliers ${site.name} trusts for timber, lighting, furniture and surfaces on commercial interior projects.`,
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <Navbar />
      <PartnersIndex />
      <Footer />
    </>
  );
}
