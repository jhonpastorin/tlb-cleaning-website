// Site chrome data — the header's nav (primary bar + teal service band with
// its mega-menus), the header's secondary CTA, and the footer's service
// links/contact/copyright. Extracted from index.astro once a second page
// (house-cleaning.astro) needed the identical header and footer: two real
// consumers is the same bar this codebase sets elsewhere for "worth
// sharing" (see ServiceIcon.astro's own justification in SECTIONS.md).
//
// Page-specific content still lives in each page file — only the chrome
// every page repeats lives here.
import type { MegaMenuNavItem, NavItem, ButtonData } from './types';

// The one quote CTA used by the header, both heroes, and the closing CTA
// blocks. href guessed — no booking/quote URL given, confirm before launch.
export const quoteCta: ButtonData = { label: 'Get an instant quote', href: '/quote/' };

// Header's second CTA, alongside quoteCta — an outline-style secondary
// button per the content roadmap. href guessed — no booking-flow URL
// given, confirm before launch.
export const headerSecondaryCta: ButtonData = { label: 'Book your clean online', href: '/book-online/' };

// The five real service pages, used for the footer's "Services" column and
// for the homepage's "What we do" list. headerNav below mixes real services
// with non-service pages ("Meet the team", "Why TLB", "Guides"), so it is
// NOT safe to derive the footer's services column from it.
export const serviceLinks = [
  {
    title: 'Airbnb and holiday let turnovers',
    description: 'Timed to your bookings, restocked and guest-ready before check-in.',
    href: '/airbnb-cleaning/',
  },
  {
    title: 'End of lease and bond cleans',
    description: 'Cleaned to the standard your exit inspection is measured against, both sides of the border.',
    href: '/end-of-lease-cleaning/',
  },
  {
    title: 'Regular home cleaning',
    description: 'Weekly or fortnightly, same team, set it up once.',
    href: '/house-cleaning/',
  },
  {
    title: 'Real estate and property management',
    description: 'Vacancy turnarounds and managed-property cleans for agencies with a rent roll to protect.',
    href: '/real-estate-cleaning/',
  },
  {
    title: 'Deep and one-off cleans',
    description: 'A full reset when the place has got away from you, or before someone important arrives.',
    href: '/deep-cleaning/',
  },
];

export const footerServiceLinks: NavItem[] = serviceLinks.map(({ title, href }) => ({ label: title, href }));

export const footerContact = {
  phone: '[TBC]',
  email: '[TBC]',
  address: 'Northern Rivers, NSW & Southern Gold Coast, QLD',
};

export const footerCopyright = '© 2026 TLB Cleaning. All rights reserved.';

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Locations', href: '/locations/' },
  { label: 'Contact', href: '/contact/' },
];

