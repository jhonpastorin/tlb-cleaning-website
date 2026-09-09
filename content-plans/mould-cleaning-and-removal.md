# Content plan: "Mould Cleaning and Removal" page

Source: **no content brief exists.** Drafted from
[`TLB Cleaning - Brand Foundation.md`](../TLB%20Cleaning%20-%20Brand%20Foundation.md)
(the BFD), plus [`SECTIONS.md`](../SECTIONS.md) and the page pattern set by
[`deep-cleaning.md`](deep-cleaning.md).

Built at [`src/pages/mould-cleaning-and-removal.astro`](../src/pages/mould-cleaning-and-removal.astro),
shipping at `/mould-cleaning-and-removal/`. Slug matches the Home Cleaning
mega-menu entry in `navigation.ts`, which was **pointing at a 404 until now**.

Legend: 🟢 exact match · 🟡 workable with a stretch · 🔴 gap.

---

## This is the most constrained page on the site

Same provenance caveat as the end-of-lease page: no brief, so voice and claim
rules come from the BFD and everything operational is drafted from category
convention and flagged. See
[`end-of-lease-cleaning.md`](end-of-lease-cleaning.md) for that argument in
full rather than repeating it.

What is different here is that **three BFD rules bind harder on this topic
than on any other**, and all three point the same way: claim less than a
competitor would. They shaped the page more than the section library did, so
they come first.

### Constraint 1: no health claims, at all

BFD section 5.3: *"where content touches on cleaning products, methods or
safety, align with Safe Work Australia and state WHS guidance and avoid advice
that could cause harm if followed incorrectly."*

Mould is the one cleaning topic with a real health literature behind it, and
it is the topic where a cleaning company is most tempted to borrow authority
it does not have. The page therefore makes **no health claim of any kind**. It
does not say mould causes any symptom or condition, does not say removing it
improves anyone's health, and does not tell anyone whether their home is safe.

Section 10 and FAQ 2 handle the question by **deferring it**, naming NSW
Health, Queensland Health and the reader's GP as the right sources.

This is not evasion. Someone searching mould at eleven at night is often
worried about their family, and the honest answer from a cleaning company is
"that is not our question, here is whose it is". A reassurance would be worth
less and would breach the rule.

**Do not let section 10 grow into a symptoms list, a risk explainer or a
reassurance.** If TLB ever wants to cover this properly it belongs in a guide,
written against a citable health authority per BFD sections 3.3 and 5.2.

### Constraint 2: it will come back, and the page says so

BFD section 5.3 bars guaranteeing outcomes TLB cannot control. Mould regrows
wherever the moisture that fed it remains, and the moisture is almost always a
building problem a cleaner cannot fix.

So the page's H1 is **"We can get the mould off. Keeping it off takes more
than cleaning."** Section 8 is built entirely around that, the comparison
table has a literal **"Will it come back"** row that answers "Yes, if the
moisture is still there", and FAQ 1 asks it outright.

**Never add "gone for good", "permanent removal" or any variant.**

### Constraint 3: TLB cleans surface mould, and is not a remediation business

The page must not read as though TLB does building work. Section 5's Callout
names the referral cases and section 9's table puts "Specialist remediation"
in a column TLB does not sell, so a visitor whose problem is in that column
recognises themselves and goes elsewhere.

🔒 **[CONFIRM with Teagan where the real line sits.]** If TLB holds a relevant
credential, or does more than surface work, this framing is wrong at the
foundation and the page needs rewriting rather than patching.

---

## 0. Page metadata

| Field | Value | Status |
|---|---|---|
| Title tag | `Mould Cleaning and Removal \| TLB Cleaning` | Drafted. Carries both search terms. |
| Meta description | "Surface mould cleaned from bathrooms, walls, ceilings and wardrobes across the Northern Rivers and Southern Gold Coast. We remove what is there and tell you straight what is causing it." | Drafted. Claims surface cleaning, not remediation, and promises nothing about it staying away. |
| URL | `/mould-cleaning-and-removal/` | Matches `navigation.ts`. |
| Focus keyword | `mould cleaning` / `mould removal` | Both answer-targeted by section 2. |
| Canonical | `https://example.com/mould-cleaning-and-removal/` | ⚠️ Placeholder domain, same as every page. |

---

## Full page order

