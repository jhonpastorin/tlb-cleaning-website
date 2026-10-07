// Site chrome data — the header's nav (primary bar + teal service band with
// its mega-menus), the header's secondary CTA, and the footer's service
// links/contact/copyright. Extracted from index.astro once a second page
// (house-cleaning.astro) needed the identical header and footer: two real
// consumers is the same bar this codebase sets elsewhere for "worth
// sharing" (see ServiceIcon.astro's own justification in SECTIONS.md).
//
// Page-specific content still lives in each page file — only the chrome
// every page repeats lives here.
//
// THE VALUES LIVE IN PAGES CMS (PAGES-CMS-PLAN.md, Phase 2):
//   src/content/site/contact.yaml     phone, email, address, copyright
//   src/content/site/buttons.yaml     the two site-wide CTAs
//   src/content/site/navigation.yaml  primary nav, services list, header menu
// This file validates them and builds the exports every page imports, so no
// page had to change. The decisions recorded below still hold; what changed is
// where an editor makes them.
import { z } from 'astro/zod';
import type { MegaMenuChild, MegaMenuGroup, MegaMenuNavItem, NavItem, ButtonData } from './types';
import { loadData } from '../lib/cms-data';
import {
  northernRiversTowns,
  tweedTowns,
  southernGoldCoastTowns,
  isNavigableTown,
  townSlug,
} from './locations';
import { regionSlugHref } from './regionPages';

const link = z.object({ label: z.string().min(1), href: z.string().min(1) });

const contact = loadData(
  'site/contact',
  z.object({
    phone: z.string().min(1),
    phoneHref: z.string().startsWith('tel:'),
    email: z.string().email(),
    address: z.string().min(1),
    /** The phone number in international form, for the LocalBusiness JSON-LD. */
    schemaTelephone: z.string().min(1),
    copyright: z.string().min(1),
  }),
);

const buttons = loadData(
  'site/buttons',
  z.object({
    quote: link,
    book: link,
    walkthroughLabel: z.string().min(1),
  }),
);

const navData = loadData(
  'site/navigation',
  z.object({
    primary: z.array(link).min(1),
    services: z.array(z.object({ title: z.string().min(1), description: z.string().min(1), href: z.string().min(1) })).min(1),
    header: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.string().optional(),
          hidden: z.boolean().optional(),
          /** Build this item's menu from the town lists instead of `groups`. */
          townMenu: z.boolean().optional(),
          note: z.string().optional(),
          groups: z
            .array(
              z.object({
                label: z.string().optional(),
                items: z.array(
                  z.object({
                    label: z.string().min(1),
                    href: z.string().optional(),
                    /** Listed in the data, kept out of the menu. */
                    hidden: z.boolean().optional(),
                    note: z.string().optional(),
                  }),
                ),
              }),
            )
            .optional(),
        }),
      )
      .min(1),
  }),
);

/** The phone number in international form, for LocalBusiness JSON-LD. */
export const schemaTelephone = contact.schemaTelephone;
export const contactEmail = contact.email;

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
// Changing these two values (site/buttons.yaml, "Site-wide buttons" in Pages
// CMS) moves every CTA on the site, because nothing hardcodes '/quote/' or
// '/book/' anywhere else — pages that build their own CTA objects all read
// `quoteCta.href`.
//
// ⚠️ THE LABELS NOW OVERSTATE WHAT HAPPENS. "Get an instant quote" and "Book
// your clean online" both land on a contact page that has neither a quote flow
// nor a booking flow — though it now carries a real phone and email. The labels
// were left alone because only the destinations were asked about, but they are
// a promise the page does not keep. Worth settling before launch: either build
// the two pages, or reword these to something the contact page delivers.
export const quoteCta: ButtonData = buttons.quote;

// Header's second CTA, alongside quoteCta — an outline-style secondary
// button per the content roadmap. Still rendered on /how-booking-works/, which
// reads it as its hero CTA, even though the header pair itself is hidden
// (see SHOW_HEADER_CTAS in SiteHeader.astro).
export const headerSecondaryCta: ButtonData = buttons.book;

/** The label every commercial page's walkthrough CTA carries. See premises.ts. */
export const walkthroughLabel = buttons.walkthroughLabel;

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
export const serviceLinks = navData.services;

