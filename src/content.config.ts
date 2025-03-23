import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define the schema once
const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.object({
    daily: z.number(),
    weekly: z.number(),
  }),
  image: z.string().url(),
  manufacturer: z.string(),
  model: z.string(),
  batteryType: z.string().optional(),
  tags: z.array(z.string()).optional(), // Add tags to the schema.
});

// Define each collection with its specific loader
const woodworkingCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/woodworking' }),
  schema: productSchema,
});

const gardeningCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/gardening' }),
  schema: productSchema,
});

const metalworkingCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/metalworking' }),
  schema: productSchema,
});

// Export all collections in a single object
export const collections = {
  woodworking: woodworkingCollection,
  gardening: gardeningCollection,
  metalworking: metalworkingCollection,
};