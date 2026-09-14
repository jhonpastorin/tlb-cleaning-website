// Post-build check: does every town page actually serve its own hero, and is
// any image shared by two towns? Reads the built HTML rather than the source,
// so it catches a wiring mistake that typechecks fine.
import fs from 'node:fs';
import path from 'node:path';

const scenes = JSON.parse(fs.readFileSync('scripts/locations/town-scenes.json', 'utf8'));
const slugOf = (t) => t.toLowerCase().replace(/\s+/g, '-');

const seen = new Map();
const problems = [];

for (const scene of scenes) {
  const file = path.join('dist/locations', slugOf(scene.town), 'index.html');
  if (!fs.existsSync(file)) {
    problems.push(`${scene.town}: no built page at ${file}`);
    continue;
  }
  const html = fs.readFileSync(file, 'utf8');

  // The hero is the first non-logo image on the page.
  const srcs = [...html.matchAll(/src="(\/_astro\/[^"]+\.(?:webp|jpg|png))"/g)].map((m) => m[1]);
  const hero = srcs.find((s) => !s.includes('tlb-logo'));
  if (!hero) {
    problems.push(`${scene.town}: no hero image in built page`);
    continue;
  }

  // Astro hashes the filename but keeps the stem, so this still ties the
  // built asset back to the source file the manifest names.
  const stem = path.basename(hero).split('.')[0];
  if (stem !== scene.file) {
    problems.push(`${scene.town}: hero is "${stem}", expected "${scene.file}"`);
  }

  if (seen.has(stem)) problems.push(`${scene.town}: shares its hero with ${seen.get(stem)}`);
  else seen.set(stem, scene.town);

  // The label is the alt text, and it must not name a town.
  const alt = html.match(new RegExp(`src="${hero.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*alt="([^"]*)"`))
    ?? html.match(/alt="([^"]*)"[^>]*src="[^"]*"/);
  const altText = alt?.[1] ?? '';
  const named = scenes.map((s) => s.town).filter((t) => altText.includes(t));
  if (named.length > 0) problems.push(`${scene.town}: alt text names a town: ${named.join(', ')}`);
}

console.log(`checked ${scenes.length} town pages, ${seen.size} distinct hero images`);
if (problems.length === 0) console.log('no problems');
else problems.forEach((p) => console.log('PROBLEM ' + p));
