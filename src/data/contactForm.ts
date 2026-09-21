// The contact form's options, copy and endpoint — everything about the form
// that is a CONTENT decision rather than markup. ContactForm.astro reads this
// and nothing else; the component stays brand-agnostic the way every other
// section in this library is.
//
// ⚠️ THE FORM IS THE FIRST THING ON THIS SITE THAT CAN LOSE AN ENQUIRY.
// contact.astro's own header spent four paragraphs explaining why it shipped
// WITHOUT a form: "there is no form handler, no endpoint and no backend in
// this project — a form that posted nowhere would silently swallow enquiries,
// which is the worst failure this page could have." That reasoning has not
// been repealed, it has been ANSWERED: the form now posts to an off-site
// webhook (a Zapier catch hook), which creates the item in the Monday.com
// board. See MONDAY-FORM-SETUP.md for the board columns, the scenario and the
// field-by-field mapping.
//
// The one rule that replaces the old "no form" rule: THE FORM MUST NEVER
// REPORT SUCCESS IT DID NOT GET. `enquiryEndpoint` below is empty until a real
// webhook URL is set, the build says so out loud, and the client-side script
// refuses to submit rather than showing a thank-you that means nothing.
import { locationGroups } from './locations';

/**
 * The webhook the browser POSTs to. Set PUBLIC_ENQUIRY_WEBHOOK_URL in the
 * host's build environment (Render, the static site, Environment).
 *
 * PUBLIC_ prefixed, and named so nobody is misled: the URL is inlined into the
 * page's HTML and is therefore visible to anyone who views source. That is
 * fine for a Zapier catch hook — the URL is unguessable and receives
 * data, it does not hand any out — but it is emphatically NOT a place for a
 * Monday.com API token. The token lives in the Zapier connection, on
 * their side of the wire, and never reaches this repo or the browser. That is
 * the whole reason the integration goes through a webhook rather than calling
 * Monday's GraphQL API from the page.
 */
export const enquiryEndpoint: string = import.meta.env.PUBLIC_ENQUIRY_WEBHOOK_URL ?? '';

// Same spirit as site-env.ts: one line per build, so a missing variable
// announces itself in the deploy log instead of passing silently and being
// discovered by a customer whose enquiry went nowhere.
console.log(
  enquiryEndpoint
    ? '[FORM] contact form endpoint: CONFIGURED'
    : '[FORM] contact form endpoint: NOT SET (PUBLIC_ENQUIRY_WEBHOOK_URL) — the form renders but refuses to submit',
);

export interface SelectOption {
  /** Submitted value. Must match the Monday.com dropdown label EXACTLY — see MONDAY-FORM-SETUP.md. */
  value: string;
  /** What the reader sees. Same as `value` unless there is a reason to differ. */
  label?: string;
}

/**
 * Type of service — eight broad categories plus an escape hatch.
 *
 * DELIBERATELY BROAD. The mega-menu carries around 40 individual services and
 * this list is not it: a dropdown a reader has to scroll is a dropdown they
 * abandon, and the free-text message is where the specific job gets described.
 * Each row below maps onto a GROUP of menu items rather than a single page:
 *
 *   Regular Home Cleaning        -> the ongoing / one-off domestic clean
 *   Deep Cleaning                -> /house-cleaning/deep-cleaning/
 *   End of Lease / Bond Cleaning -> /house-cleaning/end-of-lease-cleaning/
 *   Airbnb & Holiday Let         -> airbnb-cleaning + real-estate-cleaning
 *   Carpet, Upholstery & Floors  -> the menu's whole "Appliances" column
 *   Outside Home & Exterior      -> the menu's whole "Outside your home" column
 *   NDIS & Assisted Living       -> ndis-cleaning + the unbuilt seniors page
 *   Commercial Cleaning          -> the entire Commercial menu, all 15 pages
 *
 * "Something else" is not padding. Four services are advertised in the menu
 * with no page yet (forensic, hoarder, deceased estate, seniors), and a reader
 * who wants one of those has nothing else to pick. A dropdown with no escape
 * hatch turns those enquiries into bounces.
 *
 * ⚠️ CHANGING A LABEL HERE IS A TWO-PLACE EDIT. These strings are submitted
 * verbatim, and Monday.com's dropdown column silently drops a label it does
 * not already have, so the board's column must be updated in the same sitting.
 */
