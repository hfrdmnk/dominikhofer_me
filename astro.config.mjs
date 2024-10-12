import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import embeds from "astro-embed/integration";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  site: "https://dominikhofer.me",
  trailingSlash: "never",
  // TODO: Configure only icons in use: https://www.astroicon.dev/reference/configuration#include
  integrations: [
    embeds({
      services: {
        LinkPreview: false,
      },
    }),
    mdx({
      allowEmpty: true,
    }),
    tailwind(),
    alpinejs(),
    sitemap(),
    icon(),
  ],
  output: "hybrid",
  adapter: vercel(),
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, { target: "_blank", rel: ["noopener"] }],
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath],
  },
});
