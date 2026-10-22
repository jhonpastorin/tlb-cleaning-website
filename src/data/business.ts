// The LocalBusiness JSON-LD a page hands Base.astro.
//
// Thirty-five pages each typed this object out with the phone and email
// literally in it. The phone and email now come from "Contact details" in
// Pages CMS (src/content/site/contact.yaml) via navigation.ts, so the
// structured data Google reads cannot disagree with the footer a reader sees.
//
// ⚠️ Since the Oct 2026 schema review, `localBusiness()` only reaches Google
// on pages that do not pass Base.astro a `schema` (the guide articles, the 404
// and /thank-you/). Everywhere else Base renders the page's graph from
// schema.ts instead, and this object only supplies og:site_name. So a page's
// `areaServed` string here is no longer what Google reads for that page: the
// schema sheet puts all three regions on every service, commercial and NDIS
// included, where these strings stop the commercial and NDIS pages at the
// NSW border.
//
// Everything else is the business's identity and is the same on every page,
// so it lives here once. guides.ts, meetTheTeam.ts and premises.ts call this
// too rather than keeping their own copies.
//
// IDENTITY, from TLB's Google Business Profile (client, 12 Oct 2026). These
// must match the profile exactly; if the profile changes, change this.
//  - NAME is the profile's name, "TLB Cleaning Services". The site's visible
//    branding says "TLB Cleaning" and the logo says "TLB Professional Cleaning
//    Services"; both are listed in alternateName so Google treats all three as
//    one business.
//  - ADDRESS IS HIDDEN on the profile (service-area business, the client's
//    call), so only the state and country are given here. Do not add a street
//    address unless the profile starts showing one.
//  - HOURS are Monday to Friday, 9am to 5pm.
//
// schema.ts builds every page's structured data from `businessIdentity`; the
// alias "TLB", the NSW region and the Maps link below came in with the
// reviewed schema sheet (Oct 2026).
import type { LocalBusinessInfo } from '../layouts/Base.astro';
import { schemaTelephone, contactEmail, socialProfileUrls } from './navigation';

const siteUrl = 'https://tlbcleaning.com.au/';

// The profile's permanent Google Maps address, for `sameAs`. Deliberately not
// the share.google short link the reviews slider uses (Pages CMS > Reviews):
// that one is a redirect, and `sameAs` should name the profile itself.
const googleMapsProfileUrl = 'https://maps.google.com/?cid=361122503233941092';

export const businessIdentity = {
  name: 'TLB Cleaning Services',
  alternateName: ['TLB Cleaning', 'TLB', 'TLB Professional Cleaning Services'],
  url: siteUrl,
  // public/logo.png: the stacked logo from src/assets/logo, 800px wide. Served
  // from public/ so it has a fixed URL; Astro-processed assets are hashed.
  logo: new URL('logo.png', siteUrl).href,
  telephone: schemaTelephone,
  email: contactEmail,
  address: { addressRegion: 'NSW', addressCountry: 'AU' },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  // The Google Business Profile, then the social profiles (Pages CMS > Contact
  // details), the same list the footer icons are drawn from.
  sameAs: [googleMapsProfileUrl, ...socialProfileUrls],
};

export const localBusiness = ({
  description,
  areaServed,
}: {
  description: string;
  areaServed: string;
}): LocalBusinessInfo => ({
  ...businessIdentity,
  areaServed,
  description,
});
