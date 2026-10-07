// Google reviews: the one place real client reviews enter the site.
//
// The homepage's "What our clients say" slider (GoogleReviewSlider) reads
// from here. No API key, no widget, no third-party script: reviews are
// copied in by hand from TLB's Google Business Profile, and appear on the
// next build.
//
// THE RULES, same footing as src/pages/reviews.astro (brand foundation
// §3.6.3, and the ACCC's line on fake or edited reviews):
//  1. VERBATIM. Copy the text exactly as it appears on Google: spelling,
//     punctuation and all. Never trim, merge, paraphrase or "tidy" a review.
//  2. REAL AND ON GOOGLE. Every entry must be a review that is live on TLB's
//     Google Business Profile. Nothing from email, text or word of mouth goes
//     in this file; those are testimonials, and need their own permission.
//  3. AUTHOR AS GOOGLE SHOWS IT. Use the display name exactly as shown
//     (often first name + initial). Never the reviewer's profile photo: the
//     card falls back to the TLB monogram on purpose.
//  4. NO STAR AVERAGE, NO REVIEW COUNT, NO aggregateRating SCHEMA. Choosing
//     which reviews to show is fine; stating a figure from a hand-picked set
//     is not. Google also ignores self-published review markup for stars.
//  5. If a review is removed or edited on Google, remove or update it here.
//
// When the profile is live, set `googleBusinessProfileUrl` too: it adds the
// "Read all our reviews on Google" link under the slider and the profile
// to the homepage's LocalBusiness `sameAs`.

// THE VALUES LIVE IN PAGES CMS ("Reviews", src/content/site/reviews.yaml), and
// the rules above bind whoever adds one there. Paste the text exactly; Pages
// CMS keeps the reviewer's paragraph breaks.
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';

const reviewsData = loadData(
  'site/reviews',
  z.object({
    profileUrl: z.string().url().nullish(),
    reviews: z.array(
      z.object({
        author: z.string().min(1),
        rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
        text: z.string().min(1),
        date: z.string().regex(/^\d{4}-\d{2}$/, 'Month as YYYY-MM, e.g. 2026-10'),
        reviewUrl: z.string().url().nullish().transform((v) => v ?? undefined),
        topics: z.array(z.enum(['airbnb'])).nullish().transform((v) => v ?? undefined),
      }),
    ),
  }),
);

/** Public Google Business Profile (Maps) URL. null until the profile exists. */
export const googleBusinessProfileUrl: string | null = reviewsData.profileUrl ?? null;

export interface GoogleReview {
  /** Display name exactly as Google shows it, e.g. "Sarah M." */
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Full review text, verbatim. Keep the reviewer's paragraph breaks as \n\n. */
  text: string;
  /** Month posted, 'YYYY-MM'. */
  date: string;
  /** The review's own share link from Google, if copied. */
  reviewUrl?: string;
  /** Services the review is about, so that service's page can lead with it. */
  topics?: ReviewTopic[];
}

/** Add a topic here when a review clearly speaks to one service page. */
export type ReviewTopic = 'airbnb';

// Newest first. Transcribed from the profile on 6 Oct 2026; months worked
// back from Google's "x days ago" on that date. The "Great price" /
// "Reasonable price" highlight tags some reviewers picked are not part of
// the review text and are left out.
export const googleReviews: GoogleReview[] = reviewsData.reviews.map((review) => {
  const { reviewUrl, topics, ...rest } = review;
  return { ...rest, ...(reviewUrl ? { reviewUrl } : {}), ...(topics ? { topics } : {}) };
});

/** Every review, with the ones tagged `topic` moved to the front. Order is otherwise kept (newest first). */
export function reviewsFeaturing(topic: ReviewTopic): GoogleReview[] {
  const isMatch = (review: GoogleReview) => review.topics?.includes(topic) ?? false;
  return [...googleReviews.filter(isMatch), ...googleReviews.filter((review) => !isMatch(review))];
}
