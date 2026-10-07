// Content schemas for the section components, used by pages through getPage()
// (src/lib/cms.ts). One schema per section, mirroring the matching entry under
// `components:` in .pages.yml. Change both together.
//
// A schema covers CONTENT only: words, photos, alt text, links. Design props
// (variant, theme, ratio, tone, columns) stay in the page's .astro file, so an
// editor can change what a section says but not how it looks.
import { z } from 'astro/zod';
import type { TextBlockBody } from '../components/sections/TextBlock.astro';
import { cmsImage, resolveTokens } from './cms';

/** Plain text, with {{tokens}} resolved. */
export const text = z.string().transform(resolveTokens);

/** An optional field. Pages CMS may save an emptied field as null or ''. */
export const optional = <T extends z.ZodTypeAny>(schema: T) =>
  z
    .union([schema, z.null(), z.literal('')])
    .optional()
    .transform((value) => (value === null || value === '' ? undefined : value) as z.output<T> | undefined);

/** A list of paragraphs. */
export const paragraphs = z.array(text).min(1);

/** A photo plus its alt text. Comes out as { label, src }, so a page spreads
 *  it into an ImageBlock and adds the ratio, which is layout: `{ ...img, ratio: '4/3' }`.
 *  `src` may be left empty to show the reserved-slot placeholder box. */
export const image = z
  .object({
    src: optional(z.string().startsWith('/src/assets/', 'Image must be inside src/assets').transform(cmsImage)),
    alt: z.string().min(1, 'Describe the photo (alt text)'),
  })
  .transform(({ src, alt }) => ({ label: alt, src }));

/** A photo that must be set, for slots that cannot fall back to the
 *  placeholder box (a Backdrop, for one, needs a real image). */
export const requiredImage = z
  .object({
    src: z.string().startsWith('/src/assets/', 'Image must be inside src/assets').transform(cmsImage),
    alt: z.string().min(1, 'Describe the photo (alt text)'),
  })
  .transform(({ src, alt }) => ({ label: alt, src }));

// The caps are hard limits that sit above every title and description the
// site shipped with (longest: 80 and 197 characters). The lengths Google
// actually shows, about 60 and 155, are guidance in .pages.yml, not errors,
// because 60 titles and 74 descriptions were already past them when this
// was written and an editor must still be able to save those pages.
export const seo = z.object({
  title: z.string().min(1).max(90, 'Keep the page title under 90 characters (aim for 60)'),
  description: z.string().min(1).max(200, 'Keep the meta description under 200 characters (aim for 155)'),
});

export const link = z.object({
  label: text,
  href: z.string().regex(/^(\/|https:\/\/|tel:|mailto:|#)/, 'Links start with /, https://, tel:, mailto: or #'),
});

/** TextBlock's body: paragraphs, bullet lists and subheadings in any order.
 *  Stored as Pages CMS blocks (blockKey `type`), mapped back to TextBlockBody. */
export const textBody = z
  .array(
    z.discriminatedUnion('type', [
      z.object({ type: z.literal('paragraph'), text }),
      z.object({ type: z.literal('list'), items: z.array(text).min(1), ordered: optional(z.boolean()) }),
      z.object({ type: z.literal('subheading'), text }),
    ]),
  )
  .min(1)
  .transform((items) =>
    items.map((item): TextBlockBody => {
      if (item.type === 'paragraph') return item.text;
      if (item.type === 'subheading') return { subheading: item.text };
      return item.ordered ? { list: item.items, ordered: true } : { list: item.items };
    }),
  );

// ---------------------------------------------------------------- sections

export const hero = z.object({
  kicker: optional(text),
  headingLines: z.array(text).min(1),
  lead: text,
  image,
});

export const textBlock = z.object({
  heading: optional(text),
  body: textBody,
});

/** PhotoGallery, `story` variant. */
export const storySteps = z.object({
  heading: optional(text),
  lead: optional(text),
  steps: z
    .array(
      z.object({
        step: optional(text),
        heading: text,
        body: paragraphs,
        image,
      }),
    )
    .min(1),
});

/** ContentGrid made of text cells. */
export const textGrid = z.object({
  heading: optional(text),
  lead: optional(text),
  items: z.array(z.object({ heading: optional(text), body: paragraphs })).min(1),
});

export const callout = z.object({
  heading: optional(text),
  body: paragraphs,
});

/** ServiceBlocks `list` variant: a title, a sentence and a link per row. */
export const linkList = z.object({
  heading: text,
  lead: optional(text),
  items: z
    .array(
      z.object({
        title: text,
        description: text,
        href: z.string().regex(/^(\/|https:\/\/)/, 'Links start with / or https://'),
      }),
    )
    .min(1),
});

/** A section heading and lead whose items come from code or site data. */
export const sectionIntro = z.object({
  heading: text,
  lead: optional(text),
});

/** TagCloud. The towns come from site data, not from the page. */
export const tagCloud = z.object({
  heading: text,
  subheading: text,
  note: paragraphs,
});

export const faq = z.object({
  heading: optional(text),
  items: z.array(z.object({ question: text, answer: text })).min(1),
});

export const callToAction = z.object({
  kicker: optional(text),
  heading: text,
  lead: optional(text),
});
