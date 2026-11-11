"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "@/sanity/schemas";
import { projectId, dataset } from "@/sanity/env";
import { site } from "@/config/site";

export default defineConfig({
  name: "default",
  title: site.name,
  projectId: projectId || "not-configured",
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
