// The five trust-bar proof points — the substance of the Dark Teal card that
// overlaps the hero on every page.
//
// Extracted here once the same five points had been copied verbatim into
// index.astro, house-cleaning.astro and deep-cleaning.astro while
// commercial-cleaning.astro, ndis-cleaning.astro and why-tlb.astro still ran
// an older set of three ("9 full-time local team members", "Every client came
// from a recommendation"). That was two different sets of proof for one
// business, which reads as a mistake rather than a variation. Two real
// consumers is the bar this codebase sets for sharing (see comparison.ts,
// locations.ts, navigation.ts) and this had six.
//
// Copy is the homepage brief's own, verbatim: each supplied line is the
// description, under a short added label.
//
// ⚠️ Both numbers are unsourced claims. "98% of our clients stay with us" and
// "Over 100 local homes, hosts and businesses" are exactly the kind of figure
// a competitor or the ACCC can ask TLB to substantiate. They came from the
// brief so they ship — confirm both are real and current. Now ONE fix, here,
// serves every page.
//
// ⚠️ Two proof points were LOST bringing the older pages across, because the
// section is now identical everywhere by request:
//   - ndis-cleaning's "NDIS aligned / Bound by the NDIS Code of Conduct"
//   - commercial-cleaning's and why-tlb's agency wording, which named
//     "leading Northern Rivers real estate agencies"
// The NDIS one is the one that matters: it was the only place on that page
// stating the Code of Conduct, which is the trust signal a participant or
// support coordinator looks for. If it should stay, the answer is a
// page-specific sixth point appended to this array at the call site, not a
// second divergent set — TrustBar's `card` variant only has a laid-out rule
// for five, so a sixth needs a component change first.
import type { TrustBarIconName } from '../components/sections/TrustBar.astro';

export const trustBarCards: { icon: TrustBarIconName; title: string; description: string }[] = [
  {
    icon: 'map-pin',
    title: 'Local team',
    description: 'A local team right across the Northern Rivers and the Tweed',
  },
  {
    icon: 'shield-check',
    title: 'They stay',
    description: '98% of our clients stay with us',
  },
  {
    icon: 'sparkle',
    title: 'Holiday lets',
    description: 'Cleaning five-star holiday lets across the region',
  },
  {
    icon: 'building',
    title: 'Agency trusted',
    description: 'Preferred supplier for real estate agencies in the region',
  },
  {
    icon: 'team',
    title: 'Over 100 clients',
    description: 'Over 100 local homes, hosts and businesses',
  },
];
