# Image prompts — the Appliances group

The prompts behind the fourteen assets in this folder and its subfolders, kept
so a slot can be regenerated consistently rather than re-invented. Written to
the template in [`IMAGE-GUIDELINES.md`](../../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI. The six
cut-outs were keyed with [`scripts/key-cutout.mjs`](../../../../scripts/key-cutout.mjs).

| Asset | Family | Native | Slot |
|---|---|---|---|
| `homeowner-and-cleaner-talking-in-a-living-room.jpg` | A, scene | 1200×896 | §3 card 2, **all six pages** |
| `cleaner-with-a-caddy-in-a-home-entry-hall.jpg` | A, scene | 1200×896 | §3 card 3, **all six pages** |
| `carpet_and_rug/cleaner-extracting-a-wool-rug.png` | B, cut-out | 1024×1024 | hero |
| `carpet_and_rug/living-room-rug-with-a-worn-traffic-path.jpg` | A, scene | 1200×896 | §3 card 1 |
| `upholstery_and_lounge/cleaner-cleaning-a-linen-armchair.png` | B, cut-out | 1024×1024 | hero |
| `upholstery_and_lounge/well-used-family-sofa-in-a-living-room.jpg` | A, scene | 1200×896 | §3 card 1 |
| `mattress/cleaner-cleaning-a-bare-mattress.png` | B, cut-out | 1024×1024 | hero |
| `mattress/stripped-bed-ready-for-mattress-cleaning.jpg` | A, scene | 1200×896 | §3 card 1 |
| `tile_and_grout/cleaner-scrubbing-a-grout-line.png` | B, cut-out | 1024×1024 | hero |
| `tile_and_grout/bathroom-floor-tiles-and-grout-lines.jpg` | A, scene | 1200×896 | §3 card 1 |
| `oven_bbq_and_appliances/cleaner-wiping-out-an-open-oven.png` | B, cut-out | 1024×1024 | hero |
| `oven_bbq_and_appliances/well-used-barbecue-on-a-timber-deck.jpg` | A, scene | 1200×896 | §3 card 1 |
| `blinds_shutters_and_fans/cleaner-wiping-venetian-blind-slats.png` | B, cut-out | 1024×1024 | hero |
| `blinds_shutters_and_fans/plantation-shutters-and-ceiling-fan-in-a-living-room.jpg` | A, scene | 1200×896 | §3 card 1 |

**Two shared cards, six pages.** Cards 2 and 3 are identical across all six
pages by design, per §5's "same subject = same file". Card 2 is always "what
will it cost" and card 3 is always "who is in my home", and those are the same
subject on every page in the group. Only the hero and card 1 change.

---

## The five things worth knowing before regenerating any of these

**1. The uniform is the §3 canonical one, verbatim, in all eight people
shots.** Aqua polo, dark teal apron, dark teal rubber gloves. Keep the wording
identical or the library drifts again.

**2. The palette line is not optional and this generator fights it.** Real
carpet extractors, detail brushes and cleaning caddies are overwhelmingly
yellow, red or bright blue, and the generator reaches for a pop colour unless
told not to part by part. Every prompt below names the equipment's colours
explicitly. One take was lost to tan brush bristles.

**3. ⚠️ The existing `why-tlb-cleaner-vacuuming-a-living-room-rug.png` is NOT
reusable, despite being exactly this subject.** It was the obvious §5 reuse
candidate for the carpet page and it fails IMAGE-GUIDELINES §4 on three
separate counts: an invented "TLG PROFESSIONAL" logo on the apron (a fabricated
brand asset, which §4 names explicitly), yellow gloves and a yellow vacuum
against a palette that bans both, and garbled lettering on a cushion. It should
be regenerated or retired rather than reused. Do not reach for it.

**4. Heroes are family B cut-outs, matching their residential siblings.** The
deep-cleaning, end-of-lease and mould pages all open on a cut-out figure, so
these six do too. That is the opposite of the call the commercial pages made,
where TLB asked for scene photos instead — the reasoning there was that a
studio cut-out does not say *commercial*, which does not apply to a home.

**5. Generate cut-out heroes on GREEN unless the subject has no white in it.**
See the keying section below. This is the single most useful thing on this
page.

---

## Keying the cut-outs

The provider has no transparent-background option, so heroes are generated on a
flat backdrop and keyed afterwards:

```
node scripts/key-cutout.mjs <input.jpg> <output.png> [--green] [--check]
```

`--check` writes a companion `_on-teal.png` composited over Dark Teal, which is
the only honest way to look at a matte. A white fringe is invisible against a
white page by definition.

**Which backdrop to ask for.** Three of these six were generated on white
first, and three of those failed: a bare mattress, a pale tiled floor and white
venetian blind slats are all light and neutral, which is exactly the
description the white key uses for "background", so they keyed away in ragged
holes. They were regenerated on chroma green and keyed with `--green`, which
fixed all three completely.

**So: use green for anything containing white, cream or pale grey, which is
most of this library.** White only suits a fully coloured subject, and even
then green costs nothing. The three that keyed cleanly off white
(carpet/rug, upholstery, oven) were left as they were rather than regenerated
for consistency, because the source backdrop does not survive into the output.

Three bugs were fixed in the script during this build and are documented in its
header. The one worth repeating: **`.blur()` on a single-channel raw buffer
returns three channels**, and indexing it as one lays clean alternating
scanlines of transparency across the figure. That looks exactly like palette
dithering and it is not — the palette encoder was wrongly blamed first. Palette
encoding with `dither: 0` is correct and takes these files from ~850KB to
~200KB.

---

## Shared card 2 — what will it cost

```
A cleaner and a homeowner standing and talking in a bright living room,
mid-conversation, relaxed and friendly, the cleaner gesturing lightly toward
the floor as if explaining what she would do.

The room: a bright Australian coastal living room with white walls, a warm
timber floor, a pale linen sofa with grey cushions, a large pale wool rug, a
tall indoor plant in a white pot, a low timber sideboard, wide windows with
sheer curtains.

Light: mid-morning natural window light, soft shadows, bright and airy.

The woman on the left wears a plain aqua polo shirt and a plain dark teal
apron, with a single matching pair of dark teal rubber gloves tucked into the
apron pocket, both gloves exactly the same dark teal. The woman on the right is
a homeowner in ordinary casual clothes, a linen shirt and trousers, no gloves.
Both outfits completely plain: no logos, no badges, no printing, no embroidery,
no lettering.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, pale linen and green foliage. No orange, no yellow, no red, no pink and
no blue anywhere in the frame.

Nothing in the frame carries writing: no paper, no clipboard, no notepad, no
wall art with words, no cushion lettering, no book titles, no screens showing
anything.

Wide eye-level shot, approximately 28mm, the room readable around them, shallow
but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3, high
resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette, no distorted hands.
```

## Shared card 3 — who is in my home

Needs a visible, friendly face: the copy beside it promises "the same local
team you have met". A figure turned away would argue against its own caption.
Same reasoning as the commercial hub's kitchenette card.

```
A woman in a cleaning uniform standing in the bright entry hall of a home,
turning toward the camera with a calm, friendly, open expression, one hand
resting on the handle of a cleaning caddy of plain unlabelled bottles beside
her.

The room: a bright Australian coastal entry hall with white walls, a warm
timber floor, a slim timber console table, a woven basket, a large leafy indoor
plant in a white pot, an open doorway through to a sunlit living room behind
her.

Light: mid-morning natural light through the doorway, soft shadows on her face,
bright and clean, no hard flash.

She wears a plain aqua polo shirt, a plain dark teal apron and dark teal rubber
gloves. Every garment is completely plain: no logos, no badges, no name tag, no
embroidery, no printing, no lettering.

The caddy: a plain grey and dark teal cleaning caddy holding three plain clear
unlabelled spray bottles and a folded mint microfibre cloth. Completely
unbranded, no labels on any bottle.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, mint and green foliage. No orange, no yellow, no red, no pink and no blue
anywhere in the frame.

Nothing in the frame carries writing: no labels on the bottles, no signage, no
wall art with words, no keys rack lettering, no screens.

Wide eye-level shot, approximately 28mm, the hall readable around her, shallow
but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3, high
resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette, no distorted hands.
```

---

## The cut-out heroes

All six share a common tail. Where a hero was generated on green, the white
background paragraph is replaced with the green one shown after the first
prompt.

**Shared tail, white version:**

```
She wears a plain aqua polo shirt, a plain dark teal apron, dark teal rubber
gloves and dark trousers. Every garment is completely plain: no logos, no
badges, no name tag, no embroidery, no printing, no lettering of any kind
anywhere on the apron or shirt.

Light: soft even studio daylight from the front left, gentle soft shadows on
the figure herself, bright and clean.

Colour palette strictly limited to dark teal, aqua, white, soft grey, pale
cream, warm timber and brushed metal. Absolutely no yellow, no orange, no red,
no pink and no blue anywhere in the frame, including any equipment, cloth or
glove.

Nothing in the frame carries writing: no labels, no logos, no signage, no
lettering on any equipment or clothing.

Photorealistic studio product photography of a person, sharp focus, 1:1 square,
high resolution, the figure filling most of the frame and standing on the
bottom edge.

Pure white seamless background, no room, no wall, no floor line, no horizon, no
cast shadow on the ground behind her. No text, no signage, no logos, no
watermark, no collage, no grid, no border, no vignette, no distorted hands.
```

**Shared tail, green version** (replaces the last paragraph above, and drops
the palette paragraph's mention of white):

```
THE BACKGROUND IS A COMPLETELY FLAT SATURATED CHROMA KEY GREEN SCREEN, one
uniform bright green colour edge to edge behind and beneath the subject, like a
film studio green screen. No room, no wall, no floor line, no horizon, no props
other than those described, no cast shadow on the green. Nothing else in the
frame is green: no green clothing, no green equipment, no plants, no foliage.
```

### 1. Carpet and rug — hero (white background)

```
A domestic cleaner kneeling beside a portable carpet extraction machine,
drawing its upholstery-style wand across a section of pale wool rug, isolated
on a completely plain pure white background.

Full figure, cut out cleanly, standing on a plain white floor that fades into a
plain white backdrop with no horizon line, no shadow behind her, no room, no
furniture, no wall, no props other than the machine and the small section of
rug.

The machine: a small plain domestic carpet extractor in grey and dark teal
only, with a ribbed grey hose running to the wand in her hands. Completely
unbranded. Every part of the machine, hose, wand and handle is grey, dark teal
or brushed metal.

She is seen three-quarters from the side, facing to the left of frame, calm and
unhurried, face in gentle profile with a slight friendly expression.
```

### 2. Upholstery and lounge — hero (white background)

```
A domestic cleaner cleaning the seat cushion of a pale linen armchair with a
hand-held upholstery cleaning tool, isolated on a completely plain pure white
background.

Full figure standing and leaning slightly toward the armchair, cut out cleanly,
with no room around her and nothing in frame except the armchair and the tool.

The armchair: a single pale oatmeal linen armchair with soft grey piping and
slim pale timber legs, plain and unbranded. The tool: a small plain hand-held
upholstery extraction tool in grey and dark teal only, with a ribbed grey hose.
Every part of the tool is grey, dark teal or brushed metal.

She is seen three-quarters from the side, facing to the left of frame, calm and
unhurried, face in gentle profile with a slight friendly expression.
```

### 3. Mattress — hero (⚠️ GREEN, key with `--green`)

A white mattress cannot be keyed off a white background. This one was
regenerated on green after the white version keyed away in holes.

```
A domestic cleaner drawing a hand-held upholstery cleaning tool across the
surface of a bare mattress, photographed against a flat chroma key green screen
background.

Full figure standing and leaning over the mattress, with nothing in frame
except the mattress and the tool.

The mattress: a single plain white quilted mattress, stripped completely bare
with no sheets, no pillows and no bed frame, resting low in the frame.
Completely plain and unbranded, no labels, no tags, no piping printing.

The tool: a small plain hand-held upholstery extraction tool in grey and dark
teal only, with a ribbed grey hose. Every part of the tool is grey, dark teal
or brushed metal.

She is seen three-quarters from the side, facing to the left of frame, calm and
unhurried, face in gentle profile with a slight friendly expression.
```

### 4. Tile and grout — hero (⚠️ GREEN, key with `--green`)

Pale grey tiles are light and neutral, so the white key ate the floor. Also
note the explicit grey bristles: the first take came back with tan bristles,
which the palette rules out.

```
A domestic cleaner kneeling and scrubbing a grout line with a small detail
brush on a section of tiled floor, photographed against a flat chroma key green
screen background.

Full figure kneeling, with nothing in frame except the small section of tiled
floor she is working on and her brush.

The floor section: a small area of matte pale grey square floor tiles with
visible grout lines, one narrow band of grout noticeably brighter and cleaner
than the darker grout beside it, showing the work in progress. No skirting
board, no wall, no fittings.

The brush: a plain hand-held detail brush with a dark grey handle and pale grey
bristles, completely unbranded. The bristles are grey, definitely not tan, not
brown and not yellow.

She is seen three-quarters from the side, facing to the left of frame, calm and
unhurried, face in gentle profile with a slight friendly expression.
```

### 5. Oven, BBQ and appliances — hero (white background)

Note "the oven interior is clean rather than filthy". The house style is
"calm and finished" (§2), and a genuinely filthy oven is the one subject in
this group most likely to pull the frame out of it.

```
A domestic cleaner kneeling in front of an open freestanding oven, wiping the
inside of the oven door with a mint microfibre cloth, isolated on a completely
plain pure white background.

Full figure kneeling, cut out cleanly, with no kitchen around her and nothing
in frame except the oven and her cloth. No benchtop, no cabinetry, no
splashback, no wall.

The oven: a single plain freestanding stainless steel oven with the door open
and the racks removed, brushed metal and dark grey glass, completely unbranded,
with no dials markings, no lettering, no badge and no display panel text.

She is seen three-quarters from the side, facing to the left of frame, calm and
unhurried, face in gentle profile with a slight friendly expression. The oven
interior is clean rather than filthy.
```

### 6. Blinds, shutters and fans — hero (⚠️ GREEN, key with `--green`)

White slats against white is the worst case for the luminance key. The line
about the green showing through the slats matters: it gives the keyer clean
gaps to fill and is why this one came out with real separation between slats.

```
A domestic cleaner wiping the slats of a set of white venetian blinds with a
mint microfibre cloth, photographed against a flat chroma key green screen
background.

Full figure standing, with nothing in frame except the blind she is cleaning.
No window frame, no glass, no wall, no curtain.

The blind: a single panel of plain white horizontal venetian blind slats hanging
vertically in the frame beside her, slats turned partly open, completely plain
with no branding, no labels and no lettering. The blind hangs freely with the
green screen visible through and behind it.

She reaches up with one gloved hand steadying a slat and wipes along it with the
cloth in the other, seen three-quarters from the side, facing to the left of
frame, calm and unhurried, face in gentle profile with a slight friendly
expression.
```

---

## The card 1 scenes

All six are family A room scenes with **no people in frame**, which §2 allows
and which suits them: the subject is the thing that needs cleaning, and a
figure would compete with it. All six share this tail:

```
No people in frame.

Colour palette strictly limited to white, warm timber, soft grey, pale cream,
pale linen, dark teal accents and green foliage. No orange, no yellow, no red,
no pink and no blue anywhere in the frame.

Nothing in the frame carries writing: no wall art with words, no book titles,
no cushion lettering, no labels, no screens showing anything.

Wide eye-level shot, approximately 28mm, the room readable, shallow but not
extreme depth of field.

Bright Australian coastal interior, Northern Rivers, white walls, warm timber
floor, natural window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette.
```

### Carpet and rug — the worn path

```
A large pale wool rug on a warm timber floor in a lived-in family living room,
with a faint darker worn path running across it from the doorway to the sofa.

The room: a pale linen sofa with soft grey cushions and a folded throw, a low
timber coffee table, a tall indoor plant in a white pot, white walls, wide
windows with sheer curtains, a woven basket beside the sofa. Comfortable and
lived in rather than staged, but tidy.

Light: mid-morning natural window light raking across the rug so the worn path
and the pile texture are clearly visible, soft shadows.
```

### Upholstery — the family sofa

```
A large pale oatmeal fabric sofa in a family living room, clearly the most-used
seat in the house, with the cushions slightly flattened where people sit and a
soft throw over one arm.

The room: warm timber floor, a pale wool rug under a low timber coffee table,
white walls, a leafy indoor plant in a white pot, wide windows with sheer
curtains, a grey knitted cushion and a linen cushion on the sofa. Comfortable
and lived in rather than staged, but tidy.

Light: mid-morning natural window light across the sofa fabric so the weave and
the worn seat cushions are clearly visible, soft shadows.
```

### Mattress — the stripped bed

```
A bright main bedroom with the bed stripped back to a bare white mattress,
sheets folded neatly on a chair beside it, ready for the mattress to be
cleaned.

The room: a low pale timber bed frame with a bare quilted white mattress on it,
a folded stack of white and pale grey bed linen on a timber chair, two bedside
tables with a small lamp and a green trailing plant, white walls, a wide window
with sheer curtains and soft daylight, a pale wool rug on the timber floor.

Light: mid-morning natural window light falling across the bare mattress, soft
shadows, calm and airy.
```

### Tile and grout — the bathroom floor

```
A bright family bathroom floor and shower base of pale grey square tiles,
photographed close and low, with the grout lines clearly visible and noticeably
darker and greyer in the older section than in a freshly cleaned band beside
it.

The room: a walk-in shower with a clear glass screen, a plain white wall-hung
vanity with a timber front, a folded white towel on a timber rail, a small
green plant on the windowsill, white subway tiles on the wall, matte pale grey
tiles on the floor.

Light: mid-morning daylight through a frosted window, soft shadows, bright and
clean, the light raking low across the floor so the grout lines read clearly.
```

### Oven and BBQ — the well-used barbecue

The only exterior in the group, so its tail swaps the interior house-style line
for the coastal exterior one. "No flames, no smoke, no food" matters: the
generator will otherwise produce a lifestyle barbecue advert rather than a
cleaning subject.

```
A covered outdoor barbecue on a timber deck at the back of an Australian
coastal home, lid open, the grill plates well used and greyed with cooking
residue, waiting to be cleaned.

The setting: a plain stainless steel four-burner barbecue on a warm timber
deck, completely unbranded with no badge, no dial markings and no lettering
anywhere on it. Behind it a white weatherboard wall, a timber outdoor table
with two chairs, a large potted plant, and soft green hinterland foliage beyond
the deck rail.

Light: bright mid-morning coastal daylight, clear sky, soft shadows, warm and
inviting.

No people in frame.

Colour palette strictly limited to white, warm timber, soft grey, brushed
stainless steel, dark teal accents and green foliage. No orange, no yellow, no
red, no pink and no blue anywhere in the frame. No flames, no smoke, no food.

Nothing in the frame carries writing: no branding on the barbecue, no dial
labels, no signage, no packaging.

Wide eye-level shot, approximately 28mm, the deck readable around it, shallow
but not extreme depth of field.

Bright Australian coastal exterior, Northern Rivers, natural sunlight, soft
shadows, optimistic bright grade. Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette.
```

### Blinds and fans — shutters and a ceiling fan

The light stripes are the point of this frame: they are what makes an
otherwise unremarkable room read as "the sun has just shown you the dust".

```
A wide living room window fitted with white timber plantation shutters, half
open, with warm morning light striping across the room, and a white ceiling fan
visible above.

The room: white walls, a warm timber floor, a pale linen armchair beside the
window, a low timber side table with a green plant in a white pot, a pale wool
rug. The plantation shutters are plain white timber with wide louvres. A plain
white four-blade ceiling fan hangs from the ceiling in the upper part of the
frame, its blades clearly visible.

Light: early morning natural light coming through the shutter louvres and
laying soft stripes of light and shadow across the floor and the armchair, dust
motes faintly visible in the light, bright and calm.
```

---

## Still missing

**A before/after pair for the carpet page.** Carpet is the best before/after
subject on the site, `BeforeAfter.astro` is running on six pages, and the
carpet page reserves a slot for it. It cannot be generated: the component wipes
one frame over the other in place, so both must be the same scene from the same
camera position, and §7 bars generated pairs implying a specific job. It needs
real photography — one traffic lane, tripod locked off, nothing moved between
frames.

**Real photography for the oven page's slider.** That page currently runs the
existing SAMPLE oven illustrations from `../before_after/`, which carry a
visible SAMPLE badge and a `note` on the section saying they are illustrations.
Both stay until real paired photography with client permission replaces them.
