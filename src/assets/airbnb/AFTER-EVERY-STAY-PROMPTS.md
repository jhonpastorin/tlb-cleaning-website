# Gemini prompts: "What you get after every stay"

Three image cards for §7a of
[`src/pages/airbnb-holiday-home-cleaning.astro`](../../pages/airbnb-holiday-home-cleaning.astro)
(`afterEveryStayItems`). Each card currently renders a dashed placeholder.

1. The photo report
2. The restock list
3. Flagged for you

These are generated illustrations of the service, not photographs of a real
TLB job, and they must not be captioned as one.

**Canonical uniform** (IMAGE-GUIDELINES.md section 3): aqua polo, teal apron,
teal gloves. Verbatim, in every prompt where a cleaner appears.

---

## How these prompts are built

- **No readable text on screens or paper.** Gemini tends to render words as
  gibberish, and a garbled "report" looks worse than no report. Each card
  shows the act (taking the photo, ticking the list, flagging the damage),
  and any screen or paper text is kept soft and unreadable.
- **Card 2 does not repeat card 2 of §3.** The page already runs
  `airbnb-turnover-restocked-guest-essentials-on-a-kitchen-bench.jpg` higher
  up, so this one is about the checklist, not the essentials.
- **Coastal Australian summer, every time.** See this folder's
  [`IMAGE-PROMPTS.md`](IMAGE-PROMPTS.md) on the snowbound English cottage
  photo. Nothing wintry.

---

## Card 1. The photo report

```
Over-the-shoulder view of a cleaner holding up a smartphone to photograph a
freshly reset holiday apartment living room; the phone screen shows the same
room framed as a photo. Only the back of the shoulder, arm and hand are in
frame, face not visible.
A bright coastal holiday apartment: a linen sofa with plumped cushions, a
folded throw, a timber coffee table with a small vase, sliding doors open to
a balcony with a glimpse of palms.
Late-morning summer light, soft shadows.
One person wearing an aqua polo, teal apron and teal gloves.
Eye-level shot from just behind the shoulder, ~35mm, focus on the phone
screen, room softly out of focus.

Bright Australian coastal interior, white walls, warm timber floor,
natural window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.
No readable text or app interface on the screen, no text, no signage,
no logos, no watermark, no collage, no distorted hands.
```

Save as `airbnb-report-cleaner-photographing-a-reset-living-room.jpg`.

## Card 2. The restock list

```
Close view of a gloved hand ticking items off a paper checklist on a
clipboard, resting on a kitchen bench beside an open pantry shelf of neatly
restocked supplies: toilet rolls, coffee pods, tea, dishwasher tablets,
a bottle of hand wash.
A bright holiday-home kitchen: white cabinetry, a timber benchtop.
Late-morning summer light through a nearby window, soft shadows.
One person, only the hand and forearm in frame, wearing an aqua polo sleeve
and teal gloves.
Slightly high angle looking down onto the clipboard, ~50mm, shallow depth
of field, focus on the pen tip and tick marks.

Bright Australian coastal interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.
The checklist writing is soft and unreadable, no legible words,
no brand names on packaging, no text, no signage, no logos, no watermark,
no collage, no distorted hands.
```

Save as `airbnb-report-ticking-a-restock-checklist-by-the-pantry.jpg`.

## Card 3. Flagged for you

```
Close view of a gloved hand holding a smartphone to photograph a split slat
on a timber outdoor chair on a holiday home deck, the crack clearly visible
in the phone's frame and on the chair.
A sunny timber deck with a second chair and a small table, potted plants,
lush green garden beyond, softly out of focus.
Late-morning summer light, soft shadows.
One person, only the hand and forearm in frame, wearing an aqua polo sleeve
and teal gloves.
Eye-level with the chair seat, ~50mm, shallow depth of field, focus on the
split slat.

Bright Australian coastal setting, natural daylight, soft shadows,
optimistic bright grade.
Photorealistic, 4:3, high resolution.
Minor wear on an otherwise well-kept property, not neglect or vandalism.
No readable text or app interface on the screen, no text, no signage,
no logos, no watermark, no collage, no distorted hands.
```

Save as `airbnb-report-photographing-a-split-deck-chair-slat.jpg`.

---

## Checking each image

- **Reject garbled text** anywhere in frame, on a screen, the clipboard or
  packaging.
- **Reject distorted hands**, extra fingers or a glove that changes colour.
- **Reject anything wintry or neglected.** Card 3 is minor wear on a
  well-kept place, not a trashed rental.
- **Check the uniform** is aqua and teal, not yellow gloves or a green apron.

## Saving

Match this folder's other card images:

- JPG, **1200x896** (4:3), under 600KB each.
- Into [`src/assets/airbnb/`](./).

## When wiring them in

- Import each file and set `src` on its card in `afterEveryStayItems`.
- **Rewrite each card's `label`.** It becomes the alt text, and the current
  labels start "A real TLB...", which these images are not. Describe what
  each image actually shows.
- **Update the ⚠️ comment above `afterEveryStayItems`.** It says the brief asks
  for real assets; note that these are generated stand-ins until real ones
  exist.
