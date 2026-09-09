# Image prompts — commercial pressure cleaning

The prompts behind the five assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `pressure-cleaning-a-commercial-forecourt.jpg` | A, scene | 1024×1024 | §1 hero |
| `clean-commercial-forecourt-and-entry.jpg` | A, scene | 1376×768 | §2 backdrop |
| `half-cleaned-concrete-car-park.jpg` | A, scene | 1200×896 | §3 card 1 |
| `pressure-cleaning-a-shopfront-footpath-before-opening.jpg` | A, scene | 1200×896 | §3 card 2 |
| `cleaner-with-a-pressure-washer-on-a-commercial-forecourt.jpg` | A, scene | 1200×896 | §3 card 3 |

Nothing on `/commercial-pressure-cleaning/` is reused from `../`. All four
frames there are indoor office scenes, and §5's rule cuts both ways: reuse the
same file for the same subject, but never relabel an existing photo to mean
something it does not show. An office kitchenette cannot stand in for a car
park.

## Four things worth knowing before regenerating

**⚠️ THE UNIFORM DEVIATES FROM §3, DELIBERATELY.** The canonical uniform is
aqua polo, dark teal apron, dark teal gloves. **The apron is dropped in all
three people shots here**, replaced with dark teal work trousers and plain
black work boots, because an apron on a wet outdoor high-pressure job reads as
fancy dress and undercuts the competence the page is selling. Polo, gloves and
palette are unchanged, so the three frames still sit beside the indoor ones
without looking like a different company. This is flagged in the page source
too. If TLB would rather hold the uniform absolutely constant sitewide, all
three regenerate with the apron added back and nothing else changed.

**The palette line is not optional, and this subject is the worst offender in
the library.** Real pressure washers are overwhelmingly yellow, orange, red or
bright blue, and real hazard cones and A-frames are orange or yellow with black
lettering, all of which §2 and §4 rule out. Every prompt below names the
machine's colours component by component and the cone as blank. The first take
of card 3 still came back with red, green and yellow control knobs and a small
decal on the engine casing and had to be regenerated with an explicit
"blank grey control panel, no coloured buttons, no stickers" clause. Keep that
clause.

**No high-visibility vest.** A generator adds one to any outdoor worker unless
told not to, and hi-vis is yellow or orange by definition. Every people prompt
here bans it explicitly.

**Line marking and bay numbers are lettering.** A car park is the one setting
where a generator will paint text and symbols onto the ground without being
asked. Both surface prompts ban painted markings of any colour outright.

---

## 1. Hero — washing a forecourt

Family A, square, `cover` fit. Same reasoning as the hub's foyer hero: the
building, the forecourt and the petrol unit are what say *commercial*, and none
of them survives a cut-out.

**Square.** `Placeholder` puts `aspect-ratio` on the wrapper, so a box matching
the file crops nothing. Regenerate square, or change the page's `ratio` too.

```
A commercial cleaner pressure washing the concrete forecourt outside a small
modern commercial building, mid-task, a clean wet arc spreading across the slab
in front of the wand.

The place: a low modern Australian commercial building with white rendered
walls, warm timber cladding on one section and floor-to-ceiling glass shopfront
glazing, a plain concrete forecourt and footpath running across the foreground,
two clipped shrubs in large white planters, a young eucalypt to one side, a soft
green hinterland treeline in the background.

The equipment: a plain petrol pressure washer unit in grey and dark teal only,
standing on the concrete behind her with a grey high-pressure hose coiling
across the slab to the lance in her hands. Completely unbranded. Every part of
the unit, hose, lance and frame is grey, dark teal or brushed metal. Fine water
spray at the nozzle, the concrete darker and glossy where it has been cleaned.

Light: bright mid-morning coastal daylight, clear sky, soft shadows, water
catching the light.

One woman in a plain aqua polo shirt, dark teal work trousers, dark teal
waterproof gloves and plain black work boots, both hands on the lance, seen
three-quarters from the side, face in calm profile. The uniform is completely
plain: no logos, no badges, no printing, no lettering, no high-visibility vest.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, wet concrete, brushed metal and green foliage. Absolutely no yellow, no
orange, no red, no pink and no blue equipment or clothing anywhere in the frame,
including the pressure washer, the hose, the lance and the boots.

Nothing in the frame carries writing: no shop signage, no wayfinding, no line
marking, no parking symbols, no labels on the machine, no number plates, no
screens.

Wide eye-level establishing shot, approximately 28mm, the building and forecourt
readable around her, deep depth of field, square composition with the cleaner
and her machine in the middle third.

Bright Australian coastal commercial exterior, Northern Rivers, white render,
warm timber, natural sunlight, soft shadows, optimistic bright grade.
Photorealistic, 1:1 square, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette, no distorted hands.
```

