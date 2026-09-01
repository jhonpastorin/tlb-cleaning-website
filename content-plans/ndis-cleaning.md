# Content plan: "NDIS Cleaning Service" page

Source: TLB Cleaning **NDIS Cleaning** content brief (focus keyword
`NDIS cleaning services`). Maps every block to a component from
[`SECTIONS.md`](../SECTIONS.md), states positioning, and flags anywhere the
spec has no clean 1:1 match or the copy is blocked/unconfirmed.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap. Content status:
**drafted** (ships as-is), **pending confirmation** (bracketed in the
source), **blocked** (no usable copy).

Slug: **`/ndis-cleaning/`** — already live in the header mega-menu under
Home Cleaning → Specialist cleaning
([`navigation.ts:137`](../src/data/navigation.ts#L137)). No conflict.

---

## ✅ Built — [`src/pages/ndis-cleaning.astro`](../src/pages/ndis-cleaning.astro)

Live at `/ndis-cleaning/`, matching the mega-menu's existing slug. Verified
in a browser at 1440px and 390px: no console errors, no horizontal overflow,
one `<h1>`, all twelve sections rendering.

**`Callout.astro` was built** — the component this plan proposed in §5 and
[`why-tlb.md`](./why-tlb.md) §9c deferred for want of a second consumer. Both
consumers are live: this page's "You probably don't need a registered
provider" (`tone="note"`) and why-tlb's Christmas warning (`tone="warning"`,
retro-fitted from the dark `TextBlock` it had been shipping as). Documented
in [`SECTIONS.md`](../SECTIONS.md).

**Decisions taken during the build**, all recorded in the page file:

| Section | Call |
|---|---|
| §2 definition | **Drafted**, reusing the brief's own branded-FAQ wording for the funding claim rather than inventing a new characterisation of the scheme. Needs sign-off. |
| §4 trust bar | Third point swapped to "Bound by the NDIS Code of Conduct" — the one compliance claim true as written for every NDIS-funded provider, so it needs no bracket. |
| §5 worth knowing | **Rewritten** for the reader; the internal-strategy sentences and the unsourced 65% statistic are cut. |
| §7–9 | **Not built.** Empty in the brief with no direction at all — and the deep-cleaning page's credibility block was filled on an assumption and removed again at TLB's direction, which is the precedent. |
| §11 layout | `ContentGrid columns={2}` with the third cell `span: 2`, because the three items are structurally uneven. |
| §13 comparison | **Not built** — see that section. |
| §16 CTA | Added (not in brief), using the brief's own "Get a fast quote". |
| Title tag | Pluralised to "NDIS Cleaning Services", double space removed. |

**Still blocking launch:** the four compliance brackets (ship visibly, per
TLB's convention, but must be filled), §15's compliance review, and sign-off
on §2's drafted definition and §5's rewrite.

---

## ⚠️ Read this first

**This page is different from its four siblings and needs to be treated
that way.** Everything else on this site sells cleaning to people choosing a
supplier. This page addresses people with disability, their family carers,
and the coordinators who hold a duty of care to them — and it makes
specific claims about how a government scheme works.

Three consequences that run through every section below:

1. **Factual claims about NDIS rules are advice, not marketing.** A
   participant may act on them. The brief contains a line-item code, a phone
   number, funding-eligibility rules and cancellation rules — all
   verifiable, all subject to annual change.
2. **Screening claims are safety claims.** "Police-checked" on a page about
   entering the homes of people with disability is not a trust badge; it is
   a representation about worker vetting.
3. **Nothing on this page should be inferred from the sibling pages.** Where
   the brief is blank, it stays blank rather than borrowing from
   `house-cleaning.md` — the audience and the obligations differ.

---

## 🚩 Blockers

### 1. The "Worth knowing" section contains internal strategy, not customer copy

This is the most serious problem in the brief. The section reads, in full:

> The biggest misconception is also the biggest opportunity.
>
> Most people assume "NDIS cleaning" requires a registered provider. It
> doesn't — only NDIA-managed plans are restricted to registered providers.
> Self-managed and plan-managed participants can use anyone, and plan
> management has grown into the dominant arrangement (the NDIA's own pricing
> review noted roughly 65% of active participants using it, up sharply since
> 2022). **So the addressable market for a good local operator is large and
> growing, and almost nobody explains this clearly to the participant.
> Whoever explains it first tends to win the enquiry.**

The bolded portion is **written to TLB, not to the reader**. "Addressable
market", "win the enquiry" and the heading's "biggest opportunity" are
competitive-strategy notes that have been pasted into a customer-facing
brief by mistake.

Publishing it would tell an audience of people with disability that they are
an addressable market, and that the page exists to win their enquiry before
a competitor does. On a page whose entire premise is trustworthiness, that
is the worst possible sentence to ship.

**Recommendation — split the paragraph, keep the first half, delete the
second.** The opening is genuinely valuable customer content and very likely
the highest-converting explanation on the page: most participants *don't*
know that plan-managed and self-managed funding can go to an unregistered
provider, and that is precisely the objection standing between them and an
enquiry. Rewrite as guidance addressed to the reader:

> **You probably don't need a registered provider.**
>
> Most people assume NDIS cleaning has to come from a registered provider.
> Only NDIA-managed plans are restricted that way. If your plan is
> self-managed or plan-managed, you can choose any provider you like —
> including us.

The heading needs replacing too: "The biggest misconception is also the
biggest opportunity" describes TLB's opportunity, not the reader's.

⚠️ **The 65% statistic should not ship without a source.** The brief
attributes it to "the NDIA's own pricing review" without naming or dating
it. Either cite it properly or cut it — it does no work for a participant
deciding whether to call, and it is exactly the kind of number that ages.

### 2. ✅ Team size — resolved: **nine**

The brief said "a team of **[five]**" in §11 while this page's own trust bar
said "9 full-time local team members". **Ruled: nine.** That matches every
other page:

| Where | Now reads |
|---|---|
| This page's trust bar | "9 full-time local team members" |
| This page's §11 | "a team of **nine**" ✅ |
| Homepage | "nine full-time cleaners… most of them mums as well" |
| Why TLB H1 | "Nine local mums" |

So §11's sentence becomes: *"It grew from one person to a team of nine
without a dollar spent on advertising."*

⚠️ Still open elsewhere, and unaffected by this ruling: **whether all nine
are mums.** This page's §11 says "most of our team are local women" and the
homepage says "most of them mums as well", while Why TLB's H1 says "Nine
local mums". That's a separate question about *who* the nine are, tracked in
[`why-tlb.md`](./why-tlb.md) 🚩1.

### 3. Compliance brackets — keep them, per house convention

**Ruled: unresolved items stay as visible brackets**, e.g. `[insured]`. That
matches what the rest of the site already does — the footer renders a literal
`[TBC]` phone and email, and every testimonial slot renders
`[TBC — ask Teagan…]`. The point of the convention is that a bracket reads as
obviously unfinished on sight, so it can never be mistaken for a finished
claim.

So these ship **as brackets**, and the two branded FAQs that depend on them
are no longer held back (see §14):

| Bracket | Where | What it's asserting |
|---|---|---|
| `[insured]` | §11, and card 3's copy | Insurance status |
| `[police-checked / worker-screened]` | §11 | Worker vetting |
| `[confirm police checks]` | Branded FAQ 2 | Same claim, second occurrence |
| `[plan-managed and self-managed]` | Branded FAQ 1 | Which plan types TLB accepts |

⚠️ **Two notes that survive the ruling.**

**(a) These four are still launch-blocking**, unlike a bracketed phone
number. A visible `[police-checked]` is fine in a draft and fine in review —
it just can't be the state the page goes live in, because worker vetting on
a page inviting staff into the homes of people with disability is a safety
representation rather than a detail. Bracket them now; resolve them before
launch.

**(b) `[police-checked / worker-screened]` needs a decision, not just a
value.** NDIS Worker Screening and a police check are **different checks**,
and the brief offers them interchangeably with a slash. Whoever fills this
bracket should say which one TLB actually holds, rather than picking the
friendlier phrasing.

The brief's other compliance line — *"like every provider paid from NDIS
funding — bound by the NDIS Code of Conduct"* — is correct as a general
statement and needs no bracket.

### 4. The trust bar is the wrong three points for this audience

The boilerplate row is reused verbatim from the other pages:

> 9 full-time local team members · every client came from a recommendation ·
> Trusted by leading Northern Rivers real estate agencies

**"Trusted by leading Northern Rivers real estate agencies" means nothing to
an NDIS participant or a support coordinator** — and it quietly signals
"commercial cleaning contractor" to an audience choosing an in-home support.
It's also the weakest of the three for a coordinator assessing suitability.

Recommend an audience-specific third point drawn from what actually matters
here — insurance, worker screening, or Code of Conduct compliance — once §3
above is resolved. `TrustBar` takes any strings; this is a copy decision,
not a build one.

### 5. Six sections are entirely empty in the brief

| Section | Supplied |
|---|---|
| Definition paragraph (§2) | **nothing** — only "CTA - Get an instant quote" |
| Credibility signals (§7) | nothing |
| Hero video (§8) | nothing |
| The why (§9) | nothing |
| Social proof (§12) | nothing — not even "ask Teagan", which every sibling brief had |
| How we compare (§14) | "[Insert comparison table here, if applicable]" |

§2 is the serious one: it is the answer-target block for the focus keyword
`NDIS cleaning services`, and the page currently has no sentence defining
what NDIS cleaning is. See §2 below.

---

## 0. Page metadata

| Field | Value | Notes |
|---|---|---|
| Title tag | `NDIS Cleaning Service \| TLB Cleaning` | ⚠️ Note the double space before the pipe in the source. Also: **"Service" singular** while the focus keyword is "NDIS cleaning services" — recommend "NDIS Cleaning Services". |
| Meta description | "Reliable NDIS household cleaning in the Northern Rivers and Tweed. The same trusted local team, on time, treating your home like our own. Get a fast quote." | 156 chars — slightly long, may truncate. Otherwise good, and correctly scoped to NSW only. |
| URL | `/ndis-cleaning/` | Already in the mega-menu. No conflict. |
| Focus keyword | `NDIS cleaning services` | |
| Google Classification Type | — | **Blank.** Tool named, no output pasted. |
| Related keywords | — | **Blank.** |
| Query fan-outs | — | **Blank.** |
| Entities | — | **Blank.** ⚠️ This is the one page where the entity row really matters: NDIS, NDIA, NDIS Code of Conduct, Core Supports, Assistance with Daily Life, plan management are all real Knowledge Graph entities the copy already uses correctly. Worth recording them properly rather than leaving the row empty. |

⚠️ **Scope note, and it looks deliberate.** The meta description and §10's
suburb list cover the **Northern Rivers and Tweed only** — no Southern Gold
Coast, unlike every other page. That is plausibly correct: the NDIS is
administered per-state and a QLD participant is a different proposition.
Confirm it's intentional rather than an omission.

---

## 1. Hero — `Hero.astro` 🟢 · drafted

> H1: The same trusted local faces, treating your home with genuine care.
>
> Overview: Consistent, respectful in-home cleaning you can rely on. Experience the comfort of a safe environment, familiar local faces, and a completely stress-free schedule.

- `headingLines`: the H1.
- `lead`: the overview — 23 words, inside the 15–25 target. No trim needed.
- `cta`: "Get an instant quote". The brief places it after the definition
  paragraph, but `Hero.astro`'s `cta` is **required**, so it lives here and
  §2's stays unset — same ruling as all four sibling pages.
- `kicker`: not in the brief. Available now (added for `why-tlb`) if a
  label like "NDIS Cleaning" would help orient the reader.

🟡 **Variant.** `minimal`, since no photo is supplied — but flag harder than
usual: this page's entire H1 is *"the same trusted local faces"*, and a hero
with no faces undercuts it. A real photo of real staff would earn more here
than on any other page.

⚠️ Do **not** reach for the four existing images in
[`src/assets/hero/`](../src/assets/hero/) — despite names like
`participant-and-support-worker.png`, they are leftover placeholders from
the Maple/NDIS template this component library was originally built against.
They are not TLB's people. Using them would fabricate a workforce on the one
page where that matters most.

---

## 2. Definition paragraph — `TextBlock.astro` 🟢 component · 🔴 **content blocked**

**The brief supplies nothing.** The row contains only "CTA - Get an instant
quote".

This is the highest-value gap on the page. Every sibling page has a
definition paragraph in this slot, and it does two jobs: it is the
answer-target block most likely to be lifted as a featured snippet or AI
overview answer for the focus keyword, and it is where the page states what
it actually is.

**Not to be invented.** A definition of NDIS cleaning is a statement about
what a funded support covers — closer to §16's regulated content than to
marketing copy. It needs writing by whoever can stand behind it.

For reference, the sibling pattern is two sentences: what the service is,
then where TLB provides it.

---

## 3. Pathway cards — `PathwayCards.astro` 🟢 · drafted

Three cards, each already written as a title (with a trailing `→`) plus a
body. Strip the arrows — `PathwayCards` renders its own CTA affordance, so a
literal `→` in the title duplicates it.

**Card 1** → `/house-cleaning/`
- title: "Set up regular support"
- description: "Most participants prefer the comfort of a consistent, weekly or fortnightly schedule. You get the same familiar face treating your home with genuine care, every time."

**Card 2** → `/deep-cleaning/`
- title: "I need a deep reset clean"
- description: "Sometimes you just need help getting back on top of things. A deep clean resets the home to a safe, comfortable standard before starting regular service."

**Card 3** → ⚠️ **no destination**
- title: "I am a Support Coordinator"
- description: "We make managing plans easy. We are a reliable, insured local business ready to provide consistent, respectful in-home help for your participants."

⚠️ **Card 3 is the page's most valuable click and has nowhere to go.** A
coordinator placing participants is a repeat, multi-client referrer — the
highest-value visitor this page receives. The card speaks directly to them
and then strands them.

Three options, in order:
1. **An on-page anchor** to a coordinator-specific block (referral process,
   invoicing, how to send a participant). Nothing in the brief covers this
   yet, so it needs writing.
2. **A direct contact route** — a dedicated enquiry form or email for
   coordinators, which is what they actually want.
3. **`/contact/`** as a stopgap so nothing 404s.

⚠️ Note the card claims "insured" — the same unresolved bracket as 🚩3.

Open: section `heading`/`headingAccent` (not in brief), three CTA labels
(not in brief), three card images (not supplied).

---

## 4. Trust bar — `TrustBar.astro` 🟢 component · ⚠️ wrong content

Three points as drafted, but see 🚩4 — the third is aimed at the wrong
audience, and the first contradicts §11. **Positioning:** directly under the
hero per the boilerplate's own instruction, ahead of its table-row position.

---

## 5. "Worth knowing" — 🟡 **split required, see 🚩1**

**Only the first half is publishable.** The recommended component depends on
how it's rewritten:

- **`TextBlock.astro`** (`theme="dark"`, with `heading`) — ships today, and
  the dark band gives the page its tonal break.
- **`Callout.astro`** — a proposal, see the note below.

### 💡 New component proposal: `Callout.astro`

An emphasised single-message panel — one short heading, one paragraph,
optional tone (`note` / `warning`) — for "read this before you go further"
moments that aren't section headings and aren't full prose blocks.

This was **proposed and deliberately deferred** on
[`why-tlb.md`](./why-tlb.md) §9c, on the grounds that it had exactly one
consumer and this library's own bar is two (see `ServiceIcon.astro`'s
justification in `SECTIONS.md`). **That bar is now met:**

| Consumer | Content |
|---|---|
| `why-tlb.astro` §9c | "Do not do this in the fortnight before Christmas…" — a timing warning |
| This page §5 | "You probably don't need a registered provider" — a misconception correction |

Both are single short messages that interrupt the reading flow to correct
something the reader probably believes. Both are currently dark `TextBlock`s,
which works but overloads a component whose job is running prose.

**Recommendation: build it, now that it's earned.** Retro-fit `why-tlb`'s
Christmas warning at the same time so both consumers are real from day one.
If you'd rather not, the dark `TextBlock` stopgap is honest and already
shipping — this is a polish call, not a blocker.

---

## 6–9. Credibility signals · Hero video · The why · CTA — 🔴 **all blocked**

Four consecutive boilerplate rows, **all empty in the brief.** Nothing to
map, and nothing that can be borrowed from a sibling page: the credibility
signals and "why" copy on the other pages are written for households
choosing a cleaner, not for participants, carers and coordinators.

The video slot could be reserved as a labelled `VideoPlaceholder` (as on
`house-cleaning` and `deep-cleaning`) **once someone decides what the video
is** — the brief doesn't say, unlike the deep-cleaning brief's clear
"before-and-after video".

---

## 10. Who this is for — `TextBlock` + `ServiceBlocks` + `TagCloud` 🟢 · drafted

The brief files this as one `P` row, but it's three distinct blocks:

**(a) Intro** → `TextBlock.astro`, heading "Who this is for":
> NDIS cleaning for people across the Northern Rivers and Tweed
>
> If keeping on top of the house has become harder than it used to be, you're not alone — and you don't have to sort it out by yourself.

*(The first line reads as a subheading rather than body copy — use it as the
`heading` and the second as `body`, or promote it to the section heading.)*

**(b) "We clean for"** → `ServiceBlocks.astro` variant `list`, three rows.
The source is a plain three-item list with no title/description split, so
each item becomes a `title` with no description — or a `TextBlock` with a
`{ list: [...] }` entry, which is the lighter build and preserves it as
prose:

- NDIS participants who want a regular, reliable clean at home
- Family carers arranging support for someone they love
- Support coordinators and plan managers who need a local provider that turns up, communicates and invoices properly

**Recommend the `TextBlock` list** — three short phrases don't need
`ServiceBlocks`' full row treatment, and `TextBlock` gained list support for
exactly this shape.

**(c) Suburbs** → `TagCloud.astro`, one linked pill each:

> Ballina, Lennox Head, Alstonville, Byron Bay, Bangalow, Lismore,
> Goonellabah, Casino, Evans Head, Ocean Shores, Tweed Heads, Kingscliff

⚠️ **This is the site's fourth different suburb list**, and the differences
look deliberate rather than careless:

| List | Count | Notable |
|---|---|---|
| Homepage | 14 | includes QLD |
| House cleaning | 12 | includes QLD |
| Header "Areas we clean" | 15 | includes QLD, adds Evans Head + Casino |
| **This page** | **12** | **NSW only** — adds Bangalow and Goonellabah, which appear on no other list |

NSW-only is consistent with the meta description and plausibly correct for a
state-administered scheme. **Bangalow and Goonellabah are new to the site
entirely** — if TLB serves them, they belong on the other lists too; if
not, they shouldn't be here.

Each pill needs an href; the guessed `/locations/<slug>/` pattern is still
unconfirmed across all pages.

---

## 11. Why people choose TLB — `ContentGrid.astro` 🟡 · drafted

⚠️ **Mislabelled in the brief.** The template row says *"Services (Highlight
the core supports within this category. Use icons and short text)"* — but
the content supplied is three numbered differentiators, not a service list.
Map the content, not the label.

