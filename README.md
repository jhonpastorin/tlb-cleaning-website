# MNO website template — library, not a site

This repo is a **component library and reference**, not a deployed brand
site. It never ships to a public URL as-is. Its job is to be the shared
basis that new brand sites get scaffolded from and that pages get built
against.

## The split

- **The library (lives here, stays brand-agnostic):**
  `src/components/ui/`, `src/components/sections/`, the semantic layer of
  `src/styles/tokens.css`, `SECTIONS.md` (the living inventory — read it
  before adding anything), and `design-refs/` (wireframes each section
  variant was built from).
- **A brand instance (built *from* this library, lives in its own repo):**
  a real site's `tokens.css` values, its content (`src/content/`, read through
  `src/data/*.ts` and `src/lib/`), `src/pages/`, and image assets. The current Maple disability-support build living in
  this repo is a worked example, not a template you edit in place — treat
  new brands as separate repos forked from this one, not new folders here.

## Content and Pages CMS

Every page's copy and photos, and the site-wide content (menus, contact
details, trust bar, reviews, towns), live in YAML files under `src/content/`
and are edited in Pages CMS (https://app.pagescms.org). `PAGES-CMS-PLAN.md`
has the full design and history; `EDITING-GUIDE.md` is the guide for editors.

- **`src/content/pages/<path>.yaml`**: one file per page. The page's `.astro`
  file owns the layout and reads its content with `getPage()` (`src/lib/cms.ts`),
  validating it against the section schemas in `src/lib/cms-schemas.ts`.
- **`src/content/site/`, `towns/`, `regions/`**: site-wide content, read
  synchronously by the modules in `src/data/` through `src/lib/cms-data.ts`.
  Those modules keep their exports, so pages import them as before.
- **`.pages.yml`**: the editor. One `components:` entry per section schema,
  one `content:` entry per file, in sidebar groups.
- **Images** stay in `src/assets/`. Content files store `/src/assets/...`
  paths and `cmsImage()` resolves them, so Astro still optimises every photo.
- **Notes for developers stay in the `.astro` and `.ts` files**, never in
  YAML: Pages CMS rewrites a YAML file when it saves it and drops comments.

Checks (all run in CI on every push, including Pages CMS saves):

| Command | Fails when |
| --- | --- |
| `npm run build` | a content file does not fit its page's schema, or a schema no longer fits its component (`astro check` runs `src/lib/cms-schemas.check.ts`) |
| `npm run check-cms` | a content file has fields the editor cannot reach, no editor entry at all, or `.pages.yml` names something missing |
| `npm run brand-lint` | report only in CI; the publish workflow refuses changes that add blockers |
| `npm run compare-build` | the built HTML differs from a baseline in `dist-before/` (used when moving content without changing output) |

Editors save to `staging`; the **Publish to live site** button in Pages CMS
(`.github/workflows/publish-live.yml`, GitHub users only) merges staging into
`main` after the same checks.

**Adding a page:** build it as usual, put its copy in
`src/content/pages/<path>.yaml`, read it with `getPage()` using the section
schemas (pass every content field through to its component), and add its
entry to `.pages.yml`. `PAGES-CMS-PLAN.md` section 5 has the recipe.

## Why nothing here is "viewable"

Astro only turns `src/pages/**` into servable routes. Everything else —
components, data, docs, `design-refs/` — is source material read at build
time and never gets a route of its own, regardless of where in the repo it
lives. That's what keeps this a library instead of a site.

## Search engine indexing — read before any production deploy

Indexing is controlled by one environment variable, `SITE_ENV`, read in
`src/data/site-env.ts`. **It fails closed:** a build is only indexable when
`SITE_ENV` is exactly `production`. Anything else — unset, misspelt, `prod` —
gets `noindex, nofollow` on every page and a `Disallow: /` robots.txt.

| `SITE_ENV` | Robots meta tag | `robots.txt` |
| --- | --- | --- |
| `production` | none | `Allow: /` |
| anything else, or unset | `noindex, nofollow` | `Disallow: /` |

This is deliberate. An indexed staging copy competes with the real site under
the client's own brand and takes weeks to clear, so a forgotten variable
protects staging rather than leaking it.

The trade is that a production deploy which forgets the variable ships blocked.
**Every build prints one line saying which mode it produced** — check it:

```
[SEO] robots: NOINDEX (SITE_ENV=undefined)
[SEO] robots: INDEXABLE (SITE_ENV=production)
```

Set `SITE_ENV=production` in the host's build environment for the production
site, and leave it unset (or `staging`) everywhere else. See `.env.example`.

Two things this does **not** cover, both outside the repo: host-level
protection such as an `X-Robots-Tag` header or HTTP auth on staging, and the
`site` value in `astro.config.mjs`, which is hard-coded to the production
domain — so staging pages canonicalise to production. That is harmless while
`noindex` is present, but it is the reason the noindex matters.

## The contact form — read before any production deploy

`/contact/` carries an enquiry form that POSTs to a **Zapier** catch hook,
which creates the item in TLB's Monday.com board. **No backend was
added to this project** — it is still a static build. That is the whole reason
the integration goes through a webhook: a Monday API token in a static page
would be readable in view-source and would grant access to every board in the
account. The token lives in the Zapier connection instead.

Nothing in the site is Zapier-specific — it posts standard form-encoded data
to whatever URL this variable holds, so Make.com or any other receiver is a
change of that one value.

It is controlled by one environment variable, `PUBLIC_ENQUIRY_WEBHOOK_URL`,
read in `src/data/contactForm.ts`, and **it fails closed in the same spirit as
`SITE_ENV`:**

| `PUBLIC_ENQUIRY_WEBHOOK_URL` | What the form does |
| --- | --- |
| set | submits, and shows the thank-you only on a `2xx` |
| unset | renders, but refuses to submit and says it is not connected |

The rule it exists to enforce is that **the form must never report success it
did not get**. A form that shows a thank-you and drops the enquiry is worse
than no form, which is why `contact.astro` shipped without one for three days.

As with indexing, **every build prints one line saying which mode it
produced** — check it next to the `[SEO]` line:

```
[FORM] contact form endpoint: NOT SET (PUBLIC_ENQUIRY_WEBHOOK_URL) — …
[FORM] contact form endpoint: CONFIGURED
```

Point staging at a **different** webhook from production, or at none, so a
staging test cannot drop a fake lead into the live pipeline. `render.yaml`
declares the variable on both services with `sync: false`, so the value is set
per service in the Render dashboard and is never committed.

Full setup — the Monday board's columns, the Zap, the field-by-field mapping
and a test checklist — is in `MONDAY-FORM-SETUP.md`.

## Adding a new section variant

1. A wireframe gets dropped in `design-refs/wireframes/<section>/<variant>.png`
   (see `design-refs/README.md` for the naming convention).
2. Extend the existing component with a new `variant` value — don't fork a
   new file. `SECTIONS.md` calls out where this is already anticipated
   (e.g. `Hero.astro`'s `split-mosaic` today, `centered` as a likely next
   variant).
3. Document the variant in `SECTIONS.md`'s table for that component.
4. If the variant shows different CONTENT (a new field, or fewer fields),
   update the section's schema in `src/lib/cms-schemas.ts` and its matching
   component in `.pages.yml` together, so editors are offered exactly what
   the variant shows. `npm run build` checks the schema against the
   component's props (`src/lib/cms-schemas.check.ts`).

## Starting a new brand site

Fork/scaffold a new repo from this one, then replace only:
`tokens.css`'s Layer 1 values, `src/data/*.ts` content, `src/pages/`
composition, and image assets. Nothing in `src/components/` should need to
change — if it does, the gap belongs back in this template, not patched
locally in the brand repo.
