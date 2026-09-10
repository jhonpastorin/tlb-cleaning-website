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
// ⚠️ Every href here is still the flat kebab-case guess navigation.ts made
// from its literal menu label. Unconfirmed sitewide, same as the rest of the
// site's slugs.
import type { LocalBusinessInfo } from '../layouts/Base.astro';
import type { Tag } from '../components/sections/TagCloud.astro';

/** Slugs of the thirteen premises pages, as a union so a page cross-linking
 *  a sibling that does not exist is a type error rather than a 404 found by
 *  a reader. */
export type PremisesHref =
  | '/office-cleaning/'
  | '/strata-and-common-area-cleaning/'
  | '/aged-care-retirement-and-seniors/'
  | '/medical-clinic-and-salon-cleaning/'
  | '/construction-site/'
  | '/hospitality-venues-and-holiday-parks/'
  | '/commercial-kitchen-cleaning/'
  | '/schools-and-childcare-centres/'
  | '/gyms-and-fitness-studios/'
  | '/retail-and-shopfronts/'
  | '/warehouses-and-industrial-sites/'
  | '/factories/'
  | '/breweries/';

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
export const premisesPages: PremisesPage[] = [
  {
    label: 'Office cleaning',
    href: '/office-cleaning/',
    blurb: 'Desks, kitchenettes, bathrooms and glass, after your team goes home.',
  },
  {
    label: 'Strata and common area cleaning',
    href: '/strata-and-common-area-cleaning/',
    blurb: 'Lobbies, lifts, stairwells, carparks and bin rooms on a set schedule.',
  },
  {
    label: 'Aged care, retirement and seniors',
    href: '/aged-care-retirement-and-seniors/',
    blurb: 'Independent living units, corridors and communal rooms, cleaned around residents.',
  },
  {
    label: 'Medical, clinic and salon cleaning',
    href: '/medical-clinic-and-salon-cleaning/',
    blurb: 'Treatment rooms, waiting rooms and wet areas, with the touch points done properly.',
  },
  {
    label: 'Construction site',
    href: '/construction-site/',
    blurb: 'Builders cleans and the final detail clean before handover.',
  },
  {
    label: 'Hospitality, venues and holiday parks',
    href: '/hospitality-venues-and-holiday-parks/',
    blurb: 'Cafés, restaurants, function rooms, cabins and amenities blocks.',
  },
  {
    label: 'Commercial kitchen cleaning',
    href: '/commercial-kitchen-cleaning/',
    blurb: 'Benches, floors, cool rooms and the grease you cannot reach mid-service.',
  },
  {
    label: 'Schools and childcare centres',
    href: '/schools-and-childcare-centres/',
    blurb: 'Classrooms, playrooms and bathrooms, cleaned by a checked team after hours.',
  },
  {
    label: 'Gyms and fitness studios',
    href: '/gyms-and-fitness-studios/',
    blurb: 'Equipment, mats, change rooms and showers, every day.',
  },
  {
    label: 'Retail and shopfronts',
    href: '/retail-and-shopfronts/',
    blurb: 'Floors, glass and the entry, finished before you open the door.',
  },
  {
    label: 'Warehouses and industrial sites',
    href: '/warehouses-and-industrial-sites/',
    blurb: 'Aisles, loading docks, mezzanine offices and amenities.',
  },
  {
    label: 'Factories',
    href: '/factories/',
    blurb: 'Production floors, plant surrounds and crib rooms, around your shutdowns.',
  },
  {
    label: 'Breweries',
    href: '/breweries/',
    blurb: 'Brew deck floors and drains, plus the taproom reset before you open.',
  },
];

/** The two service-shaped children of the same hub — a premises page's
 *  reader often wants one of these next, and neither is a premises type. */
export const commercialServiceLinks: Tag[] = [
  { label: 'Commercial carpet cleaning', href: '/commercial-carpet-cleaning/' },
  { label: 'Commercial pressure cleaning', href: '/commercial-pressure-cleaning/' },
];

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
 * ⚠️ Almost every field is empty, inherited verbatim from the sibling pages
 * built before this one. Logo, telephone, email and address are all real
 * facts TLB holds and none of them are in the repo, so the structured data
 * on every page is thinner than it should be. One fix here now fills all
 * thirteen.
 *
 * ⚠️ `areaServed` is NSW only, following the call commercial-cleaning.astro
 * made. footerContact still claims the Southern Gold Coast. Same open item as
 * on the hub: if TLB does commercial work across the border, this string and
 * every commercial page's `nswLocationGroups` change together.
 */
export const commercialBusiness = (description: string): LocalBusinessInfo => ({
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
export const walkthroughCtaLabel = 'Book a site walkthrough';
