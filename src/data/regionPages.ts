// Per-region data for the two region pages at /locations/<region>/.
//
// WHY THESE PAGES EXIST. The header's "Areas we clean" menu used to carry an
// "All of <region>" row at the head of each column. Those rows were removed
// at the client's request, and locations.ts recorded the reason they could
// not simply be restored: the region overview pages they pointed at had never
// been built. The client asked for them on 16 Sep 2026, so here they are, and
// the menu rows come back with them.
//
// ⚠️ THE TWEED NO LONGER HAS ONE, 21 Sep 2026, at the client's request. Its
// entry and src/pages/locations/the-tweed.astro were both deleted, so
// /locations/the-tweed/ is gone rather than merely unlinked. The Tweed itself
// is untouched everywhere else: locations.ts still groups its towns, all four
// live Tweed town pages still build, and the header menu and every "Where we
// clean" band still name the region. Only its overview page went. Restoring
// it is an entry here plus a two-line thin page beside the other two — the
// copy is in git at the commit that removed it.
//
// WHAT A REGION PAGE IS FOR. It sits between the /locations/ hub (all three
// regions, routing only) and a town page (one town, on the ground). Its job
// is to be the page that can say something true about a whole region — what
// the work is actually like there — and to hand the reader the towns in it.
//
// ⚠️ WHAT IT MUST NOT BECOME. townPages.ts' doorway-page warning applies here
// with knobs on. Region pages differing only by a region name and a town list
// would be more thin pages on the pile of 56 the town route already has to
// justify, and that penalty is not scoped to the thin pages. What keeps these
// honest is `intro` below: each is about that region specifically and could
// not be swapped for another. If a region is ever added — or the Tweed's page
// restored — it needs its own paragraphs before it ships, not a template
// fill.
//
// PROVENANCE OF THE COPY. `intro` is NOT newly drafted. Both paragraph sets
// are lifted verbatim from the /locations/ hub's §4 region cells, which were
// written for exactly this purpose. Reusing reviewed copy beat writing two new
// pages' worth from nothing. It does mean the hub and these pages share
// paragraphs; see the note on `intro` below, which is the one real cost.
//
// WHAT IS EDITABLE IN PAGES CMS ("Locations > Region pages",
// src/content/regions/<slug>.yaml): the search listing, the heading, the lead
// and `intro`. Which towns a region holds, its photo and its URL stay here.
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';
import { northernRiversTowns, southernGoldCoastTowns } from './locations';
import { heroImages, type HeroKey } from './townPages';

const regionCopy = (slug: string) =>
  loadData(
    `regions/${slug}`,
    z.object({
      seo: z.object({ title: z.string().min(1), description: z.string().min(1) }),
      headingLines: z.array(z.string().min(1)).min(1),
      lead: z.string().min(1),
      intro: z.array(z.string().min(1)).min(1),
    }),
  );

const fromCopy = (slug: string) => {
  const { seo, ...copy } = regionCopy(slug);
  return { ...copy, meta: seo };
};

export interface RegionPage {
  /** URL segment: /locations/<slug>/. */
  slug: string;
  /** Prose name, no state suffix: "the Northern Rivers", "the Tweed". */
  label: string;
  /** The menu's and hub's heading for this region, state suffix included. */
  headingLabel: string;
  state: 'NSW' | 'QLD';
  towns: string[];
  hero: HeroKey;
  /** H1, split across lines the way every other hero on the site is. */
  headingLines: string[];
  /** Hero sub-paragraph. */
  lead: string;
  /**
   * The body copy. Verbatim from the /locations/ hub's §4 cells.
   *
   * ⚠️ DUPLICATED ON PURPOSE, AND IT IS THE ONE THING TO WATCH. The hub
   * renders these same paragraphs. Two pages carrying identical paragraphs is
   * a thin-content risk exactly like the one townPages.ts warns about, and
   * the honest fix is for one of the two to be rewritten so they differ —
   * most likely the hub's, which only needs enough to route a reader on.
   * Recorded rather than fixed because rewriting reviewed copy is a content
   * decision, not a build one.
   */
  intro: string[];
  meta: { title: string; description: string };
}

export const regionPages: RegionPage[] = [
  {
    slug: 'northern-rivers',
    label: 'the Northern Rivers',
    headingLabel: 'Northern Rivers NSW',
    state: 'NSW',
    towns: northernRiversTowns,
    hero: 'hinterland-home',
    ...fromCopy('northern-rivers'),
  },
  {
    slug: 'southern-gold-coast',
    label: 'the Southern Gold Coast',
    headingLabel: 'Southern Gold Coast QLD',
    state: 'QLD',
    towns: southernGoldCoastTowns,
    hero: 'coastal-home',
    ...fromCopy('southern-gold-coast'),
  },
];

/** The hero image and its alt text, resolved from townPages.ts' own map. */
export const regionHero = (region: RegionPage) => heroImages[region.hero];

export const regionPageBySlug = (slug: string) => {
  const region = regionPages.find((r) => r.slug === slug);
  if (!region) throw new Error(`regionPages.ts: no region with slug "${slug}"`);
  return region;
};

/** The href the header menu and anything else should use for a region. */
export const regionSlugHref = (slug: string) => `/locations/${slug}/`;
