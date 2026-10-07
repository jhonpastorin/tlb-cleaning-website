// Compile-time check that each schema in cms-schemas.ts produces what its
// component accepts. Nothing here runs: `astro check` (part of `npm run build`)
// fails if a component's props change in a way a schema no longer fits.
//
// Each line reads "a schema's output, after the page adds its layout props,
// is assignable to these props of the component". Images are checked minus
// their ratio, which pages add with sized().
import type { ComponentProps } from 'astro/types';
import type { z } from 'astro/zod';
import type BeforeAfter from '../components/sections/BeforeAfter.astro';
import type Callout from '../components/sections/Callout.astro';
import type CallToAction from '../components/sections/CallToAction.astro';
import type CardCarousel from '../components/sections/CardCarousel.astro';
import type ComparisonTable from '../components/sections/ComparisonTable.astro';
import type ContactForm from '../components/sections/ContactForm.astro';
import type ContentGrid from '../components/sections/ContentGrid.astro';
import type Faq from '../components/sections/Faq.astro';
import type GoogleReviewSlider from '../components/sections/GoogleReviewSlider.astro';
import type Hero from '../components/sections/Hero.astro';
import type ImageBand from '../components/sections/ImageBand.astro';
import type LogoBar from '../components/sections/LogoBar.astro';
import type MetricsBlock from '../components/sections/MetricsBlock.astro';
import type PathwayCards from '../components/sections/PathwayCards.astro';
import type PhotoGallery from '../components/sections/PhotoGallery.astro';
import type ServiceBlocks from '../components/sections/ServiceBlocks.astro';
import type StoryMosaic from '../components/sections/StoryMosaic.astro';
import type TagCloud from '../components/sections/TagCloud.astro';
import type TextBlock from '../components/sections/TextBlock.astro';
import type VideoFeature from '../components/sections/VideoFeature.astro';
import type * as s from './cms-schemas';

type Out<T extends z.ZodTypeAny> = z.output<T>;
type Item<T> = T extends readonly (infer U)[] ? U : never;
/** Swap every `{ label, src }` image for an ImageBlock with a ratio, the way
 *  pages do with sized(). */
type Sized<T> = T extends { label: string; src?: unknown }
  ? T & { ratio: string }
  : T extends readonly (infer U)[]
    ? Sized<U>[]
    : T extends object
      ? { [K in keyof T]: Sized<T[K]> }
      : T;

/** Fails to compile unless A is assignable to B. */
type Fits<A extends B, B> = A;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props<C extends (args: any) => any> = ComponentProps<C>;

export type Checks = [
  Fits<Sized<Omit<Out<typeof s.hero>, 'cta'>>, Partial<Props<typeof Hero>>>,
  Fits<Sized<Omit<Out<typeof s.heroCollage>, 'cta'>>, Partial<Props<typeof Hero>>>,
  Fits<NonNullable<Out<typeof s.hero>['cta']>, Props<typeof Hero>['cta']>,
  Fits<Omit<Out<typeof s.textBlock>, 'cta'>, Partial<Props<typeof TextBlock>>>,
  Fits<Out<typeof s.textBlock>['cta'], Props<typeof TextBlock>['cta']>,
  Fits<Sized<Out<typeof s.pathwayCards>>['cards'], Omit<Item<Props<typeof PathwayCards>['cards']>, 'number'>[]>,
  Fits<Out<typeof s.linkList>['items'], Props<typeof ServiceBlocks>['items']>,
  Fits<Out<typeof s.iconGrid>['items'], Props<typeof ServiceBlocks>['items']>,
  Fits<Sized<Out<typeof s.imageCards>['items']>, Props<typeof ServiceBlocks>['items']>,
  Fits<Omit<Out<typeof s.imageCards>, 'items'>, Partial<Props<typeof ServiceBlocks>>>,
  Fits<Sized<Out<typeof s.storySteps>['steps']>, NonNullable<Props<typeof PhotoGallery>['steps']>>,
  Fits<Out<typeof s.comparisonTable>['rows'], Props<typeof ComparisonTable>['rows']>,
  Fits<Out<typeof s.comparisonTable>['columns'], Props<typeof ComparisonTable>['columns']>,
  Fits<Omit<Out<typeof s.comparisonTable>, 'columns' | 'rows'>, Partial<Props<typeof ComparisonTable>>>,
  Fits<Out<typeof s.beforeAfter>, Props<typeof BeforeAfter>>,
  Fits<Out<typeof s.tagCloud>, Props<typeof TagCloud>>,
  Fits<Out<typeof s.faq>, Props<typeof Faq>>,
  Fits<Out<typeof s.callout>, Props<typeof Callout>>,
  Fits<Omit<Out<typeof s.callToAction>, 'cta'>, Partial<Props<typeof CallToAction>>>,
  Fits<Out<typeof s.sectionHeading>, Partial<Props<typeof GoogleReviewSlider>>>,
  Fits<Sized<Out<typeof s.imageBand>['image']>, Pick<Props<typeof ImageBand>, 'label' | 'src'>>,
  Fits<Out<typeof s.imageBand>['caption'], Props<typeof ImageBand>['caption']>,
  Fits<Out<typeof s.videoFeature>, Props<typeof VideoFeature>>,
  Fits<Out<typeof s.contactForm>, Partial<Props<typeof ContactForm>>>,
  Fits<Sized<Out<typeof s.cardCarousel>>, Props<typeof CardCarousel>>,
  Fits<Sized<Out<typeof s.metricsBlock>>, Props<typeof MetricsBlock>>,
  Fits<Sized<Out<typeof s.logoBar>>, Props<typeof LogoBar>>,
  Fits<Out<typeof s.textGrid>, Omit<Props<typeof ContentGrid>, 'blocks'>>,
  Fits<Out<typeof s.storyMosaic>['cta'], Props<typeof StoryMosaic>['cta']>,
];
