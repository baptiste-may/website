import { colorInput } from "@sanity/color-input";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";

// The Astro build replaces these process.env reads with the `vite.define` values
// from astro.config.mjs so the Studio bundle can run in the browser. Keep both in sync.
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
      structure: (S, context) => {
        // New document types must be registered in one of these groups. The five
        // current types are projects, jobs, contact-link, project-tags, and jobs-tags.
        const contentItems = [
          S.documentTypeListItem("projects").title("🚀 Projects"),
          orderableDocumentListDeskItem({ type: "jobs", title: "💼 Jobs", S, context }),
          orderableDocumentListDeskItem({
            type: "contact-link",
            title: "🔗 Contact Links",
            S,
            context,
          }),
        ];

        const tagItems = [
          S.documentTypeListItem("project-tags").title("🎨 Project Tags"),
          S.documentTypeListItem("jobs-tags").title("🧩 Jobs Tags"),
        ];

        return S.list()
          .title("Content")
          .items([
            S.listItem()
              .id("content")
              .title("📝 Content")
              .child(S.list().id("content-list").title("📝 Content").items(contentItems)),
            S.listItem()
              .id("tags")
              .title("🏷️ Tags")
              .child(S.list().id("tags-list").title("🏷️ Tags").items(tagItems)),
          ]);
      },
    }),
    visionTool(),
    colorInput(),
  ],

  schema: { types: schemaTypes },
});
