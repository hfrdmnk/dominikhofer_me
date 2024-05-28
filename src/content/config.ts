import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		type: z.enum(['post', 'essay', 'note']).default('post'),
		tags: z.array(z.string()).default([]),
		// Transform string to Date object
		date: z.coerce.date(),
		lastUpdated: z.coerce.date().optional(),
		visual: z.string().optional(),
	}),
});

export const collections = { posts };
