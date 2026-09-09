# Image prompts: mould cleaning and removal

Outstanding image slots for [`src/pages/mould-cleaning-and-removal.astro`](../../../../pages/mould-cleaning-and-removal.astro).

Read [`IMAGE-GUIDELINES.md`](../../../../../IMAGE-GUIDELINES.md) first.

**Canonical uniform** (guidelines section 3): aqua polo, teal apron, teal
gloves. Verbatim, in every prompt where a cleaner appears.

---

## The problem this folder has, and it is not a small one

The house style in IMAGE-GUIDELINES.md section 2 is explicit: *bright*,
*optimistic*, *calm and finished*, *never moody*, and specifically **"not a
scrubbing-on-hands-and-knees advert"**.

This page is about mould. Every honest image of the problem is the opposite of
all of that.

All three of those slots are now filled from this sheet: the hero, the
bathroom-ceiling card and the condensation card. What is still reserved is
section 11's before/after gallery, which must stay that way until there are
real jobs to photograph (section 4 below).

### How this sheet resolves it

**Photograph the outcome and the cause, not the horror.** The page's whole
argument is that mould is a moisture problem in a normal coastal house, not a
verdict on how someone keeps their home. Imagery that leans into grim, dark,
neglected interiors contradicts the copy directly and, worse, shames the
reader the section 6 copy goes out of its way not to shame.

So:

- **The hero shows work in progress on a clean, ordinary bathroom**, not a
  ruined one. Bright, calm, a cleaner doing a job.
- **The condensation card shows water, not mould.** Condensation on a window
  is the actual subject of that card (moisture), it photographs beautifully in
  the house style, and it carries no shame.
- **Only the one bathroom-ceiling card shows visible mould**, and it is framed
  tight and kept modest: spotting along a cornice in an otherwise clean and
  well-kept bathroom. That is what most real jobs look like.

If a generated bathroom comes back looking derelict, reject it and re-prompt.
A dark, mouldy, neglected room is not this brand's picture of its own client.

---

## 1. Hero. Cut-out figure, PNG on transparency

**DONE.** Saved as `mould-cleaning-cleaner-wiping-along-a-bathroom-wall.png`,
**1080x1080** RGBA, 180KB, wired into the page at `ratio: '1/1'`. Keep the
notes below if it is ever reshot or regenerated.

Family B (guidelines section 1): a person with the background removed, on a
transparent canvas, so the section colour shows through. The page sets
`imageFit="contain-bottom"`, so the subject must be flush with the bottom of
its own frame or it will float.

⚠️ **Square canvas, cropped to the subject. Not the family's 1920x1080.**
Guidelines section 1 gives family B as 1920x1080 or 1364x1032, and both are
wrong for THIS slot. `split-single-image` renders the image with `contain`
into a panel that stretches to the copy's height, so the panel is roughly
square, and under a contain fit every empty pixel of canvas scales the
subject DOWN. On a 16/9 canvas the subject was 60% of the width, so it
rendered at about two thirds of the panel height. Cropped to the subject on a
square canvas it renders at full panel height, around 50% larger.

⚠️ **Frame it waist-up, not full-length.** This sheet originally asked for a
full standing figure with the feet flush to the bottom edge. Also wrong, for
the same underlying reason: a tall thin subject leaves even more of the
canvas empty. Every other cut-out in the library fills its frame and is
cropped by the edges. Match that.

Both mistakes are the same mistake. **Crop the canvas to the subject, then set
the slot's `ratio` to the canvas's own aspect.**

```
Waist-up medium shot of a cleaner reaching up and to the left with a cloth
to wipe along the top of a wall, head turned up and to the left, looking at
the work, seen in three-quarter profile facing left.
The body fills the right half of the frame and the raised arm reaches up
toward the upper left. Cropped at the waist by the bottom edge of the frame.
The head is near the top of the frame. The subject is large in frame and
fills the frame height.
One person wearing an aqua polo, teal apron and teal gloves.
Even soft light on the figure, no cast shadow on the ground.

Photorealistic studio cut-out of a person, 16:9, high resolution.
No text, no signage, no logos, no watermark, no border, no drop shadow,
no collage, no distorted hands, plain unbranded uniform.
```

