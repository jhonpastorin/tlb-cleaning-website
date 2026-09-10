# Image prompts — the thirteen "by type of premises" pages

The prompts behind the 34 assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI. Every
frame is family A (scene photo, JPEG, opaque) — there are **no cut-out
figures** in this folder, because none of these thirteen pages uses a hero
that needs one. See §1 below for why.

The generation scripts that produced these are throwaway and were not kept;
the prompts here are the record. To regenerate one, run the CLI directly:

```bash
node "<media-pipeline>/mcp-server/build/cli.bundle.js" \
  -a "16:9" -o "src/assets/commercial_cleaning/premises/<name>.jpg" \
  -p "<the prompt from below, plus the shared blocks in §2>"
```

---

## 1. Four decisions that apply to every frame here

**Scene photos, not cut-outs.** Following the call the hub made at TLB's
direction: a studio cut-out on a plain background says "a cleaner" without
saying *commercial*. On these pages the room is the argument — a boardroom, a
bin room, a brew deck — so every hero is family A and takes `Placeholder`'s
`cover` default rather than a `contain` fit.

**16:9 for heroes, 4:3 for cards.** Heroes are generated at 16:9 and the page
sets `ratio: '16/9'`, so a box matching the file crops nothing. Cards are 4:3
against a `ratio: '4/3'` slot. The three `ImageBand` slots are the deliberate
exception: they put a 4:3 source in a `16/9` box, so `cover` crops top and
bottom. Each of those is noted at its call site with what was checked to
survive the crop.

**The uniform is IMAGE-GUIDELINES §3's canonical one, verbatim** — aqua polo,
dark teal apron, dark teal rubber gloves — with three documented exceptions:

| Exception | Where | Why |
|---|---|---|
| Fluorescent lime-green hi-vis vest, no apron | construction (3 frames), warehouse (2), factory (2) | A cleaner on a live site or a forklift aisle wears hi-vis. Lime-green is the standard Australian hi-vis colour and the closest real one to the brand's Mint Green. An apron in a traffic zone would be a photo of something that must not happen. |
| Plain white hair net added | `factory-wash-down-of-stainless-production-equipment` | Food production requires it. A frame without one would be a photo of a breach. |
| Tall rubber gumboots, no vest | both brewery production frames | A brew deck floor is wet by design. It is not a vehicle traffic zone, so a vest would misrepresent the setting. |

**The palette line is not optional, and it is the line that fails most often.**
Generators reach for a complementary pop colour unless told not to, and
cleaning equipment is the worst case: real extractors, buckets and machines are
almost always yellow, red or bright blue. Every prompt names the machine's
colours part by part for that reason. Keep the palette block (§2) verbatim.

---

## 2. The shared blocks

Every prompt below is the subject-specific text **plus** these. Paste them in
rather than paraphrasing — the wording is what holds the library together.

**UNIFORM** (default — see §1 for the three exceptions)

```
One woman in a plain aqua polo shirt, a plain dark teal apron, dark teal rubber
gloves and dark trousers, mid-task, seen three-quarters from the side, face in
calm profile. The uniform is completely plain: no logos, no badges, no
printing, no lettering.
```

**HI-VIS UNIFORM** (construction, warehouse, factory production frames)

```
She wears a plain aqua polo shirt, dark trousers, dark teal rubber gloves,
sturdy grey work boots and a fluorescent lime-green high-visibility vest with
silver reflective bands. The vest and uniform are completely plain: no logos,
no badges, no printing, no lettering. Seen three-quarters from the side, face
in calm profile, mid-task.
```

**PALETTE** (interiors)

```
Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, brushed metal and green foliage. Absolutely no yellow, no orange, no red,
no pink and no blue anywhere in the frame.
```

**PALETTE, HI-VIS VARIANT** (industrial frames — the one place yellow-green is
allowed, and only on the vest)

```
Colour palette limited to dark teal, aqua, white, pale concrete grey, stainless
steel, brushed metal, fluorescent lime-green and green foliage. No orange, no
red, no pink, no blue anywhere in the frame.
```

