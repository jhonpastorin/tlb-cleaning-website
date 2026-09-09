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

export interface OutsideService {
  label: string;
  href: string;
  icon: ServiceIconName;
  /** One line for the cross-link row, written to answer "is this my problem?"
   *  rather than to describe the service. */
  description: string;
}

export const outsideServices: OutsideService[] = [
  {
    label: 'Window cleaning',
    href: '/window-cleaning/',
    icon: 'spark',
    description: 'Glass, frames, sills and tracks, inside and out, with the salt film taken off properly.',
  },
  {
    label: 'Gutter cleaning',
    href: '/gutter-cleaning/',
    icon: 'puzzle',
    description: 'Gutters, valleys and downpipes cleared and flushed, and the debris taken away with us.',
  },
  {
    label: 'Roof cleaning',
    href: '/roof-cleaning/',
    icon: 'house',
    description: 'Soft washing that kills the algae and lichen at the root, on tile or colorbond.',
  },
  {
    label: 'High pressure cleaning',
    href: '/high-pressure-cleaning/',
    icon: 'spray-bottle',
    description: 'Driveways, paths, patios, pool surrounds and fences, at a pressure the surface can take.',
  },
  {
    label: 'Exterior house washing',
    href: '/exterior-house-washing/',
    icon: 'bloom',
    description: 'Walls, eaves, soffits and window frames washed down so the whole house looks newer.',
  },
];

/** The cross-link row for one page: the other four services, in cluster
 *  order, shaped for `ServiceBlocks`' `list` variant. Passing the current
 *  page's own href keeps a page from linking to itself, which is the one
 *  thing a hand-written version of this block always got wrong. */
export const otherOutsideServices = (currentHref: string) =>
  outsideServices
    .filter((service) => service.href !== currentHref)
    .map(({ icon, label, description, href }) => ({ icon, title: label, description, href }));
