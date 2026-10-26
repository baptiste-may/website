import { fileURLToPath } from "node:url";

import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv, transformWithOxc } from "vite";

const mode = process.env.NODE_ENV ?? "development";
const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };

const projectId = env.SANITY_PROJECT_ID || "xxxxxxxx";
const siteDataset = env.SANITY_DATASET?.trim() || "dev";
const studioDataset = env.SANITY_STUDIO_DATASET?.trim() || "dev";
const apiVersion = env.SANITY_API_VERSION || "2026-09-23";

const sanityDefine = {
  "process.env.SANITY_STUDIO_PROJECT_ID": JSON.stringify(projectId),
  "process.env.SANITY_PROJECT_ID": JSON.stringify(projectId),
  "process.env.SANITY_STUDIO_DATASET": JSON.stringify(studioDataset),
  "process.env.SANITY_DATASET": JSON.stringify(siteDataset),
  "process.env.SANITY_API_VERSION": JSON.stringify(apiVersion),
};

// Vite 8 only applies `define` to bundled clients. The Studio is rendered by the
// unbundled dev client, so replace the same reads explicitly while serving.
const sanityStudioDevDefine = {
  name: "sanity-studio-dev-define",
  apply: "serve",
  async transform(code, id) {
    if (!id.split("?")[0].endsWith("/sanity.config.ts") || !code.includes("process.env.")) {
      return;
    }
    const result = await transformWithOxc(code, id, {
      lang: "ts",
      define: sanityDefine,
      sourcemap: true,
      tsconfig: false,
    });
    return { code: result.code, map: result.map };
  },
};

const sanityEnvGuard = {
  name: "sanity-studio-env-guard",
  hooks: {
    "astro:config:setup": ({ command, logger }) => {
      if (command !== "build") {
        if (command === "dev" && siteDataset !== studioDataset) {
          logger.warn(
            `SANITY_DATASET (${siteDataset}) and SANITY_STUDIO_DATASET (${studioDataset}) differ; the site and /studio will use different datasets.`,
          );
        }
        return;
      }
      if (!env.SANITY_STUDIO_DATASET?.trim()) {
        throw new Error(
          "SANITY_STUDIO_DATASET is required for `astro build` because /studio embeds Sanity Studio. Set it in the build environment and make it match SANITY_DATASET.",
        );
      }
      if (siteDataset !== studioDataset) {
        throw new Error(
          `SANITY_DATASET (${siteDataset}) and SANITY_STUDIO_DATASET (${studioDataset}) must match so the site and /studio use the same content.`,
        );
      }
    },
  },
};

export default defineConfig({
  site: "https://may-baptiste.fr",
  trailingSlash: "never",
  adapter: cloudflare({ imageService: "compile" }),
  session: false,
  markdown: { processor: satteri({ features: { smartPunctuation: false } }) },
  image: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] },
  vite: {
    plugins: [tailwindcss(), sanityStudioDevDefine],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
    define: sanityDefine,
  },
  integrations: [
    sanityEnvGuard,
    mdx(),
    sanity({
      projectId,
      dataset: siteDataset,
      apiVersion,
      useCdn: false,
      studioBasePath: "/studio",
      studioRouterHistory: "hash",
    }),
    react(),
    sitemap({
      filter: (page) =>
        !page.includes("/studio") &&
        !page.includes("/contact/thank-you") &&
        !page.includes("/contact/error"),
    }),
  ],
});
