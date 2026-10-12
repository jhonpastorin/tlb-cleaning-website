import type { APIRoute } from 'astro';
import { isProduction } from '../data/site-env';

// A route rather than a file in public/, because public/ is copied verbatim and
// cannot vary by environment. Astro prerenders endpoints under
// output: 'static', so this is written to dist/robots.txt at build time and
// served as a plain static file.
//
// The meta tag in Base.astro is what actually keeps staging pages out of the
// index; this file is the coarser signal that stops well-behaved crawlers
// fetching them in the first place. Both are driven by the same flag, so they
// can never disagree.
//
// Production also points crawlers at the sitemap, which integrations/sitemap.mjs
// writes on production builds only. Staging has none to point at.
const sitemapUrl = new URL('/sitemap.xml', import.meta.env.SITE).href;
const body = isProduction
  ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
  : `User-agent: *\nDisallow: /\n`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
