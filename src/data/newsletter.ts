// The footer's newsletter signup: one email field, posted to a Zapier catch
// hook. Same wiring as the enquiry form (contactForm.ts), and the same rule:
// THE FORM MUST NEVER REPORT SUCCESS IT DID NOT GET. With no endpoint set, the
// field still renders but refuses to submit and says so.
//
// THE COPY LIVES IN PAGES CMS ("Site settings > Newsletter signup",
// src/content/site/newsletter.yaml). The endpoint and the field list stay
// here: they are wiring, not content. See NEWSLETTER-FORM-SETUP.md.
import { z } from 'astro/zod';
import { loadData } from '../lib/cms-data';

export const newsletterCopy = loadData(
  'site/newsletter',
  z.object({
    placeholder: z.string().min(1),
    submitLabel: z.string().min(1),
    submittingLabel: z.string().min(1),
    successMessage: z.string().min(1),
    errorMessage: z.string().min(1),
    unconfiguredMessage: z.string().min(1),
  }),
);

/**
 * The webhook the browser POSTs to. Set PUBLIC_NEWSLETTER_WEBHOOK_URL in the
 * host's build environment (Render, the static site, Environment).
 *
 * Its own variable, not PUBLIC_ENQUIRY_WEBHOOK_URL: a signup is not an
 * enquiry, and sharing the enquiry hook would drop every subscriber into the
 * Monday.com board as a blank lead. Like that one, it is inlined into the
 * page's HTML, which is fine for a catch hook and never fine for an API key.
 */
export const newsletterEndpoint: string = import.meta.env.PUBLIC_NEWSLETTER_WEBHOOK_URL ?? '';

console.log(
  newsletterEndpoint
    ? '[FORM] newsletter endpoint: CONFIGURED'
    : '[FORM] newsletter endpoint: NOT SET (PUBLIC_NEWSLETTER_WEBHOOK_URL), the field renders but refuses to submit',
);

/**
 * Every field the signup submits. The Zap's mapping is built against these
 * names, so renaming one breaks it. `sourcePage` and `submittedAt` are filled
 * in by the footer's script, not typed by the reader.
 */
export const newsletterFields = ['email', 'sourcePage', 'submittedAt'] as const;
