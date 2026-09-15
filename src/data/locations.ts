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
// ✅ RESOLVED — /locations/ exists. src/pages/locations/index.astro is the
// hub every footer's "View all locations" and the primary nav's "Locations"
// point at, and it renders `locationGroups` below as its canonical town list,
// so the hub cannot disagree with the mega-menu or with any page's "Where we
// clean" band. Its counts are derived from these arrays too.
//
// The three REGION overview pages still do not exist, and nothing links to
// them any more: the mega-menu lists towns only (its "All of <region>" rows
// were removed at the client's request) and the new hub groups by region
// rather than linking to a region page. So this is now a deliberate gap
// rather than a broken link. If region pages are ever wanted, the hub's §4
// region cells are the copy they would start from.
//
// The header mega-menu (navigation.ts), the /locations/ hub and every page's
// "Where we clean" band all read this file, so they cannot disagree with each
// other. They no longer read the raw arrays, though: see "WHAT THE SITE SHOWS"
// below, which is now the single switch controlling which towns any of them
// link to — including the open doorway-page question above.
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

// ── WHAT THE SITE SHOWS, vs. what it has pages for ──────────────────────
//
// ⚠️ THE ARRAYS ABOVE ARE NO LONGER WHAT THE SITE DISPLAYS. At the client's
// request (Sept 2026) every browse surface — the header's "Areas we clean"
// menu, the /locations/ hub, and every page's "Where we clean" band — shows
// only the eight towns below. The rest are HIDDEN, NOT DELETED: the arrays
// above are unchanged, townPages.ts still builds a page for all 56, and every
// one of those pages still renders. They simply are not linked any more.
//
// To un-hide a town, add it here. To un-hide everything, point the two group
// exports at the full arrays again — nothing else has to change.
//
// The Tweed is hidden in full, so there is no visible Tweed list and no Tweed
// group below.
//
// ⚠️ THESE PAGES ARE NOW ORPHANS, and unlinked is not the same as unindexed.
// The ~48 hidden pages are still built into dist/ and are still reachable and
// crawlable by URL. If the intent is that nobody finds them at all while they
// are hidden, they need `noindex` (and to come out of any sitemap) as well —
// that is a separate decision and has NOT been made here.
//
// Town order is the client's own, not the source arrays', so these are listed
// literally rather than filtered. The guard below checks each name against the
// arrays above at build time: a town renamed or removed up there fails the
// build instead of quietly vanishing from the site.
export const visibleNorthernRiversTowns = [
  'Byron Bay',
  'Brunswick Heads',
  'Ballina',
  'Lennox Head',
  'Lismore',
  'Alstonville',
];

export const visibleSouthernGoldCoastTowns = [
  'Burleigh Heads',
  'Palm Beach',
];

for (const [shown, source, region] of [
  [visibleNorthernRiversTowns, northernRiversTowns, 'Northern Rivers'],
  [visibleSouthernGoldCoastTowns, southernGoldCoastTowns, 'Southern Gold Coast'],
] as [string[], string[], string][]) {
  const missing = shown.filter((town) => !source.includes(town));
  if (missing.length) {
    throw new Error(
      `Visible ${region} towns no longer exist in the full list: ${missing.join(', ')}`,
    );
  }
}

/** Every town the site currently links to, across all regions. */
export const visibleTowns = [...visibleNorthernRiversTowns, ...visibleSouthernGoldCoastTowns];

const visibleTownSet = new Set(visibleTowns);

/** Whether a town is currently linked anywhere on the site. */
export const isVisibleTown = (town: string) => visibleTownSet.has(town);

