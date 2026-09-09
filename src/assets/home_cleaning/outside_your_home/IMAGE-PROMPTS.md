# Image prompts — Outside your home

The prompts behind the 21 assets in this folder tree, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

**One sheet for five folders, deliberately.** `commercial_cleaning/` keeps a
sheet per subfolder; this group does not, because all twenty frames were
generated in one pass from ONE set of shared clauses (§1 below) and the whole
point is that they read as a single shoot across five pages. Splitting the
sheet five ways would mean five copies of those clauses and five chances for
them to drift. Per-asset prompts are in §2 onwards, grouped by page.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `clean-coastal-home-exterior.jpg` | A, scene | 1376×768 | §2 backdrop on **all five pages** |
| `window_cleaning/cleaning-a-large-window-from-outside.jpg` | A, scene | 1024×1024 | window §1 hero |
| `window_cleaning/salt-hazed-sliding-door-glass.jpg` | A, scene | 1200×896 | window §3 card 1 |
| `window_cleaning/water-fed-pole-on-an-upstairs-window.jpg` | A, scene | 1200×896 | window §3 card 2 |
| `window_cleaning/cleaner-wiping-a-window-frame-and-track.jpg` | A, scene | 1200×896 | window §3 card 3 |
| `gutter_cleaning/clearing-leaf-litter-from-a-house-gutter.jpg` | A, scene | 1024×1024 | gutter §1 hero |
| `gutter_cleaning/blocked-gutter-packed-with-leaves.jpg` | A, scene | 1200×896 | gutter §3 story step 1 |
| `gutter_cleaning/cleaner-bagging-gutter-debris-on-the-lawn.jpg` | A, scene | 1200×896 | gutter §3 story step 2 |
| `gutter_cleaning/clear-gutter-and-downpipe-after-a-clean.jpg` | A, scene | 1200×896 | gutter §3 story step 3 |
| `roof_cleaning/soft-washing-a-tiled-house-roof.jpg` | A, scene | 1024×1024 | roof §1 hero |
| `roof_cleaning/black-algae-streaks-on-a-tiled-roof.jpg` | A, scene | 1200×896 | roof §3 grid row 1 |
| `roof_cleaning/half-treated-roof-tiles.jpg` | A, scene | 1200×896 | roof §3 grid row 2 |
| `roof_cleaning/cleaner-with-soft-wash-gear-beside-a-house.jpg` | A, scene | 1200×896 | roof §3 grid row 3 |
| `high_pressure_cleaning/pressure-cleaning-a-home-driveway.jpg` | A, scene | 1024×1024 | high pressure §1 hero |
| `high_pressure_cleaning/half-cleaned-paver-path.jpg` | A, scene | 1200×896 | high pressure §3 card 1 |
| `high_pressure_cleaning/cleaning-a-pool-surround-and-patio.jpg` | A, scene | 1200×896 | high pressure §3 card 2 |
| `high_pressure_cleaning/cleaner-beside-a-pressure-washer-on-a-driveway.jpg` | A, scene | 1200×896 | high pressure §3 card 3 |
| `exterior_house_washing/soft-washing-a-weatherboard-wall.jpg` | A, scene | 1024×1024 | house washing §1 hero |
| `exterior_house_washing/mould-and-algae-on-a-rendered-wall.jpg` | A, scene | 1200×896 | house washing §3 card 1 |
| `exterior_house_washing/clean-weatherboard-wall-and-eaves.jpg` | A, scene | 1200×896 | house washing §3 card 2 |
| `exterior_house_washing/cleaner-with-a-soft-wash-lance-at-a-house-wall.jpg` | A, scene | 1200×896 | house washing §3 card 3 |

Nothing here is reused from `../../commercial_cleaning/pressure/`, even though
the subject overlaps. Those four frames are a commercial forecourt and a
shopfront, and §5's rule cuts both ways: reuse the same file for the same
subject, but never relabel an existing photo to mean something it does not
show. A car park cannot stand in for a driveway.

---

## Five things worth knowing before regenerating

**⚠️ THE UNIFORM DEVIATES FROM §3, DELIBERATELY, and it matches the call
already made on `/commercial-pressure-cleaning/`.** The canonical uniform is
aqua polo, dark teal apron, dark teal gloves. **The apron is dropped in all
twelve people shots here**, replaced with dark teal work trousers and plain
black work boots, because an apron on a wet outdoor job reads as fancy dress
and undercuts the competence these pages are selling. Polo, gloves and palette
are unchanged. If TLB would rather hold the uniform absolutely constant
sitewide, all twelve regenerate with the apron added back and nothing else
changed.