Three items, `columns={3}` or a stacked list — but they are **structurally
uneven**, which is the mapping problem:

| # | Heading | Body |
|---|---|---|
| 1 | We turn up | One paragraph **plus a standalone tagline**: "On time. Done properly. Every time." |
| 2 | The same familiar faces — not a call centre | **Three** paragraphs |
| 3 | A real local business, and a real name behind it | **Three** paragraphs, including all four compliance brackets |

A 3-up grid with one short cell and two long ones will look broken. Two
honest options:

1. **`ContentGrid` `columns={3}`** after evening out the copy — needs an
   editing pass the plan can't make on its own.
2. **`ServiceBlocks` variant `list`** — three full-width stacked rows,
   which tolerates uneven length far better. **Recommended** as the build
   that works with the copy as written.

Icon-less either way: `ServiceIcon.astro`'s set is abstract and has nothing
matching reliability, familiarity or local ownership.

✅ Item 3's team size is now **nine**, not `[five]` (🚩2): *"It grew from one
person to a team of nine without a dollar spent on advertising."*

⚠️ Item 3 still carries `[insured]` and `[police-checked / worker-screened]`.
Under 🚩3 those ship as visible brackets — but they are the two that most
need resolving before launch.

⚠️ Item 3 also contains a genuinely good line worth protecting in editing —
*"Most of our team are local women. If you'd feel more comfortable with a
woman in your home, tell us and we'll do our best to arrange it."* That is
specific, useful and audience-aware. Note it says "most", consistent with
the homepage and inconsistent with Why TLB's "nine local mums".

