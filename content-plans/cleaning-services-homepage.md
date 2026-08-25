# Content plan: "Cleaning Services & Cleaners" page

Source: TLB Cleaning homepage content brief (focus keyword `cleaning
services`). Maps every content block to a section component from
[`SECTIONS.md`](../SECTIONS.md), states image/text positioning, and flags
anywhere the spec doesn't have a clean 1:1 component match or the copy
itself is still blocked/unconfirmed.

Legend: 🟢 exact match in the library · 🟡 workable with a stretch/variant
choice · 🔴 gap — nothing in `SECTIONS.md` fits, needs a decision or a new
component. Content status is called out separately per block: **drafted**
(full copy given, ships as-is), **drafted, pending confirmation** (full
copy given but the spec itself flags it as unconfirmed with Tegan), or
**blocked** (no usable copy exists yet).

---

## 0. Page metadata (not a rendered section)

| Field | Value | Notes |
|---|---|---|
| Title tag / SEO title | `Cleaning Services & Cleaners \| TLB Cleaning` | Spec notes the SEO title is the same string minus the brand tag — i.e. `Cleaning Services & Cleaners` for the `<title>`'s non-brand portion. |
| Meta description | "Local mums cleaning residential and commercial spaces across the Northern Rivers and southern Gold Coast. Police checked, insured and reliable. Book online." | |
| URL | — | **Blank in the spec.** Needs a slug before this can ship (e.g. `/cleaning-services/` or the site root, given this is the homepage). |
| Focus keyword | `cleaning services` | Drives H1/H2/entity coverage below. |
| Google Classification Type | — | **Blank.** Spec names the tool (rqpredictor.streamlit.app) but no output was run/pasted in. |
| Related keywords | — | **Blank.** Spec names the process (GetStat) but no grouped list was supplied. |
| Query fan-outs | — | **Blank.** Spec names the tools (Qforia, aicoverage.locomotive.agency) but no generated queries were supplied. |
| Entities | — | **Blank.** No named entities listed to weave into the copy. |

These are frontmatter/`<head>`/research inputs, not `src/components/sections/`
blocks. All five blank rows are open items — none block building the page's
*sections*, but the URL blocks publishing, and the blank keyword/entity
research is worth closing out before final copy is locked, since the brief
frames this page around search-intent classification.

---

## 1. Hero

**Component: `Hero.astro`** 🟢. **Content: drafted.**

**Source copy, verbatim:**

> H1: TLB Cleaning. Your reliable local cleaners.
>
> Overview: A full-time local team caring for homes, holiday lets and
> managed properties, on a schedule that suits you.
>
> CTA: Get an instant quote

| Content | Maps to prop |
|---|---|
| H1 "TLB Cleaning. Your reliable local cleaners." | `headingLines` |
| Overview "A full-time local team caring for homes, holiday lets and managed properties, on a schedule that suits you." | `lead` |
| CTA "Get an instant quote" | `cta` |

**Variant choice — no image supplied in the spec, two honest options:**

1. **`minimal`** (text-only) is the literal match for what's actually in
   the brief right now: nothing in the H1/overview/CTA rows names or
   brackets a photo the way §6 ("Meet Tegan") explicitly does with
   `[Tegan's photo]`. Ships today with zero sourcing dependency.
2. **`split-single-image`** is the stronger *service-page* choice — a
   cleaning company's hero benefits from showing a real space or a real
   cleaner at work, and this is the highest-traffic, highest-value section
   on the page to get right. Needs one hero photo sourced first.

**Recommendation:** build to `split-single-image` once a hero photo exists;
use `minimal` only as a stopgap if the page needs to ship before that photo
is ready. Don't invent stock-photo filler in the meantime — ship `minimal`
rather than a placeholder image that reads as final.

**Positioning (`split-single-image`):** text block (H1 + lead + CTA) on the
left, photo on the right (desktop). On mobile, copy stacks **above** the
image per the component's built-in reorder behaviour (message-first on
small screens).

