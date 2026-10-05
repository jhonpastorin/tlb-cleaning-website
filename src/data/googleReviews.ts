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

/** Public Google Business Profile (Maps) URL. null until the profile exists. */
export const googleBusinessProfileUrl: string | null = null;

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
export const googleReviews: GoogleReview[] = [
  {
    author: 'Serena Sandstrom',
    rating: 5,
    text: 'Fantastic personalised service, individual needs accommodated. Excellent team.',
    date: '2026-10',
    reviewUrl: 'https://share.google/shxBcHuY0gUUtpYDV',
  },
  {
    author: 'Christine Stephens',
    rating: 5,
    text:
      'I can’t recommend Teagan and her team highly enough! They are absolutely fabulous. From the moment they walk through the door, they are professional, friendly, reliable and incredibly thorough.\n\n' +
      'They leave my home looking and feeling amazing every single time. It’s such a relief knowing I can trust Teagan and her team to take care of everything, and they always go that extra mile.\n\n' +
      'If you’re looking for a cleaner who genuinely cares about the quality of their work, look no further. Teagan and her team are fantastic, and I wouldn’t want anyone else.',
    date: '2026-10',
    reviewUrl: 'https://share.google/HpuYcWmFuEGToSRIr',
  },
  {
    author: 'Grace Donaldson',
    rating: 5,
    text: "Teagan is a bright spark of a human, who is caring, kind and considerate. She brings these qualities to everything she does, and it's a pleasure to experience such authenticity in my interactions with her. She is meticulous when it comes to cleaning, running her business, and respects the people and property she tends to.",
    date: '2026-10',
    reviewUrl: 'https://share.google/jPPz8bQQNqUCdltJ0',
  },
  {
    author: 'A A',
    rating: 5,
    text: 'Teagan and her team are just fantastic. I have been getting fortnightly cleans done for almost a year. Great service, professional and very kind. Will be utilising their services for a long time.',
    date: '2026-09',
    reviewUrl: 'https://share.google/mJx6CjEnI6DAiEKUZ',
  },
  {
    author: 'James Matthews',
    rating: 5,
    text: "We've got an Airbnb up in the Northern Rivers hinterland, about an hour from home, and finding cleaners we could actually rely on out there was a nightmare. We went through a few before we found Teagan and the TLB team, and honestly we haven't looked back. Teagan works straight off our bookings, restocks everything and sends us a quick update after each clean. We don't have to chase a thing. When you can't just pop over and check on the place, that's worth a lot. Can't recommend them enough.",
    date: '2026-09',
    reviewUrl: 'https://share.google/gcqpDGaF5MxvwmyCK',
    topics: ['airbnb'],
  },
];

/** Every review, with the ones tagged `topic` moved to the front. Order is otherwise kept (newest first). */
export function reviewsFeaturing(topic: ReviewTopic): GoogleReview[] {
  const isMatch = (review: GoogleReview) => review.topics?.includes(topic) ?? false;
  return [...googleReviews.filter(isMatch), ...googleReviews.filter((review) => !isMatch(review))];
}
