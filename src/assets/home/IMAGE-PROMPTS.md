# Image prompts — shared home-page assets

The prompts behind assets in this folder, kept so a slot can be regenerated
consistently rather than re-invented. Written to the template in
[`IMAGE-GUIDELINES.md`](../../../IMAGE-GUIDELINES.md) §8.

Only the assets generated for a specific slot are listed. The five
`service-*` files predating this sheet are copies of photos used elsewhere on
the site and have no prompt of their own.

Generated with `gemini-3-pro-image-preview` via the media-pipeline CLI.

| Asset | Family | Native | Slot |
|---|---|---|---|
| `service-commercial-cleaning.jpg` | A, scene | 1200×896 | Home `/`, "Our services" tile — Commercial cleaning |

---

## 1. Our services tile — commercial cleaning

A shopfront, not an office. The three photos in
`src/assets/commercial_cleaning/` are all office interiors, and one of them
reused here would have made the tile read as a duplicate of the page it links
to. The tile's copy is "offices, shopfronts and premises", so the shopfront is
the half of that sentence the commercial page does not already picture.

The uniform is the §3 canonical one, verbatim: aqua polo, dark teal apron,
dark teal rubber gloves. The colour allow-list and the explicit ban on orange,
yellow, red, pink and blue are not optional — see the commercial folder's
sheet for what happens without them.

```
A cleaner wiping down the glass shopfront door of a small retail store from
the inside, early in the morning before the store opens, calm and unhurried.

The room: a bright, tidy small shop interior with pale timber shelving along
the right wall holding plain unlabelled ceramic and homeware pieces, a pale
timber counter at the back left, a large potted monstera by the door, a
polished concrete floor with a soft sheen, plain white walls. Through the
glass, a quiet coastal street with green foliage outside.

Light: early mid-morning daylight pouring through the shopfront glass, soft
shadows, bright and airy, a clean reflection on the floor.

One woman in a plain aqua polo shirt, a plain dark teal apron, dark teal
rubber gloves and dark trousers, seen three-quarters from the side, mid-task
with a plain grey microfibre cloth and one unlabelled clear spray bottle in
her other hand, face in calm profile.

The uniform is completely plain: no logos, no badges, no name tag, no
embroidery, no printing, no lettering.

Colour palette strictly limited to dark teal, aqua, white, warm timber, soft
grey, brushed metal and green foliage. Absolutely no yellow, no orange, no
red, no pink and no blue anywhere in the frame, including the cloth, the
bottle and the products on the shelves.

Nothing in the frame carries writing: no shop signage, no window lettering, no
price tags, no labels on any bottle or product, no posters, no screens showing
anything.

Wide eye-level establishing shot, approximately 28mm, the whole space readable
around her, deep depth of field, she and the door sit in the middle third.

Bright Australian coastal commercial interior, white walls, warm timber,
natural window light, soft shadows, optimistic bright grade. Photorealistic,
4:3, high resolution.

No text, no signage, no logos, no watermark, no collage, no grid, no border,
no vignette, no distorted hands.
```
