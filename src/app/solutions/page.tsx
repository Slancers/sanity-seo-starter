import Navbar from "@/components/Navbar";
import SolutionsIndex from "@/components/SolutionsIndex";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = buildMetadata({
  title: `Services — Interior Design, Space Planning & Fit-Out | ${site.name}`,
  description:
    "Interior design, space planning, fit-out and construction, lighting, furniture and project management — every service you need from first sketch to move-in.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <Navbar />
      <SolutionsIndex />
      <Footer />
    </>
  );
}
