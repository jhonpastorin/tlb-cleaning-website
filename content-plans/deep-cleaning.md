# Content plan: "House Deep Cleaning Services — One-Off" page

Source: TLB Cleaning **Deep Cleaning** content brief, **second revision
(2026-09-08)** — focus keyword `house deep cleaning services`. Maps every
content block to a section component from [`SECTIONS.md`](../SECTIONS.md),
states positioning, and flags anywhere the spec has no clean 1:1 match or the
copy is unconfirmed.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap. Content status:
**drafted** (ships as-is), **drafted, pending confirmation** (bracketed
`[CONFIRM]` in the source), **blocked** (no usable copy or media exists).

Built at [`src/pages/deep-cleaning.astro`](../src/pages/deep-cleaning.astro),
shipping at `/deep-cleaning/`. No slug conflict.

---

## What the second brief resolved

The first build shipped with three 🚩 launch blockers and two open decisions.
The revised brief closes all five.

| Was blocked | Now |
|---|---|
| 🚩1 Meta description was **end-of-lease copy** on a deep-cleaning page; the build ran a placeholder written from the H1. | ✅ Real deep-cleaning copy supplied. Ships verbatim. |
| 🚩2 Branded FAQ promised "the task list is published on this page" — and no task list existed. | ✅ §5 **is** that task list: five rooms plus the two exclusion groups. The answer is now true. |
| 🚩3 Branded FAQ 4 carried a literal `[X] days` lead time, held back. | ✅ Question dropped from the brief entirely. Nothing held back for an unfilled number. |
| §7 Credibility signals — **removed at TLB's direction**, because the old brief's row was empty and the first build had filled it on the sibling page's premise. | ✅ Specified outright: "before and after images from genuine TLB deep cleans, with client permission and no identifying detail". The earlier guess was right; it just wasn't briefed. Rebuilt as reserved slots. |
| §12 "Where we clean" — **not built**, because it meant silently picking one of the site's disagreeing suburb lists. | ✅ Its own three-region, 56-town list supplied. Built — see §12 for the two flags it raises instead. |

