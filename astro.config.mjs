import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

import solidJs from '@astrojs/solid-js';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
   site: 'https://bar-a-outils.com',
  integrations: [sitemap(), solidJs()]
});