// Per-region data for the three region pages at /locations/<region>/.
//
// WHY THESE PAGES EXIST. The header's "Areas we clean" menu used to carry an
// "All of <region>" row at the head of each column. Those rows were removed
// at the client's request, and locations.ts recorded the reason they could
// not simply be restored: the region overview pages they pointed at had never
// been built. The client asked for them on 16 Sep 2026, so here they are, and
// the menu rows come back with them.
//
// WHAT A REGION PAGE IS FOR. It sits between the /locations/ hub (all three
// regions, routing only) and a town page (one town, on the ground). Its job
// is to be the page that can say something true about a whole region — what
// the work is actually like there — and to hand the reader the towns in it.
//
// ⚠️ WHAT IT MUST NOT BECOME. townPages.ts' doorway-page warning applies here
// with knobs on. Three region pages differing only by a region name and a
// town list would be three more thin pages on the pile of 56 the town route
// already has to justify, and that penalty is not scoped to the thin pages.
// What keeps these three honest is `intro` below: each is about that region
// specifically and could not be swapped for another. If a fourth region is
// ever added, it needs its own paragraphs before it ships, not a template
// fill.
//
// PROVENANCE OF THE COPY. `intro` is NOT newly drafted. All three paragraph
// sets are lifted verbatim from the /locations/ hub's §4 region cells, which
// were written for exactly this purpose — including the Tweed's, which was
// cut from the hub when the Tweed was hidden and is recovered here from git
// history (347406d^). Reusing reviewed copy beat writing three new pages'
// worth from nothing. It does mean the hub and these pages share paragraphs;
// see the note on `intro` below, which is the one real cost.
import { northernRiversTowns, tweedTowns, southernGoldCoastTowns } from './locations';
import { heroImages, type HeroKey } from './townPages';

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
    headingLines: ['Cleaners across', 'the Northern Rivers.'],
    lead: 'From the Lismore hills out to Byron Bay and Ballina on the coast. One local team on a set day, not whoever is nearest.',
    intro: [
      'Lismore and Alstonville inland, then Ballina, Lennox Head, Byron Bay and Brunswick Heads along the coast. An hour end to end, and two quite different cleaning jobs inside it.',
      'Inland it is older housing stock, a lot of timber, and mould and damp that arrive with the wet rather than with neglect. On the coast it is salt haze on glass, sand in every track, and a holiday-let calendar that turns the whole thing over each Saturday.',
      'Byron Shire also carries its own short-stay rules, which changed what a letting year looks like for a lot of owners here.',
    ],
    meta: {
      title: 'Cleaners in the Northern Rivers NSW | TLB Cleaning',
      description:
        'House, holiday let and commercial cleaning across the Northern Rivers NSW — Lismore, Ballina, Byron Bay, Lennox Head, Brunswick Heads and the towns around them.',
    },
  },
  {
    slug: 'the-tweed',
    label: 'the Tweed',
    headingLabel: 'The Tweed',
    state: 'NSW',
    towns: tweedTowns,
    hero: 'valley',
    headingLines: ['Cleaners across', 'the Tweed.'],
    lead: 'Murwillumbah and the caldera villages, the Kingscliff coastal strip, and Tweed Heads hard against the border. We work both sides of it.',
    intro: [
      'Murwillumbah and the caldera villages on one side, the Kingscliff and Pottsville coastal strip on the other, and Tweed Heads pressed right against the border.',
      'This is the part of the map that makes the business what it is. A tenancy in Tweed Heads and a tenancy in Coolangatta are four kilometres and one state apart, and most cleaners work only one side of that line. We work both, which matters most at the end of a lease, when the paperwork changes even though the cleaning does not.',
      'It is also the fastest-growing stretch we cover, so a good deal of it is newer housing with its own quirks: a lot of glass, a lot of tile, and outdoor living that needs as much attention as the inside.',
    ],
    meta: {
      title: 'Cleaners in the Tweed NSW | TLB Cleaning',
      description:
        'House, holiday let and commercial cleaning across the Tweed — Tweed Heads, Kingscliff, Murwillumbah, Pottsville and the villages between them. Both sides of the border.',
    },
  },
  {
    slug: 'southern-gold-coast',
    label: 'the Southern Gold Coast',
    headingLabel: 'Southern Gold Coast QLD',
    state: 'QLD',
    towns: southernGoldCoastTowns,
    hero: 'coastal-home',
    headingLines: ['Cleaners across the', 'Southern Gold Coast.'],
    lead: 'Coolangatta to Miami, over the border and close enough together to run properly in a day.',
    intro: [
      'Burleigh Heads and Palm Beach, over the border and close enough together to run properly in a day.',
      'Density changes the work here more than distance does. A great deal of it is apartments and townhouses rather than free-standing houses, which means lifts, loading docks, building access windows and a body corporate with a view about when anyone can be on site.',
      'Salt is the constant. Glass, balustrades, window hardware and outdoor furniture all age faster within sight of the water, and a place that is cleaned on a schedule holds up visibly better than one that is not.',
    ],
    meta: {
      title: 'Cleaners on the Southern Gold Coast QLD | TLB Cleaning',
      description:
        'House, holiday let and commercial cleaning across the Southern Gold Coast QLD — Burleigh Heads, Palm Beach, Currumbin, Tugun, Coolangatta and Miami.',
    },
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
