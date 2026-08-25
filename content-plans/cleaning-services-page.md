# Content plan: "Cleaning Services & Cleaners" page

Source: content spec document (focus keyword `cleaning services`, brand TLB
Cleaning). This maps every content block in that doc to a section component
from [`SECTIONS.md`](../SECTIONS.md), states image/text positioning, and
flags anywhere the spec doesn't have a clean 1:1 component match yet.

Legend: 🟢 exact match in the library · 🟡 workable with a stretch/variant
choice · 🔴 gap — nothing in `SECTIONS.md` fits, needs a decision or a new
component.

---

## 0. Page metadata (not a rendered section)

| Field | Value | Notes |
|---|---|---|
| Title tag | `Cleaning Services & Cleaners \| TLB Cleaning` | `<title>`, no separate H1 duplication required |
| Meta description | "Local mums cleaning residential and commercial spaces across the Northern Rivers and southern Gold Coast. Police checked, insured and reliable. Book online." | |
| Focus keyword | `cleaning services` | Drives H1/H2/entity coverage below |
| URL, Google classification, related keywords, query fan-outs, entities | — | Research inputs, not page content — keep in the brief, don't render |

These live in frontmatter / `<head>`, not in `src/components/sections/`.

---

## 1. Hero

**Component: `Hero.astro`** 🟢 — variant `split-single-image` (recommended)
or `split-mosaic` if 2–3 team/work photos exist.

| Content | Maps to prop |
|---|---|
| H1 "TLB Cleaning. Your reliable local cleaners." | `headingLines` |
| Overview line "A full-time local team caring for homes, holiday lets and managed properties, on a schedule that suits you." | `lead` |
| CTA "Get an instant quote" | `cta` |
| — | `image` (photo of a cleaner/team at work — not supplied in spec, needs sourcing) |

**Positioning:** text block (H1 + lead + CTA) on the left, single photo on
the right (desktop) — standard `split-single-image` reading order. On
mobile, copy stacks **above** the image per the component's built-in
behaviour (message-first on small screens).

⚠️ The spec's "Definition paragraph" (the longer "TLB Cleaning is a locally
owned..." paragraph) reads like hero body copy but is too long for `lead`
(which is meant to be a punchy 15–25 word subheadline). See §2 — treat it as
a separate short text block directly under the hero, not packed into the
Hero component itself.

---

## 2. Definition paragraph (intro block)

🔴 **Gap.** Nothing in `SECTIONS.md` is a plain "one paragraph of prose,
no image, no card" section. Closest options:

- Render it as a single centred `text` block, full width, directly below
  the Hero — this doesn't exist as a discrete component today.
- Or fold it into `StoryMosaic.astro` with only `text` blocks and no
  `image` block — technically works (the grid just leaves one column
  empty/collapses), but it's using a 2-column component for 1-column
  content, which is a stretch.

**Recommendation:** treat as a plain full-width paragraph under the Hero,
no image. If this pattern recurs on other pages, it's worth adding as a new
lightweight `TextBlock.astro` (heading? + body + optional CTA) rather than
stretching `StoryMosaic`.

**Positioning:** text only, centered or left-aligned single column, no image.

---

## 3. Persona cards ("I need a hand at home" / "I have a holiday let" / "I manage properties")

**Component: `PathwayCards.astro`** 🟢 — exact match. This is precisely what
it's built for: 3 (or more) numbered persona cards on a dark background,
routing different audiences to different CTAs.

| Card | title | description | cta (suggested) |
|---|---|---|---|
| 1 | "I need a hand at home" | "Weekly, fortnightly or a one-off reset. Same faces every visit." | → `/house-cleaning/` |
| 2 | "I have a holiday let" | "Turnovers timed to your bookings, essentials restocked, ready before check-in." | → `/airbnb-cleaning/` |
| 3 | "I manage properties" | "Bond and end of lease cleans that pass, and a team with the capacity for your rent roll." | → `/real-estate-cleaning/` |

Each card also needs a `number` and an `image` (per-card photo) — not
supplied in the spec, needs sourcing (3 images).

**Positioning:** image at the top of each card, title + description below,
CTA at the card's bottom. Three cards side by side on desktop, stacking to
one column ≤800px.

---

## 4. Trust bar (boilerplate)

🟡 **Partial match — no exact component.** Content: "9 full-time local
cleaners, employed not subcontracted · Working both sides of the border,
NSW and QLD · Trusted by leading Northern Rivers real estate agencies."

This isn't number+caption stat data (`StatBand`/`MetricsBlock` both expect
a `value` figure per item, and only one of these three points is actually
numeric), and it isn't a long enumerable list of categories (`TagCloud`).
It's three short proof-point phrases in a single divided row.