---

## 12. Social proof — `TestimonialCarousel.astro` 🟢 component · 🔴 blocked

**Empty in the brief** — not even the "ask Teagan for testimonials" briefing
line every sibling had.

⚠️ **Testimonials need extra care on this page.** A quote from an NDIS
participant is health-adjacent personal information. Consent must be
explicit and informed, and identifying detail (suburb plus disability, for
instance) should be minimised. A carer or coordinator quote may be easier to
obtain and carries similar weight for a coordinator audience.

Build as bracketed `[TBC]` slots per the site convention, or hold the
section. **Never invent a participant quote.**

---

## 13. Comparison table — `ComparisonTable.astro` 🟢 component · 🔴 blocked

The brief says only *"[Insert comparison table here, if applicable]"* —
and "if applicable" suggests even the author wasn't sure.

⚠️ **Do not reuse the shared table from
[`src/data/comparison.ts`](../src/data/comparison.ts).** It is approved copy,
but its rows are wrong here — "Ongoing contracts with the region's leading
real estate agencies" and "Owned and run by local mums from the Northern
Rivers" answer a household's question, not a participant's. A coordinator
comparing providers wants to know about screening, insurance, plan types
accepted, consistency of worker, and cancellation terms.

**Recommend either writing NDIS-specific rows or dropping the section.** A
page this long doesn't need a weak table, and an off-target one costs more
credibility than it earns.

