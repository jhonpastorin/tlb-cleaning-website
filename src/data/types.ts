// Shared prop types for src/components/sections/*.astro. Kept separate from
// any one page's content data (see e.g. a page's own data/<page-name>.ts)
// so the component library itself has zero dependency on brand-specific
// content — only on these structural shapes.
import type { ImageMetadata } from 'astro';

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

/** One grouped column inside a mega-menu panel — e.g. "Inside your home"
 *  with its list of pages. `label` is a grouping heading only, not a page:
 *  it has no `href` and never renders as a link. Omit `label` entirely for
 *  an ungrouped flat list of items within the panel. */
export interface MegaMenuGroup {
  label?: string;
  items: NavItem[];
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

export type StoryBlock =
  | { type: 'text'; body: string[] }
  | { type: 'image'; ratio: string; label: string };

export interface ButtonData {
  label: string;
  href: string;
  variant?: 'brand' | 'inverse' | 'inverse-accent' | 'surface';
}