// ── WHICH TOWNS ARE CLICKABLE IN THE HEADER MENU ────────────────────
//
// A SECOND, SEPARATE SWITCH from `visibleTowns` above, and the two now govern
// different surfaces. Keep them straight:
//
//   • `visibleTowns` (the eight) governs the /locations/ hub and every page's
//     "Where we clean" band. A town not in it is not listed there at all.
//   • `navigableTowns` (the fourteen, below) governs which towns are CLICKABLE
//     in the header's "Areas we clean" menu and on a region page. That menu
//     lists all 56 regardless; the other 42 render as plain text.
//
// So a town has three possible states, and all three are in use right now:
//   listed and linked — the fourteen below
//   listed, not linked — the other 42, in the menu and on region pages
//   not listed at all  — the 48 the hub and the bands leave out
//
// The client asked for each of those separately (16 Sep 2026) and they have
// not been reconciled into one list, deliberately: the menu is a browse
// surface where naming a town costs nothing, and the hub and bands are
// claims about where TLB works. If they should be the same list, the fix is
// to point one of these exports at the other rather than to edit both.
//
// The order is the client's own and mixes regions — Kingscliff, Pottsville,
// Murwillumbah and Tweed Heads are Tweed towns. The guard below checks every
// name against the arrays at the top of this file at build time.
export const navigableTowns = [
  'Byron Bay',
  'Brunswick Heads',
  'Ballina',
  'Lennox Head',
  'Lismore',
  'Alstonville',
  'Kingscliff',
  'Pottsville',
  'Murwillumbah',
  'Evans Head',
  'Casino',
  'Tweed Heads',
  'Burleigh Heads',
  'Palm Beach',
];

const navigableTownSet = new Set(navigableTowns);

const everyTown = new Set([...northernRiversTowns, ...tweedTowns, ...southernGoldCoastTowns]);
const missingNavigable = navigableTowns.filter((town) => !everyTown.has(town));
if (missingNavigable.length) {
  throw new Error(
    `Navigable towns no longer exist in the full lists: ${missingNavigable.join(', ')}`,
  );
}

/** Whether a town's page is reachable from the header menu and region pages. */
export const isNavigableTown = (town: string) => navigableTownSet.has(town);

// Region labels are the client's exact wording, state suffix included, and
// they are deliberately the same string in the menu, the hub and every
// "Where we clean" band. The bare names ("The Tweed", "Southern Gold Coast")
// still appear in prose and in townPages.ts' `regions`, which names the
// region a town page's copy sits in rather than a heading on a list.
const toGroup = (label: string, towns: string[]): TagGroup => ({
  label,
  tags: towns.map((town) => ({ label: town, href: townSlug(town) })),
});

// The visible list: the NSW region plus the Queensland one.
export const locationGroups: TagGroup[] = [
  toGroup('Northern Rivers NSW', visibleNorthernRiversTowns),
  toGroup('Southern Gold Coast QLD', visibleSouthernGoldCoastTowns),
];

// NSW only, for the pages whose own meta and copy claim NSW and stop at the
// border: commercial-cleaning (whose FAQ has an open Blue Card / interstate
// question) and ndis-cleaning. Same towns, same order, minus Queensland.
//
// Now that the Tweed is hidden, "NSW only" and "the visible Northern Rivers"
// are the same six towns, so this is one group rather than two. It stays a
// separate export because the DISTINCTION is still real — these pages claim
// NSW and the others claim both states — and because un-hiding the Tweed must
// widen this list too.
//
// ⚠️ Confirm this is deliberate for both. If TLB does commercial or NDIS work
// across the border, they should use `locationGroups` instead — and
// commercial-cleaning's last non-branded FAQ needs the Blue Card answer.
export const nswLocationGroups: TagGroup[] = [
  toGroup('Northern Rivers NSW', visibleNorthernRiversTowns),
];