export const footerServiceLinks: NavItem[] = serviceLinks.map(({ title, href }) => ({ label: title, href }));

// The site's real contact details, supplied by the client 23 Sep 2026. This
// is the single source: the footer on all 111 pages, the header's phone CTA
// (via `primaryNav` below), the contact page's failed-submit fallback and the
// LocalBusiness JSON-LD all read from here, so they cannot disagree.
//
// `phoneHref` is kept alongside `phone` rather than derived from it. SiteFooter
// used to build the link by stripping the spaces out of the display number,
// which gives `tel:0404742065` — dialable in Australia, but not from a phone
// roaming on an overseas SIM. The E.164 form works everywhere, and it is the
// same value the header CTA dials.
export const footerContact = {
  phone: contact.phone,
  phoneHref: contact.phoneHref,
  email: contact.email,
  address: contact.address,
};

export const footerCopyright = contact.copyright;

// ⚠️ "CONTACT" REMOVED, 18 Sep 2026, at the client's request, and it was a
// broken link anyway at the time. Its replacement is the phone CTA below.
//
// The phone CTA carries TLB's real number (client, 23 Sep 2026), so it
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
// editing 53 files to add it and 53 more to take it away. The plain links
// before it (Home, About, Locations) are `primary` in site/navigation.yaml.
export const primaryNav: NavItem[] = [
  ...navData.primary,
  { label: footerContact.phone, href: footerContact.phoneHref, phoneCta: true },
  { label: footerContact.email, href: `mailto:${footerContact.email}`, emailCta: true },
];

// ── THE HEADER MENU ─────────────────────────────────────────────────────
//
// `header` in site/navigation.yaml is the FULL menu tree: every Level-A item
// and every Level-B child, including the ones the header does not show. Two
// switches decide what shows, and they are different tools:
//
//   `hidden: true` on a Level-A item takes it, and its children, out of the
//     menu. Use it when the service should not be mentioned.
//   `hidden: true` on a child keeps it in the data and out of the menu. Used
//     for a page that exists but is being withheld, or a page that does not
//     exist yet. Each such row says which in its `note`.
//
// Both are "hidden" rather than one of them being "linked: false" because
// Pages CMS saves an unticked checkbox as false: a `linked` flag would have
// unlinked every row the first time an editor saved the menu.
//
// These used to be done in this file: hiding by a list of labels, unlinking by
// moving a row's href into a `// UNLINKED ... relink to:` comment. Pages CMS
// rewrites the YAML on save and would delete any comment, so both are fields
// now and the URL each row will get stays on the row.
//
// The menu came from the "IA & Menu" content roadmap sheet: Level A = the item
// itself, Level B = its children, [bracketed] rows = non-clickable group
// labels.
//
// ✅ EVERY HOME CLEANING CHILD NESTS UNDER `/house-cleaning/`, 16 Sep 2026,
// from the client's own URL sheet. No child slug in this menu is a guess. Note
// `mould-removal`, not the longer `mould-cleaning-and-removal` the page file
// was originally named after.
//
// ⚠️ FIVE OF THOSE SLUGS ARE NOT JUST RE-PARENTED, THEY ARE RENAMED, and
// the page files were renamed with them, so file name and URL still match:
//   carpet-and-rug-cleaning          → carpet-cleaning
//   upholstery-and-lounge-cleaning   → upholstery-cleaning
//   oven-bbq-and-appliance-cleaning  → oven-cleaning
//   blinds-shutters-and-ceiling-fans → blind-cleaning
//   high-pressure-cleaning           → pressure-cleaning
// The LABELS are untouched — the menu still says "Carpet and rug cleaning"
// over a `/carpet-cleaning/` URL, which is the sheet's own pairing, not a
// mismatch to tidy up.
//
// ⚠️ THE OLD FLAT URLS ARE GONE, no redirects, at the client's call. Anything
// off-site pointing at `/airbnb-cleaning/`, `/real-estate-cleaning/` and the
// twelve others now 404s. Fine pre-launch; it is not fine after, so if this
// site has shipped by the time you read this, that decision needs revisiting
// before anything else gets moved.
//
// Notes on individual rows, kept here because they are for whoever builds
// pages rather than for an editor:
//  - "Home Cleaning" is labelled that on the sheet but ships at
//    /house-cleaning/ (content-plans/home-cleaning.md §0).
//  - "Aged care, retirement and seniors" under Commercial is NOT the same page
//    as /house-cleaning/senior-home-cleaning/: that one is commercial cleaning
//    of aged-care premises, the "Seniors cleaning" row is regular domestic
//    cleaning for older clients at home (Home Care Packages, DVA). The sheet
//    gives /house-cleaning/senior-home-cleaning/ to "Seniors cleaning", which
//    settles it.
//  - The four specialist rows with no page yet (forensic and trauma, hoarder
//    and squalor, deceased estate, seniors) were added 16 Sep 2026 at the
//    client's request so the services are advertised. Forensic and hoarder
//    work carries licensing, WHS, biohazard-waste and staff-welfare
//    obligations, and BFD 5.3 already binds what this site may claim about
//    safety and method: establish what TLB is licensed and equipped to do
//    BEFORE any copy exists. Their notes in the YAML say the same, for editors.
//  - "Reviews" was filled pink on the source sheet where every other item was
//    orange. Built as a page like its siblings; if the pink meant something (a
//    different owner, an existing off-site profile), it still needs saying.
//    The page has no published review quote yet (see src/pages/reviews.astro).
//  - "Why TLB" is a guessed slug; the sheet showed that column empty.
//  - "Contact us" sits immediately after Why TLB at the client's request (18
//    Sep 2026). The two items after it in the data are both hidden, so data
//    order and rendered order only agree here by accident: keep it beside the
//    item it is meant to sit beside.
//  - A further column started past "Guides" in the source sheet (visible only
//    as a cut-off "B…" header) and was not transcribed. Flag if there is a
//    seventh header item still to add.

