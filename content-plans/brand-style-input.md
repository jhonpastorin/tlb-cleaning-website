# Brand style guide — colors & typography

**Status: applied.** Every registered value below is live in **Layer 1** of
[`src/styles/tokens.css`](../src/styles/tokens.css) — the raw brand
primitives — and nothing else was touched to get it there. Per that file's
own rule (and [`SECTIONS.md`](../SECTIONS.md)'s "re-skin a brand = replace
this one file"), Layer 2 semantic roles and every component in
`src/components/` stayed untouched.

This doc started as a fill-in-the-blanks intake form against the previous
brand's placeholders; it now reads as the record of what the brand is and
where each value lives. One registered colour (Teal) is still unwired —
called out under "Token registration" below. The warning flags further down
are the open questions that outlived the colour swap, not stale intake notes.

---

## Colors

### Registered palette (from brand guideline)

| Name | Hex | RGB | CMYK | Layer 1 slot |
|---|---|---|---|---|
| Dark Teal | `#234B51` | R35 G75 B81 | C86 M56 Y55 K37 | `--tlb-dark-teal` |
| Teal | `#50AB8D` | R80 G171 B141 | C69 M11 Y55 K1 | `--tlb-teal` |
| Mint Green | `#7FC282` | R127 G194 B130 | C53 M2 Y65 K0 | `--tlb-mint-green` |
| Cream | `#EBE1C7` | R235 G225 B199 | C7 M9 Y22 K0 | `--tlb-cream` |
| Off White | `#F4EFE3` | R244 G239 B227 | C3 M4 Y10 K0 | `--tlb-off-white` |

**Every slot is named for the colour it holds** — `--tlb-dark-teal` is Dark
Teal and nothing else. Roles ("the brand band", "ink on light surfaces")
live in Layer 2, which references these by name; the slots themselves say
nothing about where a colour is used, so reassigning a role never leaves a
slot name lying about its contents. The three slots that used to be named
for roles (`--tlb-dark-teal`, `--tlb-teal`, `--tlb-mint-green`) were renamed
to `--tlb-dark-teal`, `--tlb-teal` and `--tlb-mint-green`.

**Usage is flexible, not fixed per color:**
- Primary and Secondary aren't locked to one background-or-foreground role
  each — either can serve as a background fill or as text/foreground color
  depending on the section, the same color flipping between "ink" and
  "paper" in different places.
- Cream and Off White are specifically registered as available **body-text
  colors** as well as background fills — e.g. body copy set in Cream or
  Off White on a Dark Teal section, not just as a light panel background.

### Token registration (where each hex slots into `tokens.css`'s Layer 1)

Only colors that actually appear in the brand bible are registered below —
the old placeholder rows for tokens the guideline doesn't cover (charcoal,
focus-ring navy, body grey, white, black, and the legacy violet/orange/cyan
values) have been removed rather than left as unresolved blanks.

| Slot | Renamed from | Was (previous brand) | Registered hex | Live? |
|---|---|---|---|---|
| `--tlb-dark-teal` | `--tlb-dark-teal` | `#FDC200` | **`#234B51`** (Dark Teal) | applied |
| `--tlb-teal` | `--tlb-teal` | `#8CC62F` | **`#50AB8D`** (Teal) | applied, **unwired** |
| `--tlb-mint-green` | `--tlb-mint-green` | `#61CE70` | **`#7FC282`** (Mint Green) | applied |
| `--tlb-cream` | — (new slot) | — | **`#EBE1C7`** (Cream) | applied |
| `--tlb-off-white` | — (new slot) | — | **`#F4EFE3`** (Off White) | applied |

Cream and Off White got `--tlb-*` slots of their own after all, rather than
being wired straight into Layer 2 per-component. What reads them today:

| Layer 1 | Read by (Layer 2) |
|---|---|
| `--tlb-dark-teal` | `--color-brand`, `--color-on-surface`, `--color-inverse`, `--color-btn-hover-bg` |
| `--tlb-teal` | **nothing** |
| `--tlb-mint-green` | `--color-accent` |
| `--tlb-cream` | `--color-surface-muted` |
| `--tlb-off-white` | `--color-surface`, `--color-on-brand`, `--color-on-inverse`, `--color-btn-hover-text` |

⚠️ **Teal (`#50AB8D`) is registered but not wired.** No Layer 2 role reads
`--tlb-teal`, so it has zero visible effect on the site right now — the
dark/light identity is carried entirely by Dark Teal + Off White, with Mint
Green as the small accent. If Teal is meant to
do real work (a second band colour, a hover/active state, a mid-tone panel),
that's a Layer 2 wiring decision still to be made; it won't appear on its
own just by sitting in Layer 1.

Body-text colour on light surfaces is now resolved: `--color-body` reads
`--tlb-dark-teal` (the placeholder `--tlb-grey` it used to read has been
deleted — see below). Cream/Off White's registered "body text on Dark Teal"
use is served by `--color-on-inverse` (Off White) rather than a dedicated
inverse-body role.

