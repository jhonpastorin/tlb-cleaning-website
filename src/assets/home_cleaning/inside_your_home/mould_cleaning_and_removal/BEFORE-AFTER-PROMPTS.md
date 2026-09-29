# Gemini prompts: mould removal before/after pairs

Two before/after pairs for the slider in section 11 of
[`src/pages/house-cleaning/mould-removal.astro`](../../../../pages/house-cleaning/mould-removal.astro).
They replace the SAMPLE vector illustrations currently wired there
(`sample-ceiling-*` and `sample-shower-*`).

1. Bathroom ceiling and cornice
2. Shower grout and screen

Each pair is two separate images, not one split picture, the same as the other
pages' before/after sliders.

---

## Why every pair takes two steps

`BeforeAfter.astro` wipes one frame over the other in place. That only works
if both frames show the **same room from the same camera position**. Two fresh
prompts give you two different bathrooms, and the slider then reads as a
glitch rather than as cleaning.

So for each pair:

1. **New chat.** Generate the BEFORE from the prompt below.
2. **Same chat.** Reply to that image with the AFTER edit prompt, so Gemini
   edits the existing picture instead of inventing a new one.
3. Download each image separately.

---

## Pair 1. Bathroom ceiling and cornice

### Step 1: before (new chat)

```
A close view along the join between a bathroom ceiling and cornice above a
shower, with scattered dark grey-black mould spotting clustered in the corner
and running along the cornice line. The rest of the ceiling is white paint
with a faint grey tinge near the spotting.
An otherwise clean, tidy, well-kept modern bathroom: white tiles, the top edge
of a frameless glass shower screen, a small frosted window on the side wall.
Mid-morning natural light through the frosted window, soft shadows.
No people in frame.
Eye-level shot looking up toward the corner, ~28mm, camera locked off.

Bright Australian coastal interior, white walls, natural window light,
soft shadows, bright grade.
Photorealistic, 4:3, high resolution.
Modest spotting along a line, not a blackened or derelict ceiling.
No text, no signage, no logos, no watermark, no collage, no split frame,
no before/after labels.
```

### Step 2: after (same chat, reply to the image)

```
Edit this image. Remove all the mould spotting from the ceiling and cornice,
and bring the paint back to an even, clean white. Change nothing else: keep
the exact same camera angle, framing, crop, tiles, shower screen, window,
light direction, shadows and colour grade. Same 4:3 frame. No text, no labels.
```

Save as `mould-ceiling-before.jpg` and `mould-ceiling-after.jpg`.

---

## Pair 2. Shower grout and screen

### Step 1: before (new chat)

```
A close view of the lower corner of a tiled shower, where the wall meets the
floor, with dark mould dotted through the grout lines and a black line of
mould along the silicone seal at the base of a frameless glass screen. The
glass has light water marks.
An otherwise clean, well-kept modern bathroom: white rectangular wall tiles,
pale grey floor tiles, a chrome floor drain in frame.
Mid-morning natural light from a window out of frame, soft shadows.
No people in frame.
Eye-level shot angled slightly down into the corner, ~35mm, camera locked off.

Bright Australian coastal interior, white walls, natural window light,
soft shadows, bright grade.
Photorealistic, 4:3, high resolution.
Ordinary mould in a lived-in shower, not a neglected or derelict one.
No text, no signage, no logos, no watermark, no collage, no split frame,
no before/after labels.
```

### Step 2: after (same chat, reply to the image)

```
Edit this image. Remove all the mould from the grout lines and the silicone
seal so the grout is back to its clean light grey and the silicone is clean
white. Clear the water marks from the glass. Change nothing else: keep the
exact same camera angle, framing, crop, tiles, drain, light direction,
shadows and colour grade. Same 4:3 frame. No text, no labels.
```

Save as `mould-shower-before.jpg` and `mould-shower-after.jpg`.

---

## Checking each pair

- **Flick between the two at full size.** If the tiles, window, drain or crop
  have shifted, rerun step 2. Any movement shows as a jump in the slider.
- **Reject a grim before.** The page's argument is that mould is a moisture
  problem in a normal coastal house, not a verdict on how someone keeps it
  (see [`IMAGE-PROMPTS.md`](IMAGE-PROMPTS.md) in this folder). A dark,
  derelict bathroom contradicts the copy and shames the reader.
- **Ask the folder's extra question:** does this image make a normal person
  feel judged about their house? If yes, re-prompt.

## Saving

Match the other pages' pairs (for example `cooktop-before.jpg`):

- JPG, **2400x1800** (4:3), under 600KB each.
- Into [`src/assets/home_cleaning/before_after/`](../../before_after/).

---

## Before these go live

IMAGE-GUIDELINES.md section 7 bars generated before/after pairs implying a
specific job, and section 4 of this folder's `IMAGE-PROMPTS.md` says the same
about this gallery. Generated images can stand in only while they are labelled
as illustrative:

- **Keep the section's `note`** saying they are illustrative samples.
- **Change the heading.** "The difference, on real jobs." is false with
  generated images. Use a keyword-led heading, as deep-cleaning did.
- **Keep the alt text starting "Sample illustration:"** (or "Illustration:").
- Replace them with real paired photography from a TLB job, with written
  client permission, as soon as it exists. The shooting brief is in section 4
  of `IMAGE-PROMPTS.md`.
