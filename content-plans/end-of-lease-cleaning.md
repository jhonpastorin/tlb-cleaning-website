# Content plan: "End of Lease and Bond Cleaning" page

Source: **no content brief exists.** Drafted from
[`TLB Cleaning - Brand Foundation.md`](../TLB%20Cleaning%20-%20Brand%20Foundation.md)
(the BFD), plus the section library in [`SECTIONS.md`](../SECTIONS.md) and the
page pattern set by [`deep-cleaning.md`](deep-cleaning.md).

Built at [`src/pages/end-of-lease-cleaning.astro`](../src/pages/end-of-lease-cleaning.astro),
shipping at `/end-of-lease-cleaning/`. No slug conflict: that slug is already
referenced by `navigation.ts` (footer services, the Home Cleaning mega-menu)
and by `deep-cleaning.astro`'s pathway card 2, all of which were **pointing at
a 404 until now**.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap. Content status:
**drafted** (structurally finished, unverified copy), **drafted, pending
confirmation** (contains a `[CONFIRM]` marker), **blocked** (no usable media
exists).

---

## Read this before anything else

Every other page in this repo was built from a supplied brief with approved
copy, and its content plan's job was to map that copy to components and flag
where the brief fell short. **This page had no brief.** That inverts the job,
and it changes what this document is for.

| | The other pages | This page |
|---|---|---|
| Voice, terminology, claim rules | From the brief | From the BFD. Solid. |
| Section structure | From the brief | Drafted, from the sibling pages' pattern. |
| Inclusions, exclusions, timings, policies | From the brief | **Drafted from category convention. Not TLB's.** |

So the flags below are not "the brief left this blank". They are "nobody has
ever told this repo what TLB actually does here, and the page had to say
something". The page is a **structured first draft for Teagan to correct**, not
approved copy awaiting a proofread.

The one thing that is *not* a guess is what the page refuses to claim. See
below.

---

## The guarantee, and why the page does not offer one

This is the most important decision on the page and it was not a close call.

BFD section 3.5: *"Guarantees only if formally adopted. Category leaders
promote satisfaction and bond-back guarantees prominently. Do not copy this
language unless Teagan formally adopts a guarantee the business can honour;
until then use 'cleaned to inspection standard' phrasing."*

BFD section 5.3: *"Never guarantee outcomes TLB cannot control (e.g. do not
promise '100% bond back guaranteed'…)."*

Two separate sections of the source document, saying the same thing, about
this exact page. So:

- Nothing on the page promises a bond, a pass or a refund.
- The H1 is "Cleaned to the standard the inspection measures", which is the
  BFD's own phrasing turned into a headline.
- FAQ 2 is **"Do you guarantee I will get my bond back?"** and the answer is
  **"No, and be careful of anyone who does."**

That last one is a deliberate competitive move, not just compliance. Every
national platform in this category leads with a bond-back guarantee badge. TLB
cannot match it, so the page does the one thing that turns the weakness into
the differentiator: it explains why the guarantee is not really a guarantee,
and then promises the part TLB does control (section 6, the re-clean).

**If Teagan formally adopts a guarantee**, that is a single decision that then
has to be wired through the H1, the meta description, section 5, section 6 and
FAQ 2 **together**. Do not add it to one of them.

---

## 0. Page metadata

| Field | Value | Status |
|---|---|---|
| Title tag | `End of Lease and Bond Cleaning \| TLB Cleaning` | Drafted. Carries both search terms, which is the point. |
| Meta description | "Bond cleaning across the Northern Rivers and Southern Gold Coast, cleaned to the standard your exit inspection is measured against. Published task list, quoted before we start." | Drafted. Deliberately no bond-back claim. |
| URL | `/end-of-lease-cleaning/` | Matches every existing reference in `navigation.ts`. |
| Focus keyword | `bond cleaning` / `end of lease cleaning` | Both answer-targeted by section 2, verbatim. |
| Canonical | `https://example.com/end-of-lease-cleaning/` | ⚠️ Placeholder domain, same as every other page. |

Unlike the deep-cleaning description, this one **keeps the Southern Gold
Coast**, because the cross-border service area is a genuine differentiator
here (section 7) and a Tweed Heads tenant searching QLD is a real visitor. The
open site-wide question of whether QLD is in the service story still stands.

---

## Terminology: the one rule that needed a ruling

BFD section 3.3 says use one consumer term consistently, not alternating "bond
clean" / "exit clean" / "vacate clean". BFD section 2.3 says use "bond clean"
for consumers and "end-of-lease clean" for agency audiences.

