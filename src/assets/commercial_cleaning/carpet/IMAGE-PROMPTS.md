# Image prompts — commercial carpet cleaning

The prompts behind the two assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `commercial-carpet-extraction-in-an-open-plan-office.jpg` | A, scene | 1024×1024 | §1 hero |
| `commercial-carpet-extraction-along-an-office-corridor.jpg` | A, scene | 1200×896 | §3 card 1 |

`/commercial-carpet-cleaning/` uses two more images that are **not** in this
folder. Cards 2 and 3 reuse the hub's walkthrough and kitchenette frames from
`../`, because neither card's subject is carpet: card 2 is the conversation
where a scope gets agreed and card 3 is who is in the building. Per §5, same
subject means same file, and both labels match the hub's wording verbatim so
one photo never carries two different alt texts.

## Three things worth knowing before regenerating

**The uniform is the §3 canonical one, verbatim.** Aqua polo, dark teal apron,
dark teal rubber gloves. Keep the wording identical or the library drifts.

**The palette line is not optional.** The hub's sheet records two takes lost to
a bright orange cloth and a mismatched blue glove. Generators reach for a
complementary pop colour unless told not to, and a carpet extractor is worse
than most: real ones are almost always yellow, red or bright blue. The prompts
below name the machine's colours part by part for that reason.

**The damp band is the point of both frames, and it is a line, not a pair.**
Each prompt asks for the cleaned strip directly behind the machine head. That
is one frame of work in progress, which is allowed. What §7 forbids is a
before/after pair implying a specific job, so never generate these as a split
frame or a two-panel composition, and never caption them as one customer's
result.

---

## 1. Hero — extraction in an open-plan office

Family A, square, `cover` fit. **A scene photo, not a cut-out figure**,
following the call the hub made at TLB's direction: a studio cut-out on a
plain background says "a cleaner" without saying *commercial*. Here the
extractor, the desk bank and the glass-partitioned meeting room carry it.

**Square.** `Placeholder` puts `aspect-ratio` on the wrapper, so a box matching
the file crops nothing. Regenerate square, or change the page's `ratio` at the
same time.

```
A commercial cleaner operating a carpet extraction machine across the carpet
of a bright open-plan office, calm and unhurried, after the staff have gone.

The room: pale timber desks with dark monitors switched off set back along the
right side, grey mesh task chairs pushed in, a glass-partitioned meeting room
behind her, a tall fiddle-leaf fig in a white pot, floor-to-ceiling glass along
the left, mid-grey commercial loop-pile carpet running to the foreground.

The machine: a plain commercial carpet extractor in grey and dark teal only, an
upright body on wheels with a wand and a ribbed grey vacuum hose. Completely
unbranded. Every part of the machine, hose, wand and handle is grey, dark teal
or brushed metal. A faint darker damp band on the carpet directly behind the
head shows where it has just passed.

Light: mid-morning daylight flooding through the glass, soft shadows, bright
and airy.

One woman in a plain aqua polo shirt, a plain dark teal apron, dark teal rubber
gloves and dark trousers, mid-task with both hands on the machine handle, seen
three-quarters from the side, face in calm profile. The uniform is completely
plain: no logos, no badges, no printing, no lettering.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, brushed metal and green foliage. Absolutely no yellow, no orange, no red,
no pink and no blue anywhere in the frame, including the machine, the hose, the
wand and the carpet.

Nothing in the frame carries writing: no signage, no wayfinding, no wall
lettering, no labels on the machine, no screens showing anything.

Wide eye-level establishing shot, approximately 28mm, the whole space readable
around her, deep depth of field, square composition with the cleaner and her
machine in the middle third.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
1:1 square, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 2. Card 1 — the carpet looks tired

The card's copy is about traffic lanes, so the prompt asks for a corridor with
a visibly worn path down the centre and for her to be drawing the wand along
it. The cleaned strip behind the wand is what makes the card argue its own
point. She is turned away here, which is fine: card 3 on this page carries the
face, and it is the hub's kitchenette frame.

```
A commercial cleaner drawing the wand of a carpet extraction machine along a
worn traffic lane in an office corridor, working backwards away from the
camera.

The room: a wide office corridor with plain white walls, a glass-partitioned
meeting room along the right side with pale timber furniture beyond it, a
single grey tub chair against the left wall, a small potted plant on the floor,
mid-grey commercial loop-pile carpet running the length of the corridor with a
visibly darker worn path down the centre from years of foot traffic.

The machine: a plain commercial carpet extractor in grey and dark teal only,
standing behind her, with a ribbed grey vacuum hose running to the wand in her
hands. Completely unbranded. Every part is grey, dark teal or brushed metal.

Light: mid-morning daylight from a window at the far end of the corridor, warm
ceiling downlights on, soft shadows, bright and clean rather than dim.

One woman in a plain aqua polo shirt, a plain dark teal apron and dark teal
rubber gloves, seen from three-quarters behind as she works, face mostly turned
away. The uniform is completely plain: no logos, no badges, no printing, no
lettering.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, brushed metal and green foliage. Absolutely no yellow, no orange, no red,
no pink and no blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no wayfinding, no door
numbers, no wall lettering, no labels, no screens showing anything.

Wide eye-level shot, approximately 28mm, the corridor readable around her,
shallow but not extreme depth of field.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

---

## Still missing: the before/after pair

The page reserves a slot for `BeforeAfter.astro` and it is the highest-value
image this page could gain, because carpet is the best before/after subject on
the site. It cannot be generated. `BeforeAfter` wipes one frame over the other
in place, so the two must be the SAME SCENE from the SAME CAMERA POSITION, and
a generator produces two different rooms. §7 also forbids a generated pair
implying a specific job.

It needs real photography: one traffic lane or corridor, tripod locked off,
before and after, nothing moved between the frames. Two or three pairs is
plenty.
