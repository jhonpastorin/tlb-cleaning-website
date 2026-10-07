// The "I want to know who is in my home" pathway card — card 3 of 3 on all
// six appliance and specialist-clean pages (blinds, carpet and rug, mattress,
// oven and BBQ, tile and grout, upholstery).
//
// ── EXTRACTED and REWRITTEN against Brand Foundation v2.0 (September 2026) ──
//
// This card was six byte-identical copies: same number, same image, same
// image label, same title, same description, same CTA. Each of the six also
// carried the same inline warning, "Same two brackets every page on this site
// carries. One answer fixes all of them" — which was true, and was never
// going to happen while the answer lived in six places.
//
// This codebase's own bar for sharing is two real consumers (stated in
// trust.ts, comparison.ts, locations.ts and navigation.ts). This had six.
//
// The description ALSO breached two v2.0 rules, which is what forced the
// rewrite rather than a straight lift:
//
//   Was: "The same local team you have met, not a roster of strangers from a
//   call centre. We are local mums who clean where we live, [insured] and
//   [police-checked], and there is one local number to ring."
//
//   1. "not a roster of strangers from a call centre" — §9.4: "No
//      characterising what a national brand or an independent cleaner fails
//      to do, in running text." This is running text.
//   2. "We are local mums who clean where we live" — §9.3: not in
//      positioning copy. A service page is positioning copy (§2.2's
//      deny-list names "service page positioning" explicitly).
//
// The replacement is §11.1 almost verbatim, which is the brand document's own
// supplied answer to this exact objection ("I don't know who's coming into my
// house"): "Meet the team looking after your place before the first visit.
// They live in your area. How we get in is agreed when you book, and you get
// a message when we are on the way."
//
// It says MORE than the old copy did, not less. The old version asserted the
// reader had already met the team ("you have met") on a page they had just
// landed on; this one offers the meeting, which is the actual proposition.
//
// ⚠️ THE TWO BRACKETS SURVIVE, DELIBERATELY. [insured] and [police-checked]
// are not placeholders I can fill: v2.0 §2.4 says "Police checked and insured
// appears in supplied meta descriptions. Confirm both before publishing", and
// §11.7 leaves the insurance position as an open [CONFIRM] with the warning
// that "a vague answer here loses the booking". Inventing either would breach
// §12.2. They will render to the public as literal square brackets, so this
// still blocks launch — but now it is ONE line to fix instead of six.
//
// THE VALUES LIVE IN PAGES CMS ("Site settings > Who is in your home card",
// src/content/site/who-is-in-your-home.yaml). The two [bracketed] claims are
// still open: answer them there and all six pages change.
import type { ImageMetadata } from 'astro';
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';

const card = loadData(
  'site/who-is-in-your-home',
  z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    cta: z.object({ label: z.string().min(1), href: z.string().min(1) }),
    defaultImageAlt: z.string().min(1),
  }),
);

// `label` is the image's alt text. Optional so the pages still on the shared
// caddy photo keep its description; a page passing its own photo must pass
// a label that describes it.
export const whoIsInYourHomeCard = (
  image: ImageMetadata,
  label = card.defaultImageAlt,
) => ({
  number: 3,
  image: {
    ratio: '4/3',
    label,
    src: image,
  },
  title: card.title,
  description: card.description,
  cta: card.cta,
});