⚠️ The spec's definition paragraph (§2) reads like it could extend the
hero, but at ~50 words it's too long for `lead` (a punchy 15–25 word
subheadline is the stated brief for that prop). Keep it as its own block
directly under the hero, not packed into `Hero` itself.

---

## 2. Definition paragraph (intro block)

**Content: drafted, in full:**

> TLB Cleaning is a locally owned cleaning company serving the Northern
> Rivers, Tweed Heads and the Southern Gold Coast. Led by Tegan and staffed
> by nine full-time local cleaners, TLB provides regular home cleaning,
> deep and one-off cleans, end of lease and bond cleans, Airbnb turnovers
> and commercial cleaning across New South Wales and Queensland.

🔴 **Component gap.** Nothing in `SECTIONS.md` is a plain "one paragraph of
prose, no image, no card" section on its own.

**Options, in order of preference:**

1. **Recommended:** add a new lightweight `TextBlock.astro` (optional
   heading + body + optional CTA). This exact shape recurs again at §7 —
   two independent uses is the same bar `SECTIONS.md` itself sets for
   "worth a shared component" (e.g. `ServiceIcon.astro`'s own
   justification: extracted once a second real consumer showed up).
2. **Working stretch today, zero new files:** `ContentGrid.astro` at
   `columns={1}`, one `text` block, no `heading`, `tone: 'surface'`. The
   page body background is also `--color-surface` (per `global.css`), so
   this cell's card fill is invisible against the page — it reads as plain
   running text. The only visible trace of the underlying grid cell is its
   `border-radius`/`padding`, imperceptible at zero color contrast.
3. **Not recommended:** `StoryMosaic.astro` with a single `text` block and
   no `image` block technically renders, but the component always lays
   out a 2-column track, so this leaves an empty half-width gap that reads
   as a layout bug rather than a deliberate choice.

**Positioning:** text only, no image, single column.

---

## 3. Persona cards ("I need a hand at home" / "I have a holiday let" / "I manage properties")

**Component: `PathwayCards.astro`** 🟢 — exact match: three (or more)
numbered persona cards routing distinct audiences to distinct next steps is
precisely this component's stated purpose. **Content: drafted.**

**Source copy, verbatim:**

> "I need a hand at home"
> Weekly, fortnightly or a one-off reset. Same faces every visit.
>
> "I have a holiday let"
> Turnovers timed to your bookings, essentials restocked, ready before check-in.
>
> "I manage properties"
> Bond and end of lease cleans that pass, and a team with the capacity for your rent roll.

| Card | Title | Description | Suggested CTA target |
|---|---|---|---|
| 1 | "I need a hand at home" | "Weekly, fortnightly or a one-off reset. Same faces every visit." | → `/house-cleaning/` |
| 2 | "I have a holiday let" | "Turnovers timed to your bookings, essentials restocked, ready before check-in." | → `/airbnb-cleaning/` |
| 3 | "I manage properties" | "Bond and end of lease cleans that pass, and a team with the capacity for your rent roll." | → `/real-estate-cleaning/` |

Each card also needs a `number` (1/2/3, per the component's numbered-card
design) and an `image` — no photos supplied in the spec, needs sourcing (3
images: home interior, holiday-let/Airbnb space, managed-property exterior
or similar).

**Positioning:** image at the top of each card, title + description below,
CTA at the card's bottom. Three cards side by side on desktop, stacking to
one column at ≤800px per the component's own breakpoint.

---

## 4. Trust bar (boilerplate)

**Content: drafted, in full:** "9 full-time local cleaners, employed not
subcontracted · Working both sides of the border, NSW and QLD · Trusted by
leading Northern Rivers real estate agencies."

🟡 **Partial match — no exact component.** This is three short proof-point
phrases in one divided row. It isn't number+caption stat data
(`StatBand.astro`/`MetricsBlock.astro` both expect a `value` figure per
item, and only the first of these three points is actually numeric — "9"),
and it isn't a long enumerable category list (`TagCloud.astro`).

**Recommendation, in order of preference:**