## 2. Backdrop — clean forecourt and entry

Sits behind the trust bar and the definition paragraph, under a Cream scrim at
75%. Purely atmospheric, so it renders with `alt=""` and carries no people and
no equipment. The composition matters more than the subject: the lower third is
deliberately open, clean paving, because that is where the copy sits.

This page does **not** borrow the homepage's indoor frame the way the hub and
the carpet sibling do. An interior behind an outdoor page's copy was a
compromise worth spending one generation to fix.

```
A wide establishing view of the clean paved forecourt and entry of a low modern
Australian commercial building, freshly washed and immaculate. No people in
frame.

The place: a single-storey modern commercial building with plain white rendered
walls, a section of warm timber cladding, a wide glass shopfront and a recessed
glass entry, a broad pale concrete forecourt and footpath sweeping across the
foreground, three large white planters with clipped shrubs, a young eucalypt at
one edge, soft green hinterland treeline and open sky behind the roofline.

The surface: the concrete is pale, even and spotless, very slightly damp with a
soft sheen as though just cleaned, no stains, no algae, no gum marks, no oil.

Light: bright mid-morning coastal daylight, clear sky, soft shadows, airy and
optimistic.

No people in frame, no vehicles in frame, no equipment in frame.

Colour palette strictly limited to white render, warm timber, pale concrete,
soft grey, glass reflections and green foliage. Absolutely no yellow, no orange,
no red, no pink and no blue anywhere in the frame, and no painted line marking
of any colour.

Nothing in the frame carries writing: no shop signage, no wayfinding, no street
signs, no window lettering, no painted symbols on the paving.

Very wide eye-level establishing shot, approximately 24mm, deep depth of field,
the composition open and uncluttered with generous empty paving across the lower
third so text can sit over it.

Bright Australian coastal commercial exterior, Northern Rivers, natural
sunlight, soft shadows, optimistic bright grade. Photorealistic, 16:9, high
resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette.
```

## 3. Card 1 — the place looks grubby

The most persuasive frame in this category, and the only one on the page with
nobody in it. The subject is the surface, and a figure would compete with the
line down the middle of it.

**One frame, not a pair.** The prompt asks for a single continuous slab with a
clean edge across it, and explicitly bans split-screen framing. §7 forbids a
before/after pair implying a specific job; a half-finished surface in one frame
is work in progress, which is a different thing.

```
A concrete car park surface halfway through being pressure cleaned, with a sharp
straight line running across the slab between the grimy grey side and the bright
clean side. No people in frame.

The place: an open commercial car park bay area of plain broom-finished concrete
filling most of the frame, seen from standing height looking down and across, a
low white rendered wall and a clipped hedge along the far edge, a young eucalypt
and soft green hinterland treeline beyond, one corner of a modern commercial
building with timber cladding at the top right.

The surface: the untouched left portion is weathered mid-grey with black grime,
algae staining in the shaded strip and a faint dark oil patch. The cleaned right
portion is pale, even and slightly damp. The boundary between them is a clean
straight edge, obviously the width of a rotary surface cleaner. A plain grey
high-pressure hose lies across the clean section and runs out of frame.

Light: bright mid-morning coastal daylight, clear sky, soft shadows, the damp
concrete catching a low sheen.

No people in frame, no vehicles in frame.

Colour palette strictly limited to grey concrete, white render, soft green
foliage, warm timber and brushed metal. Absolutely no yellow, no orange, no red,
no pink and no blue anywhere in the frame, and no painted line marking of any
colour.

Nothing in the frame carries writing: no signage, no bay numbers, no painted
symbols, no arrows, no labels.

Wide eye-level shot angled down at the slab, approximately 28mm, deep depth of
field, the dirty and clean halves both clearly readable.

Bright Australian coastal commercial exterior, Northern Rivers, natural
sunlight, soft shadows, optimistic bright grade. Photorealistic, 4:3, high
resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no
split-screen framing, no border, no vignette.
```

## 4. Card 2 — maintained, not rescued

The card is about work that happens on a schedule and around trading, so the
prompt puts it at first light outside a shopfront that has not opened yet: dark
interior, nobody about. The blank A-frame is load-bearing. It signals the
exclusion zone the scope block promises without carrying the lettering a real
one would have.

