import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const toolsCollection = defineCollection({
    loader: glob({ pattern: '*.json', base: "./products" }),
    schema: z.object({
        name: z.string(),
        description: z.string(),
        price: z.object({
          daily: z.number(),
          weekly: z.number(),
        }),
        image: z.string().url(),
        tags: z.array(z.string()),
        manufacturer: z.string(),
        model: z.string(),
        batteryType: z.string().optional(),
      }),
  });

export const collections = {
  tools: toolsCollection,
};
