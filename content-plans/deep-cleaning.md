# Content plan: "House Deep Cleaning Services — One-Off" page

Source: TLB Cleaning **Deep Cleaning** content brief (focus keyword
`house deep cleaning services`). Maps every content block to a section
component from [`SECTIONS.md`](../SECTIONS.md), states positioning, and flags
anywhere the spec has no clean 1:1 match or the copy is blocked/unconfirmed.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap. Content status:
**drafted** (ships as-is), **drafted, pending confirmation** (bracketed
`[TLB TO CONFIRM]` in the source), **blocked** (no usable copy exists).

Built at [`src/pages/deep-cleaning.astro`](../src/pages/deep-cleaning.astro),
shipping at `/deep-cleaning/` — a slug already used by `index.astro` and by
`house-cleaning.astro`'s card 1, so **no slug conflict here**, unlike the
house-cleaning build.

---

## 🚩 Status of the three launch blockers

### 1. The meta description belongs to a different page

The brief's Description tag reads:

> End of lease and bond cleaning that passes the first inspection, across NSW
> and QLD. We know both sets of rules. Get your fixed quote today.

That is **end of lease** copy, on a page whose title tag is "House Deep
Cleaning Services - One-Off". It mentions bond cleaning, inspections and
two sets of tenancy rules — none of which this page is about, and it never
mentions deep cleaning at all. Almost certainly pasted from the end-of-lease
brief.

Shipping it would put an end-of-lease promise in the search result for a
deep-cleaning page: wrong clicks, immediate bounces, and it actively
competes with the real end-of-lease page for the same query. **The page is
built with a placeholder description written from the brief's own H1 and
definition paragraph** — replace it with real approved copy.

### 2. ✅ §5 now built — but the FAQ's promise still doesn't quite match

The table content was supplied separately as a **three-way service
comparison** (Deep vs Regular vs End of Lease), not the "room by room" task
list the brief's row implied. It's the better shape: it answers "which of
these do I need", which is the actual question a visitor arrives with.

⚠️ **Still open.** Branded FAQ 2 says:

> Because **the task list is published on this page** before you book.

Six comparison rows are not a full room-by-room task list. The table's
"View the full room-by-room checklist" CTA points at the existing guide
(`/guides/what-is-included-in-a-deep-clean/`, already in the header
mega-menu). So either reword that FAQ to say *linked from* this page, or
publish the full checklist here.

### 3. ✅ Card 3 now has a destination

> I am not sure which I need. Fair. Here is how the three differ, in plain
> terms.

"Here is how the three differ" points at a comparison of deep vs. regular vs.
end of lease. Cards 1 and 2 have obvious targets (`/house-cleaning/`,
`/end-of-lease-cleaning/`); this one had none when the page was first built.