```
A commercial cleaner pressure washing the footpath and entry paving outside a
small shopfront early in the morning, before opening, working the lance in a
slow sweep.

The place: a single modern Australian shopfront with a plain white rendered
facade, warm timber trim, a wide glass window and a glass entry door with the
interior dark and unlit behind it, a plain concrete footpath and paved entry
threshold running across the foreground, two clipped shrubs in white planters
flanking the door, a street tree at the left edge.

The equipment: a plain petrol pressure washer unit in grey and dark teal only,
standing on the footpath with a grey high-pressure hose running to the lance in
her hands. Completely unbranded. Every part is grey, dark teal or brushed metal.
A plain grey and dark teal folding hazard cone stands at the edge of the wet
area, completely blank with no lettering or symbols on it. Fine spray at the
nozzle, the paving darker and glossy where it has been cleaned.

Light: soft early morning coastal daylight just after sunrise, long gentle
shadows, cool clean light, the wet paving reflecting the sky. Bright and
optimistic rather than dim.

One woman in a plain aqua polo shirt, dark teal work trousers, dark teal
waterproof gloves and plain black work boots, both hands on the lance, seen
three-quarters from the side, face in calm profile. The uniform is completely
plain: no logos, no badges, no printing, no lettering, no high-visibility vest.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, wet concrete, brushed metal and green foliage. Absolutely no yellow, no
orange, no red, no pink and no blue equipment, clothing or cone anywhere in the
frame.

Nothing in the frame carries writing: no shop signage, no window lettering, no
opening hours, no menu board, no A-frame, no cone lettering, no labels on the
machine.

Wide eye-level shot, approximately 28mm, the shopfront and footpath readable
around her, shallow but not extreme depth of field.

Bright Australian coastal commercial exterior, Northern Rivers, white render,
warm timber, natural morning sunlight, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette, no distorted hands.
```

## 5. Card 3 — who is on my site

This card's job is a visible, approachable face, because the copy beside it
promises "the same small team you have met". A figure turned away would argue
against its own caption. Same reasoning as the hub's kitchenette card.

**This is the take that needed regenerating.** The first one came back with red,
green and yellow control knobs on the panel and a small warning decal on the
engine casing, which is what a real unit looks like and what §2 and §4 forbid.
The clause naming the panel blank and the casing unmarked is the fix. Keep it.

```
A woman in a cleaning uniform standing beside her pressure cleaning equipment on
a commercial forecourt, turning toward the camera with a calm, friendly, open
expression, one hand resting on the frame of the machine.

The place: the paved forecourt of a low modern Australian commercial building,
plain white rendered wall and warm timber cladding behind her, a glass shopfront
window to one side reflecting the sky, a large white planter with a clipped
shrub, soft green hinterland treeline in the distance.

The equipment: a plain petrol pressure washer unit standing on the paving beside
her, with a neatly coiled grey high-pressure hose and a lance resting against
the frame. The machine is completely plain and completely unbranded. Every
single component of it is grey, dark teal or brushed metal with no exceptions:
the frame, the wheels, the engine housing, the pump, the hose, the lance, the
handle and the control panel. The control panel is a plain blank grey face with
no coloured buttons, no coloured knobs, no coloured switches, no dials, no
gauges, no warning stickers and no decals of any kind. The engine casing is bare
brushed metal and dark teal with no stickers, no plates and no markings.

Light: bright mid-morning coastal daylight, clear sky, soft shadows on her face,
no hard flash.

She wears a plain aqua polo shirt, dark teal work trousers, dark teal waterproof
gloves and plain black work boots. Every garment is completely plain: no logos,
no badges, no name tag, no embroidery, no printing, no lettering, no
high-visibility vest.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, brushed metal and green foliage. Absolutely no yellow, no orange, no red,
no pink and no blue anywhere in the frame, and specifically none on the machine,
its buttons, its knobs, its stickers or its engine.

Nothing in the frame carries writing: no signage, no labels, no stickers, no
warning decals, no window lettering, no number plates, no markings on the
paving.

Wide eye-level shot, approximately 28mm, the forecourt readable around her,
shallow but not extreme depth of field.

Bright Australian coastal commercial exterior, Northern Rivers, white render,
warm timber, natural sunlight, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border, no
vignette, no distorted hands.
```

---

## Still missing: the before/after pair

The page reserves a slot for `BeforeAfter.astro`, and a half-cleaned car park is
the most persuasive image in this category. It cannot be generated.
`BeforeAfter` wipes one frame over the other in place, so both must be the SAME
SCENE from the SAME CAMERA POSITION, and a generator produces two different car
parks. §7 also forbids a generated pair implying a specific job.

Card 1 above is the closest a generated asset can honestly get: one frame,
half done. The slider needs real photography, tripod locked off, nothing moved
between the frames, no car parked in the second shot.
