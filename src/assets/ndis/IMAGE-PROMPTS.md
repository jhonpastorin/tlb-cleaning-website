# Image prompts — NDIS cleaning

The prompts behind the two assets in this folder, kept so a slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `ndis-cleaning-cleaner-in-a-lived-in-living-room.jpg` | A, scene | 1024×1024 | §1 hero |
| `ndis-cleaning-cleaner-and-support-coordinator-talking-in-a-home.jpg` | A, scene | 1200×896 | §3 card 3 |

**§3 cards 1 and 2 are not in this folder and have no prompt here.** They
reuse `src/assets/home/house-cleaning-team-vacuuming-open-plan-living-room.jpg`
and `src/assets/home/service-deep-and-one-off-cleans.png`, per
IMAGE-GUIDELINES §5. Each card links to the page its photo already belongs to
(`/house-cleaning/` and `/deep-cleaning/`), so the frame means the same thing
in both places.

---

## ⚠️ This page is not like its siblings, and neither are its photos

`/ndis-cleaning/` addresses people with disability, their family carers, and
coordinators who hold a duty of care to them. Three constraints follow, and
they are stricter than the rest of the library's:

**1. Nobody in these frames is a participant.** No frame depicts, implies or
stages a person with disability. Both are of a cleaner at work, and the
second adds a coordinator. This is deliberate: a generated image of a
disabled person, used to sell a service to disabled people, invents a
customer in the most consequential way available on this site. If TLB wants
participant imagery, it comes from real people, with informed written
consent, or it does not come at all.

**2. The homes are ordinary, not clinical and not styled.** No grab rails, no
shower chairs, no wheelchairs, no medical equipment — inventing a specific
disability's home is the same fabrication in a different costume. And no
magazine styling either: the hero's living room is prompted "lived in and
loved rather than styled". The reader's home is not a display home, and the
page's promise is that we treat it as it is.

**3. Nothing in frame carries writing, and on this page that rule has teeth.**
IMAGE-GUIDELINES §4 bans lettering everywhere, but here the specific risk is
paperwork: a document in shot on an NDIS page reads as a plan, a service
agreement or a price list, and a generator renders it as garbled fake text.
See card 3 below, where this changed the brief.

## The label changed with the photo — card 3

The slot was briefed in `ndis-cleaning.astro` as **"Support coordinator
reviewing a participant plan"**. That photo was not generated, and should not
be. A photo whose entire subject is a document is a photo of fake lettering,
and on this page it would be fake lettering on something shaped like an NDIS
plan.

What was generated instead is the conversation where a placement actually
gets arranged — which carries the same meaning with nothing to misread. The
page's `label` was rewritten to describe the photo that is there, per
IMAGE-GUIDELINES §6, and the prompt asks explicitly for **nothing in her
hands, no clipboard and no folder**.

## Still true: do not use the `src/assets/hero/` leftovers

`src/assets/hero/participant-and-support-worker.png` and its siblings look
like they were made for this page. They were not — they are leftover
placeholders from the Maple/NDIS template this component library was first
built against, and they are not TLB's people. Using them would fabricate a
workforce on the one page where that matters most. The page's own source
carries this warning too; it is repeated here because this is the file
somebody reads when they go looking for an NDIS asset.

---

## 1. Hero — a familiar face

Family A, square, `cover` fit. Square because `Placeholder` puts
`aspect-ratio` on the wrapper, so a box matching the file crops nothing.

**This slot exists to show a face, and that is not a stylistic choice.** The
H1 beside it is "The same trusted local faces, treating your home with
genuine care", and the slot shipped as a dashed placeholder box for most of
the page's life — a heading about faces, with no face. So unlike most frames
in this library, the person is centred, front-on, and looking at the camera
with a warm open expression. A figure turned away would argue against its own
heading.

The vacuum is the only equipment in frame and it is doing one specific job:
without it, a woman standing in a living room is not identifiably at work.

⚠️ **Generated, not photographed, and this is the page where that matters
most.** She does not exist. She is honest as generic service imagery — not
named, not captioned as a team member, not presented as a participant, which
is the line §7 draws. But a page promising "the same familiar faces" is the
page where a real photograph of the real nine does the most work. Shoot it
before launch.

