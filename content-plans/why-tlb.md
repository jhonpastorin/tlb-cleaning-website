# Content plan: "Why TLB" page

Source: TLB Cleaning **Why TLB** content brief (focus keyword
`best house cleaning services near me`). Maps every block to a component from
[`SECTIONS.md`](../SECTIONS.md), states positioning, and flags anywhere the
spec has no clean 1:1 match or the copy is blocked/unconfirmed.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap. Content status:
**drafted** (ships as-is), **pending confirmation** (bracketed in the
source), **blocked** (no usable copy).

Slug: `/why-tlb/` — already in the header nav
([`navigation.ts:230`](../src/data/navigation.ts#L230)), flagged there as a
guessed slug. Adopting it makes it real; no conflict either way.

## ✅ Built — [`src/pages/why-tlb.astro`](../src/pages/why-tlb.astro)

Live at `/why-tlb/`, matching the header nav's existing slug. Verified in a
real browser at 1440px and 390px: no console errors, no horizontal overflow,
one `<h1>`, both anchors (`#compare`, `#switching`) resolve, and the
five-column comparison table fits at exactly 1148px with nothing clipped.

**Both component extensions were built** — `kicker?: string` on
`Hero.astro` and on `CallToAction.astro`. Purely additive (25 and 22
insertions, nothing removed); both default to rendering nothing, so the
other three pages are untouched. `Callout.astro` was **not** built, per this
plan's own recommendation — see §9c.

**Four things still block launch**, all content decisions rather than build
work: 🚩1 (the "nine local mums" contradiction), 🚩2 ("Am I locked into
anything?"), 🚩3 (FAQ substantiation), and §6's card-1-vs-table mismatch.

---

## 🚩 Read this before drafting anything else

### 1. The H1 contradicts the homepage on a factual claim

The H1 and the meta description both say **"Nine local mums."** The homepage
says:

> There are nine full-time cleaners on the team now, **most of them mums as
> well** — [`index.astro:150`](../src/pages/index.astro#L150)

"Most of them" and "nine local mums" cannot both be true. One of them is
wrong, and this is not a tone question — it's a claim about who nine real
people are, sitting in an `<h1>` and a meta description on a page whose
entire argument is *we are more honest than the alternatives*. A visitor who
meets a team member who isn't a mum has caught the page out on its own
premise.

It's also the page's **third** phrasing of the same headcount:

| Where | Wording |
|---|---|
| This H1 | "Nine local mums" |
| This page's trust bar | "9 full-time local team members" |
| Homepage trust bar | "9 full-time local cleaners, employed not subcontracted" |
| Homepage comparison table | "Owned and run by local mums from the Northern Rivers" |

Settle the true statement once, then use it everywhere. If the team is
genuinely nine mothers, the H1 is the strongest copy on this page and the
homepage line should change. If it isn't, the H1 has to.

### 2. "Am I locked into anything?" is blocked, and the brief says why

> `[TBC — confirm commercial terms before publishing. This is the single
> most important question on this page and it cannot be answered with a
> guess.]`

The brief is right, and it's worth restating: this page spends its whole
length telling people how to leave a contract they're unhappy with. Leaving
its own contract question unanswered — on the page that teaches contract
literacy — is the one gap a sceptical reader will notice.

**Do not publish the page with this FAQ omitted either.** Silence reads as
an answer here. Get the terms confirmed, or the page waits.

### 3. The non-branded FAQs make specific legal and competitor claims

Unlike every other page in this set, these four answers assert **checkable
facts about third parties and about law**:

- "14 or 30 days written notice is common in domestic cleaning terms"
- "a window of 24 to 48 hours, though some ask for 72 hours or five working days"
- "fees run from 25 per cent of the price up to the full amount"
- "in **one published case** for twelve months after your last booking, with a finder's fee"
- Australian Consumer Law: "services must be provided with due care and skill
  and be fit for the purpose"

The ACL characterisation is sound as a general statement. The rest are
industry survey claims, and the "one published case" cites a specific
competitor's published terms **without naming or linking the source**.

None of it is bracketed `[TBC]`, so it reads as ready to ship. It isn't,
quite. This needs a substantiation pass — sources recorded for the numeric
ranges, and a decision on whether to cite the non-solicitation example or
soften it to "some businesses". Publishing unsourced numbers about
competitors' contracts on a page arguing you're the honest option is the
wrong risk to take.

### 4. Founder spelling

The switching guide says **"Tegan"**. Settled spelling is **Teagan** (see
[`home-cleaning.md`](./home-cleaning.md) §0). Fix on transcription.

### 5. Two smaller things

- **The overview runs 48 words** against the template's own 15–25 target,
  and `Hero`'s `lead` is sized for one punchy line. See §1 for the split.
- **Branded FAQ 4 claims "five Northern Rivers council areas"** — a specific
  number that appears nowhere else on the site, and the three suburb lists
  already in the codebase disagree with each other. Name the five.

---

## 0. Page metadata

| Field | Value | Notes |
|---|---|---|
| Title tag | `Best House Cleaning Services Near You \| TLB Cleaning` | Drafted. |
| Meta description | "Nine local mums, no anonymous contractors and no franchise fees. See how TLB compares, and why changing cleaners is easier than you think." | 139 chars. ⚠️ Carries the "nine local mums" claim — see 🚩1. |
| URL | `/why-tlb/` | Matches the header nav's existing guess. |
| Focus keyword | `best house cleaning services near me` | ⚠️ See the note below. |
| Google Classification Type | — | **Blank.** Tool named, no output pasted. |
| Related keywords | — | **Blank.** |
| Query fan-outs | — | **Blank.** |
| Entities | — | **Blank.** The copy already surfaces good ones (Northern Rivers, Southern Gold Coast, Australian Consumer Law) — content, not a substitute for the research row. |

⚠️ **Keyword/intent mismatch worth a conversation.** The focus keyword is
`best house cleaning services near me` — a comparison-shopping query from
someone who does *not* yet have a cleaner. But over half this page (§9's
switching guide, and all four non-branded FAQs) addresses someone who
*already has one* and feels awkward leaving. The brief says so itself:
*"Most people reading this do."*

Both audiences are real and the page serves both well. But the H1, meta
description and title all pitch the comparison story, while the page's most
distinctive content — the switching guide — is invisible to that query. Two
options: keep this as the comparison page and give the switching guide its
own URL, or retarget this page toward switching intent. **Recommend keeping
one page and letting §3's cards do the routing**, since the switching guide
is what makes it worth reading — but go in knowing the keyword only covers
half of it.

---

## 1. Hero — `Hero.astro` 🟡 · drafted

> **WHY TLB**
> Nine local mums, and no anonymous contractors.
>
> We grew to nine full-time staff and won contracts with the region's leading real estate agencies without ever running an advertisement. Every client came from somebody recommending us to somebody else. This page is the honest version of why.

🟡 **Two stretches here, both fixable.**

**(a) There is no kicker prop.** "WHY TLB" sits above the headline as an
eyebrow label. `Hero.astro` has `headingLines` (all rendered *inside* one
`<h1>`) and `logo` (an image badge) — nothing for a short text label above
the heading. Folding "WHY TLB" into `headingLines` makes the `<h1>` read
"WHY TLB Nine local mums, and no anonymous contractors", which is wrong
semantically and visually.

**Recommended: add `kicker?: string` to `Hero.astro`** — a short label above
the `<h1>`, outside it. The library already has this idea:
`PhotoGallery.astro`'s `story` steps take a `step` kicker
([`PhotoGallery.astro:29`](../src/components/sections/PhotoGallery.astro#L29)),
it just isn't available where this page needs it. **§14's closing CTA needs
the identical thing** ("MEET THE TEAM" above its heading), so that's two real
consumers on one page — the same bar `ServiceIcon.astro` and
`StarRating.astro` were held to. Add it to `Hero.astro` and
`CallToAction.astro` as a prop on each; it's a string and a text style, not
a shared component.

**(b) The overview is 48 words** — roughly triple what `lead` is sized for,
and three sentences doing one sentence's job. Split it:

- `lead` (hero): **"We grew to nine full-time staff and won contracts with the region's leading real estate agencies without ever running an advertisement."**
- The remaining two sentences — *"Every client came from somebody recommending us to somebody else. This page is the honest version of why."* — move into §2's `TextBlock`, above the definition paragraph. They're a thesis statement, not a subheadline, and "this page is the honest version of why" works far better as the last line before the page starts arguing.

Nothing is cut; it's redistributed. Flagged because it's a copy change.

- `cta`: "Get an instant quote" — the brief places it after §2, but `Hero`'s
  `cta` is a **required** prop. Same ruling as the other three pages: hero
  takes it, §2's stays unset.
- `variant`: **`minimal`**. No hero photo supplied. ⚠️ Note this page argues
  *"the part none of the others can show you — names and faces"*; a hero
  with no faces on it is a missed opportunity. A real team photo here would
  do more work than on any other page. `split-single-image` once one exists.

---

## 2. Thesis + definition — `TextBlock.astro` 🟢 · drafted

`theme="light"`, `align="left"`, three `body` entries:

1. "Every client came from somebody recommending us to somebody else."
2. "This page is the honest version of why."
3. "TLB Cleaning is a locally owned cleaning company serving the Northern Rivers and Southern Gold Coast. It employs nine full-time cleaners rather than subcontracting, which is the main difference between TLB and the national franchises, booking platforms and sole operators working the same area."

Entries 1–2 are the hero overflow from §1. Entry 3 is the answer-target
block — it names all four competitor categories in one sentence, which is
what the rest of the page then unpacks. Keep it as the first prose.

`cta` unset (see §1).

---

## 3. Routing cards — `PathwayCards.astro` 🟢 · drafted

Unusual and good: unlike the other pages' cards, **all three route within
this page rather than away from it.** This page is long, and these are its
table of contents.

| # | Title | Description | Target |
|---|---|---|---|
| 1 | How do you compare? | "A franchise, an online platform, a solo cleaner or a local team. They are genuinely different things and each is right for someone." | `#compare` (§6) |
| 2 | I already have a cleaner | "Most people reading this do. Here is how to change without it being awkward, and the one time of year not to." | `#switching` (§9) |
| 3 | Who would actually come? | "The part none of the others can show you. Names and faces, before anyone knocks on your door." | `/about/` — the team page |

Anchor targets need an `id` on a wrapper `<div>`; `ComparisonTable` and
`ContentGrid` take no `id` prop, and adding one purely for an anchor isn't
worth a shared-component change (same call made on the deep-cleaning page).

⚠️ Card 1's description — *"each is right for someone"* — is the most
disarming line in the brief and sets up §6's table honestly. Make sure the
table actually delivers on it (see §6).

Open: section `heading`/`headingAccent` (not in brief), three CTA labels
(not in brief), three card images (not supplied).

---

## 4. Trust bar — `TrustBar.astro` 🟢 · drafted

"9 full-time local team members · Every client came from a recommendation ·
Trusted by leading Northern Rivers real estate agencies"

**Positioning:** directly under the hero, per the boilerplate's own
instruction, ahead of its table-row position. Same treatment as the other
three pages.

⚠️ Third of four wordings for the same headcount — see 🚩1.

---

## 5. The trade-off — 🟢 · drafted, three blocks

> **The trade-off everyone is actually making.**
>
> Until recently you had to pick one: convenience or a person you know.
>
> The national platforms and franchises solved the convenience problem properly. You can book at eleven at night, you get a confirmation, and there is a number to ring if something goes wrong. What you give up is knowing who is coming.
>
> Independent local cleaners solved the other half. You know her name, she knows your dog, and the work is better because she cares. What you give up is the organising: phone tag, a paper diary, and no cover when she is away.
>
> We built TLB to not make you choose. That is the whole idea, and everything below is downstream of it.

This is a **setup → two-sided contrast → resolution** structure, and
flattening it into one prose block wastes it. The two middle paragraphs are
deliberately parallel — same length, same "solved X / what you give up is Y"
shape. Put them side by side and the reader sees the symmetry before reading
a word.

**Three sections, not one:**

1. **`TextBlock`** `theme="light"`, `heading` = "The trade-off everyone is
   actually making.", `body` = the "Until recently…" line alone.
2. **`ContentGrid`** `columns={2}`, two `text` cells, no section heading:
   - Cell A — `heading`: "Convenience", `body`: the platforms paragraph,
     `tone: 'muted'`
   - Cell B — `heading`: "A person you know", `body`: the independents
     paragraph, `tone: 'muted'`

   *(Cell headings are new copy, not in the brief — they name the two things
   the setup line already names, so they're a labelling choice rather than
   an argument. Flagged as an addition regardless.)*
3. **`TextBlock`** `theme="dark"`, `body` = "We built TLB to not make you
   choose. That is the whole idea, and everything below is downstream of
   it." Dark because it's the pivot the whole page turns on, and this page
   badly needs tonal pacing (see the pacing note at the end).

*(A dedicated "versus" component was considered and rejected: this shape
appears once, and `ContentGrid` at `columns={2}` renders it correctly today.
If a second page wants the same setup/contrast/resolution rhythm, that's
when it earns a component — the library's own two-consumer bar.)*

---

## 6. Comparison table — `ComparisonTable.astro` 🟢 · ✅ **using TLB's approved table**

The brief's row for this section reads, in full: **"Comparison table"** — no
heading, no columns, no rows.

**Resolved by reusing the homepage's table.** That copy was supplied directly
by TLB with desktop and mobile mockups, so it is approved content rather than
anything derived. Two columns — **TLB Cleaning** (highlighted) vs **Other
Brands** — and five rows, each with a parenthetical second line.

Because two pages now use identical rows, the substance was extracted to
[`src/data/comparison.ts`](../src/data/comparison.ts) and both
[`index.astro`](../src/pages/index.astro) and
[`why-tlb.astro`](../src/pages/why-tlb.astro) import it. Editing a row now
updates both pages. Each page still sets its own framing:

| | Homepage | Why TLB |
|---|---|---|
| `heading` | "How TLB Cleaning compares" | "How TLB Cleaning compares" |
| `cornerLabel` | "Why TLB Cleaning is different" | "What makes the difference" |

*(The corner label differs deliberately — "Why TLB Cleaning is different"
restates the page's own name on a page called Why TLB.)*

### ⚠️ The page now promises more than the table delivers

This is the one thing to settle before launch. §3's card 1 says:

> A franchise, an online platform, a solo cleaner or a local team. They are
> genuinely different things and **each is right for someone**.

and §5 concedes the platforms "solved the convenience problem properly".

The table is **TLB ✓ on all five rows, Other Brands ✗ on all five.** It does
not distinguish the four models the card names, and it never shows anything
being right for someone else. A reader who follows card 1 expecting a
four-way, honest comparison lands on a clean sweep.

Two ways to close the gap:

1. **Soften card 1's copy** to match a two-column table — drop "each is right
   for someone" and the four-model list. Cheapest, but it gives up the most
   disarming line in the brief.
2. **Extend the approved table** with the extra columns. Keeps the page's
   voice, but the added cells would be new claims needing the same sign-off
   as any competitor comparison.

*(An earlier build had a four-column table with rows derived from this page's
own prose. It delivered on card 1, but every cell was my construction rather
than approved copy — replaced at TLB's direction. The tension it was solving
is still real, which is what this note records.)*

### ⚠️ Two smaller carry-overs

- Row 2, "Owned and run by local mums from the Northern Rivers", restates the
  claim in 🚩1. Same fact, same open question.
- Two row labels carry a trailing `*` with **no footnote text supplied**
  (inherited from the homepage). `ComparisonTable` has a `footnote` prop;
  because the rows are now shared, adding it fixes both pages at once.

**Positioning:** wrapped in `<div id="compare">` for card 1's anchor. Full
section width, stacked, nothing clipped.

## 7. The model explanation — `TextBlock.astro` 🟢 · drafted

> **A brand can be bought. A person cannot.**
>
> In a franchise network, local operators buy the right to trade under a corporate name. The brand does the marketing and the phone number, and an operator you have never heard of does the work. On a booking platform, an algorithm dispatches a vetted contractor. Both are legitimate ways to run a cleaning business and both are genuinely convenient.
>
> Neither can introduce you to her. To match that, they would have to employ the cleaners rather than dispatch them, keep them long enough for you to learn their names, and let you see who they are before they arrive. That is not a feature that ships in the next release. It is a different company.

`theme="light"`, `align="left"`, `heading` + two `body` paragraphs. Straight
prose, no list, no image — exactly what `TextBlock` is for.

The strongest writing in the brief. Don't break it up.

---

## 8. Flexible hours — `TextBlock.astro` 🟢 · drafted

> **Flexible hours are not a perk. They are the mechanism.**
>
> Cleaning has a staff turnover problem across the whole industry, driven by rigid hours and low engagement. Somebody treated as interchangeable behaves as though the job is interchangeable, and the person whose house it is can tell.
>
> Our team is built around school pick-up, because most of us are doing it. That is why people stay, and why you are not meeting somebody new every fortnight. A team that loves the work does better work, and there is no clever version of that idea.

`heading` + two `body` paragraphs.

⚠️ **"because most of us are doing it"** — "most of us", not "all of us".
This is the same fact the H1 states as "nine local mums", stated more
carefully two thirds of the way down the same page. It agrees with the
homepage and disagrees with this page's own H1. Further evidence for 🚩1,
and a hint as to which version is true.

⚠️ "Cleaning has a staff turnover problem across the whole industry" — an
industry claim, same substantiation question as 🚩3. Softer than the FAQ
numbers, but if a source exists it's worth having.

---

## 9. The switching guide — the best content on the page

> **Changing cleaners is awkward. Here is how.**
>
> Almost nobody puts off changing cleaners because of price or quality. They put it off because someone has a key to their house and they do not want to have the conversation.

**Three blocks.**

### 9a. Intro — `TextBlock.astro` 🟢

`heading` + the paragraph above. Needs a wrapper `<div id="switching">` for
card 2's anchor.

### 9b. Four objection cards — `ContentGrid.astro` `columns={2}` 🟢

Each card: the objection as `heading` (kept in quote marks — the voice is
the reader's own, and losing the quotes loses that), the advice as `body`.

| Card | Heading | Body |
|---|---|---|
| 1 | "She is lovely. I feel terrible." | You are allowed to change a service arrangement without it being a judgement on someone as a person. "We are making some changes at home and are going to stop the regular clean" is true, kind and complete. You do not owe a critique, and offering one usually makes it worse for both of you. |
| 2 | "She has a key." | Ask for it back at the last clean, in person, and have the conversation then. Handling it by message and asking for the key afterwards is the version that goes badly. If there is a lockbox or a code, change it the same day as ordinary housekeeping rather than as a statement. |
| 3 | "What if the new one is worse?" | Do not stop the old arrangement until you have had one clean from the new one. Book us once as a one-off, see how it goes, then decide. Anyone who pushes you to cancel before you have seen the work is selling, not advising. |
| 4 | "She lives around here. I will run into her." | You will, because that is what living in a small town is. Which is exactly why the in-person version is worth the discomfort. Our team lives here too and so does **Teagan**. Nobody at TLB wants to be the reason a neighbourly relationship went sour. |

*(Card 4: "Tegan" → "Teagan" per 🚩4.)*

⚠️ Card 3 contains the page's only soft sell — *"Book us once as a one-off"*
— and it's placed inside advice that explicitly warns against being sold to
(*"Anyone who pushes you to cancel before you have seen the work is
selling, not advising"*). That's a deliberate and effective move. Don't let
a later edit add a second pitch to any of the other three; one is what makes
it land.

### 9c. The timing callout — 🔴 **component gap**

> Do not do this in the fortnight before Christmas. If you have family arriving, or you are about to list the house, or you are three weeks from moving out, this is the worst possible moment to change anything. Anybody telling you now is a great time to switch is thinking about their month, not yours.

**Nothing in `SECTIONS.md` is a callout** — an emphasised single-message
panel that reads as *stop and read this*, visually distinct from the body
copy around it. This is the one block on the page that is an instruction
rather than an argument, and it's the payoff card 2 promises (*"and the one
time of year not to"*).

**Two options:**

1. **New `Callout.astro`** — one short message in a bordered/tinted panel,
   optional `tone: 'note' | 'warning'`, optional icon. Small build.
   ⚠️ **Honest caveat: one consumer.** This library's own bar is two real
   consumers before extracting a component, and right now this is the only
   place asking for it. Worth building if callouts are expected elsewhere
   (a "don't book a bond clean before the furniture is out" note on the
   end-of-lease page is the obvious second); not worth it for one block.
2. **Ships today, no new code:** `TextBlock` `theme="dark"`, `align="left"`,
   no heading, one `body` paragraph. The dark band already reads as a break
   in the page's rhythm, which is most of what a callout is doing here.

**Recommend option 2 now, option 1 when a second callout appears.** Don't
build the component speculatively.

---

## 10. Agencies and businesses — `ServiceBlocks.astro` `list` 🟢 · drafted

> **If you are changing a contractor rather than a cleaner.**
>
> Moving a rent roll or a commercial contract is a different problem. You are not managing a relationship, you are managing vacancy windows or an office that has to be usable on Monday. The answer is the same in both cases: give us one job, and not your easiest one.
>
> Agencies: give us the difficult property. The one with the tight window or the awkward exit condition. That is the job that tells you something.
>
> Businesses: start with a walkthrough. Nobody can quote a building from a form. We look at it, tell you what it needs, and say if we are not the right people.

- `heading`: "If you are changing a contractor rather than a cleaner."
- `lead`: the "Moving a rent roll…" paragraph.
- `items`: two rows —

| Title | Description | `href` |
|---|---|---|
| Agencies: give us the difficult property | The one with the tight window or the awkward exit condition. That is the job that tells you something. | `/real-estate-cleaning/` |
| Businesses: start with a walkthrough | Nobody can quote a building from a form. We look at it, tell you what it needs, and say if we are not the right people. | `/commercial-cleaning/` — ⚠️ confirm slug |

⚠️ **Icon-less**, same as every other page: `ServiceIcon.astro`'s set is
abstract and has no agency/office glyph.

⚠️ `href`s are a proposal — the brief supplies none. Check the commercial
slug against the header mega-menu before wiring.

⚠️ This section abruptly changes audience two thirds down a page written for
householders. It's correctly placed *after* the domestic switching guide
rather than interrupting it, but consider whether the H2 should signal the
switch harder — "If you are a business or an agency" is plainer than "a
contractor rather than a cleaner".

---

## 11. Social proof — `TestimonialCarousel.astro` 🟢 · 🔒 blocked

> Ask Teagan for clients testimonials

The entire brief. No angles, no count — less direction than any of the three
sibling pages got.

Build as **bracketed `[TBC]` briefing slots**, the convention `index.astro`,
`house-cleaning.astro` and `deep-cleaning.astro` all use: the visible text
states what to ask for and reads as obviously unfinished. **Never invented
names or words.**

**Recommend two, `uniform`**, and brief them to this page's argument rather
than generic praise. The two that would actually carry it:

1. **Someone who switched from a franchise or a platform** — the entire top
   half of this page is that comparison, and a real switcher is the only
   proof of it.
2. **Someone who dreaded the conversation and did it anyway** — §9 is the
   page's most distinctive content and currently has no human evidence
   behind it at all.

That brief is worth writing down before asking Teagan; "clients
testimonials" won't produce either.

---

## 12. Branded FAQs — `Faq.astro` 🟢 · 3 of 4, and the 4th blocks the page

1. **"Can I book one clean without committing to a schedule?"** — drafted:
   > Yes, and for anyone changing over we would suggest you do exactly that.
2. **"Do you need to know who I was using before?"** — drafted:
   > No, and we would rather not turn it into a conversation about someone else. What is useful is knowing what you want kept the same and what you want done differently.
3. **"Am I locked into anything?"** — 🔒 **blocked. See 🚩2.** Do not publish
   the page without it and do not quietly drop it.
4. **"Do you cover everywhere a national brand does?"** — drafted:
   > No, and we would not claim to. Five Northern Rivers council areas and the Southern Gold Coast.

   ⚠️ **Which five?** The number appears nowhere else on the site, and the
   three suburb lists already in the codebase disagree with each other
   ([`home-cleaning.md`](./home-cleaning.md) §12). Naming them would also
   feed the `near me` focus keyword, which currently has almost nothing on
   this page to attach to.

`heading` not supplied — "Frequently Asked Questions" matches the other pages.

Note FAQs 1, 2 and 4 all answer by **conceding something**. That's the
page's voice working; keep any future additions in the same register.

---

## 13. Non-branded FAQs — `Faq.astro` 🟢 · 4 drafted, all needing 🚩3's check

All four ship as written *once substantiated*:

1. **"How much notice should I give my current cleaner?"**
2. **"Will I be charged if I cancel a booked clean?"**
3. **"Is there anything in my current terms I should check before I switch?"**
4. **"What am I entitled to if a clean is not done properly?"**

`heading` not supplied — "Switching Cleaners: FAQs" fits better than the
sibling pages' service-name pattern, since none of these is about TLB.

⚠️ These are the page's **strongest SEO asset and its biggest risk in the
same block.** Nobody else in this market is answering "what's in my cleaning
contract" — that's real long-tail territory and genuine reader service. But
every answer asserts numbers about third-party contracts and one cites an
unnamed published case. Substantiate, then ship.

⚠️ Note FAQ 3 tells readers to check for a **non-solicitation clause** that
would stop them hiring their current cleaner directly. Worth checking TLB's
own terms don't contain one before publishing the warning — see 🚩2.

---

## 14. Closing CTA — `CallToAction.astro` `secondary` 🟡 · partly blocked

> **MEET THE TEAM**
> The one thing they cannot show you.
> Have a look at who would actually be walking into your house.

- `kicker`: "MEET THE TEAM" — 🟡 **the same missing prop as §1.** Second
  consumer on this page; see §1's recommendation.
- `heading`: "The one thing they cannot show you."
- `lead`: "Have a look at who would actually be walking into your house."
- `cta.label`: 🔒 **not supplied.** "Meet the team" is the obvious label but
  it duplicates the kicker; "See who would come" reuses the lead's own
  words. Needs real copy.
- `cta.href`: `/about/` — the header nav's "About TLB and Teagan" page. ⚠️
  Confirm that page will actually show the nine cleaners with names and
  faces. **This CTA promises something a generic About page won't deliver**,
  and it's the third time the page has made that promise (§3 card 3, §7
  "neither can introduce you to her", here). If a real team page with photos
  isn't planned, the promise needs to go — it's the page's central claim.

⚠️ **This page's closing CTA is not "get a quote"**, unlike its three
siblings — it hands off to the team page instead. That's the right call for
a page whose argument is "you can see who we are", and it should stay that
way even though it breaks the site pattern. Worth defending in review.

---

## Full page order

1. `SiteHeader`
2. `Hero` (`minimal` + new `kicker`) — WHY TLB / H1 / trimmed lead / CTA
3. `TrustBar` — moved up per the boilerplate's own instruction
4. `TextBlock` (light) — thesis lines + definition paragraph
5. `PathwayCards` — 3 routing cards *(anchors to §6, §9, `/about/`)*
6. `TextBlock` (light) — "The trade-off everyone is actually making." (setup)
7. `ContentGrid` (2-col, muted) — Convenience / A person you know
8. `TextBlock` (**dark**) — "We built TLB to not make you choose." (pivot)
9. `ComparisonTable` 🔴 — four-way comparison, `#compare` *(rows blocked)*
10. `TextBlock` (light) — "A brand can be bought. A person cannot."
11. `TextBlock` (light) — "Flexible hours are not a perk."
12. `TextBlock` (light) — "Changing cleaners is awkward." `#switching`
13. `ContentGrid` (2-col) — four objection cards
14. `TextBlock` (**dark**) — the Christmas timing callout *(or `Callout`)*
15. `ServiceBlocks` (list) — agencies and businesses
16. `TestimonialCarousel` (uniform, 2) — `[TBC]` slots
17. `Faq` #1 — branded, 3 of 4 *(4th blocks launch)*
18. `Faq` #2 — non-branded switching FAQs
19. `CallToAction` (secondary + new `kicker`) — meet the team
20. `SiteFooter`

⚠️ **Pacing.** Items 10, 11 and 12 are three consecutive light `TextBlock`s
— roughly 400 words of centred prose in a row, the longest unbroken stretch
of body copy on the site. The dark blocks at 8 and 14 help, but consider
alternating one of 10/11 to `theme="dark"`, or giving §7 or §8 a real photo
via `StoryMosaic` once team photography exists. **This page has no images at
all as specified** — worth naming as a gap in its own right, on a page whose
thesis is "look at who we are".

---

## Open items

**Blocks launch:**
- 🚩1 "Nine local mums" vs. the homepage's "most of them mums" — a factual
  claim in an `<h1>` and a meta description.
- 🚩2 "Am I locked into anything?" — commercial terms unconfirmed. The page
  cannot ship with this omitted *or* unanswered.
- 🚩3 Substantiation pass on all four non-branded FAQs.
- §6: card 1 promises a four-way comparison where "each is right for
  someone"; the approved table is a two-column clean sweep. Soften the card
  or extend the table.

**Component work:**
- `kicker?: string` on `Hero.astro` **and** `CallToAction.astro` (§1, §14) —
  two consumers on this page; recommended.
- `Callout.astro` (§9c) — **recommend deferring.** One consumer today; ships
  fine as a dark `TextBlock` until a second appears.

**Copy not supplied:** §3's section heading + three card CTA labels; §5's two
column headings (proposed above); §14's CTA button label; both FAQ headings;
the five council-area names.

**Media:** no images specified anywhere on this page. Hero photo, three card
images, and — most importantly — the team photography the page promises
three separate times.

**To confirm:** the `/about/` page will actually show nine named faces;
`/commercial-cleaning/` slug; "Tegan" → "Teagan"; whether the switching
guide warrants its own URL given the focus keyword covers only half this
page.
