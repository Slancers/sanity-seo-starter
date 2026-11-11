import type { Metadata } from "next";
import { site, socialLinks } from "@/config/site";

/** Absolute URL for a site path, e.g. absoluteUrl("/blog") */
export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

/**
 * Builds consistent page metadata: title, description, canonical,
 * Open Graph and Twitter tags. Use in every page's metadata export.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Reusable Organization reference for JSON-LD `provider` / `publisher` fields. */
export const organizationRef = {
  "@type": "Organization",
  name: site.name,
  url: site.url,
} as const;

export const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
} as const;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absoluteUrl(site.logo.src),
  description: site.description,
  foundingDate: site.foundingYear,
  email: site.contact.email,
  address: postalAddress,
  sameAs: socialLinks,
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  logo: absoluteUrl(site.logo.src),
  image: absoluteUrl(site.logo.src),
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: postalAddress,
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.address.geo.latitude,
    longitude: site.address.geo.longitude,
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: site.contact.openingDays,
    opens: site.contact.opens,
    closes: site.contact.closes,
  },
  sameAs: socialLinks,
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
