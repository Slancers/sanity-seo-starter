<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project guide

This is a Next.js + Sanity marketing-site starter. The demo brand "Harbor & Pine" is fictional.

- Business details: `src/config/site.ts`
- Page content: `src/data/*.ts` (services, industries, partners); blog and case studies live in Sanity
- Brand colors: `:root` in `src/app/globals.css`
- SEO helpers: `src/lib/seo.ts`; every page uses `buildMetadata()`

If the user wants help getting started or setting the site up, follow "First conversation with a new user" in `CLAUDE.md`.
To rebrand for a new business, follow the "Rebrand playbook" in `CLAUDE.md`.
Never commit `.env*` files (except `.env.example`). Run `npm run lint` and `npm run build` before finishing.
