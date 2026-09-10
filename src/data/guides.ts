// The nine "Guides" pages under /guides/ — the substance shared by all nine
// leaf pages plus the hub itself.
//
// Extracted here for the same reason premises.ts was: the alternative is nine
// pages each hand-typing an eight-item cross-link list (72 hrefs, 72 chances
// to typo one) and each hand-typing the identical `business` object the Base
// layout needs. Two real consumers is this codebase's bar for sharing (see
// comparison.ts, locations.ts, navigation.ts); this has ten.
//
// Labels and hrefs are navigation.ts' own Guides mega-menu, verbatim, so the
// menu and every page's "more guides" band cannot disagree. If a slug
// changes, it changes in navigation.ts and here — and the `astro check` guard
// GuideHref provides is what catches a page pointing at a guide that does not
// exist.
//
// ⚠️ Every href here is the slug navigation.ts already committed to, which is
// the guide's full question turned into kebab-case. They are long. They are
// also already in the shipped mega-menu, so changing them is a redirect job,
// not a rename — flagged here rather than silently "improved".
//
// ⚠️ THESE ARE EDITORIAL PAGES AND Base.astro ONLY EMITS LocalBusiness
// JSON-LD. An article deserves `Article`/`FAQPage` structured data, which is
// most of the point of publishing a guide at all. Adding an optional
// `article` prop to Base.astro is additive and would not touch the other
// thirty-seven pages, but it is a shared-layout change and is deliberately
// NOT made here. Raise it before launch.
//
// PROVENANCE. No content brief exists for any of the nine. Same standing as
// the end-of-lease page: voice, terminology and claim rules trace to
// "TLB Cleaning - Brand Foundation.md" (the BFD); the substance is drafted.
// Where a guide states something about law, policy or price, the page itself
// carries the flag — see each file's header.
import type { LocalBusinessInfo } from '../layouts/Base.astro';
import type { Tag } from '../components/sections/TagCloud.astro';
import type { ServiceIconName } from '../components/ui/ServiceIcon.astro';

/** Slugs of the nine guides, as a union so a page cross-linking a sibling
 *  that does not exist is a type error rather than a 404 found by a reader. */
export type GuideHref =
  | '/guides/what-the-law-actually-says-end-of-lease-cleaning-in-nsw-and-qld/'
  | '/guides/the-end-of-lease-cleaning-checklist/'
  | '/guides/how-much-does-end-of-lease-cleaning-cost/'
  | '/guides/how-much-does-house-cleaning-cost/'
  | '/guides/steam-dry-or-shampoo-which-carpet-cleaning-method/'
  | '/guides/what-is-included-in-a-deep-clean/'
  | '/guides/the-airbnb-turnover-checklist/'
  | '/guides/the-byron-shire-60-day-short-stay-cap-what-it-means-for-hosts/'
  | '/guides/how-to-choose-a-commercial-cleaner/';

/** The two mega-menu groups, so the hub can present the nine the way the
 *  menu already does rather than inventing a second grouping. */
export type GuideCluster = 'End of lease & tenancy' | 'Homes, hosting & commercial';

export interface GuidePage {
  /** The mega-menu label, verbatim — usually the full question. */
  label: string;
  /** A short label for a card or a cross-link row, where the full question
   *  wraps to three lines and stops being scannable. */
  shortLabel: string;
  href: GuideHref;
  cluster: GuideCluster;
  /** One sentence on what the guide answers. Written once here so nine pages
   *  describe each other in one voice. */
  blurb: string;
  icon: ServiceIconName;
}

