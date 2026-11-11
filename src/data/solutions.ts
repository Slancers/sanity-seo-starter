/**
 * Services ("solutions") shown at /solutions and /solutions/[slug].
 * DEMO CONTENT for the fictional Harbor & Pine studio — replace with your own.
 * Each entry generates a page with Service + FAQPage JSON-LD (keep 4+ FAQs).
 */
import {
  PenTool,
  LayoutGrid,
  HardHat,
  Lamp,
  Armchair,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  icon: LucideIcon;
  description: string;
  heroDescription: string;
  features: { title: string; description: string }[];
  benefits: string[];
  technologies: string[];
  faqs: FaqItem[];
  metaTitle: string;
  metaDescription: string;
}

export const solutions: Solution[] = [
  {
    slug: "interior-design",
    name: "Interior Design",
    tagline: "Concepts, Materials & Detailed Drawings",
    icon: PenTool,
    description:
      "Spaces designed around how your people actually work, eat, heal or shop — from first concept to construction-ready drawings.",
    heroDescription:
      "Good interiors start with understanding how a space will be used. We run discovery workshops, develop concepts, select materials and finishes, and produce the detailed drawings contractors need to build it right the first time.",
    features: [
      { title: "Discovery Workshops", description: "Structured sessions with your team to map needs, workflows, brand and budget before any design work begins." },
      { title: "Concept Development", description: "Mood boards, sketches and 3D views that let you see and react to the direction early." },
      { title: "Material & Finish Selection", description: "Durable, maintainable materials chosen for your use case, with physical samples for sign-off." },
      { title: "Construction Documents", description: "Detailed plans, elevations and specifications ready for permits and pricing." },
    ],
    benefits: [
      "Design decisions grounded in how the space is really used",
      "Fewer change orders thanks to complete drawings",
      "Brand expressed through materials, not just signage",
      "Clear visuals for stakeholder sign-off",
    ],
    technologies: ["3D visualization", "Material libraries", "Physical sample boards", "BIM-ready drawings"],
    faqs: [
      { question: "How long does the design phase take?", answer: "Most commercial projects take four to ten weeks from discovery to construction documents, depending on size and how quickly decisions are made." },
      { question: "Can you work with our existing brand guidelines?", answer: "Yes. We translate your brand guidelines into materials, colors, lighting and wayfinding so the space feels unmistakably yours." },
      { question: "Do you only design, or also build?", answer: "Both. You can hire us for design only, or for design and build as a single team — most clients choose the combined option to keep accountability in one place." },
      { question: "Will we see the space before it's built?", answer: "Yes. We share 3D views at the concept stage and refine them as the design develops, so there are no surprises on site." },
    ],
    metaTitle: "Commercial Interior Design Services | Harbor & Pine",
    metaDescription:
      "Commercial interior design from discovery workshops to construction documents. Concepts, materials and 3D visuals for offices, restaurants, clinics and retail.",
  },
  {
    slug: "space-planning",
    name: "Space Planning",
    tagline: "Layouts, Test Fits & Workplace Strategy",
    icon: LayoutGrid,
    description:
      "Smart layouts that make every square foot work harder — test fits, circulation and capacity planning before you sign a lease.",
    heroDescription:
      "The right layout can save you a floor. We study headcount, workflows and growth plans to produce test fits and space plans that balance focus, collaboration, circulation and future flexibility.",
    features: [
      { title: "Lease Test Fits", description: "Quick layout studies that show whether a candidate space fits your needs before you commit." },
      { title: "Occupancy Planning", description: "Headcount, desk ratios and meeting-room mix modelled against how your team really works." },
      { title: "Circulation & Accessibility", description: "Clear paths, accessible routes and code-compliant egress built into every plan." },
      { title: "Growth Scenarios", description: "Layouts that flex as you grow or change, without a full rebuild." },
    ],
    benefits: [
      "Avoid leasing more space than you need",
      "Layouts that support both focus and collaboration",
      "Accessibility and code compliance from day one",
      "A plan that adapts as your team changes",
    ],
    technologies: ["Test-fit modelling", "Occupancy analytics", "Accessibility review", "Phasing plans"],
    faqs: [
      { question: "Can you help before we sign a lease?", answer: "Yes — that's the best time. A test fit shows whether a space works for your headcount and workflows before you commit." },
      { question: "How do you decide how many meeting rooms we need?", answer: "We look at how your team meets today, booking data if you have it, and where you're heading, then recommend a mix of room sizes." },
      { question: "Do your plans account for accessibility?", answer: "Always. Accessible routes, clearances and facilities are part of every layout, not an afterthought." },
      { question: "Can we phase the work to stay open?", answer: "Yes. We plan construction in phases so your business can keep operating while work moves through the space." },
    ],
    metaTitle: "Office Space Planning & Test Fits | Harbor & Pine",
    metaDescription:
      "Space planning, lease test fits and occupancy planning. Layouts that make every square foot work, with accessibility and growth built in.",
  },
  {
    slug: "fit-out-construction",
    name: "Fit-Out & Construction",
    tagline: "One Team From Drawings to Handover",
    icon: HardHat,
    description:
      "General contracting for interior fit-outs — trades, permits, scheduling and quality control handled by one accountable team.",
    heroDescription:
      "We turn approved designs into finished spaces. Our project teams coordinate every trade, manage permits and inspections, keep the schedule tight and walk the space with you until every detail is right.",
    features: [
      { title: "Pre-Construction", description: "Detailed estimates, value engineering and schedules before work starts." },
      { title: "Trade Coordination", description: "Carpentry, electrical, mechanical, flooring and finishes sequenced to avoid delays." },
      { title: "Permits & Inspections", description: "We handle applications, inspections and sign-offs with local authorities." },
      { title: "Quality & Handover", description: "Punch-list walkthroughs, documentation and warranties at completion." },
    ],
    benefits: [
      "A single point of accountability",
      "Transparent budgets and schedules",
      "Minimal disruption to neighbors and operations",
      "Documented handover with warranties",
    ],
    technologies: ["Project scheduling", "Site progress photos", "Digital punch lists", "Safety management"],
    faqs: [
      { question: "Do you build designs from other firms?", answer: "Yes. We regularly build projects designed by other architects and designers, and coordinate closely with them throughout." },
      { question: "How do you keep projects on budget?", answer: "We price from complete drawings, value-engineer early, and share cost updates throughout so there are no end-of-project surprises." },
      { question: "Can you work nights or weekends?", answer: "Yes. For occupied buildings, restaurants and retail we often schedule noisy work outside business hours." },
      { question: "What happens after handover?", answer: "You receive as-built documents, warranties and maintenance guidance, and we return for a check-in after the first few months." },
    ],
    metaTitle: "Commercial Fit-Out & Interior Construction | Harbor & Pine",
    metaDescription:
      "Interior fit-out and general contracting: pre-construction, trade coordination, permits and handover — one accountable team from drawings to keys.",
  },
  {
    slug: "lighting-design",
    name: "Lighting Design",
    tagline: "Layered Lighting & Controls",
    icon: Lamp,
    description:
      "Layered lighting that sets the mood, supports the task and cuts energy use — with controls that are easy to live with.",
    heroDescription:
      "Lighting changes how a space feels more than almost anything else. We design layered schemes — ambient, task and accent — with efficient fixtures and simple controls, tuned to your hours and atmosphere.",
    features: [
      { title: "Layered Schemes", description: "Ambient, task and accent lighting combined for comfort and character." },
      { title: "Fixture Selection", description: "Efficient, long-life fixtures chosen for performance and appearance." },
      { title: "Controls & Scenes", description: "Dimming, scheduling and preset scenes that staff can use without training." },
      { title: "Daylight Integration", description: "Layouts and controls that make the most of natural light." },
    ],
    benefits: [
      "Spaces that feel right at every hour",
      "Lower energy bills with efficient fixtures",
      "Simple controls for staff",
      "Better comfort and productivity",
    ],
    technologies: ["Lighting calculations", "Dimmable LED systems", "Scene controllers", "Daylight sensors"],
    faqs: [
      { question: "Can lighting really change how a space feels?", answer: "Yes. The same room can feel clinical, cozy or energetic depending on lighting levels, color temperature and where light falls." },
      { question: "Will new lighting reduce our energy costs?", answer: "Usually. Efficient fixtures combined with dimming and scheduling typically cut lighting energy use significantly compared with older systems." },
      { question: "Are lighting controls complicated to use?", answer: "They shouldn't be. We set up a few clearly labelled scenes so staff can change the mood with one button." },
      { question: "Can you upgrade lighting without a full renovation?", answer: "Often, yes. Many lighting upgrades can be done as a standalone project with limited disruption." },
    ],
    metaTitle: "Commercial Lighting Design & Controls | Harbor & Pine",
    metaDescription:
      "Layered commercial lighting design with efficient fixtures and simple controls. Better atmosphere, comfort and energy use for offices, restaurants and retail.",
  },
  {
    slug: "furniture-fixtures",
    name: "Furniture & Fixtures",
    tagline: "Specification, Procurement & Install",
    icon: Armchair,
    description:
      "Furniture, fixtures and equipment specified, sourced, delivered and installed — so the space is ready to use on day one.",
    heroDescription:
      "We specify furniture and fixtures that fit the design, the budget and the way the space is used, then manage ordering, lead times, delivery and installation so everything arrives together.",
    features: [
      { title: "Specification", description: "Furniture and fixtures selected for durability, comfort and design intent." },
      { title: "Procurement", description: "Ordering, lead-time tracking and vendor coordination handled for you." },
      { title: "Custom Millwork", description: "Built-in joinery, counters and displays made to measure." },
      { title: "Delivery & Install", description: "Receiving, assembly, placement and clean-up, coordinated with construction." },
    ],
    benefits: [
      "Everything arrives and installs on schedule",
      "One budget for build and furniture",
      "Commercial-grade durability",
      "Custom pieces where off-the-shelf won't do",
    ],
    technologies: ["Furniture schedules", "Lead-time tracking", "Custom millwork drawings", "Install coordination"],
    faqs: [
      { question: "Can you reuse our existing furniture?", answer: "Yes. We audit what you have and reuse or refurbish pieces where it makes sense, which saves money and reduces waste." },
      { question: "How long do furniture lead times take?", answer: "It varies by product — from a few weeks to several months. We track lead times from day one and plan the schedule around them." },
      { question: "Do you make custom pieces?", answer: "Yes. Reception desks, banquettes, display units and built-in storage are often custom-made to fit the space." },
      { question: "Who handles delivery and assembly?", answer: "We do. Our team receives, assembles and places everything, then removes packaging so the space is ready to use." },
    ],
    metaTitle: "Commercial Furniture, Fixtures & Millwork | Harbor & Pine",
    metaDescription:
      "Furniture and fixture specification, procurement, custom millwork and installation for commercial interiors — ready to use on day one.",
  },
  {
    slug: "project-management",
    name: "Project Management",
    tagline: "Budgets, Schedules & Owner Representation",
    icon: ClipboardCheck,
    description:
      "Owner-side project management that keeps budgets, schedules, vendors and decisions on track from kickoff to move-in.",
    heroDescription:
      "Already have a designer or contractor? We can act on your behalf — setting budgets, managing schedules, coordinating vendors and keeping decisions moving so your project lands on time.",
    features: [
      { title: "Budget Management", description: "Realistic budgets, cost tracking and change-order review." },
      { title: "Schedule Control", description: "Master schedules covering design, procurement, construction and move-in." },
      { title: "Vendor Coordination", description: "IT, AV, security, signage and movers aligned with construction." },
      { title: "Move-In Planning", description: "Detailed move plans so your team is productive from the first morning." },
    ],
    benefits: [
      "An expert on your side of the table",
      "Fewer surprises on cost and timing",
      "Faster decisions and clearer reporting",
      "A smooth move-in day",
    ],
    technologies: ["Master schedules", "Cost reports", "Decision logs", "Move-in checklists"],
    faqs: [
      { question: "What does owner-side project management mean?", answer: "We represent you, not the contractor — reviewing costs, holding vendors to schedule and making sure decisions serve your interests." },
      { question: "Do we need a project manager if we hire a contractor?", answer: "Not always. It's most valuable for larger projects, tight timelines or when your team doesn't have time to manage vendors." },
      { question: "Can you manage the move as well?", answer: "Yes. We coordinate movers, IT cut-over, furniture and signage so your team can start work immediately." },
      { question: "How do you report progress?", answer: "Short weekly updates covering budget, schedule, risks and decisions needed — no jargon." },
    ],
    metaTitle: "Interior Project Management & Owner's Rep | Harbor & Pine",
    metaDescription:
      "Owner-side project management for interior projects: budgets, schedules, vendor coordination and move-in planning, on your side from kickoff to keys.",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return solutions.map((s) => s.slug);
}