1. **Recommended:** a new lightweight `TrustBar.astro` — icon-less,
   number-optional, 3–5 short phrases divided by hairlines/dots. Worth
   building as a real shared component if this pattern shows up on other
   service pages too, not just this one.
2. **Working stretch today, zero new files:** `ContentGrid.astro` at
   `columns={3}`, three `text` blocks (no heading, one short phrase each),
   `tone: 'surface'` or `'muted'`. Renders as three boxed cards with a grid
   gap between them — visibly different from the spec's "single row"
   description, but a working non-numeric 3-up layout today.
3. `MetricsBlock.astro` (`strip` variant) reinterpreted loosely —
   `value: '9'` for the first item, the other two rendered as text-only
   captions with no numeral. A real stretch: this component's whole
   contract is number-led captions, and two of the three phrases here
   aren't numeric at all.

**Positioning:** ⚠️ **Spec note — order conflict.** The doc's own text
describes this as sitting "directly under the hero," even though its table
row comes after the persona cards. Per Step 3 of this mapping process,
follow the stated intent, not the table position: place this **between the
Hero and the persona cards**. Text-only, single row, no images.

---

## 5. "What's included in every visit" (What we do — overview)

**Component: `ServiceBlocks.astro`** 🟢 — variant `list` (icon + title +
description per row, no photography). **Content: drafted.**

**Source copy, verbatim** (spec gives both "What's included in every visit."
and "What we do." as heading candidates for this block):

> Inside your home: regular cleaning, deep and one-off cleans, end of lease and bond cleans.
> Holiday lets: Airbnb and short-stay turnovers, restocking, guest-ready presentation.
> For agencies: bond cleans, vacancy turnarounds, routine managed-property cleans.
> Around the house: carpets, windows, gutters, pressure cleaning, ovens.
> For business: offices and commercial premises.

| Row | Title | Description |
|---|---|---|
| 1 | Inside your home | Regular cleaning, deep and one-off cleans, end of lease and bond cleans. |
| 2 | Holiday lets | Airbnb and short-stay turnovers, restocking, guest-ready presentation. |
| 3 | For agencies | Bond cleans, vacancy turnarounds, routine managed-property cleans. |
| 4 | Around the house | Carpets, windows, gutters, pressure cleaning, ovens. |
| 5 | For business | Offices and commercial premises. |

🟡 **Icon note.** `icon` is optional on `list`'s `ServiceItem` shape, but
the only icon set that exists (`ServiceIcon.astro`: `idea`, `spark`,
`bloom`, `puzzle`, `target`, `chart-pie`, `chart-bars`) is abstract/generic
— none of them actually depict a home, a holiday let, an agency, or a
business. Forcing e.g. `idea` onto "Inside your home" would just be
decoration with no semantic link to the row's content. Recommend running
this row set icon-less rather than assigning a mismatched icon just to
fill the slot; a genuinely cleaning-relevant icon set (house, key/booking,
briefcase, broom, storefront) would be new work on `ServiceIcon.astro`, not
a mapping decision.

**Positioning:** icon slot (if used) on the left of each row, title +
description text to the right — no photography in this section, per the
`list` variant's design.

---

## 6. Meet Tegan

**Component: `StoryMosaic.astro`** 🟢 — `theme="light"`,
`heading="Meet Tegan"`. Alternating image/prose editorial block is exactly
this component's job. **Content: bio drafted in full; pull-quote blocked.**

Blocks, in reading order:

1. `{ type: 'image', label: 'Tegan, founder of TLB Cleaning' }` — photo
   explicitly called out in the spec (`[Tegan's photo]`) but not supplied,
   needs sourcing.
2. `{ type: 'text', body: [...] }` — the three bio paragraphs below, plus
   the closing pull-quote/attribution once it exists.

Bio paragraphs (drafted, in full):

> TLB is run by Tegan, a Northern Rivers mum who built the business one
> recommendation at a time. No website, no advertising, just people
> telling other people about her.
>
> There are nine full-time cleaners on the team now, most of them mums as
> well, working hours that fit around school pick-up. That part is
> deliberate. People who can be there for their own families tend to stay,
> and a team that stays does better work.
>
> Tegan still knows her clients by name. If something isn't right, you're
> talking to the person who owns the business, not a call centre.

