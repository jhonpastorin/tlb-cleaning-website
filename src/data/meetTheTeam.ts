// The four pages under the header's "Meet the team" mega-menu — two groups,
// "The people" (/about/, /work-with-us/) and "Proof" (/reviews/,
// /how-booking-works/) — plus the three things all four share.
//
// Extracted here for the same reason premises.ts was: every one of the four
// cross-links the other three, and every one hands Base.astro the identical
// `business` object. Four pages hand-typing three sibling links each is
// twelve hrefs and twelve descriptions that can drift; this is one list.
// Two real consumers is the bar this codebase sets for sharing (see
// comparison.ts, locations.ts, navigation.ts, premises.ts) and this has four.
//
// Labels and hrefs are navigation.ts' own mega-menu values, verbatim, so the
// menu and the pages cannot end up with two names for one page.
//
// ⚠️ All four slugs are still the flat kebab-case guesses navigation.ts made
// from its literal menu labels. Unconfirmed, same as the rest of the site.
import type { LocalBusinessInfo } from '../layouts/Base.astro';

/** The four slugs as a union, so a page cross-linking a sibling that does
 *  not exist is an `astro check` error rather than a 404 a reader finds —
 *  the same guard premises.ts' `PremisesHref` provides. */
export type MeetTheTeamHref =
  | '/about/'
  | '/work-with-us/'
  | '/reviews/'
  | '/how-booking-works/';

export interface MeetTheTeamPage {
  label: string;
  href: MeetTheTeamHref;
  /** Which mega-menu column the page sits in. Carried so a cross-link band
   *  can group the same way the menu does rather than inventing a second
   *  arrangement of four pages. */
  group: 'The people' | 'Proof';
  /** One line saying what the page is for. Written once here so the four
   *  pages describe each other in one voice. */
  blurb: string;
}

// Menu order, not alphabetical — a reader has already seen this order once
// in the header by the time they reach a cross-link band.
export const meetTheTeamPages: MeetTheTeamPage[] = [
  {
    label: 'About TLB and Teagan',
    href: '/about/',
    group: 'The people',
    blurb: 'Who started TLB, who works here now, and how the local part actually works.',
  },
  {
    label: 'Work with us',
    href: '/work-with-us/',
    group: 'The people',
    blurb: 'Cleaning work across the Northern Rivers and the Tweed, on hours that fit around family.',
  },
  {
    label: 'Reviews',
    href: '/reviews/',
    group: 'Proof',
    blurb: 'What clients say, and where to read it in their own words rather than ours.',
  },
  {
    label: 'How booking works',
    href: '/how-booking-works/',
    group: 'Proof',
    blurb: 'From the first quote to the day itself, and how to change or skip a visit.',
  },
];

/**
 * The other three pages in this cluster, shaped for `ServiceBlocks`'
 * `list` variant.
 *
 * Excluding `self` is the whole reason this is a function — the same call
 * `relatedPremises` and `otherOutsideServices` already make. A page that
 * links to itself in its own related band reads as a template nobody
 * checked, and it burns one of only three slots.
 */
export const otherMeetTheTeamPages = (self: MeetTheTeamHref) =>
  meetTheTeamPages
    .filter((page) => page.href !== self)
    .map(({ label, href, blurb }) => ({ title: label, description: blurb, href }));

/**
 * The LocalBusiness JSON-LD all four pages hand `Base.astro`.
 *
 * ⚠️ Logo, telephone, email, address and sameAs are all empty, inherited
 * verbatim from every page built before these four. They are real facts TLB
 * holds and none of them are in the repo, so the structured data on every
 * page of this site is thinner than it should be — `footerContact` carries
 * the same two `[TBC]`s in the reader's own view. One fix here fills all
 * four.
 *
 * ⚠️ `sameAs` matters more on these pages than anywhere else on the site:
 * /reviews/ is a page about third-party proof with no link to a Google
 * Business Profile or Facebook page to point at. Fill this the day those
 * profiles exist.
 *
 * `areaServed` is the homepage's own v6 string, verbatim.
 */
export const meetTheTeamBusiness = (description: string): LocalBusinessInfo => ({
  name: 'TLB Cleaning',
  url: 'https://example.com/',
  logo: '',
  telephone: '',
  email: '',
  address: {
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'AU',
  },
  sameAs: [],
  areaServed: 'Northern Rivers NSW, the Tweed, and the Southern Gold Coast QLD',
  description,
});
