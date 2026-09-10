# Image prompts — About TLB and Teagan

The prompts behind the two assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `about-tlb-cleaning-team-in-a-home-entry-hall.jpg` | A, scene | 1200×896 | Hero, and the `Backdrop` photo behind the trust bar + definition block |
| `about-cleaners-loading-the-car-before-a-morning-run.jpg` | A, scene | 1200×896 | Background behind the dark "Grown by word of mouth" block |

---

## ⚠️ The two most important images on this page are NOT in this folder, and
## must not be generated

`/about/` is the page the rest of the site points at when it promises names
and faces. `why-tlb.astro` does it three times; `index.astro`'s team block
does it once. Two slots on the page exist to keep that promise and both
render as labelled dashed boxes:

**1. Teagan's portrait**, in the "How TLB started" block. The paragraph beside
it names a real person, so a face there is a claim about her. A generated
portrait would be a fabricated likeness of a real business owner, which is
the clearest case of what IMAGE-GUIDELINES §7 forbids. It needs a real
photograph, with her permission to publish it.

**2. The four team frames**, in "The team". Same rule, four times over. Real
photographs of real employees, each with written consent, and the `label`
becomes the person's name when it lands.

Neither is a technical gap. Do not solve them with a prompt.

## What the two frames in this folder are, and what they are not

Both are **generic service imagery**: cleaners at work, in the canonical
uniform, unnamed and uncaptioned. That is the same line every other
people-bearing photo in this library sits on (see
`src/assets/ndis/IMAGE-PROMPTS.md`, which sets it out at length). Nobody in
either frame is presented as a TLB employee by name, and no caption, alt text
or heading on the page says otherwise. The alt text on the hero says "Three
TLB cleaners", which describes the uniform and the work rather than
identifying anyone.

The hero does double duty: the same file is the `Backdrop` image laid behind
the trust bar and the definition block, at 75% Cream scrim. That is
deliberate rather than lazy. The two sections sit directly under the hero, so
the photo carries through the fold as one continuous frame instead of
restarting as a second, differently-cropped room.

## Uniform

Both prompts state the canonical uniform from IMAGE-GUIDELINES §3 verbatim:
aqua polo, dark teal apron, dark teal gloves, every garment plain. Worth
knowing about the delivered frames: in the hero the middle cleaner ended up
without gloves, and in the car frame the gloves came back a lighter teal than
the aprons. Both were accepted, since neither introduces a *different*
uniform, but a regeneration should keep pushing on "both pairs of gloves
exactly the same dark teal" the way the ndis folder's prompt had to.

---

## 1. Hero — the team arriving

Family A, 4:3, `cover` fit. Three cleaners rather than one, because this is
the page about there being a team, and a single figure argues against its own
heading. Two of the three face the camera: the H1 is "You'll know who's
coming, before anyone knocks", so a frame of people turned away would
undercut it.

The caddies are load-bearing. Without them, three women standing in an entry
hall are not identifiably at work.

```
Three cleaners standing together in the entry hall of an ordinary Australian
coastal home, just arrived and about to start, each holding or setting down a
plain cleaning caddy, relaxed and warm, two of them turned toward the camera
with calm friendly open expressions.

The room: a bright entry hall opening into a living room, warm timber
floorboards, a pale timber console table with a large potted plant, a woven
jute runner, plain white walls, a wide window with sheer white curtains drawn
back, an open front door letting in daylight.

Light: bright mid-morning Australian daylight, soft shadows, no hard flash,
optimistic bright grade.

All three cleaners are women in plain aqua polo shirts, plain dark teal
aprons and dark teal rubber gloves, every garment completely plain with no
logos, no badges, no name tags, no embroidery, no printing and no lettering.
Their caddies are plain and hold plain unlabelled spray bottles and folded
cloths. Hands are natural and correctly formed, each hand with five fingers.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, jute and green foliage. No orange, no yellow, no red, no
pink, no strong blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no bottle labels, no book
titles, no wall art with words, no screens.

Wide eye-level shot, approximately 28mm, the hall readable around the group,
shallow but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3,
high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 2. Behind "Grown by word of mouth, not advertising"

Family A, 4:3, rendered behind the Dark Teal ground at 82% scrim, so it reads
as texture rather than as a photograph you study. It is chosen for what it
says about the claim above it: the run starts at a kerb in a street like the
ones we clean in, not at a depot.

⚠️ **This is the one frame in the library with a vehicle in it, and a vehicle
is a lettering trap.** Number plates, decals and signage are exactly what a
generator invents as garbled text, and a fake registration plate is a
fabricated detail about a real business. The prompt bans the plate outright
rather than asking for it to be blurred, and the delivered frame has the car
angled so no plate is in shot. Check this first on any regeneration.

House numbers and street signs are banned for the same reason they are banned
in the before/after briefs: they locate a real address.

```
Two cleaners loading plain cleaning caddies and an upright vacuum into the
open boot of a small plain white hatchback, parked at the kerb outside a
weatherboard house on a quiet Australian coastal street, early in the morning
at the start of their run, one lifting a caddy in, the other holding the boot
open, both relaxed and mid-conversation.

The setting: a quiet suburban street in the Northern Rivers of New South
Wales, a low weatherboard house with a verandah behind a front hedge,
established gum trees and frangipani, green lawn, a low front fence, gentle
hinterland hills far in the background.

Light: early mid-morning Australian daylight, soft long shadows, clear sky,
optimistic bright grade, not harsh.

Both cleaners are women in plain aqua polo shirts and plain dark teal aprons,
dark teal rubber gloves tucked into one apron pocket, every garment
completely plain with no logos, no badges, no name tags, no embroidery, no
printing and no lettering. Hands are natural and correctly formed, each hand
with five fingers.

The car is completely plain: an ordinary small white hatchback with no number
plate visible, no signage, no decals, no stickers, no writing of any kind
anywhere on it. The caddies and bottles are plain and unlabelled.

Colour palette limited to dark teal, aqua, white, cream, warm timber, soft
grey and green foliage. No orange, no yellow, no red, no pink, no strong blue
anywhere in the frame.

Nothing in the frame carries writing: no street signs, no house numbers, no
letterbox numbers, no bottle labels, no vehicle lettering.

Wide eye-level shot, approximately 28mm, the street readable around the pair,
shallow but not extreme depth of field.

Bright Australian coastal exterior, natural morning light, soft shadows,
optimistic bright grade. Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

---

## What was NOT generated, and must not be

- **Teagan, or any team member.** See the top of this file.
- **A testimonial face.** Both quotes on the page are `[TBC]` and the avatars
  stay the TLB monogram until a real client supplies their own photo with
  permission.
- **An office, a reception or a shopfront.** TLB is a team that works out of
  cars and homes. A photograph of a head office would invent premises.

## Export settings used

Generated at 1200×896 native, then re-encoded to JPEG with `sharp` at mozjpeg
quality 86: 150KB and 249KB, both well inside the under-600KB budget
IMAGE-GUIDELINES §5 sets. No resizing; Astro re-encodes to webp at
400/800/1200 from these sources.
