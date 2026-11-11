/**
 * /llms.txt — a plain-text summary of the site for AI assistants and answer engines.
 * Generated from src/config/site.ts and src/data/*.ts, so it stays in sync with the site.
 */
import { site, fullAddress } from "@/config/site";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { partners } from "@/data/partners";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} — ${site.tagline}. Based in ${fullAddress}. Founded ${site.foundingYear}.`,
    "",
    "## Services",
    "",
    ...solutions.map((s) => `- [${s.name}](${absoluteUrl(`/solutions/${s.slug}`)}): ${s.description}`),
    "",
    "## Industries",
    "",
    ...industries.map((i) => `- [${i.name}](${absoluteUrl(`/industries/${i.slug}`)}): ${i.description}`),
    "",
    "## Partners",
    "",
    ...partners.map((p) => `- [${p.name}](${absoluteUrl(`/partners/${p.slug}`)}): ${p.description}`),
    "",
    "## Key pages",
    "",
    `- [About](${absoluteUrl("/about")})`,
    `- [Case Studies](${absoluteUrl("/case-studies")})`,
    `- [Blog](${absoluteUrl("/blog")})`,
    `- [Care Plans](${absoluteUrl("/plans")})`,
    `- [Contact](${absoluteUrl("/contact")}): ${site.contact.email}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
