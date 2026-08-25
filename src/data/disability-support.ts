// All copy for the Disability Support Services page lives here, typed and
// separated from markup. index.astro imports these objects and passes them
// as props — no literal content strings live inside any component.
//
// Sourced from: a direct read of design-refs/maple-disability-support.png,
// cross-checked against the brand's own exported page content (Hero, "About
// Maple" story blocks, "Trusted NDIS Registered Specialists" stats, the
// three-persona partner cards, and the disabilities tag list all matched
// verbatim). Where the reference was cut off or illegible — the video
// feature's exact caption, testimonial names/quotes, footer copy — a
// plausible line was written in the same plain, warm, second-person
// Australian register. See SECTIONS.md and the final build summary for the
// full list.

import type { ImageMetadata } from 'astro';
import type { LocalBusinessInfo } from '../layouts/Base.astro';

// Real hero photography. Statically imported so Astro's build-time image
// pipeline can resize/compress/re-encode them — see Placeholder.astro's
// optional `src` prop, which is what actually renders these.
import familyPortrait from '../assets/hero/family-portrait.png';
import participantAndSupportWorker from '../assets/hero/participant-and-support-worker.png';
import planManagementOffice from '../assets/hero/plan-management-office.png';
import planManagementSupport from '../assets/hero/plan-management-support.png';

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

// ---- Page meta -----------------------------------------------------------

export const pageMeta = {
  title: 'Disability Support Services | Maple Community Services',
  description:
    'NDIS support tailored to your goals and what matters most to you. Maple Community Services is a family-owned, registered NDIS provider delivering disability support across Australia.',
  canonical: 'https://maplecommunity.com.au/disability-support',
};

export const business: LocalBusinessInfo = {
  name: 'Maple Community Services',
  url: 'https://maplecommunity.com.au',
  logo: 'https://maplecommunity.com.au/logo.png',
  telephone: '1300 123 456',
  email: 'hello@maplecommunity.com.au',
  address: {
    streetAddress: 'Level 1, 100 Support Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU',
  },
  sameAs: [],
  areaServed: 'Australia',
  description:
    'NDIS registered disability support provider delivering Core Supports, Supported Independent Living, NDIS Plan Management and Support Coordination across Australia.',
};

// ---- SiteHeader -----------------------------------------------------------

export const header = {
  logo: { label: 'Maple Community Services logo' },
  primaryNav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '#about', hasDropdown: true },
    { label: 'Referrals', href: '#referrals' },
    { label: 'The AFL', href: '#the-afl', hasDropdown: true },
    { label: 'Careers', href: '#careers' },
    { label: 'News', href: '#news' },
  ] satisfies NavItem[],
  cta: { label: 'Contact Us', href: '#contact' } satisfies ButtonData,
  serviceNav: [
    { label: 'Disability Support', href: '#disability-support', hasDropdown: true },
    { label: 'Core Supports', href: '#core-supports', hasDropdown: true },
    { label: 'Supported Independent Living', href: '#supported-independent-living', hasDropdown: true },
    { label: 'NDIS Plan Management', href: '#ndis-plan-management' },
    { label: 'Support Coordination', href: '#support-coordination' },
  ] satisfies NavItem[],
};

// ---- Hero -------------------------------------------------------------

export const hero = {
  headingLines: ['Disability Support', 'Services'],
  lead: 'NDIS support tailored to your goals and what matters most to you.',
  cta: { label: 'Why choose Maple?', href: '#why-choose-maple', variant: 'inverse' } satisfies ButtonData,
  badges: [
    { ratio: '3/2', label: 'Google Reviews rating badge' },
    { ratio: '3/2', label: 'Registered NDIS Provider badge' },
  ] satisfies ImageBlock[],
  images: [
    { ratio: '16/9', label: 'Support worker with a young NDIS participant at the park', span: 'wide', src: participantAndSupportWorker },
    { ratio: '1/1', label: 'Family smiling together at home', src: familyPortrait },
    { ratio: '3/4', label: 'Support coordinator reviewing an individual support plan', offset: true, src: planManagementOffice },
    { ratio: '3/4', label: 'Maple Community Services team member speaking to camera', src: planManagementSupport },
  ] satisfies MosaicImage[],
};

