import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

import playformFormat from "@playform/format";
import Biome from "@playform/format";

export default defineConfig({
	site: "https://astro-nano-demo.vercel.app",
	integrations: [mdx(), sitemap(), tailwind(), playformFormat(), Biome()],
	adapter: cloudflare(),
});
