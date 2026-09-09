# Image prompts — commercial cleaning

The prompts behind the five assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Three pages now draw on
them: `/commercial-cleaning/`, `/commercial-carpet-cleaning/` and
`/commercial-pressure-cleaning/`, so a change here is not local. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `commercial-cleaner-mopping-an-office-foyer.jpg` | A, scene | 1024×1024 | §1 hero |
| `commercial-cleaner-vacuuming-an-open-plan-office.jpg` | A, scene | 1200×896 | §3 card 1 |
| `commercial-cleaner-and-office-manager-talking-in-reception.jpg` | A, scene | 1200×896 | §3 card 2 |
| `commercial-cleaner-with-a-caddy-in-an-office-kitchenette.jpg` | A, scene | 1200×896 | §3 card 3 |
| `commercial-cleaner-with-cloth-and-spray-bottle.png` | B, cut-out, alpha | 1024×1024 | hero, sibling pages |

## Two things worth knowing before regenerating

**The uniform is the §3 canonical one, verbatim, in all four.** Aqua polo,
dark teal apron, dark teal rubber gloves. §3 asks for that decision to be made
once and then repeated; these four are the first assets that follow it. Keep
the wording identical in any new prompt or the library drifts again.

**The palette line is not optional.** The first hero take came back with a
bright orange cloth, which §2 rules out ("never orange"), and the first
reception take put a mismatched blue-and-mint pair of gloves in the apron
pocket. Both were regenerated with an explicit allow-list of colours and an
explicit ban on orange, yellow, red, pink and blue. Generators reach for a
complementary pop colour unless told not to.

---

## 1. Hero — foyer scene

Family A, square, `cover` fit. **This slot was a family B cut-out figure and
was changed at TLB's direction**, because a studio cut-out on a plain
background says "a cleaner" without saying *commercial*. The trolley, the
foyer, the lobby seating and the boardroom behind glass are what carry that,
and none of them survive a cut-out.

Two constraints worth keeping if this is ever reshot:

- **Square.** `Placeholder` puts `aspect-ratio` on the wrapper, so a box
  matching the file crops nothing. A 4/3 box over a square file cover-crops
  the trolley off the left edge, and the trolley is why the frame reads as
  commercial at a glance.
- **Name the trolley's colours explicitly.** The first take came back with a
  yellow mop wringer, a yellow bucket lid and a blue bottle, because that is
  what real commercial carts look like. §2 rules out yellow and orange, so the
  prompt now specifies grey, dark teal and brushed metal part by part.

```
A commercial cleaner mopping the polished floor of a bright office building
foyer, calm and unhurried, with a professional cleaning trolley beside her.

The room: a light-filled commercial reception with a pale timber reception
counter set back behind her, floor-to-ceiling glass along the left side, a
glass-partitioned boardroom to the right with a meeting table beyond it, a
tall fiddle-leaf fig in a white pot, pale terrazzo floor with a soft sheen, a
row of grey lobby armchairs.

The trolley: a plain commercial cleaning cart in grey and dark teal only, with
a dark teal mop bucket, a grey wringer, two grey waste bags and three
unlabelled clear spray bottles on the top shelf. Completely unbranded. Every
part of the trolley, bucket, wringer and mop handle is grey, dark teal or
brushed metal.

Light: mid-morning daylight flooding through the glass, soft shadows, bright
and airy, a clean reflection on the floor.

One woman in a plain aqua polo shirt, a plain dark teal apron, dark teal
rubber gloves and dark trousers, mid-task with a flat mop, seen three-quarters
from the side, face in calm profile. The uniform is completely plain: no
logos, no badges, no printing, no lettering.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, brushed metal and green foliage. Absolutely no yellow, no orange, no
red, no pink and no blue anywhere in the frame, including the bucket, the
wringer, the bottles and the mop head.

Nothing in the frame carries writing: no signage, no wayfinding, no wall
lettering, no labels on any bottle, no screens showing anything.

Wide eye-level establishing shot, approximately 28mm, the whole space readable
around her, deep depth of field, square composition with the cleaner and her
trolley in the middle third.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
1:1 square, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 2. Card 1 — ongoing contract

```
A cleaner vacuuming the carpet between desks in a small open-plan office, calm
and unhurried, after the staff have gone.

The room: five pale timber desks with dark monitors switched off, grey mesh
task chairs pushed in, a large fiddle-leaf fig in the corner, a
glass-partitioned meeting room behind, plain white walls.

Light: late afternoon daylight still coming through a wide window wall, warm
interior downlights on, soft shadows, bright and clean rather than dim.

One woman in a plain aqua polo shirt, a plain dark teal apron and dark teal
rubber gloves, seen from three-quarters behind as she works, face mostly
turned away. The uniform is completely plain: no logos, no badges, no
printing, no lettering.

Nothing in the frame carries writing: no signage, no whiteboard, no notes, no
labels, no papers, no screens showing anything.

Wide eye-level shot, approximately 28mm, the room readable around her, shallow
but not extreme depth of field.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 3. Card 2 — what it will cost

The brief asked for "a written cleaning scope and quote on a desk". That was
changed rather than followed: §4 bans lettering in frame, and a photo whose
entire subject is a document is a photo of garbled fake text. The walkthrough
conversation is where a written scope actually comes from, so it carries the
same meaning with nothing to misread.

