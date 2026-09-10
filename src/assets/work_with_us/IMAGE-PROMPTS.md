# Image prompts — Work with us

The prompt behind the one asset in this folder, kept so the slot can be
regenerated consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `work-with-us-two-cleaners-working-together-in-a-kitchen.jpg` | A, scene | 1200×896 | Hero |

---

## This is the only page on the site whose reader is not a client

That changes what the photo has to say. Every other people-bearing frame in
this library is aimed at someone deciding whether to let a cleaner into their
home, so the cleaner is the reassuring subject. Here the reader is deciding
whether to *be* the cleaner, and what they are weighing is whether the work
would be bearable: who they would work with, whether anyone would talk to
them, whether the pace is frantic.

So the frame is a **pair**, mid-task and mid-conversation, and neither of them
is scrubbing hard. The page's offer is a set run with a team, not shift work,
and one figure alone in a kitchen would advertise the opposite.

The kitchen is deliberately an ordinary one rather than a display home. An
applicant knows what a real kitchen looks like, and a styled one reads as an
advertisement aimed at somebody else.

## Uniform

The canonical uniform from IMAGE-GUIDELINES §3, stated verbatim in the
prompt: aqua polo, dark teal apron, dark teal gloves, every garment plain. In
the delivered frame both pairs of gloves match, which is the detail the ndis
folder's own prompt had to fight for, so the "both pairs of gloves exactly
the same dark teal" line is worth keeping in any regeneration.

⚠️ **No logo on the apron, ever.** IMAGE-GUIDELINES §4 records that an earlier
library image came back with an invented "TLG PROFESSIONAL" mark on the
apron, which is a fabricated brand asset. On a careers page it would be worse
than elsewhere: a uniform with a logo reads as a uniform that exists, which
is a claim about the business a photograph should not be making.

---

## 1. Hero — two cleaners working a kitchen together

Family A, 4:3, `cover` fit. Copy left, image right, matching every other hero
on the site.

```
Two cleaners working through a kitchen together, easy in each other's
company, one wiping down the stone benchtop with a folded cloth, the other
rinsing a cloth at the sink and half turned toward her, both mid-task and
mid-conversation, unhurried and companionable.

The room: an ordinary well-kept Australian kitchen, pale stone benchtop,
plain white shaker cupboards, a stainless sink under a wide window looking
onto a green garden, warm timber floorboards, a bowl of lemons, a potted herb
on the sill, plain white walls.

Light: bright mid-morning Australian daylight through the window over the
sink, soft shadows, optimistic bright grade.

Both cleaners are women in plain aqua polo shirts, plain dark teal aprons and
dark teal rubber gloves, both pairs of gloves exactly the same dark teal,
every garment completely plain with no logos, no badges, no name tags, no
embroidery, no printing and no lettering. Hands are natural and correctly
formed, each hand with five fingers.

Colour palette strictly limited to dark teal, aqua, white, cream, warm
timber, soft grey, stainless steel and green foliage. No orange, no red, no
pink, no strong blue anywhere in the frame.

Nothing in the frame carries writing: no bottle labels, no packaging, no
chopping board branding, no wall art with words, no screens, no calendar, no
notes on the fridge.

Wide eye-level shot, approximately 28mm, the kitchen readable around the
pair, shallow but not extreme depth of field.

Bright Australian coastal interior, white walls, warm timber floor, natural
window light, soft shadows, optimistic bright grade. Photorealistic, 4:3,
high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```

---

## What was NOT generated, and must not be

- **A team photo, or any named employee.** Same rule as `/about/`, and the
  same reason: see `src/assets/about/IMAGE-PROMPTS.md`. If TLB wants real
  faces on this page, and a careers page is one of the two places they do the
  most work, they come from a real shoot with written consent.
- **Anything that looks like an award, a certificate or an accreditation.**
  The page holds back its answers on pay and background checks precisely
  because they are unconfirmed. A generated badge would answer them in the
  reader's mind first.
- **A phone or tablet showing a roster.** The page talks about set runs and
  reminders, which is tempting to illustrate with a screen. A generated
  screen is generated lettering, and IMAGE-GUIDELINES §4 rules it out.
- **A second frame for the "how to apply" steps.** That section is a
  ContentGrid of three text cells, not a photo sequence, deliberately: the
  process itself is still marked as a proposal in
  `src/pages/work-with-us.astro`, and photographing an unconfirmed process
  would give it more weight than it has earned.

## Export settings used

Generated at 1200×896 native, then re-encoded to JPEG with `sharp` at mozjpeg
quality 86: 114KB, well inside the under-600KB budget IMAGE-GUIDELINES §5
sets. No resizing; Astro re-encodes to webp at 400/800/1200 from this source.