**The palette line is not optional.** Real pressure washers, ladders, buckets
and safety harnesses are overwhelmingly yellow, orange, red or bright blue,
and §2/§4 rule all of that out. Every prompt names the equipment's colours
component by component. The clause that fixed it on the commercial page is
carried here verbatim: a blank grey control panel, no coloured buttons, no
stickers, no decals.

**No high-visibility vest.** A generator adds one to any outdoor worker unless
told not to, and hi-vis is yellow or orange by definition. Every people prompt
bans it explicitly.

**The two roof frames carry a harness on purpose.** It is the one piece of
equipment on these pages that is doing an argument's work rather than a
picture's: the roof page tells the reader nobody should be up there without
one. It is specified as plain dark teal for the same palette reason as
everything else.

**The "one frame, not a pair" rule bites twice here.** `half-cleaned-paver-path`
and `half-treated-roof-tiles` are single continuous surfaces with a clean
boundary across them, and both prompts ban split-screen framing explicitly.
IMAGE-GUIDELINES §7 forbids a generated before/after pair implying a specific
job; work in progress in one frame is a different thing. The real sliders on
these pages use the SAMPLE illustrations instead (see the bottom of this
sheet).

---

## 1. The shared clauses

Every per-asset prompt below is the asset's own opening lines followed by
these, in this order. They are what makes twenty frames look like one shoot.
Reproduced from `scripts/`-adjacent generation run; keep them together.

**PLACE**

```
A single-storey Australian coastal home in the Northern Rivers: white
weatherboard cladding with one section of warm timber, soft grey colorbond
roof, white window frames, clipped shrubs in pale planters, a young eucalypt
and a soft green hinterland treeline behind the roofline.
```

**UNIFORM** (people frames only)

```
One woman in a plain aqua polo shirt, dark teal work trousers, dark teal
waterproof gloves and plain black work boots. Every garment is completely
plain: no logos, no badges, no name tag, no embroidery, no printing, no
lettering, and no high-visibility vest.
```

**PALETTE**

```
Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, pale concrete, brushed metal and green foliage. Absolutely no yellow, no
orange, no red, no pink and no blue anywhere in the frame, including
equipment, hoses, lances, ladders, buckets, cones and footwear.
```

**NO TEXT**

```
Nothing in the frame carries writing: no signage, no labels, no stickers, no
warning decals, no house numbers, no number plates, no markings on the paving.
```

**GRADE**

```
Bright Australian coastal exterior, Northern Rivers, natural mid-morning
sunlight, clear sky, soft shadows, optimistic bright grade. Photorealistic,
high resolution.
```

**NEGATIVES**

```
No text, no signage, no logos, no watermark, no collage, no grid, no
split-screen framing, no border, no vignette, no distorted hands.
```

---

## 2. The shared backdrop — clean coastal home exterior

Sits behind the trust bar and the definition paragraph on **all five pages**,
under a Cream scrim at 75% with `focus="bottom"`. Purely atmospheric, so it
renders with `alt=""` and carries no people and no equipment. The composition
matters more than the subject: the lower third is deliberately open, clean
lawn and paving, because that is where the copy sits.

One file for five pages rather than five near-identical exteriors, which is
§5's reuse rule applied honestly: same subject, same file.

```
A wide establishing view of a freshly cleaned single-storey Australian coastal
home exterior, no people in frame. White weatherboard and warm timber
cladding, a colorbond roof in soft grey, clean glass windows, a tidy paved
path and lawn across the foreground, clipped shrubs in pale planters, a young
eucalypt to one side, soft green hinterland treeline and open sky behind the
roofline. Everything is spotless: no algae, no mould streaks, no cobwebs, no
leaf litter. Bright mid-morning coastal daylight, clear sky, soft shadows,
airy optimistic grade. Colour palette limited to white, warm timber, soft
grey, pale paving, glass reflections and green foliage. No yellow, no orange,
no red, no blue anywhere. Very wide eye-level establishing shot approximately
24mm, deep depth of field, open uncluttered composition with generous clean
lawn and paving across the lower third so text can sit over it.
Photorealistic, 16:9, high resolution. No text, no signage, no logos, no
watermark, no collage, no border, no vignette.
```

