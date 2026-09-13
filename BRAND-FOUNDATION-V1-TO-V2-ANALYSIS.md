# Brand Foundation v1.0 to v2.0: what changed, and why it matters

Comparison of `TLB Cleaning - Brand Foundation OLD.md` (v1.0, July 2026, 572 lines)
against `TLB Cleaning - Brand Foundation NEW.md` (v2.0, September 2026, 635 lines).

**This is not a revision. It is a replacement.** A line-level diff reports the two
files as almost entirely different text. Every section number has been reassigned,
the document is now organised into four parts instead of five flat sections, and
the central positioning claim has been reversed. Treat v1.0 as superseded in full.

**Verdict on the website:** the site is currently built against a mix of both
documents. The homepage, `src/data/trust.ts` and `src/data/locations.ts` already
match v2.0. Roughly thirty other pages, `src/data/comparison.ts`, and all nine
files in `content-plans/` still carry v1.0 framing. The remediation plan is in
[WEBSITE-UPDATE-PLAN-BFD-V2.md](WEBSITE-UPDATE-PLAN-BFD-V2.md).

---

## 1. The headline change: the mother-led framing is demoted

This is the single most consequential change, and it invalidates more published
copy than everything else combined.

| | v1.0 | v2.0 |
|---|---|---|
| Brand essence | "a team of local mothers from the Northern Rivers and Southern Gold Coast region who bring the same care to your home... that they bring to their own" (§1.1) | "a Northern Rivers cleaning company. Local team, run properly. Easy to book, and managed for you." (§1.1) |
| Core value #1 | "**Family first.** Our business is built by mothers, for families." (§1.3) | "**Local and embedded.** Everyone who works for TLB lives here." (§2.3) |
| Differentiator #1 | "A local team of mothers, not a faceless brand" (§1.5.1) | "Local and Embedded, Professionally Run" (§3.1) |
| Approved phrase | "Say 'our local mums' or 'our team of local mothers' when telling the brand story. Use it with pride." (§2.3) | "**Not** 'our local mums' or 'our team of local mothers' in positioning copy." (§9.3) |
| Sample headline | "Local mums who clean your home like it's their own." (§4.1) | Listed as the **wrong** example in §15.2 |

v2.0 states the reasoning plainly in its own changelog: the mother-led framing
"describes the workforce rather than what a client gets."

v2.0 does not delete the story. It relocates it. §2.2 gives it an explicit
allow-list and deny-list:

**Where it belongs:** the about page, the team section, social content,
recruitment copy, long-form origin pieces, local press and award submissions.

**Where it does not belong:** homepage headline or subheadline, service page
positioning, ad copy, trust bars and proof points, and anywhere it substitutes
for saying what a client actually gets.

---

## 2. The "nine full-time staff" claim is withdrawn as inaccurate

v1.0 leaned on this figure hard and repeatedly, treating it as the backbone of
every capacity and reliability claim:

- §1.3: "Nine full-time staff, established real estate agency contracts..."
- §1.5.2: "TLB grew to nine full-time staff and secured contracts with major real estate agencies"
- §1.7: "a professional operation with nine full-time staff and agency-grade standards"
- §3.6.4 held it up as the model of factual precision: "Use specific facts (e.g. 'TLB's team of nine full-time cleaners')"
- §4.1 built a headline on it: "Nine full-time cleaners. One reliable partner for your rent roll."
- §4.5: "Nine full-time staff, agency contracts and a word-of-mouth reputation are the backbone of every trust claim. Repeat them concretely and often."

v2.0 §2.4: "**Never claim** that the team is employed full-time. It is not
accurate and it has been removed from all page copy."

That last clause is not yet true of this repository. The claim is still live in
`src/data/comparison.ts` and on at least six pages.

**Open question this creates.** v2.0 withdraws *full-time*, but is silent on
whether cleaners are *employed rather than subcontracted*. The site argues the
employed-not-subcontracted distinction on roughly a dozen pages, and on the
compliance-heavy pages (aged care, schools, medical, strata) it is load-bearing
for the screening and Award-rates arguments. v2.0's verified-facts table does not
list it either way. This needs a ruling before those pages can be corrected.

---

## 3. Pricing moves from defensive to certainty-based

v1.0 had no explicit pricing position and no banned vocabulary. v2.0 §3.2
introduces both.

**Banned outright, in either direction:** cheap, budget, affordable,
competitive rates, premium. The stated reason is that each "signals in a
direction we do not want."

**The replacement position:** "You know the price before we start, not after."
Quotes on the actual property rather than a guess. No lock-in, no minimum term,
no exit fee.