**Recommendation:** closest usable option is `MetricsBlock` (`strip`
variant) reinterpreted loosely — with `value: '9'` for the first item and
the other two as text-only captions with no numeral shown — or a plain
divided text row styled like `StatBand` but without icons. Flagging as a
candidate for a new minimal `TrustBar.astro` (icon-less, number-optional,
3–5 short phrases divided by hairlines/dots) if this pattern is needed
elsewhere.

**Positioning:** ⚠️ **Spec note:** the doc's own text says this bar belongs
"directly under the hero," even though it's listed further down the table
(after the persona cards). Recommend placing it **between the Hero and the
persona cards**, not after them — text-only, single row, no images.

---

## 5. "What's included in every visit" (What we do — overview)

**Component: `ServiceBlocks.astro`** 🟢 — variant `list` (icon + title +
description per row; no images needed here).

| Row | icon (suggested) | title | description |
|---|---|---|---|
| 1 | home | Inside your home | Regular cleaning, deep and one-off cleans, end of lease and bond cleans. |
| 2 | — | Holiday lets | Airbnb and short-stay turnovers, restocking, guest-ready presentation. |
| 3 | — | For agencies | Bond cleans, vacancy turnarounds, routine managed-property cleans. |
| 4 | — | Around the house | Carpets, windows, gutters, pressure cleaning, ovens. |
| 5 | — | For business | Offices and commercial premises. |

**Positioning:** icon on the left of each row, title+description text to
the right — no photography in this section, per `list` variant's design.

---

## 6. Meet Tegan

**Component: `StoryMosaic.astro`** 🟢 — `theme="light"`, `heading="Meet Tegan"`.

Blocks (in order):
1. `{ type: 'image', label: "Tegan, founder of TLB Cleaning" }`
2. `{ type: 'text', body: [3 bio paragraphs + pull-quote + attribution] }`

**Positioning:** image on one side, the bio text (three paragraphs, plus
the closing quote/attribution) on the other — alternating 2-column
editorial layout, image-first (left) reads best here since the photo is
introducing a named person. On mobile this stacks image-above-text per the
component's standard behaviour.

Note: the closing quote ("[One sentence, in her words...]" — Tegan,
founder) is TBC copy — flagged in the spec itself, not a component gap.

---

## 7. "The why" (audience pain points)

🔴 **Gap — same shape as §2.** Pure persuasive prose, no image, no card,
no CTA of its own (the CTA for this whole page comes at the very end).

**Recommendation:** another full-width text-only block, likely on a dark
background for contrast/pacing (`StoryMosaic`'s `theme="dark"` supports a
no-heading, text-only mode already used for "About Maple" in this library
— reuse that pattern here even though there's no image, since the dark
theme + prose-block styling is otherwise already built).

**Positioning:** text only, no image, single column.

---

## 8. Comparison table

🔴 **Gap — no table component exists in `SECTIONS.md`.** There is no grid,
card, or list component built for tabular feature/plan comparison. This
needs a new section component (e.g. `ComparisonTable.astro`) before this
block can be built — flag to the person who owns the component library
rather than forcing it into `ContentGrid`, which isn't built for row/column
tabular data with aligned headers.

**Positioning:** full-width table, no imagery.

---

## 9. Social proof (testimonials)

**Component: `TestimonialCarousel.astro`** 🟢 — 2 testimonials specified
(one long-tenure client, one switcher-story client).

