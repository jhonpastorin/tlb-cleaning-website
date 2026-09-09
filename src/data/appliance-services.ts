// The six "Appliances" services from the Home Cleaning mega-menu
// (navigation.ts), in menu order, plus the helper each of their pages uses to
// link the other five.
//
// WHY THIS IS SHARED. Six pages need the same cluster of links, and this
// group has NO HUB PAGE of its own — unlike /commercial-cleaning/, which is a
// real page its fifteen children can point at. There is nothing above these
// six, so the only thing holding the cluster together is that each page links
// its siblings. Six hand-typed copies of the same list is six chances for it
// to drift, which is the exact failure locations.ts and comparison.ts were
// extracted to stop. Two real consumers is this codebase's bar for sharing;
// this has six.
//
// ⚠️ Every href is a flat kebab-case guess from its menu label, per
// navigation.ts' own convention, and unconfirmed sitewide. They are duplicated
// from navigation.ts rather than derived from it, because navigation.ts nests
// them inside a mega-menu group whose shape is about layout, not about which
// services exist. If the slugs change, both files change.
//
// ⚠️ "Appliances" is the MENU's word for this group and it is a poor one: four
// of the six are not appliances at all. A rug, a lounge, a mattress and a
// grout line are soft furnishings and surfaces. Nothing in these pages calls
// the group "appliances" to a reader for that reason — they refer to each
// other by name instead. Worth renaming the menu group; flagged, not done,
// because the label came from the IA sheet.
export interface ApplianceService {
  /** Menu label, used verbatim as pill and link text. */
  label: string;
  href: string;
  /** One line for the group's cross-link section. Written for a homeowner. */
  blurb: string;
}

export const applianceServices: ApplianceService[] = [
  {
    label: 'Carpet and rug cleaning',
    href: '/carpet-and-rug-cleaning/',
    blurb: 'Hot water extraction for carpet, and the gentler treatment a wool rug needs.',
  },
  {
    label: 'Upholstery and lounge cleaning',
    href: '/upholstery-and-lounge-cleaning/',
    blurb: 'Fabric lounges, armchairs and dining chairs, cleaned to the fabric code on the label.',
  },
  {
    label: 'Mattress cleaning',
    href: '/mattress-cleaning/',
    blurb: 'A dry-ish clean for the one thing in the house nobody ever washes.',
  },
  {
    label: 'Tile and grout cleaning',
    href: '/tile-and-grout-cleaning/',
    blurb: 'Bathroom and kitchen grout brought back, and sealed so it stays back longer.',
  },
  {
    label: 'Oven, BBQ and appliance cleaning',
    href: '/oven-bbq-and-appliance-cleaning/',
    blurb: 'Ovens stripped and soaked part by part, barbecues degreased, fridges done out.',
  },
  {
    label: 'Blinds, shutters and ceiling fans',
    href: '/blinds-shutters-and-ceiling-fans/',
    blurb: 'The dusty things above eye level that a regular clean never has time for.',
  },
];

/** Every service except the one whose page is asking. */
export const otherApplianceServices = (ownHref: string): ApplianceService[] =>
  applianceServices.filter((service) => service.href !== ownHref);
