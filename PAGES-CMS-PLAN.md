# Pages CMS for TLB Cleaning: implementation plan

**Goal:** every piece of visible copy and every photo on every page of tlbcleaning.com.au can be edited in a friendly web editor (Pages CMS), by people without GitHub accounts, while the site stays a fully static Astro build on Render.

**Status:** Phases 1 to 4 done on `feature/pages-cms` (8 Oct 2026): every page's copy and photos are editable, and the editor has been tidied. Phases 5 to 7 remain. Phase 0 has three Pages CMS checks still open (photos, emptied fields, `.JPG` uploads); they must pass before Phase 3. See "Spike findings" and "Phase 1 results" in section 9.

---

## 1. What "done" looks like

- An editor logs in at app.pagescms.org with their email, picks a page from a sidebar ("Home", "House cleaning > Oven cleaning", "Guides > End of lease checklist"...), changes a heading, a paragraph, an FAQ or a photo, and clicks Save.
- The save becomes a commit on the `staging` branch. Render rebuilds the staging site automatically, so the editor can check the change on staging a few minutes later.
- When the change looks right, the editor (or Jhon) clicks **Publish to live** inside Pages CMS. A GitHub Action re-runs the checks and merges `staging` into `main`, and Render deploys production.
- Layout, section order, colours, spacing and SEO plumbing stay locked in code. Editors change *content*, not *design*. A bad edit cannot remove the H1, break the page structure, or ship a banned brand word to the live site.

### How content moves

```
Editor (browser)
   |  Save
   v
Pages CMS  --commit-->  GitHub: staging branch
                              |  Render auto-deploys
                              v
                        staging site (noindex)  <-- editor checks it here
                              |
               "Publish to live" button in Pages CMS
                              |  GitHub Action: brand lint + astro check + build, then merge
                              v
                        GitHub: main branch  --Render-->  tlbcleaning.com.au
```

---

## 2. Where we are starting from

| Area | Today | Count |
|---|---|---|
| Top-level pages | `src/pages/*.astro`, copy written as JS constants in each file's frontmatter | 12 |
| House cleaning services | `src/pages/house-cleaning/*.astro` | 16 |
| Commercial cleaning services | `src/pages/commercial-cleaning/*.astro` | 15 |
| Guides | `src/pages/guides/*.astro` (index + 9 articles) | 10 |
| Locations | `locations/index`, 2 region pages (`RegionPage.astro` + `regionPages.ts`), 1 town template (`[town].astro` + `townPages.ts`, 56 towns) | 4 templates |
| Section components | `src/components/sections/*.astro` | 25 |
| Shared data | `src/data/*.ts` (navigation, trust bar, brand lines, reviews, team, locations, towns, comparison, contact form...) | 17 files |
| Images | All in `src/assets/**`, imported as ES modules so Astro optimises them. Nothing editable in `public/` | 262 files |

Three facts shape the whole plan:

1. **Copy is already separated from markup inside each page.** Every page declares objects like `const hero = {...}` and `const pathwayCards = {...}` and passes them to section components. That makes extraction mechanical: those objects move to YAML files almost as they are.
2. **Copy is plain text.** No inline links, bold or HTML inside copy strings (one guide uses `set:html`, handled separately). So editors get plain text boxes, not a rich-text editor. That is simpler for them and safer for the brand.
3. **Every page orders its sections differently.** House cleaning runs Hero, TrustBar, TextBlock, PathwayCards, ComparisonTable...; a guide runs Hero, TrustBar, TextBlock, ComparisonTable, ContentGrid, Callout... So the CMS config must describe each page's own set of sections (see decision D1).

---

## 3. Key decisions

### D1. Fixed layout, editable content (not a page builder)

Each page keeps its `.astro` file, which owns the layout and the order of sections. Its content moves to one YAML file per page, for example `src/content/pages/house-cleaning.yaml`. The Pages CMS form for that page shows the page's sections top to bottom, in the same order as the live page.

