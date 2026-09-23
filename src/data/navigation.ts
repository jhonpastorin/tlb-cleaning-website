// Site chrome data — the header's nav (primary bar + teal service band with
// its mega-menus), the header's secondary CTA, and the footer's service
// links/contact/copyright. Extracted from index.astro once a second page
// (house-cleaning.astro) needed the identical header and footer: two real
// consumers is the same bar this codebase sets elsewhere for "worth
// sharing" (see ServiceIcon.astro's own justification in SECTIONS.md).
//
// Page-specific content still lives in each page file — only the chrome
// every page repeats lives here.
import type { MegaMenuChild, MegaMenuGroup, MegaMenuNavItem, NavItem, ButtonData } from './types';
import {
  northernRiversTowns,
  tweedTowns,
  southernGoldCoastTowns,
  isNavigableTown,
  townSlug,
} from './locations';
import { regionSlugHref } from './regionPages';

// ⚠️ BOTH CTAs POINT AT /contact/ FOR NOW, 18 Sep 2026, at the client's
// request. Their real destinations are built here and are the values to
// restore:
//
//     quoteCta           href: '/quote/'
//     headerSecondaryCta href: '/book/'
//
// NEITHER OF THOSE PAGES EXISTS. There is no src/pages/quote.astro and no
// src/pages/book.astro, and there never has been — the hrefs were guessed when
// this file was written, flagged "confirm before launch", and never confirmed.
// So every CTA on the site was a 404 until this change: the heroes, the
// closing bands, the service cards, the lot. Pointing them at the contact page
// is the interim fix, and it is a real one rather than a cosmetic one.
//
// Changing these two lines moves every CTA on the site, because nothing
// hardcodes '/quote/' or '/book/' anywhere else — pages that build their own
// CTA objects all read `quoteCta.href`. Restoring them is the same two lines.
//
// ⚠️ THE LABELS NOW OVERSTATE WHAT HAPPENS. "Get an instant quote" and "Book
// your clean online" both land on a contact page that has neither a quote flow
// nor a booking flow — though it now carries a real phone and email. The labels
// were left alone because only the destinations were asked about, but they are
// a promise the page does not keep. Worth settling before launch: either build
// the two pages, or reword these to something the contact page delivers.
export const quoteCta: ButtonData = { label: 'Get an instant quote', href: '/contact/' };

// Header's second CTA, alongside quoteCta — an outline-style secondary
// button per the content roadmap. Still rendered on /how-booking-works/, which
// reads it as its hero CTA, even though the header pair itself is hidden
// (see SHOW_HEADER_CTAS in SiteHeader.astro).
export const headerSecondaryCta: ButtonData = { label: 'Book your clean online', href: '/contact/' };

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
    href: '/house-cleaning/airbnb-cleaning/',
  },
  {
    title: 'Real estate and property management',
    description: 'Vacancy turnarounds and managed-property cleans for agencies with a rent roll to protect.',
    href: '/house-cleaning/real-estate-cleaning/',
  },
  {
    title: 'Commercial cleaning',
    description: 'Offices, shopfronts and premises, on a schedule that suits how you trade.',
    href: '/commercial-cleaning/',
  },
];

export const footerServiceLinks: NavItem[] = serviceLinks.map(({ title, href }) => ({ label: title, href }));

// The site's real contact details, supplied by the client 23 Sep 2026. This
// is the single source: the footer on all 111 pages, the header's phone CTA
// (via `primaryNav` below) and the contact page's failed-submit fallback all
// read from here, so they cannot disagree.
//
// `phoneHref` is kept alongside `phone` rather than derived from it. SiteFooter
// used to build the link by stripping the spaces out of the display number,
// which gives `tel:0404742065` — dialable in Australia, but not from a phone
// roaming on an overseas SIM. The E.164 form works everywhere, and it is the
// same value the header CTA dials.
export const footerContact = {
  phone: '0404 742 065',
  phoneHref: 'tel:+61404742065',
  email: 'hello@tlbcleaning.com.au',
  address: 'Northern Rivers, NSW & Southern Gold Coast, QLD',
};

export const footerCopyright = '© 2026 TLB Cleaning. All rights reserved.';

