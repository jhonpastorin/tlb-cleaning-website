# Image prompts — real estate and property management cleaning

The prompts behind the three assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `real-estate-cleaning-finishing-an-empty-vacated-rental.jpg` | A, scene | 1024×1024 | §1 hero |
| `real-estate-cleaning-two-cleaners-arriving-at-a-rental-house.jpg` | A, scene | 1200×896 | §3 card 1 |
| `real-estate-cleaning-routine-clean-in-a-tenanted-rental-kitchen.jpg` | A, scene | 1200×896 | §3 card 3 |

**§3 card 2 is not in this folder and has no prompt here.** It reuses
`src/assets/home_cleaning/inside_your_home/end_of_lease_and_bond_cleaning/end-of-lease-property-manager-at-a-vacant-handover.jpg`,
per IMAGE-GUIDELINES §5. That frame is already a property manager at a vacant
handover with the keys on the benchtop, which is exactly card 2's subject —
generating a second version would make one idea look like two.

---

## ⚠️ Read this before reusing anything else for an agency slot

IMAGE-GUIDELINES §5 says reuse before generating, and this folder
**deliberately broke that rule once**. The library already had two files
meaning "managed rental property" —
`src/assets/home/rental-property-cleaning-two-storey-house-exterior.jpg`
and its duplicate `service-real-estate-and-property-management.jpg`, which the
homepage runs for its "I manage properties" persona card and its service
tile.

**That photo is a North American suburban street.** Asphalt-shingle roofing,
board-and-batten gables over lap siding, a stone-veneer skirt, a public
sidewalk with a lawn strip to the kerb, and a neighbouring house in the same
idiom. It is a competent real-estate photograph of a house in the wrong
country. It predates the prompt sheets, has no prompt of its own, and is one
of the five duplicate pairs §5 already flags.

So it was not reused, and `real-estate-cleaning-two-cleaners-arriving-at-a-rental-house.jpg`
was generated instead — same job, actually Australian: Colorbond hip roof,
weatherboard, frangipani and native grasses, no kerbside sidewalk.

**Open item: the homepage should be repointed at it.** `index.astro`'s
persona card 3 and its "Real estate and property management" service tile
both still import the American street. Not done in the same pass as building
this page, because it changes a page nobody asked for changes to — raise it
rather than assume it.

## Two things worth knowing before regenerating

**The uniform is IMAGE-GUIDELINES §3's canonical one, verbatim, in all three.**
Aqua polo, dark teal apron, dark teal rubber gloves. Keep the wording
identical in any new prompt or the library drifts again.

**Emptiness is the subject, and it has to be prompted hard.** Two of these
three frames are of a property between tenancies, and that is the only moment
this page's reader is buying. Generators fill rooms: ask for an empty rental
and you get a styled living room with a sofa in it, which silently turns a
vacancy clean into a house clean. The prompts say "totally empty", "no
furniture at all" and "bare" in the same sentence for that reason. The
keys-on-the-bench detail does the rest of the work — it is the one prop that
says *handover* rather than *nobody has moved in yet*.

---

## 1. Hero — the finished vacancy

Family A, square, `cover` fit. Square because `Placeholder` puts
`aspect-ratio` on the wrapper, so a box matching the file crops nothing.

The frame is the last ten minutes of a vacancy clean: empty rooms, the mop
and caddy still against the wall, keys already on the bench. The mop and
caddy are deliberate — without them an empty clean house is indistinguishable
from a real-estate listing photo, which is a different industry's imagery.

```
A cleaner finishing the last window of a completely empty, freshly vacated
rental home, spotless and ready for the exit inspection, calm and unhurried.

The room: a totally empty open-plan living area of a well-kept Australian
rental, no furniture at all, bare warm timber floorboards swept clean, plain
white walls, a wide sliding glass door and a tall window running along one
side, green subtropical foliage outside, a single plain cleaning caddy of
unlabelled bottles and a flat mop resting against the far wall, one plain
house key on a plain metal ring left on the kitchen bench in the mid
distance.

Light: bright mid-morning Australian coastal daylight flooding the empty
room, soft shadows, clean and airy, a faint sheen on the swept floor.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. Every garment is completely plain: no logos, no badges,
no name tag, no embroidery, no printing, no lettering. She is seen
three-quarters from the side, face in calm profile, drawing a folded
microfibre cloth down the glass.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey and green foliage. Absolutely no orange, no yellow, no red, no pink and
no strong blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no labels on any bottle, no
wall art, no paperwork, no screens showing anything.

Wide eye-level establishing shot, approximately 28mm, the whole empty room
readable around her, deep depth of field, square composition with the cleaner
and the window in the middle third.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 1:1
square, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 2. Card 1 — the vacancy with a window that is already too tight

**Two cleaners, and that is the entire point of the frame.** The card's
argument is capacity — that TLB can put more than one person on a property to
compress a turnaround, which a sole operator cannot. One cleaner arriving
illustrates the opposite claim. If this is ever reshot, keep the pair.

This is also the frame that replaces the American street (see the note
above), so the house itself is carrying a second job: it has to read
unmistakably as a Northern Rivers rental. Colorbond roof, weatherboard,
frangipani, native grasses, no kerbside sidewalk.

⚠️ No street number anywhere in frame, prompted explicitly. A house number on
a rental is the one identifying detail that turns generic service imagery
into a photograph of somebody's actual tenancy.

```
Two cleaners walking up the front path of a well-kept single-storey
Australian coastal rental house, each carrying a plain cleaning caddy of
unlabelled bottles, arriving to start a vacancy clean, calm and capable.

