/**
 * ────────────────────────────────────────────────────────────────
 *  SITE CONFIG — the single place to rebrand this template.
 * ────────────────────────────────────────────────────────────────
 *  Everything business-specific (name, contact details, address,
 *  social links, SEO defaults) lives here. Pages, JSON-LD schema,
 *  the sitemap, robots.txt and the OG image all read from this file.
 *
 *  The demo values describe "Harbor & Pine", a FICTIONAL interior
 *  design-and-build studio. Replace them with your own business.
 *
 *  Brand colors live in src/app/globals.css (:root variables).
 *  Page content lives in src/data/*.ts and in Sanity (blog + case studies).
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

export const site = {
  /** Public business name, used in titles, schema and the footer. */
  name: "Harbor & Pine",
  /** Short descriptor shown after the name in page titles. */
  tagline: "Commercial Interior Design & Build",
  /** Default meta description for pages that don't set their own. */
  description:
    "Harbor & Pine designs and builds workplaces, restaurants, clinics and retail spaces — one team from first sketch to final walkthrough.",
  /** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production. */
  url: siteUrl,
  /** Open Graph locale, e.g. en_US, en_GB, en_IN. */
  locale: "en_US",
  /** Year founded (Organization schema + About page). */
  foundingYear: "2014",

  logo: {
    /** Path under /public. Replace public/logo.svg with your own. */
    src: "/logo.svg",
    width: 200,
    height: 42,
  },

  contact: {
    email: "hello@example.com",
    salesEmail: "projects@example.com",
    phone: "+1 (555) 010-0199",
    hoursText: "Mon – Fri, 9:00 AM – 6:00 PM",
    /** schema.org openingHours format */
    hoursSchema: "Mo-Fr 09:00-18:00",
    openingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },

  address: {
    street: "123 Example Street",
    city: "Bayview",
    region: "CA",
    postalCode: "00000",
    /** ISO 3166-1 alpha-2 country code */
    country: "US",
    countryName: "United States",
    /** Optional — used for LocalBusiness geo schema. */
    geo: { latitude: 37.7749, longitude: -122.4194 },
  },

  /** Region you serve, used for Service schema areaServed. */
  areaServed: "United States",

  /** Social profiles — used for footer icons and schema sameAs. Leave "" to hide. */
  social: {
    linkedin: "",
    instagram: "",
    x: "",
  },

  /** Optional external link shown as a secondary button in the navbar (e.g. a shop). Leave "" to hide. */
  externalLink: { label: "", href: "" },

  /** Primary call to action used across the site. */
  cta: { label: "Book a Consultation", href: "/contact" },

  /** Analytics — set NEXT_PUBLIC_GA_ID to enable GA4. Nothing loads when empty. */
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  },
} as const;

export const socialLinks = Object.values(site.social).filter(Boolean) as string[];

export const fullAddress = `${site.address.city}, ${site.address.region}, ${site.address.countryName}`;