This page has both audiences, so those two rules pull against each other. The
resolution:

1. Section 2 states **once**, in the copy, that the two names mean the same
   job and explains why each audience uses its own.
2. "Bond clean" is used in consumer-facing copy.
3. "End of lease clean" is used in the agency card and the comparison table.
4. **"Exit clean" and "vacate clean" appear nowhere on the page.**

That satisfies both rules and turns a terminology problem into a useful
sentence for someone who has never done this before.

---

## Full page order

| # | Section | Component | Status |
|---|---|---|---|
| — | Site chrome | `SiteHeader` | |
| 1 | Hero | `Hero` `split-single-image` | drafted 🟢 |
| 2 | Trust bar + definition | `TrustBar` `card` + `TextBlock` `muted`, in `Backdrop` | drafted 🟢 |
| 3 | Audience split cards | `PathwayCards` | drafted 🟢 |
| 4 | What's included | `ContentGrid` `columns={2}` | drafted, **pending confirmation** 🟢 |
| 4b | Quoted separately / not included | `Callout` `note` | drafted, **pending confirmation** 🟢 |
| 5 | How the standard is set | `ContentGrid` `columns={3}` | drafted, **needs legal read** 🟢 |
| 6 | If the agent comes back | `TextBlock` `light` | drafted, **pending confirmation** 🟢 |
| 7 | Both sides of the border | `TextBlock` `muted` | drafted 🟢 |
| 8 | Comparison table, `#compare` | `ComparisonTable` | drafted 🟢 |
| 9 | Before and after | `PhotoGallery` `grid` | **media blocked** 🟢 |
| 10 | Video | `VideoFeature` | **media blocked** 🟢 |
| 11 | Booking and pricing | `TextBlock` `dark` + CTA | drafted 🟢 |
| 12 | Testimonials | `TestimonialCarousel` `uniform` | **blocked** 🟢 |
| 13 | Where we clean | `TagCloud` `groups` | drafted 🟢, shared data |
| 14 | FAQs (10, one block) | `Faq` | drafted, 5 **pending confirmation** 🟢 |
| 15 | Closing block | `CallToAction` `secondary` | drafted 🟢 |
| — | Site chrome | `SiteFooter` | |

**No component changes were needed.** Every section above uses an existing
component at an existing variant, with props the library already supports.
That is worth stating: the section library covered a whole new page without a
single stretch, which is the first time that has happened in this repo.

---

## 1. Hero 🟢 drafted

`variant="split-single-image"`, `imagePosition="right"`,
`imageFit="contain-bottom"`, `ratio="16/9"` matching the asset's native
1920x1080. Same configuration as every other service hero.

Image reuses `home/service-end-of-lease-and-bond-cleans.png`, the library's
canonical image for this exact service (already the homepage service tile).
IMAGE-GUIDELINES.md section 5 asks for reuse before generation and warns
against a second file meaning the same thing, so this is the instructed
choice, not a shortcut.

H1 names the standard rather than the service. That is the honest version of
the promise a competitor makes with a guarantee badge, and it is the BFD's own
"cleaned to inspection standard" phrasing.

---

## 2. Trust bar + definition 🟢 drafted

Shared `Backdrop` at `opacity={75}`, `focus="top"`, identical to the sibling
pages. `trustBarCards` from `src/data/trust.ts`, so this page inherits the
five-point set and the two unsourced numbers flagged there. No new exposure.

The definition block is the GEO answer-target, written to BFD section 3.6.2:
sentence one is a definition, sentence two is a semantic triple naming the
entity and the service area. Paragraph two is the terminology ruling above.

---

## 3. Audience split cards 🟢 drafted

The page has two genuinely different readers, BFD section 4.1 audiences 1
(tenants) and 3 (agencies), and they want opposite things. A tenant wants cost
and reassurance. A property manager wants capacity and turnaround. A single
blended page serves neither, so the cards split them at the top.

| Card | Title | → |
|---|---|---|
| 1 | I'm moving out and I want my bond back | `/quote/` |
| 2 | I manage the property | `/real-estate-cleaning/` |
| 3 | I'm not sure this is the clean I need | `#compare` (section 8) |

Card 3's `#compare` anchor sits on a wrapper `<div>`, the same pattern
`deep-cleaning.astro` uses, because `ComparisonTable` takes no `id` prop and
adding one purely for an anchor is not worth a shared-component change.

