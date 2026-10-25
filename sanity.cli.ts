import { defineCliConfig } from "sanity/cli";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "project_id";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "dev";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { autoUpdates: true },
  schemaExtraction: { path: "./schema.json", enforceRequiredFields: true },
  typegen: {
    path: ["./src/**/*.{ts,astro}"],
    generates: "./src/types/sanity-typegen.d.ts",
    overloadClientMethods: true,
  },
});
