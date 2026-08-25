# Brand style input — colors & typography

Fill in the blanks below. Once approved, these values get applied to
**Layer 1** of [`src/styles/tokens.css`](../src/styles/tokens.css) — the
raw brand primitives — and nothing else. Per that file's own rule (and
[`SECTIONS.md`](../SECTIONS.md)'s "re-skin a brand = replace this one
file"), Layer 2 semantic roles and every component in `src/components/`
stay untouched. Filling this out is the only input needed to re-skin the
whole site.

Current values in `tokens.css` are placeholders carried over from the
previous brand (the file literally comments `--tlb-primary` as "was Maple
yellow") — none of this is final TLB branding yet.

---

## Colors

### Registered palette (from brand guideline)

| Name | Hex | RGB | CMYK | Guideline group |
|---|---|---|---|---|
| Dark Teal | `#234B51` | R35 G75 B81 | C86 M56 Y55 K37 | Primary |
| Teal | `#50AB8D` | R80 G171 B141 | C69 M11 Y55 K1 | Primary |
| Mint Green | `#7FC282` | R127 G194 B130 | C53 M2 Y65 K0 | Secondary |
| Cream | `#EBE1C7` | R235 G225 B199 | C7 M9 Y22 K0 | Secondary |
| Off White | `#F4EFE3` | R244 G239 B227 | C3 M4 Y10 K0 | Secondary |

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

| Role | Token | Current placeholder | Registered hex |
|---|---|---|---|
| Primary | `--tlb-primary` | `#FDC200` | **`#234B51`** (Dark Teal) |
| Secondary | `--tlb-secondary` | `#8CC62F` | **`#50AB8D`** (Teal) |
| Accent | `--tlb-accent` | `#61CE70` | **`#7FC282`** (Mint Green) |

Cream and Off White don't have a `--tlb-*` slot of their own yet — since
their use is flexible (background *and* body text, per above) rather than
one fixed role, which Layer 2 token(s) actually read them (`--color-body`,
`--color-surface-muted`, a new inverse-body-text role, etc.) is a
per-component wiring decision to make when this gets applied, not
something to lock in here.

⚠️ **Not covered by the brand bible — stay at their current placeholder
value until a value is supplied:** `--tlb-charcoal`, `--tlb-blue-dark`,
`--tlb-grey`, `--tlb-white`, `--tlb-black`, `--tlb-violet`, `--tlb-orange`,
`--tlb-cyan`, `--tlb-cyan-dark`. These still exist in `tokens.css` and
several are load-bearing (e.g. `--tlb-grey` drives `--color-body`, the
default body-text color on light backgrounds) — removing them from this
doc means "no brand-bible input yet," not "delete from the codebase."

⚠️ **Accessibility note (still applies once body-text color is decided):**
whichever color ends up driving `--color-body` needs a contrast check
against whatever background it sits on — 4.5:1 minimum for normal-size
text (WCAG AA). The current placeholder grey (`#7A7A7A`) only reaches
4.29:1 on white and already fails this; see `tokens.css`'s own comment and
`SECTIONS.md`'s "Accessibility note" for the pending fix on that specific
value.

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
   the current placeholder value.
2. Registered hexes with a `--tlb-*` slot map 1:1 to **Layer 1** at the top
   of `src/styles/tokens.css` — nothing in Layer 2 (`--color-brand`,
   `--color-on-surface`, etc.) needs to change there, since Layer 2 already
   points at Layer 1 by reference. Cream and Off White are the exception:
   with no fixed role (they're usable as background *or* body text per the
   note above), which Layer 2 token(s) actually reference them gets decided
   per-component at implementation time, not locked in here.
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