---

## 14. Branded FAQs — `Faq.astro` 🟢 · **all 5 ship**, two carrying brackets

Under the bracket ruling (🚩3), nothing here is held back. All five publish;
two carry a visible bracket that must be resolved before launch.

Ship clean:
- "What makes TLB different from other cleaners doing NDIS work?"
- "What if I'm not happy with the clean, or I want things done differently?"
- "What happens if I get in touch?"

Ship **with a visible bracket**:
- **"Can I use my NDIS funding to pay for cleaning?"** — carries
  `[plan-managed and self-managed]`. The rest of the answer is well phrased
  and appropriately hedged: *"cleaning usually sits under Core Supports where
  it's reasonable and necessary in your plan"*. Only the plan-types bracket
  is outstanding.
- **"Who actually comes into my home — will it be the same person each
  time?"** — carries `[confirm police checks]`. ⚠️ This is the page's single
  most important trust question, so of the four brackets this is the one to
  resolve first.

⚠️ The first answer carries a stray **"(33 words)"** — an editing artefact
from drafting. Strip it; it is not a placeholder and should not become one.

⚠️ *"You choose what gets done, how often, and what we leave alone. Change it
any time"* (FAQ 4) is excellent for this audience — choice and control is the
language of the scheme itself. Keep the register in any additions.

