// The service-area town list — the substance of every "Where we clean"
// section on the site.
//
// Extracted here once the homepage's v6 list (56 towns in three labelled
// regions) had been copied verbatim into house-cleaning.astro and
// deep-cleaning.astro, and commercial-cleaning.astro and ndis-cleaning.astro
// were still running their own shorter, differently-scoped lists. That was
// four lists for one service area; the duplication is what let them drift.
// Two real consumers is the bar this codebase sets for sharing (see
// comparison.ts, navigation.ts) and this had five.
//
// Region order and town order are the homepage brief's own, verbatim.
//
// ✅ RESOLVED — every town here now has a page. This used to carry a standing
// warning that the 56 links meant ~41 404s, because only 15 town pages were
// planned and none were built. src/pages/locations/[town].astro now builds
// one page per town in these arrays, from src/data/townPages.ts, so this list
// and the pages it links to cannot fall out of step: adding a town here
// creates its page, and removing one deletes it.
//
// ⚠️ What is NOT resolved is whether all 56 SHOULD be published. As built
// they share one layout and differ by a town name, which is what Google calls
// a doorway page. townPages.ts' header sets out the two honest options and is
// the place that decision gets recorded. If the answer turns out to be "ship
// only the towns with real local copy", the mechanism is unchanged from what
// this warning always said: drop the `href` and TagCloud renders a plain
// <span> instead of a link.
//
// ⚠️ Still 404ing, and unrelated to the town pages: the three region overview
// pages the mega-menu links ("All of Northern Rivers" and friends) and
// /locations/ itself, which every footer on the site links to.
//
// The header mega-menu (navigation.ts) is now built from these same arrays
// rather than its old hand-typed 15-town subset, so "Areas we clean" and
// every page's "Where we clean" section can no longer disagree. That also
// means the 404 warning above applies to the nav menu too: whichever way the
// unbuilt towns are handled, handle them here.
import type { TagGroup } from '../components/sections/TagCloud.astro';

// Slugs are derived rather than hand-written — 56 hand-typed hrefs is 56
// chances to typo one — and the derivation matches every existing
// /locations/ slug in navigation.ts. If the real URL pattern turns out to be
// something else, this is the one line that changes.
export const townSlug = (town: string) => `/locations/${town.toLowerCase().replace(/\s+/g, '-')}/`;

export const northernRiversTowns = [
  'Lismore',
  'Goonellabah',
  'Alstonville',
  'Wollongbar',
  'Casino',
  'Kyogle',
  'Nimbin',
  'Clunes',
  'Bexhill',
  'Dunoon',
  'Ballina',
  'East Ballina',
  'Lennox Head',
  'Skennars Head',
  'Wardell',
  'Evans Head',
  'Broadwater',
  'Woodburn',
  'Coraki',
  'Bangalow',
  'Byron Bay',
  'Suffolk Park',
  'Mullumbimby',
  'Brunswick Heads',
  'Ocean Shores',
  'New Brighton',
  'Billinudgel',
  'Federal',
];

export const tweedTowns = [
  'Murwillumbah',
  'Tweed Heads',
  'Tweed Heads South',
  'Banora Point',
  'Terranora',
  'Bilambil',
  'Bilambil Heights',
  'Chinderah',
  'Fingal Head',
  'Kingscliff',
  'Casuarina',
  'Cudgen',
  'Cabarita Beach',
  'Bogangar',
  'Hastings Point',
  'Pottsville',
  'Uki',
  'Burringbar',
  'Mooball',
];

export const southernGoldCoastTowns = [
  'Coolangatta',
  'Bilinga',
  'Tugun',
  'Currumbin',
  'Palm Beach',
  'Elanora',
  'Burleigh Heads',
  'Burleigh Waters',
  'Miami',
];

const toGroup = (label: string, towns: string[]): TagGroup => ({
  label,
  tags: towns.map((town) => ({ label: town, href: townSlug(town) })),
});

// The full list: both NSW regions plus the Queensland one.
export const locationGroups: TagGroup[] = [
  toGroup('Northern Rivers', northernRiversTowns),
  toGroup('The Tweed', tweedTowns),
  toGroup('Southern Gold Coast', southernGoldCoastTowns),
];

// NSW only, for the pages whose own meta and copy claim NSW and stop at the
// border: commercial-cleaning (whose FAQ has an open Blue Card / interstate
// question) and ndis-cleaning. Same towns, same order, minus Queensland.
//
// ⚠️ Confirm this is deliberate for both. If TLB does commercial or NDIS work
// across the border, they should use `locationGroups` instead — and
// commercial-cleaning's last non-branded FAQ needs the Blue Card answer.
export const nswLocationGroups: TagGroup[] = [
  toGroup('Northern Rivers', northernRiversTowns),
  toGroup('The Tweed', tweedTowns),
];
