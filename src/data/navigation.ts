// Site chrome data — the header's nav (primary bar + teal service band with
// its mega-menus), the header's secondary CTA, and the footer's service
// links/contact/copyright. Extracted from index.astro once a second page
// (house-cleaning.astro) needed the identical header and footer: two real
// consumers is the same bar this codebase sets elsewhere for "worth
// sharing" (see ServiceIcon.astro's own justification in SECTIONS.md).
//
// Page-specific content still lives in each page file — only the chrome
// every page repeats lives here.
import type { MegaMenuGroup, MegaMenuNavItem, NavItem, ButtonData } from './types';
import {
  visibleNorthernRiversTowns,
  visibleSouthernGoldCoastTowns,
  townSlug,
} from './locations';

// The one quote CTA used by the header, both heroes, and the closing CTA
// blocks. href guessed — no booking/quote URL given, confirm before launch.
export const quoteCta: ButtonData = { label: 'Get an instant quote', href: '/quote/' };

// Header's second CTA, alongside quoteCta — an outline-style secondary
// button per the content roadmap. href guessed — no booking-flow URL
// given, confirm before launch.
export const headerSecondaryCta: ButtonData = { label: 'Book your clean online', href: '/book-online/' };

// The real service pages, used for the footer's "Services" column and for
// the homepage's "Our services" grid. headerNav below mixes real services
// with non-service pages ("Meet the team", "Why TLB", "Guides"), so it is
// NOT safe to derive the footer's services column from it.
//
// Order and descriptions are the home-page brief's "Our services" list
// verbatim (v6, Sept 2026) — that section is the only place the
// descriptions render, so the copy lives with the links rather than in the
// page. Commercial cleaning joined the list in v6; it was the one service
// with a real page (/commercial-cleaning/) that this list had been missing,
// so the footer column gains it too.
export const serviceLinks = [
  {
    title: 'Regular home cleaning',
    description: 'Weekly or fortnightly, same team, set it up once.',
    href: '/house-cleaning/',
  },
  {
    title: 'Deep and one-off cleans',
    description: "A room-by-room reset, before guests, after a party, or when it's just time.",
    href: '/house-cleaning/deep-cleaning/',
  },
  {
    title: 'End of lease and bond cleans',
    description: 'Cleaned to the standard your exit inspection is measured against, both sides of the border.',
    href: '/house-cleaning/end-of-lease-cleaning/',
  },
  {
    title: 'Airbnb and holiday let turnovers',
    description: 'Timed to your bookings, restocked and guest-ready before check-in. Full management available.',
    href: '/airbnb-cleaning/',
  },
  {
    title: 'Real estate and property management',
    description: 'Vacancy turnarounds and managed-property cleans for agencies with a rent roll to protect.',
    href: '/real-estate-cleaning/',
  },
  {
    title: 'Commercial cleaning',
    description: 'Offices, shopfronts and premises, on a schedule that suits how you trade.',
    href: '/commercial-cleaning/',
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
// Home Cleaning and Commercial each carry a `megaMenu` transcribed from the
// "IA & Menu" content roadmap sheet; Areas we clean builds its columns from
// a curated subset of locations.ts (see regionColumns below) — Level A = the
// item itself, Level B = its children, [bracketed] rows = non-clickable
// group labels (no `label` maps to no `href`, matching MegaMenuGroup).
// The three Home Cleaning children now follow the keyword workbook's own
// URL column, which supplied hrefs the earlier IA sheet did not: they nest
// under the parent as `/house-cleaning/deep-cleaning/`,
// `/house-cleaning/end-of-lease-cleaning/` and `/house-cleaning/mould-removal/`.
// That closes the open flat-vs-nested question this comment used to carry,
// and note the third one is `mould-removal`, not the longer
// `mould-cleaning-and-removal` the page file was named after. Every OTHER
// child slug below is still a flat kebab-case guess from its literal label,
// with no href specified anywhere — confirm those before launch. Overlaps
// with slugs already used elsewhere in this file are called out inline
// where the wording differs. Note "Aged care, retirement and seniors" under
// Commercial → By type of premises is NOT the same page as the
// /senior-home-cleaning/ that content-plans/home-cleaning.md §3 links to:
// that one is commercial cleaning of aged-care premises, this is regular
// domestic cleaning for older clients at home (Home Care Packages, DVA).
// /senior-home-cleaning/ currently has no mega-menu entry of its own.

// "Areas we clean" mega-menu columns.
//
// The curated town list this menu shows now lives in locations.ts
// (`visibleNorthernRiversTowns` / `visibleSouthernGoldCoastTowns`) rather than
// here, because the /locations/ hub and every page's "Where we clean" band
// hide the same towns — one subset, one place to edit. That file's own header
// explains what is hidden, what is merely unlinked, and how to un-hide it.
//
// Region headings are the client's exact wording ("Northern Rivers NSW",
// "Southern Gold Coast QLD") and come through locations.ts' groups too, so the
// menu and the hub cannot label the same region differently.
// Kept from when this menu rendered all 56 towns: each region's list is split
// across at most REGION_COL_ROWS rows per column, balanced so the columns of a
// region are within one row of each other. Only a region's FIRST column
// carries the region label — MegaMenuGroup makes `label` optional precisely so
// a continuation column can render as a bare list under the heading above it.
// With the curated list every region fits one column, but the split stays so
// restoring towns doesn't also mean restoring the layout logic.
const REGION_COL_ROWS = 20;

// Towns only: the region itself is the column heading, not a link. The
// "All of <region>" rows that used to head each column are gone at the
// client's request — the region overview pages still exist, they just
// aren't linked from this menu.
const regionColumns = (label: string, towns: string[]): MegaMenuGroup[] => {
  const rows: NavItem[] = towns.map((town) => ({ label: town, href: townSlug(town) }));
  const colCount = Math.ceil(rows.length / REGION_COL_ROWS);
  const perCol = Math.ceil(rows.length / colCount);
  return Array.from({ length: colCount }, (_, col) => ({
    label: col === 0 ? label : undefined,
    items: rows.slice(col * perCol, (col + 1) * perCol),
  }));
};

const headerNavAll: MegaMenuNavItem[] = [
  {
    label: 'Home Cleaning',
    href: '/house-cleaning/', // reconciled: the sheet labelled this "Home Cleaning" but the page ships at /house-cleaning/, matching every other reference in this file (see content-plans/home-cleaning.md §0)
    megaMenu: [
      {
        label: 'Inside your home',
        items: [
          { label: 'Deep cleaning', href: '/house-cleaning/deep-cleaning/' },
          { label: 'End of lease and bond cleaning', href: '/house-cleaning/end-of-lease-cleaning/' }, // reconciled: menu keeps the sheet's fuller label, slug matches the one used at line 239 and in the content plans
          { label: 'Mould cleaning and removal', href: '/house-cleaning/mould-removal/' },
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
    // Shows the curated subset from locations.ts, not the full town list.
    // Every hidden town keeps its page; it just isn't linked from anywhere.
    megaMenu: [
      ...regionColumns('Northern Rivers NSW', visibleNorthernRiversTowns),
      ...regionColumns('Southern Gold Coast QLD', visibleSouthernGoldCoastTowns),
    ],
  },
  {
    label: 'Meet the team',
    // ✅ RESOLVED — all four pages in this menu now exist, and the labels and
    // hrefs below are mirrored in src/data/meetTheTeam.ts, which the four
    // pages read to cross-link each other. This is the same arrangement
    // premises.ts has with the Commercial menu: edit a label or a slug here
    // and there, or the menu and the page bodies drift apart.
    href: '/about/', // the item's own page IS "About TLB and Teagan" (src/pages/about.astro)
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
          // The source sheet filled this cell pink where every other item was
          // orange, which was flagged rather than guessed at. Built as a page
          // like its three siblings; if the pink meant something (a different
          // owner, an existing off-site profile), it still needs saying.
          //
          // ⚠️ The page it points at has no published review on it yet. Every
          // quote slot is a briefing bracket and there is deliberately no star
          // average anywhere — see src/pages/reviews.astro's header.
          { label: 'Reviews', href: '/reviews/' },
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

// ── WHAT THE HEADER SHOWS, vs. what the site has pages for ──────────────
//
// ⚠️ THE ARRAY ABOVE IS NO LONGER WHAT THE HEADER DISPLAYS. At the client's
// request (16 Sep 2026) the labels listed below are HIDDEN, NOT DELETED —
// exactly the arrangement locations.ts already uses for the ~48 towns it
// stopped linking to, and for the same reason: the menu is being trimmed
// back to what TLB wants to sell now, not edited down to what it will sell
// forever. The tree above is untouched, every page still builds, and the
// mega-menu transcription of the IA sheet stays intact as the record of
// what the full menu is meant to be.
//
// To un-hide one, delete its line from this list. To un-hide everything,
// export `headerNavAll` directly — nothing else has to change.
//
// Two whole Level-A items go, children included: "Meet the team" (About TLB
// and Teagan, Work with us, Reviews, How booking works) and "Guides" (all
// nine guide articles). Note what that costs: "Why TLB" is now the only
// item left in the header that is about the business rather than a service,
// and /about/ loses its only header link even though primaryNav still
// carries an "About" row, which is now the sole route to it.
//
// The rest are Level-B children. Hiding all of "Commercial services" and
// all of "Outside your home" empties those two groups, and the filter drops
// an emptied group rather than rendering a heading over nothing — so the
// Home Cleaning panel goes from four columns to three and Commercial from
// two to one.
//
// ⚠️ THESE PAGES ARE NOW ORPHANS, and unlinked is not the same as
// unindexed. Every one of them is still built into dist/ and is still
// reachable and crawlable by URL. If the intent is that nobody finds them
// at all while they are hidden, they need `noindex` (and to come out of any
// sitemap) as well — that is a separate decision and has NOT been made
// here. It is the same open question locations.ts raises about its towns.
//
// ⚠️ THE HEADER IS NOT THE ONLY LINK TO THESE PAGES. premises.ts builds a
// cross-link list in the BODY of all thirteen premises pages, so the eight
// hidden premises below still link to each other and are still linked from
// the five that stay visible. Same for meetTheTeam.ts across the four "Meet
// the team" pages. Hiding a nav item does not orphan a page that another
// page's copy links to — say the word if those body links should go too.
//
// Matching is by label, and the guard below checks every name here against
// the tree above at build time: a label reworded or removed up there fails
// the build instead of quietly un-hiding itself.
const hiddenNavLabels = [
  // Level A, children included.
  'Meet the team',
  'Guides',

  // Commercial → Commercial services (empties the group).
  'Commercial carpet cleaning',
  'Commercial pressure cleaning',

  // Commercial → By type of premises. Leaves office, strata, aged care,
  // medical and construction site.
  'Hospitality, venues and holiday parks',
  'Commercial kitchen cleaning',
  'Schools and childcare centres',
  'Gyms and fitness studios',
  'Retail and shopfronts',
  'Warehouses and industrial sites',
  'Factories',
  'Breweries',

  // Home Cleaning → Appliances. Leaves carpet and rug, tile and grout, and
  // blinds, shutters and ceiling fans.
  'Upholstery and lounge cleaning',
  'Mattress cleaning',
  'Oven, BBQ and appliance cleaning',

  // Home Cleaning → Outside your home (empties the group).
  'Window cleaning',
  'Gutter cleaning',
  'Roof cleaning',
  'High pressure cleaning',
  'Exterior house washing',
];

const hiddenNavLabelSet = new Set(hiddenNavLabels);

const allNavLabels = new Set(
  headerNavAll.flatMap((item) => [
    item.label,
    ...(item.megaMenu ?? []).flatMap((group) => group.items.map((child) => child.label)),
  ]),
);

const missingNavLabels = hiddenNavLabels.filter((label) => !allNavLabels.has(label));
if (missingNavLabels.length) {
  throw new Error(
    `Hidden nav labels no longer exist in headerNavAll: ${missingNavLabels.join(', ')}`,
  );
}

/**
 * The header's service band, with the hidden labels above filtered out.
 * A group whose every item is hidden is dropped rather than rendered as a
 * heading with no list under it; an item left with no groups at all keeps
 * its own href and renders as a plain link.
 */
export const headerNav: MegaMenuNavItem[] = headerNavAll
  .filter((item) => !hiddenNavLabelSet.has(item.label))
  .map((item) => {
    if (!item.megaMenu) return item;
    const megaMenu = item.megaMenu
      .map((group) => ({
        ...group,
        items: group.items.filter((child) => !hiddenNavLabelSet.has(child.label)),
      }))
      .filter((group) => group.items.length > 0);
    return megaMenu.length ? { ...item, megaMenu } : { label: item.label, href: item.href };
  });