⚠️ **Card 2 points at `/real-estate-cleaning/`, which does not exist yet.** It
is in `navigation.ts`'s footer services list and the mega-menu, so this page
is not introducing the dead link, but it is now sending a high-value audience
into it. Worth knowing when prioritising which page gets built next.

Section heading, accent and the three CTA labels are **drafted**, not briefed.

---

## 4. What's included 🔒 drafted, pending confirmation

`columns={2}`, six `text` cells, three clean rows, no `span` needed (unlike
deep-cleaning's orphaned fifth cell).

Kitchen · Bathrooms, ensuites and toilets · Bedrooms and living areas ·
Laundry · Walls, marks and spots · Throughout.

Component choice follows deep-cleaning section 5 exactly: `ContentGrid` `text`
cells rather than `ServiceBlocks` `icon-grid`, because `ServiceIcon.astro` has
no room icons and six rooms would share three unrelated glyphs. Tasks run as
one comma-separated sentence per room rather than bullets, matching the
deep-cleaning page so both lists read as one company's standard.

### 🔒 This is the highest-stakes unconfirmed block on the page

Higher than the equivalent list on the deep-cleaning page, and the reason is
money. A deep-clean client who finds an omission is disappointed. A bond-clean
client who finds one may lose part of their bond over it, and will hold TLB to
this page.

The list is drafted from **what a bond clean conventionally covers in NSW and
QLD**, not from TLB's scope of works, because no scope of works exists in this
repo. If TLB's real scope differs on even one line, this page has promised
work the team is not pricing for.

**Whoever quotes these jobs has to read it line by line.** Not a copy
approval. The lines most likely to be wrong: oven racks and trays, the fridge
cavity, dishwasher filter and seals, window tracks, and whether "inside
wardrobes" means wiped or detailed.

The "Walls, marks and spots" cell is the one to read hardest. It commits to
spot cleaning "where the paint surface allows it" and to telling the client
when a mark is damage rather than dirt. That is a judgement call made on the
day by whoever is on site, and it needs to be one the team is comfortable
making.

---

## 4b. Quoted separately / not included 🔒 drafted, pending confirmation

`Callout` `tone="note"`, two body paragraphs. Not two more grid cells: they
are the opposite of everything above them, and an inset panel that reads as an
interruption is exactly `Callout`'s job, where a seventh grid cell gets
skimmed as a seventh room.

### 🔒 The higher-stakes half of the same confirmation

On a bond clean an unexpected exclusion is not a complaint, it is a line item
on an exit report and a deduction from someone's bond.

**The carpet line needs checking first.** In both NSW and QLD a lease may
specifically require professional carpet cleaning, and the receipt is often
what the agent actually wants. The copy currently says TLB **quotes** it
separately, which implies TLB arranges it. If TLB refers carpet cleaning out
instead, this line and FAQ 6 both change.

FAQ "What isn't included in a bond clean?" restates this list. **Settle the
two together and keep them in step**, or the page contradicts itself about
what a client is paying for.

---

## 5. How the standard is actually set 🟢 drafted, ⚠️ needs a legal read

`columns={3}`, three `text` cells: the entry report · fair wear and tear is not
dirt · the agent still holds the pen.

**This section does the job the guarantee would have done.** Its argument is
that an exit inspection is a *comparison* against the entry condition report,
allowing for fair wear and tear, not a judgement about how clean the place
feels. That is genuinely useful to a first-time renter, and it is precisely why
TLB can be confident about the clean without promising an outcome that depends
on the agent, the report and the property's condition before anyone arrived.

### ⚠️ The one block on the site that describes a legal process

The cells are written generally and deliberately state **no timeframe, dollar
figure or entitlement**, because those differ between NSW and QLD and change
over time. Even so:

1. **Have someone qualified read it before launch.** It is the only place on
   the site that tells a visitor how a tenancy process works.
2. **Add the outbound authority links.** BFD section 3.3 asks for trusted
   external sources and names NSW Fair Trading and the Queensland RTA
   specifically. Both belong here. They are not in the build because there is
   no guides section to host the surrounding context yet, and a bare outbound
   link from a service section is a worse pattern than none. Revisit when
   `/guides/` exists.

---

## 6. If the agent comes back 🔒 drafted, HIGHEST RISK

`TextBlock` `light`, three paragraphs. This is the section a competitor
replaces with a guarantee badge, and it is **the most consequential
unconfirmed thing on the page.**

The copy commits TLB to returning, within a stated window, at no charge, for
items on the exit report that were in the agreed scope.

### 🔒 Three things need Teagan's answer

1. **The window.** Left as a literal bracketed blank in the published copy:
   `[CONFIRM: the re-clean window, for example 72 hours or 7 days]`. It is
   visible on the built page on purpose, so nobody can publish it half-filled.
   Competitors typically offer 72 hours to 7 days.
2. **The scope.** The copy says free for in-scope items only. Confirm that is
   the policy and not something broader or narrower.
3. **The notification order.** Does the client have to tell TLB before
   responding to the agent?

### If TLB does not want to offer a re-clean at all

**Delete section 6 and FAQ 1 entirely rather than softening them.** A vague
promise here is worse than no promise: it invites a dispute at exactly the
moment the client is already fighting about money. Deleting them leaves the
page's honesty intact, because section 5 already carries the argument.

---

## 7. Both sides of the border 🟢 drafted

`TextBlock` `muted`. A genuine local differentiator, and the reason this page
names two states where other pages quietly drop the Queensland half.

TLB's service area straddles the border at Tweed Heads and Coolangatta. A
tenant moving four kilometres from Tweed Heads to Coolangatta changes legal
jurisdiction, and most cleaners on either side work only one of them. This is
exactly the "reinforce the local advantage" theme in BFD section 4.5, and it
is the kind of thing a national platform running one generic page for eleven
cities structurally cannot say.

The copy names NSW Fair Trading and the Queensland RTA as the bodies that set
the rules, which is factual, and makes **no claim about what either requires.**
Keep it that way unless the claim is checked.

---

## 8. Comparison table 🟢 drafted

`cornerLabel` "Which one you need", three columns with **End of lease clean
highlighted**, five rows.

Rows and framing are `deep-cleaning.astro`'s table with the highlight moved,
so a visitor arriving from that page's card 2 meets the same three services
described the same way. One row is new: **"Inside ovens and cupboards"**
(Included / Quoted separately / Not included), because it is the single
clearest concrete difference between a bond clean and a deep clean and it is
what people actually get wrong when they book.

**Not extracted to `src/data/` yet.** Two callers is this codebase's stated bar
for sharing (see `comparison.ts`, `locations.ts`, `trust.ts`), and this is the
second, but the highlight, the column order and one row legitimately differ
per page. Extracting it now would mean parameterising three things to save
duplicating four. **Worth revisiting if a third page needs the same table** —
at that point the shared shape is real and the case flips.

---

## 9-10. Before/after images and video 🟢 media blocked

Four reserved `PhotoGallery` slots (two pairs: oven interior, shower screen
and grout) and one reserved `VideoFeature` 16/9 slot.

### ⚠️ Consent binds harder here than on the deep-cleaning page

An end-of-tenancy "before" shot can identify **both a former tenant and a
managed property**, and BFD section 5.3 (Privacy) is explicit about client
property images.

1. **Written permission from the tenant, and from the agency** where the
   property is managed.
2. **No identifying detail in frame.** No house numbers, street signs, mail,
   people, names on doors, or a view that locates the place.
3. **One fixed position per pair**, or the pair does not read.

The video is the most achievable real media on the page, because an empty
property has no belongings in frame and is therefore the easiest consent case
on the site.

Prompts and the full photography brief:
[`IMAGE-PROMPTS.md`](../src/assets/home_cleaning/inside_your_home/end_of_lease_and_bond_cleaning/IMAGE-PROMPTS.md).

---

## 11. Booking and pricing 🟢 drafted, one flag

`TextBlock` `dark`, three paragraphs, carrying the page's second CTA. Dark for
the same reason as the deep-cleaning page: it sits between two light sections
and it argues rather than lists.

Paragraph three is the genuinely useful one, and it is not something a
competitor page says: book after the removalists, before the inspection, with
a day in between. That gap is what gives everyone room if something needs a
second look, and it makes the section 6 re-clean promise practical rather than
theoretical.

### ⚠️ "You get a price up front"

A process claim. It matches the instant-quote positioning in BFD section 1.5
differentiator 5, but **confirm the quoting flow actually returns a price for
bond cleans** rather than a callback. Bond cleans are condition-dependent in a
way regular cleans are not, and this is the service most likely to need a look
before a number.

---

## 12. Testimonials 🟢 blocked

Two bracketed `[TBC]` slots, `uniform`, the site-wide convention: the visible
text reads as obviously unfinished so it cannot be mistaken for a real quote.

BFD sections 5.2 and 3.6.3 both prohibit fabricated or paraphrased
testimonials outright. IMAGE-GUIDELINES.md section 7 prohibits generating a
face to sit beside one. **Never fill these with invented names, words or
photos.**

The two angles match the page's audience split:

1. **A tenant whose bond clean passed.** This is the most persuasive thing that
   could sit on this page, and it is the exact thing the page is not allowed to
   promise on its own behalf. A real client saying it carries no compliance
   problem at all. This is the single highest-value asset TLB could gather for
   this page.
2. **A property manager at one of the contracted agencies.** Answers the
   capacity and turnaround question a tenant quote cannot. ⚠️ Requires written
   permission to name the agency (BFD section 5.3).

---

## 13. Where we clean 🟢 drafted

`locationGroups` from `src/data/locations.ts`. Inherits that file's two open
questions (the `/locations/<slug>/` pattern, the ~41 town pages that do not
exist yet, the shorter mega-menu list). No new exposure, and one fix there
still serves every page.

---

## 14. FAQs 🟢 ten questions, one block

One accordion, matching `deep-cleaning.astro` rather than the branded /
non-branded split the older pages use. BFD section 3.5 asks for an FAQ block on
every service page answering what is included, cost, duration, equipment and
booking, with self-contained 40 to 80 word answers. All ten are written to
that.

**Every answer is drafted, not briefed.** Five carry confirmations:

| # | Question | What needs confirming |
|---|---|---|
| 1 | What happens if the property fails the exit inspection? | The re-clean policy. **Same fact as section 6** — move them together, delete them together. |
| 3 | How long does a bond clean take? | Two literal `[CONFIRM]` blanks rather than invented numbers. A wrong figure here sets expectation on the day and misprices the job. |
| 4 | What isn't included in a bond clean? | The exclusions list. **Same fact as section 4b** — keep in step. |
| 6 | Do I need the carpets professionally cleaned as well? | Whether TLB arranges carpet cleaning or refers it out. Changes 4b too. |
| 9 | Do you bring your own products and equipment? | Product range, and the no-power scenario, which is an operational claim about how the team turns up equipped. |

FAQ 2 ("Do you guarantee I will get my bond back?") is **not** on that list. It
is settled: the answer is no, and it stays no unless a guarantee is formally
adopted. See the guarantee section above.

FAQ 9's no-power point is worth keeping whatever else changes. Utilities
disconnected before the final clean is a real and common failure on this
service, and nobody else's page mentions it.

---

## 15. Closing block 🟢 drafted

`CallToAction` `secondary`. Names the standard rather than the outcome,
consistent with the rest of the page.

---

## Open items

**Needs Teagan's sign-off, in priority order:**
1. **Section 6, the re-clean policy** — the window, the scope, the
   notification order. Or delete section 6 and FAQ 1 together. Highest risk on
   the page.
2. **Section 4 and 4b, the inclusions and exclusions** — line by line, by
   whoever scopes and prices these jobs. Not a copy approval.
3. **FAQ 3, the two duration blanks.**
4. **FAQ 6 / section 4b, carpet cleaning** — arranged by TLB, or referred out.
5. **FAQ 9, product range and the no-power scenario.**
6. **Section 11, whether the quote flow returns a real price** for bond cleans.

**Needs a legal or qualified read:**
- Section 5, the three cells describing how an exit inspection is measured.
- The whole page, once, against the guarantee rule. It was written to comply
  and it should be checked by someone other than its author.

**Decisions for TLB:**
- Does TLB want to formally adopt a bond-back guarantee? If yes, it is one
  decision wired through five places at once, never piecemeal.
- Section 3 card 2 sends property managers to `/real-estate-cleaning/`, which
  **does not exist**. Build it, or repoint the card.

**Media needed:**
- Four before/after photos (two pairs, one fixed position each), with written
  permission from tenant **and** agency, no identifying detail in frame.
- The walkthrough video.
- Two testimonial avatars, which stay the TLB monogram until real clients
  supply real photos with permission.

**Inherited, not introduced here:**
- Canonical domain is still `example.com` site-wide.
- `trust.ts`'s two unsourced numbers ("98% of our clients stay with us", "over
  100 local homes, hosts and businesses").
- `locations.ts`'s ~41 town pages that do not exist yet.
- `quoteCta`'s `/quote/` and the header's `/book-online/` are both guessed
  URLs.

**Not verified in a browser.** `astro check` reports 0 errors and the build
passes at 8 pages. The rendered HTML was checked for every section, a single
`<h1>`, sentence-case `<h2>`s, and zero em dashes and zero exclamation marks
in the visible copy (BFD section 3.2). No component CSS changed, so there is
nothing new to measure, but the page has **not** been looked at in a real
browser. No headless browser is installed in this repo.
