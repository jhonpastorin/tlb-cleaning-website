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
// ⚠️ Logo and address are still empty, inherited verbatim from every page.
// They are real facts TLB holds and neither is in the repo. One fix here fills
// every page that uses this.
import type { LocalBusinessInfo } from '../layouts/Base.astro';
import { schemaTelephone, contactEmail } from './navigation';

export const localBusiness = ({
  description,
  areaServed,
  sameAs = [],
}: {
  description: string;
  areaServed: string;
  sameAs?: string[];
}): LocalBusinessInfo => ({
  name: 'TLB Cleaning',
  url: 'https://tlbcleaning.com.au/',
  logo: '',
  telephone: schemaTelephone,
  email: contactEmail,
  address: {
    streetAddress: '',
    addressLocality: '',
    addressRegion: '',
    postalCode: '',
    addressCountry: 'AU',
  },
  sameAs,
  areaServed,
  description,
});
