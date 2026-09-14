# To-Do

Open items that need a person, not a build step.

---

## Location hero photos — what was done, and what still needs checking

**Status: 55 towns got their own generated scene; Lismore keeps the shared
region photo by TLB's choice. Nothing was skipped, so nothing is flagged as
"could not find an image".** Before this change, 56 town pages shared three
photos between them — around twenty Northern Rivers pages opened on the same
weatherboard house.

**Lismore** is deliberately still on `weatherboard-home-with-hinterland-hills.jpg`.
The generated alternative (a flood-plain river bend with houses on high timber
stumps) was deleted, but its prompt is kept in the manifest as `retiredSubject`,
so the decision reverses in one command if TLB changes its mind.

Source of truth: `scripts/locations/town-scenes.json` (one prompt + one alt-text
label per town). Regenerate the whole set, or re-shoot one town:

```
node scripts/locations/generate.mjs      # skips towns whose .jpg already exists
node scripts/locations/verify-built.mjs  # after a build: 56 pages, 56 distinct heroes
```

### ⚠️ Read this before treating the photos as finished

**These are not photographs of these towns, and they must never be captioned as
if they were.** Each scene is *characteristic* of its town — cane flats for
Broadwater, red soil for Cudgen, canals for Burleigh Waters, a basalt rock shelf
for Fingal Head — but every one is generated. That is exactly why the alt text
describes only what is in the frame and never names a town, a landmark or a
street. A generated image captioned "the Byron Bay lighthouse" is a fabricated
claim about a real place; the same image captioned "a headland above a curving
bay" is a picture of a headland. `src/data/townPages.ts` documents the rule at
`townHeroes`. Keep it if you edit a label.

### 1. Full visual pass — OUTSTANDING

Only about eight of the 56 were reviewed by eye. The automated checks confirm
ratio, file size, distinctness and alt text, but they cannot see a garbled sign,
a wrong-looking building or a sixth finger. **Someone needs to look at all 56
against `IMAGE-GUIDELINES.md` §9 before these go live.** One (Nimbin) was
already re-shot after it came out looking like a derelict film set, so the
failure mode is real.

### 2. Towns where a local should confirm the scene reads right

The scene choices come from the map and general knowledge of the area, not from
someone who drives these roads. These are the ones most likely to look wrong to
a resident:

| Town | Why it is worth a second look |
|---|---|
| Casino | Came out reading more Victorian goldfields than Northern Rivers |
| Bangalow | Street is cobblestoned in the image; the real one is asphalt |
| Goonellabah | Generic hilltop suburb — could be almost anywhere |
| Wollongbar | Generic new estate; the macadamia rows are the only local cue |
| Elanora | Generic lake-and-suburb scene |
| Bexhill | The open grass bowl and quarry face are a guess at the area |
| Tweed Heads South | Canal estate is plausible but unspecific |

### 3. Near-duplicate risk

Distinct files, but similar enough that a reader comparing two pages may read
them as the same photo. Worth re-shooting one of each pair with a different
angle or time of day if it bothers you:

- **The `/locations/` hub → Lismore** — not a near-duplicate but an exact one.
  The hub's Northern Rivers region card and the Lismore hero are now the same
  file, so a reader arriving at Lismore from the hub sees that photo twice in
  two clicks. This is the one place the repetition this work set out to remove
  still happens, and it is a direct consequence of keeping Lismore on the
  region photo. Fixable either by giving Lismore its own scene again or by
  giving the hub's Northern Rivers card a different photo.
- **Bogangar / Cabarita Beach** — effectively one locality split across two
  entries in `locations.ts`, now carrying two different photos of it.
- **Bilinga / Tugun / Palm Beach / Miami** — four variations on "wide beach,
  low apartments behind". Currently differentiated mostly by camera height.
- **Skennars Head / East Ballina** — adjacent, and both elevated coastal.
- **Tweed Heads South / Burleigh Waters** — both residential canals.

### 4. The three region photos are still in use

`heroImages` (weatherboard home / coastal home / valley) was **not** deleted. It
still backs the `/locations/` hub's own hero and its three region cards, where a
region-wide photo is the honest choice, and it is the fallback for any town
added to `locations.ts` before its scene is generated. If you add a town, add it
to `town-scenes.json` too or it quietly inherits a region photo.

---

## Still the bigger risk on these pages: the `local` paragraph

**This change made the location pages look different from each other. It did not
make them *say* anything different.** 55 of 56 still have no `local` paragraph,
so they remain one template with a town name and six suburb links swapped
through it — which is what Google calls a doorway page, and the penalty is not
scoped to the thin pages. A distinct photo does not fix that, and may make it
easier to overlook.

`src/data/townPages.ts` sets out the two honest options in its header: write
`local` for every town before launch, or ship only the towns that have one.
That decision is still open and still belongs to TLB.

Lismore is the page to write first — the 2022 flood gives it material no other
town has, and it links naturally to `/mould-cleaning-and-removal/`. It was
deliberately left undrafted: inventing TLB's own account of a disaster in a
community they work in is not a placeholder decision to make on their behalf.