// "Areas we clean" mega-menu columns, for the item marked `townMenu: true`.
//
// ⚠️ THIS MENU SHOWS LIVE TOWNS ONLY, 18 Sep 2026, at the client's request
// ahead of launch. It reads the same three source arrays as everything else
// and `regionColumns` filters each one through locations.ts' `isNavigableTown`,
// so there is still no second town list anywhere.
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
// all 56 and link the live ones; this menu lists the live ones and nothing
// else. A band is a claim about where TLB works; a menu is a list of pages you
// can open. Do not reconcile them without asking.
//
// The nine NSW-only pages are a further deliberate exception on the band side:
// they render `nswLocationGroups` — the same towns minus Queensland, because
// their own meta and copy stop at the border. locations.ts documents that.
//
// Region headings are the client's exact wording. "Northern Rivers NSW" and
// "Southern Gold Coast QLD" match locations.ts' groups verbatim, so the menu
// and the hub cannot label the same region differently. "The Tweed" carries no
// state suffix, which is how it always read here and how townPages.ts still
// labels it.
//
// Kept from when this menu rendered all 56 towns: each region's list is split
// across at most REGION_COL_ROWS rows per column, balanced so the columns of a
// region are within one row of each other. Only a region's FIRST column
// carries the region label — MegaMenuGroup makes `label` optional precisely so
// a continuation column can render as a bare list under the heading above it.
// At fourteen live towns every region fits one column and the split never
// fires, but it stays so that going live with more towns doesn't also mean
// rebuilding the layout logic.
const REGION_COL_ROWS = 20;

