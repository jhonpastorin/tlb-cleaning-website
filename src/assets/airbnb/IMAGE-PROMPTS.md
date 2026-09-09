# Image prompts — Airbnb and holiday let cleaning

The prompts behind the four assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `airbnb-cleaning-cleaner-finishing-a-guest-ready-holiday-apartment.jpg` | A, scene | 1024×1024 | §1 hero |
| `airbnb-turnover-making-up-a-bed-with-fresh-white-linen.jpg` | A, scene | 1200×896 | §3 card 1 |
| `airbnb-turnover-restocked-guest-essentials-on-a-kitchen-bench.jpg` | A, scene | 1200×896 | §3 card 2 |
| `airbnb-turnover-cleaner-arriving-at-a-holiday-cottage-with-keys.jpg` | A, scene | 1200×896 | §3 card 3 |

---

## ⚠️ Read this before reusing anything else for a holiday-let slot

IMAGE-GUIDELINES §5 says reuse before generating, and this folder
**deliberately broke that rule**. The library already had two files meaning
"holiday let" —
`src/assets/home/holiday-let-cleaning-guest-ready-cottage-living-room.jpg`
and its duplicate `service-airbnb-and-holiday-let-turnovers.jpg`, which the
homepage runs for its holiday-let persona card and its service tile.

**That photo is a snowbound English stone cottage.** Bare winter trees and
snow on the ground through the French doors, a lit wood burner, a dry-stone
garden wall, exposed structural oak trusses. It is not the Northern Rivers,
it is not Australia, and it is the opposite season to the one this business
trades in. It predates the prompt sheets, has no prompt of its own, and is
one of the five duplicate pairs §5 already flags.

So it was not reused, and the four frames here were generated instead.

**Open item: the homepage should be repointed at these.** `index.astro`'s
persona card 2 and its "Airbnb and holiday let turnovers" service tile both
still import the snow cottage. Swapping them to
`airbnb-cleaning-cleaner-finishing-a-guest-ready-holiday-apartment.jpg` is a
two-line change and it removes the last winter-in-England frame from the
site. Not done in the same pass as building this page, because it changes a
page nobody asked for changes to — raise it rather than assume it.

## Two things worth knowing before regenerating

**The uniform is IMAGE-GUIDELINES §3's canonical one, verbatim, in all four.**
Aqua polo, dark teal apron, dark teal rubber gloves. §3 asks for that decision
to be made once and then repeated. Keep the wording identical in any new
prompt or the library drifts again. The hero is the one exception on gloves —
she is placing flowers, not cleaning, so she has none.

**The palette allow-list is not optional**, and this page has a specific
reason for it beyond the house style: a short-stay interior generated without
constraint comes back styled like a magazine shoot, which means a pop colour
in the cushions and a bowl of oranges on the bench. Both are banned by §2
("never orange") and both would sit badly beside the brand's Dark Teal.

Two things the allow-list does **not** win, and both were accepted rather
than regenerated, because fighting them produces a worse frame:

- **Olive oil is olive.** The BFD names olive oil specifically as one of the
  restocked essentials, so it is in two frames, and it reads amber-green in
  glass. There is no version of that bottle that obeys "no yellow".
- **A bird of paradise is orange.** The verandah frame's potted plant flowers
  orange, because that is what the plant does. It is three small flowers in a
  subtropical garden bed, it is unmistakably the right plant for a Northern
  Rivers verandah, and a strelitzia with the flowers prompted out looks like
  a sick plant.

---

## 1. Hero — the finished, guest-ready property

Family A, square, `cover` fit. Square because `Placeholder` puts
`aspect-ratio` on the wrapper, so a box matching the file crops nothing.

The subject is the **moment after** the turnover, not the turnover: the point
of the page is "set and forget", and a photo of someone scrubbing argues for
effort rather than for it being handled. The restocked bench in the mid
distance is doing the real work in this frame — it is the half of the offer
the competition does not make.

```
A cleaner placing a small clear glass vase of fresh white flowers on the
dining table of a finished, guest-ready coastal holiday apartment, calm and
unhurried, the last touch before check-in.

The room: an open-plan living and dining space in a bright Australian beach
house, a pale linen sofa with two neatly squared grey cushions and a folded
cream throw, a warm timber dining table with four pale timber chairs, wide
plantation shutters open to green subtropical foliage and a slice of blue
ocean beyond, a large potted monstera in a white pot, warm timber
floorboards, plain white walls, a woven jute rug.

On the kitchen bench in the mid distance: a small neat row of restocked guest
essentials, all completely unlabelled and plain - a folded stack of white
towels, a plain white toilet roll pair, a plain clear glass bottle of olive
oil, two plain white ceramic mugs.

Light: bright mid-morning coastal daylight through the shutters, soft
shadows, airy and optimistic.

One woman in a plain aqua polo shirt and a plain dark teal apron, no gloves,
seen three-quarters from the side, face in calm profile, mid-gesture as she
sets the vase down. The uniform is completely plain: no logos, no badges, no
printing, no lettering.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, jute and green foliage. Absolutely no orange, no yellow,
no red, no pink and no strong blue anywhere in the frame except the distant
ocean.

Nothing in the frame carries writing: no signage, no book titles, no bottle
labels, no wall art with words, no screens showing anything.

Wide eye-level establishing shot, approximately 28mm, the whole room readable
around her, deep depth of field, square composition with the woman and the
dining table in the middle third.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 1:1
square, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 2. Card 1 — chasing the cleaner around every booking

The card is about scheduling, which does not photograph. Linen does, and it
is the part of a turnover that is unambiguously *between guests* rather than
just cleaning — nobody strips a bed in a house they live in on a Tuesday. So
the bed carries the card.

```
A cleaner making up a queen bed with crisp fresh white linen in the bedroom
of a coastal holiday house, mid-task, smoothing the top sheet, calm and
unhurried between guests.