// ⚠️ "CONTACT" REMOVED, 18 Sep 2026, at the client's request, and it was a
// broken link anyway: there is no src/pages/contact.astro in this repo and
// there never has been, so that item 404'd on all 110 pages. Its replacement
// is the phone CTA below.
//
// ⚠️ /contact/ IS STILL LINKED FROM SIX PLACES AND STILL 404s — the "Contact
// us" item added to the service bar below (headerNavAll, right of Why TLB, at
// the client's request later the same day), plus five body CTAs in
// commercial-cleaning, mattress-cleaning, ndis-cleaning, upholstery-cleaning
// and work-with-us, all labelled some variant of "Talk to us". Removing this
// primary-nav item did not fix those. One contact page fixes all six.
//
// The phone CTA now carries TLB's real number (client, 23 Sep 2026), so it
// renders as a dialable <a> rather than the inert <button> a placeholder got.
// It reads `footerContact` rather than repeating the digits, so the header and
// the footer cannot drift apart.
//
// The email sits beside it as a second pill, same block, same treatment (the
// client's request, 23 Sep 2026). Both read `footerContact`, so the header,
// the footer and the contact page's fallback are one set of details.
//
// It rides in `primaryNav` rather than arriving as its own SiteHeader prop
// because all 53 call sites already pass this array — a new prop would mean
// editing 53 files to add it and 53 more to take it away.
export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Locations', href: '/locations/' },
  { label: footerContact.phone, href: footerContact.phoneHref, phoneCta: true },
  { label: footerContact.email, href: `mailto:${footerContact.email}`, emailCta: true },
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
// ✅ EVERY HOME CLEANING CHILD NOW NESTS UNDER `/house-cleaning/`,
// 16 Sep 2026, from the client's own URL sheet. Three of them already did
// (deep cleaning, end of lease, mould removal, from the keyword workbook);
// the other seventeen were flat kebab-case guesses off their labels, and the
// sheet replaced every one of them. No child slug in this menu is a guess any
// more. Note `mould-removal`, not the longer `mould-cleaning-and-removal` the
// page file was originally named after.
//
// ⚠️ FIVE OF THOSE SLUGS ARE NOT JUST RE-PARENTED, THEY ARE RENAMED, and
// the page files were renamed with them, so file name and URL still match:
//   carpet-and-rug-cleaning          → carpet-cleaning
//   upholstery-and-lounge-cleaning   → upholstery-cleaning
//   oven-bbq-and-appliance-cleaning  → oven-cleaning
//   blinds-shutters-and-ceiling-fans → blind-cleaning
//   high-pressure-cleaning           → pressure-cleaning
// The LABELS above each row are untouched — the menu still says "Carpet and
// rug cleaning" over a `/carpet-cleaning/` URL, which is the sheet's own
// pairing, not a mismatch to tidy up.
//
// ⚠️ THE OLD FLAT URLS ARE GONE, no redirects, at the client's call. Anything
// off-site pointing at `/airbnb-cleaning/`, `/real-estate-cleaning/` and the
// twelve others now 404s. Fine pre-launch; it is not fine after, so if this
// site has shipped by the time you read this, that decision needs revisiting
// before anything else gets moved.
//
// Note "Aged care, retirement and seniors" under Commercial → By type of
// premises is NOT the same page as the
// /house-cleaning/senior-home-cleaning/ that content-plans/home-cleaning.md §3 links to:
// that one is commercial cleaning of aged-care premises, this is regular
// domestic cleaning for older clients at home (Home Care Packages, DVA).
// The sheet gives /house-cleaning/senior-home-cleaning/ to the "Seniors
// cleaning" row below, so it now has a menu entry — it just has no page yet.

// "Areas we clean" mega-menu columns.
//
// ⚠️ THIS MENU SHOWS LIVE TOWNS ONLY, 18 Sep 2026, at the client's request
// ahead of launch. It reads the same three source arrays as everything else
// and `regionColumns` filters each one through locations.ts' `isNavigableTown`,
// so there is still no second town list anywhere in this file.
//
// ⚠️ THE MENU AND THE BANDS DIFFER ON PURPOSE, AND IT IS NOT THE OLD BUG.
// This is the third arrangement in three days, so it is worth being precise
// about which one is current:
//
//   16 Sep — the menu listed all 56 and linked fourteen; the hub and the bands
//     listed a curated eight. Nobody had decided that; it was drift.
//   18 Sep, morning — the client asked for the bands to match the menu's
//     linked set, so both showed the same fourteen.
//   18 Sep, afternoon — the client asked for the bands to NAME all 56 and link
//     only the live pages, and then, separately, for THIS MENU ALONE to drop
//     to the live towns. Both instructions were explicit.
//
// So the current, intended state is: every band and the /locations/ hub name
// all 56 and link fourteen; this menu lists those fourteen and nothing else.
// A band is a claim about where TLB works; a menu is a list of pages you can
// open. Do not reconcile them without asking.
//
// The nine NSW-only pages are a further deliberate exception on the band side:
// they render `nswLocationGroups` — the same towns minus Queensland, because
// their own meta and copy stop at the border. locations.ts documents that.
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
// At fourteen live towns every region fits one column and the split never
// fires, but it stays so that going live with more towns doesn't also mean
// rebuilding the layout logic.
const REGION_COL_ROWS = 20;

