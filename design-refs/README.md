# Design reference

## Wireframe library

`wireframes/<section>/<variant>.<ext>` — one folder per section component in
`src/components/sections/`, one image per variant that component supports.
The filename **must match the component's `variant` prop value exactly**,
so there's a direct, unambiguous link between a dropped-in wireframe and the
code it drives:

```
design-refs/wireframes/hero/split-mosaic.png   ← Hero.astro variant="split-mosaic"
design-refs/wireframes/hero/centered.png       ← a new Hero variant, not yet built
design-refs/wireframes/story-mosaic/dark.png
```

If a section has only ever had one look (no `variant` prop exposed yet),
use `default.<ext>` until a second wireframe forces the prop into
existence.

Workflow when you attach a new wireframe:

1. Drop the image at `wireframes/<section>/<variant-name>.png` (pick the
   section from the `SECTIONS.md` inventory; coin a short kebab-case name
   for the variant if one doesn't exist yet).
2. Say which existing component it's a variant of (or that it's a new
   section entirely) — that's the only ambiguity a filename can't resolve
   on its own.
3. The component gets the new `variant` value added (never a forked file),
   and `SECTIONS.md` gets the variant documented in that component's table.

## Provenance: `hero/full-width-photo` and `hero/split-single-image`

Both wireframes were shared inline in chat (not as files on disk), so they
could not be copied into `wireframes/hero/` programmatically — same
situation as `maple-disability-support.png` below. Drop the originals in at
`wireframes/hero/full-width-photo.png` and `wireframes/hero/split-single-image.png`
to have them travel with the repo; nothing in the build depends on it.

The two wireframes were a side-by-side comparison labelled "A. Full-width
Photo Hero" (full-bleed photo, a small logo badge + headline + description +
CTA in a card over the top) and "B. Split Hero - Single Image" (one image
filling half the section, logo + headline + description + CTA in the other
half) — both using generic Lorem-ipsum/placeholder-icon wireframe-kit
content, not real copy. Built as `Hero.astro`'s `full-width-photo` and
`split-single-image` variants respectively; see `SECTIONS.md` for the prop
tables and usage.

## Provenance: `hero/split-collage` and `hero/minimal`

Also shared inline in chat, not saved to disk — same situation as the pair
above. Drop the originals in at `wireframes/hero/split-collage.png` and
`wireframes/hero/minimal.png` to have them travel with the repo.

