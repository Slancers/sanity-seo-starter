/**
 * Sanity CLI config. The CLI needs this file to run commands such as
 * `npx sanity documents query` from inside the project. Values come from
 * .env.local, which `npm run setup` writes.
 */
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || undefined,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
});
