// Loads the site-wide content files (src/content/site, towns, regions) that
// the modules in src/data/ are built from. See PAGES-CMS-PLAN.md, Phase 2.
//
// Synchronous on purpose. The src/data/ modules are imported at the top of
// nearly every page and export plain values (`quoteCta`, `trustBarCards`), so
// they cannot await getEntry(). Instead every YAML file is bundled as text and
// parsed when its module first loads. Validation is the same as for pages: a
// file that does not fit its schema fails the build with the file and field
// named, and Render keeps serving the last good build.
import { parse } from 'yaml';
import type { z } from 'astro/zod';

const files = import.meta.glob<string>('/src/content/{site,towns,regions}/*.yaml', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function validate<S extends z.ZodTypeAny>(path: string, source: string, schema: S): z.output<S> {
  const result = schema.safeParse(parse(source));
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');
    throw new Error(`[CMS] ${path.slice(1)} is not valid:\n${issues}`);
  }
  return result.data;
}

/** One file, e.g. loadData('site/contact', schema) for src/content/site/contact.yaml. */
export function loadData<S extends z.ZodTypeAny>(name: string, schema: S): z.output<S> {
  const path = `/src/content/${name}.yaml`;
  const source = files[path];
  if (source === undefined) throw new Error(`[CMS] Missing content file ${path.slice(1)}`);
  return validate(path, source, schema);
}

/** Every file in a folder, e.g. loadFolder('towns', schema), in filename order. */
export function loadFolder<S extends z.ZodTypeAny>(folder: string, schema: S): z.output<S>[] {
  const prefix = `/src/content/${folder}/`;
  return Object.keys(files)
    .filter((path) => path.startsWith(prefix))
    .sort()
    .map((path) => validate(path, files[path], schema));
}