---

## 3. Window cleaning

**Hero — squeegeeing a window from outside.** Square, `cover` fit. Same
reasoning as every hero in this group: the house, the garden and the wet arc
on the glass are what say *window cleaning*, and none of them survives a
cut-out.

```
A cleaner squeegeeing a large ground-floor window from outside a home,
mid-stroke, a clean wet arc following the blade down the glass. [PLACE] The
equipment: a plain dark teal bucket on the paving beside her and a brushed
metal squeegee in her hand, completely unbranded. [UNIFORM] Seen
three-quarters from the side, face in calm profile, both arms working the
blade. The glass she has finished is clear and reflecting the sky; the pane
beside it still carries a faint salt haze. [PALETTE] [NO TEXT] Wide eye-level
shot, approximately 28mm, the house and garden readable around her, deep depth
of field, square composition with the cleaner in the middle third. [GRADE] 1:1
square. [NEGATIVES]
```

**Card 1 — the glass has gone cloudy.** No people: the subject is the film,
and a figure would compete with it.

```
A large sliding glass door on a coastal home seen from outside, the glass
dulled by a film of salt haze and hard water spotting, no people in frame.
[PLACE] The detail: white aluminium frames, a gritty build-up in the bottom
track, faint dried run marks down the pane, a cobweb in one top corner, the
reflection of the garden broken and cloudy where the film sits. [PALETTE] [NO
TEXT] Wide eye-level shot, approximately 28mm, angled slightly so the dull
film reads against the sky reflection, deep depth of field. [GRADE] 4:3.
[NEGATIVES]
```

**Card 2 — the high ones.** The pole is the argument, so the prompt bans a
ladder from the frame outright.

```
A cleaner standing safely on the ground using a long water-fed extension pole
with a soft brush head to clean a first-floor window on a home, both hands on
the pole, looking up at her work. [PLACE] The equipment: a plain telescopic
pole in brushed metal and dark teal with a soft grey brush head at the top, a
slim grey hose running down the pole to a plain dark teal filter trolley on
the lawn. Completely unbranded. No ladder in frame. [UNIFORM] [PALETTE] [NO
TEXT] Wide low eye-level shot, approximately 28mm, the upper storey and the
pole both readable in frame, deep depth of field. [GRADE] 4:3. [NEGATIVES]
```

**Card 3 — done with everything else.** A visible, friendly face, because the
copy beside it promises the same small team.

```
A woman in a cleaning uniform crouched at the base of a large window on a
home, wiping the frame and sill track with a cloth, turning toward the camera
with a calm, friendly, open expression. [PLACE] The equipment: a plain dark
teal bucket and a folded soft grey cloth on the paving beside her, a brushed
metal squeegee resting against the wall. Completely unbranded. [UNIFORM]
[PALETTE] [NO TEXT] Wide eye-level shot, approximately 28mm, soft shadows on
her face, no hard flash, shallow but not extreme depth of field. [GRADE] 4:3.
[NEGATIVES]
```

---

## 4. Gutter cleaning

**Hero — clearing leaf litter.** The ladder detail is load-bearing: the page
tells readers not to do this themselves, so the frame has to show it done
properly. Footed on firm level ground, tied at the top, leaning on the fascia
rather than the gutter.

```
A cleaner standing on a correctly footed extension ladder at the edge of a
house roof, lifting a double handful of damp eucalypt leaf litter out of the
gutter into a plain dark teal bucket hooked to the ladder. [PLACE] The detail:
the run of gutter she has cleared is bare grey metal; the run ahead of her is
still packed with brown leaves and twigs. The ladder is plain brushed metal
and dark teal, standing on firm level lawn, tied off at the top, its base
clear of the garden bed. Completely unbranded. [UNIFORM] [PALETTE] [NO TEXT]
Wide eye-level shot from the ground looking up along the roof edge,
approximately 28mm, the ladder, the gutter and the roofline all readable, deep
depth of field, square composition. [GRADE] 1:1 square. [NEGATIVES]
```

**Story step 1 — what is actually in there.** The seedling is the detail that
says "two seasons", which the copy also says.