Closing pull-quote: 🔒 **blocked.** Spec placeholder reads
`"[One sentence, in her words, about her business]"` — Tegan, founder.
Nothing to quote yet; don't publish an invented sentence in her voice.

**Positioning:** image on one side, bio text (three paragraphs, plus the
closing quote/attribution once supplied) on the other. Image-first (left)
is the better read here, since the photo is introducing a named person
before the copy talks about her. On mobile this stacks image-above-text
per the component's standard reorder behaviour.

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
no card, no CTA of its own (the page's one CTA moment comes at the very
end, per §13's "no secondary links" instruction).

**Recommendation, in order of preference:**

1. **Recommended:** the same new `TextBlock.astro` proposed for §2, this
   time on a dark background — gives useful visual pacing between the
   light "Meet Tegan" section above and testimonials below.
2. **Working stretch today, zero new files:** `ContentGrid.astro` at
   `columns={1}`, one `text` block, `tone: 'inverse'`. ⚠️ Unlike §2's
   surface-tone trick, this one *does* look different from what the spec
   implies: `ContentGrid` cells sit inset inside the page's container
   padding, so this renders as a rounded dark card floating on the page
   background, not a full-bleed dark band. Still a reasonable "banner"
   look (the same inset-card pattern `CallToAction`'s `secondary` variant
   and `MetricsBlock`'s `strip`/`list` panels already use) — just don't
   treat it as equivalent to a full-bleed section without flagging that.
3. `StoryMosaic.astro` dark, text-only blocks, no image — full-bleed
   section background (closest match to the spec's implied "band" look),
   but leaves the same empty-half-column issue as §2's option 3.

**Positioning:** text only, no image, single column.

---

## 8. Comparison table

**Content: 🔒 blocked — zero data.** The spec's own placeholder for this
row is literally the words "Comparison Table," with no columns, rows, or
comparison criteria specified anywhere in the brief.

🔴 **Component gap — no table component exists in `SECTIONS.md`.**
`ContentGrid.astro` was checked directly against this need: it's a
free-form N-column grid of independent cells (`text`/`image`/`icon`/
`feature`), not a row/column-aligned table with shared headers, so there's
no way to align "feature X" consistently across multiple "plan"/competitor
columns the way a real comparison table needs. This needs both a new
`ComparisonTable.astro` component **and** real comparison content (TLB vs.
competitors? plan tiers? before/after?) before it can be built — recommend
**not** shipping a placeholder table with invented criteria, since that
would misrepresent something never actually decided.

**Positioning:** full-width table, no imagery.

---

## 9. Social proof (testimonials)

**Content: 🔒 blocked — no quotes drafted.** The spec supplies a briefing
task rather than copy, quoted in full so it isn't lost:

> Ask Tegan for regular-client testimonials. Brief her on the two jobs
> they need to do:
> - One from a long-standing client, ideally naming how long they have
>   been with TLB. Tenure is the proof this page needs.
> - One from a client who had been through several cleaners before. The
>   category evidence shows churn is the norm, so the switcher story
>   converts.

**Component: `TestimonialCarousel.astro`** 🟢 — exact shape match for two
testimonials (one long-tenure client, one switcher-story client) once real
quotes exist. With exactly 2 items, use the **`uniform`** flag: the
default center-emphasis treatment is designed for 3+ cards, and per the
component's own "count decides the look" rule, 2 items render with no
arrows/dots regardless — `uniform` sizing reads better than one card
artificially scaled up over the other.

**Positioning:** each testimonial card carries its own small avatar +
quote + name/role/star-rating inline — the standard card layout, not a
large photo placement decision. **Do not build this section with
placeholder quotes** — it's an outward-facing trust signal, and invented
client testimonials would misrepresent real customers.

---

## 10. "What we do" (services with deep links)

**Component: `ServiceBlocks.astro`** 🟢 — variant `list` again (or
`image-cards` later if a photo per service becomes available). **Content:
drafted.**

**Source copy, verbatim:**

> Airbnb and holiday let turnovers
> Timed to your bookings, restocked and guest-ready before check-in.
> Links to: /airbnb-cleaning/
>
> End of lease and bond cleans
> Cleaned to the standard your exit inspection is measured against, both sides of the border.
> Links to: /end-of-lease-cleaning/
>
> Regular home cleaning
> Weekly or fortnightly, same team, set it up once.
> Links to: /house-cleaning/
>
> Real estate and property management
> Vacancy turnarounds and managed-property cleans for agencies with a rent roll to protect.
> Links to: /real-estate-cleaning/
>
> Deep and one-off cleans
> A full reset when the place has got away from you, or before someone important arrives.
> Links to: /deep-cleaning/

| Title | Description | Links to |
|---|---|---|
| Airbnb and holiday let turnovers | Timed to your bookings, restocked and guest-ready before check-in. | `/airbnb-cleaning/` |
| End of lease and bond cleans | Cleaned to the standard your exit inspection is measured against, both sides of the border. | `/end-of-lease-cleaning/` |
| Regular home cleaning | Weekly or fortnightly, same team, set it up once. | `/house-cleaning/` |
| Real estate and property management | Vacancy turnarounds and managed-property cleans for agencies with a rent roll to protect. | `/real-estate-cleaning/` |
| Deep and one-off cleans | A full reset when the place has got away from you, or before someone important arrives. | `/deep-cleaning/` |

`list` supports an `href` per row natively — exactly what the spec's
internal links need. Same icon-mismatch caveat as §5 applies if icons are
added here too.

**Positioning:** icon slot (if used) on the left, title + description text
on the right, per row — no photography unless this is upgraded to
`image-cards` (image top of card, text + footer-link bar below).

---

## 11. Where We Clean

**Component: `TagCloud.astro`** 🟢 — exact match for a flat, linkable list
of locations. **Content: drafted.**

**Source copy, verbatim:**

> From Ballina to Burleigh, and both sides of the border.
> NSW: Byron Bay · Ballina · Lennox Head · Brunswick Heads · Ocean Shores · Alstonville · Murwillumbah · Lismore · Kingscliff · Pottsville · Tweed Heads
> QLD: Coolangatta · Palm Beach · Burleigh Heads
>
> (Link each one to its respective page.)

- `heading`: "Where We Clean"
- `subheading`: "From Ballina to Burleigh, and both sides of the border."
- `tags`: one pill per suburb. `TagCloud` has no built-in sub-heading/
  grouping prop inside the tag grid, so listing NSW suburbs before QLD
  suburbs (matching the spec's own grouping) is the only way to visually
  cluster them:
  - **NSW:** Byron Bay, Ballina, Lennox Head, Brunswick Heads, Ocean
    Shores, Alstonville, Murwillumbah, Lismore, Kingscliff, Pottsville,
    Tweed Heads
  - **QLD:** Coolangatta, Palm Beach, Burleigh Heads

Each tag needs an `href` to its own location page — not supplied in the
spec (open item, needs the URL slug pattern for these 14 pages).
`isHighlighted` is worth considering on Tweed Heads and/or Coolangatta,
since the copy explicitly calls those out as the border-crossing anchor
towns ("we cross the state line most weeks," per the FAQ answer in §12).

**Positioning:** no imagery — responsive pill grid, 4 columns desktop, 2
tablet, 1 mobile per the component's own breakpoints.

---

## 12. FAQs

**Component: `Faq.astro`** 🟢 — accordion variant, two instances, since the
spec explicitly separates Branded vs. Non-branded questions. `Faq.astro`'s
exclusivity groups are already scoped per-instance (build-time random
`name` suffix), so two `<Faq>` sections on one page won't cross-collapse
each other's open items.

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
with Tegan]"** in the spec — a real answer exists for each, just not yet
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
items above — they're generic service-education copy, not specific claims
about TLB's own policies or pricing — but the spec still marks all six as
pending Tegan's confirmation. Flag before publishing regardless of the
lower risk.

**Positioning:** text-only accordion, no images, for both instances.

---

## 13. Closing CTA

**Component: `CallToAction.astro`** 🟢 — variant `secondary` (flat band,
heading + lead + one CTA, no image, no secondary links). This matches the
spec's own instruction — "one paragraph, one button, no secondary links" —
exactly; `primary` would add an image slot and `form` would add an email
field, neither of which the spec calls for. **Content: blocked.**

**Source copy, verbatim:**

> Closing block. One paragraph, one button, no secondary links.
> Get an instant quote

- `heading`/`lead`: closing paragraph copy — 🔒 blocked, not drafted in the
  spec (only the section's *shape* is described).
- `cta`: "Get an instant quote" — drafted.
- `image`: `secondary` supports one, but the spec implies none is needed —
  omit it for the plainest "closing band" reading, keeping the section
  minimal per its own instruction.

**Positioning:** centered text + single button, no image, full-width flat
band — last section before the footer.

---

## Full page order (as it should build, not as the source doc lists it)

1. `SiteHeader`
2. `Hero` — H1, overview, CTA (image TBD: `split-single-image` once sourced, `minimal` as stopgap)
3. Trust bar 🟡 — moved up per the spec's own instruction ("directly under the hero"); its table row sits lower
4. Definition paragraph 🔴 — plain text block
5. `PathwayCards` — 3 persona cards
6. `ServiceBlocks` (list) — "What's included in every visit"
7. `StoryMosaic` (light) — "Meet Tegan"
8. Prose block 🔴 (dark) — "The why"
9. Comparison table 🔴 — component doesn't exist; content doesn't exist either
10. `TestimonialCarousel` (uniform, 2 items) — Social proof
11. `ServiceBlocks` (list, with `href`s) — "What we do" services grid
12. `TagCloud` — Where We Clean
13. `Faq` ×2 — Branded, then non-branded
14. `CallToAction` (secondary) — closing CTA
15. `SiteFooter`

## Open items before this can be built

**Content, fully blocked (no copy exists):**
- Comparison table (§8) — no columns/rows/criteria specified at all.
- Testimonials (§9) — no quotes; needs Tegan to supply two real client
  testimonials per the brief's own sourcing instructions.
- Tegan's pull-quote (§6) — one sentence in her own words, not yet supplied.
- 2 of 5 branded FAQ answers (§12) — "same cleaner every time" (not started)
  and pricing (blocked on the pricing decision itself).
- Closing CTA heading/lead (§13) — not drafted.

**Content, drafted but pending Tegan's confirmation before publishing:**
- All 6 non-branded FAQ answers (§12).

**Components that don't exist yet:**
- `ComparisonTable.astro` (§8) — genuine gap, no stretch option fits.
- A plain single-column prose block, needed twice (§2, §7) — recommend
  `TextBlock.astro`; `ContentGrid.astro` at `columns={1}` is a working
  stretch in the meantime (exact for §2's light/surface case, an inset-card
  rather than full-bleed-band look for §7's dark case).
- A short non-numeric proof-point row (§4) — recommend `TrustBar.astro`;
  `ContentGrid.astro` at `columns={3}` is a working stretch (boxed cards
  with gaps, not a single hairline-divided row).

**Images needed but not supplied:** hero photo (§1 — only needed if
building `split-single-image` rather than `minimal`), 3 persona-card photos
(§3), Tegan's photo (§6, explicitly called out in the spec).

**Metadata/research inputs still blank:** URL slug, Google Classification
Type, related keywords, query fan-outs, named entities (§0).

**Other open items:**
- Location page URLs for the 14 `TagCloud` suburb links (§11) aren't
  specified — needs the actual slug pattern for those pages.
- `ServiceIcon.astro`'s existing icon set (§5, §10) doesn't include any
  cleaning-relevant glyphs (house, key/booking, briefcase, broom,
  storefront) — recommend running both `ServiceBlocks` `list` sections
  icon-less rather than assigning a mismatched abstract icon.
