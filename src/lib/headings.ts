// Section heading levels, set by the heading's own words.
//
// A section heading stays an <h2> when it names the service (any form of
// "clean": clean, cleans, cleaning, cleaner) or is one of the listed
// exceptions below: the two shared trust sections, and service headings
// whose service name has no "clean" in it. Every other section heading is an
// <h3>, and the headings inside that section drop with it to <h4>, so the
// outline never skips a level inside a section.
//
// Only the tag follows this rule, never the look: section components pair
// `Heading` with the `.title-2` class and `Subheading` with `.title-3`
// (global.css), so a demoted heading renders exactly as it did as an <h2>.
const KEEP_AS_H2 = ['how tlb compares', 'what our clients say', 'types of mould removal services'];

export function keepsH2(text: string): boolean {
  const normalised = text.replace(/\s+/g, ' ').trim().toLowerCase();
  return /\bclean(s|ing|ers?)?\b/.test(normalised) || KEEP_AS_H2.includes(normalised);
}

// A section with no heading of its own (`text` undefined) continues the
// section above it, so its subheadings keep their <h3>.
export function sectionHeadingTags(text: string | undefined) {
  return text === undefined || keepsH2(text)
    ? ({ Heading: 'h2', Subheading: 'h3' } as const)
    : ({ Heading: 'h3', Subheading: 'h4' } as const);
}
