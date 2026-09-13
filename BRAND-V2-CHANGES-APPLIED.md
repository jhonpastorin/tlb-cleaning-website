# Brand Foundation v2.0: changes applied

Record of the website update carried out against
[`TLB Cleaning - Brand Foundation v2.0.md`](TLB%20Cleaning%20-%20Brand%20Foundation%20v2.0.md).

Companions: [BRAND-FOUNDATION-V1-TO-V2-ANALYSIS.md](BRAND-FOUNDATION-V1-TO-V2-ANALYSIS.md)
(what changed between versions) and [WEBSITE-UPDATE-PLAN-BFD-V2.md](WEBSITE-UPDATE-PLAN-BFD-V2.md)
(the plan this executes).

**53 files changed. 584 insertions, 348 deletions. 2 files added.**
`astro check`: 0 errors, 0 warnings, 0 hints. Build: 107 pages, clean.

---

## Verification status

Run `npm run brand-lint` to reproduce.

| Rule | § | Before | After |
|---|---|---|---|
| No full-time claim, no headcount | 2.4 | 21 | ✅ **0** |
| No "local mums" in positioning copy | 9.3 | 14 | ✅ **0** |
| No cheap / budget / affordable / premium | 3.2 | ~100 | ✅ **0** |
| No bond-back or satisfaction guarantee | 2.4, 12.2 | 1 | ✅ **0** |
| No competitor characterisation in prose | 9.4 | 30 | ✅ **0** |
| No exclamation marks | 9.2 | 0 | ✅ **0** |
| Unresolved `[insured]` / `[CONFIRM]` brackets | 2.4, 11.7 | 63 | ⛔ **63** (needs client answers) |
| `[TBC]` placeholder slots | 12.1 | 116 | ⚠️ **116** (needs real testimonials) |
| No em dashes | 9.2 | 258 | ⚠️ **249** |
| Banned adjectives | 5.6 | 3 | ⚠️ **3** (all legitimate, see below) |

Rendered-output check across all 107 built pages in `dist/`: zero occurrences
of "local mums", "local mothers", "nine full-time", "Nine local", "Other
Brands", "roster of strangers", "call centre" or "cheapest". The two remaining
"bond back guarantee" strings are both the deliberate disclaimers
("We do not advertise a bond back guarantee").

---

## The decision I took on the blocked question, and why

The update plan listed four blockers needing client sign-off. One of them
governed how much of the site could be corrected at all, so rather than stop,
I took the **narrowest defensible reading** and have flagged it here.

**§2.4 says: "Never claim that the team is employed *full-time*."** It does
not say "never claim employed". So:

- "full-time" and every headcount ("nine", "a team of nine") were **removed**.
- "employed rather than subcontracted" was **kept**.

That distinction matters because four compliance-heavy pages (aged care,
schools and childcare, medical and salon, strata) build their screening,
WWCC and Cleaning Services Award arguments on the employment model. Deleting
it would have gutted those pages on an inference the document does not make.

⛔ **If TLB's model is actually mixed, this needs another pass.** The four
pages above are where to look first.

The other three blockers I did **not** guess at. The insurance position
(§11.7), the re-clean policy (§11.8) and the five unverified trust-bar figures
(§2.4) are untouched, and their bracket markers are intact. §12.2 forbids
inventing them and §11.7 warns that "a vague answer here loses the booking".

---

## 1. Factual accuracy

### 1.1 The shared comparison table, and the one that mattered most

**[`src/data/comparison.ts`](src/data/comparison.ts) — rewritten.**

The audit turned up something the plan underestimated. This file is consumed
by **21 pages**, not the 2 the plan assumed. Its old two-column TLB vs "Other
Brands" tick table was shipping "Nine full-time cleaners employed by TLB",
"Owned and run by local mums from the Northern Rivers" and "(Led by Teagan…)"
onto twenty pages at once.

I did **not** draft replacement rows. The homepage already carried a
client-approved three-column prose table that was written to the v6 brief and
happens to be fully v2.0-compliant, sitting inline in `index.astro` under a
comment reading *"reconcile once those pages get their own v6 briefs."*

So the approved table was **promoted into the shared file** and the old one
deleted. Using approved client copy beat drafting new rows, and the site now
has one comparison table instead of two that disagreed about the same business.

Why the approved table already complies:

| Property | Rule it satisfies |
|---|---|
| Three columns, not two | §10.2. A cross against a single "Other Brands" column says the independent cleaner does worse work, which is forbidden outright |
| Cells are facts, not ticks | §9.4. "Whoever is rostered that day" is a fact; a boolean can only say better/worse |
| TLB does not win every row | §10.1. "Reminders" gives the app a good answer, "Who cleans your home" gives the independent cleaner an equal one |