**The proof move:** volunteering that a client needs less than they asked for.
§3.2 and §4.6 both make the same point, that recommending a deep clean followed
by a fortnightly (rather than a long first regular clean) costs revenue and buys
more trust than it costs.

"Cost effective" survives, but only when attached to a reason.

§15.3 names the specific v1.0-era sentence being killed: "We're not the cheapest,
but you get what you pay for," on the grounds that it "puts the word cheapest in
the reader's head."

---

## 4. A hard new rule on competitor framing

This is a genuinely new constraint with no v1.0 equivalent, and it is the second
largest source of rework after the mums framing.

v1.0 §1.5 was *built* on competitor contrast. Every one of its six differentiators
used a Problem / Impact / Differentiator structure where the Problem was an
explicit characterisation of what franchises and platforms do badly. It named
Clean4You and Jim's in strategy sections and told writers to position against
"faceless national franchises and platforms" (§2.2).

v2.0 §9.4: "**Prose says what TLB does and does well. Comparisons live in a
comparison table, never in body copy.**"

Explicitly prohibited in running text: "nobody turns up", "you have to choose",
and any characterisation of what a national brand or independent cleaner fails
to do. The rationale: a page that spends its time on what other people get wrong
"sounds defensive, and invites the reader to wonder who we are arguing with."

Where a table is used, rows must stay neutral and factual. §9.4 gives the test:
"Whoever is rostered that day" is a fact. "They will let you down" is not.

§15.4 gives the worked rewrite: instead of "Unlike the big franchises, we actually
turn up," say nothing in prose and put a neutral row in a table.

A further softening in §10.2: never suggest an independent local cleaner does
worse work, "because the reader has probably had a good one," and because "in
this region that is a real person the reader knows."

---

## 5. Geography: inland first, and stop cherry-picking the coast

v1.0 said "the Northern Rivers and Southern Gold Coast" throughout and never
enumerated towns.

v2.0 §2.1 makes the region an identity rather than a service area, and issues a
direct instruction to writers: "**do not cherry-pick the coastal towns.** Naming
only Byron and Ballina reads as coastal and tourist-facing, and quietly tells
somebody in Casino, Murwillumbah or Evans Head that they are not the market."

It then publishes the full 56-town list in three named groups (28 Northern
Rivers, 19 Tweed, 9 Southern Gold Coast), and adds a note on why the Tweed is
listed separately: "Kingscliff, Pottsville and Tweed Heads are neither Northern
Rivers nor Gold Coast to anyone who lives there. Grouping them wrongly is the
kind of small error that tells a local you do not know the area."

The hierarchy is now explicit (§9.3): the Northern Rivers is the identity; the
Tweed and the Southern Gold Coast are extensions.

`src/data/locations.ts` already matches this list exactly, group for group and
town for town.

---

## 6. Teagan: credited, not fronted

New in v2.0 §2.2, with a stated commercial reason: "She is credited as the
founder, not fronted as the brand. TLB has to transcend one individual, for the
plain reason that a business dependent on one name cannot grow and cannot be sold."

