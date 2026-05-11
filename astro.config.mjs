import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://bixel-dev.github.io',
  base: '/agencia-clasico',
  integrations: [tailwind()],
  vite: {
    optimizeDeps: {
      include: ['gsap'],
    },
  },
});
