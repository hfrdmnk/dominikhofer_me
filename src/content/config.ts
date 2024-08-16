import { defineCollection, z } from "astro:content";
import { text } from "darkmatter";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: text(),
      type: z.enum(["post", "essay", "note"]).default("note"),
      tags: z.array(z.string()).default([]),
      date: z.coerce.string(),
      lastUpdated: z.coerce.string().optional(),
      visual: image().optional(),
      isFeatured: z.boolean().default(false),
    }),
});

const til = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      date: z.coerce.string(),
      source: z.string().url(),
    }),
});

const photos = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      visual: image(),
      title: z.string(),
      date: z.coerce.string(),
      location: z.string(),
    }),
});

const races = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      date: z.coerce.string(),
      location: z.coerce.string(),
      distance: z.coerce.string(),
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
      date: z.coerce.string(),
      dateEnd: z.coerce.string().optional(),
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