---

## 15. Non-branded FAQs — `Faq.astro` 🟢 · drafted, **compliance review required**

All five are drafted in full and none is bracketed, so they read
ready-to-ship. **They are not**, and this is the page's second-biggest risk
after 🚩1.

These five answers are the strongest content in the brief — genuinely
useful, specific, and far better than anything a competitor will have. They
are also the most consequential, because a participant may act on them.
Every claim below is checkable and dated:

| Claim | Where | Note |
|---|---|---|
| Line item `01_019_0120_1_1` for yard and garden | FAQ 3 | A specific code from the NDIS Pricing Arrangements, **which are reissued annually.** Verify against the current edition. |
| NDIA contact `1800 800 110` | FAQ 2 | Verify current. |
| Consumables generally not claimable | FAQ 4 | Broadly right; confirm phrasing. |
| Short-notice cancellation may be claimable "only if the agreement says so and they couldn't give the worker other paid work" | FAQ 5 | The cancellation rules are among the most frequently revised parts of the pricing arrangements. |
| Shared-household funding not duplicating what others provide | FAQ 1 | Reasonable, but it's an eligibility judgement — hedge it. |

**Recommendations:**
1. **A compliance read before publishing** — ideally by someone who works
   with plans daily (a plan manager or coordinator), not just a proofread.
