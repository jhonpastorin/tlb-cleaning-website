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

/** The subheadline form, with the full stop, for appending to a hero lead. */
export const theLine = {
  /** §13.2's instant-priceable work: regular cleaning and set-scope turnovers. */
  instant: 'Easy to book, instant pricing, cost effective.',
  /** Everything condition driven or commercial, per §13.2. */
  fast: 'Easy to book, fast quoting, cost effective.',
} as const;

/** The same line as a section heading, so it reads as a heading rather than
 *  as a sentence that lost its way. Sentence case, no full stop, per §9.2. */
export const theLineHeading = {
  instant: 'Easy to book, instant pricing, cost effective',
  fast: 'Easy to book, fast quoting, cost effective',
} as const;

// §1.4. The three words are the line; the sentence after them is what makes
// the claim checkable. `recurring` is v2.0's own wording, verbatim.
//
// ⚠️ `oneOff` exists because §1.4's wording describes a set day and a set
// team, which is the actual proposition on a regular clean or a commercial
// contract and simply is not true of a one-off gutter clean or an oven. The
// line was still wanted on those pages, so it says what is true there
// instead of describing a service they do not get. Do not collapse the two.
export const managedForYou = {
  recurring:
    'Managed for you. Set day, set team, a reminder before, a message on the way, and told first when something changes.',
  oneOff:
    'Managed for you. A date that suits you, a confirmation in writing, a message when we are on the way, and told first if anything changes.',
} as const;

// The body under the heading. Five variants rather than fifty-two hand
// written ones: the argument genuinely is the same within each group, and
// fifty-two bespoke versions would have been fifty-two chances to invent a
// claim nobody has verified. Each block starts at the booking step, because
// the call site prepends the §1.4 line above it as a standfirst, the way
// index.astro already prepends "You'll know the price before we start".
export const theLineBody = {
  /** Regular home cleaning, including NDIS. The one job §13.2 names as
   *  genuinely instant-priceable. */
  regular: [
    "Book online in a couple of minutes, or send a text, ring us or email, whichever you'd actually do. Tell us the bedrooms, the bathrooms and how often you want us. That's enough to price a regular clean properly.",
    "Regular cleaning is the one job that can be priced without seeing it first, because size and frequency genuinely predict the work. So you get a number straight away rather than waiting on someone to come and look. The price doesn't move once we're there, unless you ask us to do more.",
    "It's cost effective because the same team comes back to a place they already know. Nothing gets learned from scratch each visit, so the time goes on cleaning rather than on working out where things live. No lock-in, no minimum term and no exit fee.",
  ],
  /** Holiday let turnovers. Same property, same scope, every time, so it
   *  prices once rather than job by job. */
  turnover: [
    "Book online in a couple of minutes, or send a text, ring us or email, whichever you'd actually do. Tell us the property, the bedrooms and how you handle the linen.",
    "A turnover is the same property to the same scope every time, so it gets priced once rather than quoted after every checkout. You get a rate per turnover you can build into your nightly price. It doesn't move because a guest left late or the season got busy.",
    "It's cost effective because a turnover you've priced once is a turnover you stop managing. We work off your calendar rather than a phone call each time a booking ends. No lock-in, no minimum term and no exit fee.",
  ],
  /** One-off residential jobs: carpets, windows, gutters, ovens, roofs.
   *  Priceable quickly, usually off photos, but not sight unseen. */
  residential: [
    "Book online in a couple of minutes, or send a text, ring us or email, whichever you'd actually do.",
    "Condition drives the price on work like this, so the honest answer is a fast quote rather than an instant one. Tell us what you've got and roughly what state it's in, and we'll come back with a number quickly. Photos are usually enough. If it needs eyes on it, we'll say so rather than guess.",
    "You'll know the price before we start, not after. If the job turns out smaller than you described, we'll tell you rather than hold you to the bigger number. If it needs more time than we quoted, you'll hear that before we begin.",
  ],
  /** Deep cleans, bond cleans, mould, agency turnarounds. The work §13.2
   *  names outright as unpriceable sight unseen. */
  condition: [
    "Book online in a couple of minutes, or send a text, ring us or email, whichever you'd actually do.",
    "Condition is what sets the price on this work, and a job like it can't be priced properly sight unseen. So you get a fast quote on the actual property instead of an instant number that has to be revised later. Tell us honestly what state it's in when you book, because nothing you say will surprise us.",
    "You'll know the price before we start, not after. Being straight about the condition is what lets us allow the right amount of time, rather than running short on the day. If it needs more than we've quoted, you'll hear that before we begin rather than on the invoice.",
  ],
  /** Commercial and the thirteen premises pages. Priced on the site, in
   *  writing, per visit. */
  commercial: [
    'Book a walkthrough online, or send a text, ring us or email, whichever suits. We come and look at the premises rather than pricing it off a form.',
    "Commercial work gets priced on the site, because hours on the ground are what set the number. You get a written scope and a price per visit, so you know what you're paying for. Anything outside that scope is quoted before it happens, not added afterwards.",
    "It's cost effective because a written scope is something you can hold us to. You're buying a defined amount of work, on a set day, from the same team each visit. No lock-in term.",
  ],
} as const;

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
const howItWorksHeading = { subheading: 'How it works' };

export const howItWorks = {
  general: [
    howItWorksHeading,
    {
      ordered: true,
      list: [
        'Tell us about the job.',
        'We confirm the price and agree a time and access.',
        "We do the clean, and you get a message when we're on the way.",
        'If something needs fixing, you hear it from us first.',
      ],
    },
  ],
  turnover: [
    howItWorksHeading,
    {
      ordered: true,
      list: [
        'Tell us about your property.',
        'We link to your booking calendar and agree access.',
        'We take care of every turnover, and you get photos each time.',
        'If something needs fixing, you hear it from us first.',
      ],
    },
  ],
};
