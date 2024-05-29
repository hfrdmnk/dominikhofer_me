import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			excerpt: z.string().optional(),
			type: z.enum(['post', 'essay', 'note']).default('post'),
			tags: z.array(z.string()).default([]),
			// Transform string to Date object
			date: z.coerce.date(),
			lastUpdated: z.coerce.date().optional(),
			visual: image().optional(),
		}),
});

const milestones = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			shortDescription: z.string(),
			type: z.enum(['cv', 'personal', 'project']).default('project'),
			tags: z.array(z.string()).default([]),
			company: z.string().optional(),
			link: z.string().url().optional(),
			featured: z.boolean().default(false),
			// Transform string to Date object
			date: z.coerce.date(),
			dateEnd: z.coerce.date().optional(),
			visual: image().optional(),
		}),
});

export const collections = { posts, milestones };
