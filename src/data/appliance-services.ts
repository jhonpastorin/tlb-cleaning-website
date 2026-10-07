// The six "Appliances" services from the Home Cleaning mega-menu
// (navigation.ts), in menu order, plus the helper each of their pages uses to
// link the other five.
//
// WHY THIS IS SHARED. Six pages need the same cluster of links, and this
// group has NO HUB PAGE of its own — unlike /commercial-cleaning/, which is a
// real page its fifteen children can point at. There is nothing above these
// six, so the only thing holding the cluster together is that each page links
// its siblings. Six hand-typed copies of the same list is six chances for it
// to drift, which is the exact failure locations.ts and comparison.ts were
// extracted to stop. Two real consumers is this codebase's bar for sharing;
// this has six.
//
// ⚠️ Every href is a flat kebab-case guess from its menu label, per
// navigation.ts' own convention, and unconfirmed sitewide. They are duplicated
// from navigation.ts rather than derived from it, because navigation.ts nests
// them inside a mega-menu group whose shape is about layout, not about which
// services exist. If the slugs change, both files change.
//
// ⚠️ "Appliances" is the MENU's word for this group and it is a poor one: four
// of the six are not appliances at all. A rug, a lounge, a mattress and a
// grout line are soft furnishings and surfaces. Nothing in these pages calls
// the group "appliances" to a reader for that reason — they refer to each
// other by name instead. Worth renaming the menu group; flagged, not done,
// because the label came from the IA sheet.
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';
export interface ApplianceService {
  /** Menu label, used verbatim as pill and link text. */
  label: string;
  href: string;
  /** One line for the group's cross-link section. Written for a homeowner. */
  blurb: string;
}

// THE VALUES LIVE IN PAGES CMS ("Site settings > Cross-links: appliances",
// src/content/site/appliances.yaml).
export const applianceServices: ApplianceService[] = loadData(
  'site/appliances',
  z.object({
    services: z
      .array(z.object({ label: z.string().min(1), href: z.string().startsWith('/'), blurb: z.string().min(1) }))
      .min(1),
  }),
).services;

/** Every service except the one whose page is asking. */
export const otherApplianceServices = (ownHref: string): ApplianceService[] =>
  applianceServices.filter((service) => service.href !== ownHref);
