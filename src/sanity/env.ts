/**
 * Sanity connection settings, read from environment variables.
 * Run `npm run setup` to create a Sanity project and write these to .env.local.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

/** True when a Sanity project is configured. Pages fall back to empty content when false. */
export const isSanityConfigured = Boolean(projectId);
