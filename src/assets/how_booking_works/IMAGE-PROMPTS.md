# Image prompts — How booking works

The prompt behind the one asset in this folder, kept so the slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `how-booking-works-cleaner-greeted-at-the-front-door.jpg` | A, scene | 1200×896 | Hero, and the `Backdrop` photo behind the trust bar + definition block |

---

## Why a doorway, on a page about booking

Booking happens on a screen, and this library cannot photograph a screen.
IMAGE-GUIDELINES §4 bans lettering in frame because generators render it as
garbled fake text, and a booking form is nothing but lettering. Every
plausible literal subject fails the same way: a phone, a laptop, a calendar,
a confirmation message.

So the honest subject is what the booking *produces*: a person at your door,
on the day, expected. That is also the page's own argument, that you set it
up once and then a known person turns up, so the frame is doing the work of
the copy rather than illustrating a user interface.

The same file is the `Backdrop` photo laid behind the trust bar and the
definition block at 75% Cream scrim, for the reason `/about/` does it too:
those two sections sit directly under the hero, and one continuous frame
through the fold beats a second differently-cropped scene.

## The three step photos are NOT in this folder

`PhotoGallery`'s `story` variant carries three step images and all three are
**reused** from elsewhere in the library, per IMAGE-GUIDELINES §5's "reuse
before generating". Each already means, on the page it belongs to, exactly
what its step needs it to mean here:

| Step | File | Already means |
|---|---|---|
| 1. Check we clean your town | `src/assets/locations/weatherboard-home-with-hinterland-hills.jpg` | A home in the Northern Rivers hinterland. It was the one photo in the library nothing had used yet |
| 2. Tell us about your place | `src/assets/home_cleaning/appliances/homeowner-and-cleaner-talking-in-a-living-room.jpg` | A homeowner and a cleaner working out what the house needs |
| 3. Pick a day, and keep it | `src/assets/home_cleaning/inside_your_home/deep_cleaning/deep-cleaning-tidy-living-room-kept-up-by-regular-visits.jpg` | A room kept up by regular visits, which is step 3's outcome exactly |

Generating three new frames for these would have made one idea look like two
in three different places, which is the specific failure §5 warns about.

## Uniform and the identifying-detail rule

Canonical uniform from IMAGE-GUIDELINES §3, stated verbatim: aqua polo, dark
teal apron, dark teal gloves, all plain. The homeowner is in ordinary clothes
with no gloves and nothing in her hands, following the same client-in-frame
rule the rest of the library uses.

⚠️ **A front door is an address.** House numbers, letterbox numbers, street
signs and lettering on a doormat all locate a real house, and a generated one
locates a fake house while looking like a real one. The prompt bans all four
explicitly. This is the same rule the before/after briefs carry, arriving on
an exterior for the first time.

---

## 1. Hero — arriving at the door

Family A, 4:3, `cover` fit. Copy left, image right, matching every other hero
on the site.

Both women are smiling in an ordinary everyday way rather than posed. The
page promises "no call centre in between", and a stiff, transactional frame
would read as exactly the service the page is arguing against.

```
A cleaner arriving at the open front door of an ordinary Australian coastal
home, holding a plain cleaning caddy, being greeted warmly by the woman who
lives there, both smiling in an easy everyday way, the homeowner stepping
back to let her in.

The setting: a covered timber verandah at the front of a low weatherboard
house, a pale front door standing open, a potted plant beside the doormat, a
jute mat, a cane chair to one side, green garden and a hedge just visible
past the verandah post.

Light: bright mid-morning Australian daylight, soft shadows under the
verandah roof, optimistic bright grade.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. The homeowner is in ordinary casual clothes, a linen
shirt and jeans, no gloves and nothing in her hands. Every garment is
completely plain with no logos, no badges, no name tags, no embroidery, no
printing and no lettering. Hands are natural and correctly formed, each hand
with five fingers.

Colour palette limited to dark teal, aqua, white, cream, warm timber, soft
grey, jute and green foliage. No orange, no red, no pink, no strong blue
anywhere in the frame.

Nothing in the frame carries writing: no house number, no letterbox numbers,
no doormat lettering, no signage, no bottle labels, no parcel labels.

Wide eye-level shot, approximately 28mm, the verandah and doorway readable
around the pair, shallow but not extreme depth of field.

Bright Australian coastal exterior, natural daylight, soft shadows,
optimistic bright grade. Photorealistic, 4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

---

## What was NOT generated, and must not be

- **A screenshot of the booking flow.** It is the obvious thing to want on
  this page and it is generated lettering, which means a fake interface for a
  real product. When the booking flow exists, a real screenshot is a real
  asset and belongs in `public/`, not here.
- **A phone in someone's hand showing a confirmation, or a calendar with
  dates on it.** Same rule.
- **A branded car, a van or signage.** No plate, no decal, no shopfront. The
  `/about/` folder's own sheet sets out why a vehicle is a lettering trap.
- **A named team member.** See `src/assets/about/IMAGE-PROMPTS.md`.

## Export settings used

Generated at 1200×896 native, then re-encoded to JPEG with `sharp` at mozjpeg
quality 86: 211KB, well inside the under-600KB budget IMAGE-GUIDELINES §5
sets. No resizing; Astro re-encodes to webp at 400/800/1200 from this source.
