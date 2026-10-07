// Output diff for the Pages CMS migration. See PAGES-CMS-PLAN.md, Phase 1.
//
// Moving a page's copy into src/content/ must not change what the page
// renders. This compares every HTML file in dist/ against a baseline build,
// after stripping the scope hashes Astro derives from a component's source
// (they change whenever the .astro file changes, even when the output does not)
// the per-render ids several sections make with Math.random() (they change
// on every build), and the names of bundled scripts (see scriptFingerprint).
//
// Make the baseline once, from the branch you are migrating away from:
//   git stash -u   (or check out staging)
//   npx astro build && rm -rf dist-before && cp -r dist dist-before
//   git stash pop
// Then after each change:
//   npx astro build && node scripts/compare-build.mjs
//
// Exit code 1 if any page differs, is missing, or is new.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { createHash } from 'node:crypto';

// COMPARE_BASELINE lets a git worktree compare against the main checkout's
// baseline instead of building its own.
const BEFORE = process.env.COMPARE_BASELINE || 'dist-before';
const AFTER = 'dist';

function htmlFiles(root, dir = root) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) out.push(...htmlFiles(root, path));
    else if (name.endsWith('.html')) out.push(relative(root, path).replaceAll('\\', '/'));
  }
  return out;
}

// Prefixes of the ids sections build with Math.random(), longest first so
// `faq-heading-` is not read as `faq-` plus a random part.
const RANDOM_ID_PREFIXES = [
  'comparison-table-heading',
  'service-blocks-heading',
  'content-grid-heading',
  'text-block-heading',
  'tag-cloud-heading',
  'callout-heading',
  'faq-heading',
  'site-header',
  'faq',
  'ba',
];
const randomIds = new RegExp(`\\b(${RANDOM_ID_PREFIXES.join('|')})-[a-z0-9]{1,7}\\b`, 'g');

// Bundled scripts (/_astro/*.js) are named by a hash of the bundling, and
// Rollup re-cuts and renames them whenever the module graph changes, even
// when no script changed. So a script is compared by its CONTENT: each file
// is fingerprinted with the fingerprints of the files it imports substituted
// for their names, and a run of bare `import"x";` statements is sorted,
// because those only load independent component scripts.
const fingerprints = new Map();
function scriptFingerprint(dir, name) {
  const key = `${dir}/${name}`;
  if (fingerprints.has(key)) return fingerprints.get(key);
  fingerprints.set(key, 'CYCLE');
  const path = join(dir, '_astro', name);
  if (!existsSync(path)) return `missing:${name}`;
  const source = readFileSync(path, 'utf8')
    .replace(/(["'])\.\/([\w.-]+\.js)\1/g, (_, q, dep) => `${q}${scriptFingerprint(dir, dep)}${q}`)
    .replace(/(?:import"[^"]+";?)+/g, (run) =>
      run
        .split(/(?<=")(?:;|(?=import))/)
        .filter(Boolean)
        .map((s) => s.replace(/;$/, ''))
        .sort()
        .join(';'),
    );
  const fingerprint = createHash('sha1').update(source).digest('hex').slice(0, 12);
  fingerprints.set(key, fingerprint);
  return fingerprint;
}

const normalise = (html, dir) =>
  html
    .replace(/\sdata-astro-cid-[a-z0-9]+(="[^"]*")?/g, '')
    .replace(/\bastro-[a-z0-9]{8}\b/g, 'astro-HASH')
    .replace(/\[data-astro-cid-[a-z0-9]+\]/g, '')
    .replace(randomIds, '$1-ID')
    .replace(/\/_astro\/([\w.-]+\.js)/g, (_, name) => `/_astro/script-${scriptFingerprint(dir, name)}.js`);

/** The first point where two strings part, with some context either side. */
function firstDifference(a, b) {
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  const from = Math.max(0, i - 120);
  return { before: a.slice(from, i + 120), after: b.slice(from, i + 120) };
}

if (!existsSync(BEFORE)) {
  console.error(`No ${BEFORE}/ baseline. See the comment at the top of this file.`);
  process.exit(2);
}

const before = new Set(htmlFiles(BEFORE));
const after = new Set(htmlFiles(AFTER));
let failures = 0;

for (const file of before) {
  if (!after.has(file)) {
    console.log(`MISSING  ${file}`);
    failures++;
    continue;
  }
  const a = normalise(readFileSync(join(BEFORE, file), 'utf8'), BEFORE);
  const b = normalise(readFileSync(join(AFTER, file), 'utf8'), AFTER);
  if (a !== b) {
    failures++;
    const { before: x, after: y } = firstDifference(a, b);
    console.log(`CHANGED  ${file}\n  before: ...${x}...\n  after:  ...${y}...\n`);
  }
}
for (const file of after) {
  if (!before.has(file)) {
    console.log(`NEW      ${file}`);
    failures++;
  }
}

console.log(
  failures
    ? `\n${failures} of ${before.size} pages differ from the baseline.`
    : `All ${before.size} pages match the baseline.`,
);
process.exit(failures ? 1 : 0);