| # | Section | Component | Status |
|---|---|---|---|
| — | Site chrome | `SiteHeader` | |
| 1 | Hero | `Hero` `split-single-image` | drafted 🟢 · **image blocked** |
| 2 | Trust bar + definition | `TrustBar` + `TextBlock` `muted`, in `Backdrop` | drafted 🟢 |
| 3 | Situation cards | `PathwayCards` | drafted 🟢 · **2 images blocked** |
| 4 | Where it turns up | `ContentGrid` `columns={2}` | drafted, **pending confirmation** 🟢 |
| 5 | Outside the clean / referrals | `Callout` `note` | drafted, **pending confirmation** 🟢 |
| 6 | Why it happens here | `ContentGrid` `columns={3}` | drafted 🟢 |
| 7 | What not to do first | `Callout` `warning` | drafted 🟢 · **do not expand** |
| 8 | Why it comes back, `#moisture` | `TextBlock` `light` | drafted 🟢 |
| 9 | Comparison table | `ComparisonTable` | drafted, **pending confirmation** 🟢 |
| 10 | On the health question | `TextBlock` `muted` | drafted 🟢 · **do not expand** |
| 11 | Before and after | `PhotoGallery` `grid` | **media blocked** 🟢 |
| 12 | Booking | `TextBlock` `dark` + CTA | drafted 🟢 |
| 13 | Testimonials | `TestimonialCarousel` `uniform` | **blocked** 🟢 |
| 14 | Where we clean | `TagCloud` `groups` | drafted 🟢, shared data |
| 15 | FAQs (10, one block) | `Faq` | drafted, 4 **pending confirmation** 🟢 |
| 16 | Closing block | `CallToAction` `secondary` | drafted 🟢 |
| — | Site chrome | `SiteFooter` | |

**No component changes needed**, same as the end-of-lease page. This is also
the first page to use `Callout` `tone="warning"`, the charcoal panel
`SECTIONS.md` reserves for "don't do this" rather than "worth knowing". It has
been in the library unused; section 7 is what it was built for.

### One deliberate omission: no video slot

Every sibling page carries a reserved `VideoFeature`. This one does not,
because the **hero image is also a reserved slot** and two large empty frames
above and below the fold make the page read as unbuilt rather than
unphotographed. Add one when there is real footage.

---

## 1. Hero 🟢 drafted, **image blocked**

Standard configuration: `split-single-image`, image right,
`imageFit="contain-bottom"`, `ratio="16/9"`.

### ⚠️ The only hero on the site with no photo

The library has **no mould photography of any kind**, and nothing in it
honestly depicts this service. The homepage's cut-out cleaner would work
technically and would make this page look like the homepage, which is worse
than an honest empty frame. So the slot is reserved and labelled.

This is the correct state per IMAGE-GUIDELINES.md section 6, and it is **not a
state to launch in**. The hero prompt is the first item in
[`IMAGE-PROMPTS.md`](../src/assets/home_cleaning/inside_your_home/mould_cleaning_and_removal/IMAGE-PROMPTS.md).

The H1 runs two lines and states the page's whole position in twelve words.
The lead then does the thing a competitor's hero will not: it says out loud
that cleaning alone does not keep mould away. That is a strange thing to lead
with commercially, and it is the right thing to lead with here, because the
alternative is a promise the business cannot keep and the BFD forbids.

---

## 2. Trust bar + definition 🟢 drafted

Shared `Backdrop` at `opacity={75}`, `focus="top"`, `trustBarCards` from
`src/data/trust.ts`. Identical to every sibling page, no new exposure.

The definition is written to BFD section 3.6.2: sentence one defines mould
mechanically (what it is, what it needs), sentence two is a semantic triple
naming the entity and service area. **The definition is deliberately
mechanical, not medical** — see constraint 1.

Paragraph two settles terminology the way the end-of-lease page settles bond
clean versus end of lease clean, and then does something more useful: it draws
the line between removing growth and fixing the cause, which is the argument
the whole page rests on.

---

## 3. Situation cards 🟢 drafted, two images blocked

| Card | Title | → |
|---|---|---|
| 1 | It's in the bathroom and it looks awful | `/quote/` |
| 2 | I'm moving out and there's mould | `/end-of-lease-cleaning/` |
| 3 | It keeps coming back | `#moisture` (section 8) |

Card 3 is why the page is written the way it is. Someone whose mould keeps
returning **has usually already paid someone to clean it**, and is the visitor
most likely to be cynical about a cleaning company's promises. The page earns
that reader by agreeing with them.

`#moisture` sits on a wrapper `<div>`, the same anchor pattern the sibling
pages use for `#compare`, because `TextBlock` takes no `id` prop.

