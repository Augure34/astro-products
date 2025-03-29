import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.object({
    daily: z.number(),
    weekly: z.number(),
  }),
  image: z.string().optional(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  batteryType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  manual: z.string().url().optional()
});

const diversCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/Divers' }),
  schema: productSchema,
});

const jardinageCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/Jardinage' }),
  schema: productSchema,
});

const nettoyageCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/Nettoyage' }),
  schema: productSchema,
});

const travailDuBoisCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/Menuiserie' }),
  schema: productSchema,
});

const travailDuMetalCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/Metallurgie' }),
  schema: productSchema,
});

const travauxGenerauxCollection = defineCollection({
  loader: glob({ pattern: '*.json', base: './products/Bricolage' }),
  schema: productSchema,
});

export const collections = {
  divers: diversCollection,
  jardinage: jardinageCollection,
  nettoyage: nettoyageCollection,
  menuiserie: travailDuBoisCollection,
  metallurgie: travailDuMetalCollection,
  bricolage: travauxGenerauxCollection
};