The pair was a side-by-side comparison labelled "C. Split Hero - Carousel
Image" (copy on one side, a two-column collage of five images of varying
sizes on the other) and "D. Minimal Hero" (logo + headline + a longer body
paragraph + CTA, no image, described as "text-only hero for informational
pages") — again generic Lorem-ipsum/placeholder-icon wireframe-kit content.

Note on "C": its own title says "Carousel," but its visual and its
description ("Collage image on one side, text on the other") both show a
static grid, not a rotating carousel — confirmed with the wireframe's author
before building. Built as `Hero.astro`'s `split-collage` variant (static);
`minimal` covers "D." See `SECTIONS.md` for prop tables and usage.

## Provenance: `hero/minimal-stats`

Also shared inline in chat, not saved to disk. Drop the original in at
`wireframes/hero/minimal-stats.png` to have it travel with the repo.

Labelled "E. Data are Show" (sic) — centered logo badge, headline, a longer
body paragraph, a CTA, and a divided row of three stats (e.g. "300+
clients," "20+ branches," "70+ partnerships"), all generic Lorem-ipsum/
placeholder-icon wireframe-kit content. Same single-column, no-image layout
family as "D. Minimal Hero," just centered with a stat row added — so it's
covered by `Hero.astro`'s existing `minimal` variant plus its `align` and
`stats` props, not a new variant. See `SECTIONS.md` for the reasoning and
the prop table.

## Provenance: `service-blocks/*`

Five wireframes plus a `notes.txt` supplying the letter labels and
descriptions verbatim; the images themselves were shared inline in chat, not
saved to disk. Drop the originals in at `wireframes/service-blocks/<variant>.png`
to have them travel with the repo:

- `icon-grid.png` — "A. Icon Grid (3-4 columns)": icons with labels for
  services or features.
- `image-cards.png` — "B. Image + Text Cards": card-style blocks with image,
  title, description.
- `list.png` — "C. Service List Layout": stacked list of features or
  service offerings.
- `highlight.png` — "D. Highlight Box": one key feature or benefit in a
  standout block; "when clicked, it will be zoomed in and highlight the
  chosen service."
- `slider.png` — "E. Slider Type": the same standout-block idea, "but this
  time it's a slider."

All generic Lorem-ipsum/placeholder-icon wireframe-kit content. Built as
`ServiceBlocks.astro`'s five variants — see `SECTIONS.md` for the prop
tables, the reasoning on `image-cards`' footer-bar CTA, and why `highlight`
and `slider` stayed two variants instead of one configurable one.

## Provenance: `content-grid/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/content-grid/<name>.png`:

- `two-column.png` — "A. Two-Column Content Block": text on one side, image
  on the other. Two examples shown, mirrored (image-left/text-right and
  text-left/image-right) — the same array-order reuse test
  `StoryMosaic.astro` already passes. Deliberately duplicated as
  `ContentGrid.astro`'s `columns={2}` case rather than pointed back at
  `StoryMosaic` — confirmed with the wireframe's author, who wants all
  three "Grid Content" letters grouped under one component. See
  `SECTIONS.md` for that reasoning.
- `info-grid.png` — "B. Three-Column Info Grid": "balanced grid for
  features or benefits." Two examples: an asymmetric icon + wide-text row
  followed by a uniform icon/text/icon row, and that same icon/text/icon
  row shown again on its own. Both are the same grid engine at
  `columns={3}`, just a different `blocks` array — one uses a `span: 2`
  cell, the other doesn't.
- `mixed-media.png` — "C. Mixed Media Grid": "photos, icons, or stats in a
  flexible grid." Two examples showing the *same six cells* (a photo, a
  couple of decorative chart-style icons, plain text blocks) in two
  different orders — the clearest demonstration in this batch that the
  grid is genuinely just reading `blocks` in order.

All generic Lorem-ipsum/placeholder-icon wireframe-kit content. Built as
`ContentGrid.astro` — see `SECTIONS.md` for the prop tables, the four cell
types, and the inline-custom-property mobile-breakpoint gotcha found while
verifying it.

## Provenance: `photo/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/photo/<name>.png`:

- `band.png` — "A. Image Band with Overlay Text": "full-width image with
  short message." Built as `ImageBand.astro`, which is really just
  `Placeholder.astro`'s new `caption` prop (mirroring `VideoPlaceholder`'s
  existing caption bar) given section-level spacing.
- `gallery-grid.png` — "B. Photo Gallery Grid A": "multi-image layout." A
  plain responsive grid under a centered "Our Gallery" heading.
- `gallery-filmstrip.png` — "C. Photo Gallery Grid B": "multi-image layout
  displayed horizontally, where the selected frame appears larger than the
  rest. The chosen image expands dynamically upon selection." Heading +
  intro text beside a row of frames; clicking one grows it in place.
- `story.png` — "D. Storytelling Image Section": "narrative-driven image
  section." Three steps ("Day 1," "Day 2," "Day 3"), each an image + heading
  + paragraph, alternating sides, connected by a small curved arrow between
  consecutive steps.

