// The JSON-LD graph a page puts in its <head>, as one `@graph` per page.
//
// Built to the reviewed "TLB Schema Markup - Correct Implementation" sheet
// (Oct 2026), which replaced the old arrangement of a LocalBusiness block on
// every page plus loose BreadcrumbList and FAQPage blocks. The sheet's shape:
//
//  - ONE BUSINESS ENTITY, `#organization`. The homepage carries it in full
//    (every town, the three core services, the social profiles); About and
//    Contact carry a short copy; every other page only points at its @id.
//  - Every page has a page node, `<url>#webpage`, tied to the site, its
//    breadcrumb trail and what it is about.
//  - Service pages add a Service, `<url>#service`. Location pages add a Place.
//  - Places have one @id across the whole site. A town or region with its own
//    live page is `/locations/<slug>/#place`; the rest are `/locations/#<slug>`.
//
// Nothing here is typed in twice. Titles, FAQ text, breadcrumb labels, the
// town lists and the business details all come from the same data the page
// renders, so the structured data cannot say something the page does not.
// What a page does choose is which FAQ questions go into it: see `faq` below.
import { businessIdentity } from './business';
import { breadcrumbTrail } from './breadcrumbs';
import { allTowns, isNavigableTown, townSlug } from './locations';
import { regions, type Region } from './townPages';
import { regionPages } from './regionPages';
import { premisesPages, commercialServiceLinks } from './premises';

const SITE = 'https://tlbcleaning.com.au/';
const abs = (path: string) => new URL(path, SITE).href;

export const ORGANIZATION_ID = `${SITE}#organization`;
const WEBSITE_ID = `${SITE}#website`;
const LOGO_ID = `${SITE}#logo`;

/** What a page node or a Service links to by @id. */
const ref = (id: string) => ({ '@id': id });

type Node = Record<string, unknown>;

export interface FaqItem {
  question: string;
  answer: string;
}

// The business's one-line description: the opening sentence of the About
// page's definition block, which is how TLB describes itself everywhere.
const ORGANIZATION_DESCRIPTION =
  'TLB Cleaning is a locally owned cleaning company that cleans homes, holiday lets, rental properties and commercial premises across the Northern Rivers, the Tweed and the Southern Gold Coast.';

// ── PLACES ──────────────────────────────────────────────────────────────

const slugOf = (name: string) => name.toLowerCase().replace(/\s+/g, '-');
const regionSlugs = new Set(regionPages.map((r) => r.slug));

const regionPlace = (region: Region): Node => {
  const slug = slugOf(region.label);
  return {
    '@type': 'Place',
    // The Tweed has no overview page (see locations.ts), so it gets a hub anchor.
    '@id': regionSlugs.has(slug) ? `${SITE}locations/${slug}/#place` : `${SITE}locations/#${slug}`,
    name: `${region.label}, ${region.state}`,
  };
};

const regionOf = (town: string) => {
  const region = regions.find((r) => r.towns.includes(town));
  if (!region) throw new Error(`schema.ts: "${town}" is in no region in townPages.ts`);
  return region;
};

/** A town's Place. `contained` adds the region it sits in. */
const townPlace = (town: string, { contained = false } = {}): Node => {
  const region = regionOf(town);
  return {
    '@type': 'Place',
    // Same rule as the links: only a live town page is a URL worth pointing at.
    '@id': isNavigableTown(town) ? `${abs(townSlug(town))}#place` : `${SITE}locations/#${slugOf(town)}`,
    name: `${town}, ${region.state}`,
    ...(contained ? { containedInPlace: regionPlace(region) } : {}),
  };
};

/** The three regions: what every service is offered across. */
const regionPlaces = () => regions.map(regionPlace);

/** Every region, then every town. */
const everyPlace = ({ contained = false } = {}) => [
  ...regionPlaces(),
  ...allTowns.map((town) => townPlace(town, { contained })),
];

// ── THE BUSINESS ────────────────────────────────────────────────────────

const b = businessIdentity;

const postalAddress = () => ({ '@type': 'PostalAddress', ...b.address });

const contactPoint = () => ({
  '@type': 'ContactPoint',
  contactType: 'customer service',
  telephone: b.telephone,
  email: b.email,
  areaServed: 'AU',
  availableLanguage: 'English',
});

