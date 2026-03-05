import path from "node:path";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import playformFormat from "@playform/format";
import Biome from "@playform/format";
import playformInline from "@playform/inline";
import { defineConfig } from "astro/config";
import remarkDirective from "remark-directive";
import { themeConfig } from "./src/config";
import rehypeCleanup from "./src/plugins/rehype-cleanup.mjs";
import rehypeCopyCode from "./src/plugins/rehype-copy-code.mjs";
import rehypeImageProcessor from "./src/plugins/rehype-image-processor.mjs";
import remarkEmbeddedMedia from "./src/plugins/remark-embedded-media.mjs";
import remarkReadingTime from "./src/plugins/remark-reading-time.mjs";
import remarkTOC from "./src/plugins/remark-toc.mjs";
import { imageConfig } from "./src/utils/image-config";

export default defineConfig({
  adapter: cloudflare(),
  site: themeConfig.site.website,
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: imageConfig,
    },
  },
  markdown: {
    shikiConfig: {
      theme: "css-variables",
      wrap: true,
    },
    remarkPlugins: [remarkDirective, remarkEmbeddedMedia, remarkReadingTime, remarkTOC],
    rehypePlugins: [rehypeCleanup, rehypeImageProcessor, rehypeCopyCode],
  },
  integrations: [playformInline({}), mdx(), sitemap(), playformFormat(), Biome()],
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
  },
  devToolbar: {
    enabled: true,
  },
});