// Shared nav/footer content — not covered by the content spec at all
// (it only specifies page sections). Placeholder structure so the page
// renders; confirm real nav destinations and business contact details
// before launch.
//
// headerNav (the site header's teal service band) mixes real services
// with non-service pages ("Meet the team", "Why TLB", "Guides"), so it's
// no longer safe to reuse for the footer's "Services" column the way the
// original 5-item, services-only list was — footerServiceLinks below
// stays services-only, reusing whatWeDoItems' already-real hrefs instead.
//
// Home Cleaning, Commercial, and Areas we clean each carry a `megaMenu`
// transcribed from the "IA & Menu" content roadmap sheet — Level A = the
// item itself, Level B = its children, [bracketed] rows = non-clickable
// group labels (no `label` maps to no `href`, matching MegaMenuGroup).
// None of the sheet's hrefs were specified; every child slug below is a
// flat kebab-case guess from its literal label, following this file's
// existing flat-slug convention (e.g. `/deep-cleaning/`) rather than
// nesting under the parent — confirm before launch. Overlaps with slugs
// already used elsewhere in this file are called out inline where the
// wording differs; one remains open ("End of lease and bond cleaning"
// here, now pointed at the existing `/end-of-lease-cleaning/` used in
// §10's "What we do"). Note "Aged care, retirement and seniors" under
// Commercial → By type of premises is NOT the same page as the
// /senior-home-cleaning/ that content-plans/home-cleaning.md §3 links to:
// that one is commercial cleaning of aged-care premises, this is regular
// domestic cleaning for older clients at home (Home Care Packages, DVA).
// /senior-home-cleaning/ currently has no mega-menu entry of its own.
export const headerNav: MegaMenuNavItem[] = [
  {
    label: 'Home Cleaning',
    href: '/house-cleaning/', // reconciled: the sheet labelled this "Home Cleaning" but the page ships at /house-cleaning/, matching every other reference in this file (see content-plans/home-cleaning.md §0)
    megaMenu: [
      {
        label: 'Inside your home',
        items: [
          { label: 'Deep cleaning', href: '/deep-cleaning/' },
          { label: 'End of lease and bond cleaning', href: '/end-of-lease-cleaning/' }, // reconciled: menu keeps the sheet's fuller label, slug matches the one used at line 239 and in the content plans
          { label: 'Mould cleaning and removal', href: '/mould-cleaning-and-removal/' },
        ],
      },
      {
        label: 'Appliances',
        items: [
          { label: 'Carpet and rug cleaning', href: '/carpet-and-rug-cleaning/' },
          { label: 'Upholstery and lounge cleaning', href: '/upholstery-and-lounge-cleaning/' },
          { label: 'Mattress cleaning', href: '/mattress-cleaning/' },
          { label: 'Tile and grout cleaning', href: '/tile-and-grout-cleaning/' },
          { label: 'Oven, BBQ and appliance cleaning', href: '/oven-bbq-and-appliance-cleaning/' },
          { label: 'Blinds, shutters and ceiling fans', href: '/blinds-shutters-and-ceiling-fans/' },
        ],
      },
      {
        label: 'Outside your home',
        items: [
          { label: 'Window cleaning', href: '/window-cleaning/' },
          { label: 'Gutter cleaning', href: '/gutter-cleaning/' },
          { label: 'Roof cleaning', href: '/roof-cleaning/' },
          { label: 'High pressure cleaning', href: '/high-pressure-cleaning/' },
          { label: 'Exterior house washing', href: '/exterior-house-washing/' },
        ],
      },
      {
        label: 'Specialist cleaning',
        items: [
          { label: 'Airbnb', href: '/airbnb-cleaning/' }, // reuses the existing /airbnb-cleaning/ slug from §3/§10
          { label: 'Real estate cleaners', href: '/real-estate-cleaning/' }, // reuses the existing /real-estate-cleaning/ slug from §3/§10
          { label: 'NDIS cleaning', href: '/ndis-cleaning/' },
        ],
      },
    ],
  },
  {
    label: 'Commercial',
    href: '/commercial-cleaning/',
    megaMenu: [
      {
        label: 'Commercial services',
        items: [
          { label: 'Commercial carpet cleaning', href: '/commercial-carpet-cleaning/' },
          { label: 'Commercial pressure cleaning', href: '/commercial-pressure-cleaning/' },
        ],
      },
      {
        label: 'By type of premises',
        items: [
          { label: 'Office cleaning', href: '/office-cleaning/' },
          { label: 'Strata and common area cleaning', href: '/strata-and-common-area-cleaning/' },
          { label: 'Aged care, retirement and seniors', href: '/aged-care-retirement-and-seniors/' },
          { label: 'Medical, clinic and salon cleaning', href: '/medical-clinic-and-salon-cleaning/' },
          { label: 'Construction site', href: '/construction-site/' },
          { label: 'Hospitality, venues and holiday parks', href: '/hospitality-venues-and-holiday-parks/' },
          { label: 'Commercial kitchen cleaning', href: '/commercial-kitchen-cleaning/' },
          { label: 'Schools and childcare centres', href: '/schools-and-childcare-centres/' },
          { label: 'Gyms and fitness studios', href: '/gyms-and-fitness-studios/' },
          { label: 'Retail and shopfronts', href: '/retail-and-shopfronts/' },
          { label: 'Warehouses and industrial sites', href: '/warehouses-and-industrial-sites/' },
          { label: 'Factories', href: '/factories/' },
          { label: 'Breweries', href: '/breweries/' },
        ],
      },
    ],
  },
  {
    label: 'Areas we clean',
    href: '/locations/',
    // Suburb list per the sheet — NOTE this differs from locationTags (§11's
    // "Where We Clean" TagCloud further down this file): the sheet adds
    // Evans Head and Casino and drops Ocean Shores and Coolangatta. Flagging
    // rather than silently reconciling — confirm which list is current
    // before launch, then bring the other in line.
    megaMenu: [
      {
        label: 'Northern Rivers NSW',
        items: [
          { label: 'Northern Rivers NSW', href: '/locations/northern-rivers-nsw/' },
          { label: 'Byron Bay', href: '/locations/byron-bay/' },
          { label: 'Brunswick Heads', href: '/locations/brunswick-heads/' },
          { label: 'Ballina', href: '/locations/ballina/' },
          { label: 'Lennox Head', href: '/locations/lennox-head/' },
          { label: 'Lismore', href: '/locations/lismore/' },
          { label: 'Alstonville', href: '/locations/alstonville/' },
          { label: 'Kingscliff', href: '/locations/kingscliff/' },
          { label: 'Pottsville', href: '/locations/pottsville/' },
          { label: 'Murwillumbah', href: '/locations/murwillumbah/' },
          { label: 'Evans Head', href: '/locations/evans-head/' },
          { label: 'Casino', href: '/locations/casino/' },
          { label: 'Tweed Heads', href: '/locations/tweed-heads/' },
        ],
      },
      {
        label: 'Southern Gold Coast QLD',
        items: [
          { label: 'Southern Gold Coast QLD', href: '/locations/southern-gold-coast-qld/' },
          { label: 'Burleigh Heads', href: '/locations/burleigh-heads/' },
          { label: 'Palm Beach', href: '/locations/palm-beach/' },
        ],
      },
    ],
  },
  {
    label: 'Meet the team',
    href: '/about/', // guessed destination — no dedicated team page given yet
    megaMenu: [
      {
        label: 'The people',
        items: [
          { label: 'About TLB and Teagan', href: '/about/' }, // same page as the "Meet the team" link itself — this is what that page is
          { label: 'Work with us', href: '/work-with-us/' },
        ],
      },
      {
        label: 'Proof',
        items: [
          { label: 'Reviews', href: '/reviews/' }, // sheet fills this cell pink, unlike every other item's orange — unclear what that signals (existing page? different owner?), flagging rather than guessing
          { label: 'How booking works', href: '/how-booking-works/' },
        ],
      },
    ],
  },
  { label: 'Why TLB', href: '/why-tlb/' }, // guessed slug — sheet shows this column empty, no children, still a plain link
  {
    label: 'Guides',
    href: '/guides/', // guessed slug — no guides/blog section built yet
    megaMenu: [
      {
        label: 'End of lease & tenancy',
        items: [
          { label: 'What the law actually says: end of lease cleaning in NSW and QLD', href: '/guides/what-the-law-actually-says-end-of-lease-cleaning-in-nsw-and-qld/' },
          { label: 'The end of lease cleaning checklist', href: '/guides/the-end-of-lease-cleaning-checklist/' },
          { label: 'How much does end of lease cleaning cost?', href: '/guides/how-much-does-end-of-lease-cleaning-cost/' },
        ],
      },
      {
        label: 'Homes, hosting & commercial',
        items: [
          { label: 'How much does house cleaning cost?', href: '/guides/how-much-does-house-cleaning-cost/' },
          { label: 'Steam, dry or shampoo: which carpet cleaning method?', href: '/guides/steam-dry-or-shampoo-which-carpet-cleaning-method/' },
          { label: 'What is included in a deep clean?', href: '/guides/what-is-included-in-a-deep-clean/' },
          { label: 'The Airbnb turnover checklist', href: '/guides/the-airbnb-turnover-checklist/' },
          { label: 'The Byron Shire 60-day short-stay cap: what it means for hosts', href: '/guides/the-byron-shire-60-day-short-stay-cap-what-it-means-for-hosts/' },
          { label: 'How to choose a commercial cleaner', href: '/guides/how-to-choose-a-commercial-cleaner/' },
        ],
      },
    ],
  },
  // A further column started past "Guides" in the source sheet (visible
  // only as a cut-off "B…" header at the image's right edge) — not
  // transcribed since its content isn't legible. Flag if there's a 7th
  // header item still to add.
];