Card 2 reuses the deep-cleaning folder's moving-out-day photo, which honestly
shows what that card is about. Cards 1 and 3 are reserved slots.

**Card 2 is quietly the commercially smartest thing on the page**: mould found
during a move is a bond-clean booking, and it links straight to the page that
takes it.

---

## 4. Where it turns up 🔒 drafted, pending confirmation

`columns={2}`, six `text` cells: bathroom ceilings and cornices · silicone,
grout and shower seals · window reveals, sills and tracks · wardrobes,
cupboards and behind furniture · walls, ceilings and painted surfaces · what
we look at while we are there.

Same shape as the inclusions grids on the two sibling pages, so all three read
as one company's standard.

**The copy describes WHERE and WHAT, never HOW.** No product names, no
methods, no dilutions. See constraint 1 and section 7.

### 🔒 Two cells make operational commitments

1. **Silicone and grout.** The copy says some cleans up and some has failed and
   needs replacing, and that TLB tells the client which. That is a judgement
   made on site by whoever is there. Confirm the team is comfortable making it.
2. **Walls and painted surfaces.** The copy says TLB declines to clean the face
   of paint that is lifting or soft, because the moisture is behind it. That is
   TLB turning down billable work on principle. Confirm that is the policy.

Cell 6 ("what we look at while we are there") is carefully hedged: *"Not an
inspection and not a report, just a set of eyes and an honest answer."* That
wording is load-bearing. It keeps a helpful observation from reading as a
building assessment TLB is not qualified to give. **Do not tighten it into
something that sounds more professional.**

---

## 5. Outside the clean, and when we hand it on 🔒 drafted

`Callout` `tone="note"`, two paragraphs.

Paragraph two is the page's commercial boundary and the block **most likely to
be softened by someone who wants the page to sell harder.** Resist that. A
cleaning company that quietly takes a leak-driven or in-cavity mould job is
selling a clean it knows will fail within a month, which is a bad outcome and,
under BFD section 5.3, a claim problem.

It names the trades to call (plumber, builder, licensed remediation
specialist). That is deliberate: telling someone the job is not yours without
telling them whose it is reads as a brush-off rather than as advice.

The closing line, *"we would rather lose the job than take it"*, is the single
most on-brand sentence on the page. BFD section 1.7 calls the personality
"quietly confident" and section 2.2 calls the positioning "trust earned, not
advertised". A business that turns work away in public is demonstrating both
rather than asserting them.

🔒 Confirm TLB actually operates this way before it ships.

---

## 6. Why it happens here 🟢 drafted

`columns={3}`: the humidity · houses that get shut up · bathrooms with nowhere
for the steam to go.

The local section, and a genuine differentiator against a national platform
running one generic mould page for eleven cities (BFD section 1.5, competitive
context). Every claim is about **climate and buildings**, which is observable
and uncontroversial. Nothing about health, nothing about risk.

The `lead` is doing quiet work: *"This is a mould climate. It is not a
reflection on how you keep your house."* Shame is the real barrier on this
service, the same way it is on the deep-clean page, and one sentence removes
it.

### ⚠️ The 2022 floods are deliberately not mentioned

Flood-affected mould is a remediation job that section 5 explicitly refers
out. Raising floods here would invite exactly the enquiry the page says it will
not take, in a region where that event is still raw for a lot of people. **Left
out on purpose, not by oversight.** Do not add it, and do not commission
imagery that implies flood work.

---

## 7. What not to do first 🟢 drafted, **do not expand**

`Callout` `tone="warning"`, the charcoal panel. First use of this variant on
the site.

**Strictly limited to two things**, both well documented, neither a method:

1. Do not dry-brush, dry-scrape or dry-vacuum it. Disturbing it dry spreads it.
2. Never mix bleach with ammonia or other cleaners. It produces a dangerous
   gas, and the risk is real in a small closed bathroom.

Number 2 is here because "mould" and "bleach" are the two words most likely to
appear together in a search that lands on this page, so the warning meets a
reader who was already going to do it.

### ⚠️ Do not turn this into a how-to

BFD section 5.3 bars advice that could cause harm if followed incorrectly, and
a mould-removal method published by a cleaning company is precisely that. **No
products, no dilutions, no PPE instructions, no technique.** If someone wants
the job done, the answer is to book it, which is also the commercially correct
answer.

