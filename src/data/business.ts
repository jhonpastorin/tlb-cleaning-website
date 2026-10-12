// The LocalBusiness JSON-LD a page hands Base.astro.
//
// Thirty-five pages each typed this object out with the phone and email
// literally in it. The phone and email now come from "Contact details" in
// Pages CMS (src/content/site/contact.yaml) via navigation.ts, so the
// structured data Google reads cannot disagree with the footer a reader sees.
//
// `areaServed` stays a per-page argument on purpose. The pages make different,
// deliberate claims (the commercial and NDIS pages stop at the NSW border, the
// guides name both states), and each page's own notes say why.
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
//    call), so only the country is given here. Do not add a street address
//    unless the profile starts showing one.
//  - HOURS are Monday to Friday, 9am to 5pm.
import type { LocalBusinessInfo } from '../layouts/Base.astro';
import { schemaTelephone, contactEmail, socialProfileUrls } from './navigation';
import { googleBusinessProfileUrl } from './googleReviews';

const siteUrl = 'https://tlbcleaning.com.au/';

export const localBusiness = ({
  description,
  areaServed,
}: {
  description: string;
  areaServed: string;
}): LocalBusinessInfo => ({
  name: 'TLB Cleaning Services',
  alternateName: ['TLB Cleaning', 'TLB Professional Cleaning Services'],
  url: siteUrl,
  // public/logo.png: the stacked logo from src/assets/logo, 800px wide. Served
  // from public/ so it has a fixed URL; Astro-processed assets are hashed.
  logo: new URL('logo.png', siteUrl).href,
  telephone: schemaTelephone,
  email: contactEmail,
  address: { addressCountry: 'AU' },
  openingHours: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  // The Google Business Profile (Pages CMS > Reviews) and the social profiles
  // (Pages CMS > Contact details), the same list the footer icons are drawn from.
  sameAs: [...(googleBusinessProfileUrl ? [googleBusinessProfileUrl] : []), ...socialProfileUrls],
  areaServed,
  description,
});
