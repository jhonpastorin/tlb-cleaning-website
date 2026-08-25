# Content plan: "Cleaning Services & Cleaners" page

Source: content spec document (focus keyword `cleaning services`, brand TLB
Cleaning) — updated revision with full drafted copy for most blocks. This
maps every content block in that doc to a section component from
[`SECTIONS.md`](../SECTIONS.md), states image/text positioning, and flags
anywhere the spec doesn't have a clean 1:1 component match yet or the copy
itself is still blocked/unconfirmed.

Legend: 🟢 exact match in the library · 🟡 workable with a stretch/variant
choice · 🔴 gap — nothing in `SECTIONS.md` fits, needs a decision or a new
component. Content status is called out separately per block: **drafted**
(full copy given, ships as-is), **drafted, pending confirmation** (full copy
given but the spec itself flags it as unconfirmed with Tegan), or
**blocked** (no copy exists yet at all).

---

## 0. Page metadata (not a rendered section)

| Field | Value | Notes |
|---|---|---|
| Title tag | `Cleaning Services & Cleaners \| TLB Cleaning` | `<title>`, no separate H1 duplication required |
| Meta description | "Local mums cleaning residential and commercial spaces across the Northern Rivers and southern Gold Coast. Police checked, insured and reliable. Book online." | |
| URL | — | **Blank in the spec.** Needs a slug before this can ship (e.g. `/cleaning-services/`). |
| Focus keyword | `cleaning services` | Drives H1/H2/entity coverage below |
| Google Classification Type | — | **Blank.** Spec names the tool (rqpredictor.streamlit.app) but no output was run/pasted in. |
| Related keywords | — | **Blank.** Spec names the process (Getstat) but no grouped list was supplied. |
| Query fan-outs | — | **Blank.** Spec names the tools (Qforia, aicoverage.locomotive.agency) but no generated queries were supplied. |
| Entities | — | **Blank.** No named entities listed to weave into the copy. |

These live in frontmatter/`<head>` and the research brief, not in
`src/components/sections/`. All five blank rows above are open items —
none block building the page's *sections*, but the URL in particular
blocks publishing.

---

## 1. Hero

**Component: `Hero.astro`** 🟢 — variant `split-single-image` (recommended)
or `split-mosaic` if 2–3 team/work photos exist. **Content: drafted.**

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

⚠️ The spec's definition paragraph (§2) reads like hero body copy but is
too long for `lead` (which is meant to be a punchy 15–25 word subheadline).
Treat it as a separate text block directly under the hero, not packed into
the Hero component itself.

---

## 2. Definition paragraph (intro block)

**Content: drafted, in full:**

> TLB Cleaning is a locally owned cleaning company serving the Northern
> Rivers, Tweed Heads and the Southern Gold Coast. Led by Tegan and staffed
> by nine full-time local cleaners, TLB provides regular home cleaning,
> deep and one-off cleans, end of lease and bond cleans, Airbnb turnovers
> and commercial cleaning across New South Wales and Queensland.

🔴 **Component gap.** Nothing in `SECTIONS.md` is a plain "one paragraph of
prose, no image, no card" section. Options, in order of preference:

1. **Recommended:** add a new lightweight `TextBlock.astro` (heading? +
   body + optional CTA), since this exact shape recurs again at §7 — two
   uses is exactly the bar SECTIONS.md itself sets for "worth adding as a
   shared component" (see e.g. `ServiceIcon.astro`'s own justification).
2. **Closest existing-component stretch:** `ContentGrid.astro` at
   `columns={1}`, a single `text` block with no `heading`, `tone: 'surface'`.
   Because the page's own `body` background is also `--color-surface`
   (see `global.css`), this cell's card background is invisible against
   the page — it reads as plain running text. The only visible difference
   from true unstyled prose is the cell's `border-radius`/`padding`, which
   is imperceptible at zero color contrast. Workable today with zero new
   files.
3. Folding it into `StoryMosaic.astro` with only `text` blocks and no
   `image` block — technically renders, but leaves an empty half of the
   2-column grid since the component always lays out a 2-column track.
   Not recommended — the empty column reads as a layout bug, not a choice.