The room: a bright airy bedroom in an Australian beach house, a pale timber
bedhead, two plain white pillows already squared at the head of the bed, a
folded cream waffle blanket at the foot, a small pale timber bedside table
with a plain clear glass carafe, wide plantation shutters half open to green
subtropical foliage, warm timber floorboards, plain white walls, a small
woven jute mat.

Light: bright mid-morning coastal daylight through the shutters, soft
shadows, airy and optimistic.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. Every garment is completely plain: no logos, no badges,
no name tag, no embroidery, no printing, no lettering. She is seen
three-quarters from the side, face in calm profile.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, jute and green foliage. Absolutely no orange, no yellow,
no red, no pink and no strong blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no book titles, no bottle
labels, no wall art with words, no paperwork, no screens showing anything.

Wide eye-level shot, approximately 28mm, the room readable around the
subject, shallow but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3,
high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 3. Card 2 — presentation, not just cleaning

Everything on the bench had to be blank, which is the whole difficulty of
this frame: restocked consumables in real life are the most heavily branded
objects in a house. The prompt names each item and says "plain" and
"unlabelled" on every one of them, and it still needs checking against
§4 before saving — a generator will put lettering on a toilet roll wrapper
given the slightest opening.

```
A cleaner setting out restocked guest essentials on the kitchen bench of a
coastal holiday apartment, placing a folded stack of clean white towels
beside them, the last of the turnover before check-in.

The bench: a pale stone benchtop with a small neat row of completely plain
unlabelled guest essentials - two plain white toilet rolls, a plain clear
glass bottle of olive oil, a plain white ceramic jar, two plain white mugs on
a small timber tray, and a folded stack of three white towels. Everything is
blank and unbranded.

The room: a bright compact kitchen in an Australian beach house, pale timber
cabinetry, a white subway tile splashback, a stainless kettle, a small potted
herb on the windowsill, a wide window over the sink looking out to green
subtropical foliage.

Light: bright mid-morning coastal daylight through the window, soft shadows,
clean and airy.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. Every garment is completely plain: no logos, no badges,
no name tag, no embroidery, no printing, no lettering.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, jute and green foliage. Absolutely no orange, no yellow,
no red, no pink and no strong blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no book titles, no bottle
labels, no wall art with words, no paperwork, no screens showing anything.

Wide eye-level shot, approximately 28mm, the room readable around the
subject, shallow but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3,
high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 4. Card 3 — hosting from out of town

This card's job is a visible, approachable face and a **key**, because the
copy beside it is about trusting someone else with both. A figure turned away
would have argued against its own caption — the same call the commercial
folder's card 3 made, for the same reason.

The setting is deliberately the only exterior in this folder. A remote owner
is not picturing the inside of their property; they are picturing somebody
arriving at it.

⚠️ The generated frame has a hinged panel mid-verandah that reads
ambiguously — a gate or a propped security door. It is not wrong enough to
regenerate, but if this is ever reshot, ask for a clear verandah.

```
A cleaner arriving at the front door of a small coastal holiday cottage,
holding a single plain key on a plain metal ring, reaching for the door
handle, calm and capable, early in the morning between guests.

The setting: a timber and white weatherboard holiday cottage entry with a
covered verandah, two pale timber verandah posts, a large potted bird of
paradise beside the door, a plain coir doormat with no writing on it, a
painted white front door with a black handle, lush green subtropical garden
and a hint of a quiet coastal street behind her.

Light: bright early morning Australian coastal daylight, soft shadows, clean
and optimistic.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. Every garment is completely plain: no logos, no badges,
no name tag, no embroidery, no printing, no lettering. She is turning
slightly toward the camera with a calm, friendly, open expression, a small
plain cleaning caddy of unlabelled bottles set down on the verandah beside
her.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, jute and green foliage. Absolutely no orange, no yellow,
no red, no pink and no strong blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no book titles, no bottle
labels, no wall art with words, no paperwork, no screens showing anything.

Wide eye-level shot, approximately 28mm, the room readable around the
subject, shallow but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3,
high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

---

## Export settings used

All four were generated at the native sizes in the table above, then
re-encoded to JPEG with `sharp` at mozjpeg quality 86, which brought every
file between 107KB and 154KB — well inside the under-600KB budget
IMAGE-GUIDELINES §5 sets. No resizing; Astro re-encodes to webp at 400/800/1200
from these sources.
