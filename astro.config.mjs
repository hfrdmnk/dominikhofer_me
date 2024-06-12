import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import vercel from "@astrojs/vercel/serverless";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  // TODO: Configure only icons in use: https://www.astroicon.dev/reference/configuration#include
  integrations: [mdx(), sitemap(), tailwind(), icon(), compress()],
  output: "hybrid",
  adapter: vercel(),
});