```
A cleaner standing in the comfortable, lived-in living room of an ordinary
suburban Australian home, turning toward the camera with a calm, warm,
friendly, open expression, one hand resting on the handle of an upright
vacuum beside her, a familiar face part-way through a regular visit.

The room: a modest, homely and well-kept living room, a soft grey fabric
two-seater sofa with a folded cream throw, a pale timber sideboard with two
framed pictures whose images are soft green landscapes and no writing, a
comfortable armchair by a wide window, sheer white curtains drawn back, a
large potted peace lily, a woven jute rug on warm timber floorboards, plain
white walls. Lived in and loved rather than styled, with no clutter.

Light: bright mid-morning Australian daylight through the wide window, soft
shadows, warm and reassuring rather than clinical.

The cleaner wears a plain aqua polo shirt, a plain dark teal apron and dark
teal rubber gloves. Every garment is completely plain: no logos, no badges,
no name tag, no embroidery, no printing, no lettering. She stands relaxed and
upright, facing the camera, clearly the subject of the frame.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, jute and green foliage. Absolutely no orange, no yellow,
no red, no pink and no strong blue anywhere in the frame.

Nothing in the frame carries writing: no signage, no book titles, no labels,
no wall art with words, no screens showing anything.

Wide eye-level shot, approximately 28mm, the whole room readable around her,
deep depth of field, square composition with the cleaner in the middle third.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 1:1
square, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

## 2. Card 3 — talking to a support coordinator

See "The label changed with the photo" above for why this is a conversation
rather than a document.

The register matters as much as the content. The commercial pages' equivalent
frame is a walkthrough where a scope gets agreed — brisk, transactional, in
an office reception. This one is in a home, both women are at ease, and the
cleaner is **listening** rather than presenting. A coordinator placing a
participant is assessing whether this provider will be good to the person,
not whether the quote is sharp.

The gloves-in-the-apron-pocket detail is borrowed from the commercial
folder's reception frame, and so is its trap: the first take there came back
with a mismatched blue-and-mint pair, so the prompt states that both gloves
are exactly the same dark teal.

```
Two women standing and talking in the living room of an ordinary suburban
Australian home, mid-conversation, warm and relaxed and unhurried, the
cleaner listening attentively while the other woman explains something, both
at ease.

The room: a homely, well-kept living room, a soft grey fabric sofa with a
folded cream throw, a comfortable armchair by a wide window, sheer white
curtains drawn back, a pale timber sideboard, a large potted peace lily, a
woven jute rug on warm timber floorboards, plain white walls.

Light: bright mid-morning Australian daylight through the window, soft
shadows, warm and reassuring.

The woman on the left wears a plain aqua polo shirt and a plain dark teal
apron, with a single matching pair of dark teal rubber gloves tucked into the
apron pocket, both gloves exactly the same dark teal. The woman on the right
is a support coordinator in ordinary smart-casual clothes, a linen shirt and
trousers, no gloves, nothing in her hands, no clipboard and no folder. Both
outfits completely plain: no logos, no badges, no printing, no lettering.

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

**A testimonial face.** Both quotes on this page are `[TBC]` and the avatars
are labelled placeholders. A generated headshot beside a participant's name
invents a person with disability as a customer — the worst version of the
thing §7 forbids. When real quotes arrive, note that a participant quote is
health-adjacent personal information: consent must be explicit and informed,
and identifying detail (a suburb plus a disability, say) minimised.

**Anything resembling a credential.** No registration badge, no NDIS mark, no
worker-screening card, no certificate. The page has four open compliance
brackets, including whether the checks are police checks or NDIS Worker
Screening, and a generated badge would answer them in the reader's mind
before TLB has answered them in fact.

---

## Export settings used

Both were generated at the native sizes in the table above, then re-encoded
to JPEG with `sharp` at mozjpeg quality 86 — 150KB and 132KB, well inside the
under-600KB budget IMAGE-GUIDELINES §5 sets. No resizing; Astro re-encodes to
webp at 400/800/1200 from these sources.
