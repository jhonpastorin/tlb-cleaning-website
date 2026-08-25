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
