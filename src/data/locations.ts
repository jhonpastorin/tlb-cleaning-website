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
// ⚠️ Every town links to /locations/<slug>/ and MOST OF THOSE PAGES DON'T
// EXIST YET — the header mega-menu only lists 15. Shipping 56 links means
// shipping ~41 404s, which hurts the "[service] [suburb]" ranking this
// section exists to serve more than an unlinked pill would. Either the
// location pages land alongside these pages, or the unbuilt towns ship as
// plain unlinked pills (drop their `href` — TagCloud already renders a
// <span> when there isn't one). Flagged rather than silently chosen: which
// towns have pages is TLB's answer, not a guess. Now ONE fix, here, serves
// every page.
//
// ⚠️ The header mega-menu (navigation.ts) still lists 15 towns and folds the
// Tweed into "Northern Rivers NSW". Nothing there contradicts this list —
// it's a subset — but the mega-menu is what a visitor actually navigates by,
// so growing it to match is the remaining half of this reconciliation. Left
// alone here because how many towns belong in a nav menu is a layout call,
// not a data one.
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
