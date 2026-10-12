// Writes dist/sitemap.xml after every production build, from the HTML that was
// actually built.
//
// Why not @astrojs/sitemap: its filter runs here, in config, where the
// navigation and live-town data (YAML read through Vite) cannot be imported.
// Filtering by URL here would be a second copy of indexing.ts that could drift
// from it. Reading the built pages instead means the sitemap lists exactly the
// pages Base.astro left indexable, at exactly the URL each one canonicalises
// to. A page with a robots noindex tag is never listed; a page without one
// always is.
//
// Dynamic in the way a static site can be: Pages CMS "Publish to live site"
// rebuilds production, so ticking a town live or unhiding a service page puts
// it in the sitemap on that publish, with no list to maintain.
//
// No <lastmod>, <priority> or <changefreq>. Google ignores the last two, and a
// lastmod that is just the build time would be wrong on every page.
//
// Staging writes no sitemap at all: every staging page is noindex, and
// robots.txt there disallows everything.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const robotsNoindex = /<meta\s+name=["']?robots["']?\s+content=["']?[^"'>]*noindex/i;
const canonicalHref = /<link\s+rel=["']?canonical["']?\s+href=["']?([^"'\s>]+)/i;

const htmlFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => join(entry.parentPath ?? entry.path, entry.name));
};

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** @param {{ isProduction: boolean }} options */
export default function sitemap({ isProduction }) {
  return {
    name: 'tlb-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        if (!isProduction) {
          logger.info('skipped: not a production build (SITE_ENV is not "production")');
          return;
        }

        const outDir = fileURLToPath(dir);
        const urls = new Set();
        for (const file of await htmlFiles(outDir)) {
          const html = await readFile(file, 'utf8');
          if (robotsNoindex.test(html)) continue;
          const canonical = html.match(canonicalHref)?.[1];
          if (!canonical) {
            throw new Error(`[sitemap] ${file} is indexable but has no canonical link, so it has no URL to list.`);
          }
          urls.add(canonical);
        }

        // An empty sitemap on production means every page went noindex, which
        // is a broken build, not a quiet one.
        if (urls.size === 0) {
          throw new Error('[sitemap] production build produced no indexable pages. Check indexing.ts and site-env.ts.');
        }

        const body = [...urls]
          .sort()
          .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
          .join('\n');
        await writeFile(
          join(outDir, 'sitemap.xml'),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
        );
        logger.info(`wrote sitemap.xml with ${urls.size} URLs`);
      },
    },
  };
}
