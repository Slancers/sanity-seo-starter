import Navbar from "@/components/Navbar";
import BlogIndex from "@/components/BlogIndex";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { getAllBlogPosts } from "@/sanity/queries";

export const metadata = buildMetadata({
  title: `Blog — Design Ideas, Guides & Project Stories | ${site.name}`,
  description:
    `Practical articles on workplace design, restaurant fit-outs, lighting, materials and project planning from the ${site.name} team.`,
  path: "/blog",
});

export const revalidate = 30;

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <Navbar />
      <BlogIndex posts={posts} />
      <Footer />
    </>
  );
}
