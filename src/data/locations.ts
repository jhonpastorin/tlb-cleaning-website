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
// ✅ RESOLVED — every town here has a page. This used to carry a standing
// warning that the 56 links meant ~41 404s, because only 15 town pages were
// planned and none were built. src/pages/locations/[town].astro now builds
// one page per town in these arrays, from src/data/townPages.ts, so this list
// and the pages it links to cannot fall out of step: adding a town here
// creates its page, and removing one deletes it.
//
// ✅ RESOLVED — the REGION overview pages exist and are live:
// src/pages/locations/northern-rivers.astro and southern-gold-coast.astro,
// built from src/data/regionPages.ts on RegionPage.astro. The mega-menu's
// region rows point at them, and a region page links on to its towns using
// `isNavigableTown` below — the same rule the menu uses.
//
// ⚠️ THE TWEED HAS NO OVERVIEW PAGE — it was deleted on 21 Sep 2026 at the
// client's request, with its mega-menu row. That is a page-level removal
// only: `tweedTowns` below is untouched, its live town pages still build, and
// every band and the hub still name the region. See regionPages.ts.
//
// ✅ RESOLVED — /locations/ exists. src/pages/locations/index.astro is the
// hub every footer's "View all locations" and the primary nav's "Locations"
// point at, and it renders `locationGroups` below as its canonical town list,
// so the hub cannot disagree with the mega-menu or with any page's "Where we
// clean" band. Its counts are derived from these arrays too.
//
// ⚠️ The doorway-page question is still open and is recorded in townPages.ts:
// all 56 town pages share one layout and differ by a town name. What this file
// controls is which of them anything LINKS to — see `navigableTowns` below.
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

/** Every town TLB names anywhere on the site, across all three regions. */
export const allTowns = [...northernRiversTowns, ...tweedTowns, ...southernGoldCoastTowns];

// ── THE ONE SWITCH: WHICH TOWNS ARE LINKED ──────────────────────────────
//
// EVERY town above is NAMED on every "Where we clean" band, on the /locations/
// hub, in the header's "Areas we clean" menu and on its region page. Only the
// towns below are LINKED. The rest render as plain text pills — TagCloud draws
// a <span> instead of an <a> for a tag with no href, which is the whole
// mechanism.
//
// This is deliberately ONE list now. The history is worth knowing before
// editing it, because it has been three different shapes in a fortnight:
//
//   16 Sep 2026 — the menu listed all 56 and linked fourteen, while the hub
//     and every band listed a curated eight. Two lists, two surfaces.
//   18 Sep 2026 — the client asked for the bands to show the menu's linked
//     set, so both became the same fourteen and the bands stopped naming the
//     other 42 at all.
//   18 Sep 2026, later — the client asked for every band to name ALL the
//     mega-menu towns and to link only the live pages. That is the current
//     state, and it collapses the "which towns are listed" question entirely:
//     the answer is all of them, everywhere, so `visibleTowns` and
//     `isVisibleTown` are gone rather than left pointing at the full list.
//
// So a town now has two states rather than three:
//   named and linked — the fourteen below
//   named, not linked — the other 42
//
// TO MAKE A TOWN'S PAGE LIVE, add it here. That is the entire change: the
// menu, the hub, all 47 bands, the region pages and the town pages' "nearby
// suburbs" lists all read this one predicate. Nothing else has to move.
//
// The order is the client's own and mixes regions — Kingscliff, Pottsville,
// Murwillumbah and Tweed Heads are Tweed towns, not Northern Rivers ones. The
// guard below checks every name against the arrays above at build time, so a
// town renamed or removed up there fails the build instead of quietly
// un-linking itself.
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

const everyTown = new Set(allTowns);
const missingNavigable = navigableTowns.filter((town) => !everyTown.has(town));
if (missingNavigable.length) {
  throw new Error(
    `Navigable towns no longer exist in the full lists: ${missingNavigable.join(', ')}`,
  );
}