**Getting real transparency.** Gemini does not return an alpha channel, so ask
for the figure "fully isolated on a completely flat solid pure magenta
(#FF00FF) background, nothing but flat magenta behind and around the figure"
and key it out afterwards. Keying magenta on its threshold alone leaves a
violet fringe; erode the matte by 1px and despill before feathering. A plain
green or white background is worse here, because the uniform is teal and the
cloth is white.

The figure must face **left**, into the copy, because the page places the
image on the right (`imagePosition="right"`), matching every other hero on the
site.

Save as `mould-cleaning-cleaner-wiping-along-a-bathroom-wall.png`, 1080x1080,
cropped to the subject. This one is allowed to be a PNG because it needs
transparency. Still aim under 600KB — quantizing to a 255-colour palette gets
a keyed figure there without visible banding.

## 2. Card 1. Bathroom ceiling with spotting

**DONE.** Saved as `mould-cleaning-spotting-along-a-bathroom-cornice.jpg`,
2400x1792, 310KB, wired into the page.

Family A scene photo. This is the one image on the page that shows the problem.

```
A close view along the join between a bathroom ceiling and cornice above a
shower, with scattered dark spotting along the cornice line and in the corner.
An otherwise clean, tidy, well-kept modern bathroom, white tiles, a glass
shower screen, one folded towel on a rail.
Mid-morning natural light through a frosted window, soft shadows.
No people in frame.
Eye-level shot looking slightly up, ~28mm.

Bright Australian coastal interior, white walls, natural window light,
soft shadows, bright grade.
Photorealistic, 4:3, high resolution.
No text, no signage, no logos, no watermark, no collage.
```

⚠️ Prompt for **spotting along a line**, not a covered ceiling. If the
generator returns a black, saturated, derelict-looking ceiling, reject it. The
copy for this card says "the most common one, and the most straightforward",
and an image of a catastrophe makes that sentence read as a lie.

Save as `mould-cleaning-spotting-along-a-bathroom-cornice.jpg`, 2400x1792,
under 600KB.

## 3. Card 3. Condensation on a bedroom window

**DONE.** Saved as `mould-cleaning-condensation-on-a-bedroom-window.jpg`,
2400x1792, 570KB, wired into the page.

Family A scene photo. The moisture card. No mould in this frame at all.

```
Condensation beaded and running down the inside of a bedroom window on a
humid morning, with the garden soft and out of focus beyond the glass.
A calm bedroom, pale linen, a timber sill, one plant on the sill.
Early morning natural light, soft shadows.
No people in frame.
Close eye-level shot, ~35mm, shallow depth of field on the glass.

Bright Australian coastal interior, white walls, warm timber, natural
window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.
No text, no signage, no logos, no watermark, no collage.
```

Save as `mould-cleaning-condensation-on-a-bedroom-window.jpg`, 2400x1792,
under 600KB.

---

## 4. The before/after gallery. NOT a generation job

Four slots in section 11, all reserved.

**These must never be generated.** IMAGE-GUIDELINES.md section 7 bars fake
before/after pairs implying a specific job, and BFD section 5.2 requires them
to come from genuine TLB jobs with client permission. The section is headed
"Real TLB mould cleans". Generating it would make that heading false.

Photography brief:

- Two pairs: a bathroom ceiling and cornice, and a window reveal and sill.
- **One fixed position per pair.** Mark the spot. Same light both times.
- 4:3, at least 1600px on the long edge.
- **Written client permission**, and the bar is higher here than on any other
  page: a mould photo says something about how a specific home has been kept.
  Ask plainly, take a no gracefully, and keep the frame tight on the surface.
- **Nothing identifying in frame.** No views out a window that locate the
  house, no belongings, no people.

---

## 5. Not currently needed, and deliberately so

**No video slot.** The page ships without a `VideoFeature`, unlike its
siblings, because a reserved video frame would sit directly under section 11's
four reserved before/after frames, and five empty boxes make a page read as
unbuilt rather than unphotographed. Add one when there is real footage, not
before.

**No flood imagery, ever.** The page's section 6 deliberately does not mention
the 2022 floods, because flood-affected mould is a remediation job the page
explicitly refers out to a licensed specialist. Imagery implying TLB does
flood work would contradict the copy and invite exactly the enquiry the page
says it will not take, in a region where that event is still raw.

---

## Before you commit anything from this sheet

Run the checklist in IMAGE-GUIDELINES.md section 9, plus the one extra
question this folder adds:

**Does this image make a normal person feel judged about their house?** If
yes, re-prompt. The whole page is built on "this is a mould climate, it is not
a reflection on how you keep your house", and a single grim photo undoes that
faster than any sentence can fix it.