```
Two women standing and talking in the small reception area of an office,
mid-conversation, relaxed and friendly, the cleaner gesturing lightly toward
the room as if explaining what happens where.

The room: a pale timber reception counter set back at the left edge, two grey
tub chairs, a large potted monstera, plain white walls, a glass entry door
with bright daylight behind it.

Light: mid-morning natural light through the glass, soft shadows, bright and
airy.

The woman on the left wears a plain aqua polo shirt and a plain dark teal
apron, with a single matching pair of dark teal rubber gloves tucked into the
apron pocket, both gloves exactly the same dark teal. The woman on the right
is an office manager in ordinary smart-casual clothes, a linen shirt and
trousers, no gloves. Both outfits completely plain: no logos, no badges, no
printing, no lettering.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey and green foliage. No orange, no yellow, no blue, no pink anywhere in the
frame.

Nothing in the frame carries writing: no paper, no clipboard, no notepad, no
signage, no wall art with words, no screens showing anything.

Wide eye-level shot, approximately 28mm, the room readable around them,
shallow but not extreme depth of field.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 4. Card 3 — who is in the building

This card's job is a visible, approachable face, because the copy beside it
promises "the same small team you have met" and "you will know their names".
A figure turned away would have argued against its own caption.

```
A woman in a cleaning uniform standing in the kitchenette of a small office,
turning toward the camera with a calm, friendly, open expression, one hand
resting on a cleaning caddy of plain unlabelled bottles on the bench beside
her.

The room: pale timber cabinetry, a white subway-tile splashback, a stainless
kettle and two plain unmarked ceramic mugs, a small round table with two
chairs, a small indoor plant on the windowsill.

Light: mid-morning natural light through a wide window, soft shadows, bright
and clean.

She wears a plain aqua polo shirt, a plain dark teal apron and dark teal
rubber gloves. Every garment is completely plain: no logos, no badges, no name
tag, no embroidery, no printing, no lettering.

Nothing in the frame carries writing: the bottles, mugs, cupboards and walls
are all completely unmarked, no signage, no labels, no notes on the fridge.

Wide eye-level shot, approximately 28mm, the room readable around her, shallow
but not extreme depth of field.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

---

## 5. Shared cut-out figure

Family B, transparent. **Currently imported by no page.** It was the hub's
hero until `/commercial-cleaning/` moved to the foyer scene above, and
`/commercial-carpet-cleaning/` briefly used it before being repointed at the
foyer scene too.

⚠️ It is kept rather than deleted because it is the only family B asset in the
commercial library and the only one that can sit on a coloured band without a
crop. Delete it if the library is being tidied; regenerating it from the prompt
below plus the keying recipe takes about a minute. Check `grep -rl` first — it
has already been imported and dropped twice inside one day.

```
Studio cut-out photograph of a woman in her thirties in a cleaning uniform,
standing three-quarter view turned slightly to her left, wiping a surface at
chest height with a folded pale mint-green microfibre cloth in her gloved
right hand, a plain unlabelled clear spray bottle held down at her side in her
left hand. Calm, capable, friendly expression, dark hair tied back in a low
ponytail.

Background: pure flat solid white, completely empty. No room, no floor, no
furniture, no ground shadow, no cast shadow of any kind, no gradient, no
backdrop seam.

Light: even soft studio light from the front left, gentle wrap on the face and
arms, no hard flash, no rim light.

She wears a plain aqua polo shirt with a small collar, a plain dark teal apron
over it, and dark teal rubber cleaning gloves. Every garment is completely
plain: no logos, no badges, no name tags, no embroidery, no printing, no
lettering of any kind.

Colour palette strictly limited to dark teal, aqua, pale mint green, white and
natural skin tones. Absolutely no orange, no yellow, no red, no pink, no blue
anywhere in the frame, including the cloth, the gloves and the bottle.

Framing: waist-up to mid-thigh, eye level, approximately 50mm, subject centred
with clear white margin on all sides.

Bright optimistic colour grade, clean cool whites, natural warm skin tones.
Photorealistic commercial photography, 1:1 square, high resolution.

No text, no signage, no logos, no watermark, no border, no vignette, no
collage, no grid, no distorted hands, exactly five fingers per hand.
```

---

## How the cut-out was keyed

This provider has no transparent-background option (the CLI exposes
`--background transparent` for OpenAI only, and `gpt-image-2` refuses it), so
the figure is generated on flat white and matted afterwards with `sharp`:

1. **Flood fill from the frame edges**, treating a pixel as background only if
   it is near-white *and* near-neutral *and* connected to the border. A plain
   luminance key was rejected because it eats the white spray bottle and the
   highlight on the polo sleeve; connectivity cannot.
2. **Blur the hard mask by 0.8px**, then push it through a linear ramp
   (`(v - 70) / 185`) so the edge is anti-aliased but pulled inward about half
   a pixel. That is what removes the white fringe a hard key leaves behind.
3. **Save as a no-dither palette PNG.** Alpha survives at ~160KB against
   940KB for lossless RGBA. Dithering must stay **off**: with it on,
   quantisation scatters the alpha channel into alternating transparent
   scanlines.

Two traps, both of which produced a broken matte on the first attempt:

- `sharp` promotes a 1-channel raw buffer to **3 channels** through `blur`, so
  read the blurred mask with a stride of `info.channels`. Assuming one byte
  per pixel yields a striped, half-transparent figure.
- Fringing is invisible against this hero band's Off White and obvious against
  the brand Dark Teal. **Composite any regenerated cut-out over `#234B51`
  before committing**, not just over white.
