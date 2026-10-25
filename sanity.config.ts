import { colorInput } from "@sanity/color-input";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID || process.env.SANITY_PROJECT_ID || "project_id";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.SANITY_DATASET || "dev";
const apiVersion = process.env.SANITY_API_VERSION || "2026-09-23";

export default defineConfig({
  name: "default",
  title: "My website",

  projectId,
  dataset,
  apiVersion,

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({ type: "jobs", title: "Jobs", S, context }),
            orderableDocumentListDeskItem({
              type: "contact-link",
              title: "Contact Links",
              S,
              context,
            }),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["jobs", "contact-link"].includes(item.getId() || ""),
            ),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: { types: schemaTypes },
});
