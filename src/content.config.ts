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
    pubDate: z.date(),
    location: z.string(),
    tags: z.array(z.string()),
    tagline: z.string(),
    thumbnail: z.string().url(),
    description: z.string(),

    // 👇 New evidence formally registered
    stories: z.array(
      z.object({
        imageUrl: z.string().url(),
        location: z.string(),
        description: z.string(),
      })
    ),
  }),
});

export const collections = { blog };
