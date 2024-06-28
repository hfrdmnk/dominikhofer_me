import { defineCollection, z } from "astro:content";
import { dateTime } from "darkmatter";

const posts = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string().optional(),
      type: z.enum(["post", "essay", "note"]).default("post"),
      tags: z.array(z.string()).default([]),
      // Transform string to Date object
      date: dateTime(),
      lastUpdated: dateTime().optional(),
      visual: image().optional(),
      isFeatured: z.boolean().default(false),
    }),
});

const til = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      source: z.string().url(),
    }),
});

const photos = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      visual: image(),
      title: z.string(),
      // Transform string to Date object
      date: z.coerce.date().optional(),
      location: z.string().optional(),
    }),
});

const races = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Transform string to Date object
      date: z.coerce.date(),
      location: z.string(),
      distance: z.number(),
      time: z.coerce.string(),
      pace: z.coerce.string(),
    }),
});

const milestones = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortDescription: z.string(),
      type: z.enum(["cv", "personal", "project"]).default("project"),
      tags: z.array(z.string()).default([]),
      company: z.string().optional(),
      link: z.string().url().optional(),
      isFeatured: z.boolean().default(false),
      // Transform string to Date object
      date: z.coerce.date(),
      dateEnd: z.coerce.date().optional(),
      visual: image().optional(),
    }),
});

const redirects = defineCollection({
  type: "content",
  schema: z.object({
    to: z.string(),
  }),
});

export const collections = { posts, photos, races, milestones, redirects, til };
