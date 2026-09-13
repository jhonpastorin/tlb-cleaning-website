# Website update plan: aligning the site to Brand Foundation v2.0

Companion to [BRAND-FOUNDATION-V1-TO-V2-ANALYSIS.md](BRAND-FOUNDATION-V1-TO-V2-ANALYSIS.md).

**Scope:** 52 pages in `src/pages/`, 11 data files in `src/data/`, 23 section
components, and 9 copy briefs in `content-plans/`.

**Headline finding:** the site is built against two different brand documents at
once. The homepage was rewritten to a "v6" brief that already matches v2.0, and
two shared data files came with it. Everything else still runs v1.0 framing, and
because the homepage and `/why-tlb/` now contradict each other on a checkable
fact about nine real people, this is a live consistency problem, not just a tone
problem.

**Already v2.0-aligned, do not touch:**

| File | Why it already complies |
|---|---|
| [src/pages/index.astro](src/pages/index.astro) | v6 brief removed "nine full-time cleaners" and "local mums", leads with the Northern Rivers and the Tweed, carries the line in the hero and as a section heading |
| [src/data/trust.ts](src/data/trust.ts) | The five trust points match v2.0 §2.4's verified-facts table row for row |
| [src/data/locations.ts](src/data/locations.ts) | 56 towns in three groups, identical to v2.0 §2.1, with the Tweed correctly separated |

---

## Phase 0: decisions needed before any copy is written

Four of these block work. Do not start Phase 1 on the affected pages until they
are answered, because guessing produces a second round of rework.

### 0.1 BLOCKER: is "employed, not subcontracted" still claimable?

v2.0 §2.4 withdraws *full-time* but says nothing about the employment model. The
site argues employed-not-subcontracted on roughly a dozen pages, and on four of
them it is load-bearing:

