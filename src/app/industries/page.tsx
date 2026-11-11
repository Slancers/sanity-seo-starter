import Navbar from "@/components/Navbar";
import IndustriesIndex from "@/components/IndustriesIndex";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: `Industries We Serve — Workplace, Hospitality, Healthcare & Retail | ${site.name}`,
  description:
    "Interior design and fit-out for offices, restaurants, clinics, retail stores, schools and hotels — tailored to how each kind of space is used.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <IndustriesIndex />
      <Footer />
    </>
  );
}