```
A close wide view along a blocked house gutter packed solid with damp brown
eucalypt leaves, bark strips and twigs, with a small fern seedling sprouting
from the debris, no people in frame. [PLACE] The detail: the gutter is
overflowing at one join, a dark stain runs down the white weatherboard below
it, the downpipe mouth is buried under litter, and the roof sheeting above is
scattered with more leaves. [PALETTE] [NO TEXT] Wide shot angled down along
the length of the gutter from just above roof height, approximately 28mm, the
blockage clearly readable, deep depth of field. [GRADE] 4:3. [NEGATIVES]
```

**Story step 2 — it comes out by hand.** The tarp and the bag are the promise
the copy makes about the debris leaving with us.

```
A woman in a cleaning uniform standing on the lawn beside a house, tipping a
plain dark teal bucket of damp leaf litter into a large plain grey garden bag,
turning toward the camera with a calm, friendly, open expression. [PLACE] The
equipment: a plain brushed metal and dark teal extension ladder leaning safely
against the roof edge behind her, a soft grey tarpaulin spread on the grass
under the bag. Completely unbranded. The lawn around her is clean, with no
scattered debris left on it. [UNIFORM] [PALETTE] [NO TEXT] Wide eye-level
shot, approximately 28mm, soft shadows on her face, shallow but not extreme
depth of field. [GRADE] 4:3. [NEGATIVES]
```

**Story step 3 — flushed and checked.** Deliberately the least dramatic frame
on the page, and the one that proves the last step happened.

```
A close wide view along a completely clear house gutter, the bare grey metal
channel empty and swept, a small trickle of clean water running freely into
the downpipe mouth, no people in frame. [PLACE] The detail: no leaves anywhere
in the channel or on the roof sheeting, the white fascia clean and unstained,
the downpipe plain and unblocked, a soft green treeline beyond the roofline.
[PALETTE] [NO TEXT] Wide shot angled down along the length of the gutter from
just above roof height, approximately 28mm, deep depth of field. [GRADE] 4:3.
[NEGATIVES]
```

---

## 5. Roof cleaning

**Hero — soft washing a tiled roof.** The harness and the low fan of solution
are both arguments, not decoration: the page's whole case is that this is done
gently and safely.

```
A cleaner on a house roof soft washing the tiles with a low pressure lance, a
gentle fan of cleaning solution laying onto the surface rather than blasting
it, wearing a plain dark teal safety harness clipped to an anchor line.
[PLACE] The detail: concrete roof tiles running away from the camera, the
section she has treated pale and even, the section ahead of her still dark
with black algae and patches of pale green lichen. The equipment is plain
grey, dark teal and brushed metal and completely unbranded, with a grey hose
running back over the ridge. [UNIFORM] plus the plain dark teal harness. Seen
three-quarters from behind and the side, face in calm profile. [PALETTE] [NO
TEXT] Wide eye-level shot along the roof plane, approximately 28mm, the
treated and untreated tiles both clearly readable, deep depth of field, square
composition. [GRADE] 1:1 square. [NEGATIVES]
```

**Grid row 1 — what the black streaking is.**

```
A wide view across a concrete tiled house roof heavily streaked with black
algae and blotched with pale green lichen, no people in frame. [PLACE] The
detail: the dark staining runs downslope in soft vertical streaks from the
ridge, thickest on the shaded southern side and along the valley, with lichen
crusted around a few tile edges and leaf litter caught in the valley.
[PALETTE] [NO TEXT] Wide eye-level shot along the roof plane from ridge
height, approximately 28mm, the staining pattern clearly readable, deep depth
of field. [GRADE] 4:3. [NEGATIVES]
```

**Grid row 2 — what a soft wash does.** One continuous surface, half done. Not
a pair.

```
A concrete tiled house roof halfway through a soft wash, with a soft irregular
boundary across the tiles between the stained side and the clean side, no
people in frame. [PLACE] The detail: the untreated portion is streaked black
with algae and blotched with pale green lichen; the treated portion is pale
even grey concrete, faintly damp. A plain grey hose lies across the clean
tiles and runs out of frame. One continuous roof surface, not two photographs.
[PALETTE] [NO TEXT] Wide eye-level shot along the roof plane, approximately
28mm, both halves clearly readable in the one frame, deep depth of field.
[GRADE] 4:3. [NEGATIVES]
```

