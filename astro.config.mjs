import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";

import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://dominikhofer.me",
  sitemap: true,
  trailingSlash: "never",
  // TODO: Configure only icons in use: https://www.astroicon.dev/reference/configuration#include
  integrations: [mdx(), sitemap(), tailwind(), icon(), alpinejs()],
  output: "hybrid",
  adapter: vercel(),
});