Practical effect: §9.3 replaces the v1.0 CTA "Talk to Teagan and the team"
(v1.0 §2.4, and used in three of v1.0's nine sample messages) with "TLB" and
"our team."

---

## 7. New material with no v1.0 equivalent

### 7.1 A line and a supporting line (§1.3, §1.4)

v1.0 had no strapline. v2.0 has two, with placement instructions.

- **"Easy to book, instant pricing, cost effective."** Stated to appear "in the
  subheadline on every service page and as a section heading." It answers the
  three questions people have: is this a hassle, what will it cost, am I being
  overcharged.
- **"Managed for you."** Set day, set team, a reminder before, a message on the
  way, told first when something changes.

### 7.2 The business TLB is actually in (§1.5)

"Not cleaning. Nobody wants a clean house as such, they want to stop thinking
about the house." With an editing test: if a sentence is about cleaning rather
than about not having to think about cleaning, it is a feature rather than a
benefit.

### 7.3 Audience depth: three segments become five (Part Two)

v1.0 §4 covered three audiences in a flat pain-point format. v2.0 gives five
audiences a section each, in a consistent five-part structure (who they are,
what they actually want, what they worry about, what moves them, language that
works, language that fails).

| v1.0 | v2.0 |
|---|---|
| Busy local families and homeowners | §5 Households (now explicitly including older clients, people with a health condition, and households with support needs, folded into the same segment rather than split off) |
| Airbnb and short-stay hosts | §6 Holiday Let and Short-Stay Owners |
| Real estate agencies and property managers | §7 Real Estate Agencies and Property Managers (reframed as a **referral channel**, not an end client: "one good relationship is worth dozens of individual bookings") |
| *(none)* | §8 Commercial |
| *(none)* | Recruitment, addressed via §2.2's allow-list rather than a segment |

The most useful new material is the "language that fails" lists. §5.6 bans
"sparkling", "spotless", "transform your home", "your time is precious", anything
that sounds like a national franchise, and anything implying the reader's house
is currently a problem. §7.6 bans consumer language for property managers
outright: "They want compliance and speed."

§5.3 also names an emotional barrier v1.0 missed entirely: being judged,
"particularly for deep cleans and anyone who has let things go. This is a real
emotional barrier and it stops people booking."

### 7.4 Objection handling (§11)

Eight objections with supplied answers, intended for FAQs, sales conversations
and ad copy. Two carry unresolved `[CONFIRM]` markers that block publication:
§11.7 (what if they break something: the insurance position) and §11.8 (what if
I don't like the work: the actual re-clean policy).

### 7.5 The competitive picture (§10)

Three competitor types, each with a strength, a weakness, how TLB wins, and,
usefully, **the mistake to avoid**:

- **National brands and platforms:** do not position as the warm local
  alternative to slick technology, because that concedes convenience, "which is
  the thing most clients actually want."
- **Independent local cleaners:** win on continuity and cover, never on quality.
- **Regional multi-operator businesses:** win on published specifics, because
  "when two businesses look the same, the one with numbers and published detail
  wins."

Plus an internal-only framing line: "Easy like a national brand, local like the
person your neighbour recommended." Explicitly not a strapline. It is a test to
apply to any piece of copy: does this give away one half to claim the other?

### 7.6 Booking and systems (§13)

Entirely new, and it constrains copy. Connecteam is workforce management and
does not take public bookings. Phase one is a website quote calculator pushing
into Connecteam via the Jobs API or Zapier.

The constraint: "**Instant pricing works for regular cleans**... **It works badly
for deep cleans, bond cleans and commercial**, where condition drives the price
and a client's self-assessment is unreliable. So: instant price on regular
cleaning, fast quote on everything else."

### 7.7 Service definitions table (§4.6)

A four-row table separating deep clean, regular clean and end of lease across
what it is, the standard, when, and who decides it passed. v1.0 listed the
service names in a terminology bullet but never distinguished them.

### 7.8 Worked examples (Part Four, §15)

Six wrong/right pairs with the reasoning for each: the opening line, the team,
price, competitors, a deep clean, and holiday lets. v1.0 gave sample messaging
but never a wrong version.

### 7.9 The short version (§16)

Ten rules for anyone who will not read the rest.

---

## 8. What survives from v1.0, unchanged

Worth knowing, because these do not need re-auditing.

- **Voice:** warm, plain, direct, quietly confident. v2.0 §9.1 sharpens it into
  three named qualities (straight, warm, competent) but does not change it.
- **Mechanical style rules:** Australian English, active voice, sentence case
  headings, no exclamation marks, no em dashes, no Oxford commas, contractions
  encouraged, 15 to 20 word sentences, 3 to 4 sentence paragraphs, 150 to 250
  word sections. Identical in both.
- **Evidence standards:** no fabricated testimonials, case studies or statistics;
  no stock imagery presented as TLB's own work; before-and-afters from genuine
  jobs with permission and no identifying detail.
- **The guarantee position:** never claim bond-back or satisfaction guarantees.
  v1.0 §3.5 and §5.3 said it; v2.0 §2.4 and §12.2 say it more tersely.
- **The CTA set:** largely the same list, minus "Talk to Teagan and the team",
  plus "Meet the team". One primary CTA per page, repeated.
- **Terminology:** "your home", "your place", "your property". Never "the
  premises" or "the site" for a client's property.

---

## 9. What v1.0 had that v2.0 dropped

Not everything cut was wrong. These are worth a conscious decision rather than
silent loss.

| Dropped | Where it was | Assessment |
|---|---|---|
| The full GEO section (v1.0 §3.6, eight subsections on chunking, semantic triples, query fan-out, passage indexing) | §3.6 | **Partially replaced.** v2.0 §14 covers the same ground in about a fifth of the words and loses the operational detail: semantic triples, definition-style sentences, entity descriptors, the 150 to 200 word passage rule. Keep v1.0 §3.6 as a working SEO annexe. |
| Link policy and SEO requirements (descriptive anchor text, authoritative external sources, consistent terminology) | §3.3 | **Lost with no replacement.** Worth retaining as an annexe. |
| Page-structure conventions (trust strip, three-step booking section, suburb lists, FAQ on every service page, "match the structure, beat the substance") | §3.5 | **Lost with no replacement**, though the site already implements most of it. Worth retaining, with the competitor-benchmarking language stripped to comply with §9.4. |
| Compliance section (Australian Consumer Law, privacy, team consent, WHS, credentials) | §5.3 | **Lost with no replacement.** This is the one that matters legally. The privacy and team-consent rules in particular govern every testimonial and team photo on the site. Retain as an annexe. |
| Restocking detail: toilet paper, olive oil, fresh flowers | §1.5.3 | Softened in v2.0 §6.4 to "restocking handled". The specifics were good proof; confirm whether they are still accurate before reinstating. |
| Named demographics and buying behaviours (age bands, discovery channels, trial-then-convert patterns, "a single well-handled emergency clean can win an entire rent roll") | §4.2, §4.4 | Useful for media buying and funnel design even though v2.0's psychographic depth is better. Retain as an annexe. |
| Buyer-journey guidance: sell the recurring arrangement, not the one-off job | §4.5 | Lost. Still commercially sound. |

---

## 10. Rule-by-rule delta, for a copy audit

The checkable list. Everything here is a testable assertion about a page.

| # | v2.0 rule | § | Status vs v1.0 |
|---|---|---|---|
| 1 | No "local mums" or "local mothers" in positioning copy | 9.3 | **Reversed** |
| 2 | Mother-led story confined to about, team, social, recruitment, press | 2.2 | **New** |
| 3 | Never claim the team is employed full-time | 2.4 | **Reversed** |
| 4 | Never say cheap, budget, affordable, competitive rates, premium | 3.2 | **New** |
| 5 | No competitor characterisation in prose; comparisons only in tables | 9.4 | **New, and reverses v1.0 §1.5's whole structure** |
| 6 | Lead with the Northern Rivers; name inland towns, not only the coast | 2.1 | **New** |
| 7 | Group the Tweed separately from Northern Rivers and Gold Coast | 2.1 | **New** |
| 8 | "TLB" and "our team" in CTAs, never "Teagan and the team" | 9.3 | **Reversed** |
| 9 | "Easy to book, instant pricing, cost effective" on every service page | 1.3 | **New** |
| 10 | Instant price on regular cleaning only; fast quote on everything else | 13.2 | **New** |
| 11 | Volunteer that a client needs less than they asked for | 3.2, 4.6 | **New** |
| 12 | Sell not-thinking-about-it, not the clean itself | 1.5 | **New** |
| 13 | Never say sparkling, spotless, transform your home, your time is precious | 5.6 | **New** |
| 14 | No consumer language on agency and property-manager pages | 7.6 | **New** |
| 15 | Every service page carries one section that works as a standalone answer | 14 | **New** |
| 16 | Never imply a sole operator does worse work | 10.2 | **New** |
| 17 | No bond-back or satisfaction guarantee | 2.4, 12.2 | Unchanged |
| 18 | No em dashes, no exclamation marks, no Oxford commas, Australian English | 9.2 | Unchanged |
| 19 | No fabricated proof; real before-and-afters with permission | 12.2 | Unchanged |
| 20 | One primary CTA per page, repeated | 9.5 | Unchanged |

---

## 11. Claims v2.0 flags as unconfirmed

§2.4 ships a verified-facts table where most rows are *not* yet verified. These
are live on the site today. Each is a claim a competitor or the ACCC can ask TLB
to substantiate.

| Claim | v2.0 status | Where it is live |
|---|---|---|
| Local teams right across the Northern Rivers and the Tweed | Confirm teams are genuinely spread, not one team travelling | `src/data/trust.ts`, every page |
| 98% of our clients stay with us | Confirm the figure and the period it covers | `src/data/trust.ts`, every page |
| Cleaning five-star holiday lets across the region | Confirm, and that hosts are comfortable being referenced | `src/data/trust.ts`, every page |
| Preferred supplier for real estate agencies | Confirm whether formal arrangements or ongoing contracts, and match the wording | `src/data/trust.ts`, every page |
| Over 100 local homes, hosts and businesses | Confirm the number. Round down, never up | `src/data/trust.ts`, every page |
| Full Airbnb management available | Confirm what is included, and whether standard or on request | `/airbnb-cleaning/` |
| Police checked and insured | Confirm both before publishing | meta descriptions, appliance pages |
| Founded by Teagan Burke, Alstonville | **Confirmed** | `/about/` |
| Grown by word of mouth, without advertising | **Confirmed** | multiple |

Plus two `[CONFIRM]` markers inside §11 itself: the insurance position (§11.7)
and the re-clean policy (§11.8). v2.0 notes that on the insurance answer, "a
vague answer here loses the booking."

---

## 12. One thing to fix in v2.0 itself

The document's own title, line 3, reads **"TLB Cleanining"**. It should read
"TLB Cleaning". Worth correcting before this is circulated as the source of
truth for anything written in TLB's name.
