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
  northernRiversTowns,
  tweedTowns,
  southernGoldCoastTowns,
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
// ⚠️ THIS MENU NOW SHOWS ALL 56 TOWNS AGAIN, 16 Sep 2026, at the client's
// request — the full `northernRiversTowns`, `tweedTowns` and
// `southernGoldCoastTowns` arrays, not the eight-town curated subset it had
// been reading. That brings the Tweed back as a region here: it was hidden in
// full, so locations.ts has no visible Tweed list and no Tweed group, and this
// file names that group itself.
//
// ⚠️ READ THIS BEFORE TOUCHING EITHER FILE. The menu and the rest of the
// site now disagree on purpose, and locations.ts' own header still claims they
// cannot. ONLY the header menu was widened. The /locations/ hub and every
// page's "Where we clean" band still read `locationGroups`, which is still the
// curated eight, so a town like Kingscliff is now reachable from the header on
// every page and is listed nowhere else on the site. That asymmetry is the
// instruction, not an oversight — but if what was wanted is all 56 towns
// everywhere, the change belongs in locations.ts' visible arrays instead and
// this block goes back to reading them.
//
// Region headings are the client's exact wording. "Northern Rivers NSW" and
// "Southern Gold Coast QLD" match locations.ts' groups verbatim, so the menu
// and the hub cannot label the same region differently. "The Tweed" is this
// codebase's own prior wording for that group, recovered from the version of
// locations.ts that still had one, and carries no state suffix — that is how
// it always read here, and how townPages.ts still labels it.
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
          // Label reconciled earlier: the menu keeps the IA sheet's fuller wording, and the slug it carried matched the content plans.
          { label: 'End of lease and bond cleaning', href: '/house-cleaning/end-of-lease-cleaning/' },
          { label: 'Mould cleaning and removal', href: '/house-cleaning/mould-removal/' },
        ],
      },
      {
        label: 'Appliances',
        items: [
          { label: 'Carpet and rug cleaning', href: '/carpet-and-rug-cleaning/' },
          { label: 'Upholstery and lounge cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/upholstery-and-lounge-cleaning/'
          { label: 'Mattress cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/mattress-cleaning/'
          { label: 'Tile and grout cleaning', href: '/tile-and-grout-cleaning/' },
          { label: 'Oven, BBQ and appliance cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/oven-bbq-and-appliance-cleaning/'
          { label: 'Blinds, shutters and ceiling fans', href: '/blinds-shutters-and-ceiling-fans/' },
        ],
      },
      {
        label: 'Outside your home',
        items: [
          { label: 'Window cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/window-cleaning/'
          { label: 'Gutter cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/gutter-cleaning/'
          { label: 'Roof cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/roof-cleaning/'
          { label: 'High pressure cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/high-pressure-cleaning/'
          { label: 'Exterior house washing' }, // UNLINKED 16 Sep 2026 — was href: '/exterior-house-washing/'
        ],
      },
      {
        label: 'Specialist cleaning',
        items: [
          { label: 'Airbnb', href: '/airbnb-cleaning/' }, // reuses the existing /airbnb-cleaning/ slug from §3/§10
          { label: 'Real estate cleaners', href: '/real-estate-cleaning/' }, // reuses the existing /real-estate-cleaning/ slug from §3/§10
          { label: 'NDIS cleaning', href: '/ndis-cleaning/' },
          // ADDED 16 Sep 2026, at the client's request, and deliberately
          // without hrefs: none of these four has a page yet. They are in the
          // menu so the services are advertised, and they render as plain
          // text until there is something to send a reader to — the same
          // MegaMenuChild no-href mechanism the unlinked rows use, put to its
          // other purpose. Give a row an href on the day its page ships;
          // nothing else has to change.
          //
          // ⚠️ "Seniors cleaning" is almost certainly the page this codebase
          // has been calling /senior-home-cleaning/ — domestic cleaning for
          // older clients at home (Home Care Packages, DVA), NOT the
          // commercial aged-care premises page already in the Commercial
          // menu. content-plans/home-cleaning.md §3 references that slug and
          // aged-care-retirement-and-seniors.astro knowingly links it as a
          // 404. If they are the same service, that slug is what this row
          // gets, and that known 404 resolves itself. Confirm the label and
          // the slug together rather than guessing one from the other.
          //
          // ⚠️ FORENSIC AND TRAUMA, and HOARDER AND SQUALOR, are not ordinary
          // cleaning work. Both carry real licensing, WHS, biohazard-waste
          // and staff-welfare obligations, and BFD 5.3 already binds what
          // this site may claim about safety and method. Whoever writes these
          // pages should establish what TLB is actually licensed and equipped
          // to do BEFORE any copy exists — the mould page's header is the
          // model for how carefully that has to be scoped, and it had less at
          // stake than these two do.
          { label: 'Forensic and trauma cleaning' },
          { label: 'Hoarder and squalor cleaning' },
          { label: 'Deceased estate cleaning' },
          { label: 'Seniors cleaning' },
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
          { label: 'Commercial carpet cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/commercial-carpet-cleaning/'
          { label: 'Commercial pressure cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/commercial-pressure-cleaning/'
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
          { label: 'Hospitality, venues and holiday parks' }, // UNLINKED 16 Sep 2026 — was href: '/hospitality-venues-and-holiday-parks/'
          { label: 'Commercial kitchen cleaning' }, // UNLINKED 16 Sep 2026 — was href: '/commercial-kitchen-cleaning/'
          { label: 'Schools and childcare centres' }, // UNLINKED 16 Sep 2026 — was href: '/schools-and-childcare-centres/'
          { label: 'Gyms and fitness studios' }, // UNLINKED 16 Sep 2026 — was href: '/gyms-and-fitness-studios/'
          { label: 'Retail and shopfronts' }, // UNLINKED 16 Sep 2026 — was href: '/retail-and-shopfronts/'
          { label: 'Warehouses and industrial sites' }, // UNLINKED 16 Sep 2026 — was href: '/warehouses-and-industrial-sites/'
          { label: 'Factories' }, // UNLINKED 16 Sep 2026 — was href: '/factories/'
          { label: 'Breweries' }, // UNLINKED 16 Sep 2026 — was href: '/breweries/'
        ],
      },
    ],
  },
  {
    label: 'Areas we clean',
    href: '/locations/',
    // Every town in locations.ts, all three regions. The column split above
    // does the rest: Northern Rivers' 28 towns break over two columns of 14,
    // the Tweed's 19 and the Southern Gold Coast's 9 take one each, so the
    // panel is four columns — the same width as the Home Cleaning panel, and
    // the shape this menu had before the curated subset was introduced.
    megaMenu: [
      ...regionColumns('Northern Rivers NSW', northernRiversTowns),
      ...regionColumns('The Tweed', tweedTowns),
      ...regionColumns('Southern Gold Coast QLD', southernGoldCoastTowns),
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
// ⚠️ THE ARRAY ABOVE IS NOT WHAT THE HEADER DISPLAYS. At the client's
// request (16 Sep 2026) the labels below are HIDDEN, NOT DELETED — the same
// arrangement locations.ts uses for towns, and for the same reason: the menu
// is being trimmed to what TLB wants to sell now, not edited down to what it
// will sell forever. The tree above is untouched, so it stays the record of
// what the full menu is meant to be, and every page still builds.
//
// To un-hide one, delete its line. To un-hide everything, export
// `headerNavAll` directly — nothing else has to change.
//
// Both entries are Level-A items, so their children go with them: "Meet the
// team" takes About TLB and Teagan, Work with us, Reviews and How booking
// works; "Guides" takes all nine guide articles. Nothing else is hidden —
// every service, premises and town in the tree above still shows.
//
// What that costs, so nobody has to rediscover it:
//  1. "Why TLB" is now the only header item that is about the business
//     rather than a service.
//  2. /about/ loses its only link in the service band. primaryNav still
//     carries an "About" row, which is now the sole route to it.
//  3. /guides/ and the nine articles lose their only site-wide link. The
//     guides are internally linked from service-page bodies, so they are not
//     fully orphaned, but nothing lists them as a set any more.
//
// ⚠️ UNLINKED IS NOT UNINDEXED. All thirteen pages still build into dist/
// and stay reachable and crawlable by URL. If the intent is that nobody
// finds them while they are hidden, they need `noindex` (and to come out of
// any sitemap) too — a separate decision, NOT made here. It is the same open
// question locations.ts raises about its towns.
//
// ⚠️ meetTheTeam.ts mirrors the "Meet the team" menu and cross-links those
// four pages from each other's BODIES. Those links are untouched, so the
// four pages still reach each other. Only the nav changed.
//
// Matching is by label, and the guard below checks each name against the
// tree at build time: a label reworded or removed up there fails the build
// instead of quietly un-hiding itself.
const hiddenNavLabels = ['Meet the team', 'Guides'];

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
 * Hiding works at either level: a Level-A item goes with its children, and a
 * Level-B child can be hidden on its own. A group left with no items is
 * dropped rather than rendered as a heading over nothing, and an item left
 * with no groups keeps its own href and renders as a plain link.
 */
// ── UNLINKED ROWS ───────────────────────────────────────────
//
// Eighteen rows in the tree above carry no `href` and a
// `// UNLINKED 16 Sep 2026 — was href: ...` comment in its place. They are
// the red cells on the client's colour-coded menu sheet of that date. Each
// still appears in the menu, in its group, in the same order; it just is not
// clickable, because SiteHeader renders a row with no href as a <span>
// instead of an <a> (see MegaMenuChild in types.ts).
//
// TEMPORARY, and the client said so when asking. Relinking one is moving the
// href back out of its comment and deleting the comment — which is why the
// URL is recorded inline on the row rather than in a list here: the thing you
// need is next to the thing you are editing, and neither can drift from the
// other.
//
// This is NOT the same tool as `hiddenNavLabels` below, and the difference is
// worth keeping straight. Hiding takes a row out of the menu; unlinking
// leaves it in and stops it going anywhere. Use hiding when the service
// should not be mentioned, unlinking when it should be advertised but not
// visited yet.
//
// A ROW WITH NO HREF IS NOT ALWAYS AN UNLINKED ONE. The four specialist
// services added on 16 Sep 2026 — forensic and trauma, hoarder and squalor,
// deceased estate, seniors — have no href because they have no page yet,
// not because a page was taken out of reach. They carry no UNLINKED comment
// and nothing about them is temporary in the same way: they start working
// the day someone builds the page and puts an href on the row. The
// distinction matters when reading this menu — an UNLINKED comment means a
// page exists and is being withheld.
//
// WHAT STAYS CLICKABLE, for the record: the whole of "Inside your home" —
// deep cleaning, end of lease and bond cleaning, mould cleaning and removal
// — plus carpet and rug cleaning, tile and grout cleaning, blinds, shutters
// and ceiling fans, Airbnb, real estate cleaners, NDIS cleaning, and five of
// the thirteen premises: office, strata, aged care, medical and construction
// site. Every Level-A item and all 56 towns are untouched.
//
// THREE ROWS WERE RED ON THE SHEET AND ARE LINKED ANYWAY, all corrected by
// the client within a day of the unlinking pass: blinds, shutters and
// ceiling fans first, then deep cleaning and end of lease and bond cleaning
// together. The last two put "Inside your home" back to a fully clickable
// group, which is what you would expect — they are the two most heavily
// built pages on the site. Each was relinked by moving the href back onto
// its row and deleting its UNLINKED comment, which is all relinking one of
// these ever requires.
//
// ⚠️ THE HEADER IS NOT THE ONLY ROUTE TO THESE PAGES, and unlinking one row
// does not make its page unreachable. All eighteen still build, are still
// crawlable by URL, and are still linked from page BODIES — premises.ts
// cross-links all thirteen premises pages, the footer's own service list is
// a separate array in this file, and pages link each other in prose. If the
// intent is that nobody reaches these at all, this change alone does not do
// it; say so and the other surfaces can follow.

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