**Positioning:** text only, centered or left-aligned single column, no image.

---

## 3. Persona cards ("I need a hand at home" / "I have a holiday let" / "I manage properties")

**Component: `PathwayCards.astro`** 🟢 — exact match. **Content: drafted.**

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

**Content: drafted, in full:** "9 full-time local cleaners, employed not
subcontracted · Working both sides of the border, NSW and QLD · Trusted by
leading Northern Rivers real estate agencies."

🟡 **Partial match — no exact component.** This isn't number+caption stat
data (`StatBand`/`MetricsBlock` both expect a `value` figure per item, and
only one of these three points is actually numeric), and it isn't a long
enumerable list of categories (`TagCloud`). It's three short proof-point
phrases in a single divided row.

**Recommendation, in order of preference:**

1. A new lightweight `TrustBar.astro` (icon-less, number-optional, 3–5
   short phrases divided by hairlines/dots) — flagged as a candidate if
   this pattern is needed elsewhere too.
2. `ContentGrid.astro` at `columns={3}`, three `text` blocks (no heading,
   one short phrase each), `tone: 'surface'` or `'muted'`. Renders as three
   boxed cards with a grid gap between them, not a single continuous row
   divided by hairlines — a real visual difference from the spec's "single
   row" description, but a working non-numeric 3-up layout with zero new
   files.
3. `MetricsBlock` (`strip` variant) reinterpreted loosely — `value: '9'`
   for the first item, the other two as text-only captions with no numeral
   shown.

**Positioning:** ⚠️ **Spec note:** the doc's own text says this bar belongs
"directly under the hero," even though it's listed further down the table
(after the persona cards). Recommend placing it **between the Hero and the
persona cards**, not after them — text-only, single row, no images.

---

## 5. "What's included in every visit" (What we do — overview)

**Component: `ServiceBlocks.astro`** 🟢 — variant `list` (icon + title +
description per row; no images needed here). **Content: drafted.**

| Row | icon (suggested) | title | description |
|---|---|---|---|
| 1 | home | Inside your home | Regular cleaning, deep and one-off cleans, end of lease and bond cleans. |
| 2 | — | Holiday lets | Airbnb and short-stay turnovers, restocking, guest-ready presentation. |
| 3 | — | For agencies | Bond cleans, vacancy turnarounds, routine managed-property cleans. |
| 4 | — | Around the house | Carpets, windows, gutters, pressure cleaning, ovens. |
| 5 | — | For business | Offices and commercial premises. |

Icons beyond row 1 aren't specified in the spec — pick from
`ServiceIcon.astro`'s existing name set or leave rows 2–5 icon-less.

**Positioning:** icon on the left of each row, title+description text to
the right — no photography in this section, per `list` variant's design.

---

## 6. Meet Tegan

**Component: `StoryMosaic.astro`** 🟢 — `theme="light"`, `heading="Meet Tegan"`.
**Content: bio drafted in full; pull-quote blocked.**

Blocks (in order):

1. `{ type: 'image', label: "Tegan, founder of TLB Cleaning" }` — photo not
   supplied, needs sourcing.
2. `{ type: 'text', body: [...] }` — the three bio paragraphs, quoted in
   full below, **plus** the closing pull-quote/attribution.

Bio paragraphs (drafted, in full):

> TLB is run by Tegan, a Northern Rivers mum who built the business one
> recommendation at a time. No website, no advertising, just people
> telling other people about her.
>
> There are nine full-time cleaners on the team now, most of them mums as
> well, working hours that fit around school pick-up. That part is
> deliberate. People who can be there for their own families tend to
> stay, and a team that stays does better work.
>
> Tegan still knows her clients by name. If something isn't right, you're
> talking to the person who owns the business, not a call centre.

Closing pull-quote: 🔒 **blocked** — spec has
`"[One sentence, in her words, about her business]"` — Tegan, founder.
Nothing to quote yet; don't publish a placeholder sentence in her voice.

