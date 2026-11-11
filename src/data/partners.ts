/**
 * Partners shown at /partners and /partners/[slug] — suppliers, brands or
 * collaborators you work with. All names below are FICTIONAL demo content.
 * Replace with your own partners, or delete the /partners routes if you don't need them.
 *
 * To show a partner logo, add the file to /public and set `logo` (e.g. "/partners/acme.svg").
 * Only use logos you have permission to display.
 */
import type { LucideIcon } from "lucide-react";
import { TreePine, Lightbulb, Armchair, Layers } from "lucide-react";

export interface PartnerProduct {
  name: string;
  description: string;
}

export interface PartnerFaq {
  question: string;
  answer: string;
}

export interface Partner {
  slug: string;
  name: string;
  tagline: string;
  partnerLevel: string;
  icon: LucideIcon;
  logo?: string;
  description: string;
  heroDescription: string;
  products: PartnerProduct[];
  whyUs: string[];
  faqs: PartnerFaq[];
  metaTitle: string;
  metaDescription: string;
}

export const partners: Partner[] = [
  {
    slug: "oakline-timber",
    name: "Oakline Timber",
    tagline: "Sustainable hardwoods and millwork",
    partnerLevel: "Preferred Millwork Partner",
    icon: TreePine,
    description: "Responsibly sourced hardwood flooring, panels and custom joinery.",
    heroDescription:
      "Oakline Timber supplies responsibly sourced hardwoods for floors, wall panels and custom joinery. We specify and install their materials across workplaces, restaurants and hospitality projects.",
    products: [
      { name: "Engineered Flooring", description: "Stable, durable hardwood floors for high-traffic commercial spaces." },
      { name: "Acoustic Wall Panels", description: "Slatted timber panels that soften sound and add warmth." },
      { name: "Custom Joinery", description: "Reception desks, banquettes and shelving built to measure." },
    ],
    whyUs: [
      "Experience specifying timber for commercial use",
      "Installation by trained crews",
      "Coordinated lead times within the project schedule",
      "Finish samples supplied for approval",
    ],
    faqs: [
      { question: "Is timber suitable for high-traffic areas?", answer: "Yes, with the right species, construction and finish. Engineered hardwood performs well in busy commercial spaces." },
      { question: "Are the materials sustainably sourced?", answer: "We specify certified, responsibly sourced timber wherever possible and can provide documentation for green building goals." },
      { question: "Can timber help with acoustics?", answer: "Yes. Slatted panels with acoustic backing absorb sound and make busy rooms more comfortable." },
      { question: "How long do custom joinery pieces take?", answer: "Typically several weeks from approved drawings; we plan this into the project schedule early." },
    ],
    metaTitle: "Oakline Timber — Hardwood Flooring & Millwork | Harbor & Pine",
    metaDescription:
      "Sustainable hardwood flooring, acoustic panels and custom joinery from Oakline Timber, specified and installed by Harbor & Pine. (Fictional demo partner.)",
  },
  {
    slug: "lumen-co",
    name: "Lumen & Co.",
    tagline: "Architectural lighting",
    partnerLevel: "Lighting Partner",
    icon: Lightbulb,
    description: "Efficient architectural fixtures and lighting controls.",
    heroDescription:
      "Lumen & Co. makes efficient architectural lighting fixtures and controls. We design layered lighting schemes with their range and commission the controls on site.",
    products: [
      { name: "Linear Fixtures", description: "Clean, continuous lighting for offices and retail." },
      { name: "Decorative Pendants", description: "Statement fixtures for restaurants, lobbies and lounges." },
      { name: "Scene Controls", description: "Simple wall controllers with preset lighting scenes." },
    ],
    whyUs: [
      "In-house lighting design expertise",
      "Controls commissioned and labelled on site",
      "Energy-efficient specifications",
      "Ongoing support after handover",
    ],
    faqs: [
      { question: "Can you match lighting to our brand?", answer: "Yes. Fixture style, color temperature and scenes can all reflect your brand and atmosphere." },
      { question: "Are the fixtures energy efficient?", answer: "Yes. We specify efficient LED fixtures and dimming controls that reduce energy use." },
      { question: "Who sets up the lighting controls?", answer: "We commission and label the controls on site and show your team how to use them." },
      { question: "What if a fixture fails?", answer: "Fixtures are covered by manufacturer warranties, and we help coordinate replacements." },
    ],
    metaTitle: "Lumen & Co. — Architectural Lighting | Harbor & Pine",
    metaDescription:
      "Architectural lighting fixtures and controls from Lumen & Co., designed and commissioned by Harbor & Pine. (Fictional demo partner.)",
  },
  {
    slug: "fieldhouse-furniture",
    name: "Fieldhouse Furniture",
    tagline: "Commercial furniture",
    partnerLevel: "Furniture Partner",
    icon: Armchair,
    description: "Durable commercial seating, desks and lounge furniture.",
    heroDescription:
      "Fieldhouse Furniture builds commercial-grade seating, desks and lounge pieces. We specify, procure and install their collections as part of complete fit-outs.",
    products: [
      { name: "Task Seating", description: "Ergonomic chairs for all-day comfort." },
      { name: "Height-Adjustable Desks", description: "Sit-stand desks for flexible workplaces." },
      { name: "Lounge Collections", description: "Sofas and soft seating for lobbies and breakout spaces." },
    ],
    whyUs: [
      "Furniture planned alongside the interior design",
      "Procurement and lead times managed for you",
      "Delivery, assembly and placement included",
      "Warranty support after installation",
    ],
    faqs: [
      { question: "Can we try furniture before ordering?", answer: "Yes. We arrange samples or showroom visits for key pieces like task chairs." },
      { question: "How long does commercial furniture take to arrive?", answer: "Lead times vary by product; we track them from the start and plan delivery around construction." },
      { question: "Do you install the furniture?", answer: "Yes. We receive, assemble and place every piece, then remove packaging." },
      { question: "Is the furniture covered by warranty?", answer: "Yes. Commercial furniture comes with manufacturer warranties, and we help with any claims." },
    ],
    metaTitle: "Fieldhouse Furniture — Commercial Furniture | Harbor & Pine",
    metaDescription:
      "Commercial seating, desks and lounge furniture from Fieldhouse Furniture, specified and installed by Harbor & Pine. (Fictional demo partner.)",
  },
  {
    slug: "stonework-surfaces",
    name: "Stonework Surfaces",
    tagline: "Countertops and surfaces",
    partnerLevel: "Surfaces Partner",
    icon: Layers,
    description: "Natural stone, quartz and solid-surface countertops.",
    heroDescription:
      "Stonework Surfaces fabricates natural stone, quartz and solid-surface countertops. We specify and install their surfaces for bars, reception desks, kitchens and washrooms.",
    products: [
      { name: "Quartz Countertops", description: "Durable, low-maintenance surfaces for busy spaces." },
      { name: "Natural Stone", description: "Marble and granite for statement bars and desks." },
      { name: "Solid Surface", description: "Seamless, hygienic surfaces for healthcare and washrooms." },
    ],
    whyUs: [
      "Surfaces selected for each use case",
      "Templating and installation coordinated on site",
      "Samples provided for approval",
      "Care guidance at handover",
    ],
    faqs: [
      { question: "Which surface is best for a busy bar?", answer: "Quartz is often the best balance of durability, stain resistance and appearance for bars." },
      { question: "Is natural stone hard to maintain?", answer: "It needs periodic sealing, but with the right finish it performs well and ages beautifully." },
      { question: "What surface do you recommend for clinics?", answer: "Solid surface is seamless and easy to clean, which makes it a strong choice for healthcare." },
      { question: "Can we see samples first?", answer: "Yes. We provide samples, and for natural stone you can choose your exact slabs." },
    ],
    metaTitle: "Stonework Surfaces — Countertops | Harbor & Pine",
    metaDescription:
      "Quartz, natural stone and solid-surface countertops from Stonework Surfaces, specified and installed by Harbor & Pine. (Fictional demo partner.)",
  },
];

export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((p) => p.slug === slug);
}

export function getAllPartnerSlugs(): string[] {
  return partners.map((p) => p.slug);
}