// ✅ THE "ALL OF <REGION>" ROW IS BACK, 16 Sep 2026, for the two regions with
// an overview page (/locations/northern-rivers/ and
// /locations/southern-gold-coast/, see src/data/regionPages.ts). The row
// carries the region's full heading label, and only the first column of a
// multi-column region gets one.
//
// ⚠️ TWO OF THE THREE REGIONS CARRY IT, NOT ALL THREE — the Tweed's went on
// 21 Sep 2026 at the client's request, along with the page it pointed at. The
// call site below omits `regionHref`, which is why the parameter is optional
// and why a region with no overview page still renders its towns.
const regionColumns = (label: string, towns: string[], regionHref?: string): MegaMenuGroup[] => {
  // Every row here is a link, because a town with no live page is not listed
  // at all rather than shown as plain text. Un-hiding a town is one edit: add
  // it to the live towns ("Locations" in Pages CMS) and it appears here, gains
  // its link in every band, and becomes clickable on its region page.
  const rows: MegaMenuChild[] = towns
    .filter(isNavigableTown)
    .map((town) => ({ label: town, href: townSlug(town) }));
  // Split the TOWNS across columns, then put the region row on top of the
  // first one, so the column balance is a function of the town count alone.
  //
  // `Math.max(1, …)` so a region with no live towns yet still renders its own
  // row rather than vanishing from the menu entirely.
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

const townMenu: MegaMenuGroup[] = [
  ...regionColumns('Northern Rivers NSW', northernRiversTowns, regionSlugHref('northern-rivers')),
  // ⚠️ NO OVERVIEW ROW FOR THE TWEED, 21 Sep 2026, at the client's request.
  // /locations/the-tweed/ was deleted in the same change — regionPages.ts has
  // the full note. The heading and the town links are unaffected.
  ...regionColumns('The Tweed', tweedTowns),
  ...regionColumns('Southern Gold Coast QLD', southernGoldCoastTowns, regionSlugHref('southern-gold-coast')),
];

const townMenuItems = navData.header.filter((item) => item.townMenu);
if (townMenuItems.length > 1) {
  throw new Error('site/navigation.yaml: only one header item can be the town menu (townMenu: true)');
}

// ── WHAT THE HEADER SHOWS ───────────────────────────────────────────────
//
// ⚠️ HIDDEN, NOT DELETED, 16 Sep 2026, at the client's request: "Meet the
// team" and "Guides" carry `hidden: true`. The menu is being trimmed to what
// TLB wants to sell now, not edited down to what it will sell forever, so the
// full tree stays in the data as the record of what the menu is meant to be.
//
// What hiding those two costs, so nobody has to rediscover it:
//  1. "Why TLB" is now the only header item that is about the business
//     rather than a service.
//  2. /about/ loses its only link in the service band. primaryNav still
//     carries an "About" row, which is now the sole route to it.
//  3. /guides/ and the nine articles lose their only site-wide link. The
//     guides are internally linked from service-page bodies, so they are not
//     fully orphaned, but nothing lists them as a set any more.
//
// ⚠️ meetTheTeam.ts cross-links those four pages from each other's BODIES.
// Those links are untouched; only the nav changed.
//
// ⚠️ LINK-ONLY MENUS, 18 Sep 2026, at the client's request: every mega-menu
// drops a child that is not linked instead of rendering it as plain text, so
// the menus list only what a reader can actually open.
//
// ⚠️ THIS HIDES 18 BUILT, WORKING PAGES AND THAT WAS THE EXPLICIT CALL. Of the
// 22 hidden children, only four have no page at all (forensic
// and trauma, hoarder and squalor, deceased estate, seniors). The other
// eighteen are finished pages that ship in every build and are reachable by
// URL:
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
// The client was shown that before choosing it: "link the eighteen and drop
// the four" versus "drop all twenty-two", and they chose the latter. Three rows
// red on the client's sheet were relinked within a day (blinds, deep cleaning,
// end of lease), which is all relinking one ever takes: untick "Hidden".
//
// ⚠️ UNLINKED IS NOT UNINDEXED. Those pages still build into dist/, stay
// crawlable by URL and are still linked from page BODIES (premises.ts
// cross-links all thirteen premises pages). Site-wide `noindex` covers this
// while SITE_ENV is not production (site-env.ts), but the day the site goes
// live they become indexable with nothing in the menu pointing at them — the
// same open question locations.ts records for the unlinked town pages. There
// is no sitemap in this project, so there is nothing to exclude them from.
//
// A group left with no linked children is dropped rather than rendered as a
// bare heading. "Outside your home" and "By type of premises" empty out
// completely under this rule, so those two columns disappear from their
// panels. An item left with no groups keeps its own href and renders as a
// plain link.
export const headerNav: MegaMenuNavItem[] = navData.header
  .filter((item) => !item.hidden)
  .map((item): MegaMenuNavItem => {
    const megaMenu = item.townMenu
      ? townMenu
      : (item.groups ?? [])
          .map((group) => ({
            label: group.label,
            items: group.items
              .filter((child) => child.href && !child.hidden)
              .map(({ label, href }) => ({ label, href })),
          }))
          .filter((group) => group.items.length > 0);
    return megaMenu.length ? { label: item.label, href: item.href, megaMenu } : { label: item.label, href: item.href };
  });