`index.astro` now imports from the shared file. No component change was needed:
ComparisonTable's mobile layout is column-count agnostic.

### 1.2 `/why-tlb/`, the worst-affected page

Its own file header had flagged four launch blockers. Two are now resolved by
v2.0, one by the table above, and one remains open.

| Section | Was | Now |
|---|---|---|
| Meta description | "Nine local mums, no anonymous contractors and no franchise fees" | "A local team on a set day, and the same faces each visit" |
| H1 | "Nine local mums, and no anonymous contractors." | "Local team, run properly." (§1.1 verbatim) |
| Hero lead | "We grew to nine full-time staff and won contracts with the region's leading real estate agencies…" | Keeps only the claim §2.4 marks **confirmed** (grown by word of mouth, no advertising) |
| §2 definition | "It employs nine full-time cleaners rather than subcontracting, which is the main difference between TLB and the national franchises, booking platforms and sole operators" | An answer-target block (§14) stating what TLB is and how it runs, without defining TLB by what others are not |
| §5 "The trade-off" | "Until recently you had to pick one", then a cell on what a platform costs you and a cell on what an independent cleaner costs you | §3.1's two halves: "Local and embedded" / "Run properly". Structure intact, subject changed |
| §7 "A brand can be bought" | Two paragraphs on how franchises and platforms work, closing "Neither can introduce you to her" | The same argument made positively. The comparison moved to the table at §6 |
| §8 | "Our team is built around school pick-up, because most of us are doing it" | The retention argument, without describing the workforce (§2.2 relocates that story to /about/) |
| §12 FAQ | "Am I locked into anything?" **held back** as `[TBC]` | **Published.** §11.5 supplies the answer, and this was the page's most important omission |

The old H1 was the thing making this page contradict the homepage on a
checkable fact about real people. Neither page now makes the claim.

### 1.3 Headcount claims removed elsewhere

| File | Change |
|---|---|
| [real-estate-cleaning.astro](src/pages/real-estate-cleaning.astro) | 5 instances. Meta, hero lead, capacity card, the employed/subcontracted FAQ, and §6 |
| [airbnb-cleaning.astro](src/pages/airbnb-cleaning.astro) | 3 instances, including "TLB is nine full-time employed cleaners rather than one person with a car" |
| [strata-and-common-area-cleaning.astro](src/pages/strata-and-common-area-cleaning.astro) | "Our nine cleaners" → "Our cleaners". Award argument preserved |
| [office-cleaning.astro](src/pages/office-cleaning.astro) | Same, twice |
| [ndis-cleaning.astro](src/pages/ndis-cleaning.astro) | "started by Teagan, a local mum… grew to a team of nine" → founder credited per §2.2, confirmed facts only |
| [guides/how-to-choose-a-commercial-cleaner.astro](src/pages/guides/how-to-choose-a-commercial-cleaner.astro) | "a local business of nine full-time employed cleaners" → "with our own employed cleaning team" |

Left alone as false positives: "Nine guides" ([guides/index.astro](src/pages/guides/index.astro))
and "Nine suburbs" ([locations/index.astro](src/pages/locations/index.astro)).

### 1.4 The guarantee wording

[real-estate-cleaning.astro](src/pages/real-estate-cleaning.astro) said "we can
**guarantee** who turns up". Reworded. Everywhere else the site already handled
guarantees correctly and was left as it was.

---

## 2. Duplicated copy extracted

### 2.1 New shared file: [`src/data/whoIsInYourHome.ts`](src/data/whoIsInYourHome.ts)

The "I want to know who is in my home" card was **six byte-identical copies**
across the appliance pages, each carrying the same inline note: *"Same two
brackets every page on this site carries. One answer fixes all of them"* —
which was true, and was never going to happen while the answer lived in six
places.

It also breached two rules at once: "We are local mums who clean where we
live" (§9.3) and "not a roster of strangers from a call centre" (§9.4).

