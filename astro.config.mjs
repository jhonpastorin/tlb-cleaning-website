import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from './integrations/sitemap.mjs';

// SITE_ENV read the way Vite reads it for the pages (a real environment
// variable beats .env), so the sitemap and the robots tags in site-env.ts can
// never disagree about which build this is.
const { SITE_ENV } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Static output, no adapter, no UI framework integrations — plain Astro + CSS + vanilla JS.
// The one integration is local: integrations/sitemap.mjs.
export default defineConfig({
  site: 'https://tlbcleaning.com.au',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap({ isProduction: SITE_ENV === 'production' })],
});