export const serviceOptions: SelectOption[] = [
  { value: 'Regular Home Cleaning' },
  { value: 'Deep Cleaning' },
  { value: 'End of Lease / Bond Cleaning' },
  { value: 'Airbnb & Holiday Let Turnovers' },
  { value: 'Carpet, Upholstery & Floors' },
  { value: 'Outside Home & Exterior Washing' },
  { value: 'NDIS & Assisted Living' },
  { value: 'Commercial Cleaning' },
  { value: 'Something else' },
];

/**
 * Service area — the three regions, DERIVED rather than retyped.
 *
 * `locationGroups` is the list the mega-menu, the locations hub and all 47
 * "Where we clean" bands already render, and locations.ts is explicit that its
 * labels are "the client's exact wording, state suffix included". Reading it
 * here means the form cannot start naming regions the rest of the site does
 * not, which is precisely the drift that file was created to end.
 *
 * "Somewhere else" is appended for the same reason the service list has one:
 * an out-of-area enquiry is still worth receiving, and it is worth KNOWING it
 * was out of area rather than having the reader pick the nearest wrong region.
 */
export const areaOptions: SelectOption[] = [
  ...locationGroups.map((group) => ({ value: group.label })),
  { value: 'Somewhere else' },
];

/**
 * Every field the form submits, in one place, because three things have to
 * agree about them and only one of those three lives in this repo: the markup
 * here, the Zapier mapping, and the Monday.com column.
 * MONDAY-FORM-SETUP.md is written against this list — add a field here and it
 * has to be added there too, or the enquiry arrives with a blank column.
 *
 * ⚠️ ONLY FOUR OF THESE ARE REQUIRED on the form: `firstName`, `email`,
 * `phone` and `service` (the client's call, 21 Sep 2026). `lastName`, `area`
 * and `message` can all arrive empty, and `area` is the one that stings —
 * it is the field that routes an enquiry to a region. Every key is still
 * SENT on every submission, as an empty string rather than being omitted, so
 * the scenario's mapping never breaks on a missing field.
 *
 * Which fields carry `required` is set in ContactForm.astro, not here, since
 * it is a property of the input rather than of the content.
 */
export const enquiryFields = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'service',
  'area',
  'message',
  // Context the reader does not type. `sourcePage` is the page the form was
  // submitted from — it lives on /contact/ today, but the component is
  // reusable and a service page is the obvious next home for it.
  'sourcePage',
  'submittedAt',
] as const;

export type EnquiryField = (typeof enquiryFields)[number];

/** Copy for the form itself. Out of the component so a rewrite is a content edit. */
export const enquiryCopy = {
  heading: 'Send us the details',
  lead:
    'Tell us where you are and what needs doing, and we will come back with a price and a day. The fields marked with an asterisk are the ones we cannot do without.',
  submitLabel: 'Send enquiry',
  submittingLabel: 'Sending…',
  successHeading: 'Thanks — that is with us.',
  successBody:
    'Your enquiry has been received and a person will read it. If it is urgent, calling is still faster than waiting on a reply.',
  // Shown when the POST fails. Deliberately does NOT say "try again": a failed
  // fetch can mean the webhook received the enquiry and only the reply got
  // lost, so inviting a retry invites a duplicate. It points at the two
  // channels that cannot fail instead.
  errorHeading: 'That did not send.',
  errorBody:
    'Something went wrong between this page and our inbox. Rather than sending it twice, call or email us and we will pick it up from there.',
  // Shown instead of the above when no endpoint is configured at all. Says the
  // true thing rather than blaming the network.
  unconfiguredHeading: 'This form is not connected yet.',
  unconfiguredBody:
    'Nothing was sent, so please call or email instead — those reach us today.',
} as const;