**Why not a drag-and-drop page builder** (Pages CMS's `block` field can do that): the pages carry careful SEO and brand decisions (one H1, section order traced to content plans, trust bar placement, FAQ schema). A page builder lets an editor delete or reorder those by accident. It would also mean replacing 41,000 lines of hand-tuned pages with a generic renderer, which is a rebuild rather than a migration. We can add a builder later for *new* landing pages if it is ever wanted.

**Cost of this choice:** `.pages.yml` needs one entry per page (about 60 entries). Reusable **components** (one per section type) keep each entry short: an entry is mostly a list of `component: hero`, `component: faq` lines.

### D2. Content lives in Astro content collections (YAML), validated at build time

- Folder: `src/content/` (Astro 4 content collections, `type: 'data'`, YAML files).
- Every collection has a Zod schema in `src/content/config.ts`. If an editor's save produces something invalid (a missing heading, an image that does not exist), **the build fails** and nothing broken reaches the site. Render keeps serving the previous build.
- Pages read their content with a small helper: `const page = await getPage('house-cleaning')`.

### D3. Plain text fields, with a structured "body" field

- Headings and short lines: `string` fields with `maxlength` where the design needs it.
- Paragraphs, FAQ answers, card descriptions: `text` fields (multi-line, plain).
- `TextBlock` bodies (which today mix paragraphs, bullet lists and subheadings) use a Pages CMS `block` list with three choices: **Paragraph**, **Bullet list**, **Subheading**. This is the only place editors add or remove items freely, and it matches what the component already supports.
- No `rich-text` fields. If an inline link is ever needed in copy, we add it deliberately as a structured field.

### D4. Images stay in `src/assets/`, resolved at build time

- Pages CMS media source: `input: src/assets`, `output: /src/assets`. An uploaded or chosen image is saved into the content file as a path like `/src/assets/home_cleaning/kitchen.jpg`.
- A helper (`cmsImage()`, built on `import.meta.glob`) turns that path into the same `ImageMetadata` the components already use. **Astro's image optimisation keeps working exactly as today.** A path that does not exist fails the build with a readable message.
- Editors control **which photo** and its **alt text**. Aspect ratio, crop behaviour (`fit`) and eager loading stay in code, because they are layout.

### D5. Shared brand lines become tokens

31 pages insert `theLine.fast` and 4 insert `theLine.instant` inside their copy (for example `` `The same local team... ${theLine.instant}` ``). YAML cannot run JavaScript, so content uses tokens instead:

```yaml
lead: "The same local team, on the same day, every time. {{line.instant}}"
```

`getPage()` replaces tokens from the single source in `brand-lines.ts`. An unknown token fails the build. The field description in Pages CMS lists the available tokens.

### D6. Editors work on `staging`; publishing is a button

- Pages CMS edits whichever branch is selected in its branch picker. Editors are told to stay on `staging` (it opens on the last branch used).
- A Pages CMS **Action** ("Publish to live") triggers a GitHub workflow that runs brand lint, `astro check` and a production build, then merges `staging` into `main`. If any check fails, nothing is published and the run shows why.
- This keeps the existing staging safety net (noindex, separate form webhook) and matches the repo rule that work goes through `staging`.

### D7. Editor guidance moves into the CMS; developer rationale stays in code

The `.astro` files carry long comments explaining *why* copy says what it says (brand foundation rules, keyword workbook decisions, open [CONFIRM] items). Two rules:

- **Comments in YAML files will be lost.** Pages CMS rewrites the file on save. Nothing important goes in YAML comments.
- Rationale for developers stays as comments in the `.astro` file, next to `getPage()`. Guidance editors need ("Keep under 60 characters", "Never say cheap, budget or premium", "This line is reused on 31 pages, edit it under Site settings") goes into `description:` on the field in `.pages.yml`, which shows under the input in the editor.

### D8. What stays code-only

| Stays in code | Why |
|---|---|
| Section order, which sections exist, variants, themes, backdrops | Layout and design system |
| Image aspect ratios, `fit`, `eager` | Layout and performance |
| Canonical URLs and page slugs | SEO; changing a slug needs a redirect plan |
| JSON-LD structure (business schema, FAQ schema generation) | Generated from content, but the structure is code |
| Contact form webhook, SITE_ENV, robots, headers | Infrastructure (Render env vars) |
| Scripts and interactive behaviour (sliders, carousels) | Code |

SEO **title** and **meta description** are editable, with `maxlength` limits and guidance.

---

## 4. Phases

Each phase ends with an acceptance check. Do not start the next phase until it passes.

### Phase 0: Spike on one page (proves the whole loop)

Do one real page end to end before building anything at scale. Recommended page: **`how-booking-works.astro`** (403 lines, typical sections, low risk), then **`house-cleaning.astro`** to cover ComparisonTable, PathwayCards and brand-line tokens.

1. Create a branch from `staging`: `feature/pages-cms`.
2. Install the Pages CMS GitHub App on `jhonpastorin/tlb-cleaning-website` (github.com/apps/pages-cms, or "Sign in with GitHub" at app.pagescms.org and grant the repo).
3. Add a minimal `.pages.yml` with the media source and one `file` entry for the spike page.
4. Create `src/content/config.ts` with one `pages` collection, the image resolver and the token resolver (section 6 has the code).
5. Move the spike page's constants into `src/content/pages/how-booking-works.yaml` and change the page to read from it.
6. Run the **output diff** (Phase 1, step 6): the built HTML must match the pre-migration HTML.
7. In Pages CMS on the feature branch: edit a heading, a paragraph, an FAQ, swap an image, upload a new image, add a bullet to a body list. Check each commit's diff on GitHub.

**Things the spike must answer** (each one changes later steps if the answer is no):

- [ ] Does Pages CMS write image paths exactly as `/src/assets/...`, and does `cmsImage()` resolve them? (If not, adjust `output`.)
- [ ] Does `import.meta.glob` + Zod `.transform()` work inside `src/content/config.ts` on Astro 4.16? (Fallback: resolve images and tokens in `getPage()` instead of the schema.)
- [ ] How does Pages CMS re-serialise YAML (quoting, line wrapping, key order)? Write the migrated YAML files in the same style so the first editor save is not a whole-file diff.
- [ ] Does `settings.content.merge: true` keep code-only keys we choose to leave in the file? (We aim not to have any, but confirm.)
- [ ] Does the `block` field (for TextBlock bodies) save the shape we expect, with `blockKey: type`?
- [ ] Do uploads with uppercase extensions (`IMG_1234.JPG` from phones) resolve? (The glob includes uppercase variants; `rename: safe` may also normalise them.)

**Acceptance:** an edit made in Pages CMS appears on a local build and on the staging site, the untouched page builds byte-identical apart from Astro scope hashes, and every spike question above is answered and noted in this file.

### Phase 1: Foundations (shared code, used by every page)

1. **Section schemas.** For each of the 25 section components, a Zod schema in `src/content/schemas/` mirroring the component's content props only (headings, text, items, images, CTAs). Design props (`theme`, `variant`, `align`, `ratio`) are **not** in the schema.
2. **Matching Pages CMS components.** For each section schema, a `components:` entry in `.pages.yml` with friendly labels and descriptions. Shared building blocks too: `seo`, `image`, `cta`, `textBody`.
3. **Helpers** in `src/lib/cms.ts`: `getPage(id)`, `cmsImage(path)`, token replacement, and a mapper from the CMS `textBody` shape to the existing `TextBlockBody[]` type.
4. **Collections** in `src/content/config.ts`: `pages` (one YAML per page, nested folders allowed: `pages/house-cleaning/oven-cleaning.yaml`), `site` (site-wide settings), `towns`, `regions`, `team`, `reviews`.
5. **Brand lint covers content.** Change the glob in `scripts/brand-lint.mjs` from `src/**/*.{astro,ts}` to also include `src/content/**/*.yaml`. YAML has no comment-skipping problem because it will have no comments.
6. **Output diff script** (`scripts/compare-build.mjs`): build `staging` into `dist-before/`, build the branch into `dist/`, compare every HTML file after stripping `data-astro-cid-*` attributes and `astro-xxxx` class hashes. Prints the pages that differ. This is the safety net for the whole migration: **a migrated page must produce the same HTML.**
7. **CI workflow** `.github/workflows/ci.yml` on every push to `staging` and on PRs: `npm ci`, `npm run brand-lint`, `npm run build`. A failure emails the repo owner.

**Acceptance:** spike page still passes the diff; `npm run brand-lint` scans YAML; CI runs green on the branch.

### Phase 2: Site-wide content ("Site settings" in the CMS)

Move the editable values out of `src/data/*.ts` into `src/content/site/*.yaml` and friends. **Only raw values move. Logic stays in TypeScript** (for example `townPages.ts` derives `nearby` suburbs; that derivation stays, reading its inputs from content).

| Today | Moves to | Edited as |
|---|---|---|
| `navigation.ts` (header nav, mega-menus, footer links, contact details, copyright, quote CTA) | `site/navigation.yaml`, `site/contact.yaml` | Site settings > Navigation, Contact details |
| `trust.ts` (trust bar cards) | `site/trust-bar.yaml` | Site settings > Trust bar |
| `brand-lines.ts` (the line, how it works, managed for you) | `site/brand-lines.yaml`; the TS file becomes a typed loader | Site settings > Brand lines |
| `googleReviews.ts` | `reviews/*.yaml` (collection) | Reviews |
| `meetTheTeam.ts` | `team/*.yaml` (collection) | Team members |
| `townPages.ts` (`local` paragraph, hero choice, nearby override) | `towns/<slug>.yaml` (collection, create/delete disabled) | Locations > Towns |
| `regionPages.ts` | `regions/<slug>.yaml` | Locations > Regions |
| `comparison.ts`, `premises.ts`, `appliance-services.ts`, `outsideYourHome.ts`, `whoIsInYourHome.ts`, `guides.ts` (listing data), `contactForm.ts` (labels, help text, options) | `site/*.yaml` | Site settings > (one entry each) |
| `locations.ts` (town lists and groups) | `site/locations.yaml` | Locations > Service area |
| `site-env.ts`, `types.ts` | Stay in code | Not editable |

Note on towns: 55 of 56 towns still have no `local` paragraph (see the warning in `townPages.ts`). After this phase TLB staff can write them directly in the CMS, which is the cheapest way to fix that doorway-page risk.

**Acceptance:** output diff is clean for the whole site; each Site settings entry opens and saves in Pages CMS.

### Phase 3: Migrate the pages, in waves

Same recipe for every page (section 5). Order by how often the content will be edited and how much traffic it gets:

| Wave | Pages | Count |
|---|---|---|
| 3a | Home, House cleaning hub, Commercial cleaning hub, Contact, About | 5 |
| 3b | Why TLB, How booking works (done in spike), Reviews, Work with us, Airbnb, Thank you, 404 | 6 |
| 3c | House cleaning services: deep, end of lease, carpet, window, oven, NDIS, real estate, mould, blind, mattress, upholstery, tile and grout, gutter, roof, pressure, exterior house washing | 16 |
| 3d | Commercial services: office, strata, aged care, medical, school and childcare, hospitality, kitchen, retail, gym, factory, warehouse, construction, brewery, carpet, pressure | 15 |
| 3e | Guides index + 9 guides (the NSW/QLD law guide's `set:html` table gets a structured field or stays code-only, decide when there) | 10 |
| 3f | Locations index, region layout, town template | 3 |

Commit each page separately (`Move <page> content to Pages CMS`) so any one can be reverted alone. Merge each wave to `staging` when its diff is clean, so the CMS becomes useful early rather than at the end.

**Acceptance per wave:** output diff clean for every page in the wave; each page opens in Pages CMS with its sections in page order; one test edit per page shows up on staging.

### Phase 4: Make the editor friendly

1. **Sidebar groups** (Pages CMS `type: group`): Main pages / House cleaning / Commercial cleaning / Guides / Locations / Reviews and team / Site settings.
2. **Labels in plain English.** "Hero: main heading" not `headingLines`. Each section object labelled as it appears on the page, e.g. "Section 4: Not quite what you need? (cards)".
3. **Descriptions on risky fields:** character limits, banned words, tokens, "this appears on every page".
4. **Lock structure:** `operations: { create: false, delete: false, rename: false }` on page entries and towns, so editors cannot create orphan pages or delete live ones.
5. **Validation:** `required` on headings and alt text; `maxlength` on SEO title (60) and meta description (155); `pattern` where a format matters (phone, URLs starting with `/` or `https://`).
6. **Media folders:** image fields default to the right folder via `path` (e.g. `home_cleaning/`), `rename: safe` so uploads get readable, SEO-friendly filenames, `extensions: [jpg, jpeg, png, webp]`.
7. **Staging link** in each page entry's description, so editors can jump to the page on staging.

### Phase 5: Guardrails and publishing

1. **Publish action.** `.pages.yml` `actions:` entry "Publish to live" (with a confirm dialog) dispatching `.github/workflows/publish-live.yml`. That workflow: checks out `main`, merges `origin/staging`, runs brand lint + `astro check` + build, then pushes `main`. On failure it stops and nothing is published.
2. **Large image check** in CI: warn on any new file in `src/assets` over 3 MB (phone photos). Astro still optimises the output, but the repo should not grow by 8 MB per upload. Editor guidance: export at about 2400 px on the long edge.
3. **Commit identity:** `settings.commit.identity: user` and a template like `Content: update {path} (by {userName} via Pages CMS)` so the git history shows who changed what.
4. **Branch protection on `main`** (if the GitHub plan allows it for this repo): require the CI check. The publish workflow is then the only normal way content reaches `main`.

### Phase 6: Onboard the editors

1. Invite each editor by email in Pages CMS (Collaborators). They do not need GitHub accounts and cannot change `.pages.yml` or other collaborators.
2. Write `EDITING-GUIDE.md` (one page, for TLB staff): how to log in, make sure you are on `staging`, edit, check staging, publish. What not to do. Who to ask.
3. 30-minute walkthrough, then the first few edits supervised.
4. Watch the first two weeks of commits for confusing fields; rename and re-describe them in `.pages.yml`.

### Phase 7: Clean up

- Delete dead constants and imports from migrated pages.
- Update `README.md` (content now lives in `src/content/`, edited via Pages CMS) and `SECTIONS.md` (each section's CMS schema next to its props).
- Record any spike findings that changed this plan in section 9.

---

## 5. The per-page migration recipe

For each page:

1. **List its sections** in render order and give each one a role name: `hero`, `trustBar`, `definition`, `pathways`, `inclusions`, `frequency`, `firstVisit`, `beforeAfter`, `faq`, `closingCta`... (Role names, not component names, because a page often uses `TextBlock` or `Faq` twice.)
2. **Create the YAML** at `src/content/pages/<slug>.yaml` with `seo` plus one key per role, copying values from the page's constants. Images become `{ src: /src/assets/..., alt: ... }`. `${theLine.fast}` becomes `{{line.fast}}`. Strip `[CONFIRM]`/`[TBC]` only where the page already ships without them.
3. **Change the page:** replace the constants with `const page = await getPage('<slug>')` and pass `page.hero`, `page.faq`... to the same components. Keep the design props (`theme`, `ratio`, `variant`) in the `.astro` file. Keep all rationale comments in the `.astro` file.
4. **Add the `.pages.yml` entry:** `type: file`, `path`, `format: yaml`, fields = `seo` + each role as `component: <section>`, labelled in page order.
5. **Verify:** `npm run build` then `node scripts/compare-build.mjs` shows no difference for this page. `npm run brand-lint` passes.
6. **Smoke test in Pages CMS** on the branch: open the page, save without changes (the file should not change, or only change whitespace once), make one edit, check it.
7. **Commit** that page alone.

---

## 6. Reference code

These were the starting points. The spike changed the schema approach (see "Spike findings" in section 9); the working versions are `.pages.yml`, `src/lib/cms.ts`, `src/lib/cms-schemas.ts`, `src/content/config.ts` and `src/pages/how-booking-works.astro`.

### `.pages.yml` (excerpt)

```yaml
media:
  - name: images
    input: src/assets
    output: /src/assets
    categories: [image]
    rename: safe

settings:
  content:
    merge: true
  commit:
    identity: user
    templates:
      update: "Content: update {path} (by {userName} via Pages CMS)"

components:
  seo:
    type: object
    label: Search engine listing
    fields:
      - name: title
        label: Page title (Google headline)
        type: string
        required: true
        description: Keep under 60 characters. Main keyword first, ends with "| TLB Cleaning".
        options: { maxlength: 60 }
      - name: description
        label: Meta description
        type: text
        required: true
        description: Aim for 140 to 155 characters. Never use cheap, budget, affordable or premium.
        options: { maxlength: 155 }

  image:
    type: object
    fields:
      - name: src
        label: Photo
        type: image
        options: { media: images, extensions: [jpg, jpeg, png, webp] }
      - name: alt
        label: Describe the photo (for screen readers and Google)
        type: string
        required: true

  cta:
    type: object
    fields:
      - { name: label, label: Button text, type: string, required: true }
      - { name: href, label: Link, type: string, required: true, pattern: "^(/|https://|tel:|mailto:)" }

  textBody:
    type: block
    label: Body
    list: true
    blockKey: type
    blocks:
      - name: paragraph
        label: Paragraph
        fields:
          - { name: text, type: text }
      - name: list
        label: Bullet list
        fields:
          - { name: items, type: string, list: true }
          - { name: ordered, label: Numbered list, type: boolean }
      - name: subheading
        label: Subheading
        fields:
          - { name: text, type: string }

  hero:
    type: object
    label: Hero (top of page)
    fields:
      - name: headingLines
        label: Main heading (H1)
        type: string
        list: true
        description: Usually one line. Add a second line only if the design calls for a two-line heading.
      - name: lead
        label: Intro sentence
        type: text
        description: "Tokens: {{line.instant}} or {{line.fast}} insert the brand line."
      - { name: image, component: image }

  faq:
    type: object
    label: FAQs
    fields:
      - { name: heading, type: string }
      - name: items
        label: Questions
        type: object
        list: true
        fields:
          - { name: question, type: string, required: true }
          - { name: answer, type: text, required: true }

content:
  - name: main-pages
    label: Main pages
    type: group
    items:
      - name: house-cleaning
        label: House cleaning (hub)
        type: file
        path: src/content/pages/house-cleaning.yaml
        format: yaml
        description: "Live on staging: https://<staging-url>/house-cleaning/"
        fields:
          - { name: seo, component: seo }
          - { name: hero, component: hero }
          - { name: definition, component: textBlock, label: "Section 2: What regular cleaning is" }
          - { name: pathways, component: pathwayCards, label: "Section 4: Not quite what you need?" }
          - { name: inclusions, component: comparisonTable, label: "Section 5: What's included" }
          # ...one line per section, in page order
          - { name: faq, component: faq }

actions:
  - name: publish-live
    label: Publish to live site
    workflow: publish-live.yml
    ref: staging
    confirm:
      title: Publish staging to the live site?
      message: Everything currently on staging goes live once the checks pass.
      button: Publish
```

### `src/content/pages/house-cleaning.yaml` (excerpt)

```yaml
seo:
  title: House Cleaning Services - Regular Cleans | TLB Cleaning
  description: Regular house cleaning from local mums you actually know. ...
hero:
  headingLines:
    - House cleaning you never have to chase.
  lead: The same local team, on the same day, every time. {{line.instant}}
  image:
    src: /src/assets/home_cleaning/house-cleaning-cleaner-scrubbing-the-kitchen-sink.jpg
    alt: A TLB cleaner scrubbing the kitchen sink beside a garden window
definition:
  body:
    - type: paragraph
      text: Regular home cleaning is an ongoing visit on a set schedule, ...
    - type: paragraph
      text: TLB Cleaning provides house cleaning services across the Northern Rivers, ...
```

### `src/lib/cms.ts` (helpers)

```ts
import type { ImageMetadata } from 'astro';
import { getEntry } from 'astro:content';
import { theLine } from '../data/brand-lines';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function cmsImage(path: string): ImageMetadata {
  const mod = images[path];
  if (!mod) {
    throw new Error(`[CMS] Image not found: ${path}. Re-select it in Pages CMS.`);
  }
  return mod.default;
}

const TOKENS: Record<string, string> = {
  'line.instant': theLine.instant,
  'line.fast': theLine.fast,
};

export function resolveTokens(text: string): string {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key: string) => {
    if (!(key in TOKENS)) throw new Error(`[CMS] Unknown token {{${key}}}`);
    return TOKENS[key];
  });
}

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`[CMS] No content file for page "${id}"`);
  return entry.data;
}
```

### `src/content/config.ts` (shape)

```ts
import { defineCollection, z } from 'astro:content';
import { cmsImage, resolveTokens } from '../lib/cms';

const text = z.string().transform(resolveTokens);
const image = z.object({
  src: z.string().startsWith('/src/assets/').transform(cmsImage),
  alt: z.string().min(1),
});

// One schema per section, composed per page. Pages differ in which sections
// they have, so the page schema is a loose object of optional sections and
// each .astro file asserts the ones it renders.
const pages = defineCollection({
  type: 'data',
  schema: z.object({
    seo: z.object({ title: z.string().max(60), description: z.string().max(155) }),
    hero: z.object({ headingLines: z.array(text), lead: text, image }).optional(),
    // ...section schemas
  }).passthrough(),
});

export const collections = { pages };
```

---

## 7. Section-by-section: what editors can change

| Section | Editable | Code-only |
|---|---|---|
| Hero | Heading line(s), intro, button text/link, image + alt | Variant, ratio, eager, layout |
| TrustBar | Edited once under Site settings | Icons, layout |
| TextBlock | Heading, body (paragraphs, lists, subheadings), button, background photo | Theme, alignment, size, scrim opacity |
| PathwayCards | Heading, accent, each card's title, description, image, button | Number of columns, numbering style |
| ComparisonTable | Heading, lead, column labels, rows (label, description, values: tick / cross / text), footnote | Which column is highlighted (could be editable later) |
| ServiceBlocks, ContentGrid, CardCarousel | Headings, item titles, text, images, links | Variant, grid layout |
| BeforeAfter | Heading, each pair's before/after photo + alt + caption | Slider behaviour |
| Faq | Heading, questions, answers | FAQ JSON-LD generation |
| Callout, StatBand, MetricsBlock | Text, numbers, labels | Theme |
| TagCloud | Heading; tags come from Site settings > Locations | Grouping logic |
| GoogleReviewSlider, TestimonialCarousel | Reviews collection | Slider behaviour |
| StoryMosaic, PhotoGallery, ImageBand | Photos, alt text, captions | Grid layout |
| CallToAction | Heading, text, button | Variant |
| SiteHeader, SiteFooter | Site settings > Navigation, Contact details | Mega-menu structure |
| ContactForm | Labels, help text, select options | Webhook, validation, submission code |
| VideoFeature | Hidden site-wide today; add when real video exists | All |

---

## 8. Risks and how the plan handles them

| Risk | Mitigation |
|---|---|
| Migration silently changes a page | Output diff script on every page (Phase 1.6); one commit per page |
| An editor saves invalid content | Zod validation fails the build; Render keeps serving the last good build; CI emails the failure |
| An editor uses a banned word or an em dash | Brand lint scans YAML in CI and in the publish workflow; field descriptions warn up front |
| An editor edits `main` directly | Editors told to use `staging`; branch protection on `main` if available; publish button is the normal route |
| Rationale comments get lost | They never go into YAML; they stay in the `.astro` files (D7) |
| `.pages.yml` and Zod schemas drift apart | One section = one Pages CMS component + one Zod schema, defined side by side and named identically; the spike checks the round trip; CI build catches mismatches as soon as content is saved |
| Huge phone photos bloat the repo | CI size warning; editor guidance; Astro still optimises output |
| Pages CMS (hosted) goes away or changes | Content is plain YAML in git. Nothing is locked in: the site builds without Pages CMS, and Pages CMS is open source and can be self-hosted |
| Editors break a URL by renaming a page | `rename: false`; slugs and canonicals are code-only |

---

## 9. Open questions (decide before or during Phase 0)

1. **Who edits?** Jhon only, or TLB staff too? (Changes how much Phase 4 and 6 matter.)
2. **Who presses Publish?** Any editor, or Jhon only after review? Pages CMS cannot restrict an action to one person, so "Jhon only" means editors are told not to, or the publish workflow requires a manual approval step (GitHub environments with required reviewers).
3. **Should SEO titles and meta descriptions be editable by TLB staff,** or kept to MNO? (They trace to the keyword workbook.)
4. **Highlighted comparison column, section themes:** content or design? Default: design (code-only).
5. **The law guide's HTML table:** give it a structured table field, or keep that one block in code?
6. **Staging URL** to put in each entry's description.

## Spike findings (Phase 0, 7 Oct 2026, branch `feature/pages-cms`)

**Done in code and verified locally**

- `how-booking-works` is migrated: content in `src/content/pages/how-booking-works.yaml`, page reads it with `getPage()`, Pages CMS entry under "Main pages". `astro check` passes, and **all 112 built pages match the pre-migration baseline**.
- **Schema design changed from section 6.** Each page declares its own schema inline from shared section schemas (`src/lib/cms-schemas.ts`) and validates it in `getPage()`. The collection schema in `src/content/config.ts` only checks `seo`. Reasons: exact types per page (the type checker already caught a schema that let Hero's required intro be empty), and image and token handling stay out of Astro's content config. Section schemas live in `src/lib/`, not `src/content/schemas/`, because Astro 4 treats every folder in `src/content/` as a collection.
- A bad edit fails the build with the file and field named, e.g. `[CMS] src/content/pages/how-booking-works.yaml does not fit its page: seo.description: ...`.
- **SEO length limits are guidance, not errors.** 60 of 112 titles are over 60 characters and 74 of 112 descriptions are over 160 (longest 80 and 197). The hard caps are 90 and 200 so existing pages stay saveable; the editor shows "aim for 60 / 155". Shortening the existing metadata is a separate SEO task.
- **Duplicate images removed.** Nine files in `src/assets` were byte-identical copies of others. Once the CMS helper loads every image, the build kept whichever name it met first, which renamed published image files on 29 pages. Each duplicate was deleted and its six imports pointed at the copy the live site already published, so output is unchanged and editors will not see the same photo twice. A few `IMAGE-PROMPTS.md` notes and `IMAGE-GUIDELINES.md` still mention the deleted names.
- **The compare script normalises random ids.** Ten section components build ids with `Math.random()` (`faq-x1y2z3a`), which differ on every build.
- **Bundled script names and order vary.** Rollup renames `/_astro/*.js` bundles whenever the module graph changes (69 pages after Phase 1 added files), and once reordered two independent imports. The compare script now fingerprints scripts by content, with imported files' fingerprints substituted for their names and runs of bare imports sorted. Tested: a one-character script change is still caught.
- **The brand lint now covers `src/content/**/*.yaml`**, linting each whole text value (YAML wraps long text over lines) and reporting `file:line (field.path)`. Tested with an injected banned word.
- **The brand lint already fails on `staging`**: 63 blockers (`mums`, `price-words`, `brackets-copy`), several of them deliberate client decisions. So Phase 5 cannot use "lint passes" as the publish gate as-is. Options: resolve or allow-list the existing ones, or gate on *new* blockers only (compare against `main`).

**Still to check in Pages CMS itself** (needs the GitHub App installed and the branch pushed)

- [x] `.pages.yml` loads without errors, including components that use other components (Hero uses `image`). Confirmed 7 Oct.
- [x] The `textBody` block list saves as `- type: paragraph` items, and the build renders the new paragraph. Confirmed 7 Oct (commit c7e1539).
- [ ] Choosing an image writes `/src/assets/...` and the build resolves it; uploading a new photo lands in `src/assets`.
- [x] Pages CMS's YAML output matches the migrated files' formatting: adding one paragraph produced a 2-line diff, nothing reformatted. Confirmed 7 Oct (commit c7e1539). Commit message template and author identity also work.
- [ ] Emptying an optional field saves as missing, `null` or `''` (the schemas accept all three).
- [ ] An uppercase `.JPG` upload resolves.

The test paragraph from commit c7e1539 was removed in code; the second round of Pages CMS edits (photos, emptied field, deleting that paragraph) never reached GitHub, cause unknown.

## Phase 1 results (7 Oct 2026)

- **Section schemas for every component a page uses** in `src/lib/cms-schemas.ts`, with a matching component in `.pages.yml` for each: `hero`, `heroCollage`, `textBlock`, `pathwayCards`, `linkList`, `iconGrid`, `imageCards`, `storySteps`, `photoGallery`, `textGrid`, `contentGrid`, `comparisonTable`, `beforeAfter`, `storyMosaic`, `imageBand`, `tagCloud`, `faq`, `callout`, `callToAction`, `sectionHeading`, `sectionIntro`, `videoFeature`, `contactForm`, `cardCarousel`, `metricsBlock`, `logoBar`. StatBand and TestimonialCarousel have none because no page uses them.
- **ServiceBlocks is three editor shapes** (`linkList`, `iconGrid`, `imageCards`) so an editor never sees an icon or photo field that a variant ignores.
- **Comparison cells:** editors type `yes` (tick), `no` (cross) or text. CORRECTED in Phase 3: one existing cell (mould-removal) is literally "No" as text, so that page's table uses a text-only cell schema. A general way to show a literal Yes/No is a Phase 4 item.
- **Pass-through rule:** a page passes every content field to its component, falling back to its default button only when the field is empty (`cta={page.hero.cta ?? bookCta}`). Otherwise the editor offers fields that do nothing. Applied to `how-booking-works`.
- **`src/lib/cms-schemas.check.ts`** makes `astro check` fail if a schema's output no longer fits its component's props. It caught one real mismatch while being written (BeforeAfter photos use `alt`, not `label`); tested by breaking a schema on purpose.
- **`npm run check-cms`** (`scripts/check-cms-config.mjs`) fails if a content file has a key `.pages.yml` does not describe, misses a required field, uses an unknown block or select value, or `.pages.yml` names a missing component or file. Tested with injected keys.
- **CI** (`.github/workflows/ci.yml`) on pushes to `staging`, `main` and `feature/**`, and on PRs: `check-cms`, then `npm run build` (type check plus every content file validated). Brand lint runs **report only** until the 63 existing blockers are dealt with (Phase 5 decision).
- `yaml` is now a direct dev dependency (the lint and the config check import it).
- **Deferred to Phase 2:** collections for site settings, towns, regions, team and reviews. Astro warns about collections with no files, so each is added with its first content.

## Phase 2 results (7 Oct 2026)

- **73 content files**: 15 in `src/content/site/`, one per town in `src/content/towns/` (56), one per region page in `src/content/regions/` (2). Values were extracted by bundling and running the old `src/data/*.ts` modules, not retyped. All 112 pages match the baseline.
- **Every `src/data/*.ts` module keeps its exports, names and types**, so no page changed. Each now validates its YAML with Zod through `src/lib/cms-data.ts` (synchronous: the YAML is bundled as text, because these modules are imported at the top of every page and cannot await). The logic stays in TypeScript: menu filtering, the town menu, neighbour clusters, guards, JSON-LD builders.
- **Decisions that lived in comments are now fields**, because Pages CMS deletes comments on save: 24 menu items and rows carry `hidden: true`, 22 rows keep the URL they will get plus a `note` (built but unlinked, or no page yet; the forensic and hoarder notes carry the licensing warning for editors), and the two comparison rows code looks up carry a read-only `id`.
- **`hidden: true`, not `linked: false`.** Pages CMS saves an unticked checkbox as false, so a `linked` flag would have unlinked every menu row the first time an editor saved the menu. Every boolean in the config is now one where missing and unticked mean the same safe thing.
- **Developer-only on purpose:** the 56 town names and their neighbour clusters (a new town also needs a photo, a cluster and a page), the region labels (sent verbatim to Monday.com by the contact form), URLs of the guides, premises and team pages (checked against their TypeScript unions, so a typo fails the build), the contact form's endpoint and fields.
- **Editable:** contact details (now also feeding the three JSON-LD builders, so they cannot disagree with the footer), site-wide buttons, menus, trust bar, brand lines, comparison table, contact form copy and service options (with the Monday.com warning), the "who is in my home" card, Google reviews (with the verbatim rules), the five cross-link lists, live towns, region photos, each town's photo, local paragraph and neighbours, and the region pages' copy.
- **End-to-end test:** changing the phone in `site/contact.yaml` changed all 112 pages; unhiding "Window cleaning" put it in the menu on all 112. Both reverted.
- **Brand lint:** same 63 blockers; em-dash warnings 248 to 224, all 24 from trailing code comments removed with the old menu rows. No copy was lost.
- `npm run check-cms` now checks collections file by file and multi-select fields (74 files agree).
- **Still in pages, for Phase 3:** several pages build their own LocalBusiness object with the phone and email typed in (e.g. `house-cleaning.astro`). They move to the shared contact details when each page is migrated.

## Phase 3 results (7 Oct 2026)

- **Every page is migrated**: 60 page files plus the shared copy of the 56 town pages and the two region pages. 129 content files in total, all reachable from the editor. All 112 built pages are identical to the pre-migration baseline; brand lint unchanged (63 blockers, 233 warnings); no code comment was lost (each batch checked every original comment line still exists).
- **How:** House cleaning (hub) was migrated by hand as the reference, then six agents worked in parallel git worktrees (`C:\w\a` to `f`, short paths because long asset paths exceed Windows' 260-character limit), one commit per page, each checked against the baseline before committing.
- **`.pages.yml` merging:** a union merge driver interleaved two branches' entries mid-entry. It was removed; branches were merged by parsing both files and appending new entries to their group. Two entry names clashed (`contact`, `reviews`) and were renamed. `npm run check-cms` now also fails on a content file with no editor entry and on duplicate entry names.
- **Patterns the batches introduced (reuse them for new pages):**
  - A page-wide button label (`ctaLabel`, `buttonLabel`, `applyCta`) where a page repeats one main button: editors set its text once; the link still comes from Site settings > Site-wide buttons. Card buttons that equalled it are left empty and fall back in code.
  - Tables that use the shared comparison rows edit only their framing (heading, lead, corner label, footnote); the rows stay under Site settings > Comparison table.
  - Template placeholders in single braces (`{town}`, `{region}`, `{state}`, `{townCount}`...), filled by the page and rejected at build time if misspelt. The region template lives in `src/content/site/region-page.yaml` because files under `pages/` must have `seo`.
  - Copy gated behind an unconfirmed fact stays in code with its flag (deep-cleaning's pricing section and `pricingConfirmed`, mould-removal's NSW Health paragraph and `healthSourceApproved`).
  - Removing image imports from between component imports can reorder a page's CSS (Astro orders styles partly by import position). Put the new imports where the removed ones were; the comparison script catches it.
- **Phase 4 work the batches identified (editor friendliness, no visible change):**
  1. Shared components for blocks now defined inline on many pages: comparison framing for shared rows, "Where we clean" with an optional subheading, a link list with an icon per row, a hero without a photo, the "related" links block, the page-wide button label.
  2. `iconGrid` and `imageCards` lack the section-level button ServiceBlocks supports; `note` (and `iconGrid`'s per-item button and link) are offered where those variants never show them.
  3. A way to show a literal "Yes"/"No" in a comparison cell.
  4. ContactForm's `lead={null}` ("no lead") cannot be expressed in the editor.
  5. Some content files store `/contact/` literally (some pathway-card buttons, the Airbnb page's "Talk to us" buttons and pills), so they will not follow the site-wide quote button if its address changes.
  6. Site settings > Menus labels the services description "(homepage only)", but it also shows on the locations hub, town and region pages.
- **Content issues found but deliberately not fixed** (each batch report lists more; most are already flagged in the pages' own notes): visible `[CONFIRM]`, `[TBC]`, `[insured]` and `[police-checked]` brackets on several pages (including a literal "[CONFIRM]" plus a dash in the region FAQ that the lint misses); meta descriptions that promise more than their pages (end of lease, mould, gutter, blind, carpet, oven, tile, roof, school); Title Case FAQ headings on seven commercial pages; five commercial pages still on the NSW-only town list and ten whose business details say NSW only while listing Queensland towns; Why TLB's hero and cards still render placeholder boxes; several stale code comments.

## Phase 4 results (8 Oct 2026)

All six items Phase 3 listed are done. Every change was to the editor or the schemas only: all 112 pages still build identically, and every content file still matches its form.

1. **Shared components.** Ten new components replace 62 blocks that were defined inline page after page: `comparisonFraming`, `comparisonFramingWho`, `comparisonOwnRows`, `townBand` (subheading optional), `townBandOwnSubheading`, `townBandSharedSubheading`, `relatedLinks`, `relatedLinksWithExtras`, `iconLinkList`, `heroNoPhoto`. Each reference keeps its page's own label and description, which is where every page-specific warning sat. `.pages.yml` is about 400 lines shorter. The page-wide button labels (`ctaLabel`, `buttonLabel`) stay inline on purpose: each describes where that page uses its button.
2. **ServiceBlocks forms match what each variant shows.** Icon grid: icon, tag, title and description per item, plus the button under the grid, which 28 grids had fixed in code and now fall back to (`cta={page.x.cta ?? pageCta}`). It no longer offers a note or per-item buttons and links it never shows. Photo cards no longer offer a note. Only the link list draws one.
3. **Literal Yes or No in a table.** A cell typed in quotation marks (`"No"`) shows the word instead of a tick or cross. Mould removal keeps its own all-text table, which its editor description explains.
4. **The contact form's intro can be hidden** ("Hide the intro sentence"). An empty intro still means the site-wide one.
5. **`quote` and `book` link keywords.** Editors can type `quote` or `book` instead of a URL to use the site-wide quote or booking button's address. The 18 content links that were built from `quoteCta.href` now use `quote`, so they follow that button again (tested by changing it). The five genuine contact-page links stay `/contact/`: the menu's "Contact us", 404's "Contact us", the commercial hub's "Talk to our team", NDIS's "Talk to us" and Work with us's "Talk to Teagan and the team".
6. **Menus label corrected.** The services description shows on the homepage, the locations hub and the town and region pages.

**Not done, needing you:**
- **Staging link in each entry's description** (original Phase 4 item 7): needs the staging site's URL.
- **Default photo folder per page** (original item 6): an image field's default folder is set on the shared `image` component, so it cannot differ per page. Editors browse `src/assets` by folder.
- **Pages CMS behaviour still unconfirmed:** saving the Menus file without changes (checkbox handling), choosing and uploading photos, an uppercase `.JPG`, and emptying an optional field.

---

## 10. Checklist

- [ ] Phase 0: Pages CMS installed and round-trips text (done); photos, emptied fields, `.JPG` uploads still to test
- [x] Phase 1: section schemas, CMS components, helpers, brand lint on YAML, output diff script, CI
- [x] Phase 2: Site settings, reviews, team, towns, regions, locations moved
- [x] Phase 3a: Home, hubs, Contact, About
- [x] Phase 3b: Remaining top-level pages
- [x] Phase 3c: 16 house cleaning service pages
- [x] Phase 3d: 15 commercial service pages
- [x] Phase 3e: Guides
- [x] Phase 3f: Locations templates
- [x] Phase 4: Sidebar groups, labels, descriptions, locks, validation, shared components (staging links and per-page photo folders not done, see Phase 4 results)
- [ ] Phase 5: Publish action, image size check, commit identity, branch protection
- [ ] Phase 6: Editors invited, EDITING-GUIDE.md, walkthrough done
- [ ] Phase 7: Dead code removed, README and SECTIONS.md updated