`gallery-grid.png`, `gallery-filmstrip.png`, and `story.png` became
`PhotoGallery.astro`'s three variants. `band.png` is `ImageBand.astro` —
kept separate rather than a fourth `PhotoGallery` variant, since it's one
image, not a gallery of many. See `SECTIONS.md` for prop tables, the
reasoning on why the filmstrip's "expand in place" is a different mechanism
from `ServiceBlocks.astro`'s `highlight` swap-to-showcase, and why `story`
stayed a `PhotoGallery` variant instead of being folded into
`StoryMosaic.astro` (the step label and the between-block connector, mainly
— not something worth generalizing `StoryMosaic`'s `blocks` model for).

`story.png`'s staggered/offset image positions (step 2's image sitting
inset rather than flush) were read as wireframe-tool styling, not
deliberate layout intent, and weren't reproduced pixel-for-pixel — the
alternating side + connector arrow already carry the "meandering path"
feeling. Worth a second look against the original if that offset turns out
to have been intentional.

## Provenance: `testimonials/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/testimonials/<name>.png`:

- `card.png` — "A. Testimonial Card": "single quote or review." One
  quote/avatar/name/rating card, centered, no carousel controls.
- `carousel.png` — "B. Testimonial Carousel": "multi-slide slider. Slider
  can zoom in highlight testimonials or everything has the same size and
  format." The "zoom in highlight" mode is exactly what
  `TestimonialCarousel.astro` already did (center card scaled up,
  neighbors dimmed) before this batch; "everything has the same size and
  format" was new and became the `uniform` prop.
- `logo-bar.png` — "C. Logo Bar": "partners, certifications, associations."
  Two examples: a stacked list of client logo + short-quote rows (each row
  a logo on a dark segment beside a quote/company/"5x Client of MNO" tag),
  and a "Trusted by Industry Leaders" heading over a scrollable logo strip
  with one featured 5-star quote underneath.

"A" and "B" became the *same existing* `TestimonialCarousel.astro`, not new
components — passing it 1 testimonial reproduces "A" (arrows/dots disappear
on their own, nothing to navigate to), and its default vs. `uniform` prop
covers both halves of "B"'s description. "C" became a new file,
`LogoBar.astro` — its primary entity (a brand logo) is different enough
from a person's testimonial or a `ServiceIcon` glyph to not fit either
existing `list`-shaped component. See `SECTIONS.md` for the full reasoning,
the cross-instance `dots`-scoping bug fixed while extending
`TestimonialCarousel`, and why `LogoBar`'s `carousel` scrolls natively
instead of using the index-based track-sliding every other slider here
uses.

## Provenance: `cta/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/cta/<name>.png`:

- `primary.png` — "A. Primary CTA Block": "headline, text, and button."
  Logo + heading + short paragraph + CTA beside an image.
- `secondary.png` — "B. Secondary CTA": "soft/internal linking CTA." One
  flat band — heading + paragraph, a small icon, and a CTA in a single row.
- `form.png` — "C. Form CTA": "mini form or form preview block." Centered
  heading + paragraph over an input field and a submit button.

