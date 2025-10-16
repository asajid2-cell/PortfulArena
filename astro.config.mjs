import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false
    }),
    mdx(),
    react()
  ]
});