**NO WRITING**

```
Nothing in the frame carries writing: no signage, no wayfinding, no wall
lettering, no labels, no screens showing anything.
```

**NEGATIVES**

```
No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

**GRADE** (adjust the setting noun, keep the rest)

```
Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
16:9, high resolution.
```

---

## 3. The assets, by page

Ratios are the native generation ratio, which matches the slot except where
the Slot column says otherwise.

### Office cleaning

| Asset | Native | Slot |
|---|---|---|
| `office-cleaner-wiping-a-boardroom-table-after-hours.jpg` | 16:9 | §1 hero |
| `office-cleaner-emptying-desk-bins-along-a-workstation-bank.jpg` | 4:3 | §3 card 1 |
| `office-cleaner-restocking-a-kitchenette-and-wiping-the-sink.jpg` | 4:3 | §3 card 3 |

§3 card 2 REUSES the hub's `commercial-cleaner-and-office-manager-talking-in-reception.jpg`
from `../`, per IMAGE-GUIDELINES §5 — the subject is the walkthrough where a
scope gets agreed, which is what the hub uses that frame to mean, and the label
is the hub's verbatim.

**Hero.** Subject: *A commercial cleaner wiping down a long boardroom table in
a bright open-plan office after hours, calm and unhurried.* Room: pale timber
boardroom table, grey mesh task chairs pushed in, a glass partition behind her
onto a bank of empty desks with dark monitors switched off, a tall fiddle-leaf
fig in a white pot, floor-to-ceiling glass along the left, mid-grey commercial
loop-pile carpet. Equipment: a plain grey microfibre cloth and a plain
unbranded white spray bottle, completely unbranded. Light: late afternoon
daylight through the glass, warm ceiling downlights on, bright and airy rather
than dim. Then UNIFORM + PALETTE + NO WRITING + *Wide eye-level establishing
shot, approximately 28mm, the whole space readable around her, deep depth of
field* + GRADE + NEGATIVES.

**Card 1.** *Emptying a small under-desk bin into a plain grey wheelie caddy as
she moves along a bank of empty office workstations.* Long row of pale timber
desks, chairs pushed in, dark monitors off, a low grey planter box of trailing
greenery dividing the bank, mid-grey loop-pile carpet, a glass partition at the
far end. Equipment: a plain grey janitorial caddy on wheels with a clear liner
bag, a soft grey microfibre cloth over the handle. Light: early evening daylight
from a window at the end of the row, downlights on. 4:3.

**Card 3.** *Wiping down the stainless sink of a bright office kitchenette, the
bench already clear and the bin liner changed.* Pale timber-fronted bench,
stainless undermount sink, brushed-metal tapware, a plain white kettle and two
plain white mugs on a timber tray, open timber shelving with plain white
crockery, white tiled splashback, polished pale concrete floor, a plain grey
bin with a fresh clear liner, a small leafy plant. Add explicitly: *No writing
anywhere: no labels on the crockery, no notices on the wall, no lettering on
the bin.* 4:3.

### Strata and common area cleaning

| Asset | Native | Slot |
|---|---|---|
| `strata-cleaner-mopping-an-apartment-lobby.jpg` | 16:9 | §1 hero (`full-width-photo`) |
| `strata-cleaner-cleaning-a-lift-lobby-glass-balustrade.jpg` | 4:3 | §4 StoryMosaic |
| `strata-carpark-and-driveway-swept.jpg` | 4:3 | §4 StoryMosaic |
| `strata-bin-room-hosed-out-and-tidy.jpg` | 4:3 | `ImageBand` — **4:3 source in a 16/9 box** |

**Hero.** *Mopping the tiled floor of a bright apartment building lobby in the
morning.* Large pale porcelain tiles, a full-height glass entry door and
sidelights onto green subtropical planting, a warm timber feature wall, a slim
console with a large leafy plant in a white pot, a bank of plain brushed-metal
letterboxes **with no numbers or lettering**, a stainless lift door at the rear.
Equipment: plain grey flat-head microfibre mop and grey mop bucket on wheels.

**Balustrade.** *Wiping down a glass balustrade on the open landing of a
residential apartment building, the stairwell and lift lobby behind her.*
Frameless glass balustrade with brushed-metal handrail, pale concrete floor,
white rendered wall, a stainless lift door and a plain timber apartment door,
subtropical greenery beyond. Light: mid-morning open shade with bright sky
beyond.

**Carpark.** *Pushing a wide floor broom across the smooth concrete floor of a
clean residential basement carpark, working towards the daylight at the ramp.*
Sealed pale grey concrete, painted grey bay markings, plain white-painted
columns, a run of plain grey storage cage doors, two parked cars in neutral
grey and white at the far end, a ramp to bright daylight and subtropical
planting. Add: *The floor is clean and swept with no leaves, litter or oil
stains in the foreground.*

**Bin room.** *A clean, empty communal bin room in a residential apartment
building, freshly hosed out, no people in frame.* Concrete floor graded to a
floor waste, four plain dark grey wheelie bins with lids closed along the back
wall, a coiled grey hose on a wall bracket, pale grey rendered walls, a roller
door open to a bright driveway with green planting. Add: *The floor is visibly
wet and clean with a thin sheen of water running to the drain. No rubbish, no
stains, no bags on the floor.* No UNIFORM block — nobody in frame.

### Aged care, retirement and seniors

| Asset | Native | Slot |
|---|---|---|
| `aged-care-cleaner-mopping-a-retirement-village-corridor.jpg` | 16:9 | §1 hero |
| `aged-care-cleaner-wiping-handrails-in-a-communal-lounge.jpg` | 4:3 | §5 StoryMosaic |

§5's second image REUSES the hub's reception walkthrough frame from `../`.

**Both frames swap the GRADE block's last clause** to *warm and homely not
institutional*, and the hero's room description leads with pale timber-look
vinyl and a continuous brushed-metal handrail rather than anything clinical. A
village corridor that photographs like a hospital corridor sells the wrong
service, and that is the single most important thing about these two prompts.

**Hero.** *Mopping the vinyl floor of a bright corridor in a retirement
village, working calmly and leaving a clear path to walk.* Wide
residential-feeling corridor, pale timber-look vinyl, continuous brushed-metal
handrail on a white wall, plain timber apartment doors along the right, a large
window at the far end onto a green garden, a leafy plant in a white pot beside a
soft grey armchair in an alcove. Equipment: plain grey flat-head mop and grey
bucket, *positioned to leave half the corridor walkable* — that clause is
deliberate and matches the page's own copy.

**Lounge.** *Wiping down a brushed-metal handrail at the edge of a bright
communal lounge in a retirement village.* Soft grey armchairs around a low pale
timber coffee table, a large leafy plant in a white pot, sheer curtains at a
tall window onto a green garden, pale timber-look vinyl.

### Medical, clinic and salon cleaning

| Asset | Native | Slot |
|---|---|---|
| `clinic-cleaner-disinfecting-a-treatment-room.jpg` | 16:9 | §1 hero + §4 panel 2 |
| `medical-waiting-room-cleaned-before-opening.jpg` | 4:3 | §4 panel 1 |
| `salon-cleaner-sweeping-a-hair-salon-after-close.jpg` | 4:3 | §4 panel 3 |

All three end their GRADE block with *calm rather than sterile*. The page
explicitly does not offer clinical cleaning, so a frame shot like an operating
theatre would promise a service that is refused three sections later.

**Hero / clinic.** *Disinfecting the vinyl upholstery of a treatment bed in a
bright, calm allied health treatment room, after the last patient of the day.*
Plain grey vinyl treatment bed, a stainless trolley with a plain white kidney
dish **and no labelled bottles**, a wall-mounted brushed-metal sanitiser
dispenser **with no lettering**, a small pale timber cabinet, a leafy plant,
seamless pale grey vinyl flooring coved up the wall, a window with a sheer
blind.

**Waiting room.** *Wiping down the arm of a waiting room chair in a bright,
calm medical practice waiting room before opening.* A row of soft grey
upholstered chairs with pale timber arms, a low pale timber table with a plain
woven tray, a warm timber reception counter with a brushed-metal screen surround
**and nothing written on it**, a sanitiser dispenser with no lettering, seamless
pale grey vinyl, a leafy plant, a tall window with a sheer blind. Add: *No
patients in frame. No magazines, no clutter.*

**Salon.** *Sweeping the floor beneath a styling chair in a bright hair salon
after close.* Two black styling chairs before a large frameless mirror on a
warm timber feature wall, a pale timber styling bench with **plain unlabelled**
white bottles, a brushed-metal basin unit at the rear, polished pale concrete,
a large leafy plant, shopfront glass onto a quiet evening street. Equipment: a
plain grey broom and dustpan, *a small pile of swept hair clippings on the floor
ahead of the broom* — that detail is what makes the frame read as a salon rather
than a shop.

### Construction site

| Asset | Native | Slot |
|---|---|---|
| `construction-cleaner-sweeping-a-new-build-before-handover.jpg` | 16:9 | §1 hero (`full-width-photo`) + §4 slide 1 |
| `construction-cleaner-detailing-new-window-frames.jpg` | 4:3 | §4 slide 2 |
| `construction-final-detail-clean-of-a-new-bathroom.jpg` | 4:3 | §4 slide 3 + `ImageBand` (**4:3 in a 16/9 box**) |

All three use HI-VIS UNIFORM and the HI-VIS PALETTE variant. See §1.

**Hero.** *Sweeping fine dust from the concrete floor of a newly finished
open-plan interior, the last clean before handover.* Bare polished concrete,
freshly painted white plasterboard, floor-to-ceiling window frames not yet
curtained onto green subtropical trees, a plasterboard bulkhead with new
downlights fitted, a neat stack of protective grey floor covering rolled up
against one wall, **no furniture at all**. Equipment: a wide plain grey floor
broom and grey dustpan, plus a plain grey industrial vacuum on wheels behind
her. Add: *bright and clean rather than dusty and dim* — the frame has to look
like the outcome, not the problem.

**Windows.** *Detailing plaster dust and adhesive residue off a new aluminium
window frame in a finished but unfurnished new build.* Empty room, white walls,
bare pale concrete, a large new aluminium-framed window **with the protective
film peeled back at one corner**, green trees beyond, a plasterboard reveal and
new skirting. Equipment: grey microfibre cloth, plain white spray bottle, a
plain grey squeegee resting on the sill.

**Bathroom.** *Polishing the brushed-metal tapware of a brand new bathroom
during the final detail clean before handover, everything already spotless.*
Large pale porcelain wall and floor tiles, a floating pale timber vanity with a
white basin and brushed-metal tapware, a frameless mirror, a frameless glass
shower screen, a small louvre window with foliage beyond. Add: *Brand new and
unused, with no toiletries and no towels.*

### Hospitality, venues and holiday parks

| Asset | Native | Slot |
|---|---|---|
| `hospitality-cleaner-resetting-a-cafe-dining-room-before-service.jpg` | 16:9 | §1 hero + §3 card 1 |
| `function-room-reset-after-an-event.jpg` | 4:3 | §3 card 2 |
| `holiday-park-cleaner-cleaning-an-amenities-block.jpg` | 4:3 | §3 card 3 + §6 MetricsBlock |

**Café.** *Wiping down a long communal table in a bright coastal café dining
room before opening, chairs still stacked at the far end.* A long
recycled-timber communal table, pale timber bentwood chairs, a stainless and
timber service counter at the rear with a brushed-metal espresso machine,
hanging pendant lights, a large leafy monstera, polished pale concrete, bifold
glass doors open to a green courtyard. Light: *early morning daylight streaming
through the open bifold doors, soft long shadows.*

**Function room.** *Setting the last chair straight in a bright function room
that has just been reset after an event, the floor already vacuumed.* Round
tables in plain white linen, pale timber bentwood chairs set neatly, a bare
timber-topped bar along the rear with a brushed-metal rail, tall bifold glass
doors onto a green lawn, mid-grey loop-pile carpet **with fresh vacuum lines
visible**. Add: *No glassware, no plates, no decorations, no rubbish anywhere in
frame. Everything is reset and clean.*

**Amenities.** *Mopping the tiled floor of a bright, modern holiday park
amenities block, the shower cubicles behind her freshly cleaned.* Large pale
porcelain tiles, a row of shower cubicles with frosted glass doors and
brushed-metal fittings, a long pale timber-topped vanity with white basins and a
frameless mirror, a high louvre window with subtropical planting beyond.

### Commercial kitchen cleaning

| Asset | Native | Slot |
|---|---|---|
| `commercial-kitchen-cleaner-degreasing-a-stainless-bench.jpg` | 16:9 | §1 hero |
| `commercial-kitchen-canopy-and-filters-cleaned.jpg` | 4:3 | `ImageBand` (**4:3 in a 16/9 box**) |

Both swap the interior PALETTE for one built around stainless: *dark teal, aqua,
white, stainless steel, brushed metal, soft grey and warm timber* with the same
absolute exclusions.

**Hero.** *Degreasing a long stainless steel preparation bench in a bright
commercial kitchen after service.* Long stainless prep bench, a stainless
extraction canopy above a cooktop at the rear **with clean baffle filters
visible**, stainless shelving with plain unlabelled containers, pale grey
non-slip quarry tile with a floor waste grate, a pass window through to a
dining room with warm timber beyond, plain white tiled splashback. Add: *bright
and clean rather than dim and greasy.*

**Canopy.** *A clean stainless steel commercial kitchen extraction canopy above
a cooktop, filters back in place and gleaming, no people in frame.* The
canopy's stainless baffle filters seated in their rails and visibly clean, the
underside and lip wiped free of grease, a clean empty stainless cooktop below,
plain white tiled splashback, a stainless shelf with plain unlabelled
containers. Add: *Everything in frame is clean and dry. No grease, no residue,
no food, no clutter.* No people — deliberately, because a person in this frame
would read as us claiming to have certified the duct, which the page refuses.
Shot *straight-on eye-level, approximately 35mm.*

### Schools and childcare centres

| Asset | Native | Slot |
|---|---|---|
| `childcare-cleaner-wiping-low-tables-after-pickup.jpg` | 16:9 | §1 hero |
| `school-cleaner-mopping-a-classroom-after-hours.jpg` | 4:3 | §3b StoryMosaic |
| `school-bathroom-block-cleaned-after-hours.jpg` | 4:3 | `ImageBand` (**4:3 in a 16/9 box**) |

⚠️ **NO CHILDREN IN ANY FRAME**, and it is a hard rule rather than a stylistic
one. Every prompt carries *No children in frame* explicitly, and every scene is
set after hours or after pickup. IMAGE-GUIDELINES §7 forbids generating a person
presented as a real identifiable individual; a generated child in a named
business's marketing is worse again, because a parent cannot tell the child is
not a real child at a real centre.

**Childcare.** *Wiping down a low round table in a bright, calm childcare
playroom after the last pickup of the day, the room already tidied.* Two low
pale timber round tables and small timber chairs, open timber shelving with
plain woven baskets and **unpainted** wooden blocks, a soft grey rug, a large
leafy plant, pale timber-look vinyl, a wall of windows onto a green garden and a
shaded outdoor play area. GRADE ends *calm and homely.*

**Classroom.** *Mopping the vinyl floor of a bright primary school classroom
after hours, chairs already stacked on the desks.* Pale timber desks in clusters
with grey plastic chairs stacked on top, a large plain whiteboard **with nothing
written on it**, open timber shelving with plain woven baskets, a leafy plant on
the sill, a wall of windows onto a green playground with tall gum trees.

**Bathroom.** *A clean, empty primary school bathroom block, freshly cleaned and
dry, no people in frame.* Large pale porcelain floor tiles, a run of low white
basins in a pale timber-look bench with brushed-metal tapware and a long
frameless mirror, a row of pale timber-look laminate cubicle doors, a
brushed-metal paper towel dispenser **with no lettering**, plain white tile, a
high louvre window with green trees beyond. Add: *Everything in frame is clean,
dry and empty. No litter, no puddles, no marks.*

### Gyms and fitness studios

| Asset | Native | Slot |
|---|---|---|
| `gym-cleaner-wiping-down-strength-equipment.jpg` | 16:9 | §1 hero + §4 card 1 |
| `gym-studio-floor-and-mats-cleaned.jpg` | 4:3 | §4 card 2 |
| `gym-change-room-and-showers-cleaned.jpg` | 4:3 | §4 card 3 |

All three specify *bright and airy rather than dark and moody*, which is against
gym-photography convention and deliberately so: this is a cleaning page, and a
moody gym frame hides exactly what the reader is trying to see.

**Hero.** *Wiping down the padded bench of a strength machine in a bright,
modern fitness studio between sessions.* A rack of dark grey dumbbells on a
timber-fronted rack, two dark grey strength machines with grey padded benches, a
wall of large windows onto green subtropical trees, black rubber gym flooring, a
warm timber feature wall, a large leafy plant, a stack of grey exercise mats.
Add: *No gym members in frame.*

**Studio.** *Mopping the timber floor of a bright, empty group fitness studio,
the mats already wiped and stacked.* Warm timber sprung floor, a full-width
frameless mirror along one wall, a neat stack of soft grey mats and a rack of
dark grey kettlebells at the rear, a wall of tall windows onto green trees, a
large leafy plant.

**Change room.** *A clean, empty change room in a modern fitness studio, freshly
mopped and dry, no people in frame.* Large pale porcelain tiles, a run of pale
timber-fronted lockers with brushed-metal handles, a pale timber bench seat, two
frosted-glass shower cubicles at the rear, a long vanity with white basins and a
frameless mirror, a folded stack of soft grey towels on the bench. Add:
*Everything in frame is clean, dry and empty. No bags, no clutter, no puddles.*

### Retail and shopfronts

| Asset | Native | Slot |
|---|---|---|
| `retail-cleaner-mopping-a-shop-floor-before-opening.jpg` | 16:9 | §1 hero |
| `shopfront-glass-and-entry-cleaned-before-opening.jpg` | 4:3 | `ImageBand` (**4:3 in a 16/9 box**) |

Both are shot before opening with *No shoppers in frame*, which is honest about
when the work happens and the only way to photograph a shop floor without
inventing customers.

**Hero.** *Mopping the polished concrete floor of a bright coastal homewares
shop before opening, the shelves already dusted.* Pale timber shelving holding
plain ceramic vases and folded linen in neutral tones, a pale timber counter
with a brushed-metal card terminal, a rack of linen clothing, a large leafy
plant, polished pale concrete, a full-height shopfront window onto a quiet street
with green street trees.

**Glass.** *Squeegeeing the inside of a large shopfront window before opening,
the street bright and quiet beyond the glass.* A full-height frameless shopfront
window with a brushed-metal-framed glass entry door beside it, **a clean swathe
of glass where the squeegee has already passed**, a pale timber display plinth
just inside with two plain ceramic vases, polished pale concrete, green street
trees and a quiet footpath beyond. That swathe is the point of the frame — it is
one frame of work in progress, which IMAGE-GUIDELINES §7 allows, not a
before/after pair, which it does not.

### Warehouses and industrial sites

| Asset | Native | Slot |
|---|---|---|
| `warehouse-cleaner-with-a-floor-scrubber-in-a-storage-aisle.jpg` | 16:9 | §1 hero (`full-width-photo`) |
| `warehouse-loading-dock-swept-and-clear.jpg` | 4:3 | §5 ContentGrid |
| `warehouse-mezzanine-office-and-lunchroom-cleaned.jpg` | 4:3 | §5 ContentGrid |

The two floor-level frames use HI-VIS UNIFORM and the HI-VIS PALETTE. The
lunchroom frame keeps the apron and drops the vest, because a crib room is not a
traffic zone — which is itself the page's §5 argument in miniature.

**Hero.** *Walking a compact floor scrubbing machine down a wide aisle in a
bright, tidy warehouse.* Tall grey steel pallet racking both sides with neatly
shrink-wrapped pallets, sealed pale concrete, a high steel roof with translucent
roof sheeting letting daylight in, a roller door open at the far end showing
green trees, painted grey floor line markings. Machine: *a compact walk-behind
floor scrubber in grey and dark teal only, with a brushed-metal squeegee
assembly at the rear and a visible clean damp band on the concrete directly
behind it. Completely unbranded.* The damp band is what makes the frame argue
the page's own machine-versus-mop point.

**Dock.** *Sweeping the concrete apron of a clean, empty warehouse loading dock,
the roller door up and the dock clear of debris.* Sealed pale grey concrete, a
raised dock edge with a plain brushed-metal edge plate, a tall roller door open
to a bright hardstand with green trees, grey steel bollards, a neat stack of grey
plastic pallets, painted grey line markings. Add: *The dock is clean and clear
with no pallet wrap, strapping, litter or debris on the floor.*

**Lunchroom.** *Wiping down the table of a clean, empty staff lunchroom on a
warehouse mezzanine, the warehouse floor visible through the window behind her.*
A pale timber-topped table and grey plastic chairs, a small kitchenette with a
stainless sink and a plain white kettle, grey vinyl floor, **a large internal
window looking down onto grey steel pallet racking on the warehouse floor
below**, a plain corkboard **with nothing pinned to it**, a small leafy plant on
the sill. That internal window is the frame's whole job: it puts the amenities
and the floor in one shot.

### Factories

| Asset | Native | Slot |
|---|---|---|
| `factory-cleaner-scrubbing-a-production-floor-walkway.jpg` | 16:9 | §1 hero + §4 slide 1 |
| `factory-wash-down-of-stainless-production-equipment.jpg` | 4:3 | §4 slide 2 + §5 StoryMosaic |
| `factory-crib-room-cleaned-for-shift-change.jpg` | 4:3 | §4 slide 3 + §5 StoryMosaic |

**Hero.** *Scrubbing a marked pedestrian walkway on a bright, tidy factory
production floor, the line shut down for the day.* Stainless production
equipment and conveyors along the right, grey steel guarding, sealed pale
concrete **with painted grey pedestrian walkway lines**, a high steel roof with
translucent sheeting, a stainless wash-down station on the left wall, **no
product on the line**. Machine: the same grey-and-dark-teal walk-behind scrubber
with a clean damp band behind it. HI-VIS UNIFORM + HI-VIS PALETTE.

**Wash-down.** *Wiping down the stainless steel housing of a food-production
conveyor during a shutdown wash-down, the equipment already stripped and clean.*
A stainless conveyor and hopper assembly **with its grey steel guarding
opened**, every surface clean and dry, a stainless wash-down hose reel on the
wall behind, sealed pale concrete with a stainless floor channel drain, white
hygienic wall cladding, **no product anywhere in frame**. Uniform: HI-VIS plus
*a plain white disposable hair net* — see §1. The opened guarding is deliberate
and matches the page's copy: it is a machine that has been isolated and tagged
out by the client's team.

**Crib room.** *Wiping down the table of a clean, empty factory crib room, ready
for the next shift.* Two long pale timber-topped tables and grey plastic chairs,
a small kitchenette with a stainless sink, a plain white kettle and a stainless
microwave, a run of pale timber-look lockers with brushed-metal handles, grey
vinyl floor, a plain corkboard **with nothing pinned to it**, a high window with
green trees, a small leafy plant on the sill. Add: *Everything in frame is
clean, dry and empty. No food, no mugs left out, no clutter.* Default UNIFORM,
no vest.

### Breweries

| Asset | Native | Slot |
|---|---|---|
| `brewery-cleaner-hosing-down-the-brew-deck-floor.jpg` | 16:9 | §1 hero collage 1 + §4 panel 1 |
| `brewery-taproom-reset-before-opening.jpg` | 4:3 | §1 hero collage 2 + §4 panel 2 |
| `brewery-keg-line-and-floor-drains-cleaned.jpg` | 4:3 | §1 hero collage 3 + §4 panel 3 + `ImageBand` (**4:3 in a 16/9 box**) |

⚠️ **NO BEER BRANDING ANYWHERE**, and this is stricter than the sitewide
no-text rule. The taproom's tap bank is *eight plain unbranded taps and no
badges* and the tanks are unlabelled. A generated brewery frame with invented
brand marks on the taps would be a fabricated brand asset (IMAGE-GUIDELINES §4)
**and** would read as a real client's premises, which §7 forbids.

Uniform on the two production frames: default aqua polo and dark teal apron but
with *tall dark grey rubber gumboots* instead of shoes, and no hi-vis vest —
see §1. Palette on all three adds *stainless steel* and, on the brew deck,
*muted copper* for the brewhouse hood, and drops the blanket yellow ban to
allow that copper: *Absolutely no yellow, no red, no pink and no blue.*

**Brew deck.** *Hosing down the concrete floor of a small craft brewery brew
deck at the end of a brew day, the tanks clean and the floor running to the
drain.* Two tall stainless fermentation tanks and a stainless brewhouse vessel
with a **copper-toned domed hood**, stainless piping and brushed-metal valve
handles, sealed pale grey concrete with **a long stainless trench drain**, a
coiled grey wash-down hose on a wall reel, a roll-up door open to bright green
subtropical trees. Add: *The floor is visibly wet and clean with water running
to the trench drain. No spilled grain, no hoses tangled underfoot.*

**Taproom.** *Wiping down the timber bar top of a small brewery taproom before
opening, the stainless tap bank behind her polished.* A thick recycled-timber
bar top, a brushed-metal tap bank with **eight plain unbranded taps and no
badges**, timber stools tucked under, a long communal timber table with bench
seats, polished pale concrete, a large leafy monstera, a roll-up door open to a
bright green courtyard, **stainless fermentation tanks visible behind a glass
partition at the rear**. That glass partition is the frame's job: it is the
"two buildings, one lease" argument in one shot. Add: *No customers in frame.*

**Keg line and drains.** *Squeegeeing water towards a stainless trench drain
beside a row of clean stainless kegs in a small craft brewery.* A row of
stainless kegs on sealed pale grey concrete, stainless piping and brushed-metal
valve handles on the wall behind, **a long stainless trench drain with its grate
lifted clear at one end**, a coiled grey wash-down hose on a wall reel, a
doorway open to bright green trees. Add: *The floor is visibly wet and clean,
water running to the trench drain. No spilled grain, no residue, no clutter.*
The lifted grate is deliberate and it is the whole point of the frame: the page
argues that hosing a drain is not cleaning it and the grate has to come up.

---

## 4. Still missing: the before/after pairs

Four of the thirteen pages reserve a slot for `BeforeAfter.astro` in the render
and none can be filled from this folder. `BeforeAfter` wipes one frame over the
other in place, so the two must be the SAME SCENE from the SAME CAMERA
POSITION, and a generator produces two different rooms. IMAGE-GUIDELINES §7 also
forbids a generated pair implying a specific job.

They need real photography, tripod locked off, nothing moved between frames:

| Page | Subject, in order of value |
|---|---|
| Strata | A bin room. Then a driveway or entry path with algae on it. The two highest-value pairs on the whole cluster, because they are the two jobs a committee is most often told are not worth paying for. |
| Gyms | Shower grout. Then a section of rubber flooring. Rubber is the best before/after subject after carpet, because the change is dramatic and it is the surface members are actually on. |
| Warehouses | One aisle of sealed concrete, before and after a machine scrub. Makes the machine-versus-mop argument visible rather than assertable. |
| Office | An office bathroom, or a kitchenette. Two pairs is plenty. |