2. **Add a visible "last reviewed" date** to this block. Pricing
   arrangements change annually; undated advice silently goes stale.
3. **Add a short "this is general information, check with your plan manager"
   line.** The answers already hedge well; making it explicit costs nothing
   and matches the tone.
4. **Schedule a re-check** when the next pricing arrangements are published.

⚠️ FAQ 2's *"Not until it's funded, but you can ask for it"* is exactly the
right honest answer, and it's the sort of thing that earns a coordinator's
trust. Don't let a review soften it into vagueness.

---

## 16. Closing CTA — `CallToAction.astro` 🟡

⚠️ **The brief has no closing CTA row**, and two mid-page rows read `CTA -`
with nothing after them (after §11 and after §13).

Recommend the standard closing `CallToAction` (`variant="secondary"`), as on
all four sibling pages, using the brief's own "Get a fast quote" wording from
the meta description and branded FAQ 5 rather than the sitewide "Get an
instant quote" — *fast* is gentler than *instant* for this audience, and
the brief chose it twice.

⚠️ Consider a **second, coordinator-specific** route here, tied to card 3's
unresolved destination (§3). Participants and coordinators want different
next steps, and this page is the one place both are reading.

---

## Full page order

1. `SiteHeader`
2. `Hero` (`minimal`) — H1, overview, CTA
3. `TrustBar` ⚠️ — moved up per the boilerplate; third point wrong for audience
4. 🔴 **Definition paragraph — BLOCKED, nothing supplied**
5. `PathwayCards` — 3 cards *(card 3 has no destination)*
6. `TextBlock` (dark) or `Callout` — "Worth knowing" ⚠️ **split required**
7. 🔴 Credibility signals — blocked
8. 🔴 Hero video — blocked
9. 🔴 The why — blocked
10. `TextBlock` + `TagCloud` — "Who this is for" + suburbs
11. `ServiceBlocks` (list) — "Why people choose TLB" ⚠️ *(2 visible brackets)*
12. 🔴 `TestimonialCarousel` — blocked
13. 🔴 `ComparisonTable` — blocked, and possibly should be dropped
14. `Faq` #1 — branded, all 5 *(2 carry visible brackets)*
15. `Faq` #2 — non-branded, 5 of 5 **pending compliance review**
16. `CallToAction` — added, not in brief
17. `SiteFooter`