With exactly 2 items, use the **`uniform`** flag — the default
center-emphasis treatment is designed for 3+ cards; with only 2, uniform
sizing (no arrows/dots needed either, per the component's own "count
decides the look" rule) reads better.

**Positioning:** each testimonial card carries its own small avatar image
+ quote + name/role/star-rating inline — not a large photo placement
decision, just the standard card layout.

---

## 10. "What we do" (services with deep links)

**Component: `ServiceBlocks.astro`** 🟢 — variant `list` again (or
`image-cards` if a photo per service becomes available later).

| title | description | href |
|---|---|---|
| Airbnb and holiday let turnovers | Timed to your bookings, restocked and guest-ready before check-in. | `/airbnb-cleaning/` |
| End of lease and bond cleans | Cleaned to the standard your exit inspection is measured against, both sides of the border. | `/end-of-lease-cleaning/` |
| Regular home cleaning | Weekly or fortnightly, same team, set it up once. | `/house-cleaning/` |
| Real estate and property management | Vacancy turnarounds and managed-property cleans for agencies with a rent roll to protect. | `/real-estate-cleaning/` |
| Deep and one-off cleans | A full reset when the place has got away from you, or before someone important arrives. | `/deep-cleaning/` |

`list` variant supports `href` per row natively — exactly what's needed for
the internal links called out in the spec.

**Positioning:** icon left, text (title + description) right, per row — no
photography unless upgraded to `image-cards` (image top of card, text +
footer-link bar below).

---

## 11. Where We Clean

**Component: `TagCloud.astro`** 🟢 — exact match for a flat, linkable list
of locations.

- `heading`: "Where We Clean"
- `subheading`: "From Ballina to Burleigh, and both sides of the border."
- `tags`: one pill per suburb, each with `href` to its location page
  (Byron Bay, Ballina, Lennox Head, Brunswick Heads, Ocean Shores,
  Alstonville, Murwillumbah, Lismore, Kingscliff, Pottsville, Tweed Heads,
  Coolangatta, Palm Beach, Burleigh Heads)

Consider `isHighlighted` on Tweed Heads and/or Coolangatta since those are
the border-crossing anchor towns the copy calls out.

**Positioning:** no imagery — responsive pill grid (4 columns desktop, 2
tablet, 1 mobile), grouped visually by NSW/QLD if a `note` or two tag
groups are used.

---

## 12. FAQs

**Component: `Faq.astro`** 🟢 — accordion variant, two instances (or one
instance with a subheading split) since the spec explicitly separates
Branded vs. Non-branded questions:

- **Faq #1** — `heading="Frequently Asked Questions"`, branded items
  (franchise, same cleaner, pricing, NSW/QLD coverage, growth story). Two
  items are marked TBC in the spec (same-cleaner guarantee, pricing model)
  — don't publish until confirmed with Tegan.
- **Faq #2** — `heading` something like "Cleaning FAQs", non-branded
  long-tail items (clean duration, weekly vs fortnightly, supplies,
  laundry/dishes, tidying beforehand, being home). All five are marked TBC
  pending Tegan's input — draft copy is provisional.

Remember `Faq.astro`'s exclusivity groups are per-instance already
(build-time random `name` suffix), so two `<Faq>` sections on one page
won't cross-collapse each other's open items.

**Positioning:** text-only accordion, no images.

---

## 13. Closing CTA

**Component: `CallToAction.astro`** 🟢 — variant `secondary` (flat band,
heading + lead + one CTA, no secondary links — matches the spec's "one
paragraph, one button, no secondary links" instruction exactly).

- `heading`/`lead`: closing paragraph copy (TBC — not drafted in spec)
- `cta`: "Get an instant quote"
- `image`: optional per the component, but spec implies none needed — omit
  for the plainest "closing band" reading, matching the "no secondary
  links" instruction to keep it minimal.

**Positioning:** centered text + single button, no image, full-width flat
band — last section before the footer.

---

## Full page order (as it should build, not as the source doc lists it)

1. `SiteHeader`
2. `Hero` (split-single-image) — H1, overview, CTA, hero image
3. Trust bar 🟡 (moved up per the spec's own instruction — "directly under the hero")
4. Definition paragraph 🔴 (plain text block)
5. `PathwayCards` — 3 persona cards
6. `ServiceBlocks` (list) — "What's included in every visit"
7. `StoryMosaic` (light) — "Meet Tegan"
8. Prose block 🔴 (dark, text-only) — "The why"
9. Comparison table 🔴 (component doesn't exist yet)
10. `TestimonialCarousel` (uniform, 2 items) — Social proof
11. `ServiceBlocks` (list, with `href`s) — "What we do" services grid
12. `TagCloud` — Where We Clean
13. `Faq` ×2 — Branded, then Non-branded
14. `CallToAction` (secondary) — closing CTA
15. `SiteFooter`

## Open items before this can be built

- **3 gaps with no existing component:** the intro/definition paragraph
  (§2), "The why" prose block (§7), and the comparison table (§8). The
  table in particular needs a net-new component — nothing in `ServiceBlocks`,
  `ContentGrid`, or `MetricsBlock` is built for aligned tabular
  feature/price comparison.
- **Trust bar (§4)** has no clean component match — recommend a new
  lightweight `TrustBar.astro`, or confirm reusing `MetricsBlock` (strip)
  loosely is acceptable even though not all three proof points are numeric.
- **Images needed but not supplied:** hero photo, 3 persona-card photos,
  Tegan's photo.
- **TBC copy blocked on Tegan:** "same cleaner every time," pricing model,
  and all five non-branded FAQ answers are marked provisional in the
  source spec and shouldn't ship un-confirmed.