The closing paragraph asks the reader to leave it alone rather than attack it,
and gives the honest reason: a scrubbed-through surface is a harder job
afterwards, not an easier one.

---

## 8. Why it comes back 🟢 drafted

`TextBlock` `light`, three paragraphs, anchored `#moisture`. The honest centre
of the page and the reason it cannot make a competitor's promise.

The structure is deliberate and worth preserving: the problem, then the free
fixes, then the paid ones.

Paragraph two matters most. Run the fan for twenty minutes rather than two,
open the room on a dry day, pull the wardrobe off the wall, stop drying washing
in a closed room. **These are things a visitor can do for nothing, published by
the business that would profit from them not knowing.** That is the "use proof,
not adjectives" instruction in BFD section 4.5 applied to advice.

Paragraph three sends the reader to a plumber, electrician or builder, and says
outright that spending money there beats spending it with TLB again.

**Never soften any of this into "and then it is gone for good".**

---

## 9. Comparison table 🔒 drafted, pending confirmation

`cornerLabel` "Which one you need". Three columns: Mould clean (highlighted) ·
Deep clean · Specialist remediation. Five rows, including two the sibling
tables do not have: **"Does it fix the cause"** and **"Will it come back"**.

### The third column is not a TLB service, and that is the point

A visitor whose problem is in that column needs to recognise themselves there
and go elsewhere. A table listing only the two services TLB sells would quietly
imply TLB covers everything, which is the exact impression constraint 3 exists
to prevent.

The footnote does the emotional work the table cannot: *"a bathroom ceiling
cleaned properly once or twice a year is a normal way to live in a house on
this coast."* Without it the table reads as a list of ways TLB might not be
able to help.

🔒 Confirm the first column, particularly "Does it fix the cause" and "Will it
come back", both of which state TLB's limits in public.

---

## 10. On the health question 🟢 drafted, **do not expand**

`TextBlock` `muted`, two short paragraphs. The block that keeps the page inside
BFD section 5.3. See constraint 1.

It says plainly that a cleaning company is not who should answer this, names
NSW Health, Queensland Health and the reader's GP, and stops.

⚠️ **The two authority links are not in the build.** Same reasoning as the
end-of-lease page's regulator links: BFD section 3.3 asks for authoritative
external sources, both belong here, and a bare outbound link from a service
section is a worse pattern than none until there is a guides section around
it. **This one is more worth chasing than the end-of-lease equivalent**,
because naming a health authority without linking to it is weaker than naming
a regulator without linking to it. Revisit when `/guides/` exists, or add the
links directly if TLB is comfortable linking out from a service page.

---

## 11. Before and after 🟢 media blocked

Four reserved slots: two pairs (bathroom ceiling and cornice, window reveal and
sill).

**Never generate these.** IMAGE-GUIDELINES.md section 7 bars fake before/after
pairs implying a specific job, BFD section 5.2 requires them to come from
genuine TLB jobs with permission, and the section is headed "Real TLB mould
cleans".

⚠️ **Consent bar is higher here than anywhere else on the site.** A mould photo
says something about how a specific home has been kept. Ask plainly, take a no
gracefully, keep the frame tight on the surface, nothing identifying in shot.

---

## 12. Booking 🟢 drafted, one flag

`TextBlock` `dark`, three paragraphs, second CTA.

Paragraph two asks for a photo with the enquiry, which is genuinely the right
mechanic for this service: the difference between spotting along a cornice and
a wall that has gone through is obvious in a photo and impossible to describe.
It also lets TLB decline a job before anyone books a day, which is section 5's
promise made practical.

🔒 **[CONFIRM] the booking flow actually accepts a photo.** The claim is only
as good as the form behind it.

Paragraph three commits to telling a client early and at no cost when the job
is bigger than a clean. Confirm alongside section 5.

---

## 13. Testimonials 🟢 blocked

Two `[TBC]` slots, `uniform`, site-wide convention. BFD sections 5.2 and 3.6.3
prohibit fabrication; IMAGE-GUIDELINES.md section 7 prohibits generating a
face. **Never fill these in.**

1. A client whose bathroom mould was cleaned and stayed manageable, ideally
   where a ventilation change was part of it, because that is the page's
   actual argument.
2. **A client who was told they needed a builder or plumber rather than a
   cleaner.** This is the unusual one and it is worth asking for specifically.
   That quote is worth more on this page than any before-and-after, because it
   is the only thing that proves the promise the rest of the page makes. If
   Teagan can produce it, this page's central claim stops being a claim.

---

