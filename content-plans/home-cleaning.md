# Content plan: "House Cleaning Services — Regular Cleans" page

Source: TLB Cleaning **Home Cleaning** content brief (focus keyword
`house cleaning services`). Maps every content block to a section component
from [`SECTIONS.md`](../SECTIONS.md), states image/text positioning, and
flags anywhere the spec doesn't have a clean 1:1 component match or the copy
itself is still blocked/unconfirmed.

Legend: 🟢 exact match in the library · 🟡 workable with a stretch/variant
choice · 🔴 gap — nothing in `SECTIONS.md` fits, needs a decision or a new
component. Content status is called out separately per block: **drafted**
(full copy given, ships as-is), **drafted, pending confirmation** (full copy
given but the spec itself brackets it `[TLB TO CONFIRM]`), or **blocked**
(no usable copy exists yet).

**Three components that were 🔴 gaps on the homepage plan now exist** and
are used here without stretch workarounds: `TextBlock.astro`,
`TrustBar.astro`, `ComparisonTable.astro`. The `ContentGrid.astro`-stretch
fallbacks that plan proposed are no longer needed.

---

## ✅ Built — [`src/pages/house-cleaning.astro`](../src/pages/house-cleaning.astro)

The page is built and renders at `/house-cleaning/`. What shipped is exactly
this document's "What could ship today" list: §1–§7, §12–§15, plus header and
footer.

**§8 and §9 are built as reserved slots.** Both are blocked on *media*, not
copy, so they render `Placeholder` / `VideoPlaceholder` frames whose visible
labels double as the photo/video brief — zero layout shift when the real
assets land. Their headings are placeholder structural copy (the brief gives
these sections none) and are flagged in the open items.

**§11 is built as two bracketed `[TBC]` briefing slots**, the same convention
`index.astro` uses — the visible text states what to ask Teagan for and reads
as obviously unfinished, so it can't be mistaken for a real client quote.

**§10 is not built.** Unlike the others there is nothing to hold open: the
brief supplies no heading, columns or rows for the comparison table at all,
so there's no shape to reserve. Its place in the page order is marked with a
comment in the `.astro` file.

Two supporting changes came out of the build:

- **`src/data/navigation.ts` (new).** The header nav, its mega-menus, the
  secondary CTA and the footer's links/contact/copyright were inline in
  `index.astro`. A second page needing the identical chrome is the same
  "two real consumers" bar this library sets elsewhere, so it was extracted
  rather than copied. `index.astro` now imports it and renders identically.
- **`TextBlock.astro` gained list support** — resolving §7's 🟡 below. See
  that section for why it landed as an order-driven `body` entry rather than
  the separate `bullets` prop originally proposed.

---

## 0. Page metadata (not a rendered section)

| Field | Value | Notes |
|---|---|---|
| Title tag | `House Cleaning Services - Regular Cleans \| TLB Cleaning` | Spec notes the SEO title is the same string minus the brand tag — i.e. `House Cleaning Services - Regular Cleans` for the `<title>`'s non-brand portion. |
| Meta description | "Regular house cleaning from local mums you actually know. Same cleaner every visit, police checked and insured. Get a quote in under a minute." | 149 chars — fits. |
| URL | `/house-cleaning/` | ✅ **Decided.** Blank in the spec; ruled on separately. Note this file is named `home-cleaning.md` after the brief's own title, not after the slug — the page ships at `/house-cleaning/`. See "Slug conflict" below for the one code change this implies. |
| Focus keyword | `house cleaning services` | Drives the H1/H2/entity coverage below. Secondary keyword `house cleaning near me` is assigned specifically to the "Where We Clean" H2 (§12). |
| Google Classification Type | — | **Blank.** Spec names the tool (rqpredictor.streamlit.app) but no output was run/pasted in. |
| Related keywords | — | **Blank.** Spec says "Add on Getstat" but no grouped list was supplied. |
| Query fan-outs | — | **Blank.** Spec names the tools (Qforia, aicoverage.locomotive.agency) but no generated queries were supplied. |
| Entities | — | **Blank.** No named entities listed to weave into the copy. Note the brief's own body copy already surfaces several real ones worth keeping (Northern Rivers, Southern Gold Coast, Home Care Packages, DVA) — those are content, not a substitute for the entity research row. |

### Slug conflict — one resolved, two still open

Three of this page's own links, plus the page's own URL, disagreed with
slugs already live in [`src/pages/index.astro`](../src/pages/index.astro):