The setting: a tidy white weatherboard house with a low-pitched grey metal
roof and a small covered verandah, two pale timber verandah posts, a mown
lawn, a clipped native garden bed with grasses and a frangipani, a plain
concrete path, a low timber fence, lush green subtropical trees behind the
roofline and a strip of clear sky.

Light: bright mid-morning Australian coastal daylight, soft shadows, clean
and optimistic.

Both women wear plain aqua polo shirts and plain dark teal aprons, dark teal
rubber gloves tucked into the apron pockets. Every garment is completely
plain: no logos, no badges, no name tags, no embroidery, no printing, no
lettering. They are seen three-quarters from the front, walking toward the
camera, calm and friendly.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey and green foliage. Absolutely no orange, no yellow, no red, no pink
anywhere in the frame.

Nothing in the frame carries writing: no street number, no signage, no
letterbox lettering, no labels on any bottle.

Wide eye-level shot, approximately 28mm, the house readable behind them,
shallow but not extreme depth of field.

Bright Australian coastal exterior, natural mid-morning light, soft shadows,
optimistic bright grade. Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 3. Card 3 — standing work across the rent roll

The one **tenanted** frame in the folder, and the contrast with the other two
is the whole reason it exists: routine managed-property cleaning happens in a
property somebody lives in, and the card would misrepresent the service if it
showed an empty house like its neighbours.

The kitchen is deliberately modest rather than aspirational — laminate-look
benchtop, plain white cabinetry, a small dining table. A rent-roll property
is not a display home, and a luxury interior here would quietly suggest TLB
only takes the top of the market.

```
A cleaner wiping down the benchtop of the tidy, furnished kitchen of a
lived-in rental home during a routine scheduled clean, calm and unhurried.

The room: a well-kept but modest Australian rental kitchen, white cabinetry
with brushed steel handles, a pale stone benchtop, a stainless sink and oven,
a white subway tile splashback, a small pale timber dining table with two
chairs just in frame, a potted herb on the windowsill, a wide window over the
sink looking out to green subtropical foliage and a timber fence.

Light: bright mid-morning Australian coastal daylight through the window,
soft shadows, clean and airy.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. Every garment is completely plain: no logos, no badges,
no name tag, no embroidery, no printing, no lettering. She is seen
three-quarters from the side, face in calm profile, drawing a folded
microfibre cloth along the benchtop.

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

## What was NOT generated, and must not be

**An agency logo wall.** `/real-estate-cleaning/` reserves a slot for one
(`LogoBar.astro`) and it would be the strongest proof on the site, because
the agency relationship is the claim every other page borrows. It stays empty
until TLB holds written permission per mark, at principal level. A logo
assembled without it is a trademark problem and it is exactly the "fake
proof" IMAGE-GUIDELINES §7 rules out.

**A testimonial face.** Every quote on this page is still `[TBC]`, and the
avatars are labelled placeholders. A generated headshot beside an agency name
invents a property manager. See §7.

**A before/after pair.** The page runs the shared illustrative samples with
the `note` that says so. Real pairs are easier to obtain on this page than
anywhere else on the site — a vacant property has no tenant in it and nothing
identifying in frame — but they have to be photographed, not generated. §7
forbids a generated pair implying a specific job.

---

## Export settings used

All three were generated at the native sizes in the table above, then
re-encoded to JPEG with `sharp` at mozjpeg quality 86, which brought every
file between 99KB and 203KB — well inside the under-600KB budget
IMAGE-GUIDELINES §5 sets. No resizing; Astro re-encodes to webp at 400/800/1200
from these sources.