**Positioning:** image on one side, the bio text (three paragraphs, plus
the closing quote/attribution once supplied) on the other — alternating
2-column editorial layout, image-first (left) reads best here since the
photo is introducing a named person. On mobile this stacks image-above-text
per the component's standard behaviour.

---

## 7. "The why" (audience pain points)

**Content: drafted, in full:**

> You are not really buying a clean house.
>
> You are buying the bit where you stop thinking about it. Nobody wants to
> interview cleaners, chase quotes, or wonder whether the person who came
> last fortnight is coming again.
>
> Set it up once. Same team, same day, a message when we are on the way.
> That is the whole idea.

🔴 **Component gap — same shape as §2.** Pure persuasive prose, no image,
no card, no CTA of its own (the CTA for this whole page comes at the very
end).

**Recommendation, in order of preference:**

1. **Recommended:** the same new `TextBlock.astro` from §2, this time on a
   dark background (`theme="dark"` equivalent) for contrast/pacing between
   the light "Meet Tegan" section above and the testimonials below.
2. `ContentGrid.astro` at `columns={1}`, a single `text` block,
   `tone: 'inverse'`. Unlike §2's surface-tone trick, this one *does* look
   different from the spec's intent: `ContentGrid` cells sit inset inside
   the page's container padding, so this renders as a rounded dark card
   floating on the page background — not a full-bleed dark band the way
   `StoryMosaic`'s `theme="dark"` sections elsewhere on this page render
   (section-level background, edge to edge). Still a reasonable "banner"
   look — the same inset-card pattern `CallToAction`'s `secondary` variant
   and `MetricsBlock`'s `strip`/`list` panels already use — just flag the
   difference before treating it as equivalent to a full-bleed section.
3. `StoryMosaic.astro` dark, text-only blocks, no image — full-bleed
   section background (matches the spec's implied "band" look best), but
   leaves an empty half of the 2-column grid (same caveat as §2 option 3).

**Positioning:** text only, no image, single column.

---

## 8. Comparison table

**Content: 🔒 blocked — zero data.** The spec's own placeholder for this
row is literally the words "Comparison Table," with no columns, rows, or
comparison criteria specified anywhere in the brief.

🔴 **Component gap — no table component exists in `SECTIONS.md`.**
`ContentGrid.astro` was checked directly against this need and confirmed
not to fit: it's a free-form N-column grid of independent cells (text /
image / icon / feature), not a row/column-aligned table with shared
headers — there's no way to align "feature X" across multiple "plan"
columns the way a real comparison table needs. This needs a new
`ComparisonTable.astro` component **and** real comparison content (what's
being compared — TLB vs. competitors? Plan tiers? Before/after?) before
it can be built. Flag both to whoever owns this content and whoever owns
the component library — recommend **not** building a placeholder table
with invented criteria, since that would misrepresent something never
actually decided.

**Positioning:** full-width table, no imagery.

---

## 9. Social proof (testimonials)

**Content: 🔒 blocked — no quotes drafted.** The spec supplies a briefing
task instead of copy, quoted in full here so it isn't lost:

> Ask Tegan for regular-client testimonials. Brief her on the two jobs
> they need to do:
> - One from a long-standing client, ideally naming how long they have
>   been with TLB. Tenure is the proof this page needs.
> - One from a client who had been through several cleaners before. The
>   category evidence shows churn is the norm, so the switcher story
>   converts.

**Component: `TestimonialCarousel.astro`** 🟢 — exact match for the
*shape* (2 testimonials: one long-tenure client, one switcher-story
client), once real quotes exist.

