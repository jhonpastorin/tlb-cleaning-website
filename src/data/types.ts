// Shared prop types for src/components/sections/*.astro. Kept separate from
// any one page's content data (see e.g. a page's own data/<page-name>.ts)
// so the component library itself has zero dependency on brand-specific
// content — only on these structural shapes.
import type { ImageMetadata } from 'astro';

export interface NavItem {
  label: string;
  /** Omit to render the item as something other than a link. Same convention
   *  MegaMenuChild already uses for a page that is not live yet; here it also
   *  covers a `phoneCta` whose number is still a placeholder. */
  href?: string;
  hasDropdown?: boolean;
  /** Render this item as a CTA button rather than a plain nav link. Used for
   *  the header's phone number, which sits in the nav row but reads as a call
   *  to action. With no `href` the Button primitive renders a <button>, so a
   *  placeholder never ships as a dead link or a fake dialable number. */
  phoneCta?: boolean;
  /** The email's twin of `phoneCta`, rendered as the second pill in the same
   *  header contact block. A separate flag rather than one shared "isCta"
   *  because SiteHeader draws a different icon for each and needs to tell
   *  them apart; `find` on a shared flag would also only ever return one. */
  emailCta?: boolean;
}

/** One row inside a mega-menu column.
 *
 *  `href` is OPTIONAL here, which is the one way this differs from NavItem,
 *  and the reason this type exists rather than reusing it. A row with no
 *  href renders as plain text instead of a link — SiteHeader picks the tag
 *  the same way TagCloud already does (`const Tag = href ? 'a' : 'span'`),
 *  so the row keeps its place in the menu, in its group, in the same order,
 *  and simply stops being clickable.
 *
 *  That is deliberately a per-ROW switch, and it is NOT the same tool as
 *  navigation.ts' `hiddenNavLabels`, which takes a row out of the menu
 *  altogether. Unlink when the page should still be advertised but not
 *  visited yet; hide when it should not be mentioned at all.
 *
 *  Optionality stops here on purpose. NavItem still requires `href`, so the
 *  primary nav, the footer and every other consumer are unchanged and cannot
 *  accidentally ship a nav row that goes nowhere. */
export interface MegaMenuChild {
  label: string;
  href?: string;
}

/** One grouped column inside a mega-menu panel — e.g. "Inside your home"
 *  with its list of pages. `label` is a grouping heading only, not a page:
 *  it has no `href` and never renders as a link. Omit `label` entirely for
 *  an ungrouped flat list of items within the panel. */
export interface MegaMenuGroup {
  label?: string;
  items: MegaMenuChild[];
}

/** A Level-A nav item that also has Level-B children, rendered as a
 *  dropdown/mega-menu panel (desktop: hover/click panel; mobile: a native
 *  <details> accordion) instead of NavItem's old decorative-only
 *  `hasDropdown` chevron. The item's own `href` still points at its own
 *  real page — the mega-menu is additive, not a replacement destination. */
export interface MegaMenuNavItem extends NavItem {
  megaMenu?: MegaMenuGroup[];
}

export interface ImageBlock {
  ratio: string;
  label: string;
  /** Statically-imported photo. Omit to render the dashed placeholder box instead. */
  src?: ImageMetadata;
}

export interface MosaicImage extends ImageBlock {
  span?: 'wide' | 'normal';
  offset?: boolean;
}

// ⚠️ `src` was MISSING from the image variant until the thirteen "by type of
// premises" pages were built, and its absence was invisible: a caller passing
// `src` got no error (excess-property checking doesn't fire on a
// const-inferred array handed to a prop — the same gotcha TagCloud's
// `isHighlighted` note in SECTIONS.md describes) and StoryMosaic silently
// dropped it, so four pages shipped seven dashed placeholder boxes with real
// photos sitting unused in src/assets/. Optional, matching ImageBlock: omit
// it and the slot correctly renders the reserved dashed box, which is still
// the right state for index.astro's team photo (no real one exists, and
// IMAGE-GUIDELINES §7 forbids generating one).
export type StoryBlock =
  | { type: 'text'; body: string[] }
  | { type: 'image'; ratio: string; label: string; src?: ImageMetadata };

export interface ButtonData {
  label: string;
  href: string;
  variant?: 'brand' | 'inverse' | 'inverse-accent' | 'surface';
}