// Mega-menu order, not alphabetical — a reader has already seen that order
// once by the time they reach a cross-link band.
export const guidePages: GuidePage[] = [
  {
    label: 'What the law actually says: end of lease cleaning in NSW and QLD',
    shortLabel: 'What the law actually says',
    href: '/guides/what-the-law-actually-says-end-of-lease-cleaning-in-nsw-and-qld/',
    cluster: 'End of lease & tenancy',
    blurb:
      'The standard tenancy law sets on either side of the border, and the things an agent cannot simply require.',
    icon: 'idea',
  },
  {
    label: 'The end of lease cleaning checklist',
    shortLabel: 'The end of lease checklist',
    href: '/guides/the-end-of-lease-cleaning-checklist/',
    cluster: 'End of lease & tenancy',
    blurb: 'Room by room, in the order the job is actually worked, with the lines agents mark first.',
    icon: 'target',
  },
  {
    label: 'How much does end of lease cleaning cost?',
    shortLabel: 'What a bond clean costs',
    href: '/guides/how-much-does-end-of-lease-cleaning-cost/',
    cluster: 'End of lease & tenancy',
    blurb: 'What moves the price, what a cheap quote has left out, and how to compare two of them properly.',
    icon: 'chart-bars',
  },
  {
    label: 'How much does house cleaning cost?',
    shortLabel: 'What house cleaning costs',
    href: '/guides/how-much-does-house-cleaning-cost/',
    cluster: 'Homes, hosting & commercial',
    blurb: 'Hourly against fixed, what the first clean costs against the ones after it, and why they differ.',
    icon: 'chart-pie',
  },
  {
    label: 'Steam, dry or shampoo: which carpet cleaning method?',
    shortLabel: 'Which carpet cleaning method',
    href: '/guides/steam-dry-or-shampoo-which-carpet-cleaning-method/',
    cluster: 'Homes, hosting & commercial',
    blurb: 'Three methods, what each is genuinely good at, and which one your carpet and your deadline want.',
    icon: 'puzzle',
  },
  {
    label: 'What is included in a deep clean?',
    shortLabel: 'What is in a deep clean',
    href: '/guides/what-is-included-in-a-deep-clean/',
    cluster: 'Homes, hosting & commercial',
    blurb: 'The line between a regular clean, a deep clean and a bond clean, drawn task by task.',
    icon: 'spray-bottle',
  },
  {
    label: 'The Airbnb turnover checklist',
    shortLabel: 'The Airbnb turnover checklist',
    href: '/guides/the-airbnb-turnover-checklist/',
    cluster: 'Homes, hosting & commercial',
    blurb: 'The changeover run in order, plus the four things that generate most of the bad reviews.',
    icon: 'key',
  },
  {
    label: 'The Byron Shire 60-day short-stay cap: what it means for hosts',
    shortLabel: 'The Byron Shire 60-day cap',
    href: '/guides/the-byron-shire-60-day-short-stay-cap-what-it-means-for-hosts/',
    cluster: 'Homes, hosting & commercial',
    blurb: 'What the cap covers, who it exempts, and what a shorter letting year does to how you run the place.',
    icon: 'house',
  },
  {
    label: 'How to choose a commercial cleaner',
    shortLabel: 'Choosing a commercial cleaner',
    href: '/guides/how-to-choose-a-commercial-cleaner/',
    cluster: 'Homes, hosting & commercial',
    blurb: 'What to ask before you sign, and which cheap quote is cheap because something was left out.',
    icon: 'office',
  },
];

export const guidesHubLink: Tag = { label: 'All guides', href: '/guides/' };

/**
 * The "more guides" pill list for one guide: the other eight, then any
 * page-specific extras (usually the service pages the guide belongs to),
 * then the hub.
 *
 * Excluding `self` is the whole reason this is a function — a page that links
 * to itself in its own related band reads as a template nobody checked, and
 * it wastes a slot.
 */
export const relatedGuides = (self: GuideHref, extras: Tag[] = []): Tag[] => [
  ...guidePages.filter((g) => g.href !== self).map(({ shortLabel, href }) => ({ label: shortLabel, href })),
  ...extras,
  guidesHubLink,
];

/**
 * The other guides shaped for `ServiceBlocks`' `list` variant — the same job
 * `outsideYourHome.ts`' `otherOutsideServices` does for that cluster, and the
 * richer treatment for a guide that wants to hand the reader a real next read
 * rather than a pill.
 *
 * `only` exists because nine minus one is eight rows, which is a wall. Pass
 * the handful that genuinely follow on from the page doing the linking; omit
 * it on the hub, which legitimately wants all of them.
 */
export const otherGuides = (self: GuideHref | null, only?: GuideHref[]) =>
  guidePages
    .filter((g) => g.href !== self && (!only || only.includes(g.href)))
    .map(({ icon, shortLabel, blurb, href }) => ({ icon, title: shortLabel, description: blurb, href }));

/**
 * The LocalBusiness JSON-LD every guide hands `Base.astro`.
 *
 * ⚠️ Almost every field is empty, inherited verbatim from every page built
 * before these. Logo, telephone, email and address are all real facts TLB
 * holds and none of them are in the repo. One fix here fills all ten.
 *
 * ⚠️ `areaServed` names both states, unlike premises.ts' NSW-only string.
 * These guides address tenants and hosts on both sides of the border and two
 * of them are specifically about the difference, so narrowing it here would
 * contradict the pages. Same open sitewide question as everywhere else.
 */
export const guidesBusiness = (description: string): LocalBusinessInfo => ({
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
  areaServed: 'Northern Rivers NSW, the Tweed and Southern Gold Coast QLD',
  description,
});

/**
 * The line the two regulatory guides carry under their opening block.
 *
 * ⚠️ It is a real editorial commitment, not decoration: a page stamped with a
 * review date nobody reviews is worse than an undated one. The NSW/QLD law
 * guide and the Byron Shire cap guide are the two this matters for, and both
 * go stale without warning when a rule changes. Put it in a calendar or take
 * the line off.
 */
export const lastReviewed = 'Last reviewed September 2026.';