With exactly 2 items, use the **`uniform`** flag — the default
center-emphasis treatment is designed for 3+ cards; with only 2, uniform
sizing (no arrows/dots needed either, per the component's own "count
decides the look" rule) reads better.

**Positioning:** each testimonial card carries its own small avatar image
+ quote + name/role/star-rating inline — not a large photo placement
decision, just the standard card layout. **Do not build this section with
placeholder quotes** — it's an outward-facing trust signal, and invented
client testimonials would misrepresent real customers.

---

## 10. "What we do" (services with deep links)

**Component: `ServiceBlocks.astro`** 🟢 — variant `list` again (or
`image-cards` if a photo per service becomes available later). **Content:
drafted.**

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
of locations. **Content: drafted.**

- `heading`: "Where We Clean"
- `subheading`: "From Ballina to Burleigh, and both sides of the border."
- `tags`: one pill per suburb, grouped by state per the spec (list NSW
  suburbs first, then QLD — `TagCloud` has no built-in sub-heading/grouping
  prop within the tag grid itself, so ordering is the only way to visually
  cluster them):
  - **NSW:** Byron Bay, Ballina, Lennox Head, Brunswick Heads, Ocean
    Shores, Alstonville, Murwillumbah, Lismore, Kingscliff, Pottsville,
    Tweed Heads
  - **QLD:** Coolangatta, Palm Beach, Burleigh Heads

Each tag needs an `href` to its location page — not supplied in the spec
(open item, needs URL slugs). Consider `isHighlighted` on Tweed Heads
and/or Coolangatta since those are the border-crossing anchor towns the
copy calls out.

**Positioning:** no imagery — responsive pill grid (4 columns desktop, 2
tablet, 1 mobile).

---

## 12. FAQs

**Component: `Faq.astro`** 🟢 — accordion variant, two instances, since the
spec explicitly separates Branded vs. Non-branded questions. Remember
`Faq.astro`'s exclusivity groups are per-instance already (build-time
random `name` suffix), so two `<Faq>` sections on one page won't
cross-collapse each other's open items.

### FAQ #1 — `heading="Frequently Asked Questions"` (branded)

3 of 5 **drafted, in full**; 2 of 5 **blocked**:

1. **"Are you a franchise?"** — drafted:
   > No. TLB is locally owned and run by Tegan, and every cleaner is
   > employed by us rather than subcontracted through a national brand.
   > When you book, you are booking us, not a licence holder using
   > someone else's name.
2. **"Will I get the same cleaner every time?"** — 🔒 blocked: spec says
   "[TBC. Confirm with Tegan before drafting.]" — no answer exists yet.
3. **"How do you charge?"** — 🔒 blocked: spec says "[TBC. Blocked on the
   pricing decision.]" — no answer exists yet, and the underlying pricing
   model itself isn't decided.
4. **"Do you clean in Queensland as well as New South Wales?"** — drafted:
   > Yes, both. We work from the Northern Rivers up through Tweed Heads
   > and into the Southern Gold Coast, which means we cross the state
   > line most weeks. It also means we know how the rules differ on
   > either side of it, which matters when a bond is involved.
5. **"How did you get to nine cleaners without advertising?"** — drafted:
   > One recommendation at a time. Every client TLB has, came from
   > someone telling a neighbour. That is a slower way to grow and a much
   > harder one to fake.

Don't ship items 2 and 3 until Tegan confirms — publish only the 3 drafted
questions, or hold the whole FAQ block, rather than inventing an answer for
either.

### FAQ #2 — `heading="Cleaning FAQs"` (non-branded, long-tail)

All 6 **drafted, in full, but each individually flagged "[TBC. Confirm
with Tegan]"** in the spec — meaning a real answer exists, just not yet
signed off:

1. **"How long does a house clean take?"**
   > A rough guide for a maintained home is about an hour for each
   > bedroom and bathroom, so a three-bedroom, two-bathroom house usually
   > takes three to five hours for one cleaner, or roughly half that with
   > two. Your first clean almost always takes longer, because it brings
   > the home to a baseline. After that, regular visits settle into a
   > predictable window.
2. **"Should I book weekly or fortnightly?"**
   > Fortnightly suits most homes. Weekly tends to make sense with a
   > bigger household, pets, working from home, or a place with a lot of
   > through traffic. A fortnightly visit usually costs the same per
   > clean as a weekly one, so the difference is what you spend across a
   > month rather than what you pay on the day. Starting with a one-off
   > and seeing how long it holds is the easiest way to decide.
3. **"Do cleaners bring their own products and equipment?"**
   > Yes, a professional cleaning service arrives with everything needed,
   > so you do not have to supply anything or leave anything out. If you
   > would rather particular products were used in your home, because of
   > a baby, an allergy, a pet or a sensitive surface, say so when you
   > book. Most cleaners will either use what you have or bring an
   > alternative.
