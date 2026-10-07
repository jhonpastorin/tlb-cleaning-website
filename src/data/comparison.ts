// The TLB comparison table — the substance of the table, shared by the
// homepage (index.astro §8), the Why TLB page and commercial-cleaning.
//
// Only `columns` and `rows` live here — the substance. Each page sets its own
// `heading`, `cornerLabel` and `lead`, since the framing differs by context
// even when the claims don't.
//
// ── REPLACED against Brand Foundation v2.0 (September 2026) ───────────────
//
// This file used to hold a two-column TLB-vs-"Other Brands" tick table. Four
// of its five rows breached v2.0: three claimed "Nine full-time cleaners"
// (§2.4, "Never claim that the team is employed full-time. It is not
// accurate"), one led on "local mums" and "Led by Teagan" (§9.3 bans both in
// positioning copy, §2.2 credits Teagan as founder rather than fronting her
// as the brand), and one asserted "ongoing contracts with the region's
// leading real estate agencies" (§2.4 lists that as unconfirmed). Two also
// carried a trailing "*" with no footnote text anywhere on either page.
//
// The rows below are NOT a rewrite. They are the homepage's own v6 table,
// supplied by TLB and approved, moved here verbatim — previously inline in
// index.astro, whose comment said exactly this: "Kept local rather than
// rewriting the shared file out from under two pages this brief doesn't
// cover — reconcile once those pages get their own v6 briefs." That is what
// this is. Using approved client copy beats drafting new rows, and it means
// the site now has ONE comparison table instead of two that disagree.
//
// Why the approved table is already v2.0-compliant, which is what made the
// promotion safe:
//
//  1. Three columns, not two. "Other Brands" lumped a national platform in
//     with the sole operator a neighbour recommended, and a cross against
//     that single column says the independent cleaner does worse work, which
//     §10.2 forbids outright ("Never suggest an independent cleaner does
//     worse work, because the reader has probably had a good one... In this
//     region that is a real person the reader knows"). §10 defines three
//     competitor types; there is now a column per type.
//
//  2. Facts, not ticks and crosses. §9.4: "keep the rows neutral and factual.
//     'Whoever is rostered that day' is a fact. 'They will let you down' is
//     not." A boolean can only say better/worse. A string says what actually
//     happens, which is why these rows read as information rather than as an
//     argument — the whole point of §9.4 moving comparisons out of prose.
//
//  3. TLB does not win every row. "Who cleans your home" gives the
//     independent cleaner an equal answer and "Reminders" gives the app a
//     good one. §10.1's named "mistake to avoid" is conceding convenience to
//     the platforms; the honest way to claim it is to show where they
//     genuinely have it.
//
// Column ORDER is the approved one and is load-bearing: TLB sits last and
// highlighted, so the reader arrives at it having already read the two
// alternatives. Do not reorder to put TLB first.
//
// Mobile: ComparisonTable's <768px layout stacks one chip per column with the
// header pulled in via `data-label`, so it is column-count agnostic. Desktop
// is a plain <table> with `overflow-x: auto`. Three columns needed no
// component change.
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';

// THE VALUES LIVE IN PAGES CMS ("Site settings > Comparison table",
// src/content/site/comparison.yaml). Two rows carry a fixed `id` because
// serviceComparisonRows below finds them by it: renaming their labels in the
// CMS is safe, deleting them fails the build.
//
// TLB's own column is the LAST one and is always the highlighted one; that is
// layout, so it is set here rather than in the CMS.
const comparisonData = loadData(
  'site/comparison',
  z.object({
    columns: z.array(z.object({ label: z.string().min(1) })).min(2),
    rows: z
      .array(z.object({ id: z.string().optional(), label: z.string().min(1), values: z.array(z.string().min(1)).min(1) }))
      .min(1),
  }),
);
for (const row of comparisonData.rows) {
  if (row.values.length !== comparisonData.columns.length) {
    throw new Error(
      `src/content/site/comparison.yaml: row "${row.label}" has ${row.values.length} cells for ${comparisonData.columns.length} columns`,
    );
  }
}
for (const id of ['who-cleans', 'holiday-lets']) {
  if (!comparisonData.rows.some((row) => row.id === id)) {
    throw new Error(`src/content/site/comparison.yaml: the row with id "${id}" is missing (serviceComparisonRows needs it)`);
  }
}

export const comparisonColumns = comparisonData.columns.map((column, i, all) =>
  i === all.length - 1 ? { ...column, highlight: true } : column,
);

export const comparisonRows = comparisonData.rows.map(({ id: _id, ...row }) => row);

// ── PER-PAGE VARIANTS ────────────────────────────────────────────────────
//
// Added September 2026 for the four pages rewritten against the copy-rewrite
// briefs in content-plans/. All four raise the same finding (their scorecard
// finding 7) against the shared rows above, and two raise a second one:
//
//  1. The "Holiday lets" row is about a service none of those four pages
//     sells. A strata committee reading a row about holiday lets on a
//     commercial pressure cleaning page is being shown a table written for
//     somebody else, and the same is true of a household booking a grout
//     clean. Every other row bears on the page it sits on.
//
//  2. "Who cleans your home" is correct on the two residential pages and
//     wrong on the two commercial ones, where the subject is a workplace.
//
// A function rather than four exported arrays, and NOT an edit to `rows`
// above: the homepage, /why-tlb/ and commercial-cleaning still render the
// approved table in full, and the briefs do not cover those pages. This
// narrows a shared table for a page that needs it without rewriting it out
// from under the three pages that don't.
export const serviceComparisonRows = (subjectLabel?: string) =>
  comparisonData.rows
    .filter((row) => row.id !== 'holiday-lets')
    .map(({ id, ...row }) => (id === 'who-cleans' && subjectLabel ? { ...row, label: subjectLabel } : row));