## 14. Where we clean 🟢 drafted

`locationGroups` from `src/data/locations.ts`. Inherits that file's open
questions, introduces none.

---

## 15. FAQs 🟢 ten questions, one block

One accordion, matching the two sibling pages. Written to BFD section 3.5's 40
to 80 word self-contained answers.

Two answers are compliance-critical and must not be softened:

- **FAQ 1, "Will the mould come back after you clean it?"** Answer opens "If
  the moisture that grew it is still there, yes."
- **FAQ 2, "Is mould in my home a health risk?"** Answer opens "That is not a
  question a cleaning company should be answering, so we do not", then names
  the health authorities. Characterises nothing.

FAQ 3 ("Can you get rid of mould permanently?") answers "Not by cleaning, and
nobody can", which is both true and a quiet correction of every competitor page
in the category.

**Four carry confirmations:**

| # | Question | What needs confirming |
|---|---|---|
| 5 | What if the job turns out to be too big for a clean? | The referral position and the "at no cost" promise. **Same fact as section 5** — keep in step. |
| 6 | Can you clean black mould out of shower silicone? | The silicone position. **Same fact as section 4** — keep in step. |
| 8 | Can you do the mould as part of a bond clean? | Whether mould work is quoted **with** a bond clean or included **in** it. The answer implies quoted alongside, which is the safer reading. |
| 9 | Do you bring your own products and equipment? | Product range, and the commitment to work with a client's sensitivities. |

FAQ 4 ("How do I know if it is surface mould or something worse?") is the most
useful answer on the page and carries no confirmation, because everything in it
is observable by the reader: bubbling paint, soft plaster, a musty smell with
nothing visible, growth that returns after cleaning. Worth keeping intact.

---

## 16. Closing block 🟢 drafted

`CallToAction` `secondary`. Repeats the page's position rather than a promise,
including that the answer might be "you need a trade rather than a cleaner".
The only close consistent with everything above it.

---

## Open items

**Needs Teagan's sign-off, in priority order:**
1. **Constraint 3, the scope line.** Does TLB do only surface work? If it does
   more, or holds a credential, the page's framing is wrong at the foundation
   and needs rewriting rather than patching. Everything else depends on this.
2. **Section 5 and FAQ 5, the referral position** and the "at no cost, we would
   rather lose the job" promise.
3. **Section 4 and FAQ 6, the silicone and painted-surface positions.**
4. **Section 9's first column**, especially the two limit-stating rows.
5. **FAQ 8**, mould quoted with or included in a bond clean.
6. **Section 12**, whether the booking form accepts a photo.
7. **FAQ 9**, product range and client sensitivities.

**Must not change without a deliberate decision:**
- No health claims (section 10, FAQ 2). Deferral is the position.
- No permanence claim (section 8, FAQ 1, FAQ 3, the table's "Will it come
  back" row).
- Section 7 stays two warnings, never a method.
- No flood imagery or flood copy (section 6).

**Worth adding:**
- Outbound links to NSW Health and Queensland Health in section 10 and FAQ 2.
  More worth chasing than the end-of-lease page's regulator links.

**Media needed, and this page is the worst off on the site:**
- **The hero.** The only hero anywhere with no photo. Prompt written.
- Two pathway card photos (bathroom cornice spotting, window condensation).
  Prompts written.
- Four before/after photos, real jobs, written permission, higher privacy bar
  than any other page.
- Two testimonial avatars, monogram until real clients supply real photos.
- A video, eventually, and only once the hero is filled.

All prompts and the photography brief:
[`IMAGE-PROMPTS.md`](../src/assets/home_cleaning/inside_your_home/mould_cleaning_and_removal/IMAGE-PROMPTS.md),
including the tension that sheet has to resolve: the library house style is
"bright, optimistic, calm and finished", which is the exact opposite of what a
photograph of mould looks like.

**Inherited, not introduced here:**
- Placeholder canonical domain, `trust.ts`'s two unsourced numbers,
  `locations.ts`'s missing town pages, guessed `/quote/` and `/book-online/`
  URLs.

**Not verified in a browser.** `astro check` reports 0 errors and the build
passes at 8 pages. Rendered HTML checked for every section, a single `<h1>`,
sentence-case `<h2>`s, and zero em dashes and zero exclamation marks in the
visible copy (BFD section 3.2). **`Callout` `tone="warning"` has never been
rendered on this site before**, so section 7's charcoal panel is the one thing
here genuinely worth looking at in a browser before launch.