Also rewritten by the revision: the hero subheadline (the old one ran 31 words
against the brief's own 15–25 target; the new one's second sentence is now the
page's three-part promise, which §10 expands), the whole of §7's comparison
table, and the FAQ set (now ten questions in one block, not 4 + 5 in two).

---

## 0. Page metadata

| Field | Value | Notes |
|---|---|---|
| Title tag | `House Deep Cleaning Services - One-Off \| TLB Cleaning` | Drafted, unchanged between revisions. |
| Meta description | "A one-off deep clean that resets the whole house, room by room, across the Northern Rivers and the Tweed. Published task list, quoted before we start." | ✅ Real copy now — was the 🚩1 placeholder. |
| URL | `/deep-cleaning/` | |
| Focus keyword | `house deep cleaning services` | Answer-targeted by §2, verbatim. |
| Canonical | `https://example.com/deep-cleaning/` | ⚠️ Placeholder domain, same as every other page. Confirm before launch. |
| Google Classification Type · Related keywords · Query fan-outs · Entities | — | Still **blank** in the brief, as in revision 1. Tools named, no output pasted. |

⚠️ The description says "the Northern Rivers and the Tweed" while §2 and §12
both include the **Southern Gold Coast**. Not wrong — a description can't
carry everything — but it's the third region that gets dropped whenever
something has to be cut, and it's the one in a different state. Worth deciding
once whether QLD is in the service story or not.

---

## Full page order

| # | Section | Component | Status |
|---|---|---|---|
| — | Site chrome | `SiteHeader` | |
| 1 | Hero | `Hero` `split-single-image` | drafted 🟢 |
| 4 | Trust bar (5 points) | `TrustBar` `card` | drafted 🟢 · component extended |
| 2 | Definition paragraph | `TextBlock` `muted`, inside `Backdrop` | drafted 🟢 |
| 3 | Situation cards | `PathwayCards` | drafted 🟢 |
| 5 | What's included | `ContentGrid` `columns={2}` | drafted, **pending confirmation** 🟢 |
| 5b | Quoted separately / not included | `Callout` `note` | drafted, **pending confirmation** 🟢 |
| 6 | When people book one | `ContentGrid` `columns={3}` | drafted 🟢 |
| 7 | Deep / regular / bond comparison | `ComparisonTable`, `#compare` | drafted 🟢 |
| 8 | Before-and-after images | `PhotoGallery` `grid` | **media blocked** 🟢 |
| 9 | Hero video | `VideoFeature` | **media blocked** 🟢 |
| 10 | Easy to book, instant pricing | `TextBlock` `dark` + CTA | drafted 🟢 |
| 11 | Testimonials | `TestimonialCarousel` `uniform` | **blocked** 🟢 |
| 12 | Where we clean | `TagCloud` `groups` | drafted 🟢 · component extended · **2 flags** |
| 13 | FAQs (10, one block) | `Faq` | drafted, 3 **pending confirmation** 🟢 |
| 14 | Closing block | `CallToAction` `secondary` | drafted 🟢 |
| — | Site chrome | `SiteFooter` | |

The trust bar sits directly under the hero per the brief's own text, ahead of
its table-row position — same call as revision 1.

---

## 1. Hero — `Hero.astro` 🟢 · drafted

> H1: One clean to reset the whole house
>
> Subheadline: Before the guests arrive, after the party, when you move in, or when it's just got away from you. Easy to book, instant pricing, cost effective.

`variant="split-single-image"`, `imagePosition="right"`, `ratio="16/9"`
matching the asset's native 1920×1080 so the cut-out figure isn't cropped
once the layout goes single-column. The figure faces left, into the copy.

`cta` is `quoteCta` ("Get an instant quote"). The brief places that button
after the §2 definition paragraph, but `Hero.astro`'s `cta` prop is
**required**, so it lives here and §2's stays unset — same ruling as the
house-cleaning page.

---

## 2. Definition paragraph — `TextBlock.astro` 🟢 · drafted

Unchanged between revisions. The answer-target block for `house deep cleaning
services`; stays the first prose after the hero. `theme="muted"`,
`align="left"`, one `body` entry, `cta` unset.

Shares one photo behind a Cream scrim with the trust bar above it, via
`ui/Backdrop.astro` at `opacity={75}` — which keeps Dark Teal body copy above
4.5:1 over the darkest part of the frame.

---

## 3. Situation cards — `PathwayCards.astro` 🟢 · drafted

Card copy is one continuous first-person block each; split into `title` (the
opening statement) + `description` (the rest).

| Card | Title | → |
|---|---|---|
| 1 | Actually, I want this regularly | `/house-cleaning/` |
| 2 | I'm moving out | `/end-of-lease-cleaning/` |
| 3 | I'm not sure which I need | `#compare` (§7 on this page) |

Card 3's destination is now **specified by the brief** ("anchor link to the
comparison table below"), where revision 1's build had to infer it. The
anchor is an `id` on a wrapper `<div>` — `ComparisonTable` takes no `id` prop
and adding one purely for an anchor target isn't worth a shared-component
change.

Open: section `heading`/`headingAccent` and the three CTA labels are **not in
the brief** — placeholder structural copy. The three photos are sourced.

---

## 4. Trust bar — `TrustBar.astro` 🟢 · drafted · **component extended**

Five points now, all new copy, run verbatim as the card descriptions under
short added labels:

> A local team right across the Northern Rivers and the Tweed · 98% of our
> clients stay with us · Cleaning five-star holiday lets across the region ·
> Preferred supplier for real estate agencies in the region · Over 100 local
> homes, hosts and businesses

**Component change.** `card`'s desktop row was one `1fr` column per cell,
right for the three points every page carried until now. Five `1fr` columns
in a 1200px container leave each supporting line about two words wide, so at
exactly five the row now lays out 3-over-2 on a 6-column track. Scoped to
five; 4-or-fewer callers are untouched and 6+ has no caller. Details and the
media-query resets are in `SECTIONS.md`.

### ⚠️ Two unsourced numbers

"98% of our clients stay with us" and "Over 100 local homes, hosts and
businesses" are exactly the kind of figure a competitor or the ACCC can ask
TLB to substantiate. They came from the brief so they ship — **confirm both
are real and current.**

### ⚠️ Four pages are still behind

The homepage has **already moved to these same five descriptions** (an
uncommitted change to `index.astro` at the time this page was rebuilt), so
the icons and short labels here are copied from it verbatim rather than
chosen again — two pages showing the same proof under different labels reads
as a mistake, not a variation.

`house-cleaning`, `ndis-cleaning`, `why-tlb` and `commercial-cleaning` all
still carry the old three points — "9 full-time local team members" and
"Every client came from a recommendation" — which this copy replaces rather
than contradicts. A visitor moving between pages currently meets two
different sets of proof. **Bring those four across in one pass**; the
icon/label pairs to copy are in `index.astro` and in this page.

Those four also still render the 3-column `card` layout, so none of them is
affected by the `wrap-5` change until they gain the fifth point.

---

## 5. What's included in a deep clean — `ContentGrid.astro` 🟢 · drafted, pending confirmation

The section that makes FAQ 2's "the task list is published on this page" true
(🚩2). `columns={2}`, `heading`, `lead` ("Everything in a regular clean, plus
the detail work underneath it."), five `text` cells:

| Cell | Heading | Span |
|---|---|---|
| 1 | Kitchen | 1 |
| 2 | Bathrooms and toilets | 1 |
| 3 | Bedrooms and living areas | 1 |
| 4 | Laundry | 1 |
| 5 | Throughout | **2** |

Five cells in two columns leaves an orphan, so "Throughout" — the shortest,
and the only one that isn't a room — closes the grid as a full-width row.

**Component choice.** `ServiceBlocks` `icon-grid` is the obvious shape for
five labelled groups, but its cells are icon-led and `ServiceIcon.astro` has
no room icons at all (`idea`, `spark`, `bloom`, `puzzle`, `target`,
`chart-pie`, `chart-bars`, `house`, `suitcase`, `key`, `spray-bottle`,
`office`) — five rooms would have shared two or three unrelated glyphs, which
reads worse than no icons. `TextBlock` with `{ list }` entries was the other
candidate, rejected for the opposite reason to §6's: one column of five long
comma-runs reads as a wall, where a 2-up grid lets someone find their own
room.

Each room's tasks run **as the brief wrote them** — one comma-separated
sentence, not re-broken into bullets. The brief chose prose over a checklist
look, and re-formatting it would change how exhaustive the list reads.

### 🔒 [CONFIRM the full inclusions and exclusions list with Teagan before publishing.]

The brief's own marker, and the most consequential one on the page. This is
the page's central promise and the thing a client will hold TLB to on the day,
task by task. It needs a read-through by whoever actually scopes these jobs,
not just a copy approval.

---

## 5b. Quoted separately / not included — `Callout.astro` 🟢 · drafted, pending confirmation

`tone="note"`, no heading, two `body` paragraphs — the "Quoted separately"
line and the "Not included" line, verbatim.

**Callout, not two more grid cells.** These are the opposite of everything
above them, and an inset panel that reads as an interruption is exactly
`Callout`'s stated job. A sixth grid cell gets skimmed as a sixth room.

### 🔒 Same [CONFIRM], and the higher-stakes half of it

An exclusion a client didn't expect is the complaint that actually happens.
FAQ "What isn't included in a deep clean?" **restates this list**, so the two
have to be settled together and kept in step — if one changes and the other
doesn't, the page contradicts itself about what a client is paying for.

---

## 6. When people book one — `ContentGrid.astro` 🟢 · drafted

Same six occasions as revision 1, under the brief's own heading now ("When
people book one"; "The moments this comes up" was the build's placeholder).

`columns={3}`, six `text` cells (2 rows of 3): Moving in · Before guests ·
After a party · Before it goes to market · The spring reset · After a long
absence.

Grid content, not a paragraph — a `TextBlock` bullet list would flatten each
title/gloss pair into one run-on line.

---

## 7. Deep clean, regular clean or bond clean — `ComparisonTable.astro` 🟢 · drafted

**All-new content.** Revision 1's table came from a design mockup and compared
*task coverage* (inside cupboards, skirting, oven detail…). The revision
replaces it with four rows comparing the *services*:

- `cornerLabel`: "Which one you need" — names the question the table answers,
  since PathwayCards card 3 lands people here from "I'm not sure which I need".
- `columns`: Deep clean `highlight` · Regular clean · End of lease clean

| Row | Deep clean | Regular clean | End of lease clean |
|---|---|---|---|
| What it is | A one-off reset, room by room | Ongoing upkeep on a set schedule | A clean measured against an exit inspection |
| The standard | Back to a baseline | Held at that baseline | Whatever the inspection requires |
| When | Moving in, before guests, spring, after a long gap | Weekly, fortnightly or monthly | When you hand back the keys |
| How long | Longer, because it's the detail work | Predictable once the rhythm is set | Depends on the property and its condition |

`footnote`: the brief's closing "most people book a deep clean first…"
paragraph.

**Why the swap is right.** The old table was doing two jobs — "which service
do I need" and "what gets cleaned" — and the second has moved to §5's actual
task list, so this table now does only the first. Revision 1's normalised
"Built for" row and its circular-tick problem are both gone with the old
content.

**Dropped:** the old "View the full room-by-room checklist" CTA pointing at
`/guides/what-is-included-in-a-deep-clean/`. The checklist is on this page
now, directly above. Say the word if a link to the guide should stay anyway.

**Layout note, carried over.** The original mockup put heading/lead/CTA in a
left-hand panel *beside* the table. That was built as an optional `split`
layout and reverted after measuring it: at a 1200px container a side panel
left the 4-column table ~848px against the 999px it needs, pushing the third
compared service off behind a horizontal scroll. Stacked, it fits exactly.
**Don't re-add the split without re-measuring** — these rows are longer text
than the old ones.

---

## 8. Credibility signals — `PhotoGallery.astro` 🟢 · media blocked

> [Before and after images from genuine TLB deep cleans, with client
> permission and no identifying detail.]

Back after being **removed at TLB's direction** in revision 1, when the
brief's row for it was empty. The revision specifies it in almost exactly the
terms the first build had guessed.

`variant="grid"` (default), four reserved slots — two before/after pairs,
the minimum that reads as a pattern rather than one lucky room. Each slot's
`label` says what belongs in the frame, and becomes the alt text once real
photos land. Heading and lead are **not in the brief** — placeholder copy.

### ⚠️ Two consent conditions, both on TLB before these publish

1. **Written client permission** for each property.
2. **No identifying detail in frame** — no house numbers, street signs, mail,
   people, or names on doors.

A "before" photo of someone's house is the most sensitive image this site
would carry. Shoot each pair from **one fixed position** or the pair doesn't
read.

---

## 9. Hero video — `VideoFeature.astro` 🟢 · media blocked

> [A before-and-after video showing a deep clean.]

Reserved 16/9 `VideoPlaceholder`, labelled to match. `headingLines` is **not**
in the brief — placeholder copy.

---

## 10. Easy to book, instant pricing, cost effective — `TextBlock.astro` 🟢 · drafted

New section: the hero's second sentence expanded under those same three
words. Three `body` paragraphs verbatim, `cta` = `quoteCta`.

`theme="dark"` — it sits between the video slot and the testimonials, both
light, and it carries the page's second CTA. It's also the one block on the
page that *argues* rather than lists, so it shouldn't look like §5 or §6.
`align="left"`: running prose, not a centred pull quote.

---

## 11. Social proof — `TestimonialCarousel.astro` 🟢 · blocked

> [Testimonials to be supplied. Brief for Teagan: deep clean clients
> specifically. Ideally one where the house had been let go, and one booked
> ahead of guests or a sale.]

Two bracketed `[TBC]` slots, `uniform` — the convention `index.astro` and
`house-cleaning.astro` both use: the visible text reads as obviously
unfinished so it can't be mistaken for a real client quote.

The two angles are now the **brief's own ask**, where revision 1 said only
"ask Teagan for Deep Cleaning testimonials" and the build proposed these two
itself. Good briefing — one answers the shame barrier FAQ 1 addresses, the
other the deadline pressure that turns a deep clean from someday into this
week.

**Never fill these with invented names or words.**

---

## 12. Where we clean — `TagCloud.astro` 🟢 · drafted · **component extended** · **2 flags**

Three labelled regions, 56 towns, each linked to `/locations/<slug>/`.
`note`: "If a town isn't listed, ask us anyway." Subheading is **not in the
brief** — placeholder.

| Region | Towns |
|---|---|
| Northern Rivers | 28 |
| The Tweed | 19 |
| Southern Gold Coast | 9 |

Slugs are **derived** (`town.toLowerCase().replace(/\s+/g, '-')`), not
hand-written — 56 hand-typed hrefs is 56 chances to typo one — and the
derivation matches every existing `/locations/` slug in `navigation.ts`.

**Component change.** `groups` added alongside `tags`. Three consecutive
`TagCloud`s would have meant three Dark Teal bands back to back, each
repeating a heading and subheading; flattening the three into one `tags`
array would have thrown the grouping away, including that one region is in a
different state. Same per-shape prop pair `TrustBar` and `Hero` already use,
so every existing caller renders byte-identically. Details in `SECTIONS.md`.

### ⚠️ Flag 1 — this lifts the suburb-list hold by making the disagreement bigger

Revision 1 didn't build this section precisely because the site already had
several disagreeing suburb lists. This is now the **longest list on the site
by a wide margin** — 56 towns against the header mega-menu's 15 and
`commercial-cleaning.astro`'s 12 — and the **only** one that names the Tweed
as its own region rather than folding those towns into "Northern Rivers NSW".
It also runs nine Southern Gold Coast towns where the mega-menu has three.

Nothing here contradicts the shorter lists; they're all subsets of it. But the
mega-menu is what a visitor actually navigates by, so **it should grow to
match** rather than leaving this page the only place most of these towns
appear. One reconciliation pass across `navigation.ts`, this page and
`commercial-cleaning.astro`.

### ⚠️ Flag 2 — ~41 of the 56 links currently 404

The brief says "link each town to its location page." Most of those pages
**don't exist yet** — the mega-menu only lists 15. Shipping 56 links means
shipping roughly 41 dead ends, which hurts the "[service] [suburb]" ranking
this section exists to serve more than an unlinked pill would.

Two ways out, and it's TLB's call, not a guess this build can make:
1. The location pages land alongside this page.
2. The unbuilt towns ship as **plain unlinked pills** — drop their `href` and
   `TagCloud` already renders a `<span>` instead of an `<a>`.

---

## 13. FAQs — `Faq.astro` 🟢 · ten questions, one block

Every other page on this site splits its FAQs into a "branded" and a
"non-branded" accordion, because those briefs supplied two labelled lists.
**This brief supplies one H2 and one run of ten questions**, so it ships as
one accordion. Don't split it back into two for site symmetry — that would
mean inventing the second heading and deciding which questions sit under it,
neither of which is in the brief.

Ships as drafted: "hasn't had a proper clean in years" · "how do I know it'll
actually be a deep clean" (no longer over-promising — see 🚩2) · "what if the
house needs more time" · "how much does a deep clean cost" · "do cleaners
move furniture" · "can I book a deep clean and then set up a regular one" ·
"can I book over the phone".

### 🔒 Three answers carry [CONFIRM] markers

The markers are **stripped from the published copy** — they're notes to
Teagan, not text for a visitor — and flagged inline in the page file. All
three ship as written, unlike revision 1's `[X] days`, which was a literal
unfilled blank; these are finished sentences awaiting a read-through.

| Question | What needs confirming |
|---|---|
| How long does a deep clean take? | "Most of a day for a team" for a three-bedroom home — an operational estimate that sets a client's expectation on the day. Whoever schedules these jobs has to agree with it. |
| What isn't included in a deep clean? | The exclusions list, **the same fact as §5b** — settle and keep them in step. |
| Do you bring your own products and equipment? | Product range. The answer's second half commits TLB to using a client's nominated products. |

### One more worth a sentence of verification

"Do cleaners move furniture during a deep clean?" was **held back entirely**
in revision 1 as an unconfirmed safety-and-liability claim about what staff
will lift. The revision carries no `[CONFIRM]` on it, which reads as that
confirmation having happened. Still the only answer on the page about physical
risk to floors and to the team — worth asking Teagan outright rather than
inferring consent from a missing marker.

---

## 14. Closing block — `CallToAction.astro` `secondary` 🟢 · drafted

> One clean, and the house starts again. Tell us the condition it's in and
> we'll quote for what's actually there.
>
> [Button] Get an instant quote

In the brief this time, so it's no longer the build's own addition echoing the
hero. Split at the sentence break: the promise as the `heading`, the ask as
the `lead`.

---

## Open items

**Needs Teagan's sign-off (the brief's own markers):**
- §5 / §5b — the full inclusions **and** exclusions lists. The page's central
  promise.
- FAQ "How long does a deep clean take?" — the duration estimate.
- FAQ "What isn't included in a deep clean?" — the exclusions list again,
  same fact as §5b.
- FAQ "Do you bring your own products and equipment?" — product range.
- *(Not marked, but worth asking)* FAQ "Do cleaners move furniture?" — the
  heavy-item policy, held back entirely in revision 1.

**Needs substantiating:**
- Trust bar's "98% of our clients stay with us" and "Over 100 local homes,
  hosts and businesses".

**Decisions for TLB:**
- §12 — do the ~41 unbuilt location pages land with this page, or do those
  towns ship as unlinked pills?
- Is the Southern Gold Coast in the service story? The meta description drops
  it; §2 and §12 keep it.

**Media needed:**
- §8 — four before/after photos (two pairs, one fixed position per pair), with
  written client permission and no identifying detail in frame.
- §9 — the before-and-after video.
- §11 — two testimonial avatars.

**Copy not in the brief, placeholder in use:**
- §3's section `heading`/`headingAccent` and three CTA labels.
- §8's heading and lead.
- §9's `headingLines`.
- §12's subheading.

**Cross-page consistency:**
- Trust bar copy now diverges from all five other pages (§4).
- Suburb lists still disagree across `navigation.ts`, this page and
  `commercial-cleaning.astro` (§12, flag 1).
- Canonical domain is still `example.com` site-wide.

**Not verified in a browser.** `astro check` reports 0 errors and the build
passes, and the rendered HTML was checked for the new sections, the
`wrap-5` trust bar class and the three tag groups. But the two component CSS
changes — the 3-over-2 trust bar at desktop/tablet/mobile, and the grouped
pill grid — have **not** been looked at in a real browser, which is the bar
`SECTIONS.md` sets for itself (several of its patch notes exist precisely
because a CSS change looked right and wasn't). No headless browser is
installed in this repo. Worth a look at those two before launch.
