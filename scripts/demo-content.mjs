/**
 * Demo content for the fictional "Harbor & Pine" studio.
 * Imported into Sanity by `npm run setup` (or `npm run seed`) so a fresh site isn't empty.
 *
 * Every document ID starts with "demo-", so you can find and delete all demo
 * content later in Sanity Studio, or with:  npm run seed -- --remove
 */

let keyCounter = 0;
const key = () => `k${(++keyCounter).toString(36)}`;

/** Build a Portable Text block. style: "normal" | "h2" | "h3" | "blockquote" */
const block = (text, style = "normal") => ({
  _type: "block",
  _key: key(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key(), text, marks: [] }],
});

const h2 = (text) => block(text, "h2");
const p = (text) => block(text);

const slug = (current) => ({ _type: "slug", current });

export const demoDocuments = [
  // ── Blog posts ────────────────────────────────────────────────
  {
    _id: "demo-blog-hybrid-office",
    _type: "blogPost",
    title: "How Much Office Do You Really Need? A Guide to Sizing a Hybrid Workplace",
    slug: slug("sizing-a-hybrid-workplace"),
    author: "Harbor & Pine Design Team",
    publishedAt: "2026-09-15T09:00:00Z",
    category: "Workplace",
    excerpt:
      "Hybrid work changed how offices are used, but most floor plans haven't caught up. Here's a simple way to size desks, meeting rooms and focus space around real attendance.",
    body: [
      p("Most offices were planned for a world where everyone came in five days a week. Today, attendance rises and falls through the week, and the space needs to work on both your busiest and quietest days."),
      h2("Start with real attendance, not headcount"),
      p("Look at a few typical weeks of badge data, desk bookings or even a simple sign-in sheet. Plan for your busiest regular day, not the annual all-hands, and handle peaks with flexible spaces instead of permanent desks."),
      h2("Rebalance desks and meeting space"),
      p("Hybrid teams come to the office to work together. That usually means fewer assigned desks and more small meeting rooms, project areas and spaces for video calls."),
      h2("Protect focus time"),
      p("Open plans work better when people have somewhere quiet to go. A few enclosed focus rooms or phone booths make the whole floor more comfortable."),
      h2("Plan for change"),
      p("Choose furniture and layouts that can be rearranged without construction. Your team will keep evolving, and the office should be able to evolve with it."),
    ],
    metaTitle: "How to Size a Hybrid Office: Desks, Meeting Rooms & Focus Space",
    metaDescription:
      "A practical guide to sizing a hybrid workplace around real attendance: desk ratios, meeting room mix, focus space and flexible layouts.",
    tags: ["hybrid work", "space planning", "office design"],
  },
  {
    _id: "demo-blog-restaurant-lighting",
    _type: "blogPost",
    title: "Five Lighting Mistakes That Make Restaurants Feel Wrong",
    slug: slug("restaurant-lighting-mistakes"),
    author: "Harbor & Pine Design Team",
    publishedAt: "2026-08-20T09:00:00Z",
    category: "Lighting",
    excerpt:
      "Guests may not notice lighting when it's right, but they always feel it when it's wrong. These are the five mistakes we see most often, and how to fix them.",
    body: [
      p("Lighting shapes how a dining room feels more than almost any other design choice. Here are the problems we see most often when we're asked to refresh a restaurant."),
      h2("1. One light level all day"),
      p("Lunch and dinner need different moods. Dimming and a couple of preset scenes let staff change the atmosphere with one button."),
      h2("2. Light that's too cool"),
      p("Cool white light can make food and people look washed out. Warmer color temperatures feel more inviting in most dining rooms."),
      h2("3. Glare at eye level"),
      p("Bare bulbs and poorly placed pendants shine straight into guests' eyes. Shielded fixtures and careful mounting heights fix this."),
      h2("4. Dark tables, bright ceilings"),
      p("Put the light where people are looking: on the table, the bar and the art. The ceiling rarely needs to be the brightest surface in the room."),
      h2("5. Forgetting the bar and back of house"),
      p("The bar is often the visual anchor of the room, and the kitchen pass needs strong, even task light. Both deserve as much attention as the dining area."),
    ],
    metaTitle: "Restaurant Lighting: 5 Common Mistakes and How to Fix Them",
    metaDescription:
      "Five restaurant lighting mistakes that hurt atmosphere: flat light levels, cool color, glare, dark tables and a neglected bar, plus simple fixes.",
    tags: ["lighting", "restaurants", "hospitality"],
  },
  {
    _id: "demo-blog-fit-out-budget",
    _type: "blogPost",
    title: "What Actually Drives the Cost of a Commercial Fit-Out?",
    slug: slug("commercial-fit-out-costs"),
    author: "Harbor & Pine Design Team",
    publishedAt: "2026-07-10T09:00:00Z",
    category: "Guides",
    excerpt:
      "Fit-out budgets surprise people for the same few reasons. Understanding them early is the best way to keep a project on budget.",
    body: [
      p("Every project is different, but the same factors drive cost on almost every commercial fit-out. Knowing them up front helps you set a realistic budget and decide where to spend."),
      h2("The condition of the space"),
      p("A space with working mechanical systems, level floors and good ceilings costs far less to fit out than one that needs major infrastructure work."),
      h2("Mechanical and electrical changes"),
      p("Moving plumbing, adding kitchens or washrooms, or changing heating and cooling are often the biggest line items, and the least visible."),
      h2("Finishes and custom work"),
      p("Custom millwork, stone and specialist finishes add character but also cost. Spending on the surfaces people touch and see most usually gives the best value."),
      h2("Schedule"),
      p("Tight timelines and after-hours work increase labor costs. Allowing enough time for design and long-lead items saves money."),
      h2("Decisions"),
      p("Late changes are expensive. Complete drawings and early decisions are the most reliable way to protect your budget."),
    ],
    metaTitle: "Commercial Fit-Out Costs: What Really Drives Your Budget",
    metaDescription:
      "The main drivers of commercial fit-out costs, from the condition of the space and mechanical work to finishes, schedule and late decisions.",
    tags: ["budget", "fit-out", "planning"],
  },

  // ── Case studies ──────────────────────────────────────────────
  {
    _id: "demo-case-sample-bistro",
    _type: "caseStudy",
    title: "Sample Bistro: A 60-Seat Restaurant in 14 Weeks",
    slug: slug("sample-bistro"),
    clientName: "Sample Bistro",
    industry: "Restaurants & Cafés",
    location: "Bayview, CA",
    challenge:
      "The owners had signed a lease on a former retail unit with a fixed opening date and no kitchen, washrooms or atmosphere to speak of. They needed a warm, lively 60-seat restaurant and couldn't afford delays.",
    solution:
      "We reworked the layout around kitchen flow, designed layered lighting with preset scenes, added acoustic timber panels to tame noise, and built custom banquettes to maximize covers. Long-lead items were ordered in week one.",
    result:
      "The restaurant opened on its planned date and on budget, with 60 covers, a bar that anchors the room, and noise levels that keep conversation easy even when it's full.",
    technologies: ["Layered lighting", "Acoustic timber panels", "Custom millwork"],
    services: ["Interior Design", "Lighting Design", "Fit-Out & Construction", "Furniture & Fixtures"],
    publishedAt: "2026-06-01T09:00:00Z",
    featured: true,
    testimonialQuote:
      "We opened on the date we promised our investors, on budget, and the room looks exactly like the renderings.",
    testimonialAuthor: "Jordan Ellis, Owner (demo testimonial)",
    faqItems: [
      { _key: key(), question: "How long did the project take?", answer: "Fourteen weeks from first design meeting to opening night." },
      { _key: key(), question: "How was noise controlled?", answer: "Acoustic timber wall panels, soft seating and a treated ceiling absorb sound so the room feels lively without being loud." },
      { _key: key(), question: "Did the budget change?", answer: "No. Pricing from complete drawings and ordering long-lead items early kept the project on budget." },
    ],
    metaTitle: "Restaurant Fit-Out Case Study: 60 Seats in 14 Weeks",
    metaDescription:
      "How a former retail unit became a 60-seat restaurant in 14 weeks, on budget, with layered lighting, acoustic panels and custom banquettes.",
  },
  {
    _id: "demo-case-example-co-hq",
    _type: "caseStudy",
    title: "Example Co.: A Hybrid Headquarters That Uses 30% Less Space",
    slug: slug("example-co-headquarters"),
    clientName: "Example Co.",
    industry: "Workplace",
    location: "Bayview, CA",
    challenge:
      "A growing software team was planning to lease two floors, but attendance data showed the office was rarely more than 60% full. They wanted a headquarters people would choose to come to.",
    solution:
      "Using attendance data, we planned a single floor with bookable desks, a mix of small meeting rooms, focus booths and a large social hub for team days. We phased the build so the team moved in on schedule.",
    result:
      "The team fit comfortably on one floor instead of two, cutting space needs by about 30%, while meeting rooms are now easier to book than in the old office.",
    technologies: ["Occupancy analysis", "Bookable desks", "Acoustic focus booths"],
    services: ["Space Planning", "Interior Design", "Fit-Out & Construction", "Project Management"],
    publishedAt: "2026-04-15T09:00:00Z",
    featured: true,
    testimonialQuote:
      "The data-led plan saved us a whole floor, and people actually like coming in now.",
    testimonialAuthor: "Sam Rivera, Head of Operations (demo testimonial)",
    faqItems: [
      { _key: key(), question: "How was the right size determined?", answer: "We analyzed several weeks of attendance data and planned for the busiest regular day, with flexible space for peaks." },
      { _key: key(), question: "Did the team have to work remotely during the move?", answer: "No. The build was phased and the move scheduled over a weekend, so work continued without interruption." },
      { _key: key(), question: "How do people find a desk?", answer: "Desks and rooms are bookable, with neighborhoods for each team so colleagues sit together." },
    ],
    metaTitle: "Hybrid Office Case Study: 30% Less Space, Better Experience",
    metaDescription:
      "How data-led space planning fit a growing team onto one floor instead of two, with bookable desks, focus booths and a social hub.",
  },
];

export const demoIds = demoDocuments.map((d) => d._id);
