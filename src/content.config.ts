import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    base: "./src/content/posts",
    pattern: "**/*.{md,mdx}",
  }),
  schema: () =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      image: z.string().optional(),
    }),
});

const about = defineCollection({
  loader: glob({
    base: "./src/content/about",
    pattern: "**/*.mdx",
  }),
  schema: z.object({}),
});

export const collections = { posts, about };
