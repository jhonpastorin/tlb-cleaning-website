# Image prompts: end of lease and bond cleaning

Outstanding image slots for [`src/pages/end-of-lease-cleaning.astro`](../../../../pages/end-of-lease-cleaning.astro).

Read [`IMAGE-GUIDELINES.md`](../../../../../IMAGE-GUIDELINES.md) first. Every
prompt below already carries the house style and the hard rules, but the
guidelines are what settles anything a prompt does not cover.

**Canonical uniform** (guidelines section 3, and the recommendation this sheet
follows): aqua polo, teal apron, teal gloves. Use that wording verbatim in
every prompt where a cleaner appears, so this page does not add a fifth
uniform to a library that already has four.

---

## What this folder already has

Nothing. The folder is empty, which is why the page currently borrows three
photos from elsewhere in the library.

## What the page currently borrows, and whether that is fine

| Slot | Currently using | Verdict |
|---|---|---|
| Hero | `end-of-lease-cleaner-with-squeegee-and-cloth.png` (this folder) | **Replaced.** The hero used to borrow `home/service-end-of-lease-and-bond-cleans.png`, which is a family A scene photo saved as a PNG — so this page's hero was the only one on the site showing a boxed photograph where every sibling shows a family B cut-out. Reuse does not override the family rule (guidelines section 1: heroes are cut-outs). The homepage tile still uses the scene photo, which is the right slot for it. |
| Card 1, moving out | `deep_cleaning/deep-cleaning-empty-room-on-moving-out-day.jpg` | **Keep.** It genuinely shows moving-out day. A second moving-out photo would make one idea look like two (guidelines section 5). |
| Card 2, property manager | `home/rental-property-cleaning-two-storey-house-exterior.jpg` | **Keep for now, replace eventually.** It is the library's rent-roll image and it is honest, but it is an exterior on a card whose copy is about vacancy turnarounds. A property manager at a bench with a tablet and keys would serve the card better. Prompt 3 below, low priority. |
| Card 3, comparing | `deep_cleaning/deep-cleaning-comparing-clean-types-with-a-checklist.jpg` | **Keep.** Same shot, same job, on both pages that offer the same comparison. |

So the page has **no blocking image gap**. Everything below is either a
reserved before/after slot that needs real photography rather than generation,
or an optional upgrade.

---

## 1. The before/after gallery. NOT a generation job

Four slots in section 9, all reserved.

**These must never be generated.** IMAGE-GUIDELINES.md section 7 bars "fake
proof, including before/after pairs implying a specific job", and BFD section
5.2 requires before-and-after imagery to come from genuine TLB jobs. A
generated pair on this page would be a fabricated claim about a real service
in a section headed "Real TLB bond cleans".

They are a **photography brief for the team**, not a prompt:

- Two pairs: an oven interior, and a shower screen with grout.
- Shoot each pair from **one fixed position**. Mark the spot. A pair shot from
  two positions does not read as the same room and the comparison collapses.
- Same light both times. Do not shoot the before at night and the after at
  midday.
- 4:3, landscape, at least 1600px on the long edge.
- **Written permission from the tenant, and from the agency where the property
  is managed.** An end-of-tenancy before shot can identify both a former
  tenant and a managed property, which is squarely what BFD section 5.3
  (Privacy) covers.
- **Nothing identifying in frame.** No house numbers, street signs, mail,
  people, names on doors, or anything through a window that locates the place.

## 2. The video slot. Also not a generation job

Section 10, reserved 16/9. A walkthrough of a real TLB bond clean in an empty
rental. Same consent conditions as above. An empty property is the easiest
consent case on the site, since there are no belongings in frame, so this is
the most achievable piece of real media the page needs.

---

## 3. Property manager at a handover (optional upgrade, card 2)

Replaces the borrowed exterior. Low priority, and only worth doing if the
exterior starts appearing on several pages at once.

```
A woman in ordinary business clothes standing at a kitchen bench in an empty
rental property, holding a tablet, with a set of keys and a printed condition
report on the bench beside her.
Empty open-plan kitchen, pale benchtop, timber floor, no furniture anywhere.
Mid-morning natural window light, soft shadows.
One person in frame, in plain business clothes, no uniform, no gloves.
Wide eye-level shot, ~28mm.

Bright Australian coastal interior, white walls, warm timber floor,
natural window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.
No text, no signage, no logos, no watermark, no collage, no distorted hands.
```

⚠️ The condition report on the bench will come back with garbled lettering on
it, which is the exact failure mode guidelines section 4 warns about. Either
crop it out, angle it so no text face is visible, or drop it from the prompt
and keep just the keys.

Save as `end-of-lease-property-manager-at-a-vacant-handover.jpg`, 2400x1792,
under 600KB.

---

## 4. Empty property mid-clean (optional, no slot yet)

Not currently placed. Worth having if a future revision wants a photo beside
the "How the standard is actually set" grid or the "Both sides of the border"
block, both of which are currently text-only.

```
A cleaner wiping out the inside of an empty kitchen cupboard in a vacant
rental property, cupboard doors open, drawers out on the bench.
Empty kitchen, pale benchtop, timber floor, no furniture, no belongings.
Mid-morning natural window light, soft shadows.
One cleaner in frame wearing an aqua polo, teal apron and teal gloves.
Wide eye-level shot, ~28mm.

Bright Australian coastal interior, white walls, warm timber floor,
natural window light, soft shadows, optimistic bright grade.
Photorealistic, 4:3, high resolution.
No text, no signage, no logos, no watermark, no collage, no distorted hands.
```

Save as `end-of-lease-cleaner-wiping-out-an-empty-kitchen-cupboard.jpg`,
2400x1792, under 600KB.

---

## Before you commit anything from this sheet

Run the checklist in IMAGE-GUIDELINES.md section 9. The two that catch most
failures here: no lettering anywhere in shot (condition reports, appliance
badges and oven dials all produce garbled text), and check the file is not a
duplicate of something already in `src/assets/`.
