import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
import solidJs from '@astrojs/solid-js';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://bar-a-outils.com',
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 1,
      lastmod: new Date(),
      serialize: (item) => {
        return {
          ...item,
          lastmod: new Date().toISOString(),
        };
      },
    }),
    solidJs()
  ]
});