// The three services the homepage leads with. Names are the sheet's.
const coreServices = [
  { path: '/airbnb-holiday-home-cleaning/', name: 'Airbnb & Holiday Home Cleaning' },
  { path: '/commercial-cleaning/', name: 'Commercial cleaning' },
  { path: '/house-cleaning/', name: 'Home cleaning' },
];

const offerCatalog = (name: string, services: { path: string; name: string }[]) => ({
  '@type': 'OfferCatalog',
  name,
  itemListElement: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      '@id': `${abs(service.path)}#service`,
      name: service.name,
      url: abs(service.path),
    },
  })),
});

/** The full business entity. Homepage only. */
export const organizationNode = (): Node => ({
  '@type': ['Organization', 'LocalBusiness'],
  '@id': ORGANIZATION_ID,
  name: b.name,
  alternateName: b.alternateName,
  url: b.url,
  logo: { '@type': 'ImageObject', '@id': LOGO_ID, url: b.logo, contentUrl: b.logo },
  image: ref(LOGO_ID),
  description: ORGANIZATION_DESCRIPTION,
  telephone: b.telephone,
  email: b.email,
  address: postalAddress(),
  openingHoursSpecification: b.openingHours.map((hours) => ({
    '@type': 'OpeningHoursSpecification',
    ...hours,
    dayOfWeek: hours.dayOfWeek.map((day) => `https://schema.org/${day}`),
  })),
  contactPoint: contactPoint(),
  areaServed: everyPlace({ contained: true }),
  hasOfferCatalog: offerCatalog('TLB cleaning services', coreServices),
  sameAs: b.sameAs,
});

/** The short business entity About and Contact carry. Contact adds the ways in. */
export const localBusinessNode = ({ contact = false } = {}): Node => ({
  '@type': 'LocalBusiness',
  '@id': ORGANIZATION_ID,
  name: b.name,
  image: b.logo,
  description: ORGANIZATION_DESCRIPTION,
  telephone: b.telephone,
  ...(contact ? { email: b.email } : {}),
  url: b.url,
  address: postalAddress(),
  areaServed: regionPlaces(),
  ...(contact ? { contactPoint: contactPoint() } : {}),
  sameAs: b.sameAs,
});

/** The WebSite. Homepage only; every other page embeds a stub of it. */
export const websiteNode = (): Node => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE,
  name: 'TLB Cleaning',
  alternateName: 'TLB',
  inLanguage: 'en-AU',
  publisher: ref(ORGANIZATION_ID),
});

// ── SERVICES, PLACES, STEPS ─────────────────────────────────────────────

/** The current page's own breadcrumb label: what the menu calls it. */
const pageLabel = (url: string) => breadcrumbTrail(new URL(url).pathname).at(-1)?.label ?? '';

/**
 * A page's Service. `name` defaults to the page's breadcrumb label, which is
 * what the menu calls the service. `areaServed` defaults to the three regions.
 */
export const serviceNode = (
  url: string,
  options: {
    name?: string;
    serviceType?: string;
    description?: string;
    areaServed?: Node[];
    catalog?: Node;
  } = {},
): Node => ({
  '@type': 'Service',
  '@id': `${url}#service`,
  name: options.name ?? pageLabel(url),
  ...(options.serviceType ? { serviceType: options.serviceType } : {}),
  url,
  provider: ref(ORGANIZATION_ID),
  areaServed: options.areaServed ?? regionPlaces(),
  ...(options.description ? { description: options.description } : {}),
  ...(options.catalog ? { hasOfferCatalog: options.catalog } : {}),
});

/** The commercial hub's catalogue: every page under /commercial-cleaning/. */
export const commercialCatalog = () =>
  offerCatalog(
    'Commercial cleaning services',
    [...premisesPages, ...commercialServiceLinks]
      .flatMap(({ href }) => (href ? [{ path: href, name: pageLabel(abs(href)) }] : []))
      .sort((a, b) => a.path.localeCompare(b.path)),
  );

/** /locations/: one service across every region and town. */
export const locationsHubService = (url: string) =>
  serviceNode(url, { name: 'Cleaning and property care', areaServed: everyPlace() });