| This brief says | Already in `index.astro` | Status |
|---|---|---|
| This page (filename `home-cleaning`) | `/home-cleaning/` (header mega-menu top-level) **and** `/house-cleaning/` (hero CTA, PathwayCards, "What we do") | ✅ **Resolved: `/house-cleaning/`, and applied.** The majority of the site already pointed there ([`index.astro:88`](../src/pages/index.astro#L88), [`:114`](../src/pages/index.astro#L114), [`:244`](../src/pages/index.astro#L244) — unchanged). The mega-menu's top-level `href` at [`index.astro:373`](../src/pages/index.astro#L373) has been updated from `/home-cleaning/` to `/house-cleaning/` and its `reconcile before launch` comment retired. The Level A label stays "Home Cleaning" (the sheet's own wording) — only the slug changed. |
| `/end-of-lease-cleaning` (§3 card 2) | `/end-of-lease-and-bond-cleaning/` in the mega-menu, `/end-of-lease-cleaning/` everywhere else | ✅ **Resolved: `/end-of-lease-cleaning/`, and applied** at [`index.astro:381`](../src/pages/index.astro#L381). The menu keeps the sheet's fuller label ("End of lease and bond cleaning") — only the slug changed. |
| `/senior-home-cleaning` (§3 card 3) | `/aged-care-retirement-and-seniors/` | ✅ **Resolved: `/senior-home-cleaning/`** — but **not a conflict after all, and no code change was made.** See below. |
| `/deep-cleaning` (§3 card 1) | `/deep-cleaning/` ✓ | No conflict. |

**Correction — the seniors "conflict" wasn't one.** `/aged-care-retirement-and-seniors/`
sits under **Commercial → By type of premises**
([`index.astro:434`](../src/pages/index.astro#L434)), alongside office,
strata, medical, construction and commercial-kitchen cleaning. That's
cleaning an aged-care *facility* as commercial premises. The brief's §3
card 3 is a different thing entirely: regular domestic cleaning in an older
person's own home, funded through Home Care Packages and DVA. Two real
pages, not two names for one — so the commercial item was left untouched
and `/senior-home-cleaning/` stands as the domestic page's slug.

⚠️ **New open item that falls out of that:** `/senior-home-cleaning/` has
**no mega-menu entry anywhere**. §3's card 3 links to a page the site's own
navigation never offers a route to. It most likely belongs under Home
Cleaning → "Inside your home", but adding a nav item is an IA decision off
the "IA & Menu" roadmap sheet, not a mapping call — flagged rather than
invented.

### ✅ Name spelling: Teagan

**Decided: Teagan.** This brief already spells the founder that way (§11's
briefing note), and commit `900749c` ("fix Tegan -> Teagan") had started the
correction. Use **Teagan** everywhere on this page.

Two leftovers exist elsewhere and are a separate cleanup, not this page's
job — recorded here so they aren't lost: the older
[`cleaning-services-homepage.md`](./cleaning-services-homepage.md) plan says
Tegan throughout, and `index.astro` plus
[`ComparisonTable.astro:29`](../src/components/sections/ComparisonTable.astro#L29)
still carry a mix of both spellings in live strings.

---

## 1. Hero

**Component: `Hero.astro`** 🟢. **Content: drafted.**

**Source copy, verbatim:**

> H1: House cleaning you never have to chase.
>
> Overview: The same local team, on the same day every time, so you can stop wondering whether anyone is turning up.

| Content | Maps to prop |
|---|---|
| H1 "House cleaning you never have to chase." | `headingLines` |
| Overview "The same local team, on the same day every time, so you can stop wondering whether anyone is turning up." | `lead` |
| "Get an instant quote" | `cta` — see the CTA-placement note below |

The overview is 20 words, squarely inside the brief's own stated 15–25 word
target for this slot. No trimming needed.

**✅ CTA placement — decided: the hero takes it.** The brief puts
`CTA - Get an instant quote` *after* the definition paragraph (§2), not in
the hero rows, but `Hero.astro`'s `cta` prop is **required**
(`cta: ButtonData`, not optional — see
[`Hero.astro:41`](../src/components/sections/Hero.astro#L41)); a hero cannot
render without one. So: `cta: { label: 'Get an instant quote', href: … }` on
the hero, and `TextBlock`'s own optional `cta` in §2 left **unset**, so the
page doesn't stack two identical buttons roughly one screen apart. The
closing CTA (§15) reuses the same label, which is correct for a closing
block.

**Variant choice — no image supplied in the spec, two honest options:**

1. **`split-single-image`** is the stronger choice for a money page: this
   is the highest-intent commercial page on the site, and a real photo of a
   real cleaner in a real home is the single most persuasive thing that can
   sit beside this H1. Needs one hero photo sourced first.
2. **`minimal`** ships today with zero sourcing dependency, and its
   `stats` prop could carry the §4 trust points instead of a separate
   `TrustBar` section — but see §4 before doing that; it isn't the right
   shape for these three phrases.

**Recommendation:** build to `split-single-image` once a hero photo exists;
use `minimal` only as a stopgap. Don't drop in stock-photo filler — ship
`minimal` rather than a placeholder that reads as final.

**Positioning (`split-single-image`):** text block (H1 + lead + CTA) on the
left, photo on the right (desktop). On mobile, copy stacks **above** the
image per the component's built-in reorder at `--bp-lg` (1025px).

---

## 2. Definition paragraph (intro block)

**Component: `TextBlock.astro`** 🟢 — `theme="light"`. This is exactly the
gap this component was built for (its `SECTIONS.md` entry cites the homepage
plan's §2 by name). **Content: drafted.**

**Source copy, verbatim — two paragraphs, one `body` entry each:**

> Regular home cleaning services are ongoing visits on a set schedule, weekly, fortnightly or monthly, that keep a lived-in house on top of things rather than resetting it.
>
> TLB Cleaning provides house cleaning services across the Northern Rivers and the Southern Gold Coast.

This is the page's definition/answer-target block — the paragraph most
likely to be lifted as a featured snippet or AI-overview answer for
`house cleaning services`. Keep it as the first prose after the hero and
don't bury it below the cards.

- `body`: the two paragraphs above, verbatim, in order.
- `heading`: omit — the spec gives none, and `TextBlock` renders fine
  heading-less.
- `cta`: **leave unset**, per the §1 CTA-placement note.
- `align`: `'center'` (the component default) suits a short two-paragraph
  definition block; `'left'` if it reads better against the hero above it.

**Positioning:** text only, no image, single column, `.container--narrow`
(800px measure) per the component's own layout.

---

## 3. Situation cards ("It's got away from me a bit" / "I'm moving out" / "It's for Mum or Dad's place")

**Component: `PathwayCards.astro`** 🟢 — three numbered cards routing
distinct situations to distinct next pages is precisely this component's
stated purpose. **Content: drafted, but needs a title/description split and
CTA labels.**

**Source copy, verbatim:**

> It's got away from me a bit. Start with a one-off deep clean, then set up a fortnightly. That way round works out cheaper than doing it the other way. (Links to /deep-cleaning)
>
> I'm moving out. That is an end of lease clean, measured against an inspection rather than your own standard. Different page. (Links to /end-of-lease-cleaning)
>
> It's for Mum or Dad's place. We do regular cleans for older clients, including through Home Care Packages and DVA. (Links to /senior-home-cleaning)

The spec writes each card as one continuous first-person block;
`PathwayCards` needs a `title` and a `description` per card. The natural
split is the opening first-person sentence as the title, the rest as the
description — proposed below, with the copy reproduced in full and nothing
dropped:

**Card 1** — `number: '1'`, links to `/deep-cleaning/`
- `title`: "It's got away from me a bit."
- `description`: "Start with a one-off deep clean, then set up a fortnightly. That way round works out cheaper than doing it the other way."

**Card 2** — `number: '2'`, links to `/end-of-lease-cleaning/` (see slug conflict, §0)
- `title`: "I'm moving out."
- `description`: "That is an end of lease clean, measured against an inspection rather than your own standard. Different page."

**Card 3** — `number: '3'`, links to `/senior-home-cleaning/` (see slug conflict, §0)
- `title`: "It's for Mum or Dad's place."
- `description`: "We do regular cleans for older clients, including through Home Care Packages and DVA."

**Open items on this component's required props:**
- `heading` / `headingAccent` — **not supplied.** `PathwayCards` renders a
  two-line heading (second line in brand yellow) above the cards; the spec
  gives this section no heading at all. Needs copy, or a decision to make
  the prop optional.
- `cta` per card — **not supplied.** Each card needs a button label; only
  the link target is given. "Deep cleaning", "End of lease cleaning",
  "Senior home cleaning" would work as plain wayfinding labels, but that's
  a copy call.
- `image` per card — **not supplied.** Three photos needed (a cluttered/
  lived-in room, a moving-out/empty room, an older person's home).

⚠️ **Card 2 is a bounce, not a conversion.** "Different page" sends
moving-out traffic away from this page deliberately. That's correct for
intent-matching and worth preserving rather than softening — but it means
this card shouldn't be the visually dominant one.

**Positioning:** image at the top of each card, number + title +
description below, CTA at the card's bottom. Three cards side by side on
desktop, stacking to one column at ≤800px per the component's breakpoint.
Dark background section by design.

---

## 4. Trust bar (boilerplate)

**Component: `TrustBar.astro`** 🟢 — built for exactly this: 3–5 short
proof-point phrases in one divided row, where only some of them are
numeric. **Content: drafted, in full.**

**Source copy, verbatim, as three `items`:**

1. "9 full-time local team members"
2. "every client came from a recommendation"
3. "Trusted by leading Northern Rivers real estate agencies"

⚠️ **Capitalisation is inconsistent in the source** — item 3 starts
capitalised, items 1 and 2 don't. Kept verbatim above rather than silently
normalised; pick one convention before build (sentence case on all three
reads best in a divided row).

⚠️ **Copy differs from the homepage's own trust bar** — that one says "9
full-time local cleaners, employed not subcontracted"; this one says "9
full-time local team members". Same number, different wording. Fine if
deliberate, worth reconciling if not.

**Not** `StatBand.astro` or `MetricsBlock.astro` (both contract on a
`value` figure per item — two of these three phrases aren't numeric), and
not `Hero.astro`'s `minimal` + `stats` (same value/caption shape). This is
the distinction `TrustBar` exists to hold.

**Positioning:** ⚠️ **Spec note — order conflict.** The doc's own text says
this sits "directly under the hero," even though its table row comes after
the cards. Per Step 3 of this mapping process, follow the stated intent,
not the table position: place this **between the Hero (§1) and the
definition paragraph (§2)**. Text-only, single row, no images; stacks to
border-top dividers below `--bp-sm`.

---

## 5. "What's included in every visit" — the inclusions table

**Component: `ComparisonTable.astro`** 🟢. **Content: drafted, in full.**
One table now carries the room list *and* both scope lists, replacing the
`ServiceBlocks` `list` + `ContentGrid` pair this plan originally specified.

### ⚠️ This supersedes an earlier ruling in this document

An earlier draft ruled `ComparisonTable` **out** here, on the grounds that
"a one-column table where every cell is a tick carries no information the
row label doesn't." That reasoning was sound for the shape it was judging —
a single Included column — but it was answering the wrong question. Folding
the two scope lists in gives the table a real second axis, and three
genuinely different states to distinguish. It is comparison data after all.

### Column design — one column, three states

`ComparisonTable`'s `values` accepts a **string** as well as a boolean, and
a cell rendered as a short note is what carries the middle state:

| Cell | Means |
|---|---|
| ✓ | In every clean, at no extra cost |
| "Quoted separately" | We do it, but it's priced separately |
| ✗ | We don't do it at all |

**Two earlier designs were tried and dropped, in order:**

1. **Three columns** (Included / Quoted separately / Not included) — puts a
   check mark under a negative heading, so a tick ends up meaning "yes, we
   don't do this." Backwards, and it spends a whole column on crosses.
2. **Two columns** (Every regular clean / Quoted separately) — fixed the
   inversion, since ✓ then always meant "we do this" and the third state
   fell out of the ✗ ✗ combination. But it still cost a full column to
   express one state, and left exclusion rows carrying a cross under a
   heading they had nothing to do with.

Folding that middle state into the cell text keeps the distinction this
plan flagged as mattering most — "costs extra" is not the same answer as
"we don't do this" — at half the width.

- `heading`: "What's included in every visit."
- `lead`: "What's included in every regular clean, and what sits outside it."
- `cornerLabel`: "Room by room"
- `columns`: a single "Every regular clean" (`highlight: true`)
- `footnote`: states what a cross means and that anything marked quoted
  separately is still available, so the encoding is never left to inference.

### Rows

The five rooms keep their full task lists as `description`, so nothing from
the brief's room-by-room detail is lost in the move to a table.

| Row | Description | Every regular clean |
|---|---|---|
| Kitchen | Benchtops, splashback, stovetop, sink and taps, cupboard fronts, microwave outside, bin, floors. | ✓ |
| Bathrooms and toilets | Shower, screen, bath, basin, taps, mirror, toilet inside and out, floors. | ✓ |
| Bedrooms and living areas | Beds made, surfaces dusted, mirrors, skirting boards spot-cleaned, vacuum and mop. | ✓ |
| Laundry room | Sink, benches, appliance fronts, floors. | ✓ |
| Throughout | Cobwebs, switches and handles, all floors. | ✓ |
| Inside the oven | — | Quoted separately |
| Carpet steam cleaning | — | Quoted separately |
| Windows | — | Quoted separately |
| Blinds | — | Quoted separately |
| Inside the fridge | — | Quoted separately |
| Dishes | — | ✗ |
| Washing, drying and folding clothes | — | ✗ |
| Tidying or organising belongings | — | ✗ |
| Moving heavy furniture | — | ✗ |

### ⚠️ A content collision the table exposed

The brief lists **"Laundry"** as an included room *and* **"laundry"** among
the not-included tasks. Two different things — the laundry room versus
washing your clothes — which read as a flat contradiction once they sit as
sibling rows in one table. Disambiguated as **"Laundry room"** and
**"Washing, drying and folding clothes"**. Don't shorten either back.

This collision was invisible while the two lists lived in separate
components; it only surfaced when they were put on a shared axis.

**Positioning:** full section width (`.container`, not `--narrow`), no
imagery. Desktop: standard table, sticky first column. Mobile (≤768px):
stacked cards, one per row, with the column label on the left and the value
on the right.

⚠️ **Minor mobile readability note.** The component's mobile layout repeats
the column label beside every value, so a "Quoted separately" row reads
"Every regular clean · Quoted separately" on one line — very slightly like
a contradiction, though the footnote resolves it. Inherent to the
single-column shape plus the component's `::before` data-label pattern, not
a bug. Worth a look if mobile is the priority surface.

⚠️ **Not to be confused with §10**, the "how TLB compares" table. Two
different tables on one page: this one is scope (what a clean covers), §10
is competitive positioning. §10 is still unbuilt for want of content.

**No icons needed.** The `ServiceIcon.astro` mismatch noted in earlier
drafts is moot — the table has no icon slot, so nothing decorative is
being forced.


## 6. "The first one takes longer."

**Component: `TextBlock.astro`** 🟢 — `theme="light"`, with `heading` set.
**Content: drafted, in full.**

**Source copy, verbatim:**

> H2: The first one takes longer.
>
> We start from wherever the house is, so the first visit is longer than the ones after it and priced differently. If it has been a while, a one-off deep clean first works out better value than paying for a long first regular clean. We'll tell you honestly which one you need.

- `heading`: "The first one takes longer."
- `body`: the single paragraph above, verbatim.
- `align`: `'left'` reads better than centered for a paragraph this long.

⚠️ **Content overlap with §3 card 1** — both tell the "start with a deep
clean, then go regular" story. That's reinforcement rather than duplication
(card = wayfinding, this = the pricing reason), but if the two end up within
a screen of each other after the §4 reorder, one should be tightened.

**Positioning:** text only, no image, single column, narrow measure.

---

## 7. "The why" — Nobody leaves a cleaner over the cleaning

**Content: drafted, in full.**

**Source copy, verbatim:**

> H2: Nobody leaves a cleaner over the cleaning.
>
> They leave because:
> - The messages stopped getting answered.
> - The good one moved away, or got busy.
> - Month four arrived and the bathroom quietly stopped being done properly.
> - Nobody wanted to be the person who raised it. So it went back on your list.
>
> What you want isn't a spotless house. It's to stop thinking about it.
>
> So we built the opposite. Nine local cleaners, employed properly, still here next year. Nothing to chase, nothing to raise at month four. We've got you covered.

✅ **Resolved — `TextBlock.astro` now supports lists.** It previously
rendered one `<p>` per `body` entry and nothing else, with no `<ul>`
anywhere in it, which would have flattened the four "They leave because"
items — the rhetorical engine of this block — into staccato prose.

**Built as an order-driven `body` entry, not the separate `bullets: string[]`
prop this plan originally proposed.** A trailing `bullets` prop can only put
a list *after* all the paragraphs, and this copy needs the list **between**
the lead-in line and the two closing paragraphs. So `body` now takes either
a string (a paragraph) or `{ list: [...] }` (a bullet list), in source order
— the same "array order is the layout" call `StoryMosaic.astro` and
`ContentGrid.astro` already make. `string[]` still satisfies the type, so
`index.astro`'s two existing `TextBlock`s are unchanged.

```ts
body: [
  'They leave because:',
  { list: ['The messages stopped getting answered.', /* …3 more */] },
  "What you want isn't a spotless house. It's to stop thinking about it.",
  'So we built the opposite. …',
]
```

Markers are drawn as `::before` pseudo-elements rather than by re-enabling
`list-style`, because `reset.css` clears list markers globally and a
pseudo-element marker can take its colour from the theme token. In a
centred block the list stays left-aligned — centred bullet text is
unreadable past a few words.

**Theme:** `dark`. The homepage plan makes the same call for its own "why"
block, and it gives the page useful pacing between the light inclusions list
above and the credibility imagery below.

**Positioning:** text only, no image, single column, narrow measure.

---

## 8. Credibility signals (before/after imagery)

**Content: drafted as a direction, not as copy.**

**Source copy, verbatim:**

> Visual signals to indicate credibility and trust - text supported by visuals
>
> Before and after images from genuine TLB jobs, with client permission and no identifying detail.

🟡 **No component has a paired before/after concept.** Nothing in
`SECTIONS.md` pairs two images as a single before→after unit — no slider,
no split-frame, no linked pair. The closest options:

1. **Recommended: `PhotoGallery.astro`, variant `filmstrip`.** It's the
   only gallery variant with a per-image `caption` field, which is what
   carries "Before" / "After" — on `grid` the `caption` field is silently
   ignored, so pairs would be unlabelled and the whole point would be lost.
   Click-to-expand also suits detail shots. `heading` and `lead` both
   optional and supported.
2. **`PhotoGallery.astro`, variant `grid`** if captions genuinely aren't
   needed because each image is a single composite before/after frame (i.e.
   the pairing happens in the photo file, not in the layout). Simplest build
   *if* the photos are supplied that way — worth asking, because it changes
   the component choice.
3. **`ContentGrid.astro`** at `columns={2}` with alternating `image` cells
   — gives literal side-by-side pairing per row, but `image` cells carry no
   caption either, so before/after labels would have to live in interleaved
   `text` cells. Clunky.

🔒 **Images not supplied.** The brief is explicit about the constraints —
genuine TLB jobs, client permission obtained, no identifying detail. Don't
build this section with stock or placeholder before/after imagery: a
fabricated "before and after from a real job" is a false trust claim, not
filler. Ship the page without this section if the photos aren't ready.

**No heading copy supplied** for this section either.

**Positioning:** `filmstrip` puts optional heading + lead beside the image
row on desktop, stacking the text above the row below `--bp-lg`; the row
itself scrolls horizontally on narrow screens rather than collapsing.

---

## 9. Hero video — James testimonial

**Component: `VideoFeature.astro`** 🟢 — a centered heading over one
constrained video slot is exactly this component. **Content: blocked.**

**Source copy, verbatim:**

> H2: Hero video
>
> James video testimonial

- `headingLines`: 🔒 **blocked** — "Hero video" is a section label, not page
  copy. Needs a real H2.
- `video.label`: descriptive alt-text label, e.g. "James, regular TLB
  client, on camera" — needs confirming against who James actually is (the
  brief names him with no other context).
- `video.caption`: optional short line over the frame — not supplied.
- **The video file itself is not supplied.** `VideoPlaceholder` reserves the
  slot with zero layout shift, so the section can be built and the real
  embed dropped in later without touching layout.

⚠️ Minor: `VideoFeature.astro` uses a hardcoded `id="video-feature-heading"`
rather than the per-instance random suffix `Faq`, `TextBlock` and
`ServiceBlocks` all use. Harmless here (one instance on this page), but it
would collide if a second video section is ever added to the same page.

**Positioning:** centered heading above, single centered video frame below,
constrained width. No other imagery.

---

## 10. Comparison table

**Component: `ComparisonTable.astro`** 🟢 — the component exists and is the
right one. **Content: 🔒 fully blocked.**

The brief's row is a bare `P / New / Comparison Table` with **no heading, no
`cornerLabel`, no columns, no rows and no footnote** — the section's shape is
named and nothing else. There is nothing to map.

What this component needs before it can be built:
- `columns` — the compared entities (the homepage uses "TLB Cleaning"
  highlighted vs. "Other Brands").
- `rows` — one entry per feature, each with a `label`, an optional
  `description` second line, and a `values` array aligned 1:1 with `columns`
  (`true`/`false` → check/cross icon, or a short string like `"Sometimes"`).
- `heading` and/or `cornerLabel` — two distinct headings by design on the
  homepage build, not a duplicate.

⚠️ **Don't copy the homepage's table across.** Its five rows are all
company-level claims (employed not subcontracted, local mums, grew without
advertising, ongoing agency contracts) — they'd be a straight duplicate on
this page. A regular-cleaning page's comparison should compare what a
*regular clean* gets you (same cleaner every visit, cover when they're sick,
skip a week and keep your spot, priorities honoured each visit) — i.e. the
exact claims §13 and §14's FAQs already make. Worth briefing that way rather
than filling the component with the homepage's rows.

**Positioning:** full section width (`.container`, not `--narrow`), no
imagery. Desktop: standard table, sticky first column, horizontal scroll on
overflow. Mobile (≤768px): stacked cards, one card per feature.

---

## 11. Social proof (testimonials)

**Component: `TestimonialCarousel.astro`** 🟢. **Content: 🔒 blocked — no
quotes drafted.** The spec supplies a briefing task rather than copy, quoted
in full so it isn't lost:

> Ask Teagan for regular-client testimonials. Brief her on the two jobs they
> need to do:
> - One from a long-standing client, ideally naming how long they have been
>   with TLB. Tenure is the proof this page needs.
> - One from a client who had been through several cleaners before. The
>   category evidence shows churn is the norm, so the switcher story
>   converts.

With exactly 2 testimonials, use the **`uniform`** flag — equal sizing reads
better than one card artificially scaled up over the other when there are
only two.

*(Correction to an earlier draft of this plan: it claimed 2 items render
without arrows or dots. That's wrong — per `SECTIONS.md`, only a **single**
testimonial suppresses them. Verified on the built page: 2 items render
working arrows and dots. `uniform` is still the right call, just not for
that reason.)*

`heading` not supplied by the brief — needs copy.

Each testimonial also needs `name`, `role`, `rating` and an `avatar` image —
none supplied, and the avatar is a real person's photo requiring permission.

✅ **Built as two bracketed `[TBC]` briefing slots**, matching the
convention `index.astro` already uses for its own testimonial section: the
visible text states the brief ("ask Teagan for a quote from a long-standing
client…") and reads as obviously unfinished, so it cannot be mistaken for a
real customer saying a real thing.

⚠️ **That is the only safe form of placeholder here.** Never fill these
slots with invented names or invented words — a fabricated client quote
misrepresents real customers on an outward-facing trust signal. Swap each
slot for a real quote as it's collected.

Two slots, not the homepage's three: the brief specifies exactly two jobs
for this page (tenure, and the switcher story). The homepage's third slot
has no brief-specified angle, so there's no third story to reserve here.

Minor, placeholder-only: the avatar `Placeholder` labels overflow their
circular frames while empty. They disappear the moment real avatars land.

**Positioning:** each card carries its own small avatar + quote +
name/role/star rating inline — the standard card layout, no separate image
placement decision.

---

## 12. Where We Clean

**Component: `TagCloud.astro`** 🟢 — exact match for a flat, linkable list
of locations. **Content: drafted.** Target keyword for this section:
`house cleaning near me`.

**Source copy, verbatim:**

> Northern Rivers and Tweed: Byron Bay, Ballina, Lennox Head, Brunswick Heads, Tweed Heads, Kingscliff, Pottsville, Murwillumbah, Lismore
> Southern Gold Coast: Coolangatta, Burleigh Heads, Palm Beach
> (link each one to its page)

- `heading`: "Where We Clean"
- `subheading`: 🔒 **not supplied** — `TagCloud` renders one, and the
  homepage plan has a line for it ("From Ballina to Burleigh, and both sides
  of the border."). Needs its own copy here, or reuse.
- `note`: optional closing lines — not supplied.
- `tags`: one pill per suburb. `TagCloud` has no grouping prop inside the
  tag grid, so listing NSW before QLD (matching the spec's own grouping) is
  the only way to visually cluster them:
  - **Northern Rivers and Tweed:** Byron Bay, Ballina, Lennox Head,
    Brunswick Heads, Tweed Heads, Kingscliff, Pottsville, Murwillumbah,
    Lismore
  - **Southern Gold Coast:** Coolangatta, Burleigh Heads, Palm Beach

⚠️ **This list differs from the homepage's.** That page lists 14 suburbs
including **Ocean Shores** and **Alstonville**; this one lists 12 and drops
both. Deliberate scoping (regular cleaning covers a smaller radius) or an
oversight? Needs confirming — the two pages shouldn't disagree about where
TLB works without a reason.

Each tag needs an `href` to its own location page — not supplied here either
(same open item as the homepage plan; needs the slug pattern).
`isHighlighted` is worth considering on Tweed Heads and/or Coolangatta as
the border-crossing anchor towns.

**Positioning:** no imagery — responsive pill grid, 4 columns desktop, 2
tablet, 1 mobile.

---

## 13. Branded FAQs

**Component: `Faq.astro`** 🟢 — accordion, **instance 1 of 2**. Its
exclusivity groups are scoped per-instance (build-time random `name`
suffix), so two `<Faq>` sections on one page won't cross-collapse.
**Content: all 4 drafted, in full. Nothing blocked.**

- `heading`: not supplied — "Frequently Asked Questions" matches the
  homepage's branded instance.

1. **"Who's in my house when I'm at work?"**
   > Someone you've met. We'll introduce the cleaner looking after your home before the first visit, so you never open the door to a stranger. How we get in is agreed when you book.
2. **"Why not just find a cleaner through a local Facebook group?"**
   > Plenty do, and it works until they get sick, go on holiday or move on. We're nine employed cleaners, so there's cover, and we're still the same local mums you'd have found there anyway.
3. **"Can I skip a clean when we're away?"**
   > Yes, just let us know ahead of time and we'll move it or skip it. Your spot stays yours. Most families skip a fortnight over Christmas and pick straight back up in January.
4. **"What happens at the first visit?"**
   > It takes longer than the ones after it, because we're starting from wherever the house is. We'll walk through with you, agree the priorities, and set the rhythm from there.

⚠️ Answer 4 restates §6 ("The first one takes longer") almost exactly. That's
fine and normal for an FAQ — the same fact reached by a different route —
but don't let one get edited without the other.

**Positioning:** text-only accordion, no images.

---

## 14. Non-branded FAQs

**Component: `Faq.astro`** 🟢 — accordion, **instance 2 of 2**.
**Content: 2 of 5 drafted clean; 3 of 5 drafted but carrying explicit
`[TLB TO CONFIRM]` brackets.**

- `heading`: not supplied — "Cleaning FAQs" matches the homepage's
  non-branded instance.

1. **"Do I need to tidy up before you arrive?"** — drafted, no flag:
   > Tidy, don't clean. Clearing benchtops, floors and vanities makes a real difference, because time spent moving your things is time not spent cleaning. Put away clothes, toys, dishes and anything fragile. Leave the actual cleaning to us. If the house is cluttered on the day we clean around it, and some of the detail gets missed.
2. **"Is there a minimum booking?"** — ⚠️ **`[TLB TO CONFIRM.]`**
   > Most cleaning companies set a minimum of around two hours, because anything shorter cannot be done properly once travel and setup are counted. Tell us the size of your place when you book and we will tell you honestly what it needs.

   The bracket sits at the *front* of this answer: the draft describes what
   "most cleaning companies" do and never states TLB's own minimum. As
   written it doesn't answer its own question. Needs TLB's actual minimum
   before publishing.
3. **"What if my cleaner is sick or on holiday?"** — ⚠️ **`[TLB TO CONFIRM cover arrangements.]`**
   > Because our team is employed rather than subcontracted, there is somebody to cover, and we'll let you know in advance rather than leaving you wondering on the day. This is the main practical advantage of a team over a sole operator.
4. **"Do you bring your own products and equipment?"** — ⚠️ **`[TLB TO CONFIRM product range.]`**
   > Yes. Our team arrives with everything needed, so you don't have to supply anything or set anything out. If you'd rather we used particular products in your home, because of a baby, an allergy or a pet, tell us when you book and we'll use what you've got or bring an alternative.
5. **"Can I ask for particular things to be prioritised each visit?"** — drafted, no flag:
   > Yes, and most regular clients do. Tell us what matters most in your house, whether that's the bathrooms, the floors or the kitchen, and we'll work to that order every visit. If your priorities change, message us and we'll update the notes on your booking.

Items 2, 3 and 4 are **operational-policy claims about TLB specifically** (a
minimum charge, a cover guarantee, what products staff carry) — higher risk
than the homepage's generic service-education FAQs, because a client can
hold TLB to them. Don't publish those three until confirmed.

⚠️ **The meta description makes two claims this page never supports:**
"police checked" and "insured" appear in the meta description (§0) and
nowhere in the body copy. Either add them to the trust bar (§4) or an FAQ,
or drop them from the description — a meta description promising proof the
landing page doesn't show is a bounce.

**Positioning:** text-only accordion, no images.

---

## 15. Closing CTA

**Component: `CallToAction.astro`** 🟢 — variant `secondary` (flat band,
heading + lead + one CTA, no image, no secondary links). This matches the
spec's instruction — "one paragraph, one button, no secondary links" —
exactly; `primary` would add an image slot and `form` an email field.
**Content: partly blocked.**

**Source copy, verbatim:**

> Closing block. One paragraph, one button, no secondary links.
> Get an instant quote

- `cta`: "Get an instant quote" — drafted. Same label as the hero CTA (§1),
  which is correct for a closing block.
- `heading` / `lead`: 🔒 **blocked** — the closing paragraph isn't drafted;
  only the section's shape is described.
- `image`: omit, per the spec's own minimalism.

**Positioning:** centered text + single button, no image, flat band — last
section before the footer.

---

## Full page order (as it should build, not as the source doc lists it)

1. `SiteHeader`
2. `Hero` — H1, overview, "Get an instant quote" *(image TBD: `split-single-image` once sourced, `minimal` as stopgap)*
3. `TrustBar` 🟢 — moved up per the spec's own instruction ("directly under the hero"); its table row sits lower
4. `TextBlock` (light) — definition paragraph
5. `PathwayCards` — 3 situation cards *(heading, card CTAs and images all missing)*
6. `ComparisonTable` (single column) — "What's included in every visit." (rooms + both scope lists in one table)
7. `TextBlock` (light) — "The first one takes longer."
8. `TextBlock` (dark) 🟡 — "Nobody leaves a cleaner over the cleaning" *(needs a `bullets` prop, or the four reasons run as paragraphs)*
9. `PhotoGallery` (filmstrip) 🟡 — before/after credibility images *(built as labelled placeholder slots; photos + heading still needed)*
10. `VideoFeature` — James testimonial *(built as a labelled placeholder slot; video + real H2 still needed)*
11. `ComparisonTable` ("How TLB compares") — **not built** *(brief supplies no rows at all; distinct from §5's inclusions table)*
12. `TestimonialCarousel` (uniform, 2 items) — *(built as `[TBC]` briefing slots; real quotes, names, roles and avatars still needed)*
13. `TagCloud` — Where We Clean
14. `Faq` #1 — branded *(all 4 answers ready)*
15. `Faq` #2 — non-branded *(3 of 5 pending confirmation)*
16. `CallToAction` (secondary) — closing CTA *(paragraph blocked)*
17. `SiteFooter`

**Everything above is built except item 11**, the "How TLB compares" table —
the one section with no supplied content to reserve a shape for. Items 9, 10
and 12 are live as labelled placeholder slots.

---

## Open items before this can be built

### ✅ Settled

- **This page's URL: `/house-cleaning/`** (§0) — **applied.** The mega-menu's
  top-level `href` at [`index.astro:373`](../src/pages/index.astro#L373) now
  points there; nothing else in the file needed changing.
- **The hero carries the "Get an instant quote" CTA** (§1); `TextBlock`'s
  own `cta` in §2 stays unset.
- **§5 builds as a single `ComparisonTable`, one column** — rooms plus both
  scope lists, with "Quoted separately" carried as cell text rather than its
  own column (see §5 for the two designs tried before it). Supersedes the
  earlier `ServiceBlocks` + `ContentGrid` split.
- **Founder spelling: Teagan** (§0). Strays in `index.astro`,
  `ComparisonTable.astro` and the older homepage plan are a separate
  cleanup.

- **All three slugs settled** (§0): this page at `/house-cleaning/`, §3 card
  2 at `/end-of-lease-cleaning/`, §3 card 3 at `/senior-home-cleaning/`.
  The first two are applied in `index.astro`; the third needed no code
  change, because the commercial aged-care item it looked like it clashed
  with is a genuinely different page.

- **§7's list support** — built as an order-driven `body` entry on
  `TextBlock.astro`. See §7.

### Still open

**Navigation:**
- **`/senior-home-cleaning/` has no mega-menu entry** (§0). §3's card 3
  links to it, but nothing in the header routes there. Probably belongs
  under Home Cleaning → "Inside your home" — needs a call against the "IA &
  Menu" roadmap sheet.

**Content, fully blocked (no copy exists):**
- Comparison table (§10) — heading, columns, rows, all of it. Brief it
  against *regular-clean* claims, not the homepage's company-level rows.
- Testimonials (§11) — two real quotes per the brief's own sourcing
  instructions, plus names, roles, ratings and avatar photos. The section is
  live on the page with bracketed `[TBC]` slots, so this copy is visible to
  anyone previewing it — replace before launch.
**Placeholder copy now live on the page — replace before launch.** These
sections render, so nothing looks broken; the copy in them is structural
filler, not approved marketing:
- §8 heading "The difference, on real jobs." and its lead line.
- §9 heading "A word from James." — the brief's row reads only "Hero video"
  / "James video testimonial", a section label and an asset note, neither of
  which is page copy. **Also confirm who James is:** he's named with no
  other context, and the video slot's label currently asserts he's a regular
  client.
- §3's card `heading` + `headingAccent`, and the three card CTA labels.
- §12's `TagCloud` subheading (borrowed from the homepage).
- §15's closing paragraph (echoes the hero, same stopgap `index.astro` uses).
- Both FAQ headings (§13, §14), matched to the homepage's.

**Content, drafted but pending TLB's confirmation before publishing:**
- Non-branded FAQ 2 "Is there a minimum booking?" — and note it currently
  never states TLB's actual minimum, so it doesn't answer itself yet.
- Non-branded FAQ 3 "What if my cleaner is sick or on holiday?" (cover
  arrangements).
- Non-branded FAQ 4 "Do you bring your own products and equipment?" (product
  range).

**Component work needed:**
- ✅ **`TextBlock.astro` list support** (§7) — built.
- 🟡 **No before/after image pairing exists anywhere** (§8) — `PhotoGallery`
  `filmstrip` is in use as the closest fit, being the only variant whose
  `caption` field actually renders. **Seen on the rendered page:**
  `filmstrip` grows the active frame and shrinks the rest, so a Before and
  its own After are never the same size at once — which is the very
  comparison the pair is asking the viewer to make. Fine while these are
  placeholders; if the pairing must read at a glance once real photos land,
  that wants a genuinely paired component, not a variant swap. Confirm
  first whether the photos are composite before/after frames, which would
  make `grid` sufficient and moot the whole thing.
- 🟡 **`PathwayCards` heading is not optional** (§3) — the spec gives this
  section no heading. Either write one or make the prop optional.
- ⚠️ `VideoFeature.astro` has a hardcoded heading `id` (§9) — fine for one
  instance, would collide on two.

**Images/media needed but not supplied.** Every slot below is already
reserved on the page as a labelled `Placeholder`, so the visible label *is*
the shooting brief and dropping in a real `src` causes no layout shift:
- Hero photo (§1) — only needed if moving from `minimal` to
  `split-single-image`.
- 3 situation-card photos (§3): a lived-in kitchen, an empty moving-out
  room, an older person's living room.
- 4 before/after job photos (§8), currently briefed as two pairs — kitchen
  benchtop/splashback and shower screen/tiles. **Constraints are
  non-negotiable:** genuine TLB jobs, client permission obtained, no
  identifying detail. Never substitute stock photography here; a fabricated
  "before and after from a real job" is a false trust claim, not filler.
- The James testimonial video (§9).
- 2 testimonial avatars (§11) — not yet slotted, since that section isn't
  built.

**Copy consistency to reconcile across pages:**
- Trust bar wording (§4) — "9 full-time local team members" here vs. "9
  full-time local cleaners, employed not subcontracted" on the homepage.
- Suburb list (§12) — 12 here vs. 14 on the homepage; Ocean Shores and
  Alstonville dropped.
- Meta description (§0, §14) — "police checked" and "insured" are promised
  there and proven nowhere on the page.
- Trust bar capitalisation (§4) — items 1 and 2 lowercase, item 3
  capitalised.

**Metadata/research inputs still blank:** URL slug, Google Classification
Type, related keywords, query fan-outs, named entities (§0).

**Other open items:**
- Location page URLs for the 12 `TagCloud` suburb links (§12) — needs the
  slug pattern, same open item as the homepage plan.
- ~~`ServiceIcon.astro` has no cleaning-relevant glyphs (§5)~~ — moot now
  that §5 is a table with no icon slot.
