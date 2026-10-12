// Which production pages Google may index. One rule, read in two places:
//
//   Base.astro              puts `noindex, follow` on any page this rejects
//   integrations/sitemap.mjs lists every built page WITHOUT a noindex tag
//
// The sitemap reads the built HTML rather than calling this function, so the
// two cannot disagree: whatever this decides is what the sitemap shows.
//
// A page is kept out of the index when it is built and reachable by URL but
// nothing in the menu links it. Indexing those would put thin or unsold pages
// in front of Google with no internal links behind them (see the ⚠️ notes in
// locations.ts and navigation.ts). Both switches are in Pages CMS:
//
//   town pages     Locations > Live towns and region photos > Live town pages
//   service pages  Site settings > Navigation > Main menu > row "Hidden"
//
// Staging is unaffected: site-env.ts already marks every staging page
// `noindex, nofollow`, and Base.astro checks that first.
import { allTowns, isNavigableTown, townSlug } from './locations';
import { hiddenMenuHrefs } from './navigation';

const unlinkedTownPaths = new Set(allTowns.filter((town) => !isNavigableTown(town)).map(townSlug));

/** Every path compared here ends in a slash, as every canonical on the site does. */
const withTrailingSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`);

export const isIndexable = (pathname: string) => {
  const path = withTrailingSlash(pathname);
  return !unlinkedTownPaths.has(path) && !hiddenMenuHrefs.has(path);
};
