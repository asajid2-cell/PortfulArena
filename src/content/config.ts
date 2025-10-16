import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string().min(3, 'Title is required'),
      summary: z.string().min(10),
      problem: z.string().optional(),
      insight: z.string().optional(),
      approach: z.string().optional(),
      outcome: z.string().optional(),
      role: z.string().optional(),
      category: z.string().default('Case Study'),
      stack: z.array(z.string()).default([]),
      metrics: z
        .array(
          z.object({
            label: z.string(),
            value: z.string()
          })
        )
        .optional(),
      links: z
        .array(
          z.object({
            label: z.string(),
            href: z.string().url()
          })
        )
        .optional(),
      heroImage: image().optional(),
      heroVideo: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(99),
      publishedAt: z.string().optional()
    })
});

export const collections = {
  projects
};
