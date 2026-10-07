// Content collections edited through Pages CMS. See PAGES-CMS-PLAN.md.
//
// Each page validates its own content through getPage() (src/lib/cms.ts) with
// the section schemas in src/lib/cms-schemas.ts, because no two pages have the
// same sections. The collection schema below only checks what every page has.
// Nothing in src/content should carry comments that matter: Pages CMS rewrites
// a file when it saves it, and YAML comments do not survive that.
import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  type: 'data',
  schema: z
    .object({
      seo: z.object({ title: z.string(), description: z.string() }),
    })
    .passthrough(),
});

export const collections = { pages };
