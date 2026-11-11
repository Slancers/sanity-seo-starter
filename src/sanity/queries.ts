import { client } from "./client";

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  author: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  featuredImage?: { asset: { _ref: string } };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[];
  metaTitle?: string;
  metaDescription?: string;
  tags?: string[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      publishedAt,
      category,
      excerpt,
      featuredImage,
      metaTitle,
      metaDescription,
      tags
    }`
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      publishedAt,
      category,
      excerpt,
      featuredImage,
      body,
      metaTitle,
      metaDescription,
      tags
    }`,
    { slug }
  );
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return client.fetch(
    `*[_type == "blogPost"].slug.current`
  );
}
