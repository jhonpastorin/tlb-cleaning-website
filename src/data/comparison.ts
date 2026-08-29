// The TLB vs. other brands comparison — the substance of the table, shared
// by the homepage (index.astro §8) and the Why TLB page.
//
// Copy was supplied directly by TLB with desktop and mobile mockups; it is
// approved content, not derived. Extracted here once a second page needed the
// identical rows: two real consumers is the same bar this codebase sets
// elsewhere for sharing (see navigation.ts, ServiceIcon.astro).
//
// Only `columns` and `rows` live here — the substance. Each page sets its own
// `heading`, `cornerLabel` and `lead`, since the framing differs by context
// even when the claims don't.
//
// ⚠️ Two row labels carry a trailing "*" with no footnote text supplied
// alongside them. Kept verbatim rather than dropped or invented; add the
// footnote (via ComparisonTable's `footnote` prop) once that text exists.
// Because this is now shared, adding it fixes both pages at once.

export const comparisonColumns = [
  { label: 'TLB Cleaning', highlight: true },
  { label: 'Other Brands' },
];

export const comparisonRows = [
  {
    label: 'Nine full-time cleaners employed by TLB, not subcontracted*',
    description: '(The person in your home is on our team, not booked through a platform)',
    values: [true, false],
  },
  {
    label: 'Owned and run by local mums from the Northern Rivers',
    description: '(Led by Teagan, staffed by mothers who live where they clean)',
    values: [true, false],
  },
  {
    label: 'Grew to nine full-time cleaners without ever advertising',
    description: '(Every client so far arrived on a recommendation)',
    values: [true, false],
  },
  {
    label: 'You see the cleaners who work your area, by name and face, before you book',
    description: '(Nine local cleaners, photographed and named, not a stock photo)',
    values: [true, false],
  },
  {
    label: "Ongoing contracts with the region's leading real estate agencies*",
    description: '(Our work is inspected by local property managers every week)',
    values: [true, false],
  },
];
