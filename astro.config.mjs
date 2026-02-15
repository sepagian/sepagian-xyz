import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import playformFormat from "@playform/format";
import Biome from "@playform/format";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://astro-nano-demo.vercel.app",
  integrations: [mdx(), sitemap(), tailwind(), playformFormat(), Biome()],
  adapter: cloudflare(),
});
