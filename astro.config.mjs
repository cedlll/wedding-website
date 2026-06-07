import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // TODO: replace with your production domain so canonical URLs and social
  // share previews (og:image, twitter:image) resolve to absolute URLs
  site: 'https://example.com',
  integrations: [
    react(),
    tailwind(),
  ],
  output: 'static',
});
