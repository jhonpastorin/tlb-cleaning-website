import { defineConfig } from 'astro/config';

// Static output, no adapter, no UI framework integrations — plain Astro + CSS + vanilla JS.
export default defineConfig({
  site: 'https://tlb-cleaning.com.au',
  output: 'static',
  compressHTML: true,
});
