/**
 * Industries shown at /industries and /industries/[slug].
 * DEMO CONTENT for the fictional Harbor & Pine studio — replace with your own.
 * `solutions` lists service names shown on the industry page.
 */
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  UtensilsCrossed,
  Stethoscope,
  ShoppingBag,
  GraduationCap,
  Hotel,
} from "lucide-react";

export interface IndustryUseCase {
  title: string;
  description: string;
}

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface Industry {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  description: string;
  heroDescription: string;
  useCases: IndustryUseCase[];
  solutions: string[];
  clients?: string[];
  faqs: IndustryFaq[];
  metaTitle: string;
  metaDescription: string;
}

export const industries: Industry[] = [
  {
    slug: "workplace",
    name: "Workplace",
    tagline: "Offices people want to come back to",
    icon: Briefcase,
    description: "Offices designed for focus, collaboration and culture.",
    heroDescription:
      "The best offices earn the commute. We design and build workplaces that balance quiet focus areas with collaborative spaces, reflect your culture, and adapt as your team grows.",
    useCases: [
      { title: "Headquarters", description: "Flagship offices that express your brand and bring teams together." },
      { title: "Hybrid Workplaces", description: "Bookable desks, meeting rooms and focus booths sized for real attendance." },
      { title: "Office Refreshes", description: "Targeted upgrades to lighting, finishes and furniture without a full rebuild." },
      { title: "Relocations", description: "Test fits, build-out and move management for a smooth transition." },
    ],
    solutions: ["Space Planning", "Interior Design", "Fit-Out & Construction", "Furniture & Fixtures"],
    faqs: [
      { question: "How do you design for hybrid work?", answer: "We start with real attendance patterns, then right-size desks, meeting rooms and focus spaces so the office works on busy and quiet days alike." },
      { question: "Can you refresh our office while we work in it?", answer: "Yes. We phase work and schedule noisy tasks outside business hours to keep disruption low." },
      { question: "How long does an office fit-out take?", answer: "Small refreshes can take a few weeks; full fit-outs typically take three to six months including design." },
      { question: "Do you help choose an office space?", answer: "Yes. Lease test fits show whether a space suits your team before you sign." },
    ],
    metaTitle: "Office & Workplace Interior Design and Build | Harbor & Pine",
    metaDescription:
      "Workplace interior design and fit-out for hybrid teams: headquarters, refreshes and relocations, designed for focus, collaboration and culture.",
  },
  {
    slug: "restaurants",
    name: "Restaurants & Cafés",
    tagline: "Atmosphere that brings guests back",
    icon: UtensilsCrossed,
    description: "Dining rooms, bars and cafés built for atmosphere and flow.",
    heroDescription:
      "In hospitality, the room is part of the product. We design and build restaurants and cafés where atmosphere, seating capacity, kitchen flow and durability all work together.",
    useCases: [
      { title: "New Openings", description: "Concept to opening night, coordinated around your launch date." },
      { title: "Bars & Lounges", description: "Lighting, acoustics and millwork that create a destination." },
      { title: "Cafés", description: "Efficient counters and comfortable seating in compact footprints." },
      { title: "Renovations", description: "Refreshes timed around trading hours to protect revenue." },
    ],
    solutions: ["Interior Design", "Lighting Design", "Fit-Out & Construction", "Furniture & Fixtures"],
    faqs: [
      { question: "Can you work around our opening date?", answer: "Yes. We build the schedule backwards from your opening date and track long-lead items from day one." },
      { question: "How do you balance seating and atmosphere?", answer: "We test several layouts for covers, circulation and comfort, then choose the one that hits your revenue targets without feeling cramped." },
      { question: "Can you renovate without closing?", answer: "Often, yes. We phase work and schedule it outside service hours where possible." },
      { question: "Do you handle acoustics?", answer: "Yes. Acoustic panels, ceiling treatments and soft finishes keep the room lively without being loud." },
    ],
    metaTitle: "Restaurant & Café Interior Design and Build | Harbor & Pine",
    metaDescription:
      "Restaurant, bar and café interior design and construction. Atmosphere, seating flow, lighting and durable finishes, delivered around your opening date.",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Calm, practical spaces for care",
    icon: Stethoscope,
    description: "Clinics and practices designed for patients and staff.",
    heroDescription:
      "Healthcare spaces need to feel calm for patients and work hard for staff. We design and build clinics and practices with clear wayfinding, cleanable finishes, privacy and efficient workflows.",
    useCases: [
      { title: "Medical Clinics", description: "Exam rooms, waiting areas and staff spaces arranged for efficient care." },
      { title: "Dental Practices", description: "Treatment rooms and sterilization areas planned around workflow." },
      { title: "Wellness Studios", description: "Calming environments for therapy, physio and wellness services." },
      { title: "Practice Expansions", description: "Additional rooms added with minimal disruption to patients." },
    ],
    solutions: ["Space Planning", "Interior Design", "Fit-Out & Construction", "Project Management"],
    faqs: [
      { question: "Do you understand healthcare requirements?", answer: "We plan for cleanable finishes, privacy, accessibility and clinical workflows, and coordinate with your specialist equipment vendors." },
      { question: "Can you make a clinic feel less clinical?", answer: "Yes. Warm materials, good lighting and clear wayfinding make spaces feel calmer while still meeting practical needs." },
      { question: "Can you expand our practice while we stay open?", answer: "Yes. We phase construction and control noise and dust so patient care can continue." },
      { question: "Who coordinates medical equipment?", answer: "We coordinate with your equipment suppliers on power, plumbing and space requirements so everything fits and works." },
    ],
    metaTitle: "Clinic & Healthcare Interior Design and Build | Harbor & Pine",
    metaDescription:
      "Healthcare interior design and fit-out for clinics, dental practices and wellness studios — calm for patients, efficient for staff.",
  },
  {
    slug: "retail",
    name: "Retail",
    tagline: "Stores that turn visits into sales",
    icon: ShoppingBag,
    description: "Retail spaces that showcase products and guide customers.",
    heroDescription:
      "Great stores guide customers naturally from the entrance to the till. We design and build retail spaces with strong sightlines, flexible displays, flattering lighting and finishes that last.",
    useCases: [
      { title: "Flagship Stores", description: "Brand-defining spaces that create a memorable visit." },
      { title: "Showrooms", description: "Product-focused layouts for considered purchases." },
      { title: "Pop-Ups", description: "Fast, reusable fit-outs for temporary locations." },
      { title: "Store Rollouts", description: "Repeatable design standards for multiple locations." },
    ],
    solutions: ["Interior Design", "Lighting Design", "Furniture & Fixtures", "Fit-Out & Construction"],
    faqs: [
      { question: "Can you create a design we can repeat across stores?", answer: "Yes. We develop design standards and kits of parts that make rollouts faster and more consistent." },
      { question: "How important is lighting in retail?", answer: "Very. Good lighting draws attention to products, shows true colors and sets the mood of the store." },
      { question: "Can displays be changed easily?", answer: "We design flexible fixtures so you can update merchandising without calling a contractor." },
      { question: "Do you build pop-up stores?", answer: "Yes. We design modular fit-outs that install quickly and can be reused at future locations." },
    ],
    metaTitle: "Retail Store & Showroom Design and Build | Harbor & Pine",
    metaDescription:
      "Retail interior design and fit-out for flagships, showrooms, pop-ups and rollouts — sightlines, displays and lighting that sell.",
  },
  {
    slug: "education",
    name: "Education",
    tagline: "Learning spaces that adapt",
    icon: GraduationCap,
    description: "Flexible classrooms, libraries and student spaces.",
    heroDescription:
      "Learning happens everywhere, not just at desks. We design and build classrooms, libraries and student commons that adapt to different teaching styles and stand up to daily use.",
    useCases: [
      { title: "Flexible Classrooms", description: "Furniture and layouts that switch between lectures and group work." },
      { title: "Libraries & Commons", description: "Quiet study zones alongside social and collaborative areas." },
      { title: "Staff Spaces", description: "Workrooms and lounges that support teachers." },
      { title: "Summer Projects", description: "Construction scheduled around the academic calendar." },
    ],
    solutions: ["Space Planning", "Interior Design", "Furniture & Fixtures", "Project Management"],
    faqs: [
      { question: "Can you complete work during school holidays?", answer: "Yes. We plan projects around the academic calendar so spaces are ready for the new term." },
      { question: "How do you make classrooms flexible?", answer: "Movable furniture, writable surfaces and good acoustics let teachers reconfigure rooms in minutes." },
      { question: "Are your finishes durable enough for schools?", answer: "Yes. We specify commercial-grade, easy-to-clean materials suited to heavy daily use." },
      { question: "Do you involve teachers and students?", answer: "We run workshops with staff and students so the design reflects how the spaces will really be used." },
    ],
    metaTitle: "School & Campus Interior Design and Build | Harbor & Pine",
    metaDescription:
      "Education interior design and fit-out: flexible classrooms, libraries and student commons, delivered around the academic calendar.",
  },
  {
    slug: "hospitality",
    name: "Hotels & Hospitality",
    tagline: "Memorable stays, efficient operations",
    icon: Hotel,
    description: "Lobbies, guest rooms and amenities with character.",
    heroDescription:
      "Hotels win on first impressions and repeat stays. We design and build lobbies, guest rooms and amenity spaces that feel distinctive, photograph well and stand up to constant use.",
    useCases: [
      { title: "Lobbies & Lounges", description: "Arrival experiences that set the tone for the stay." },
      { title: "Guest Rooms", description: "Comfortable, durable rooms designed for efficient housekeeping." },
      { title: "Amenity Spaces", description: "Gyms, co-working and event spaces that add value." },
      { title: "Phased Renovations", description: "Floor-by-floor upgrades that keep rooms available." },
    ],
    solutions: ["Interior Design", "Lighting Design", "Furniture & Fixtures", "Project Management"],
    faqs: [
      { question: "Can you renovate while the hotel stays open?", answer: "Yes. We phase work floor by floor and control noise so guests are not disturbed." },
      { question: "How do you design guest rooms for durability?", answer: "We choose commercial-grade materials and details that are easy to clean and repair without sacrificing comfort." },
      { question: "Do you create a mock-up room first?", answer: "For larger projects we recommend a mock-up room so you can test the design before full rollout." },
      { question: "Can you help with brand standards?", answer: "Yes. We work within existing brand standards or help develop new ones." },
    ],
    metaTitle: "Hotel & Hospitality Interior Design and Build | Harbor & Pine",
    metaDescription:
      "Hotel interior design and fit-out for lobbies, guest rooms and amenities — distinctive, durable and phased to keep rooms open.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((i) => i.slug);
}
