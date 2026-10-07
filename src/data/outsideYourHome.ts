// The "Outside your home" cluster — the five exterior service pages that sit
// under the Home Cleaning mega-menu's third group in navigation.ts.
//
// Extracted here because all five pages render the same cross-link block and
// each one needs the other four: five real consumers, well past the two this
// codebase sets as the bar for sharing (see comparison.ts, locations.ts,
// trust.ts, navigation.ts). Without it, adding a sixth exterior service means
// editing five pages and forgetting one.
//
// `href` and `label` are the mega-menu's own, verbatim, so the menu and the
// page bodies cannot drift into two different names for one service. The
// slugs are still the flat kebab-case guesses navigation.ts documents; they
// are unconfirmed sitewide, and confirming them fixes the menu and this file
// together.
import type { ServiceIconName } from '../components/ui/ServiceIcon.astro';
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';

const SERVICE_ICONS = ['idea', 'spark', 'bloom', 'puzzle', 'target', 'chart-pie', 'chart-bars', 'house', 'suitcase', 'key', 'spray-bottle', 'office'] as const satisfies readonly ServiceIconName[];

export interface OutsideService {
  label: string;
  href: string;
  icon: ServiceIconName;
  /** One line for the cross-link row, written to answer "is this my problem?"
   *  rather than to describe the service. */
  description: string;
}

// THE VALUES LIVE IN PAGES CMS ("Site settings > Cross-links: outside your
// home", src/content/site/outside.yaml).
export const outsideServices: OutsideService[] = loadData(
  'site/outside',
  z.object({
    services: z
      .array(
        z.object({
          label: z.string().min(1),
          href: z.string().startsWith('/'),
          icon: z.enum(SERVICE_ICONS),
          description: z.string().min(1),
        }),
      )
      .min(1),
  }),
).services;

/** The cross-link row for one page: the other four services, in cluster
 *  order, shaped for `ServiceBlocks`' `list` variant. Passing the current
 *  page's own href keeps a page from linking to itself, which is the one
 *  thing a hand-written version of this block always got wrong. */
export const otherOutsideServices = (currentHref: string) =>
  outsideServices
    .filter((service) => service.href !== currentHref)
    .map(({ icon, label, description, href }) => ({ icon, title: label, description, href }));