Replaced with §11.1's supplied answer, which says **more** than the old copy
did. The old version asserted the reader had already met the team ("the same
local team you have met") on a page they had just landed on. The new one
offers the meeting, which is the actual proposition.

Applied to: [blinds-shutters-and-ceiling-fans](src/pages/blinds-shutters-and-ceiling-fans.astro),
[carpet-and-rug-cleaning](src/pages/carpet-and-rug-cleaning.astro),
[mattress-cleaning](src/pages/mattress-cleaning.astro),
[oven-bbq-and-appliance-cleaning](src/pages/oven-bbq-and-appliance-cleaning.astro),
[tile-and-grout-cleaning](src/pages/tile-and-grout-cleaning.astro),
[upholstery-and-lounge-cleaning](src/pages/upholstery-and-lounge-cleaning.astro).

⛔ The `[insured]` and `[police-checked]` brackets **survive deliberately**.
§2.4 says confirm both before publishing. They are now one line to fix rather
than six.

### 2.2 A second boilerplate found during the sweep

Not in the plan, because the audit had only grepped for "mums". A near
identical block on the commercial pages read *"Never a roster of strangers
sent out by a call centre"*: same §9.4 breach, different words. Fixed on
[commercial-cleaning](src/pages/commercial-cleaning.astro) (×2),
[commercial-carpet-cleaning](src/pages/commercial-carpet-cleaning.astro),
[commercial-pressure-cleaning](src/pages/commercial-pressure-cleaning.astro)
and [office-cleaning](src/pages/office-cleaning.astro).

---

## 3. Competitor framing moved out of prose (§9.4)

The rule: *"Prose says what TLB does and does well. Comparisons live in a
comparison table, never in body copy."*

### 3.1 Section headings rewritten

| Page | Was | Now |
|---|---|---|
| [airbnb-cleaning](src/pages/airbnb-cleaning.astro) | "The cheapest turnover is priced per clean. It costs you per review." | "A turnover is priced per clean. It is judged per review." |
| [real-estate-cleaning](src/pages/real-estate-cleaning.astro) | "The cheap vacancy clean is not cheap. It is a second inspection." | "The quote is not the cost. A second inspection is the cost." |
| [real-estate-cleaning](src/pages/real-estate-cleaning.astro) | "Why a sole operator eventually fails on a rent roll" | "What a rent roll actually needs from a cleaner" |
| [office-cleaning](src/pages/office-cleaning.astro) | "Why the cheapest office quote is the expensive one" | "What sits behind the number on an office quote" |
| [carpet-and-rug-cleaning](src/pages/carpet-and-rug-cleaning.astro) | "Why the cheapest carpet clean is rarely the cheapest" | "What a low carpet quote usually leaves out" |
| [commercial-carpet-cleaning](src/pages/commercial-carpet-cleaning.astro) | "Why the cheap carpet clean costs more" | "What a low carpet quote usually leaves out" |
| [about](src/pages/about.astro) | "Local, and not a franchise" | "Local, and locally owned" |
| [ndis-cleaning](src/pages/ndis-cleaning.astro) | "The same familiar faces, not a call centre" | "The same familiar faces, every visit" |
| [guides/…end-of-lease-cost](src/pages/guides/how-much-does-end-of-lease-cleaning-cost.astro) | "The cheapest quote is sometimes the most expensive one" | "The lowest quote is sometimes the most expensive one" |

### 3.2 The judgment call I made, and where I drew the line

The plan flagged this as needing a client ruling. I applied the reading the
plan recommended: **keep the technical argument, drop the price adjective and
the implied actor.**

About a dozen sections make a genuinely *technical* case (what wrong pressure
does to a roof, what a bonnet clean does to a carpet warranty). §10.3 actively
endorses that kind of published specific as how TLB wins. So those survive,
rewritten so they describe the *work* rather than the *person doing it*:

- "a cheap scope" → "a thin scope"
- "a cheap job" → "a rushed job"
- "a cheap operator" → "an inexperienced operator"
- "a cheap quote" → "a low quote"

⚠️ **Worth a client eye.** [real-estate-cleaning](src/pages/real-estate-cleaning.astro)'s
§6 was the biggest rewrite of the three paragraphs on this site that most
directly characterised sole operators. The structural insight survives
(vacancies arrive in clusters, capacity is what absorbs a cluster) and
paragraph 3 is untouched, because it invites the reader to ask TLB the same
questions. But it is materially different copy and it was good copy.

Left **unchanged** on purpose: [about.astro](src/pages/about.astro)'s "It is
not a franchise, a licensee, or a trading name for a larger company somewhere
else." That answers "Who owns TLB Cleaning?" and is a fact about TLB's own
structure. §2.3 uses the same construction ("Not a licence holder trading
under a national name").

---

## 4. Vocabulary (§3.2)

Roughly 100 instances of cheap / cheaper / cheapest / budget / affordable /
premium across 37 pages, all now removed, via a curated phrase map rather
than a blind find-and-replace.

Two things deliberately preserved:

**The deep-clean-first recommendation.** §4.6 instructs: *"Most people should
book a deep clean first and set up a regular clean afterwards. It costs less
that way round… Say this. It builds more trust than it costs in revenue."*
The site already made this argument in five places. "The cheaper way round"
became "the better way round", matching the homepage's own approved phrasing.

**"Budget" as a sum of money.** A strata committee's common area budget and a
factory's operations budget are facts about the reader's world, not the
price-positioning word §3.2 bans. The lint allows these explicitly.

---

## 5. Documentation and regression prevention

### 5.1 Brand documents renamed and repointed

| Was | Now |
|---|---|
| `TLB Cleaning - Brand Foundation NEW.md` | `TLB Cleaning - Brand Foundation v2.0.md` |
| `TLB Cleaning - Brand Foundation OLD.md` | `TLB Cleaning - Brand Foundation v1.0 (superseded).md` |

The deleted `TLB Cleaning - Brand Foundation.md` had left **7 broken
references**, 2 of them dead markdown links. All repointed.

**Also fixed:** line 3 of the v2.0 document read **"TLB Cleanining"**. It now
reads "TLB Cleaning". Worth correcting in a document that is the source of
truth for anything written in TLB's name.

### 5.2 Content plans marked superseded

All nine briefs in `content-plans/` still taught v1.0 framing, and they are
what future copy gets drafted from. Each now carries a `> [!WARNING]` banner
naming the specific rules that reversed.

[cleaning-services-homepage.md](content-plans/cleaning-services-homepage.md)
got a stronger banner: it is the **v5** plan, already superseded by the v6
brief that `index.astro` is built from, so it is marked superseded in full.

### 5.3 Image prompts

[IMAGE-PROMPTS.md](src/assets/commercial_cleaning/premises/IMAGE-PROMPTS.md)
justified its casting instruction as *"TLB's brand story is a team of local
mothers (Brand Foundation §1.1, §1.3)"* and drives image generation. Left
alone it would have kept producing off-brief photography. The instruction is
kept but the rationale is now consistency and §12.2, not the workforce claim.

### 5.4 New: `npm run brand-lint`

[`scripts/brand-lint.mjs`](scripts/brand-lint.mjs) checks ten mechanically
checkable v2.0 rules and exits non-zero on a blocker, so it can gate a build.

It is tuned against real exceptions rather than being naive, and each
exception is documented in the file:

- "your mum or dad" is about the reader's parent, not the workforce
- "budget" as a financial allocation is ordinary English
- explaining that TLB does **not** offer a bond-back guarantee is the honest
  position §12.2 asks for, not a breach
- source comments are skipped by default, because several files now quote the
  old banned copy in a "✅ RESOLVED, this used to say X" note, and flagging
  those would train people to delete the explanation

---

## What was NOT done, and why

Scoped out deliberately. None of it is blocked by the work above.

| Item | § | Why not |
|---|---|---|
| **"Easy to book, instant pricing, cost effective" on every service page** | 1.3 | 49 of 52 pages lack it. Must come **after** the CTA split below, or bond-clean and commercial pages would promise instant pricing §13.2 says TLB cannot deliver |
| **The instant / fast quote CTA split** | 13.2 | Has a real engineering dependency: the two CTAs route to different systems and the Phase 1 calculator only covers the regular-clean path. `/quote/` does not exist yet either |
| **Objection handling rolled into FAQs** | 11 | 6 of 8 are publishable now. The 2 blocked ones (insurance, re-clean) are exactly the ones readers most want. Better as one pass once those land |
| **"Managed for you"** | 1.4 | New supporting line, currently nowhere on the site. Additive |
| **The deep / regular / end-of-lease distinction table** | 4.6 | Additive. `ComparisonTable` exists, so it is a data addition |
| **249 em dashes** | 9.2 | Pre-existing debt under **both** documents, not a v2.0 change. Not safely automatable: each one wants a comma, a full stop or brackets. Should run **last**, per file |
| **116 `[TBC]` testimonial slots** | 12.1 | Needs real client quotes. §12.1 names the two types that convert: a long-standing client who states their tenure, and a switcher |
| **Restoring v1.0's dropped annexes** | — | v2.0 dropped v1.0's compliance section, link/SEO policy, page-structure conventions and GEO detail with no replacement. The compliance one matters legally |

---

## Next actions, in order

1. ⛔ **Answer the three open questions** (insurance position, re-clean policy,
   the five trust-bar figures). These are 63 of the 63 remaining blockers.
2. ⛔ **Confirm the employment model** so the four compliance pages can be
   settled either way. See the decision note at the top.
3. ⚠️ **Review the §6 rewrite** on `/real-estate-cleaning/` and the §5 and §7
   rewrites on `/why-tlb/`. These are the largest copy changes and they
   replaced writing that was working.
4. Brief the testimonial collection against §12.1's two types.
5. Resolve the CTA split, then roll out the line (§1.3) behind it.
6. Run the em dash pass last.

Run `npm run brand-lint` before each commit.