const navigableTownSet = new Set(navigableTowns);

/** Whether a town's page is linked from anywhere on the site. */
export const isNavigableTown = (town: string) => navigableTownSet.has(town);

// ⚠️ THE 42 UNLINKED PAGES ARE STILL BUILT, and unlinked is not the same as
// unindexed. townPages.ts builds all 56 and every one of them renders, so the
// 42 are reachable and crawlable by URL even though nothing points at them.
//
// While the site is on staging this is covered site-wide: site-env.ts puts
// `noindex` on every page unless SITE_ENV=production. That is a blanket switch,
// not a per-page one — so the day the site goes production, these pages become
// indexable along with everything else. If they should stay out of the index
// after launch, that still needs a per-page decision. There is no sitemap in
// this project, so there is nothing to exclude them from.

// Region labels are the client's exact wording, state suffix included, and
// they are deliberately the same string in the menu, the hub, the region pages
// and every "Where we clean" band. The bare names ("The Tweed", "Southern Gold
// Coast") still appear in prose and in townPages.ts' `regions`, which names the
// region a town page's copy sits in rather than a heading on a list.
//
// Only a navigable town gets an href; the rest are plain pills. This is the
// only place that rule is applied to a band, so the bands cannot disagree with
// each other about which towns are live.
const toGroup = (label: string, towns: string[]): TagGroup => ({
  label,
  tags: towns.map((town) => ({
    label: town,
    ...(isNavigableTown(town) ? { href: townSlug(town) } : {}),
  })),
});

/**
 * Every town, in three labelled regions — the list the mega-menu shows, and
 * the one every "Where we clean" band on the site renders.
 */
export const locationGroups: TagGroup[] = [
  toGroup('Northern Rivers NSW', northernRiversTowns),
  toGroup('The Tweed', tweedTowns),
  toGroup('Southern Gold Coast QLD', southernGoldCoastTowns),
];

/**
 * NSW only — the Northern Rivers and the Tweed, minus Queensland.
 *
 * For the nine pages whose own meta and copy claim NSW and stop at the border:
 * the commercial sub-pages (brewery, factory, gym, kitchen and the rest) and
 * ndis-cleaning. The client confirmed on 18 Sep 2026 that these stay NSW-only
 * while every other band widened to all three regions, so that each band keeps
 * matching the page's own meta description rather than contradicting it.
 *
 * ⚠️ Confirm this is still deliberate for both kinds of page. If TLB does
 * commercial or NDIS work across the border they should use `locationGroups`
 * instead — and commercial-cleaning's last non-branded FAQ needs the Blue Card
 * answer that is still open there.
 */
export const nswLocationGroups: TagGroup[] = [
  toGroup('Northern Rivers NSW', northernRiversTowns),
  toGroup('The Tweed', tweedTowns),
];

/** The subheading above a full three-region band. */
export const locationSubheading =
  'Across the Northern Rivers, the Tweed and the Southern Gold Coast.';

/** The subheading above an NSW-only band. */
export const nswLocationSubheading = 'Across the Northern Rivers and the Tweed.';

// ── COMPATIBILITY ALIASES ───────────────────────────────────────────────
//
// These were three genuinely different lists as recently as this morning:
// `footprintLocationGroups` was the 45 towns the four September copy-rewrite
// briefs specified by name, and `completeFootprintLocationGroups` was all 56
// for the three briefs that asked for the lot, both of them deliberately wider
// than the curated band the rest of the site ran.
//
// The client's "name every mega-menu town on every band" call collapses all
// three into the same list, so they are aliases rather than copies — one list
// cannot drift from itself. They are kept under the old names only so the 13
// pages that import them did not all need editing; NEW PAGES SHOULD IMPORT
// `locationGroups`. If you are touching one of those 13 for another reason,
// switching the import is a free cleanup.
export const footprintLocationGroups = locationGroups;
export const completeFootprintLocationGroups = locationGroups;
export const footprintSubheading = locationSubheading;
