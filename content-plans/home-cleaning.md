# Regular House Cleaning — content plan

Source: the "TLB Cleaning — Regular House Cleaning" brief (second revision,
supplied 2026-09-08). Supersedes the first brief this page was built from.
Built at `src/pages/house-cleaning.astro`.

This is the **sibling brief** to `content-plans/deep-cleaning.md`'s second
revision — same author, same generation, same section vocabulary. Where the
two briefs supply identical content (the five trust-bar points, the 56-town
"Where we clean" list, the "Easy to book, instant pricing, cost effective"
block) this page copies the deep-cleaning build **verbatim** rather than
deciding again. Two pages showing the same proof under different labels is
the worse kind of inconsistency: it reads as a mistake, not a variation.

---

## §0 Page metadata — `<head>` inputs, not a rendered section

| Field | Value |
|---|---|
| URL | `/house-cleaning/` |
| Title tag | `House Cleaning Services - Regular Cleans \| TLB Cleaning` |
| Meta description | `Regular house cleaning across the Northern Rivers and the Tweed. Set day, same team, easy to book and managed for you. Get a quote in under a minute.` |
| Focus keyword | `house cleaning services` |

The meta description is **new copy** — it replaces the first brief's
"Regular house cleaning from local mums you actually know. Same cleaner every
visit, police checked and insured." Both the "local mums" framing and the
"police checked and insured" claim are gone from this revision; the new line
ships as written. 🟢

`canonical` is still `https://example.com/house-cleaning/` — the real domain
is unset across every page in this repo. Open item, not new here.

---

## §1 Hero

- **H1:** `House cleaning you never have to chase`
- **Subheadline:** `The same local team, on the same day, every time. Easy to book, instant pricing, cost effective.`
- **CTA:** `Get an instant quote`

**Component:** `Hero.astro`, `variant="split-single-image"`,
`imagePosition="right"`, `imageFit="contain-bottom"`. 🟢

**Image:** `src/assets/home_cleaning/house-cleaning-team-two-cleaners-in-gloves.png`
— already in place from the first build. Cut-out figures on a transparent
backdrop flush with the bottom of their own frame, which is why the fit is
`contain-bottom` and the ratio states the asset's trimmed dimensions
(`1364/1032`). Copy left, photo right; below `--bp-lg` copy stays above the
image. No change needed. 🟢

**The subheadline change is load-bearing.** The old lead explained the benefit
("so you can stop wondering whether anyone is turning up"). The new one
front-loads the three commercial claims that §11 later expands — *easy to
book, instant pricing, cost effective*. Ships verbatim.

---

## §2 Trust bar

> A local team right across the Northern Rivers and the Tweed · 98% of our
> clients stay with us · Cleaning five-star holiday lets across the region ·
> Preferred supplier for real estate agencies in the region · Over 100 local
> homes, hosts and businesses

**Component:** `TrustBar.astro`, `variant="card"`, five cards. 🟢

Five cells is exactly the count `TrustBar`'s `card` variant grew a rule for
(`--wrap-5`: a 6-column track, three cells of `span 2` then two of `span 3`,
so the remainder centres instead of leaving an orphan column). Nothing new
needed in the component.

The brief's five lines run **verbatim as the `description`**, each under a
short added `title`. Those titles and icons are copied from
`deep-cleaning.astro` / `index.astro`, which already carry these exact five
points:

| icon | title | description (verbatim from brief) |
|---|---|---|
| `map-pin` | Local team | A local team right across the Northern Rivers and the Tweed |
| `shield-check` | They stay | 98% of our clients stay with us |
| `sparkle` | Holiday lets | Cleaning five-star holiday lets across the region |
| `building` | Agency trusted | Preferred supplier for real estate agencies in the region |
| `team` | Over 100 clients | Over 100 local homes, hosts and businesses |