/** A region page's Place and its Service across the region's towns. */
export const regionNodes = (url: string, regionLabel: string): Node[] => {
  const region = regions.find((r) => `${r.label} ${r.state}` === regionLabel);
  if (!region) throw new Error(`schema.ts: no region called "${regionLabel}" in townPages.ts`);
  return [
    regionPlace(region),
    serviceNode(url, {
      name: `Cleaning and property care in ${region.label}`,
      areaServed: [regionPlace(region), ...region.towns.map((town) => townPlace(town))],
    }),
  ];
};

/** A town page's Place and its Service across the town and its neighbours. */
export const townNodes = (url: string, town: string, nearby: string[]): Node[] => {
  const place = townPlace(town, { contained: true });
  return [
    place,
    serviceNode(url, {
      name: `Cleaning and property care in ${town}`,
      areaServed: [ref(place['@id'] as string), ...nearby.map((t) => townPlace(t))],
    }),
  ];
};

/** A numbered set of steps, named after the page. */
export const howToNode = (url: string, steps: string[]): Node => ({
  '@type': 'HowTo',
  '@id': `${url}#howto`,
  name: pageLabel(url),
  url,
  inLanguage: 'en-AU',
  isPartOf: ref(`${url}#webpage`),
  step: steps.map((name, i) => ({ '@type': 'HowToStep', position: i + 1, name })),
});

// ── THE PAGE ────────────────────────────────────────────────────────────

const questions = (items: FaqItem[]) =>
  items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  }));

/**
 * Leave named questions out of a page's FAQ schema while they stay on the
 * page. The reviewed sheet does this on a handful of pages. Matching is by
 * the question's exact wording, so a question reworded in Pages CMS simply
 * comes back into the schema, which is the safe direction.
 */
export const withoutQuestions = (items: FaqItem[], omit: string[]) =>
  items.filter((item) => !omit.includes(item.question));

export interface PageSchemaOptions {
  /** The canonical URL, with its trailing slash. */
  url: string;
  /** The page's <title>. */
  title: string;
  /**
   * The page node's type. 'FAQPage' when the questions ARE the page: they
   * become its mainEntity. Any other type with `faq` gets a separate FAQPage
   * node, `#faq`, as its mainEntity.
   */
  type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage' | 'FAQPage';
  /** The questions for search, in page order. */
  faq?: FaqItem[];
  /** What the page is about. Defaults to the business, or to the page's
   *  Service when it has one. */
  about?: string;
  /** Set when the page IS the business: About and Contact. */
  mainEntityIsBusiness?: boolean;
  description?: string;
  /** Everything else in the graph: the business, a Service, a Place, steps. */
  nodes?: Node[];
}

/** One page's whole JSON-LD, ready for Base.astro's `schema` prop. */
export function pageSchema(options: PageSchemaOptions) {
  const { url, title, type = 'WebPage', faq = [], nodes = [], description } = options;
  const trail = breadcrumbTrail(new URL(url).pathname);
  const hasWebsite = nodes.some((node) => node['@id'] === WEBSITE_ID);
  const hasService = nodes.some((node) => node['@id'] === `${url}#service`);
  const faqIsPage = type === 'FAQPage';
  const faqNode = !faqIsPage && faq.length > 0;

  const page: Node = {
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    inLanguage: 'en-AU',
    // The homepage carries the WebSite itself; everywhere else gets a stub.
    isPartOf: hasWebsite ? ref(WEBSITE_ID) : { '@type': 'WebSite', '@id': WEBSITE_ID, name: 'TLB Cleaning' },
    ...(trail.length ? { breadcrumb: ref(`${url}#breadcrumb`) } : {}),
    about: ref(options.about ?? (hasService ? `${url}#service` : ORGANIZATION_ID)),
    ...(description ? { description } : {}),
    ...(faqIsPage ? { mainEntity: questions(faq) } : {}),
    ...(faqNode ? { mainEntity: ref(`${url}#faq`) } : {}),
    ...(options.mainEntityIsBusiness ? { mainEntity: ref(ORGANIZATION_ID) } : {}),
  };

  const breadcrumb: Node[] = trail.length
    ? [
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: trail.map((crumb, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: crumb.label,
            item: abs(crumb.href),
          })),
        },
      ]
    : [];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      page,
      ...nodes,
      ...breadcrumb,
      ...(faqNode
        ? [{ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: questions(faq), isPartOf: ref(`${url}#webpage`) }]
        : []),
    ],
  };
}

export type PageSchema = ReturnType<typeof pageSchema>;
