// Which environment this build is for, and therefore whether search engines are
// allowed to index it.
//
// ⚠️ THIS FAILS CLOSED. A build is only treated as production when SITE_ENV is
// literally "production". Anything else — unset, misspelt, "prod", "Production"
// — is treated as staging and carries `noindex`. A forgotten variable therefore
// protects staging rather than leaking it, which is the failure that actually
// costs something: a staging copy indexed under the client's brand competes
// with the real site and takes weeks to clear out of the index.
//
// The cost of this direction is that a production deploy which forgets the
// variable ships blocked. The build log below is the guard against that — every
// build states which mode it produced, and the README records that production
// deploys must set SITE_ENV=production in the host's build environment.
//
// Read in .astro frontmatter and in endpoints only, both of which run at build
// time on the server, so this needs no PUBLIC_ prefix and never reaches the
// browser bundle.
const rawEnv = import.meta.env.SITE_ENV;

export const isProduction = rawEnv === 'production';
export const isStaging = !isProduction;

// The same flag as a string, for anything that has to branch on the
// environment rather than just on indexability. Pushed into dataLayer in
// Base.astro so Google Tag Manager can block GA4 and Ads tags on staging.
export const siteEnv: 'production' | 'staging' = isProduction
  ? 'production'
  : 'staging';

// nofollow as well as noindex: staging pages link to each other, and a crawler
// that ignores the noindex should at least not walk the rest of the tree.
export const robotsContent = 'noindex, nofollow';

// One line per build, in the same spirit as the build-time guards in
// navigation.ts and locations.ts — a mistake announces itself instead of
// passing silently.
console.log(
  `[SEO] robots: ${isProduction ? 'INDEXABLE' : 'NOINDEX'} (SITE_ENV=${rawEnv ?? 'undefined'})`,
);