// ---- StoryMosaic: About Maple (dark) --------------------------------------

export const aboutMaple = {
  theme: 'dark' as const,
  blocks: [
    {
      type: 'image',
      ratio: '4/3',
      label: 'Maple support workers and participants group photo outdoors',
    },
    {
      type: 'text',
      body: [
        'At Maple Community Services, we provide high-quality Disability Support Services designed around your needs.',
        "As a family-owned business, we're built on values you can trust. We strive to create strong, inclusive communities where you can enjoy the friendship of Support Workers, Support Coordinators, the wider community, and others living with disability.",
      ],
    },
    {
      type: 'text',
      body: [
        "At Maple, we've helped people build more independence and live the life they want. Whether you or your loved one has mental or physical health needs, complex disabilities, or is navigating additional life challenges, you can rely on our team's experience and support.",
        'With fast referral turnaround times and the ability to respond quickly when urgent support is needed, Maple is here when it matters most.',
      ],
    },
    {
      type: 'image',
      ratio: '4/3',
      label: 'Group of Maple participants and support workers at a community event',
    },
  ] satisfies StoryBlock[],
};

// ---- StatBand ---------------------------------------------------------

export const statBand = {
  heading: 'Trusted NDIS Registered Specialists',
  stats: [
    { icon: 'group' as const, value: '10,000+', caption: 'Happy participants supported' },
    { icon: 'heart' as const, value: '10+ Years', caption: 'Delivering NDIS Services' },
    { icon: 'language' as const, value: '50+', caption: 'Languages spoken to make you feel at home' },
    { icon: 'house' as const, value: '24/7', caption: 'Support and same day booking' },
  ],
  buttons: [
    { label: 'Submit a Referral', href: '#referral', variant: 'inverse-accent' },
    { label: 'Not Quite Ready?', href: '#learn-more', variant: 'surface' },
  ] satisfies ButtonData[],
};

// ---- VideoFeature -------------------------------------------------------

export const videoFeature = {
  headingLines: ['Why choose Maple for', 'Disability Support Services'],
  video: {
    label: 'Client testimonial video — support worker at home',
    caption: 'Top of the Leaderboard!',
  },
};

// ---- PathwayCards -------------------------------------------------------

export const pathwayCards = {
  heading: "Everyone's NDIS journey looks different.",
  headingAccent: 'Find yours.',
  cards: [
    {
      number: 1,
      image: { ratio: '4/3', label: 'NDIS participant giving a thumbs up at home' },
      title: 'I am an NDIS Participant',
      description: 'I want independence, choice, and a team that knows my name',
      cta: { label: 'Find My Perfect Support Match', href: '#enquire', variant: 'brand' },
    },
    {
      number: 2,
      image: { ratio: '4/3', label: 'Support worker helping a family member with paperwork' },
      title: 'Family/Carer',
      description: 'I need a trusted partner to share the load and provide peace of mind',
      cta: { label: 'Discover Peace of Mind', href: '#enquire', variant: 'brand' },
    },
    {
      number: 3,
      image: { ratio: '4/3', label: 'Support coordinator meeting with a group of participants' },
      title: 'Support Coordinator',
      description: 'I need a responsive partner for everyday support and complex, high-need referrals',
      cta: { label: 'Find the Partner Your Clients Deserve', href: '#enquire', variant: 'brand' },
    },
  ] satisfies {
    number: number;
    image: ImageBlock;
    title: string;
    description: string;
    cta: ButtonData;
  }[],
};

// ---- AudienceCollage: reuses StoryMosaic (light) --------------------------

