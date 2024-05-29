import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		excerpt: z.string().optional(),
		type: z.enum(['post', 'essay', 'note']).default('post'),
		tags: z.array(z.string()).default([]),
		// Transform string to Date object
		date: z.coerce.date(),
		lastUpdated: z.coerce.date().optional(),
		visual: z.string().optional(),
	}),
});

const milestones = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		shortDescription: z.string(),
		type: z.enum(['cv', 'personal', 'project']).default('project'),
		tags: z.array(z.string()).default([]),
		company: z.string().optional(),
		link: z.string().url().optional(),
		// Transform string to Date object
		date: z.coerce.date(),
		visual: z.string().optional(),
	}),
});

export const collections = { posts, milestones };