**This resolves a flagged inconsistency.** The first build carried three
different points ("9 full-time local team members", "Every client came from a
recommendation", "Trusted by leading Northern Rivers real estate agencies").
`deep-cleaning.astro` flags house-cleaning by name as one of four pages still
behind. This page is now across; `ndis-cleaning`, `why-tlb` and
`commercial-cleaning` remain.

⚠️ **Both numbers are unsourced claims.** "98% of our clients stay with us"
and "Over 100 local homes, hosts and businesses" are exactly the figures a
competitor or the ACCC can ask TLB to substantiate. They came from the brief
so they ship — confirm both are real and current. (Same flag deep-cleaning
carries.)

### Order conflict — resolved on component grounds

The brief's own order is H1 → subheadline → **opening paragraph → [Button]**
→ trust bar. The build puts the trust bar **directly under the hero**, ahead
of the opening paragraph.

Not a preference. `TrustBar`'s `card` variant pulls itself *up* into the hero
with a negative top margin — that overlap is the variant's entire visual
premise, and it only works against a hero. Placed a section lower it would
overlap the definition paragraph instead, which is not a thing it is built to
do. Every other page on this site makes the same call. 🟢

---

## §3 Opening paragraph

> Regular home cleaning is an ongoing visit on a set schedule, weekly,
> fortnightly or monthly, that keeps a lived-in house on top of things rather
> than resetting it. TLB Cleaning provides house cleaning services across the
> Northern Rivers, the Tweed and the Southern Gold Coast.

**Component:** `TextBlock.astro`, `theme="muted"`, `align="left"`, no
heading, two paragraphs. 🟢

This is the page's answer-target block for `house cleaning services`, so it
stays the first prose after the hero.

**Copy change:** the second sentence now names **three** regions ("the
Northern Rivers, the Tweed and the Southern Gold Coast") where the first
brief named two. That matches §13's three-region grouping. Ships verbatim.

**Positioning:** wrapped with §2 in a single `Backdrop.astro`
(`tint="muted"`, `opacity={75}`, `focus="top"`) over
`home_cleaning/house-cleaning-cleaner-mopping-timber-living-room-floor.png`,
so one photo runs behind both sections rather than restarting at the seam.
Unchanged from the first build. 🟢

### The `[Button] Get an instant quote` here is deliberately not built

The hero directly above already renders this exact button — same label, same
`quoteCta` href — and `Hero.astro`'s `cta` prop is required, so it cannot be
moved down instead. With the trust bar overlapping the hero, the two would
sit roughly half a screen apart. One button, in the hero. 🟡

The brief's other two buttons (§11, §15) **are** built — they're far enough
down the page to be doing real work.

---

## §4 Three cards

Card copy verbatim, split into `title` (the opening first-person sentence) +
`description` (the rest):

**Card 1**
- title: `It's got away from me a bit`
- description: `Start with a one-off deep clean, then set up a fortnightly. That way round works out cheaper than doing it the other way.`
- links to `/deep-cleaning/`

**Card 2**
- title: `I'm moving out`
- description: `That's an end of lease clean, measured against an inspection rather than your own standard. Different page.`
- links to `/end-of-lease-cleaning/`

**Card 3**
- title: `It's for Mum or Dad's place`
- description: `We do regular cleans for older clients, including through Home Care Packages and DVA.`
- links to `/senior-home-cleaning/`

**Component:** `PathwayCards.astro`, three numbered cards on the dark ground.
🟢 — this is precisely "split traffic by audience/persona", which is what the
component exists for.

**Images** (all three already in place from the first build):

| Card | Asset | Why |
|---|---|---|
| 1 | `home/service-deep-and-one-off-cleans.png` | The same photo the homepage's deep-clean service tile uses. Shows the deep clean itself, which is where the card's CTA sends you. |
| 2 | `home_cleaning/inside_your_home/deep_cleaning/deep-cleaning-empty-room-on-moving-out-day.jpg` | The same photo the deep-cleaning page's own moving-out card uses. |
| 3 | `home_cleaning/senior-home-cleaning-established-living-room-armchair-by-window.jpg` | The home, not the person — an adult child reading this card is picturing their parent's living room. |

🟡 **Not from the brief, carried over from the first build:** the section
heading/accent lines (`Not quite what you need?` / `Start here instead.`) and
the three CTA labels (`Deep cleaning`, `End of lease cleaning`,
`Senior home cleaning`). The brief supplies card copy and link targets only.
The headings are structural placeholder copy; the CTA labels are plain
wayfinding, not marketing copy.

🔴 **`/senior-home-cleaning/` has no mega-menu entry.** It is *not* the same
page as Commercial → "Aged care, retirement and seniors"
(`/aged-care-retirement-and-seniors/`), which is cleaning aged-care premises.
Open item, unchanged from the first build.

---

## §5 What's included in every visit

Room list, then the two scope lists:

- **Kitchen.** Benchtops, splashback, stovetop, sink and taps, cupboard fronts, microwave outside, bin, floors.
- **Bathrooms and toilets.** Shower, screen, bath, basin, taps, mirror, toilet inside and out, floors.
- **Bedrooms and living areas.** Beds made, surfaces dusted, mirrors, skirting boards spot-cleaned, vacuum and mop.
- **Laundry.** Sink, benches, appliance fronts, floors.
- **Throughout.** Cobwebs, switches and handles, all floors.
- *Quoted separately:* inside the oven, carpet steam cleaning, windows, blinds, inside the fridge.
- *Not included:* dishes, laundry, tidying or organising belongings, moving heavy furniture.

**Component:** `ComparisonTable.astro`. 🟢 — unchanged from the first build,
because the content is unchanged and the existing shape is right.

**Column design — one column, three states.** `values` accepts a string as
well as a boolean, and a cell rendered as a short note carries the middle
state:

| cell | meaning |
|---|---|
| ✓ | in every clean, at no extra cost |
| `Quoted separately` | we do it, but it's priced separately |
| ✗ | we don't do it at all |

A second "Quoted separately" *column* was tried in the first build and
dropped: it put a check mark under a negative heading on the exclusion rows
(a tick meaning "yes, we don't do this") and spent a full column on crosses.
Folding that state into the cell text keeps the "costs extra is not the same
as we don't do this" distinction in half the width.

The five rooms carry their task lists as `description`, so no detail from the
brief's room-by-room list is lost in the move to a table.

⚠️ **The two "laundry" entries are different things.** The brief lists the
laundry *room* as included and *laundry* (washing your clothes) as not
included — a flat contradiction if both rows just said "Laundry". The rows
are disambiguated to `Laundry room` and `Washing, drying and folding
clothes`. Don't shorten either back.

---

## §6 Weekly, fortnightly or monthly — NEW SECTION

The brief supplies a real 3-column × 3-row grid:

|  | Weekly | Fortnightly | Monthly |
|---|---|---|---|
| **Suits** | Larger households, homes with pets, heavy kitchen and bathroom use | Most homes | Smaller households, or a top-up between deep cleans |
| **What it does** | Holds everything at the same level week to week | Keeps the house steady without over-servicing | Takes the edge off, though the house moves between visits |
| **First visit** | Longer than the ones after it | Longer than the ones after it | Longer than the ones after it |

Closing copy:
> Fortnightly suits most homes. If you're not sure, start there and tell us if
> it isn't holding. Changing it later takes a message.

**Component:** `ComparisonTable.astro`, three columns, `Fortnightly`
carrying `highlight: true`. 🟢 — one feature per row, one compared entity per
column, short text notes as values. This is the component's exact contract,
and it's already proven at three columns on `deep-cleaning.astro`.

- `heading`: `Weekly, fortnightly or monthly` (the brief's own H2)
- `cornerLabel`: `How often we come` — names the question the table answers,
  distinct from the `<h2>` above it, same two-heading pattern the homepage
  and deep-cleaning pages use
- `footnote`: the closing copy above, verbatim
- `highlight` on Fortnightly, because the brief's own closing line says
  "Fortnightly suits most homes" — the highlight is the copy's claim rendered
  in layout, not an invented emphasis

🟡 **The "First visit" row has three identical cells.** "Longer than the ones
after it" appears under all three frequencies, so as a *comparison* row it
tells the reader nothing — and §7 immediately below is a whole section about
exactly that. Kept verbatim because it's true and because it pre-empts the
question at the moment the reader is choosing a frequency. Worth a look on
review: dropping the row loses nothing, and the table gets tighter.

🟡 **Two `ComparisonTable`s now sit back to back** (§5, then §6), which is a
lot of table in a row. Judged acceptable: they answer two different questions
(*what happens each visit* vs. *how often*), their headings and
`cornerLabel`s say so, and §6 is much lighter at 3×3 than §5's 14 rows.
Flagged because it's the kind of thing that only shows up on the rendered
page.

⚠️ **`[CONFIRM with Teagan that this reflects how she would actually advise.]`**
The marker is stripped from published copy — it's a note to Teagan, not text
for a visitor — but the whole section is an operational recommendation a
client will act on. Whoever schedules these jobs needs to agree with it.
Same handling as deep-cleaning's three `[CONFIRM]` answers.

---

## §7 The first one takes longer

> We start from wherever the house is, so the first visit runs longer than the
> ones after it and is priced differently.
>
> If it's been a while, a one-off deep clean first works out better value than
> paying for a long first regular clean. We'll tell you honestly which one you
> need rather than quoting for the bigger job by default.

**Component:** `TextBlock.astro`, `theme="light"`, `align="left"`, heading
`The first one takes longer`, two paragraphs. 🟢

**Copy change:** this revision splits the first build's single paragraph in
two and adds the clause `rather than quoting for the bigger job by default` —
a real commercial promise, not a rewording. Ships verbatim.

---

## §8 What you're actually buying — NEW SECTION

> It isn't a spotless house. It's not thinking about it.
>
> Not wondering whether anyone's coming this week. Not chasing a reply. Not
> being the one who has to raise it when the bathroom quietly stops being done
> properly.
>
> Set your day once, meet your team, and it happens. A reminder in the lead-up
> so it never sneaks up on you, and a message when we're on our way. Some
> clients want a quick chat when we arrive, others would rather come home to
> it done. Both are completely fine.

**Component:** `TextBlock.astro`, `theme="dark"`, `align="left"`, heading
`What you're actually buying`, three paragraphs, plus `backgroundImage` +
`scrimOpacity={82}`. 🟢

**This replaces the first build's "Nobody leaves a cleaner over the
cleaning."** That section led with a four-item bullet list of ways cleaners
fail; this one makes the same argument without the list. **Do not re-add the
bullets** — the new brief writes all three of these as running prose, and the
list is what carried the old block's "nine local cleaners, employed properly"
claim, which this revision drops along with the "local mums" framing.

**Photo behind the dark ground:**
`home_cleaning/inside_your_home/deep_cleaning/deep-cleaning-tidy-living-room-kept-up-by-regular-visits.jpg`
— the asset's own name is literally the state this section is selling. 82%
scrim, the same figure `why-tlb.astro` and `index.astro` use for their dark
pivot blocks, which keeps Off White copy at full contrast. This is the line
the page turns on and the only dark prose block between two light ones. 🟢

---

## §9 Credibility signals

> [Before and after images from genuine TLB jobs, with client permission and
> no identifying detail.]

**Component:** 🔴→🟢 **`BeforeAfter.astro` — a NEW component**, built for this
section: two before/after pairs on draggable comparison sliders.

### Why this needed a new component

This is the one genuine gap in the library, and the first build had already
written it down in its own source: *"nothing in SECTIONS.md pairs two images
as one unit."* Every existing option treats images as a **set of independent
frames**, and both plausible `PhotoGallery` variants were tried on this
content before the new file was written:

- **`filmstrip`** (the first build's choice, for its per-image `caption`)
  grows the *active* frame and shrinks the rest, so a Before and its own After
  are never the same size at the same moment — which is exactly the comparison
  a before/after pair asks the viewer to make. The first build shipped it and
  flagged the cost on the rendered page.
- **`grid`** (the second build's choice, following `deep-cleaning.astro`) lays
  four frames out side by side and leaves the viewer to hold one in memory
  while looking at the next.
- `ContentGrid` / `StoryMosaic` have no concept of two images as one unit at
  all.

The unit here is the **pair**, and the interaction is a wipe between its two
members. That isn't a layout variant of "some photos", so it's a new file
rather than a forced fit — the exact call this library's own top note asks
for. Full entry in `SECTIONS.md`, plus a reverse cross-reference on
`PhotoGallery` so nobody reaches for a gallery for this content again.

### How it's built

- Two pairs — kitchen benchtop, shower screen — which is the minimum that
  reads as a pattern rather than one lucky room.
- The control is a native `<input type="range">` stretched transparently over
  each frame, so pointer drag, touch, click-to-position, arrow/Home/End keys
  and a screen-reader-announced value all come for free. The visible divider
  and grip are `aria-hidden` decoration; a visually-hidden `<label>` names
  each slider by its caption.
- One source of truth (`--ba-pos`), declared with a `50%` fallback, so with JS
  off the pair renders as a clean static split rather than one image with an
  invisible one on top.
- The overlay is **clipped, not resized**, or the halves stop lining up and
  the wipe reads as a zoom.
- `lead` is used to say the frame is draggable: the grip is an affordance, not
  an instruction.

### ⚠️ The images currently wired are SAMPLES, not photographs

Four flat vector illustrations generated by
`scripts/make-before-after-samples.mjs`, so the interaction could be built and
reviewed before any real client photography exists. Each carries a **visible
SAMPLE badge**, their filenames say `sample-`, and the section's `note` prop
says so on the page in the reader's own view:

> Illustrative samples, shown while we collect before and after photos from
> real TLB cleans.

The guardrail has not moved: a fabricated "before and after from a real job"
is a false trust claim. These are labelled demonstrations of a UI, not
evidence of work. **Swapping in the real photos is four import lines plus
deleting the note.**

### The shooting brief (unchanged, now living in the page's §9 block)

1. BEFORE — kitchen benchtop and splashback, genuine TLB job.
2. AFTER — the same benchtop, same angle.
3. BEFORE — shower screen and tiles, genuine TLB job.
4. AFTER — the same shower screen and tiles, same angle.

⚠️ **Shoot each pair from ONE FIXED POSITION.** The slider wipes one frame
over the other in place, so a shifted camera or a different crop reads as a
glitch rather than as cleaning. This matters *more* now than it did for a
gallery, and the component cannot enforce it — the brief has to.

⚠️ **Two consent conditions, both from the brief, both on TLB before real
photos publish:** written client permission, and no identifying detail in
frame — no house numbers, street signs, mail, people, or names on doors. A
"before" photo of someone's house is the most sensitive image this site would
carry. **Never substitute stock photography either.**

🟡 `heading` / `lead` are not in the brief ("Credibility signals" is a section
label, not copy). Placeholder structural copy.

---

## §10 Hero video

> [James video testimonial.]

**Component:** `VideoFeature.astro`, one reserved 16/9 `VideoPlaceholder`
slot. 🟢

🟡 `headingLines` is placeholder copy. The brief's row reads "Hero video" /
"James video testimonial" — a section label and an asset note, neither of
which is page copy.

⚠️ **"James" is named with no other context.** Confirm who he is (regular
client? how long with TLB? which town?) before the label ships as alt text.

---

## §11 Easy to book, instant pricing, cost effective — NEW SECTION

> Book online in a couple of minutes, or send a text, ring us or drop us an
> email, whichever you'd actually do.
>
> You get a price straight away rather than waiting on a quote, and it's based
> on your actual place rather than a guess. Tell us the size of it and roughly
> what condition it's in, and if a deep clean first would serve you better than
> a long first regular visit, we'll say so.
>
> Cost effective because it's the same team each visit working to a set
> routine, so nobody is relearning your house. No lock-in, no minimum term and
> no exit fee. Skip a visit when you're away, and your spot stays yours.
>
> [Button] Get an instant quote

**Component:** `TextBlock.astro`, `theme="dark"`, `align="left"`, heading
`Easy to book, instant pricing, cost effective`, three paragraphs,
`cta={quoteCta}`. 🟢

Identical component, theme, heading and CTA to the same-named section already
shipping on `deep-cleaning.astro` — same brief generation, same role on the
page, so it is not decided again here. `TextBlock`'s `cta` defaults to the
`inverse-accent` button variant on a dark theme, which is what that page
renders.

This is where the hero subheadline's three claims get paid off, which is why
it earns the page's second button.

---

## §12 What our clients say

> [Two testimonials to be supplied. Brief for Teagan: one from a long-standing
> client, ideally naming how long they've been with TLB, because tenure is the
> proof this page needs. One from a client who has been with a few cleaners
> over the years, because that story converts.]

**Component:** `TestimonialCarousel.astro`, `heading="What our clients say"`,
two items, `uniform`. 🟢

`uniform` because at exactly 2 items the carousel renders no arrows or dots
anyway (count decides the look), and equal sizing reads better than one card
artificially scaled up over the other.

**Two slots, not three.** The brief specifies exactly two jobs for this
page's testimonials — tenure, and the switcher story. There is no third
brief-specified angle, so there is no third story to reserve.

⚠️ Every quote, name and role is a bracketed `[TBC]` briefing slot, **not** a
real testimonial. The visible text reads as obviously unfinished so it can't
be mistaken for a real customer saying a real thing. Swap each for a real
quote as it's collected; **never** fill these with invented names or words.

---

## §13 Where we clean

Three labelled regions, 56 towns:

- **Northern Rivers** (28): Lismore · Goonellabah · Alstonville · Wollongbar · Casino · Kyogle · Nimbin · Clunes · Bexhill · Dunoon · Ballina · East Ballina · Lennox Head · Skennars Head · Wardell · Evans Head · Broadwater · Woodburn · Coraki · Bangalow · Byron Bay · Suffolk Park · Mullumbimby · Brunswick Heads · Ocean Shores · New Brighton · Billinudgel · Federal
- **The Tweed** (19): Murwillumbah · Tweed Heads · Tweed Heads South · Banora Point · Terranora · Bilambil · Bilambil Heights · Chinderah · Fingal Head · Kingscliff · Casuarina · Cudgen · Cabarita Beach · Bogangar · Hastings Point · Pottsville · Uki · Burringbar · Mooball
- **Southern Gold Coast** (9): Coolangatta · Bilinga · Tugun · Currumbin · Palm Beach · Elanora · Burleigh Heads · Burleigh Waters · Miami

> Link each town to its location page. If a town isn't listed, ask us anyway.

**Component:** `TagCloud.astro` with `groups`, one group per region. 🟢 —
`groups` was added to this component for the deep-cleaning brief's identical
list, precisely so three regions don't become three stacked Dark Teal bands
each repeating a heading. Same list here, same shape, copied verbatim.

- `heading`: `Where we clean`
- `subheading`: `Northern Rivers, the Tweed and the Southern Gold Coast.`
- `note`: `["If a town isn't listed, ask us anyway."]` — the brief's own
  closing line, which the first build dropped (`note={[]}`)

Slugs are **derived** (`/locations/<lowercased, hyphenated>/`) rather than
hand-written — 56 hand-typed hrefs is 56 chances to typo one — and the
derivation matches every existing `/locations/` slug in `navigation.ts`. Same
`townSlug` helper deep-cleaning uses.

⚠️ **This replaces the first build's 12-town flat list**, which also carried
two stale `isHighlighted: true` flags. That property **no longer exists** on
`TagCloud`'s `Tag` interface and `astro check` does not catch it, so those two
pills had silently been rendering un-highlighted. Gone with the rewrite.

🔴 **Most of these location pages don't exist.** The header mega-menu lists
15 towns; this ships 56 links, so roughly 41 are 404s. That hurts the
"[service] [suburb]" ranking this section exists to serve more than an
unlinked pill would. Either the location pages land alongside this page, or
the unbuilt towns ship as plain unlinked pills (drop their `href` — `TagCloud`
already renders a `<span>` when there isn't one). Which towns have pages is
TLB's answer, not a guess. Identical flag on deep-cleaning; **one fix, both
pages.**

🔴 **Suburb lists still disagree across the site.** This list and
deep-cleaning's are now the two longest by a wide margin, against the
mega-menu's 15 and commercial-cleaning's 12, and they're the only ones naming
the Tweed as its own region rather than folding it into "Northern Rivers NSW".
Nothing contradicts the shorter lists — they're all subsets — but the
mega-menu is what a visitor navigates by, so it should grow to match. One
reconciliation pass across `navigation.ts`, this page, `deep-cleaning.astro`
and `commercial-cleaning.astro`.

---

## §14 Frequently asked questions

Twelve questions, **one** accordion.

**Component:** `Faq.astro`, `heading="Frequently asked questions"`, 12 items.
🟢

**One block, not two.** Every earlier page on this site splits its FAQs into
a "branded" and a "non-branded" accordion, because those briefs supplied two
labelled lists. This brief supplies one H2 and one run of twelve questions,
so it ships as one accordion — the same call `deep-cleaning.astro` makes for
the same reason. **Don't split it back into two for site symmetry**; that
would mean inventing the second heading and deciding which questions sit
under it, neither of which is in the brief.

The first build shipped **6 questions across two blocks and held three
back** as unconfirmed operational-policy claims. This revision supplies
suggested text for all of them, and `deep-cleaning.astro` has since
established the handling: **strip the `[CONFIRM]` marker from published copy**
(it's a note to Teagan, not text for a visitor) and flag each inline in the
source. These are finished sentences awaiting a read-through, not literal
unfilled blanks. All twelve ship.

One question from the first build is **dropped**, because this revision
doesn't carry it: "Why not just find a cleaner through a local Facebook
group?" — its answer rested entirely on the "nine employed local mums"
framing this brief drops.

| # | Question | Status |
|---|---|---|
| 1 | Who's in my house when I'm at work? | 🟢 drafted in full |
| 2 | Will I get the same cleaner every time? | ⚠️ `[CONFIRM]` |
| 3 | Can I skip a clean when we're away? | 🟢 drafted in full |
| 4 | What happens at the first visit? | 🟢 drafted in full |
| 5 | Do I need to tidy up before you arrive? | 🟢 drafted in full |
| 6 | How much does a regular clean cost? | 🟢 drafted in full |
| 7 | Am I locked into a contract? | 🟢 drafted in full |
| 8 | Is there a minimum booking? | ⚠️ `[CONFIRM]` — see below |
| 9 | What if my cleaner is sick or on holiday? | ⚠️ `[CONFIRM cover arrangements]` |
| 10 | Do you bring your own products and equipment? | ⚠️ `[CONFIRM product range]` |
| 11 | Can I ask for particular things to be prioritised each visit? | 🟢 drafted in full |
| 12 | Can I book over the phone instead of online? | 🟢 drafted in full |

⚠️ **Q8 "Is there a minimum booking?" still doesn't answer its own
question.** As drafted it says what *most cleaning companies* set (around two
hours) and why, then defers to a quote — it never states TLB's own minimum.
The first build held it back for exactly this reason. It ships now per the
deep-cleaning precedent, but it is the weakest answer on the page and the
`[CONFIRM]` on it is the one most worth acting on.

⚠️ **Q2, Q9 and Q10 are promises a client can hold TLB to** — a
same-cleaner assurance, a cover guarantee, and what products staff carry
(including the "we'll use what you've got or bring an alternative" offer for
babies, allergies and pets). All three ship as written; all three need
Teagan's read-through.

---

## §15 Closing block

> Set your day, meet your team, and stop thinking about it. Tell us about your
> place and we'll come back with a price.
>
> [Button] Get an instant quote

**Component:** `CallToAction.astro`, `variant="secondary"`. 🟢

- `heading`: `Set your day, meet your team, and stop thinking about it.`
- `lead`: `Tell us about your place and we'll come back with a price.`
- `cta`: `quoteCta`

**Real copy, at last.** The first build had no drafted closing paragraph and
echoed the hero's own lines as a placeholder. This revision supplies both
sentences, so the placeholder goes. 🟢

---

## §16 Not in this revision

Two things the first build carried, deliberately **not** in the new page:

- **A "how we compare" table.** The first brief gestured at one and supplied
  no heading, columns or rows, so the first build didn't build it. This
  revision doesn't mention it at all. Closed, not deferred. (Not to be
  confused with §5's inclusions table or §6's frequency table, both of which
  are real and built.)
- **The "Nobody leaves a cleaner over the cleaning" bullet block.** Replaced
  by §8, see that entry.

---

## Proposed full-page build order

Reconciled per §2's order conflict — trust bar moves above the opening
paragraph on component grounds, everything else runs in the brief's own order.

| # | Section | Component | Ground |
|---|---|---|---|
| 1 | Hero | `Hero` `split-single-image`, image right | Off White |
| 2 | Trust bar | `TrustBar` `card`, 5 cells | Dark Teal card, overlapping the hero |
| 3 | Opening paragraph | `TextBlock` `muted` left | Cream |
| — | *(2 + 3 share one `Backdrop` photo)* | `Backdrop` `muted` 75% `focus="top"` | |
| 4 | Three cards | `PathwayCards`, 3 cards | dark (component) |
| 5 | What's included in every visit | `ComparisonTable`, 1 col / 14 rows | light |
| 6 | Weekly, fortnightly or monthly | `ComparisonTable`, 3 cols / 3 rows | light |
| 7 | The first one takes longer | `TextBlock` `light` left | Off White |
| 8 | What you're actually buying | `TextBlock` `dark` left + photo, 82% | Dark Teal |
| 9 | Credibility signals | `BeforeAfter` (NEW), 2 draggable pairs | light |
| 10 | Hero video | `VideoFeature`, reserved slot | light |
| 11 | Easy to book, instant pricing, cost effective | `TextBlock` `dark` left + CTA | Dark Teal |
| 12 | What our clients say | `TestimonialCarousel` `uniform`, 2 TBC | light |
| 13 | Where we clean | `TagCloud` `groups`, 3 groups / 56 towns | Dark Teal band |
| 14 | Frequently asked questions | `Faq`, 12 items | light |
| 15 | Closing block | `CallToAction` `secondary` | |

**One new component.** Every section but §9 maps to something that already
exists — including the one thing this brief adds that the first didn't have
(§6's frequency table), which is `ComparisonTable`'s exact contract, already
proven at three columns on the deep-cleaning page. §9 is the exception and the
real gap: `BeforeAfter.astro`, because nothing in the library paired two
images as one unit. See that entry for the two `PhotoGallery` variants tried
and ruled out first.

---

## Open items

### 🔴 Genuine blockers

1. **~41 of the 56 `/locations/<town>/` links are 404s** (§13). Either the
   pages land, or the unbuilt towns drop their `href`. Same fix serves
   `deep-cleaning.astro`.
2. **Suburb lists disagree across four files** (§13) — `navigation.ts`
   (15 towns), this page (56), `deep-cleaning.astro` (56),
   `commercial-cleaning.astro` (12). The mega-menu should grow to match.
3. **`/senior-home-cleaning/` has no mega-menu entry** (§4), and must not be
   confused with `/aged-care-retirement-and-seniors/`.
4. **`canonical` is `https://example.com/`** on every page in this repo (§0).

### ⚠️ Copy awaiting Teagan

5. **§6 frequency advice** — `[CONFIRM with Teagan that this reflects how she
   would actually advise.]` The whole section is an operational recommendation
   a client will act on.
6. **FAQ Q2** — same cleaner every time.
7. **FAQ Q8** — minimum booking. **Still doesn't state TLB's own minimum.**
   The most consequential of the four.
8. **FAQ Q9** — sick/holiday cover arrangements.
9. **FAQ Q10** — product range, including the allergy/baby/pet alternative
   offer.
10. **"James"** (§10) — who is he, and how long with TLB?

### ⚠️ Unsubstantiated claims now shipping

11. **"98% of our clients stay with us"** (§2).
12. **"Over 100 local homes, hosts and businesses"** (§2).

Both came from the brief so both ship; both are figures TLB can be asked to
substantiate.

### 📷 Missing assets

13. **Four before/after photos** (§9) — the slider currently runs on four
    SAMPLE illustrations with visible SAMPLE badges, and the section carries a
    `note` saying so. Swapping in the real thing is four import lines plus
    deleting that note. Three conditions attached: **each pair shot from one
    fixed position** (the slider wipes in place, so a shifted camera reads as
    a glitch), written client permission, and no identifying detail in frame.
    Never substitute stock.
14. **James's video** (§10) — reserved 16/9 slot.

### 💬 Missing testimonials

15. **Two client quotes** (§12) — one long-standing client naming tenure, one
    who'd been through several cleaners. Both currently `[TBC]` slots.

### 🟡 Copy not in the brief, shipping as placeholder

16. §4 `PathwayCards` heading/accent and the three card CTA labels.
17. §9 `PhotoGallery` heading and lead.
18. §10 `VideoFeature` heading.

### 🟡 Judgement calls worth a review

19. **§3's `[Button]` is not built** — the hero renders the same button half a
    screen above it. The brief's other two buttons are built.
20. **§6's "First visit" row has three identical cells.** Dropping it loses
    nothing and tightens the table.
21. **§5 and §6 are two `ComparisonTable`s back to back.** Judged acceptable;
    only really assessable on the rendered page.
22. **Four pages still carry the old three-point trust bar** —
    `ndis-cleaning`, `why-tlb`, `commercial-cleaning` (and previously this
    one). The icon/label pairs to copy are in this page and `index.astro`.
