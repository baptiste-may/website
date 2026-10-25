import { fileURLToPath } from "node:url";

import cloudflare from "@astrojs/cloudflare";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV ?? "development";
const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };

export default defineConfig({
  site: "https://may-baptiste.fr",
  trailingSlash: "never",
  adapter: cloudflare({ imageService: "compile" }),
  session: false,
  markdown: { processor: satteri({ features: { smartPunctuation: false } }) },
  image: { remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }] },
  vite: {
    plugins: [tailwindcss()],
    resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  },
  integrations: [
    mdx(),
    sanity({
      projectId: env.SANITY_PROJECT_ID || "be41y2ob",
      dataset: env.SANITY_DATASET || "dev",
      apiVersion: env.SANITY_API_VERSION || "2026-09-23",
      useCdn: false,
    }),
    sitemap({
      filter: (page) => !page.includes("/contact/thank-you") && !page.includes("/contact/error"),
    }),
  ],
});
