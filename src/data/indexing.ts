// Which production pages Google may index. One rule, read in two places:
//
//   Base.astro              puts `noindex, follow` on any page this rejects
//   integrations/sitemap.mjs lists every built page WITHOUT a noindex tag
//
// The sitemap reads the built HTML rather than calling this function, so the
// two cannot disagree: whatever this decides is what the sitemap shows.
//
// A page is kept out of the index when it is built and reachable by URL but
// nothing on the site links it: the town pages that are not live. Indexing
// those would put 42 near-identical pages in front of Google with no internal
// links behind them (see the ⚠️ note in locations.ts). The switch is in Pages
// CMS: Locations > Live towns and region photos > Live town pages.
//
// Service pages whose menu row is ticked "Hidden" are NOT kept out. They used
// to be, but since 14 Oct 2026 the TagCloud pills on other pages link them, so
// "Hidden" only keeps a page out of the header menu (client's call).
//
// Staging is unaffected: site-env.ts already marks every staging page
// `noindex, nofollow`, and Base.astro checks that first.
import { allTowns, isNavigableTown, townSlug } from './locations';

const unlinkedTownPaths = new Set(allTowns.filter((town) => !isNavigableTown(town)).map(townSlug));

/** Every path compared here ends in a slash, as every canonical on the site does. */
const withTrailingSlash = (pathname: string) => (pathname.endsWith('/') ? pathname : `${pathname}/`);

export const isIndexable = (pathname: string) => !unlinkedTownPaths.has(withTrailingSlash(pathname));
