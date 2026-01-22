// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection } from "astro:content";
// Import Zod
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    pubDate: z.string(),
    eventDate: z.date(),
    location: z.string(),
    tags: z.array(z.string()).optional(),
    tagline: z.string(),
    thumbnail: z.string()
  }),
});

export const collections = { blog };
