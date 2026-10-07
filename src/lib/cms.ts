// Runtime side of the Pages CMS setup. See PAGES-CMS-PLAN.md.
//
// Page content lives in src/content/pages/<id>.yaml and is edited through
// Pages CMS (.pages.yml at the repo root). Each page declares the shape of its
// own content with the section schemas in cms-schemas.ts and reads it through
// getPage(). Validation runs at build time, so an edit that does not fit the
// page fails the build instead of shipping a broken page: Render keeps serving
// the last good build.
import type { ImageMetadata } from 'astro';
import { getEntry } from 'astro:content';
import type { z } from 'astro/zod';
import { theLine, theLineHeading } from '../data/brand-lines';

// Every image under src/assets, keyed by the exact string Pages CMS writes
// into a content file (media `output: /src/assets`). Uppercase extensions are
// listed because phones upload IMG_1234.JPG.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true },
);

export function cmsImage(path: string): ImageMetadata {
  const mod = images[path];
  if (!mod) {
    throw new Error(
      `[CMS] Image not found: ${path}. It may have been moved or deleted. Re-select it in Pages CMS.`,
    );
  }
  return mod.default;
}

// Tokens editors can type into any text field. Each maps to a single source
// in code, so a line used on dozens of pages is still changed in one place.
// Listed for editors in the descriptions in .pages.yml: keep the two in step.
const TOKENS: Record<string, string> = {
  'line.instant': theLine.instant,
  'line.fast': theLine.fast,
  'line.instant.heading': theLineHeading.instant,
  'line.fast.heading': theLineHeading.fast,
};

export function resolveTokens(text: string): string {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    const value = TOKENS[key];
    if (value === undefined) {
      throw new Error(
        `[CMS] Unknown token {{${key}}}. Available: ${Object.keys(TOKENS)
          .map((k) => `{{${k}}}`)
          .join(', ')}`,
      );
    }
    return value;
  });
}

/** Load and validate one page's content file. `id` is its path under
 *  src/content/pages/ without the extension, e.g. 'house-cleaning/oven-cleaning'. */
export async function getPage<S extends z.ZodTypeAny>(id: string, schema: S): Promise<z.output<S>> {
  const entry = await getEntry('pages', id);
  if (!entry) {
    throw new Error(`[CMS] No content file for page "${id}" (expected src/content/pages/${id}.yaml)`);
  }
  const result = schema.safeParse(entry.data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`[CMS] src/content/pages/${id}.yaml does not fit its page:\n${issues}`);
  }
  return result.data;
}