export const audienceCollage = {
  theme: 'light' as const,
  heading: 'Who Can We Help?',
  blocks: [
    {
      type: 'text',
      body: [
        'At Maple Community Services, we provide high-quality Disability Support Services designed around your needs.',
        "As a family-owned business, we're built on values you can trust. We strive to create strong, inclusive communities where you can enjoy the friendship of Support Workers, Support Coordinators, the wider community, and others living with disability.",
      ],
    },
    {
      type: 'image',
      ratio: '4/3',
      label: 'Two support workers high-fiving on a bushwalk with a participant',
    },
    {
      type: 'image',
      ratio: '4/3',
      label: 'Support worker fist-bumping a participant wearing a high-vis vest',
    },
    {
      type: 'text',
      body: [
        "At Maple, we've helped people build more independence and live the life they want. Whether you or your loved one has mental or physical health needs, complex disabilities, or is navigating additional life challenges, you can rely on our team's experience and support.",
        'With fast referral turnaround times and the ability to respond quickly when urgent support is needed, Maple is here when it matters most.',
      ],
    },
  ] satisfies StoryBlock[],
  cta: { label: 'Connect With Us', href: '#contact', variant: 'brand' } satisfies ButtonData,
};

// ---- TagCloud -----------------------------------------------------------

export const tagCloud = {
  heading: 'Disabilities We Support',
  subheading: 'Our team has experience working across:',
  tags: [
    { label: 'Albinism' },
    { label: 'Brain Injury and Stroke' },
    { label: 'Visual Impairment' },
    { label: "Parkinson's Disease" },
    { label: 'Arthritis and Rheumatoid Arthritis' },
    { label: 'Cerebral Palsy' },
    { label: "Huntington's Disease" },
    { label: 'Physical Impairments' },
    { label: 'Autism' },
    { label: 'Down Syndrome' },
    { label: 'Motor Neurone Disease' },
    { label: 'PTSD' },
    { label: 'Anxiety and Depression' },
    { label: 'Genetic Conditions' },
    { label: 'Multiple Sclerosis' },
    { label: 'Spinal Injuries' },
    { label: 'Bipolar Disorder' },
    { label: 'Hearing Impairment' },
    { label: 'Muscular Dystrophy' },
    { label: 'Others', isHighlighted: true },
  ] satisfies { label: string; href?: string; isHighlighted?: boolean }[],
  note: ['And many more conditions supported', 'under the NDIS.'],
};

// ---- TestimonialCarousel --------------------------------------------------

export const testimonials = {
  heading: 'What our Clients Are Saying',
  items: [
    {
      quote: "They're nice, they're friendly, they love service for us.",
      name: 'Chris',
      role: 'Participant',
      rating: 5,
      avatar: { ratio: '1/1', label: 'Chris, NDIS participant, headshot' },
    },
    {
      quote: 'They actually listen to me and support me in a way that feels right for my needs.',
      name: 'Terry',
      role: 'Participant',
      rating: 5,
      avatar: { ratio: '1/1', label: 'Terry, NDIS participant, headshot' },
    },
    {
      quote: "They're always considerate. Some are very talented in providing everything that I need.",
      name: 'Amanda',
      role: 'Participant',
      rating: 5,
      avatar: { ratio: '1/1', label: 'Amanda, NDIS participant, headshot' },
    },
  ] satisfies {
    quote: string;
    name: string;
    role: string;
    rating: number;
    avatar: ImageBlock;
  }[],
};

// ---- SiteFooter -----------------------------------------------------------

export const footer = {
  logo: { label: 'Maple Community Services logo' },
  columns: [
    {
      title: 'Services',
      links: [
        { label: 'Disability Support', href: '#disability-support' },
        { label: 'Core Supports', href: '#core-supports' },
        { label: 'Supported Independent Living', href: '#supported-independent-living' },
        { label: 'NDIS Plan Management', href: '#ndis-plan-management' },
        { label: 'Support Coordination', href: '#support-coordination' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'News', href: '#news' },
        { label: 'Referrals', href: '#referrals' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'The AFL', href: '#the-afl' },
        { label: 'FAQs', href: '#faqs' },
        { label: 'Contact Us', href: '#contact' },
      ],
    },
  ] satisfies { title: string; links: NavItem[] }[],
  contact: {
    phone: '1300 123 456',
    email: 'hello@maplecommunity.com.au',
    address: 'Sydney, NSW, Australia',
  },
  registration: 'Maple Community Services is a Registered NDIS Provider.',
  copyright: '© 2026 Maple Community Services. All rights reserved.',
};