**Resolved by §5's table.** The three-way comparison now exists on this
page, so the card links to `#compare` (an id on the wrapper `<div>` — the
component takes no `id` prop, and adding one purely for an anchor target
isn't worth a shared-component change). The card's wording reads like it was
written expecting exactly this.

---

## 0. Page metadata

| Field | Value | Notes |
|---|---|---|
| Title tag | `House Deep Cleaning Services - One-Off \| TLB Cleaning` | Drafted. Non-brand portion: "House Deep Cleaning Services - One-Off". |
| Meta description | ⚠️ **Placeholder in use** | The supplied one is end-of-lease copy — see 🚩1 above. |
| URL | `/deep-cleaning/` | Already the site's slug for this page. No conflict. |
| Focus keyword | `house deep cleaning services` | |
| Google Classification Type | — | **Blank.** Tool named, no output pasted. |
| Related keywords | — | **Blank.** "Add on Getstat", no list supplied. |
| Query fan-outs | — | **Blank.** Tools named, nothing generated. |
| Entities | — | **Blank.** The body copy does surface real ones worth keeping (Northern Rivers, the Tweed, Southern Gold Coast) — content, not a substitute for the research row. |

---

## 1. Hero — `Hero.astro` 🟢 · drafted

> H1: One clean to reset the whole house.
>
> Overview: Before the guests arrive, after the party, when you move in, or when it has just got away from you. A single clean that takes the house back to the start.

⚠️ **The overview is 31 words** — the brief's own template asks for 15–25 for
this slot, and `Hero`'s `lead` is sized for a punchy line. It renders fine,
but it's two sentences doing the work of one. A trim is a copy call, so it
ships verbatim; flagged rather than silently cut.

- `headingLines`: the H1.
- `lead`: the overview, verbatim.
- `cta`: "Get an instant quote" — the brief places this after the definition
  paragraph, but `Hero.astro`'s `cta` prop is **required**, so it lives here
  and §2's stays unset. Same ruling as the house-cleaning page.
- `variant`: **`minimal`** — no hero photo supplied. Move to
  `split-single-image` once one exists; don't fill it with stock.

---

## 2. Definition paragraph — `TextBlock.astro` 🟢 · drafted

> A deep clean is a one-off, room-by-room reset that covers the detail work a regular clean doesn't reach. TLB Cleaning provides house deep cleaning services across the Northern Rivers, the Tweed and the Southern Gold Coast.

The answer-target block for `house deep cleaning services` — keep it as the
first prose after the hero. `theme="light"`, one `body` entry, `cta` unset.

---

## 3. Situation cards — `PathwayCards.astro` 🟢 · drafted

Card copy is one continuous first-person block each; split into `title` (the
opening statement) + `description` (the rest), as on the house-cleaning page.

**Card 1** → `/house-cleaning/`
- title: "Actually I want this regularly."
- description: "Most people book a deep clean first and then set up a fortnightly. That way round works well, and it costs less than doing it the other way."

**Card 2** → `/end-of-lease-cleaning/`
- title: "I am moving out."
- description: "That is an end of lease clean, a different standard measured against an inspection. Different page."

**Card 3** → `#compare` (§5's table on this page) — see 🚩3.
- title: "I am not sure which I need."
- description: "Fair. Here is how the three differ, in plain terms."

Open: section `heading`/`headingAccent` (not in brief), the three CTA labels
(not in brief), three card images (not supplied).

---

## 4. Trust bar — `TrustBar.astro` 🟢 · drafted

Identical three points to the house-cleaning page:
"9 full-time local team members · every client came from a recommendation ·
Trusted by leading Northern Rivers real estate agencies"

Capitalisation normalised to sentence case (the source capitalises only the
third). **Positioning:** directly under the hero per the brief's own text,
ahead of its table-row position.

⚠️ Same cross-page wording mismatch flagged on the house-cleaning plan: the
homepage says "9 full-time local **cleaners**, employed not subcontracted".
Reconcile all three pages at once.

---

## 5. What's included in a deep clean — `ComparisonTable.astro` 🟢 · built

Content supplied as a three-way service comparison, transcribed from the
design mockup. Placed immediately after the situation cards, per instruction.

- `heading`: "What's included in a deep clean"
- `lead`: "A detailed, top-to-bottom clean across every room."
- `cta`: "View the full room-by-room checklist" →
  `/guides/what-is-included-in-a-deep-clean/` (the guide already listed in
  the header mega-menu; swap if a dedicated checklist page is planned)
- `columns`: Deep Clean (One-Off) `highlight` · Regular Clean (Fortnightly) ·
  End of Lease / Bond Clean

| Row | Deep Clean | Regular Clean | End of Lease |
|---|---|---|---|
| Room-by-room detail | ✓ | General upkeep | Meets real estate checklist |
| Inside cupboards & drawers | ✓ | Surface only | Yes |
| Skirting, corners & edges | ✓ | Standard | Yes |
| Oven & rangehood detail | ✓ | Outside only | Yes |
| Windowsills, tracks & frames | ✓ | Inside only | Yes |
| Built for | Homes that need a reset | Maintenance | Inspection |

### ⚠️ Last row normalised

The mockup's final row reads **"Built for homes that need a reset"** as the
row *label*, with "Built for maintenance" / "Built for inspection" as the
other two columns' values. That makes the Deep Clean tick circular — "built
for homes that need a reset: yes, it is" — and puts one column's answer
inside a label that's meant to be neutral across all three.

Normalised to label **"Built for"** with a real value per column, so the row
compares like every other row. Revert to the literal mockup wording if that
was deliberate.

### ⚠️ Layout differs from the mockup, deliberately

The mockup puts heading/lead/CTA in a left-hand panel **beside** the table.
That was built as an optional `split` layout on `ComparisonTable`, then
**reverted after measuring it in the browser**:

| Layout | Table needs | Table gets | Result |
|---|---|---|---|
| Split (panel beside) | 999px | ~848px | Third column pushed off behind a horizontal scroll |
| Stacked (current) | 1148px | 1148px | Fits exactly, nothing clipped |

A side panel starves a 4-column table at a 1200px container — and silently
hiding "End of Lease / Bond Clean", a third of the comparison, is a worse
outcome than a different arrangement. The `split` prop was removed rather
than left in the shared component as a variant that only works for narrow
tables.

If the side-by-side look matters more than the current type size, the path
is a smaller type scale for this table specifically — which trades against
the deliberate legibility call documented in `SECTIONS.md` for this
component. Your call.

**Positioning:** full section width, no imagery. Mobile (≤768px): stacked
cards, one per row, each listing all three services.

---

## 6. "The moments this comes up" — `ContentGrid.astro` 🟢 · drafted

The brief files this under "The why", but structurally it isn't the
persuasive prose that heading implies on other pages — it's six labelled
occasions, each a short title plus a one-line gloss. That's grid content, not
a paragraph.

`columns={3}`, six `text` cells (2 rows of 3), each `heading` + one-line
`body`:

| Cell | Heading | Body |
|---|---|---|
| 1 | Moving in | Before the furniture, while the place is empty and it is easy. |
| 2 | Before guests | Family for Christmas, or the in-laws for a week. High stakes, short notice. |
| 3 | After a party | Self-explanatory. |
| 4 | Before it goes to market | Photos, open homes and first impressions. |
| 5 | The spring reset | Windows open, everything out, the once-a-year one. |
| 6 | After a long absence | Coming back to a house that has been shut up for months. |

Section `heading`: "The moments this comes up."

*(`TextBlock` with a `{ list: [...] }` entry was considered — it's what the
house-cleaning page's "why" block uses — but it would flatten each item's
title/gloss pair into one run-on line. `ServiceBlocks` `list` also fits, and
would stack six full-width rows; the 3-up grid is the more scannable shape
for six short items.)*

---

## 7. Credibility signals — ❌ **removed at TLB's direction**

The brief's row for this section was **empty** — the boilerplate label only,
no direction at all (the house-cleaning brief at least specified "before and
after images from genuine TLB jobs, with client permission and no identifying
detail").

The first build filled it with four before/after placeholder slots on the
sibling page's premise, flagged at the time as an assumption to confirm.
**It was wrong, and the section has been dropped.**

If it comes back, it needs a real brief first: what the visuals are meant to
prove on *this* page, not just that visuals belong here. Before/after is the
obvious candidate for a deep clean, but that guess has now been tested and
rejected once.

---

## 8. Hero video — `VideoFeature.astro` 🟢 · media blocked

> A before-and-after video showing a deep clean.

Better specified than the house-cleaning page's ("James video testimonial"
with no context). Built as a reserved 16/9 `VideoPlaceholder` labelled to
match. `headingLines` is **not** in the brief — placeholder copy in use.

---

## 9. Social proof — `TestimonialCarousel.astro` 🟢 · blocked

> Ask Teagan for Deep Cleaning testimonials

That's the entire brief — no story angles, unlike the house-cleaning page
(which specified a tenure story and a switcher story). Built as **two
bracketed `[TBC]` slots**, `uniform`, matching the convention `index.astro`
and `house-cleaning.astro` both use.

⚠️ **Worth briefing properly.** "Deep cleaning testimonials" doesn't tell
Teagan what the quotes need to prove. The two that would convert on this
page: someone whose house had got badly away from them (answers the shame
barrier the first branded FAQ addresses), and someone who booked against a
deadline — guests, photos, a move — and had it done in time.

Never fill these with invented names or words.

---

## 10. Branded FAQs — `Faq.astro` 🟢 · 3 of 4 ship

1. **"My house hasn't had a proper clean in years. Is that a problem?"** — drafted:
   > Not at all, that's the job. Tell us honestly how it is when you book so we can allow the right time, and we'll quote for what's actually there, not a guess.
2. **"How do I know it'll actually be a deep clean and not a quick once-over?"** — drafted, **but see 🚩2**: it promises a published task list this page doesn't have.
   > Because the task list is published on this page before you book. Our cleaners are employed full-time, not contractors paid by the job, so nobody's rushing to the next one.
3. **"What if the house needs more time than we booked?"** — drafted:
   > We'll tell you before we start, not after. If it's bigger than expected you decide whether to add time or have us prioritise the rooms that matter most. No surprise invoices.
4. **"How soon can you get here?"** — 🔒 **blocked**, unfilled placeholder in the source:
   > Usually within **[X]** days, and sooner if something opens up. Deep cleans are often booked around a date, so tell us when the guests land or the photos are taken and we'll work back.

   `[X]` is a literal blank. Held back rather than published with a guessed
   number — a lead time is an operational promise. The rest of the answer is
   good and ships the moment the number exists.

---

## 11. Non-branded FAQs — `Faq.astro` 🟢 · 3 of 5 ship

Ship as drafted: **"What's the difference between a deep clean and a spring
clean?"**, **"How often should you deep clean a house?"** (its coastal-humidity
line is a genuinely good local-relevance signal), **"Can I get a deep clean
before I move in?"**

Held back, both carrying `[TLB TO CONFIRM]` **and** both being operational
claims a client could hold TLB to:
- **"What isn't included in a deep clean?"** — `[TLB TO CONFIRM the full
  exclusions list before publishing.]` Note this answer and §5's missing
  table are the same blocked fact seen twice; settling the task list settles
  both.
- **"Do cleaners move furniture during a deep clean?"** — `[TLB TO CONFIRM
  the policy on heavy items.]` This one is a safety-and-liability claim
  about what staff will lift. Don't publish unconfirmed.

Full drafted text for all five is in the page file's comments, ready to
uncomment.

---

## 12. Closing CTA — `CallToAction.astro` (secondary) ⚠️ **added, not in brief**

The brief has **no closing CTA row and no "Where We Clean" row**, though the
house-cleaning brief has both and its own template lists a closing CTA.

- **Closing CTA: built anyway**, echoing the hero's line with the brief's own
  "Get an instant quote" label. A service page whose only CTA is above the
  fold loses conversions, and the brief does specify that CTA — but this
  section is an addition, so its copy is a placeholder either way.
- **"Where We Clean": not built.** Adding it means picking a suburb list, and
  there are already three disagreeing lists across this site (see the
  house-cleaning plan §12). Not a call to make silently. Say the word and
  it's a five-minute add.

---

## Full page order

1. `SiteHeader`
2. `Hero` (`minimal`) — H1, overview, CTA
3. `TrustBar` — moved up per the brief's own text
4. `TextBlock` (light) — definition
5. `PathwayCards` — 3 situation cards *(card 3 href placeholder)*
6. `ComparisonTable` — "What's included in a deep clean" (3-way service comparison, `#compare` anchor)
7. `ContentGrid` (3-col) — "The moments this comes up."
8. `VideoFeature` — before/after video slot *(video needed)*
9. `TestimonialCarousel` (uniform, 2) — `[TBC]` slots
10. `Faq` #1 — branded, 3 of 4
11. `Faq` #2 — non-branded, 3 of 5
12. `CallToAction` (secondary) — added, not in brief
13. `SiteFooter`

## Open items

**Blocking:**
- Meta description — the supplied one is for a different page (🚩1).
- Branded FAQ 2's "task list is published on this page" vs. what §5's table
  actually is (🚩2).
- Branded FAQ 4's `[X]` day lead time.

**Resolved:** §5's table content (built), card 3's destination (`#compare`).

**Pending TLB confirmation:**
- Non-branded FAQ "What isn't included in a deep clean?" (exclusions list).
- Non-branded FAQ "Do cleaners move furniture?" (heavy-item policy).

**Copy not in the brief, placeholder in use:** hero-adjacent section headings
for §3, §7, §8; §3's three card CTA labels; both FAQ headings; §12's closing
paragraph.

**Media needed:** hero photo (only if moving off `minimal`), 3 card images,
the before/after video, 2 testimonial avatars.

**Decisions:** whether to add "Where We Clean". *(The credibility-block
question is settled — that section is removed.)*

**Cross-page consistency:** trust bar wording differs from the homepage's;
the hero overview runs 31 words against a 15–25 target.
