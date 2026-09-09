import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://uminosign.nagoyc.stki.org',
  base: '/',
  build: {
    format: 'directory'
  }
});