// ── THE FULL-FOOTPRINT LIST, for the SEO copy-rewrite pages ──────────────
//
// Added September 2026 for the four pages rewritten against the copy-rewrite
// briefs in content-plans/ (carpet and rug, tile and grout, commercial carpet,
// commercial pressure). Each brief's "Where we clean" section specifies this
// exact list by name, on the same reasoning every time: BFD §2.1 says name the
// whole footprint and do not cherry-pick the coastal towns, §12.1 calls named
// towns the proof, and on the live SERP the nearest competitor in each
// category publishes twenty-three towns against these pages' six.
//
// ⚠️ THIS DELIBERATELY DIVERGES FROM `visibleTowns` ABOVE, which is the
// client's own eight-town call from earlier this month and still governs every
// OTHER page's band, the /locations/ hub and the header menu. Nothing above is
// changed. If the client wants the wider list everywhere, the fix is to point
// `visibleNorthernRiversTowns` and `visibleSouthernGoldCoastTowns` at these
// arrays and delete this block — not to edit two lists in parallel.
//
// The briefs' lists are a SUBSET of the source arrays at the top of this file:
// they leave out Bexhill, Dunoon, Skennars Head, Broadwater, New Brighton,
// Federal, Bilambil, Bilambil Heights, Fingal Head, Bogangar and Mooball. That
// is the briefs' own call, so the towns are listed literally here rather than
// filtered, in the briefs' order. The guard below fails the build if any name
// stops existing upstream.
//
// Linking follows the established rule, not a new one: `isNavigableTown`
// decides, exactly as navigation.ts and RegionPage.astro already do, so a
// town is NAMED here whether or not its page is currently reachable. Naming
// the footprint is the brand and citability claim; linking 56 town pages is
// the separate doorway-page question recorded in townPages.ts.
export const footprintNorthernRiversTowns = [
  'Lismore', 'Goonellabah', 'Alstonville', 'Wollongbar', 'Casino', 'Kyogle',
  'Nimbin', 'Clunes', 'Ballina', 'East Ballina', 'Lennox Head', 'Wardell',
  'Evans Head', 'Woodburn', 'Coraki', 'Bangalow', 'Byron Bay', 'Suffolk Park',
  'Mullumbimby', 'Brunswick Heads', 'Ocean Shores', 'Billinudgel',
];

export const footprintTweedTowns = [
  'Murwillumbah', 'Tweed Heads', 'Tweed Heads South', 'Banora Point',
  'Terranora', 'Chinderah', 'Kingscliff', 'Casuarina', 'Cudgen',
  'Cabarita Beach', 'Hastings Point', 'Pottsville', 'Uki', 'Burringbar',
];

export const footprintSouthernGoldCoastTowns = [...southernGoldCoastTowns];

for (const [shown, source, region] of [
  [footprintNorthernRiversTowns, northernRiversTowns, 'Northern Rivers'],
  [footprintTweedTowns, tweedTowns, 'Tweed'],
  [footprintSouthernGoldCoastTowns, southernGoldCoastTowns, 'Southern Gold Coast'],
] as [string[], string[], string][]) {
  const missing = shown.filter((town) => !source.includes(town));
  if (missing.length) {
    throw new Error(
      `Footprint ${region} towns no longer exist in the full list: ${missing.join(', ')}`,
    );
  }
}

// Same construction as `toGroup`, but only the navigable towns get an href —
// the others render as plain <span> pills, which is what TagCloud does with a
// tag that has no href.
const toFootprintGroup = (label: string, towns: string[]): TagGroup => ({
  label,
  tags: towns.map((town) => ({
    label: town,
    ...(isNavigableTown(town) ? { href: townSlug(town) } : {}),
  })),
});

/** All three regions, for the pages whose brief names the whole footprint. */
export const footprintLocationGroups: TagGroup[] = [
  toFootprintGroup('Northern Rivers NSW', footprintNorthernRiversTowns),
  toFootprintGroup('The Tweed', footprintTweedTowns),
  toFootprintGroup('Southern Gold Coast QLD', footprintSouthernGoldCoastTowns),
];

/** The subheading every one of those four briefs specifies, word for word. */
export const footprintSubheading =
  'Across the Northern Rivers, the Tweed and the Southern Gold Coast.';
