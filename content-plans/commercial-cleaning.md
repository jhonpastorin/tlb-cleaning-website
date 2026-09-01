# Content plan: "Commercial Cleaning Services" page

Source: TLB Cleaning **Commercial Cleaning** content brief (focus keyword
`Commercial Cleaning Services`). Maps every block to a component from
[`SECTIONS.md`](../SECTIONS.md), states positioning, and flags anywhere the
spec has no clean 1:1 match or the copy is blocked/unconfirmed.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap. Content status:
**drafted** (ships as-is), **pending confirmation** (bracketed in the
source), **blocked** (no usable copy).

Slug: **`/commercial-cleaning/`** — already live in the header mega-menu as a
top-level nav item ([`navigation.ts:144`](../src/data/navigation.ts#L144)).
No conflict. See 🚩2 — that nav position changes what this page has to be.

---

## ✅ Built — [`src/pages/commercial-cleaning.astro`](../src/pages/commercial-cleaning.astro)

Live at `/commercial-cleaning/`, matching the mega-menu's existing slug.
`astro check` passes with 0 errors/warnings/hints across 40 files; the build
emits all six pages; the rendered page has one `<h1>`, twelve sections, no
duplicate element ids, 15 links to the commercial child pages and 12 to
`/locations/`. ⚠️ **Not verified in a real browser** — this project has no
headless browser installed, so unlike the sibling plans' claims there is no
1440px/390px visual pass. Layout and overflow are unchecked.

**Two component bugs were found and fixed**, both the same class of thing and
both documented in [`SECTIONS.md`](../SECTIONS.md):

| File | Bug |
|---|---|
| `TagCloud.astro` | Hardcoded `id="tag-cloud-heading"`. **Introduced by this page**, the first to render two TagClouds. The second section's `aria-labelledby` resolved to the first section's heading. Fixed with the build-time random suffix `ServiceBlocks.astro` already uses. |
| `Faq.astro` | Same bug on `id="faq-heading"` — **pre-existing and already live** on `index.astro` and `ndis-cleaning.astro`, both of which render two `Faq` blocks. The `name`-group fix had been applied; the heading id had not. Fixed the same way. |

⚠️ **`TagCloud`'s `isHighlighted` no longer exists** — removed in commit
`0cdc521` when every pill moved to the outlined style. It was passed here
twice before the build caught it, and `astro check` does **not** flag it
(excess-property checking doesn't fire on a `const`-inferred array passed to
a prop). Removed; noted in `SECTIONS.md` for other callers.

**Decisions taken during the build**, all recorded in the page file:

| Section | Call |
|---|---|
| Title tag | Pluralised to "Commercial Cleaning Services", double space removed. |
| §1 hero | `kicker="Commercial Cleaning"` **added** (not in brief) — the H1 carries no part of the focus keyword. CTA relabelled **"Book a site walkthrough"** per 🚩5. |
| §2 definition | **Drafted**, following the sibling two-sentence pattern. Nothing here is regulated, unlike the NDIS page's equivalent gap — but it still needs sign-off. |
| §3 cards | **All three rewritten** per 🚩1. Card 2's NDIS copy replaced; its invoicing specifics ship as a visible bracket because that is genuine missing input. Destinations: `/office-cleaning/`, `/contact/` (stopgap), `/why-tlb/`. |
| §4 trust bar | **Unchanged.** All three points are on-target here. The "employed, not subcontracted" rewording is left as an open decision rather than a unilateral edit to supplied copy. |
| §5 worth knowing | **Verbatim**, in a dark `TextBlock` — not `Callout`. At 164 words across two paragraphs it is a section, not an aside. |
| §6–8 | **Not built.** Empty in the brief; the deep-cleaning precedent is that guessing here gets reverted. |
| §7 premises TagCloud | **Built**, 15 pills — the 🚩2 fix. Every href is an unconfirmed guess from `navigation.ts`. |
| §8 scope | **Not built.** 🚩3 says it must not be invented; a prominent comment marks the slot. |
| §10 comparison | **Built**, reusing `comparison.ts` — the opposite call to the NDIS page, and argued in §10. |
| §14 where we clean | **Built** (not in brief), reusing the header mega-menu's existing "Northern Rivers NSW" list rather than adding a fifth suburb list. |
| §12 FAQ links | **Not added.** `Faq.astro` renders `answer` as plain text, so inline links would mean changing a shared component's contract for one page. The premises TagCloud covers the childcare link instead. |
| §13 CTA | Added (not in brief), "Book a site walkthrough". |

**Still blocking launch:** the `[insured]` / `[police-checked]` brackets and
the WWCC decision behind them (🚩4), the QLD/Blue Card scope question, card
2's invoicing bracket, the missing scope of work (🚩3), and sign-off on §2's
drafted definition.

---

## ⚠️ Read this first

**This is the strongest brief of the five, and it has one structural problem
the others didn't.**

The prose that *is* here is the best on the site. "Worth knowing" (§5) is a
genuinely useful, honest explanation of why cleaning quotes differ, and the
ten FAQs (§11–12) are specific, well-hedged and better than anything a
competitor in this market will have. None of that needs rescuing.

The problem is what the brief thinks this page *is*. It's written as a
standalone service page. In the site's own information architecture it is a
**hub** — a top-level nav item with fifteen child pages hanging off it — and
the brief gives it no links to any of them, no scope of work, and no service
area. See 🚩2 and 🚩3.

Two smaller things run through every section below:

1. **The audience is B2B.** A person choosing a cleaner for premises they're
   responsible for — an office manager, a practice manager, a strata
   committee, a venue owner. Not a householder. Several blocks in the brief
   still address a householder, or worse, an NDIS participant (🚩1).
2. **Claims about pay and screening are checkable.** The Cleaning Services
   Award and the Working With Children Check both appear by name. They're
   used correctly, which is rare — but they're now the page's factual
   surface and need to stay current (§12).

---

## 🚩 Blockers

### 1. The pathway cards are NDIS copy pasted into a commercial brief

The three cards in §3 are, in substantial part, lifted from
[`ndis-cleaning.md`](./ndis-cleaning.md)'s equivalent block. Card 2 is not
adapted at all:

> **I need this invoiced to a plan ➔**
>
> No problem. We work directly with self-managed and plan-managed
> participants, sending clear, compliant invoices straight to your plan
> manager so you aren't left out of pocket or chasing paperwork.

**"Self-managed and plan-managed participants" and "your plan manager" are
NDIS terms.** They mean nothing to an office manager, and to anyone who does
recognise them they signal that this page was assembled from another one.
This is the single most visible defect in the brief.

Cards 1 and 3 are contaminated more mildly but still wrong in register:

- Card 1's "I am looking for **regular support**" — *support* is
  disability-sector language; the commercial word is *service* or *contract*.
  Its closing "so you always know exactly who is at the door" describes a
  house, not a workplace with a back entrance and an alarm code.
- Card 3's "We always treat **your space** with genuine warmth, care, and the
  respect it deserves" — warmth is the right note for a home and the wrong
  one for a tenancy. It also duplicates branded FAQ 2, which answers the same
  question better and in the page's own voice.

**Recommendation: rewrite all three for a commercial reader.** The three
questions a commercial buyer actually arrives with are already answered
elsewhere in this brief, so the cards can be re-pointed rather than invented:

| Card | Question this audience has | Where the answer already exists |
|---|---|---|
| 1 | What does an ongoing contract look like? | §5's scope-in-writing argument |
| 2 | How is it billed, and what's *in* the price? | §12 FAQ 4 (consumables), §5 (after-hours pricing) |
| 3 | Who is in my building when we're closed? | Branded FAQ 2 — near-verbatim usable |

Card 2's replacement is the one that needs real input: **nobody has said how
TLB invoices commercial clients** (monthly in arrears? PO numbers? per-visit?).
That's a genuine unknown, not a rewrite.

⚠️ Card 3 also claims **"fully police-checked and insured"** — see 🚩4.

⚠️ Strip the trailing `➔` from all three titles. `PathwayCards` renders its
own CTA affordance; a literal arrow in the title duplicates it. (Same note as
every sibling page.)

### 2. This page is a hub with fifteen children, and the brief treats it as a leaf

[`navigation.ts:143–172`](../src/data/navigation.ts#L143-L172) makes
`/commercial-cleaning/` a top-level header item whose mega-menu contains:

| Group | Children |
|---|---|
| Commercial services | Commercial carpet cleaning · Commercial pressure cleaning |
| By type of premises | Office cleaning · Strata and common area cleaning · Aged care, retirement and seniors · Medical, clinic and salon cleaning · Construction site · Hospitality, venues and holiday parks · Commercial kitchen cleaning · Schools and childcare centres · Gyms and fitness studios · Retail and shopfronts · Warehouses and industrial sites · Factories · Breweries |

**The brief links to none of them.** A visitor who lands here because they run
a café, a clinic or a strata block has no route to the page written for them,
and the fifteen child pages get no internal link from their own parent.

This matters more than it looks. It is simultaneously the page's biggest
conversion gap (a brewery owner reading generic office copy bounces) and its
biggest SEO gap (a hub page that doesn't link its cluster passes nothing
down).

**Recommendation: add a premises-type block.** Two components fit, and the
choice depends on whether the child pages exist yet:

- **`TagCloud.astro`** 🟢 — thirteen linked pills in a yellow band, exactly
  what it's for ("a long, flat list of conditions, services, or categories as
  pills"). Cheapest build, handles thirteen items without looking sparse, and
  it's the same treatment the suburb lists already use. **Recommended.**
- **`ServiceBlocks.astro` variant `list`** 🟡 — full-width rows with a
  title + description each. Better if each premises type gets a sentence, but
  thirteen stacked rows is a very long section and the descriptions don't
  exist.

⚠️ The child slugs are **flat kebab-case guesses** from their labels, per
[`navigation.ts:86–89`](../src/data/navigation.ts#L86-L89) — unconfirmed, and
some are odd as standalone URLs (`/factories/`, `/breweries/`,
`/construction-site/`, the last of which is singular where every sibling is
plural). Confirm before wiring thirteen more links to them.

### 3. The page argues that scope is what matters, then never states a scope

§5's own copy makes the argument:

> The number that actually matters isn't the hourly rate — it's what's in the
> scope. Ask any cleaner exactly which tasks are included, how often, and
> whether consumables like soap and paper are covered.

And §12 FAQ 4 tells the reader to *"get it written into the scope before you
sign anything."* The page tells the reader to demand a task list four separate
times and never shows one.

**This is the highest-value missing content on the page** — higher than the
definition paragraph, because it is the thing the page's own argument
promises. A commercial buyer comparing providers wants to see: what's done
every visit, what's done weekly vs. monthly, and whether consumables are in
or out.

**Recommendation: a "what's included" block.** `ServiceBlocks.astro` variant
`icon-grid` or `list`, or a `TextBlock` with a `{ list: [...] }` body entry if
it's a plain task list. **Not to be invented** — this is TLB's actual
commercial scope and only they can state it.

⚠️ It would also be the page's honest answer to its own strongest line. Right
now a reader could reasonably note that TLB is the only cleaner on the page
not showing its scope.

### 4. "Police-checked" is claimed, "Working With Children Check" is raised, and nothing connects them

Card 3 states the team is *"fully police-checked and insured."* Then §12's
fifth FAQ says:

> Yes, where the work is child-related — a childcare centre, preschool, school
> or similar site. In NSW, child-related work requires a current Working With
> Children Check, and the business engaging the worker is responsible for
> verifying it. Ask any provider to confirm which of their team hold a current
> check before they attend a site where children are present.

That answer is correct, and it is also an instruction to interrogate TLB.
**The page tells the reader to ask every provider a question it doesn't answer
about itself** — and the mega-menu actively invites those enquiries via
*Schools and childcare centres*.

A police check and a Working With Children Check are **different checks**;
holding one says nothing about the other. This is the same distinction
[`ndis-cleaning.md`](./ndis-cleaning.md) 🚩3(b) flagged for NDIS Worker
Screening, unresolved there too.

**Recommendation:**
1. Confirm what TLB's team actually holds. If any of them hold a current
   WWCC, say so — it is a strong differentiator and it closes the loop the
   FAQ opens.
2. If they don't, that's fine, but then **the childcare/school child page
   needs to not exist yet**, or needs to say what happens before TLB attends
   such a site.
3. Per the house convention ([`ndis-cleaning.md`](./ndis-cleaning.md) 🚩3),
   unresolved compliance claims ship as **visible brackets** —
   `[police-checked]`, `[insured]` — so they read as obviously unfinished.
   They are still launch-blocking.

⚠️ **QLD is not addressed.** The FAQ says "In NSW" — accurate, and the meta
description scopes the page to "the Northern Rivers and Tweed" (both NSW).
But `footerContact.address` reads *"Northern Rivers, NSW & Southern Gold
Coast, QLD"* and the header lists Burleigh Heads and Palm Beach. In QLD the
equivalent is a **Blue Card**, not a WWCC. Either confirm commercial is
NSW-only (as NDIS appears to be) or the FAQ needs a QLD clause.

### 5. "Get an instant quote" contradicts the page's own process

The definition row's CTA is *"Get an instant quote"* — the sitewide label from
[`navigation.ts:14`](../src/data/navigation.ts#L14). But branded FAQ 5 says:

> We'll come and walk through your site, then send a written scope and price —
> no obligation. If it suits, we'll agree a start date and you'll meet the team
> who'll be cleaning.

And §12 FAQ 1 closes: *"A site walkthrough settles it in ten minutes."*

**There is no instant quote for commercial work, and the page says so twice.**
The meta description already uses the softer *"Get a quote."*

**Recommendation: use a commercial-specific CTA label** — "Book a site
walkthrough" or "Get a written quote" — on this page's hero, cards and closing
CTA. It matches the process the page describes, and it's a *better* offer for
this buyer than an instant number would be. The sitewide header CTA can stay
as it is; this is a page-level copy decision, not a build one.

### 6. Seven sections are empty in the brief

| Section | Supplied |
|---|---|
| Definition paragraph (§2) | **nothing** — only "CTA - Get an instant quote" |
| Credibility signals (§6) | nothing |
| Hero video (§7) | nothing |
| The why (§8) | nothing |
| Social proof (§9) | nothing — not even "ask Teagan", which house-cleaning and deep-cleaning both had |
| How we compare (§10) | "[Insert comparison table here, if applicable]" |
| Three mid-page CTA rows | "CTA -" with nothing after it, three times |

§2 is the serious one: it is the answer-target block for the focus keyword
`Commercial Cleaning Services`, and the page currently has no sentence
defining what commercial cleaning is or where TLB does it.

---

## 0. Page metadata

| Field | Value | Notes |
|---|---|---|
| Title tag | `Commercial Cleaning Service \| TLB Cleaning` | 43 chars — comfortable. ⚠️ Two defects, both identical to the NDIS brief: a **double space** before the pipe, and **"Service" singular** while the focus keyword is "Commercial Cleaning Services". Recommend `Commercial Cleaning Services \| TLB Cleaning` (44 chars). |
| Meta description | "Commercial and office cleaning across the Northern Rivers and Tweed. The same local team every week, a scope in writing, and no surprises. Get a quote." | 151 chars — fits. Strong: leads with the keyword, names the area, and its three proof points are the page's actual argument. Note it promises "a scope in writing" — see 🚩3. |
| URL | `/commercial-cleaning/` | **Blank in the brief**, but already a top-level nav item. No conflict. |
| Focus keyword | `Commercial Cleaning Services` | ⚠️ Does **not appear in the H1** — see §1. |
| Google Classification Type | — | **Blank.** Tool named (`rqpredictor.streamlit.app`), no output pasted. |
| Related keywords | — | **Blank.** ⚠️ Worth filling here more than on any sibling: "office cleaning", "strata cleaning", "commercial cleaners near me" and the eleven other premises types are all separate head terms with their own child pages (🚩2). This row is what should decide which of the fifteen children get built first. |
| Query fan-outs | — | **Blank.** |
| Entities | — | **Blank**, and the copy is already full of them. See below. |

⚠️ **The entities row should be filled from the copy that already exists.**
This brief uses real Knowledge Graph entities correctly and in natural prose —
exactly what the template asks for — and then records none of them:

> Cleaning Services Award 2020 (MA000022) · Fair Work Commission · Working
> With Children Check · NSW Office of the Children's Guardian · Safety Data
> Sheet · Northern Rivers · Tweed Heads

⚠️ **Scope note.** The meta description says "the Northern Rivers and Tweed" —
NSW only, matching [`ndis-cleaning.md`](./ndis-cleaning.md) and unlike the
homepage and house-cleaning page, which both include the Southern Gold Coast.
Confirm this is deliberate; it interacts with 🚩4's Blue Card question.

---

## 1. Hero — `Hero.astro` 🟢 · drafted

> H1: Professional ongoing service that never cuts corners after month one.
>
> Overview: The reliable middle your office needs. Trust a fully insured local team to keep your workplace spotless, professional, and welcoming week after week.

- `headingLines`: the H1.
- `lead`: the overview — 23 words, inside the template's 15–25 target. No
  trim needed.
- `cta`: ⚠️ see 🚩5 — recommend "Book a site walkthrough" over the brief's
  "Get an instant quote". `Hero.astro`'s `cta` is **required**, so it lives
  here and §2's stays unset — same ruling as all four sibling pages.
- `kicker`: **recommend setting it to "Commercial Cleaning".**

⚠️ **The H1 contains no part of the focus keyword.** "Professional ongoing
service that never cuts corners after month one" contains neither
*commercial*, *office* nor *cleaning* — and the brief's own template row for
this block says the headline should *"Overlap with key topic and audience
targeting."* It's a good headline; it just doesn't say what the page is about,
and a reader arriving from a SERP sees no confirmation they landed right.

`Hero.astro`'s `kicker` prop exists for precisely this — a short eyebrow label
rendered above the `<h1>`, outside it, so the heading copy is untouched.
Setting `kicker="Commercial Cleaning"` fixes the orientation problem without
an edit to approved copy. (Added for the Why TLB page; this is its second
consumer.)

⚠️ Also note the H1's claim is a **negative differentiator** — "never cuts
corners after month one" only lands if the reader already suspects that's what
happens. §5 and the branded FAQs both make that case well, but they're below
the fold. The overview line carries the whole positive proposition on its own.

🟡 **Variant.** `minimal`, since no photo is supplied. Less costly here than
on the NDIS page (whose H1 was literally about faces), but a photo of a real
TLB team member in a real workplace would do more for a B2B buyer than any
sentence on the page.

⚠️ Do **not** reach for the images in [`src/assets/hero/`](../src/assets/hero/)
— they are leftover placeholders from the Maple/NDIS template this component
library was originally built against, not TLB's people.

---

## 2. Definition paragraph — `TextBlock.astro` 🟢 component · 🔴 **content blocked**

**The brief supplies nothing.** The row contains only "CTA - Get an instant
quote".

Every sibling page has a definition paragraph in this slot, and it does two
jobs: it is the answer-target block most likely to be lifted as a featured
snippet or AI-overview answer for the focus keyword, and it is where the page
states plainly what it is.

For reference, the sibling pattern is two sentences: what the service is, then
where TLB provides it. Unlike the NDIS page's equivalent gap, **nothing here is
regulated** — a definition of commercial cleaning is ordinary marketing copy
and can be drafted without a compliance read. It just hasn't been.

⚠️ It is also where the focus keyword should appear in body copy for the first
time, given §1's H1 doesn't carry it.

---

## 3. Pathway cards — `PathwayCards.astro` 🟢 component · 🔴 **content wrong, see 🚩1**

The component fits — three persona cards routing different audiences to
different CTAs is exactly what it's for. **The copy is the problem.**

Source, verbatim:

**Card 1**
- title: "I am looking for regular support ➔"
- description: "We can set up a consistent weekly or fortnightly schedule. We aim to send the same familiar, friendly team members every time so you always know exactly who is at the door."

**Card 2**
- title: "I need this invoiced to a plan ➔"
- description: "No problem. We work directly with self-managed and plan-managed participants, sending clear, compliant invoices straight to your plan manager so you aren't left out of pocket or chasing paperwork."

**Card 3**
- title: "I want to know who is coming ➔"
- description: "Completely fair. We are a trusted local team, fully police-checked and insured. We always treat your space with genuine warmth, care, and the respect it deserves."

**Card 2 cannot ship in any form** — it describes NDIS plan management. Cards
1 and 3 are salvageable with an editing pass (🚩1).

**Destinations — none are supplied**, and only one is obvious:

| Card | Suggested destination | Confidence |
|---|---|---|
| 1 (ongoing contract) | `/office-cleaning/` | Reasonable — it's the default premises type and the meta description names it |
| 2 (billing) | ⚠️ **nothing exists** | An on-page anchor to a scope/pricing block (🚩3), or `/contact/` as a stopgap |
| 3 (who's coming) | `/why-tlb/` or `/about/` | Both live; `/why-tlb/` is the closer match |

Open: section `heading`/`headingAccent` (not in brief), three CTA labels (not
in brief), three card images (not supplied).

---

## 4. Trust bar — `TrustBar.astro` 🟢 · drafted

> 9 full-time local team members · every client came from a recommendation · Trusted by leading Northern Rivers real estate agencies

**Positioning:** directly under the hero, per the boilerplate's own
instruction (*"Three to five short proof points directly under the hero"*),
ahead of its position in the brief's table. Same reconciliation as every
sibling page.

✅ **This is the first page where the third point is genuinely on-target.**
[`ndis-cleaning.md`](./ndis-cleaning.md) 🚩4 flagged "Trusted by leading
Northern Rivers real estate agencies" as meaningless to that page's audience
and quietly signalling "commercial cleaning contractor". Here, that signal is
the correct one: a real estate agency is a commercial client, the relationship
is an ongoing contract, and property managers inspect the work weekly. Ship it
unchanged.

✅ Team size is **nine**, consistent with the homepage, Why TLB,
[`comparison.ts`](../src/data/comparison.ts) and the settled ruling in
[`ndis-cleaning.md`](./ndis-cleaning.md) 🚩2.

⚠️ Minor: "9 full-time local team members" is the fourth wording of this point
across five pages (elsewhere: "nine full-time cleaners, employed not
subcontracted"). For a commercial audience the **employed-not-subcontracted**
phrasing is materially stronger — subcontracting is the specific practice §5's
argument and §10's table are both about. Consider using it here.

---

## 5. "Worth knowing" — `TextBlock.astro` 🟢 · drafted · **the best copy on the site**

> **Why two cleaning quotes for the same job can look nothing alike**
>
> Contract cleaners in Australia are covered by the Cleaning Services Award, which sets a legal minimum for what a cleaner has to be paid — before you add super, insurance, equipment and travel. So when one quote lands well under the others, it's rarely a sharper deal. It usually means a shorter visit, a thinner list of tasks, or someone being paid less than they should be. The bill you don't see is the one you pay later, in dirty glass, missed bins and a cleaner who quietly stops showing up.
>
> The number that actually matters isn't the hourly rate — it's what's in the scope. Ask any cleaner exactly which tasks are included, how often, and whether consumables like soap and paper are covered. We put ours in writing before we start, and we'll tell you straight when a clean needs to happen after hours: that costs more because the Award says so, not because we've added a margin. No surprises, either way.

Note "Worth knowing" is the boilerplate section *label*; the real heading is
the line beneath it. Same structure as the NDIS brief's equivalent row.

**Component: `TextBlock.astro`**, `theme="dark"`, `align="left"`, with
`heading` set to "Why two cleaning quotes for the same job can look nothing
alike" and `body` as the two paragraphs. The dark band gives the page its
tonal break, and this is running prose — which is what `TextBlock` is for.

🟡 **`Callout.astro` was considered and ruled out.** It's built and available
now (both its consumers are live — see [`SECTIONS.md`](../SECTIONS.md)), and
"read this before you go further" is the right *intent*. But it's the wrong
size: this is **164 words across two paragraphs**, where both existing
`Callout` consumers are a single short paragraph, and `SECTIONS.md` is
explicit that its heading is *"visually an aside, not a new chapter"* while
the brief marks this row as an `H2` with a real section heading. A 164-word
aside stops reading as an aside. Use `TextBlock`.

✅ **This section should not be edited down.** It is the most persuasive block
in any of the five briefs — it explains a real thing the reader doesn't know,
it is honest about TLB's own pricing ("that costs more because the Award says
so"), and it converts by making the reader distrust the cheapest quote rather
than by making claims about TLB. Resist any pass that shortens it for
"scannability".

⚠️ **Two factual points to verify before publishing**, both light:
- *"Contract cleaners in Australia are covered by the Cleaning Services
  Award"* — correct, and §12 names it precisely as the **Cleaning Services
  Award 2020**. Consider naming it in full here too, on first mention rather
  than second.
- *"a clean needs to happen after hours: that costs more because the Award
  says so"* — correct in substance (shift loadings and penalty rates), and
  §12 FAQ 3 states it more carefully. Fine as written.

⚠️ It also makes 🚩3 unavoidable: this paragraph is the reason the page needs
to show a scope.

---

## 6–8. Credibility signals · Hero video · The why — 🔴 **all blocked**

Three consecutive boilerplate rows, **all empty in the brief**, plus a bare
`CTA -` row after §8 with no label.

**Nothing here can be borrowed from a sibling page.** The credibility imagery
and "why" copy elsewhere on the site are written for households choosing a
cleaner. And there is a direct precedent against guessing: the deep-cleaning
page's credibility block was filled on a reasonable assumption
(before/after imagery) and **removed again at TLB's direction** — see
[`deep-cleaning.md`](./deep-cleaning.md) §7. Don't repeat it.

If §6 comes back, it needs a brief saying what the visuals are meant to prove
*on this page*. For a commercial buyer the candidates are different from a
household's: a scope document, a site walkthrough, a cleaner in uniform with a
lanyard, an after-hours shift.

§7's video slot could be reserved as a labelled `VideoFeature` /
`VideoPlaceholder` (as on house-cleaning and deep-cleaning) **once someone
decides what the video is** — the brief doesn't say.

§8 is the notable absence. "The why (audience specific)" is where the page
would build the emotional case for a commercial reader, and the two obvious
angles are already sitting in the FAQs unused: the embarrassment of a client
walking into a dirty office, and the administrative relief of not having to
manage a cleaner. Both are stated better in §11 than anywhere else on the
page.

---

## 9. Social proof — `TestimonialCarousel.astro` 🟢 component · 🔴 blocked

**Empty in the brief** — not even the "ask Teagan for testimonials" briefing
line that house-cleaning and deep-cleaning both carried. Followed by a bare
`CTA -` row.

Build as bracketed `[TBC]` slots per the site convention (`uniform`, matching
`index.astro` and `house-cleaning.astro`), or hold the section. **Never invent
a quote.**

⚠️ **Worth briefing properly, because commercial testimonials do a different
job.** A household quote proves the clean was good; a commercial quote needs
to prove the *relationship* held up. The three that would convert here:

1. A client who **switched from a national/franchise cleaner** — pays off
   branded FAQ 3 directly.
2. A client **two or three years in**, whose standard didn't drop — pays off
   the H1's "never cuts corners after month one" and branded FAQ 4.
3. A **real estate agency or property manager** — the trust bar already claims
   this relationship (§4) and nothing on the site evidences it.

A named business with a role ("practice manager", "centre director") carries
far more weight in B2B than a first name, and unlike the NDIS page there's no
sensitivity reason to withhold it — but it still needs the client's consent.

---

## 10. How we compare — `ComparisonTable.astro` 🟢 · **recommend reusing the shared rows**

> How TLB compares
>
> [Insert comparison table here, if applicable]

Followed by another bare `CTA -` row.

No rows supplied. But unlike [`ndis-cleaning.md`](./ndis-cleaning.md) §13 —
where the shared table was ruled out as off-target — **the existing rows in
[`comparison.ts`](../src/data/comparison.ts) fit this page better than any
other on the site.** That data is approved copy supplied directly by TLB, and
it's already shared by the homepage and Why TLB, so a third consumer costs
nothing:

| Row | Fit here |
|---|---|
| "Nine full-time cleaners employed by TLB, not subcontracted*" | ✅ **The strongest row on this page.** Subcontracting is exactly what §5's Award argument is about — this is that argument's payoff in one line. |
| "Grew to nine full-time cleaners without ever advertising" | ✅ Matches the trust bar's second point. |
| "Ongoing contracts with the region's leading real estate agencies*" | ✅ On-target commercial proof; the one row that was wrong on the NDIS page. |
| "You see the cleaners who work your area, by name and face, before you book" | ✅ Answers branded FAQ 2's "who's actually in our building". |
| "Owned and run by local mums from the Northern Rivers" | 🟡 Brand-true and fine, but it's the least relevant of the five to a facilities decision. Keep it — it's approved copy and it carries the "neighbour's business" note branded FAQ 1 relies on. |

**Recommendation: reuse `comparisonColumns` / `comparisonRows` as-is**, with
this page's own `heading` (the brief's "How TLB compares") and a
commercial-framed `cornerLabel` and `lead` — the component is built so each
page sets its own framing over shared substance.

⚠️ Two row labels carry a trailing `*` with **no footnote text supplied**, a
known open item on `comparison.ts` that affects all three consumers. The
component has a `footnote` prop waiting for it. Adding the text once fixes
every page.

⚠️ Consider **one commercial-specific extra row** — "Scope agreed in writing
before we start" — since that is this page's own central promise (§5, §12
FAQ 4, branded FAQ 4) and no existing row states it. It would need adding to
`comparison.ts` as a page-specific row rather than to the shared set, since it
isn't relevant to the homepage.

---

## 11. Branded FAQs — `Faq.astro` 🟢 · **all 5 drafted, all ship**

Five items, all written in full, all appropriate to the audience. This is the
cleanest FAQ block in any of the five briefs — nothing bracketed, nothing to
hold back.

**"Are we too small a business for you?"**
> Not at all — a two-person office matters as much to us as a large site. With a national chain, a small local job is a rounding error. Here, it's a neighbour's business.

**"Who's actually in our building after hours?"**
> The same small team you've met, in TLB uniform — never a roster of strangers sent by a call centre. You'll know their names, and there's one local number to call if anything's not right.

**"We've used a big cleaning company before. What's different here?"**
> You get the same people, every week, who know your site. Teagan runs TLB herself and her name's on the work — so there's someone who actually owns whether it's done properly.

**"What if the standard slips after a few months?"**
> Tell us and we'll fix it — that's the deal. We agree the scope in writing so "done properly" means the same to both of us, and you can adjust the schedule anytime.

**"What happens if I get in touch?"**
> We'll come and walk through your site, then send a written scope and price — no obligation. If it suits, we'll agree a start date and you'll meet the team who'll be cleaning.

✅ **All five are written in the customer's voice** — "*we*" means the reader's
business, not TLB, in four of the five questions. That's an unusual and
effective register, and it's consistent across the block. Preserve it in any
additions; a later FAQ written in TLB's voice will read as bolted on.

✅ Teagan is spelled correctly (fixed sitewide in commit `900749c`).

⚠️ **Two claims to confirm**, neither blocking:
- *"in TLB uniform"* — appears nowhere else on the site. If uniforms are real,
  this is a strong, cheap trust signal that belongs in more places than one
  FAQ answer.
- *"there's one local number to call"* — `footerContact.phone` currently
  renders a literal `[TBC]` ([`navigation.ts:56`](../src/data/navigation.ts#L56)).
  The FAQ promises a number the site doesn't yet display. That's a sitewide
  open item, but this page is the first to make an explicit promise of it.

⚠️ FAQ 5 describes the whole sales process and directly contradicts the
"instant quote" CTA — see 🚩5.

⚠️ FAQ 4's *"We agree the scope in writing"* is the third place the page
promises a scope it never shows — see 🚩3.

---

## 12. Non-branded FAQs — `Faq.astro` 🟢 · drafted, **verification pass required**

Five items, all drafted in full, none bracketed. Genuinely strong long-tail
content and better than anything a local competitor will have.

**"How often should an office be cleaned?"**
> Most small offices settle on two to three cleans a week, moving to daily once headcount, foot traffic or client visits increase. Bathrooms, kitchens and high-touch surfaces need the most frequent attention regardless of the overall schedule. The right frequency depends on how hard the space is actually used — a quiet three-person studio and a busy café need very different plans. A site walkthrough settles it in ten minutes.

**"What's the difference between a regular clean and a deep clean?"**
> Regular cleaning covers the recurring tasks that keep a workplace usable: bins, bathrooms, kitchens, floors and high-touch surfaces on an agreed schedule. A deep clean is periodic and more intensive — carpet extraction, high dusting, detailed fittings, skirtings, vents and the edges routine visits don't reach. Most commercial sites run regular cleaning year-round and add a deep clean every few months, or after a fit-out or renovation.

**"Can commercial cleaning be done outside business hours?"**
> Yes, and most of it is — before opening or after close, so your team isn't working around cleaners. After-hours work is usually priced differently, because weekday shifts that start early or finish late attract penalty rates under the Cleaning Services Award 2020, as do weekends and public holidays. Ask for both options on your quote so you can compare the real cost of each.

**"Who supplies the cleaning products and equipment?"**
> The cleaner does. A commercial cleaning provider brings its own vacuums, mops, chemicals and safety data sheets as part of the service. Consumables are the thing to check separately — toilet paper, hand soap, paper towel and bin liners are sometimes included in the rate and sometimes billed on top. Get it written into the scope before you sign anything.

**"Do cleaners need a Working With Children Check?"**
> Yes, where the work is child-related — a childcare centre, preschool, school or similar site. In NSW, child-related work requires a current Working With Children Check, and the business engaging the worker is responsible for verifying it. Ask any provider to confirm which of their team hold a current check before they attend a site where children are present.

**Internal-link opportunities.** FAQ 2 describes deep cleaning and the site has
[`/deep-cleaning/`](../src/pages/deep-cleaning.astro) live; FAQ 5 describes
childcare sites and `/schools-and-childcare-centres/` is in the mega-menu.
Both answers should link out — partial relief for 🚩2.

⚠️ **Verification pass required — lighter than the NDIS page's, but real.**
These claims are checkable and dated:

| Claim | Where | Note |
|---|---|---|
| Cleaning Services Award 2020 sets a legal minimum for contract cleaners | §5, FAQ 3 | Correct (MA000022). Award rates are **reviewed annually** by the Fair Work Commission — the claim is durable, any specific rate would not be. |
| Early/late weekday shifts, weekends and public holidays attract penalty rates | FAQ 3 | Correct in substance. Confirm the phrasing covers shift loadings vs. overtime accurately. |
| The provider supplies equipment, chemicals and safety data sheets | FAQ 4 | Correct and standard. SDS provision is a WHS obligation, not a courtesy — could be stated more strongly. |
| In NSW, child-related work requires a current WWCC, and the engaging business must verify it | FAQ 5 | Correct under the *Child Protection (Working with Children) Act 2012* (NSW). ⚠️ **Silent on QLD's Blue Card** — see 🚩4. |
| "Most small offices settle on two to three cleans a week" | FAQ 1 | An industry observation, not a rule. Fine as written — it's already hedged with "settle on" and "depends on how hard the space is actually used". |

**Recommendations:**
1. A read-through by someone who prices commercial contracts, to confirm the
   Award characterisations. Not a legal review — these are general statements,
   correctly hedged.
2. Consider a **"last reviewed" date** on this block. Award rates change every
   1 July; undated content about pay silently goes stale.
3. Resolve FAQ 5's QLD gap, or confirm the page is NSW-only.

---

## 13. Closing CTA — `CallToAction.astro` 🟡 · **not in the brief**

⚠️ **The brief has no closing CTA row**, and three mid-page rows read `CTA -`
with nothing after them (after §8, §9 and §10).

Recommend the standard closing `CallToAction` (`variant="secondary"`), as on
all four sibling pages. Per 🚩5, use a commercial-appropriate label — **"Book
a site walkthrough"** — which is what branded FAQ 5 actually promises and a
stronger offer for this buyer than an instant number.

`CallToAction` also has a `kicker` prop if a "Commercial Cleaning" label helps
close the loop with §1's hero kicker.

---

## Missing sections the brief doesn't account for

Three blocks every sibling page has, or that this page's own IA demands, and
the brief never mentions:

| Missing | Component | Why it matters here |
|---|---|---|
| **Premises types** (🚩2) | `TagCloud` 🟢 | Fifteen child pages in the mega-menu, zero links from their parent. Conversion *and* SEO. |
| **What's included / scope** (🚩3) | `ServiceBlocks` (`icon-grid` or `list`), or `TextBlock` with a `{ list }` body 🟢 | The page promises a scope four times and never shows one. |
| **Where we clean** | `TagCloud` 🟢 | Every sibling page has a suburb block; this brief has none. A commercial page with no service area can't rank for "commercial cleaners [suburb]", which is how this is searched. ⚠️ The site already has **four different suburb lists** — pick one deliberately rather than adding a fifth. |

---

## Full page order

1. `SiteHeader`
2. `Hero` (`minimal`) — H1, overview, CTA ⚠️ *(add `kicker`; change CTA label)*
3. `TrustBar` ✅ — moved up per the boilerplate; all three points on-target here
4. 🔴 **Definition paragraph — BLOCKED, nothing supplied**
5. `PathwayCards` — 3 cards 🔴 *(card 2 is NDIS copy; no destinations)*
6. `TextBlock` (dark) — "Why two cleaning quotes for the same job can look nothing alike" ✅
7. 🟡 **`TagCloud` — premises types** *(not in brief; see 🚩2)*
8. 🟡 **`ServiceBlocks` — what's included** *(not in brief; see 🚩3)*
9. 🔴 Credibility signals — blocked
10. 🔴 Hero video — blocked
11. 🔴 The why — blocked
12. 🔴 `TestimonialCarousel` — blocked
13. `ComparisonTable` — reuse `comparison.ts` rows ✅
14. 🟡 **`TagCloud` — where we clean** *(not in brief)*
15. `Faq` #1 — branded, all 5 ✅
16. `Faq` #2 — non-branded, all 5, **pending verification**
17. `CallToAction` — added, not in brief
18. `SiteFooter`

**What could ship today if the blocked sections are omitted:** 2, 3, 6, 13,
15, 16, 17 — plus 5 once its cards are rewritten. That's a coherent page, and
a better one than the NDIS page could launch as, because its two long-form
blocks (§6 and the ten FAQs) carry real weight on their own.

But it would launch **without a definition paragraph, without social proof,
without a "why" section, without a scope, and without a single link to its
fifteen child pages**. The last of those is the one that makes it not a hub.

---

## Open items

**Must resolve before any launch:**
- 🚩1 Rewrite the three pathway cards. Card 2 must be replaced outright — how
  does TLB invoice commercial clients?
- 🚩4 Confirm what screening the team holds. Police check and Working With
  Children Check are different; the page's own FAQ tells readers to ask.
  Unresolved claims ship as visible brackets per house convention, but these
  are launch-blocking.
- 🚩5 Decide the CTA label. "Get an instant quote" contradicts branded FAQ 5.

**Must resolve before the page can do its job:**
- 🚩2 A premises-type block linking the fifteen mega-menu children — and
  confirmation of their guessed slugs.
- 🚩3 The scope of work. TLB's actual commercial task list.
- A "where we clean" block, using one of the site's four existing suburb
  lists.

**Content not supplied at all:**
- Definition paragraph (§2) — the page's answer-target block.
- Credibility signals, hero video, "the why" (§6–8).
- Testimonials (§9) — brief them for the *relationship*, not the clean.
- Comparison table framing (§10) — rows recommended from `comparison.ts`;
  `heading`, `cornerLabel` and `lead` still needed, plus the outstanding
  footnote for the two starred rows.
- Section headings for §3; three card CTA labels and destinations; three
  empty mid-page CTA rows.

**Verification:**
- §12's Award and WWCC claims — a read by someone who prices commercial
  contracts.
- Add a "last reviewed" date to §12; Award rates change each 1 July.
- Whether the page is NSW-only (meta description says so; QLD's Blue Card is
  unaddressed).

**Decisions:**
- Title tag: "Service" → "Services" to match the focus keyword, and remove the
  double space.
- Set `kicker="Commercial Cleaning"` on the hero, since the H1 carries no part
  of the focus keyword.
- Trust bar point 1: use "employed, not subcontracted" phrasing here?
- Add a "Scope agreed in writing" row to the comparison table?
- Fill the Entities row — the copy already uses the right ones.
- Fill the Related Keywords row; it's what should prioritise which of the
  fifteen child pages gets built first.

**Media needed:** hero photo (a real workplace, not the Maple placeholders),
3 card images, video, testimonial avatars.

**Cross-page consistency:** trust bar wording (now five variants), suburb
lists (four lists, none of them on this page), `footerContact.phone` still
`[TBC]` while branded FAQ 2 promises "one local number to call".
