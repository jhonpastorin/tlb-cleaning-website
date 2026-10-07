// The thirteen "by type of premises" pages under the /commercial-cleaning/
// hub — the substance shared by all thirteen leaf pages plus the hub itself.
//
// Extracted here because the alternative was thirteen pages each hand-typing
// a twelve-item cross-link list (156 hrefs, 156 chances to typo one) and each
// hand-typing the identical `business` object the Base layout needs. Two real
// consumers is the bar this codebase sets for sharing (see comparison.ts,
// locations.ts, navigation.ts) and this has fourteen.
//
// Labels and hrefs are navigation.ts' own, verbatim, so the mega-menu and
// every page's "other premises we clean" band cannot disagree. If a slug
// changes, it changes in navigation.ts and here — and the `astro check` guard
// below is what catches a page pointing at a premises type that no longer
// exists.
//
// ✅ ALL THIRTEEN HREFS ARE CONFIRMED AND ALL THIRTEEN NEST UNDER THE HUB.
// Eleven come from the client's URL sheet of 17 Sep 2026, verbatim. Factories
// and breweries have no row on that sheet; the client settled them separately
// the same day, with the instruction that everything in Commercial sits under
// /commercial-cleaning/, and their slugs follow the convention every sheet row
// uses — singular, ending in -cleaning. Hence factory-cleaning and
// brewery-cleaning rather than the old plural /factories/ and /breweries/.
//
// Nothing in this hub points outside it any more.
import type { LocalBusinessInfo } from '../layouts/Base.astro';
import type { Tag } from '../components/sections/TagCloud.astro';
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';
import { schemaTelephone, contactEmail, walkthroughLabel } from './navigation';

// THE LABELS AND BLURBS LIVE IN PAGES CMS ("Site settings > Cross-links:
// premises", src/content/site/premises.yaml). The thirteen URLs are fixed and
// checked against PremisesHref, so a typo fails the build.

/** Slugs of the thirteen premises pages, as a union so a page cross-linking
 *  a sibling that does not exist is a type error rather than a 404 found by
 *  a reader. */
export type PremisesHref =
  | '/commercial-cleaning/office-cleaning/'
  | '/commercial-cleaning/strata-cleaning/'
  | '/commercial-cleaning/aged-care-cleaning/'
  | '/commercial-cleaning/medical-and-clinic-cleaning/'
  | '/commercial-cleaning/construction-site-cleaning/'
  | '/commercial-cleaning/hospitality-cleaning/'
  | '/commercial-cleaning/commercial-kitchen-cleaning/'
  | '/commercial-cleaning/school-and-childcare-cleaning/'
  | '/commercial-cleaning/gym-and-fitness-cleaning/'
  | '/commercial-cleaning/retail-cleaning/'
  | '/commercial-cleaning/warehouse-and-industrial-cleaning/'
  | '/commercial-cleaning/factory-cleaning/'
  | '/commercial-cleaning/brewery-cleaning/';

export interface PremisesPage {
  label: string;
  href: PremisesHref;
  /** A short phrase for the setting, used where a link needs a reason
   *  attached rather than just a name. Written once here so thirteen pages
   *  describe each other the same way. */
  blurb: string;
}

// Menu order, not alphabetical — the mega-menu's order is the one a reader
// has already seen once by the time they reach a cross-link band.
const PREMISES_HREFS = [
  '/commercial-cleaning/office-cleaning/',
  '/commercial-cleaning/strata-cleaning/',
  '/commercial-cleaning/aged-care-cleaning/',
  '/commercial-cleaning/medical-and-clinic-cleaning/',
  '/commercial-cleaning/construction-site-cleaning/',
  '/commercial-cleaning/hospitality-cleaning/',
  '/commercial-cleaning/commercial-kitchen-cleaning/',
  '/commercial-cleaning/school-and-childcare-cleaning/',
  '/commercial-cleaning/gym-and-fitness-cleaning/',
  '/commercial-cleaning/retail-cleaning/',
  '/commercial-cleaning/warehouse-and-industrial-cleaning/',
  '/commercial-cleaning/factory-cleaning/',
  '/commercial-cleaning/brewery-cleaning/',
] as const satisfies readonly PremisesHref[];

const premisesData = loadData(
  'site/premises',
  z.object({
    pages: z
      .array(z.object({ label: z.string().min(1), href: z.enum(PREMISES_HREFS), blurb: z.string().min(1) }))
      .length(PREMISES_HREFS.length),
    services: z.array(z.object({ label: z.string().min(1), href: z.string().startsWith('/commercial-cleaning/') })),
  }),
);

export const premisesPages: PremisesPage[] = premisesData.pages;

/** The two service-shaped children of the same hub — a premises page's
 *  reader often wants one of these next, and neither is a premises type. */
export const commercialServiceLinks: Tag[] = premisesData.services;

export const commercialHubLink: Tag = {
  label: 'Commercial cleaning',
  href: '/commercial-cleaning/',
};

/**
 * The "other premises we clean" pill list for one leaf page: the other twelve
 * premises types, then the two commercial services, then the hub.
 *
 * Excluding `self` is the whole reason this is a function. A page that links
 * to itself in its own related-pages band reads as a template that nobody
 * checked, and it wastes the one slot in the band a reader might have used.
 */
export const relatedPremises = (self: PremisesHref, extras: Tag[] = []): Tag[] => [
  ...premisesPages.filter((p) => p.href !== self).map(({ label, href }) => ({ label, href })),
  ...extras,
  ...commercialServiceLinks,
  commercialHubLink,
];

/**
 * The LocalBusiness JSON-LD every commercial page hands `Base.astro`.
 *
 * Telephone and email are TLB's real details (client, 23 Sep 2026), matching
 * `footerContact` in navigation.ts.
 *
 * ⚠️ Logo and address are still empty, inherited verbatim from the sibling
 * pages built before this one. Both are real facts TLB holds and neither is
 * in the repo. One fix here now fills all thirteen.
 *
 * ⚠️ `areaServed` is NSW only, following the call commercial-cleaning.astro
 * made. footerContact still claims the Southern Gold Coast. Same open item as
 * on the hub: if TLB does commercial work across the border, this string and
 * every commercial page's `nswLocationGroups` change together.
 */
export const commercialBusiness = (description: string): LocalBusinessInfo => ({
  name: 'TLB Cleaning',
  url: 'https://tlbcleaning.com.au/',
  logo: '',
  telephone: schemaTelephone,
  email: contactEmail,
  address: {
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'AU',
  },
  sameAs: [],
  areaServed: 'Northern Rivers and Tweed, NSW',
  description,
});

/**
 * The site-walkthrough CTA every commercial page leads with, instead of the
 * sitewide "Get an instant quote".
 *
 * Commercial work is priced on floor area, frequency, trading hours and how
 * much of the site is wet area, none of which survive a form — the hub and
 * both commercial service pages already make this call, and the FAQ on each
 * of these thirteen pages says so out loud. `href` still points at the quote
 * flow because that is the only conversion route the site has; the label is
 * what sets the expectation.
 *
 * ⚠️ The label promises a walkthrough. If TLB would rather quote small sites
 * over the phone, this is the one line that changes for all thirteen.
 */
export const walkthroughCtaLabel = walkthroughLabel; // "Site settings > Site-wide buttons" in Pages CMS
