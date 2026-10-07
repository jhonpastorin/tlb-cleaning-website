// Brand Foundation v2.0 §1.3 "The Line" and §1.4 "Supporting Line", plus the
// section body that sits under the line on every service page.
//
// §1.3 requires "Easy to book, instant pricing, cost effective" in the
// subheadline of every service page AND as a section heading. Before this it
// was on three pages of fifty-two.
//
// ⚠️ THE LINE HAS TWO VARIANTS, AND THAT IS DELIBERATE. §13.2 is explicit
// that instant pricing "works badly for deep cleans, bond cleans and
// commercial", where condition drives the price and a client's self
// assessment is unreliable. Shipping the verbatim line on those pages would
// have promised a price the business has said it cannot give, on roughly
// thirty pages, which is exactly the kind of claim a competitor or the ACCC
// can ask TLB to substantiate. So `instant` goes only where §13.2 says
// instant pricing genuinely works, and `fast` carries the same three beats
// everywhere else. Both are sentence case, per §9.2.
//
// ⚠️ THE CTA IS NOT SPLIT YET. `quoteCta` in navigation.ts still reads "Get
// an instant quote" on every page, including the `fast` ones, so those pages
// currently say "fast quoting" in the line and "instant quote" on the button.
// That is the Phase 2.3 / step 7 job in WEBSITE-UPDATE-PLAN-BFD-V2.md and it
// is NOT cosmetic: the two CTAs route to different systems, and the Phase 1
// quote calculator only covers the regular-clean path. Splitting it here
// would have shipped a button pointing at a flow that does not exist. Do it
// there, then this comment goes away.
//
// Copy below is written to §9.2: Australian English, no em dashes, no Oxford
// commas, no exclamation marks, contractions encouraged, three to four
// sentence paragraphs.
//
// THE VALUES LIVE IN PAGES CMS ("Site settings > Brand lines",
// src/content/site/brand-lines.yaml). Page copy inserts the line with the
// tokens {{line.instant}} and {{line.fast}} (src/lib/cms.ts), so an edit there
// reaches every page that uses it.
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';

const pair = z.object({ instant: z.string().min(1), fast: z.string().min(1) });
const paragraphs = z.array(z.string().min(1)).min(1);
const lines = loadData(
  'site/brand-lines',
  z.object({
    line: pair,
    lineHeading: pair,
    managedForYou: z.object({ recurring: z.string().min(1), oneOff: z.string().min(1) }),
    body: z.object({
      regular: paragraphs,
      turnover: paragraphs,
      residential: paragraphs,
      condition: paragraphs,
      commercial: paragraphs,
    }),
    howItWorks: z.object({
      heading: z.string().min(1),
      general: paragraphs,
      turnover: paragraphs,
    }),
  }),
);

/** The subheadline form, with the full stop, for appending to a hero lead. */
export const theLine = lines.line;

/** The same line as a section heading, so it reads as a heading rather than
 *  as a sentence that lost its way. Sentence case, no full stop, per §9.2. */
export const theLineHeading = lines.lineHeading;

// §1.4. The three words are the line; the sentence after them is what makes
// the claim checkable. `recurring` is v2.0's own wording, verbatim.
//
// ⚠️ `oneOff` exists because §1.4's wording describes a set day and a set
// team, which is the actual proposition on a regular clean or a commercial
// contract and simply is not true of a one-off gutter clean or an oven. The
// line was still wanted on those pages, so it says what is true there
// instead of describing a service they do not get. Do not collapse the two.
export const managedForYou = lines.managedForYou;

// The body under the heading. Five variants rather than fifty-two hand
// written ones: the argument genuinely is the same within each group, and
// fifty-two bespoke versions would have been fifty-two chances to invent a
// claim nobody has verified. Each block starts at the booking step, because
// the call site prepends the §1.4 line above it as a standfirst, the way
// index.astro already prepends "You'll know the price before we start".
export const theLineBody = lines.body;

// "How it works", appended after the body on every page that carries the line
// as a section heading. Two variants, 25 Sep 2026:
//
// `turnover` is the client's supplied copy, verbatim, and is the Airbnb page's
// only. Booking calendars and per-turnover photos are specific to holiday lets.
//
// `general` is everywhere else. It keeps the client's first and last steps
// and replaces the two turnover-only ones with claims the site already makes:
// a price before the work starts (theLineBody) and a message on the way
// (managedForYou). Nothing in it promises something those two do not.
const howItWorksHeading = { subheading: lines.howItWorks.heading };

export const howItWorks = {
  general: [howItWorksHeading, { ordered: true, list: lines.howItWorks.general }],
  turnover: [howItWorksHeading, { ordered: true, list: lines.howItWorks.turnover }],
};