// ✅ THE "ALL OF <REGION>" ROW IS BACK, 16 Sep 2026. It headed each column
// once, was removed at the client's request, and could not simply be put
// back afterwards because the region overview pages it pointed at had never
// been built. Two of them exist now — /locations/northern-rivers/ and
// /locations/southern-gold-coast/, see src/data/regionPages.ts — so those two
// regions' FIRST column leads with a link to its own page, above its towns.
// The Tweed has no such page (see below), so its column is towns only.
//
// The row carries the region's full heading label, which is what the client's
// sheet showed and which also stops it reading as a stray town. Only the
// first column of a multi-column region gets one: a continuation column is a
// bare list under the heading above it, and a second "Northern Rivers NSW"
// halfway across the panel would read as a second region.
//
// ⚠️ TWO OF THE THREE REGIONS CARRY IT, NOT ALL THREE — the Tweed's went on
// 21 Sep 2026 at the client's request, along with the page it pointed at. The
// call site below omits `regionHref`, which is why the parameter is optional
// and why a region with no overview page still renders its towns.
const regionColumns = (label: string, towns: string[], regionHref?: string): MegaMenuGroup[] => {
  // ⚠️ THE MENU LISTS LIVE TOWNS ONLY, 18 Sep 2026, at the client's request
  // ahead of launch. Every row here is a link, because a town with no live
  // page is not listed at all rather than shown as plain text.
  //
  // THIS IS THE ONE SURFACE THAT FILTERS. Every "Where we clean" band and the
  // /locations/ hub still NAME all 56 and link these same fourteen — the
  // client asked for that explicitly and then asked for the menu alone to
  // change. So the asymmetry is the instruction: a band is a claim about where
  // TLB works, and this menu is a list of pages you can open. Do not "fix" one
  // to match the other.
  //
  // Un-hiding is still one edit in one place: add the town to
  // locations.ts' `navigableTowns` and it appears here, gains its link in
  // every band, and becomes clickable on its region page.
  const rows: MegaMenuChild[] = towns
    .filter(isNavigableTown)
    .map((town) => ({ label: town, href: townSlug(town) }));
  // Split the TOWNS across columns, then put the region row on top of the
  // first one. Doing it in this order keeps the column balance a function of
  // the town count alone, so adding the row cannot push a town into a second
  // column on its own.
  //
  // `Math.max(1, …)` so a region with no live towns yet still renders its own
  // row rather than vanishing from the menu entirely — the region pages are
  // live whatever the town list does, and a silently missing region would be
  // the hard kind of bug to notice.
  const colCount = Math.max(1, Math.ceil(rows.length / REGION_COL_ROWS));
  const perCol = Math.ceil(rows.length / colCount);
  return Array.from({ length: colCount }, (_, col) => ({
    label: col === 0 ? label : undefined,
    items: [
      ...(col === 0 && regionHref ? [{ label, href: regionHref }] : []),
      ...rows.slice(col * perCol, (col + 1) * perCol),
    ],
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
          { label: 'Carpet and rug cleaning', href: '/house-cleaning/carpet-cleaning/' },
          { label: 'Upholstery and lounge cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/upholstery-cleaning/'
          { label: 'Mattress cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/mattress-cleaning/'
          { label: 'Tile and grout cleaning', href: '/house-cleaning/tile-and-grout-cleaning/' },
          { label: 'Oven, BBQ and appliance cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/oven-cleaning/'
          { label: 'Blinds, shutters and ceiling fans', href: '/house-cleaning/blind-cleaning/' },
        ],
      },
      {
        label: 'Outside your home',
        items: [
          { label: 'Window cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/window-cleaning/'
          { label: 'Gutter cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/gutter-cleaning/'
          { label: 'Roof cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/roof-cleaning/'
          { label: 'High pressure cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/pressure-cleaning/'
          { label: 'Exterior house washing' }, // UNLINKED 16 Sep 2026 — relink to: '/house-cleaning/exterior-house-washing/'
        ],
      },
      {
        label: 'Specialist cleaning',
        items: [
          { label: 'Airbnb', href: '/house-cleaning/airbnb-cleaning/' }, // same page as §3/§10's Airbnb service, now nested
          { label: 'Real estate cleaners', href: '/house-cleaning/real-estate-cleaning/' }, // same page as §3/§10's real estate service, now nested
          { label: 'NDIS cleaning', href: '/house-cleaning/ndis-cleaning/' },
          // ADDED 16 Sep 2026, at the client's request, and deliberately
          // without hrefs: none of these four has a page yet. They are in the
          // menu so the services are advertised, and they render as plain
          // text until there is something to send a reader to — the same
          // MegaMenuChild no-href mechanism the unlinked rows use, put to its
          // other purpose. Give a row an href on the day its page ships;
          // nothing else has to change.
          //
          // ⚠️ "Seniors cleaning" is almost certainly the page this codebase
          // has been calling /house-cleaning/senior-home-cleaning/ — domestic cleaning for
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
          //
          // The client's URL sheet of 16 Sep 2026 gives a slug for three of
          // these four, recorded here so nobody has to guess one when the page
          // is built: put the URL on the row, delete the comment, done. They
          // stay hrefless until then — a row pointing at a page that does not
          // exist is a 404, which is the one thing the no-href mechanism is
          // there to avoid. Deceased estate cleaning is the exception: that
          // sheet lists no URL for it at all, so it has nothing recorded and
          // needs one confirmed before it can ship.
          { label: 'Forensic and trauma cleaning' }, // NO PAGE YET — sheet says '/house-cleaning/forensic-cleaning/'
          { label: 'Hoarder and squalor cleaning' }, // NO PAGE YET — sheet says '/house-cleaning/hoarder-cleaning/'
          { label: 'Deceased estate cleaning' }, // NO PAGE YET, and no URL on the sheet either
          { label: 'Seniors cleaning' }, // NO PAGE YET — sheet says '/house-cleaning/senior-home-cleaning/', which settles the ⚠️ above: it IS the senior-home-cleaning page
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
          { label: 'Commercial carpet cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/commercial-carpet-cleaning/'
          { label: 'Commercial pressure cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/commercial-pressure-cleaning/'
        ],
      },
      {
        label: 'By type of premises',
        items: [
          { label: 'Office cleaning', href: '/commercial-cleaning/office-cleaning/' },
          { label: 'Strata and common area cleaning', href: '/commercial-cleaning/strata-cleaning/' },
          { label: 'Aged care, retirement and seniors', href: '/commercial-cleaning/aged-care-cleaning/' },
          { label: 'Medical, clinic and salon cleaning', href: '/commercial-cleaning/medical-and-clinic-cleaning/' },
          { label: 'Construction site', href: '/commercial-cleaning/construction-site-cleaning/' },
          { label: 'Hospitality, venues and holiday parks' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/hospitality-cleaning/'
          { label: 'Commercial kitchen cleaning' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/commercial-kitchen-cleaning/'
          { label: 'Schools and childcare centres' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/school-and-childcare-cleaning/'
          { label: 'Gyms and fitness studios' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/gym-and-fitness-cleaning/'
          { label: 'Retail and shopfronts' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/retail-cleaning/'
          { label: 'Warehouses and industrial sites' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/warehouse-and-industrial-cleaning/'
          { label: 'Factories' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/factory-cleaning/'
          { label: 'Breweries' }, // UNLINKED 16 Sep 2026 — relink to: '/commercial-cleaning/brewery-cleaning/'
        ],
      },
    ],
  },
  {
    label: 'Areas we clean',
    href: '/locations/',
    // All three regions, each filtered to its live towns by `regionColumns`.
    // That is currently 8 + 4 + 2, so every region fits one column and the
    // panel is three columns rather than the four it took at 56 towns. The
    // split logic still runs, so restoring towns restores the wider panel
    // without a layout change here.
    megaMenu: [
      ...regionColumns('Northern Rivers NSW', northernRiversTowns, regionSlugHref('northern-rivers')),
      // ⚠️ NO OVERVIEW ROW FOR THE TWEED, 21 Sep 2026, at the client's request.
      // Omitting `regionHref` is what drops it: this column heads straight
      // into its towns while the other two still lead with their own page.
      //
      // There is nothing left to link. /locations/the-tweed/ was deleted in
      // the same change — regionPages.ts has the full note. The heading and
      // the town links here are deliberate and unaffected: the region is
      // still named and its live town pages are still reachable.
      ...regionColumns('The Tweed', tweedTowns),
      ...regionColumns('Southern Gold Coast QLD', southernGoldCoastTowns, regionSlugHref('southern-gold-coast')),
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
  // ⚠️ THIS LINK 404s TODAY. There is no src/pages/contact.astro in this repo
  // and there never has been. "Contact" was removed from the primary nav
  // earlier today partly for that reason; the client then asked for a "Contact
  // us" item here, to the right of Why TLB, so it is added as asked — but the
  // page has to be built before launch or this ships a broken link in the main
  // navigation, which is worse than the primary-nav one was because this bar
  // is on all 110 pages and is the site's main wayfinding.
  //
  // Five body CTAs already point at /contact/ and 404 for the same reason (in
  // commercial-cleaning, mattress-cleaning, ndis-cleaning, upholstery-cleaning
  // and work-with-us), so building that one page fixes six links at once.
  //
  // Placed immediately after Why TLB rather than at the end of the array
  // because the two entries that follow — Guides and Meet the team — are both
  // in `hiddenNavLabels`, so array position and rendered position only agree
  // here by accident. Keep it adjacent to the item it is meant to sit beside.
  { label: 'Contact us', href: '/contact/' },
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
// and stay reachable and crawlable by URL.
//
// On staging this is covered site-wide by site-env.ts, which puts `noindex` on
// every page unless SITE_ENV=production. But that switch is blanket, not
// per-page: at launch these thirteen become indexable again with everything
// else. Whether they should is still open, and it is the same question
// locations.ts raises about its towns.
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
// `// UNLINKED 16 Sep 2026 — relink to: ...` comment in its place. They are
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
// THE URL ON AN UNLINKED ROW IS THE ONE IT WILL GET, not the one it had. On
// 17 Sep 2026 all thirteen Commercial premises rows moved under the
// /commercial-cleaning/ parent, unlinked rows included, so ten of these
// comments now carry a URL their row has never been served at. Relinking one
// still works exactly the same way: move the href out of the comment, delete
// the comment. Nothing about the unlinking mechanism changed.
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

// ⚠️ LINK-ONLY MENUS, 18 Sep 2026, at the client's request: every mega-menu
// now drops any child without an href instead of rendering it as plain text.
// So the menus list only what a reader can actually open.
//
// ⚠️ THIS HIDES 18 BUILT, WORKING PAGES AND THAT WAS THE EXPLICIT CALL. Of the
// 22 children this removes, only four have no page at all — Forensic and
// trauma cleaning, Hoarder and squalor cleaning, Deceased estate cleaning and
// Seniors cleaning. The other eighteen are finished pages that ship in every
// build and are reachable by URL:
//
//   Home Cleaning  window-cleaning, gutter-cleaning, roof-cleaning,
//                  pressure-cleaning, exterior-house-washing,
//                  upholstery-cleaning, mattress-cleaning, oven-cleaning
//   Commercial     commercial-carpet-cleaning, commercial-pressure-cleaning,
//                  hospitality-cleaning, commercial-kitchen-cleaning,
//                  school-and-childcare-cleaning, gym-and-fitness-cleaning,
//                  retail-cleaning, warehouse-and-industrial-cleaning,
//                  factory-cleaning, brewery-cleaning
//
// They were unlinked in headerNavAll above, not unbuilt, and the client was
// shown that before choosing this. It was put to them as "link the eighteen
// and drop the four" versus "drop all twenty-two" and they chose the latter.
// TO PUT ANY OF THEM BACK, add its href in headerNavAll — nothing here needs
// touching, because this filter only ever removes hrefless children.
//
// ⚠️ THOSE 18 ARE NOW ORPHANS, and unlinked is not unindexed. They still build
// into dist/ and stay crawlable by URL. Site-wide `noindex` covers this while
// SITE_ENV is not production (site-env.ts), but the day the site goes live
// they become indexable with nothing linking to them — the same open question
// locations.ts records for the hidden town pages. There is no sitemap in this
// project, so there is nothing to exclude them from.
//
// A group left with no children is dropped rather than rendered as a bare
// heading, which the filter below already did for hidden labels. "Outside your
// home" and "By type of premises" empty out completely under this rule, so
// those two columns disappear from their panels.
export const headerNav: MegaMenuNavItem[] = headerNavAll
  .filter((item) => !hiddenNavLabelSet.has(item.label))
  .map((item) => {
    if (!item.megaMenu) return item;
    const megaMenu = item.megaMenu
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (child) => child.href && !hiddenNavLabelSet.has(child.label),
        ),
      }))
      .filter((group) => group.items.length > 0);
    return megaMenu.length ? { ...item, megaMenu } : { label: item.label, href: item.href };
  });