**Deleted — not TLB colours:** `--tlb-charcoal` (`#2E2E2E`), `--tlb-grey`
(`#7A7A7A`) and `--tlb-violet` (`#926DB0`) are gone from `tokens.css`.
Charcoal and violet had no consumers at all. Grey had exactly one,
`--color-body`, which now reads `--tlb-dark-teal` instead — a visible change
(all body copy on light backgrounds went from grey to Dark Teal) and the fix
for the contrast failure noted below.

⚠️ **Still previous-brand placeholders, kept for now:** `--tlb-blue-dark`
(`#1F2230`, drives `--color-focus-ring` — load-bearing, needs a TLB value
before it can go), plus `--tlb-white`, `--tlb-black`, `--tlb-orange`,
`--tlb-cyan` and `--tlb-cyan-dark`, which have no consumers and are only
still there because they weren't named for removal. Layer 2 also holds one
raw placeholder of its own: `--color-border-muted` (`#D8D8D8`), a literal
rather than a Layer 1 reference.

✅ **Accessibility note — resolved.** `--color-body` needed a contrast check
against the backgrounds it actually sits on (4.5:1 minimum for normal-size
text, WCAG AA). The old placeholder grey `#7A7A7A` measured **3.74:1 on Off
White** and **3.51:1 on Cream** — both AA failures. (The 4.29:1 figure this
doc and `SECTIONS.md` used to quote was measured against *pure white*, which
this site never uses as a page background, so the real numbers were worse
than the ones being flagged.) Dark Teal `#234B51` measures **8.33:1 on Off
White** and **7.34:1 on Cream**: AA at every size, AAA at normal size. The
`#6E6E6E` alternative that was pending sign-off is moot — it's not a TLB
colour either.

---

## Typography

| Role | Token | Current placeholder | New font |
|---|---|---|---|
| Display / headings | `--font-display` | `'Montserrat'` | **`'Poppins'`** |
| Body copy | `--font-body` | `'Nunito Sans'` | **`'Roboto'`** |
| Buttons | `--font-button` | `'Montserrat'` | **`'Poppins'`** |

Per the guideline: **Poppins Bold** → headlines, titles, and CTAs (covers
`--font-display` and `--font-button` both, since CTAs are named
explicitly). **Roboto Regular** → subtitles, subheadlines, subcopy, and
body (covers `--font-body`).

### Weights (fill in only if they should change from current)

| Role | Token | Current | New |
|---|---|---|---|
| Body | `--weight-body` | `400` | **`400`** (Roboto Regular) |
| Heading | `--weight-heading` | `600` | **`700`** (Poppins Bold, per guideline) |
| Bold | `--weight-bold` | `700` | `700` (unchanged — already Bold) |
| Button | `--weight-button` | `600` | **`700`** (Poppins Bold — guideline names CTAs explicitly) |

⚑ The guideline only names one weight per font (Poppins **Bold**, Roboto
**Regular**) — it doesn't say whether Poppins is also used at a lighter
weight anywhere non-bold headings might want, or whether Roboto Bold is
needed for emphasis within body copy. Flagging rather than assuming a
second weight per font isn't needed; confirm before this ships.

If any new font isn't a system font already available, name the source too
(e.g. Google Fonts) so it can be loaded — a font name alone with no source
can't be applied.

| | |
|---|---|
| Font source (if new fonts named above) | **Google Fonts** — Poppins, Roboto. This site self-hosts fonts via `@fontsource` rather than a Google Fonts CDN link (see [`src/styles/fonts.css`](../src/styles/fonts.css)), so applying this also means installing `@fontsource/poppins` (700) and `@fontsource/roboto` (400) and swapping the `@import` lines in that file — not just editing `tokens.css`. |

---

## How this gets applied

1. Fill in every field you want changed above; leave the rest blank to keep
   the current placeholder value. (Steps 1-4 have been carried out for the
   colours and typography registered above — they're kept as the procedure
   for the next change, not as outstanding work.)
2. Registered hexes map 1:1 to **Layer 1** at the top of
   `src/styles/tokens.css` — nothing in Layer 2 (`--color-brand`,
   `--color-on-surface`, etc.) needs to change there, since Layer 2 already
   points at Layer 1 by reference. Cream and Off White were given their own
   Layer 1 slots (`--tlb-cream`, `--tlb-off-white`) and then referenced from
   Layer 2 like any other primitive, rather than being inlined per-component
   as this doc originally left open. A colour only becomes visible once some
   Layer 2 role references it — which is exactly why Teal is still invisible.
3. Swapping to Poppins/Roboto also means updating
   `src/styles/fonts.css`'s `@fontsource` imports (and running
   `npm install @fontsource/poppins @fontsource/roboto`) — a `tokens.css`
   font-family change alone won't load the new font files.
4. No component file (`src/components/ui/`, `src/components/sections/`)
   changes as part of this — if a color or font doesn't show up somewhere
   after the swap, that's a sign the relevant component isn't reading the
   token it should, not something to patch by hand-editing that component's
   own styles.
5. Secondary and the "unused" colors above only take visible effect once
   they're wired into a Layer 2 role or a component prop — note where each
   one should apply if it's meant to do more than sit in reserve.