- [aged-care-retirement-and-seniors.astro:233,331](src/pages/aged-care-retirement-and-seniors.astro#L233) carries the screening-evidence argument
- [schools-and-childcare-centres.astro:356](src/pages/schools-and-childcare-centres.astro#L356) carries the WWCC clearance argument
- [medical-clinic-and-salon-cleaning.astro:320](src/pages/medical-clinic-and-salon-cleaning.astro#L320) carries the no-third-party argument
- [strata-and-common-area-cleaning.astro:323](src/pages/strata-and-common-area-cleaning.astro#L323) carries the Cleaning Services Award argument

**Three possible answers, each with a different amount of rework:**

| Answer | Rework |
|---|---|
| Employed is accurate, only "full-time" was wrong | Drop the word "full-time" and the number "nine". Smallest change. |
| Mixed model | Rewrite to a process promise: who attends, how they are screened, who is accountable. Medium. |
| Not claimable at all | Four compliance pages lose their central argument and need rebuilding. Largest. |

### 0.2 BLOCKER: the insurance position (v2.0 §11.7)

v2.0 leaves this as `[CONFIRM with Teagan and state plainly]` and warns that "a
vague answer here loses the booking." It affects the FAQ on every page, and
"insured" already appears bracketed as `[insured]` in live copy on six appliance
pages.

### 0.3 BLOCKER: the re-clean policy (v2.0 §11.8)

Left as `[CONFIRM the actual policy before this is published. Do not imply a
guarantee that does not exist.]` Currently drafted with literal bracket
placeholders in [end-of-lease-cleaning.astro:366-386](src/pages/end-of-lease-cleaning.astro#L366)
and [real-estate-cleaning.astro:305](src/pages/real-estate-cleaning.astro#L305).
Those brackets will render to the public if the page ships as is.

### 0.4 BLOCKER: the five unverified trust-bar claims

`src/data/trust.ts` ships "98% of our clients stay with us" and "Over 100 local
homes, hosts and businesses" on every page. v2.0 §2.4 marks both as unconfirmed
and instructs: "Round down, never up." Also unconfirmed: whether the agency
relationships are formal preferred-supplier arrangements or ongoing contracts,
which changes the wording of the fourth trust point.

The fix is one file, which is why this is cheap to resolve and expensive to
leave.

### 0.5 Non-blocking: does "cheap" survive when it describes someone else's quote?

The site uses "cheap quote" and "the cheapest quote" as an argument device on
about twelve pages. v2.0 §3.2 bans the vocabulary; v2.0 §9.4 bans the argument
in prose. Read together the answer is almost certainly no, but confirm, because
it affects six section headings and several hundred words of body copy.

Note that "cheaper" in the deep-clean-first recommendation is explicitly endorsed
by v2.0 §4.6 and should stay.

### 0.6 Non-blocking: which v1.0 annexes are retained?

v2.0 drops v1.0's GEO detail (§3.6), link and SEO policy (§3.3), page-structure
conventions (§3.5) and the entire compliance section (§5.3), none of which is
replaced. The compliance one matters legally. Recommendation: extract those four
sections into `content-plans/brand-annexes-v1.md`, strip the competitor-
benchmarking language to comply with v2.0 §9.4, and reference it from v2.0.

---

## Phase 1: fix the factual contradictions

This is the phase that has to happen first. Everything here is a checkable claim
that is either inaccurate or contradicts another page.

### 1.1 `src/data/comparison.ts`, one file, five rows

This is the single highest-leverage file on the site. It is shared by the
homepage and `/why-tlb/`, and four of its five rows now breach v2.0.

| Line | Current | Breach |
|---|---|---|
| [25](src/data/comparison.ts#L25) | "Nine full-time cleaners employed by TLB, not subcontracted*" | §2.4 full-time ban; unresolved trailing `*` footnote |
| [30-31](src/data/comparison.ts#L30) | "Owned and run by local mums from the Northern Rivers" / "(Led by Teagan, staffed by mothers who live where they clean)" | §9.3 mums ban in positioning; §2.2 Teagan-not-fronted |
| [35](src/data/comparison.ts#L35) | "Grew to nine full-time cleaners without ever advertising" | §2.4 full-time ban |
| [41](src/data/comparison.ts#L41) | "(Nine local cleaners, photographed and named, not a stock photo)" | §2.4 headcount |
| [45](src/data/comparison.ts#L45) | "Ongoing contracts with the region's leading real estate agencies*" | §2.4 unconfirmed; unresolved `*` |

Rewrite against v2.0 §3.1 to §3.4 (local and embedded, price certainty, easy to
book, one provider) and §15.4's neutral-row test. Two rows in v2.0 §15.4 are
supplied almost ready to use.

Also resolve or remove the two trailing asterisks. A footnote marker with no
footnote is a defect regardless of brand.

### 1.2 `/why-tlb/`, the worst-affected page

[why-tlb.astro](src/pages/why-tlb.astro) opens with an H1 that v2.0 rules out
twice over, on the page whose own argument is that TLB is more honest than the
alternatives. Its file header already flags this as launch-blocking.

| Line | Fix |
|---|---|
| [64](src/pages/why-tlb.astro#L64) | Meta description: "Nine local mums, no anonymous contractors and no franchise fees" breaches §2.4, §9.3 and §9.4 in one sentence |
| [118](src/pages/why-tlb.astro#L118) | H1: "Nine local mums, and no anonymous contractors." Replace with a §3.1 statement |
| [119](src/pages/why-tlb.astro#L119) | Lead: "We grew to nine full-time staff..." |
| [123](src/pages/why-tlb.astro#L123) | Image label: "the nine local cleaners this page names" |
| [133](src/pages/why-tlb.astro#L133) | Definition paragraph: "employs nine full-time cleaners rather than subcontracting" |
| [233-260](src/pages/why-tlb.astro#L233) | Comparison section: re-derive from the rewritten `comparison.ts` |

Resolve the file header's blocker 2 at the same time: the "Am I locked into
anything?" FAQ is held back as `[TBC]`, and v2.0 §11.5 now supplies the answer
in full ("No minimum term, no exit fee. Skip a visit when you are away and your
spot stays yours").

### 1.3 The remaining "nine" and "full-time" claims

| File | Lines |
|---|---|
| [real-estate-cleaning.astro](src/pages/real-estate-cleaning.astro) | 127, 187, 291, 346, 500 (five instances, one of which also says "we can guarantee who turns up") |
| [airbnb-cleaning.astro](src/pages/airbnb-cleaning.astro) | 247, 331 |
| [guides/how-to-choose-a-commercial-cleaner.astro](src/pages/guides/how-to-choose-a-commercial-cleaner.astro) | 321 |
| [strata-and-common-area-cleaning.astro](src/pages/strata-and-common-area-cleaning.astro) | 323 |
| [office-cleaning.astro](src/pages/office-cleaning.astro) | 285 |

Replacement pattern per v2.0 §2.4: "Where a figure is not confirmed, use a
process promise instead rather than deleting the sentence." The capacity argument
survives without a headcount: what matters to a property manager is that a
vacancy does not wait for one person to be free.

Two false positives to leave alone: [guides/index.astro:74](src/pages/guides/index.astro#L74)
("Nine guides") and [locations/index.astro:227](src/pages/locations/index.astro#L227)
("Nine suburbs") are counts of pages and towns, not staff.

### 1.4 The "local mums" copy in published strings

Twelve instances across nine files (excluding source comments, which are handled
in Phase 5).

**The shared appliance-page boilerplate**, identical on six pages, is one
find-and-replace: "The same local team you have met, not a roster of strangers
from a call centre. We are local mums who clean where we live, [insured] and
[police-checked]..."

- [blinds-shutters-and-ceiling-fans.astro:162](src/pages/blinds-shutters-and-ceiling-fans.astro#L162)
- [carpet-and-rug-cleaning.astro:174](src/pages/carpet-and-rug-cleaning.astro#L174)
- [mattress-cleaning.astro:168](src/pages/mattress-cleaning.astro#L168)
- [oven-bbq-and-appliance-cleaning.astro:174](src/pages/oven-bbq-and-appliance-cleaning.astro#L174)
- [tile-and-grout-cleaning.astro:158](src/pages/tile-and-grout-cleaning.astro#L158)
- [upholstery-and-lounge-cleaning.astro:148](src/pages/upholstery-and-lounge-cleaning.astro#L148)

This block breaches three rules at once: the mums framing (§9.3), "a roster of
strangers from a call centre" as competitor prose (§9.4), and two unresolved
bracket placeholders that will render to the public. v2.0 §15.2 supplies the
replacement almost verbatim.

**Individual instances:**

- [ndis-cleaning.astro:338](src/pages/ndis-cleaning.astro#L338) "started by Teagan, a local mum... grew from one person to a team of nine". Triple breach.
- [house-cleaning.astro:215](src/pages/house-cleaning.astro#L215) "It's for Mum or Dad's place." **Leave this.** It refers to the reader's parent, not the workforce.
- [aged-care-retirement-and-seniors.astro:133,152](src/pages/aged-care-retirement-and-seniors.astro#L133) "your mum or dad". **Leave these**, same reason.

### 1.5 Extraction opportunity

The appliance-page boilerplate in 1.4 is six verbatim copies of one paragraph.
This codebase already sets a bar of "two real consumers means extract it"
(stated in `trust.ts`, `comparison.ts`, `locations.ts` and `navigation.ts`).
Extract it to `src/data/` while rewriting it, so the next brand revision is one
edit rather than six.

---

## Phase 2: apply the new positioning rules

### 2.1 Competitor framing out of prose, into tables (§9.4)

The largest tone change, and the one most likely to be argued about, because
several of these sections are genuinely persuasive. v2.0's position is that they
read as defensive and invite the reader to wonder who TLB is arguing with.

**Section headings that are competitor arguments:**

| File | Line | Heading |
|---|---|---|
| [airbnb-cleaning.astro](src/pages/airbnb-cleaning.astro) | 316 | "The cheapest turnover is priced per clean. It costs you per review." |
| [real-estate-cleaning.astro](src/pages/real-estate-cleaning.astro) | 331 | "The cheap vacancy clean is not cheap. It is a second inspection." |
| [office-cleaning.astro](src/pages/office-cleaning.astro) | 483 | "Why the cheapest office quote is the expensive one" |
| [carpet-and-rug-cleaning.astro](src/pages/carpet-and-rug-cleaning.astro) | 392 | "Why the cheapest carpet clean is rarely the cheapest" |
| [commercial-carpet-cleaning.astro](src/pages/commercial-carpet-cleaning.astro) | 493 | "Why the cheap carpet clean costs more" |
| [about.astro](src/pages/about.astro) | 163 | "Local, and not a franchise" |

**A defensible carve-out to put to the client.** Nine of these sections make a
*technical* argument (what a cheap method physically does to carpet, a roof, a
render) rather than a claim about a competitor's character. v2.0 §10.3 actively
endorses published specifics as the way TLB wins. Recommendation: keep the
technical explanation, drop the price adjective and the implied actor. "Why the
cheapest carpet clean is rarely the cheapest" becomes a heading about method, and
the price comparison moves to a table row.

**One exception to preserve.** [guides/how-much-does-end-of-lease-cleaning-cost.astro:199](src/pages/guides/how-much-does-end-of-lease-cleaning-cost.astro#L199)
already carries a source comment noting that its column is deliberately labelled
"a cheap quote", not "other cleaners". That is exactly the neutral-row discipline
v2.0 §9.4 asks for. It needs the adjective changed, not the structure.

**Other prose competitor references** appear in `why-tlb.astro` (9 instances),
`about.astro` (4), `commercial-cleaning.astro` (3), `ndis-cleaning.astro` (2) and
eight further pages with one each. Search terms: `franchise`, `call centre`,
`roster of strangers`, `anonymous contractor`, `national brand`, `national
platform`, `booking platform`.

Apply v2.0 §10.2's softening throughout: never imply a sole operator does worse
work.

### 2.2 "Easy to book, instant pricing, cost effective" (§1.3)

v2.0 requires this in the subheadline of **every service page** and as a section
heading. It currently appears on three pages only: `index.astro`,
`house-cleaning.astro` and `deep-cleaning.astro`.

**49 of 52 pages are missing it.**

Sequence it by traffic value rather than alphabetically: the six top-level
service pages first (`airbnb-cleaning`, `end-of-lease-cleaning`,
`commercial-cleaning`, `real-estate-cleaning`, `ndis-cleaning`,
`mould-cleaning-and-removal`), then the six appliance pages, then the thirteen
premises pages, then guides and locations.

Two caveats:

- The nine `guides/` pages and `locations/` are not service pages. Applying a
  sales subheadline to an editorial guide would undercut the §14 citability
  argument. Confirm the intended scope.
- On bond-clean and commercial pages the line promises instant pricing that
  §13.2 says TLB cannot deliver. See 2.3.

### 2.3 The instant-pricing split (§13.2)

"Instant price on regular cleaning, fast quote on everything else." The site does
not currently make this distinction. `Get an instant quote` is the primary CTA
sitewide, including on pages v2.0 names as unpriceable sight-unseen:

- [end-of-lease-cleaning.astro](src/pages/end-of-lease-cleaning.astro) (bond clean)
- [mould-cleaning-and-removal.astro](src/pages/mould-cleaning-and-removal.astro) (condition-driven)
- [high-pressure-cleaning.astro](src/pages/high-pressure-cleaning.astro), [window-cleaning.astro](src/pages/window-cleaning.astro)
- All thirteen commercial and premises pages, via [src/data/premises.ts](src/data/premises.ts)
- The six appliance pages, four instances each

The CTA itself lives in [src/data/navigation.ts](src/data/navigation.ts) as
`quoteCta`, which is good news: a second variant added there propagates
everywhere.

**Recommended shape:** keep `Get an instant quote` on regular home cleaning.
Introduce `Get a fast quote` for deep cleans, bond cleans, commercial and
condition-driven work. Copy on those pages should say what happens instead:
quoted on the actual property, within a stated window.

This is also the one place where a brand rule has an engineering consequence.
The Phase 1 quote calculator (§13.1, Connecteam via Jobs API or Zapier) only
covers the regular-clean path, so the two CTAs are not cosmetic variants. They
route to different systems.

### 2.4 Geography (§2.1)

`locations.ts` already matches v2.0 exactly, so the data layer is done. What
needs checking is prose: wherever a page names a handful of towns inline rather
than rendering the full list, v2.0 §2.1 requires the names to span the whole
footprint, "inland first where it reads naturally".

Also confirm the NSW-only carve-out in [locations.ts:135-145](src/data/locations.ts#L135),
used by `commercial-cleaning` and `ndis-cleaning`. That file's own comment flags
it as unverified.

### 2.5 CTA vocabulary (§9.3, §9.5)

- [work-with-us.astro:86](src/pages/work-with-us.astro#L86) uses `Talk to Teagan and the team`, which §9.3 replaces with "TLB" and "our team". Recruitment is one of the contexts where §2.2 allows the founder story, so this is arguable. Put it to the client rather than deciding unilaterally.
- Add `Meet the team` to the approved set (new in §9.5).
- Audit one primary CTA per page, repeated, across all 52 pages.

---

## Phase 3: add what v2.0 introduces that the site does not have

### 3.1 Objection handling (§11)

Eight objections with supplied answers. Six are publishable today; two are
blocked by 0.2 and 0.3. These should land in FAQ blocks, and several are simply
better than the answers currently drafted, particularly:

- §11.3 "My house is too messy" and the line "Nothing you say will surprise us", which addresses the shame barrier §5.3 identifies. Relevant to `/deep-cleaning/`, whose own source comments already note this gap.
- §11.5 "I don't want to be locked into anything", which resolves the held-back `/why-tlb/` FAQ noted in 1.2.

### 3.2 "Managed for you" (§1.4)

New supporting line, currently nowhere on the site. Set day, set team, a reminder
before, a message on the way, told first when something changes. It belongs in
the regular-clean and holiday-let pages, where it is the actual proposition.

### 3.3 The service-distinction table (§4.6)

A four-row table separating deep clean, regular clean and end of lease. v2.0
notes these "get confused constantly". The site has a `ComparisonTable` component
already, so this is a data addition rather than a build.

Also add the deep-clean-first recommendation to `/deep-cleaning/` and
`/house-cleaning/`. v2.0's instruction is unusually direct: "Say this. It builds
more trust than it costs in revenue." `deep-cleaning.astro:472,589` already make
this argument, so it is partly done.

### 3.4 The standalone-answer requirement (§14)

"Every service page should contain at least one section that would work as a
standalone answer to a question somebody would actually ask." Audit all 52 pages
against it. The nine `guides/` pages likely already pass; the thirteen premises
pages likely do not.

### 3.5 Proof assets (§12.1)

v2.0 calls before-and-after images "the single most persuasive asset available
and the most underused". The homepage currently ships four generated placeholders
stamped `SAMPLE` (see the import comment at
[index.astro:23-29](src/pages/index.astro#L23)), pending a real shoot.

Every testimonial on the site is a `[TBC. Ask Teagan...]` briefing note rather
than a quote. There are well over a hundred of them. v2.0 §12.1 names the two
types that carry the most weight, which should shape the collection brief:

1. A long-standing client who names how long they have been with TLB, because tenure is the proof this business needs.
2. A client who has been with several cleaners over the years, because the switcher story converts.

---

## Phase 4: mechanical style pass

### 4.1 Em dashes

258 instances in non-comment lines across 40 files. Both v1.0 and v2.0 ban them,
so this is pre-existing debt rather than new work, but it is the largest single
count of any rule breach on the site.

Worst offenders: `ndis-cleaning.astro` (27), `real-estate-cleaning.astro` (23),
`airbnb-cleaning.astro` (17), `Hero.astro` (13), `why-tlb.astro` (11),
`index.astro` (10), `house-cleaning.astro` (10), `breweries.astro` (10),
`ComparisonTable.astro` (10).

Not safely automatable. An em dash sometimes wants a comma, sometimes a full
stop, sometimes brackets, and §9.2 lists all three. Budget it as a manual pass,
but run it *last* in each file so it catches the text Phases 1 to 3 introduce.

### 4.2 Exclamation marks

Zero found in published copy. No work needed.

### 4.3 Banned adjectives (§5.6)

"Sparkling", "spotless", "transform your home" and "your time is precious" are
effectively absent. Two hits, both fine:

- [house-cleaning.astro:380](src/pages/house-cleaning.astro#L380) "It isn't a spotless house. It's not thinking about it." This is v2.0 §1.5 stated almost verbatim. Keep it.
- [guides/what-the-law-actually-says...astro:413,438](src/pages/guides/what-the-law-actually-says-end-of-lease-cleaning-in-nsw-and-qld.astro#L413) quotes "spotless" to explain that it is *not* the legal standard. Keep it.

### 4.4 Guarantees (§2.4, §12.2)

Handled correctly almost everywhere. The site explicitly disclaims a bond-back
guarantee in several places, which is exactly right. One line to fix:
[real-estate-cleaning.astro:500](src/pages/real-estate-cleaning.astro#L500) says
"which is why we can guarantee who turns up". Rephrase away from the word.

### 4.5 Unresolved bracket placeholders

Separate from the [TBC] testimonials, several pages carry literal square brackets
inside publishable sentences: `[insured]`, `[police-checked]`, `[TLB's screening
position]`, `[included / a separate line with a tip fee. Confirm]`, and the
re-clean window in `end-of-lease-cleaning.astro`. These render to the public.
Sweep for them before launch.

---

## Phase 5: documentation and source comments

### 5.1 Broken references to the deleted brand document

`TLB Cleaning - Brand Foundation.md` was deleted and split into OLD and NEW.
Seven files still reference it, two as markdown links that are now dead:

- [content-plans/end-of-lease-cleaning.md:4](content-plans/end-of-lease-cleaning.md#L4) (dead link)
- [content-plans/mould-cleaning-and-removal.md:4](content-plans/mould-cleaning-and-removal.md#L4) (dead link)
- [src/data/guides.ts:30](src/data/guides.ts#L30), [about.astro:9](src/pages/about.astro#L9), [end-of-lease-cleaning.astro:7](src/pages/end-of-lease-cleaning.astro#L7), [mould-cleaning-and-removal.astro:6](src/pages/mould-cleaning-and-removal.astro#L6), [real-estate-cleaning.astro:21](src/pages/real-estate-cleaning.astro#L21), [work-with-us.astro:11](src/pages/work-with-us.astro#L11)

Several cite section numbers (`§1.1`, `§1.2`, `§1.3`, `§1.5.6`) that no longer
resolve, because v2.0 renumbered everything. `work-with-us.astro:11` cites
§1.5.6, which was "Happy team, better cleans"; the nearest v2.0 equivalent is
§2.3's "Run properly", but it is not the same claim.

**Recommendation:** rename the two working files to make the version explicit,
then update all seven references with corrected section numbers.

### 5.2 `content-plans/` still teaches v1.0

All nine briefs are the source documents future copy is written from, so leaving
them stale reintroduces v1.0 framing every time someone writes a new page.

| File | v1.0-framing hits |
|---|---|
| [why-tlb.md](content-plans/why-tlb.md) | 20 |
| [ndis-cleaning.md](content-plans/ndis-cleaning.md) | 10 |
| [cleaning-services-homepage.md](content-plans/cleaning-services-homepage.md) | 10 |
| [commercial-cleaning.md](content-plans/commercial-cleaning.md) | 6 |
| [home-cleaning.md](content-plans/home-cleaning.md) | 5 |
| [deep-cleaning.md](content-plans/deep-cleaning.md) | 1 |

`cleaning-services-homepage.md` is a special case: it is the superseded v5 plan,
and `index.astro`'s own header already says "Treat this file, not the v5 plan, as
current". Mark it superseded rather than editing it.

`brand-style-input.md` covers colour and typography only and is unaffected.

### 5.3 Source comments that cite v1.0 reasoning

The codebase is unusually well commented, with roughly 30 comment blocks
explaining why a piece of copy says what it says. Many now justify decisions
v2.0 reverses.

- [src/assets/commercial_cleaning/premises/IMAGE-PROMPTS.md:52](src/assets/commercial_cleaning/premises/IMAGE-PROMPTS.md#L52) says "TLB's brand story is a team of local mothers (Brand Foundation §1.1, §1.3)" and drives image generation from it. This will keep producing off-brief photography until it is corrected.
- [why-tlb.astro:1-23](src/pages/why-tlb.astro#L1) documents four launch blockers, two of which v2.0 now resolves.
- [about.astro:25-31](src/pages/about.astro#L25), [house-cleaning.astro:98-99,372,553](src/pages/house-cleaning.astro#L98) and [index.astro:8](src/pages/index.astro#L8) all narrate the mums-framing decision.

These are documentation, not published copy, so they are last. But do not skip
them: they are what the next person reads before writing.

### 5.4 The typo in v2.0 itself

Line 3 of `TLB Cleaning - Brand Foundation NEW.md` reads "TLB Cleanining".
Fix before circulation.

---

## Suggested sequence

| Step | Work | Gate |
|---|---|---|
| 1 | Client answers 0.1 to 0.4 | Blocks everything below |
| 2 | `comparison.ts` and `trust.ts` rewrite | Two files, propagates to every page |
| 3 | `/why-tlb/` rebuild | The worst-affected page, and it contradicts the homepage today |
| 4 | Remaining "nine"/"full-time" claims (5 pages) | Accuracy |
| 5 | "Local mums" copy, extracted to shared data (9 pages) | Accuracy and reuse |
| 6 | Competitor prose out of body copy (about 18 pages) | Largest tone change; needs 0.5 answered |
| 7 | Instant-pricing CTA split | Has an engineering dependency |
| 8 | The line rolled out to service pages | Do after 7, so bond and commercial pages get the right variant |
| 9 | New v2.0 material: objections, "managed for you", service table, §14 audit | Additive |
| 10 | Em dash and bracket-placeholder pass, per file, last | Catches text added in 2 to 9 |
| 11 | `content-plans/`, source comments, `IMAGE-PROMPTS.md`, v2.0 typo | Prevents regression |

**Two things worth doing before step 2, because they are cheap and they prevent
rework:**

- Write the twenty rules from the analysis document's §10 into `CLAUDE.md` or a
  short `BRAND-RULES.md`, so every future edit is checked against them.
- Add a grep-based lint script to `scripts/` for the mechanically checkable
  rules: em dashes, exclamation marks, banned price words, mums or mothers,
  nine or full-time, and unresolved square-bracket placeholders. Roughly seven
  patterns, and it turns this from a one-off audit into a standing check.
