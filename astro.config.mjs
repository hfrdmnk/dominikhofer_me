import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import icon from "astro-icon";
import webfinger from "astro-webfinger";
import { defineConfig } from "astro/config";

import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://dominikhofer.me",
  trailingSlash: "never",
  // TODO: Configure only icons in use: https://www.astroicon.dev/reference/configuration#include
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    icon(),
    alpinejs(),
    webfinger({ toots: { instance: "mastodon.design", username: "dominik" } }),
  ],
  output: "hybrid",
  adapter: vercel(),
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener"] }],
    ],
  },
});