**What could ship if the blocked sections are omitted:** 2, 3, 5, 6 (split),
10, 11 (once brackets resolve), 14, 15 (once reviewed), 16. That is a
coherent page — but note it would launch **without a definition paragraph,
without any social proof, and without a "why" section**, which is thinner
than any sibling page.

---

## Open items

**Settled:**
- 🚩2 Team size is **nine** — apply to §11's sentence.
- 🚩3 Unresolved items stay as **visible brackets**, per house convention.
  Nothing is held back on their account; §14 now ships all five FAQs.

**Must resolve before any launch:**
- 🚩1 Rewrite "Worth knowing" — delete the internal-strategy sentences.
  *(The only item here that cannot be handled by bracketing: it isn't a
  missing value, it's the wrong audience.)*
- Fill the four compliance brackets — worker screening first, and decide
  **which** check it is (NDIS Worker Screening ≠ police check).

**Must resolve before publishing the advice content:**
- §15 compliance review, "last reviewed" date, general-information line.
- The 65% statistic in §5 — cite or cut.

**Content not supplied at all:**
- Definition paragraph (§4) — the page's answer-target block.
- Credibility signals, hero video, "the why" (§7–9).
- Testimonials (§12) — plus a consent process before any are collected.
- Comparison table rows (§13) — or a decision to drop the section.
- Card 3's destination (§5) — the coordinator route.
- Section headings for §3, §11; card CTA labels; the two empty mid-page CTAs.

**Decisions:**
- Is NSW-only coverage deliberate? (Meta description and §10 both say so.)
- Are Bangalow and Goonellabah served? They appear on no other list.
- Build `Callout.astro` now that it has two consumers, or keep the dark
  `TextBlock` stopgap?
- Title tag: "Service" → "Services" to match the focus keyword, and remove
  the double space.

**Media needed:** hero photo (matters more here than anywhere), 3 card
images, video, testimonial avatars. **Do not use
`src/assets/hero/participant-and-support-worker.png` or its siblings** —
they are Maple template leftovers, not TLB's people.

**Cross-page consistency:** team size (all five pages), trust bar wording
(now four variants), suburb lists (now four lists).