4. **"Do cleaners do the laundry and the dishes?"**
   > Usually not as standard. A regular house clean covers surfaces,
   > floors, kitchen, bathrooms and bins. Laundry, dishes, ironing and
   > putting belongings away are slow tasks with little visible payoff
   > per minute, so most services either exclude them or quote them
   > separately. If you want them included, ask before you book rather
   > than on the day, so the time is in the quote.
5. **"Do I need to tidy up before the cleaner arrives?"**
   > Tidy, do not clean. Clearing benchtops, floors and bathroom vanities
   > makes a real difference, because time spent moving your things is
   > time not spent cleaning. Put away clothes, toys, dishes and anything
   > valuable or fragile. Leave the actual cleaning to the cleaner,
   > including the dusty and greasy jobs. If a house is cluttered on the
   > day, the detail work is what gets missed.
6. **"Do I need to be home while the cleaner is there?"**
   > That is entirely up to you. Plenty of people are at work or on the
   > school run and arrange access in advance. Plenty prefer to be home
   > for the first visit or two, so they can meet the cleaner and point
   > out what matters most, then leave a key once the routine settles.
   > Either works. Agree how access happens when you book.

These 6 are lower-risk to ship provisionally than the 2 blocked branded
items above (they're generic service-education copy, not specific claims
about TLB's own policies or pricing) but the spec still marks all six as
pending Tegan's confirmation — flag before publishing regardless.

**Positioning:** text-only accordion, no images, for both instances.

---

## 13. Closing CTA

**Component: `CallToAction.astro`** 🟢 — variant `secondary` (flat band,
heading + lead + one CTA, no secondary links — matches the spec's "one
paragraph, one button, no secondary links" instruction exactly). **Content:
blocked** — heading/lead paragraph not drafted in the spec.

- `heading`/`lead`: closing paragraph copy — 🔒 blocked, not drafted
- `cta`: "Get an instant quote" — drafted
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
8. Prose block 🔴 (dark) — "The why"
9. Comparison table 🔴 (component doesn't exist; content doesn't exist either)
10. `TestimonialCarousel` (uniform, 2 items) — Social proof
11. `ServiceBlocks` (list, with `href`s) — "What we do" services grid
12. `TagCloud` — Where We Clean
13. `Faq` ×2 — Branded, then Non-branded
14. `CallToAction` (secondary) — closing CTA
15. `SiteFooter`

## Open items before this can be built

**Content, fully blocked (no copy exists):**
- Comparison table (§8) — no columns/rows/criteria specified at all.
- Testimonials (§9) — no quotes; needs Tegan to supply two real client
  testimonials per the brief's own sourcing instructions.
- Tegan's pull-quote (§6) — one sentence in her own words, not yet supplied.
- 2 of 5 branded FAQ answers (§12) — "same cleaner every time" (not even
  started) and pricing model (blocked on the pricing decision itself).
- Closing CTA heading/lead (§13) — not drafted.

**Content, drafted but pending Tegan's confirmation before publishing:**
- All 6 non-branded FAQ answers (§12).

**Components that don't exist yet:**
- `ComparisonTable.astro` (§8) — genuine gap, no stretch option fits.
- A plain single-column prose block, needed twice (§2, §7) — recommend
  `TextBlock.astro`; `ContentGrid.astro` at `columns={1}` is a workable
  stretch in the meantime (exact for §2's light/surface case, an inset-card
  rather than full-bleed-band look for §7's dark case).
- A short non-numeric proof-point row (§4) — recommend `TrustBar.astro`;
  `ContentGrid.astro` at `columns={3}` is a workable stretch (boxed cards
  with gaps, not a single hairline-divided row).

**Images needed but not supplied:** hero photo, 3 persona-card photos,
Tegan's photo.

**Metadata/research inputs still blank:** URL slug, Google Classification
Type, related keywords, query fan-outs, named entities (§0).

**Other:** location page URLs for the 14 `TagCloud` suburb links (§11)
aren't specified — needs the actual slug pattern for those pages.
