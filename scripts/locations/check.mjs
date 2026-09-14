// One-off sanity check: does town-scenes.json name exactly the towns that
// locations.ts publishes pages for? Run before generating 56 images so a
// typo costs a second rather than an image.
import fs from 'node:fs';

const src = fs.readFileSync('src/data/locations.ts', 'utf8');
const grab = (name) => {
  const m = src.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\];`));
  return [...m[1].matchAll(/'([^']+)'/g)].map((x) => x[1]);
};

const all = [
  ...grab('northernRiversTowns'),
  ...grab('tweedTowns'),
  ...grab('southernGoldCoastTowns'),
];
const scenes = JSON.parse(fs.readFileSync('scripts/locations/town-scenes.json', 'utf8'));
const mine = scenes.map((x) => x.town);

console.log('locations.ts towns:', all.length, '| manifest:', mine.length);
console.log('missing from manifest:', all.filter((t) => !mine.includes(t)));
console.log('extra in manifest:', mine.filter((t) => !all.includes(t)));
