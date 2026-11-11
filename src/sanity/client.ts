import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion, isSanityConfigured } from "./env";

const sanityClient = createClient({
  // A placeholder keeps the client constructible before Sanity is connected.
  projectId: projectId || "not-configured",
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Before Sanity is connected, queries return empty results instead of failing,
 * so the site still builds and renders (blog and case-study lists are simply empty).
 * Single-document queries (ending in `[0]`) return null; list queries return [].
 */
export const client: typeof sanityClient = isSanityConfigured
  ? sanityClient
  : (Object.assign(Object.create(sanityClient), {
      fetch: async (query: string) => (/\]\s*\[0\]/.test(query) ? null : []),
    }) as typeof sanityClient);

export { sanityClient, isSanityConfigured };
