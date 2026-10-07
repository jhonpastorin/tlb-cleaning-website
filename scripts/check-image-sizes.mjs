// Warns about large photos added or changed under src/assets. See
// PAGES-CMS-PLAN.md, Phase 5.
//
// Astro resizes and compresses every photo it publishes, so a large upload
// does not slow the site down. It does make the repository bigger for good,
// and phone photos straight off the camera are often 5 to 10 MB. Editors are
// asked to export at about 2400 px on the long edge; this is the reminder when
// that did not happen. It never fails the build.
//
// Run: node scripts/check-image-sizes.mjs [BASE_REF]
// Compares BASE_REF..HEAD (in CI, the commit before the push). Without a
// usable base it checks the last commit.

import { execFileSync } from 'node:child_process';
import { statSync, existsSync } from 'node:fs';

const LIMIT_MB = 3;
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

let base = process.argv[2] ?? '';
const usable = (ref) => {
  if (!ref || /^0+$/.test(ref)) return false;
  try {
    git('cat-file', '-e', `${ref}^{commit}`);
    return true;
  } catch {
    return false;
  }
};
if (!usable(base)) base = usable('HEAD~1') ? 'HEAD~1' : '';

const changed = base
  ? git('diff', '--name-only', '--diff-filter=AM', `${base}..HEAD`, '--', 'src/assets').split('\n').filter(Boolean)
  : [];

let large = 0;
for (const file of changed) {
  if (!existsSync(file)) continue;
  const mb = statSync(file).size / 1024 / 1024;
  if (mb > LIMIT_MB) {
    large++;
    console.log(
      `::warning file=${file}::${file} is ${mb.toFixed(1)} MB. Photos over ${LIMIT_MB} MB bloat the repository; export at about 2400 px on the long edge and upload it again.`,
    );
  }
}
console.log(`${changed.length} photo(s) added or changed${base ? ` since ${base.slice(0, 7)}` : ''}; ${large} over ${LIMIT_MB} MB.`);