**Grid row 3 — who is on your roof.** The blank control panel clause is the
one that had to be spelled out on the commercial page and it is kept verbatim.

```
A woman in a cleaning uniform standing on the lawn beside a house with soft
wash equipment, one hand resting on the frame of the unit and a plain dark
teal safety harness over her shoulder, turning toward the camera with a calm,
friendly, open expression. [PLACE] The equipment: a plain low pressure soft
wash unit on the grass beside her with a neatly coiled grey hose and a lance
resting on the frame. Every component is grey, dark teal or brushed metal, the
control panel a plain blank grey face with no coloured buttons, no knobs, no
dials, no gauges and no stickers of any kind, the housing bare with no plates
and no markings. [UNIFORM] [PALETTE] [NO TEXT] Wide eye-level shot,
approximately 28mm, the house and roofline readable behind her, soft shadows
on her face, shallow but not extreme depth of field. [GRADE] 4:3. [NEGATIVES]
```

---

## 6. High pressure cleaning (homes)

**Hero — washing a driveway.** The residential answer to the commercial
page's forecourt hero, and the reason nothing was reused between them.

```
A cleaner pressure washing the concrete driveway of a home, mid-task, a bright
clean wet arc spreading across the slab in front of the wand. [PLACE] The
equipment: a plain petrol pressure washer unit in grey and dark teal only
standing on the driveway behind her, a grey high pressure hose coiling across
the slab to the lance in her hands, completely unbranded, every part grey,
dark teal or brushed metal. Fine spray at the nozzle, the concrete darker and
glossy where it has been cleaned and weathered grey where it has not.
[UNIFORM] Both hands on the lance, seen three-quarters from the side, face in
calm profile. [PALETTE] [NO TEXT] Wide eye-level shot, approximately 28mm, the
house and driveway readable around her, deep depth of field, square
composition with the cleaner and her machine in the middle third. [GRADE] 1:1
square. [NEGATIVES]
```

**Card 1 — green and slippery.** One frame, half done, split-screen banned.

```
A paved path and patio beside a home halfway through being pressure cleaned,
with a sharp straight line running across the pavers between the grimy grey
side and the bright clean side, no people in frame. [PLACE] The detail: the
untouched portion is weathered mid-grey with black grime and green algae in
the joints and along the shaded edge; the cleaned portion is pale, even and
slightly damp. The boundary is a clean straight edge, obviously the width of a
rotary surface cleaner. A plain grey high pressure hose lies across the clean
section and runs out of frame. One continuous paved surface, not two
photographs. [PALETTE] [NO TEXT] Wide eye-level shot angled down at the
paving, approximately 28mm, both halves clearly readable, deep depth of field.
[GRADE] 4:3. [NEGATIVES]
```

**Card 2 — we have people coming.** The pool is what makes this frame read as
a home rather than a workplace, which is the whole lane this page has to hold.

```
A cleaner pressure washing the paved surround of a backyard swimming pool at a
home, working the lance in a slow sweep across the pavers, the cleaned stone
pale and wet behind her. [PLACE] The detail: a rectangular pool of still clear
water at one side reflecting the sky, pale stone coping and paving, a clipped
hedge and a young eucalypt along the fence line, outdoor timber bench pushed
clear of the wet area. The equipment is a plain grey and dark teal pressure
washer with a grey hose, completely unbranded. [UNIFORM] [PALETTE] [NO TEXT]
Wide eye-level shot, approximately 28mm, the pool and paving readable around
her, deep depth of field. [GRADE] 4:3. [NEGATIVES]
```

**Card 3 — I want it to stay done.** Blank control panel clause again.

```
A woman in a cleaning uniform standing beside her pressure cleaning equipment
on the driveway of a home, one hand resting on the frame of the machine,
turning toward the camera with a calm, friendly, open expression. [PLACE] The
equipment: a plain petrol pressure washer unit on the driveway beside her with
a neatly coiled grey high pressure hose and a lance resting against the frame.
Every single component is grey, dark teal or brushed metal with no exceptions:
frame, wheels, engine housing, pump, hose, lance, handle and control panel.
The control panel is a plain blank grey face with no coloured buttons, no
coloured knobs, no switches, no dials, no gauges and no stickers of any kind.
The engine casing is bare brushed metal and dark teal with no plates and no
markings. [UNIFORM] [PALETTE] [NO TEXT] Wide eye-level shot, approximately
28mm, the house and driveway readable behind her, soft shadows on her face,
shallow but not extreme depth of field. [GRADE] 4:3. [NEGATIVES]
```

