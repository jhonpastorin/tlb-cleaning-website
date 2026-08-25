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
  a real site's `tokens.css` values, `src/data/*.ts` content, `src/pages/`,
  and image assets. The current Maple disability-support build living in
  this repo is a worked example, not a template you edit in place — treat
  new brands as separate repos forked from this one, not new folders here.

## Why nothing here is "viewable"

Astro only turns `src/pages/**` into servable routes. Everything else —
components, data, docs, `design-refs/` — is source material read at build
time and never gets a route of its own, regardless of where in the repo it
lives. That's what keeps this a library instead of a site.

## Adding a new section variant

1. A wireframe gets dropped in `design-refs/wireframes/<section>/<variant>.png`
   (see `design-refs/README.md` for the naming convention).
2. Extend the existing component with a new `variant` value — don't fork a
   new file. `SECTIONS.md` calls out where this is already anticipated
   (e.g. `Hero.astro`'s `split-mosaic` today, `centered` as a likely next
   variant).
3. Document the variant in `SECTIONS.md`'s table for that component.

## Starting a new brand site

Fork/scaffold a new repo from this one, then replace only:
`tokens.css`'s Layer 1 values, `src/data/*.ts` content, `src/pages/`
composition, and image assets. Nothing in `src/components/` should need to
change — if it does, the gap belongs back in this template, not patched
locally in the brand repo.
