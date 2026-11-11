# Sanity SEO Starter

An SEO-complete **Next.js + Sanity** website starter for service businesses, built so it's easy to rebrand by hand or with an AI coding agent.

It ships with a fully built demo site for **Harbor & Pine**, a *fictional* interior design-and-build studio. Swap in your own business details and content, and you have a production-ready marketing site.

## What's included

**Pages**
- Home page (hero, services, featured project, stats, industries, partners, testimonial, CTA)
- Services index + detail pages
- Industries index + detail pages
- Partners index + detail pages
- Care Plans (a subscription/retainer page)
- About, Contact (form saves submissions to Sanity)
- Blog + Case Studies, edited in Sanity Studio at `/studio`

**SEO, AEO and GEO built in**
- Unique title, description, canonical URL, Open Graph and Twitter tags on every page
- JSON-LD structured data: Organization, LocalBusiness, Service, FAQPage, Article, Review, BreadcrumbList
- Auto-generated `sitemap.xml` (includes Sanity content, refreshed hourly)
- `robots.txt` that allows AI crawlers and blocks `/studio` and `/api`
- Auto-generated `/llms.txt` summary for AI assistants
- Generated Open Graph image
- FAQ sections on every service, industry and partner page

**Stack:** Next.js 16 (App Router) · React 19 · Sanity v5 · Tailwind CSS v4 · TypeScript

## Quick start

### With Claude Code (easiest)

```bash
git clone <your-fork-url> my-site
cd my-site
claude
```

Then type **`/start`**. Claude checks what's already done, helps you connect a free Sanity account,
rebrands the site with your business details, and walks you through putting it online. It asks before
deleting anything or deploying. The one step you do yourself is `npx sanity login`, which opens your browser.

Using Cursor, Codex or another agent? Ask it to *"follow the 'First conversation with a new user' steps in CLAUDE.md"*.

### By hand

```bash
git clone <your-fork-url> my-site
cd my-site
npm install
npm run setup
npm run dev
```

Open http://localhost:3000, and edit blog posts and case studies at http://localhost:3000/studio.

### What `npm run setup` does

The wizard takes about 2 minutes and asks before doing anything:

1. **Site URL:** saved for canonical URLs, the sitemap and social previews.
2. **Sanity login:** opens your browser to log in or create a free account.
3. **Project:** creates a new Sanity project with a public `production` dataset (or uses one you choose).
4. **CORS:** allows `localhost:3000` and your site URL, so `/studio` works.
5. **Contact form token:** creates an Editor token, stored only in `.env.local`.
6. **Demo content:** optionally imports 3 blog posts and 2 case studies, plus an optional GA4 ID.

Everything is written to `.env.local`, which is git-ignored. Re-run `npm run setup` any time; it keeps your existing values.

```bash
npm run seed               # import the demo content
npm run seed -- --remove   # delete the demo content
npm run setup -- --help    # all options
```

**Non-interactive (CI or AI agents):**

```bash
npm run setup -- --yes --project-name "My Site" --site-url https://example.com
npm run setup -- --yes --project-id abc123 --no-seed
```

The site also runs **before** setup: the blog and case-study lists are simply empty.

### Manual setup (alternative)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) with a **public** dataset named `production`.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Under **API → CORS origins**, add `http://localhost:3000` (and later your production URL) with *Allow credentials* ticked.
4. Under **API → Tokens**, create an **Editor** token and set it as `SANITY_WRITE_TOKEN` (used only by the contact form).

All environment variables are documented in [`.env.example`](.env.example).

## Make it yours

| What | Where |
|---|---|
| Business name, contact details, address, social links, CTA | [`src/config/site.ts`](src/config/site.ts) |
| Brand colors | `:root` variables at the top of [`src/app/globals.css`](src/app/globals.css) |
| Logo | Replace [`public/logo.svg`](public/logo.svg) and [`src/app/icon.svg`](src/app/icon.svg) |
| Services | [`src/data/solutions.ts`](src/data/solutions.ts) |
| Industries | [`src/data/industries.ts`](src/data/industries.ts) |
| Partners | [`src/data/partners.ts`](src/data/partners.ts) |
| Home page sections | `src/components/` (Hero, StatsBar, FeaturedCaseStudy, PartnersTestimonial…) |
| About and Care Plans copy | `src/components/AboutContent.tsx`, `src/components/PlansContent.tsx` |
| Blog posts and case studies | Sanity Studio at `/studio` |

The navbar, footer, homepage cards, contact form options, sitemap, `llms.txt` and Sanity dropdowns all read from the data files, so adding a service in one place updates it everywhere.

Don't need a section? Delete its route folder under `src/app/` and remove it from the navbar, footer and `src/app/sitemap.ts`.

### Rebrand with an AI agent

This repo includes [`CLAUDE.md`](CLAUDE.md) and [`AGENTS.md`](AGENTS.md) with a step-by-step rebrand playbook. `/start` in Claude Code covers rebranding as part of the full setup. To rebrand only, open the project in Claude Code, Cursor or Codex and ask:

> Rebrand this site for my business: [name, what you do, where, services, colors].

## Deploy

1. Push your repo to GitHub.
2. Import it on [Vercel](https://vercel.com/new).
3. Add the variables from your `.env.local`, with `NEXT_PUBLIC_SITE_URL` set to your real domain.
4. Allow your production URL in Sanity: `npm run setup -- --project-id <id> --site-url https://yourdomain.com --no-seed --no-token`, or add it under **API → CORS origins**.

## Demo content disclaimer

Harbor & Pine, its partners (Oakline Timber, Lumen & Co., Fieldhouse Furniture, Stonework Surfaces), Sample Bistro, Example Co., the testimonials, the demo blog posts and all statistics are **fictional placeholder content**. Replace them before going live. Demo documents in Sanity all have IDs starting with `demo-`.

## License

[MIT](LICENSE) © 2026 Joe Prasen. Use it for client sites, your own business or anything else; just keep the license notice.