---

## 7. Exterior house washing

**Hero — soft washing a weatherboard wall.** Top down, which is the order the
page argues for, and the treated section is visibly brighter than the one
beside it.

```
A cleaner soft washing the white weatherboard wall of a home with a low
pressure lance, a gentle fan of cleaning solution laying onto the boards
rather than blasting them, working from the top of the wall downwards. [PLACE]
The detail: the section of wall she has treated is bright white and faintly
damp, the section beside it still carries a grey green film of mould and a
dusting of cobwebs under the eaves. The equipment is plain grey, dark teal and
brushed metal, completely unbranded, with a grey hose running back across the
lawn. [UNIFORM] Seen three-quarters from the side, face in calm profile.
[PALETTE] [NO TEXT] Wide eye-level shot, approximately 28mm, the wall and
eaves readable around her, deep depth of field, square composition with the
cleaner in the middle third. [GRADE] 1:1 square. [NEGATIVES]
```

**Card 1 — what five years looks like.** The sunlit corner in the distance is
deliberate: it is what proves the colour is growth rather than paint.

```
A close wide view of the shaded rendered side wall of a home, filmed with grey
green mould and algae, no people in frame. [PLACE] The detail: soft dark
streaks running down the render below the eaves and under a window sill, a
patch of green growth spreading up from the garden bed at the base of the
wall, cobwebs in the corner of the window reveal, the white window frame
greyed with grime. The sunlit corner of the same wall in the distance is
noticeably cleaner, which shows how much of it is growth rather than paint.
[PALETTE] [NO TEXT] Wide eye-level shot, approximately 28mm, the staining
clearly readable, deep depth of field. [GRADE] 4:3. [NEGATIVES]
```

**Card 2 — the same wall, washed.** Composed to match card 1's framing as
closely as a generator allows, without being sold as the same wall: the page
calls it "the same wall" in a card heading, and that is a rhetorical device,
not a claim about a specific job. The honest before/after is the slider, and
it is labelled a sample.

```
A close wide view of the freshly washed white weatherboard wall and eaves of a
home, no people in frame. [PLACE] The detail: the boards are bright, even and
spotless with no mould film and no streaks, the eaves and soffit are clean
with no cobwebs, the white window frames and sills are bright, the render at
the base of the wall is clear of green growth, and a strip of tidy garden bed
runs along the foot of the wall. [PALETTE] [NO TEXT] Wide eye-level shot,
approximately 28mm, deep depth of field. [GRADE] 4:3. [NEGATIVES]
```

**Card 3 — who does it.**

```
A woman in a cleaning uniform standing on the lawn beside the washed wall of a
home holding a low pressure soft wash lance across her body, turning toward
the camera with a calm, friendly, open expression. [PLACE] The equipment: a
plain low pressure soft wash unit on the grass behind her with a neatly coiled
grey hose. Every component is grey, dark teal or brushed metal, the control
panel a plain blank grey face with no coloured buttons, no knobs, no dials, no
gauges and no stickers of any kind. Completely unbranded. [UNIFORM] [PALETTE]
[NO TEXT] Wide eye-level shot, approximately 28mm, the clean wall and eaves
readable behind her, soft shadows on her face, shallow but not extreme depth
of field. [GRADE] 4:3. [NEGATIVES]
```

---

## The before/after sliders are NOT in this folder

Each of the five pages runs a `BeforeAfter` slider, and none of those images
is a photograph or a generated photograph. They are flat vector SAMPLE
illustrations in `../before_after/`, built by
`scripts/make-exterior-before-after-samples.mjs`, each stamped with a visible
SAMPLE badge, and each page carries the component's `note` prop saying so in
the reader's own view.

They cannot be generated as photos. `BeforeAfter` wipes one frame over the
other in place, so both must be the SAME SCENE from the SAME CAMERA POSITION,
and a generator produces two different houses. §7 also forbids a generated
pair implying a specific job.

The real photo brief for each pair lives in the page that uses it, at that
page's before/after block: one surface, fixed tripod, nothing moved between
the frames, same time of day so the shadow line matches. The driveway pair is
the highest value one to shoot first, because concrete shows the change
better than anything else on a house.
