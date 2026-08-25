import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

import { CATEGORY_SLUGS } from './data/categories';

const blog = defineCollection({
	loader: glob({
		base: './src/content/blog',
		pattern: '**/*.{md,mdx}',
	}),

	schema: ({ image }) =>
		z.object({
			title: z.string(),

			description: z.string(),

			pubDate: z.coerce.date(),

			updatedDate: z.coerce.date().optional(),

			heroImage: image().optional(),

			category: z.enum(CATEGORY_SLUGS).default('devlog'),

			tags: z.array(z.string()).default([]),
		}),
});

export const collections = { blog };