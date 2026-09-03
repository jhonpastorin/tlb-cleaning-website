# Image guidelines

How photos for this site are generated, exported, named and wired in. Written
from the existing library — follow it and a new image drops in next to the old
ones without looking bought from somewhere else.

Companion to `SECTIONS.md` (which section takes which image) and the per-folder
`IMAGE-PROMPTS.md` sheets (the actual prompts for outstanding slots).

---

## 1. Two families, and they don't mix

The library has exactly two treatments. Decide which one a slot needs before
writing a prompt.

**A. Scene photo** — the default. A real room, photographed. Used for pathway
cards, service tiles, story mosaics, backdrops.
`JPEG · opaque · 4:3 (2400×1792) or 16:9 (1920×1080)`

**B. Cut-out figure** — a person with the background removed, sitting on a
transparent canvas so the page's own colour shows through. **Heroes only.**
`PNG · alpha channel · 1364×1032 or 1920×1080`

Never generate family B for a card slot: it needs the page background behind
it, and inside a card it reads as a sticker. Never generate family A as a PNG —
that is how the library ended up with 1.8MB files that should be 300KB.

## 2. House style (family A)

- **Place.** Bright Australian coastal interior — Northern Rivers / Byron
  hinterland. White walls, warm timber floors, pale linen and grey upholstery,
  indoor plants, dried pampas styling. Newish build or well-kept older home.
- **Light.** Natural window light, mid-morning. Soft shadows, no hard flash.
  Slightly over-bright, optimistic grade: cool whites, muted greens, warm
  timber mid-tones. Never moody, never orange, never blue-grey.
- **Lens.** Wide, eye-level, ~24–35mm. The room readable around the subject.
  Shallow but not extreme depth of field. No fisheye, no dutch angle, no
  dramatic low angle.
- **People.** Optional — plenty of the best frames have none. When a cleaner
  appears they wear the TLB uniform (see §3). When a *client* appears they are
  in ordinary clothes, no gloves, and are never named as a specific person.
- **Mood.** Calm and finished. This is a service people buy so their weekend
  stays theirs — not a scrubbing-on-hands-and-knees advert.

## 3. The uniform problem — pick one before generating more

The library is currently inconsistent, and it shows when two of these sit on
one page:

| Asset | Uniform |
|---|---|
| `house-cleaning-team-vacuuming-open-plan-living-room.jpg` | Aqua polo + teal apron, teal gloves |
| `service-deep-and-one-off-cleans.png` | White tee + dark green apron, **yellow** gloves |
| `service-regular-home-cleaning.png` | Mint tee, yellow gloves |
| `deep-cleaning-spray-bottle-and-sponge.png` | Denim shirt + mint apron, mint gloves |

**Decide the canonical uniform and put it in every future prompt verbatim.**
The recommendation is the first row — aqua polo, teal apron, teal gloves —
because it matches the brand's Dark Teal and appears in the most-used photo.

## 4. Hard rules for the generator

Put these in every prompt, and check the output against them before saving:

- **No text anywhere.** No signage, no book titles, no product labels, no
  packaging copy. Generators produce garbled lettering that reads as fake.
- **No logos.** Especially not a TLB logo on a shirt or apron — a current
  library image has an invented "TLG PROFESSIONAL" mark on the apron, which is
  a fabricated brand asset. Uniforms are plain.
- **One frame per image.** Not a contact sheet, grid, collage, or
  before/after split. (One delivered file was a 2×2 sheet and had to be
  cropped.)
- **No watermark, no border, no drop shadow, no vignette.**
- **No distorted hands** — check every visible hand before accepting.
- **Nobody real.** Never generate a likeness of an actual client, staff
  member, or public figure. See §7.

## 5. Export and naming

| | |
|---|---|
| Format | JPEG for scenes; PNG **only** for cut-outs that need transparency |
| Ratio | Match the slot's `ratio` prop: `4/3` cards, `16/9` heroes/backdrops, `3/4` portrait mosaic, `1/1` avatars |
| Size | ≥ 1600px on the long edge; 2400×1792 is the library's norm |
| Weight | Target **under 600KB**. Astro re-encodes to webp at 400/800/1200, so an 3MB source buys nothing but repo bloat |
| Name | kebab-case, describes the **subject**, not the slot: `deep-cleaning-empty-room-on-moving-out-day.jpg`. Never `Gemini_Generated_Image_xxx.jpg` |
| Folder | `src/assets/<page-family>/<section-family>/` — e.g. `src/assets/home_cleaning/inside_your_home/deep_cleaning/`. Shared photos live in `src/assets/home/` |

**Reuse before generating.** Same subject = same file. If a photo already
means "moving-out day" on one page, it means that everywhere; a second
moving-out photo makes one idea look like two. The flip side also holds: never
relabel an existing photo to mean something it doesn't show.

⚠️ The library currently has **five duplicate pairs** saved under two names
each (`service-airbnb-…` / `holiday-let-…`, `service-real-estate-…` /
`rental-property-…`, `service-deep-and-one-off-…` / `why-tlb-cleaner-…`,
`service-regular-home-cleaning` / `house-cleaning-cleaner-mopping-…`,
`service-end-of-lease-…` / `house-cleaning-cleaner-wiping-…`). Don't add more —
import the existing file from its existing path.

## 6. Wiring it in

Every image slot is an `ImageBlock` (`src/data/types.ts`) rendered by
`src/components/ui/Placeholder.astro`:

```ts
image: { ratio: '4/3', label: 'What the photo shows', src: myImg }
```

- Omit `src` and the slot renders a dashed placeholder box at the right size —
  that is the correct state for a slot with no honest photo yet. Leave it.
- `label` **is the alt text**. It must describe the photo that is actually
  there, not the photo someone once hoped for. If you swap the image, re-read
  the label.
- `fit="contain"` / `"contain-bottom"` for cut-outs; the `cover` default for
  scenes.
- Import at the top of the page file, next to the other asset imports.

## 7. What must never be generated

- **A face for a testimonial.** Every quote on this site is still `[TBC]`.
  A generated headshot beside a client name invents a customer. Testimonial
  avatars show the TLB monogram until a real client supplies a real photo with
  permission.
- **A person presented as a named, identifiable client or staff member.**
- **Fake proof** — awards, certificates, review screenshots, badges, before/
  after pairs implying a specific job.

## 8. Prompt template

```
<Subject and action in one sentence.>
<The room: two or three concrete furnishings.>
<Light and time of day.>
<Who is in frame and what they wear — or "no people in frame".>
Wide eye-level shot, ~28mm.

Bright Australian coastal interior, white walls, warm timber floor,
natural window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.
No text, no signage, no logos, no watermark, no collage, no distorted hands.
```

## 9. Before you commit an image

1. One frame, not a grid.
2. No lettering anywhere in shot.
3. Hands correct.
4. Uniform matches §3 (if anyone is in uniform).
5. Renamed from the generator's filename to a subject name.
6. Under 600KB, right ratio for its slot.
7. `label` in the page file describes this photo.
8. Not a duplicate of something already in `src/assets/`.
