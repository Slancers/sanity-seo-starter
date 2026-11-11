# Sanity SEO Starter — Agent Guide

@AGENTS.md

## What this project is
A Next.js (App Router) + Sanity marketing-site starter for service businesses. The demo brand,
"Harbor & Pine", is fictional placeholder content meant to be replaced.

## First conversation with a new user
Use this when the user runs `/start`, or says something like "help me get started", "set this up"
or "what do I do?". Guide them one step at a time, in plain language: assume they are not a developer.
Finish each step and confirm it worked before moving on.

1. **Check where they are.** Without asking, check: is `node_modules/` present? Does `.env.local` set
   `NEXT_PUBLIC_SANITY_PROJECT_ID`? Is `src/config/site.ts` still "Harbor & Pine"? If a project ID is set,
   do demo documents exist (`npx sanity documents query '*[string::startsWith(_id,"demo-")]._id' -p <id> -d production`)?
   Skip the steps that are already done, and tell the user what's done and what's left.
2. **Explain the plan in 3–4 lines:** a ready-made, SEO-complete website; we'll connect a free Sanity
   account (where blog posts, case studies and contact-form messages are stored), put in their business
   details, then put it online. Takes about 20–30 minutes.
3. **Install:** run `npm install` if needed (takes 2–3 minutes). If it prints `npm audit` warnings, don't
   run `npm audit fix --force`: it can install breaking major versions. Mention the warnings and move on.
4. **Sanity login:** ask the user to run `npx sanity login` in their own terminal (it opens a browser
   to log in or create a free account; you can't do it for them). Wait until they say it's done.
5. **Connect Sanity:** ask what the Sanity project should be called (suggest their business name) and
   whether they want the demo blog posts and case studies for now (handy for previewing; removable later).
   Then run `npm run setup -- --yes --project-name "<name>" --site-url http://localhost:3000` (add `--no-seed`
   if they don't want demo content). If they already have a Sanity project *for this site*, use
   `--project-id <id>` instead. Never use a project that belongs to another site.
6. **Preview:** start `npm run dev` in the background and tell them to open http://localhost:3000 and
   http://localhost:3000/studio (Studio asks them to log in with the same Sanity account).
   Check the port `npm run dev` printed: if 3000 was busy and it picked another port (e.g. 3001), Studio
   can't reach Sanity until that origin is allowed: `npx sanity cors add http://localhost:3001 --credentials -p <id>`.
   Tell them that edits made in Studio take up to a minute to appear on the site (pages are cached).
7. **Make it theirs:** ask for their business details in one message: name, what they do, location,
   services, the industries or customers they serve, partners (optional), brand colors, tone, contact
   details and domain. Then follow the "Rebrand playbook" below. Ask for their logo files, or keep the
   placeholders and tell them where to swap them in.
8. **Demo content:** once they have real content (or don't want the samples), run `npm run seed -- --remove`.
   Ask first: it deletes the 3 demo blog posts and 2 demo case studies.
9. **Put it online:** offer to walk them through the "Deploy" section of `README.md` (GitHub + Vercel),
   then add their real domain to Sanity CORS:
   `npm run setup -- --yes --project-id <id> --site-url https://theirdomain.com --no-seed --no-token`.
   Pushing code or deploying is outward-facing: ask before each one.

Finish with a short summary: what's set up, where to edit things (table in `README.md` → "Make it yours"),
and that blog posts and case studies are written in `/studio`.

## Where things live
- `src/config/site.ts`: **all** business details (name, tagline, description, contact, address,
  social links, CTA, analytics). Pages, JSON-LD, sitemap, robots, OG image and llms.txt read from it.
- `src/lib/seo.ts`: `buildMetadata()` plus JSON-LD helpers (organization, local business, FAQ, breadcrumbs).
- `src/data/solutions.ts`, `industries.ts`, `partners.ts`: static page content. Navbar, footer,
  homepage cards, contact-form options, sitemap, llms.txt and Sanity dropdowns are generated from these.
- `src/sanity/`: client, queries and schemas (blogPost, caseStudy, contactSubmission).
- `sanity.cli.ts`: required by the Sanity CLI (`npx sanity documents …`, `npm run seed -- --remove`). Don't delete it.
- `src/app/globals.css`: brand colors as `:root` variables. CSS classes use the `ui-` prefix.
- `src/components/`: page sections. About, Care Plans, Hero, Stats, Featured Project and Testimonial copy is inline.

## Setup (connecting Sanity)
- Interactive: `npm run setup`. It logs in, creates a project, sets CORS, creates a token and imports demo content.
- As an agent, run it non-interactively, and only after the user confirms the project name or ID:
  `npm run setup -- --yes --project-name "<Business Name>" --site-url <url>`
  (or `--project-id <id>` for an existing project, `--no-seed` to skip demo content).
  If the CLI is not logged in, ask the user to run `npx sanity login` first. It needs a browser.
- Never point setup at a Sanity project that belongs to another site.
- `npm run seed -- --remove` deletes the demo blog posts and case studies (IDs prefixed `demo-`).
- `npm run setup -- --help` lists all flags.

## Rebrand playbook
When asked to rebrand this site for a business:
1. Collect: business name, what they do, location, services, industries/audiences, partners (optional),
   brand colors, tone, contact details and domain. Ask for anything missing; never invent real-looking
   contact details, addresses or statistics. Use clearly-marked placeholders instead.
2. Update `src/config/site.ts`.
3. Update the `:root` colors in `src/app/globals.css` and the color constants in `src/app/opengraph-image.tsx`.
4. Rewrite `src/data/solutions.ts`, `industries.ts`, `partners.ts`. Keep the interfaces, 4+ FAQs
   per entry, and a unique metaTitle (≤60 chars) and metaDescription (≤160 chars) for each.
5. Rewrite inline copy in Hero, Services, StatsBar, TrustedBy, FeaturedCaseStudy, PartnersTestimonial,
   CTASection, AboutContent, PlansContent, contact page, and the index-page heroes.
6. Replace `public/logo.svg` and `src/app/icon.svg` (or ask the user for their files).
7. Remove sections the business doesn't need (route folder + navbar + footer + sitemap entries).
8. Run `npm run lint` and `npm run build`, then fix every error.
9. Search for leftover demo text (`Harbor`, `Pine`, `example.com`, `Sample Bistro`, `Example Co.`) and report what remains.
   Also update or remove `scripts/demo-content.mjs` so seeded content matches the new business.

## Rules
- App Router only. Use `next/font`, `next/image`, and CSS variables for colors.
- Every page uses `buildMetadata()` with a unique title and description, plus relevant JSON-LD.
- One H1 per page; never skip heading levels.
- Never commit `.env*` files (except `.env.example`) or hardcode IDs, tokens or keys.
- Keep Sanity schema field names stable: renaming a field orphans existing content.
- Don't block AI crawlers in `robots.ts`.