Became `CallToAction.astro`'s three variants. `primary`'s wireframe showed
a lighter band above the actual content block — read as canvas whitespace
around the mockup, not a second background tone, and not reproduced (worth
a second look against the original if that was actually deliberate, same
caveat as `PhotoGallery`'s `story` offsets). `form` is the first real
`<input>` in this library — see `SECTIONS.md` for what that required
extending in `Button.astro` and `global.css` rather than working around.

## Provenance: `carousel/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/carousel/<name>.png`:

- `content-card.png` — "A. Content Card Carousel": "cards sliding
  horizontally." Center-emphasis carousel, text-only cards.
- `image.png` — "B. Image Carousel": "photo-only carousel." Same mechanism,
  image-only cards.
- `highlights.png` — "C. Highlights Carousel": "stories, impact, or
  achievements." Same mechanism again, image-on-top-of-text cards.

All three are the identical center-emphasis carousel mechanism
`TestimonialCarousel.astro` already has (arrows, dots, center card scaled
up, neighbors dimmed) — they only differ in what's inside each card. Built
as one component, `CardCarousel.astro`, with a single card shape
(`image?`, `heading?`, `body?`) rather than three near-duplicate files;
which fields a card has determines whether it reads as "A," "B," or "C."
Kept separate from `TestimonialCarousel.astro` itself because that
component's card markup (quote mark, avatar, name/role, star rating) is
testimonial-specific and doesn't generalize cleanly. See `SECTIONS.md` for
the full reasoning.

## Provenance: `metrics/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/metrics/<name>.png`:

- `grid.png` — "A. Metrics Grid": "three or four key stats." 2×2 grid of
  ribbon/banner-shaped cards, each a big value + short caption, no icon.
- `strip.png` — "B. Numbers Strip": "simple row of highlighted metrics." An
  image, then a divided row of 3 value/caption metrics below it.
- `list.png` — "C. Metric List": same description as B, but visually a
  vertical list — a heading + intro paragraph beside a divided column of
  value/caption rows.

Became `MetricsBlock.astro`'s three variants. Considered folding into
`StatBand.astro` (visually the closest existing thing) and ruled out —
none of these three show an icon badge, a brand-colour band, or CTA
buttons, which is `StatBand`'s whole identity, not an incidental detail.
See `SECTIONS.md` for the full reasoning and the ribbon shape's
`clip-path` implementation note.

## Provenance: `faq/*`

Shared inline in chat, not saved to disk. Drop the originals in at
`wireframes/faq/<name>.png`:

- `accordion.png` — "A. FAQ Accordion": "expandable Q&A." Numbered list,
  one item open (showing a "−") with its answer visible, the rest
  collapsed ("+").
- `grid.png` — "A. FAQ Grid" (labelled "A" on the original too — both
  examples share that letter). "Short-answer layout." 2×2 grid of Q&A
  cards in alternating tones, all visible at once, no expand/collapse.

`accordion.png` became `Faq.astro`. `grid.png` was **not** rebuilt — it's
exactly `ContentGrid.astro`'s `text` block type (question as `heading`,
answer as `body`, alternating `tone`), so the reuse-by-default rule applied
instead of a second component. See `SECTIONS.md` for the exact usage and
the native-`<details>` implementation notes, including a real
cross-instance scoping bug caught and fixed in the same style as this
codebase's other multi-instance fixes, just via HTML's `name`-grouping
rather than a script.

## Provenance: `footer/restructure.png`

Real footer screenshots (not Lorem-ipsum wireframe-kit mockups) shared
inline in chat, not saved to disk — drop the originals in at
`wireframes/footer/restructure.png` (desktop) and
`wireframes/footer/restructure-mobile.png` (a follow-up mobile screenshot,
sent after the desktop one prompted the initial build). Desktop: logo +
tagline + social icon row on the left, "Quick Links" / "Phone" /
"Newsletter" columns, and a distinct copyright bar below. Mobile: every
column — Quick Links, Phone, Newsletter — stacks full-width, one per row,
not side by side.

Used for `SiteFooter.astro`'s *structure only*, per the request — none of
that site's copy, branding, or its green CTA colour were carried over.
Every new field (`brandHeading`/`brandBody`, `socialLinks`, `newsletter`,
`contactHeading`) is optional, so Maple's existing footer data renders
unchanged and simply doesn't show the sections it hasn't supplied. See
`SECTIONS.md` for the prop table and two real bugs (one pre-existing,
found on this pass) fixed while restructuring it.

## Existing provenance notes

`maple-disability-support.png` was shared inline in chat (not as a file on
disk), so it could not be copied into this folder programmatically. The
build was produced from a direct visual read of that image — layout,
proportion, hierarchy, and visible copy — cross-checked against the brand's
own exported page content found alongside it
(`maple-disability-support-services-page.json`, `maple-section-partner.json`,
`maple-section-disabilities.json`, etc. in the source Downloads folder),
which supplied verbatim copy for the Hero, StoryMosaic ("About Maple"),
StatBand ("Trusted NDIS Registered Specialists"), PathwayCards ("partner"
cards), and TagCloud ("Disabilities We Support") sections.

This is the reference the current `hero/split-mosaic.png` slot describes —
drop the original image there to have it travel with the repo going
forward; nothing in the build depends on it being present.
