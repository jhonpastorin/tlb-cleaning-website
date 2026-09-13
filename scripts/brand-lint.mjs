// Brand Foundation v2.0 lint.
//
// Checks the mechanically checkable rules from
// "TLB Cleaning - Brand Foundation v2.0.md". It cannot judge tone, and it is
// not a substitute for reading a page — it exists so the rules that ARE
// mechanical (a banned word, an em dash, an unfilled bracket) stop being
// found by a human six months later.
//
// Run:  node scripts/brand-lint.mjs
//       node scripts/brand-lint.mjs --all      (include comment lines)
//
// Exit code 1 if any BLOCKER fires, so it can gate a build. WARN rules report
// but do not fail, because they are the ones with legitimate exceptions.
//
// Source comments are skipped by default. That is deliberate: several files
// quote the old banned copy in a "✅ RESOLVED — this used to say X" note, and
// flagging those would train people to delete the explanation.

import { readFileSync } from 'node:fs';
import { globSync } from 'node:fs';

const ALL = process.argv.includes('--all');

/** @type {{id:string, level:'BLOCKER'|'WARN', rule:string, re:RegExp, note:string, allow?:RegExp}[]} */
const RULES = [
  {
    id: 'headcount',
    level: 'BLOCKER',
    rule: '§2.4 Never claim the team is employed full-time, and do not state a headcount',
    re: /\b(nine|9)\s+(full[- ]time|employed|local)?\s*(cleaners|staff|team members)\b|\bfull[- ]time\s+(cleaners|team|staff)\b/gi,
    note: '"It is not accurate and it has been removed from all page copy."',
  },
  {
    id: 'mums',
    level: 'BLOCKER',
    rule: '§9.3 No "local mums" or "team of local mothers" in positioning copy',
    re: /\b(local\s+mums?|our\s+mums?|team\s+of\s+local\s+mothers?|mother[- ]led)\b/gi,
    note: '§2.2 allows the founder story on /about/, the team section, social and recruitment only.',
    // "your mum or dad" is about the READER's parent, not the workforce.
    allow: /\b(your|their|his|her|a)\s+mum\b|\bmum\s+(or|and)\s+dad\b|\bMum's\b/i,
  },
  {
    id: 'price-words',
    level: 'BLOCKER',
    rule: '§3.2 Never use cheap, budget, affordable, competitive rates or premium',
    re: /\b(cheap|cheaper|cheapest|budget|affordable|affordability|competitive rates?|premium)\b/gi,
    note: 'The position is certainty, not a price point. "Cost effective" is fine WITH a reason attached.',
    // "Budget" as a NOUN meaning a sum of money a business allocates is
    // ordinary English, not the price-positioning word §3.2 bans (as in
    // "budget cleaning"). A strata committee's common area budget and a
    // factory's operations budget are facts about the reader's world.
    allow: /\b(an?|the|their|your|its|different|facilities|operations|cleaning|maintenance|capital|common area)\s+budget\b|\bbudget(ing|ed)\s+for\b|\bbudgets\b/i,
  },
  {
    id: 'guarantee',
    level: 'BLOCKER',
    rule: '§2.4 / §12.2 Never claim a bond-back or satisfaction guarantee',
    re: /\b(bond[- ]back guarantee|satisfaction guarantee|guarantee your bond|we guarantee)\b/gi,
    note: 'Stating that TLB does NOT offer one is fine and appears deliberately on several pages.',
    // Explaining what a competitor's guarantee badge actually means, and
    // saying plainly that TLB does not advertise one, is the honest position
    // §12.2 asks for. Only a CLAIM to offer one is the breach.
    allow: /do not advertise|does not offer|not a bond guarantee|worth understanding what is usually behind|no cleaner can promise|Confirm/i,
  },
  {
    id: 'brackets-copy',
    level: 'BLOCKER',
    rule: 'Unresolved [bracket] inside a publishable SENTENCE',
    re: /\[(?:insured|police[- ]checked[^\]]*|CONFIRM[^\]]*)\]/gi,
    note: '§2.4 and §11.7 leave these open. They render to the public as literal square brackets.',
  },
  {
    id: 'brackets-placeholder',
    level: 'WARN',
    rule: 'Placeholder slot awaiting real content ([TBC ...])',
    re: /\[TB[CD][^\]]*\]/gi,
    note: 'Known pre-launch state: testimonial and figure slots holding a briefing note. §12.1 is the collection brief.',
  },
  {
    id: 'exclamation',
    level: 'BLOCKER',
    rule: '§9.2 No exclamation marks',
    re: /[a-z]!["'`]/g,
    note: '',
  },
  {
    id: 'em-dash',
    level: 'WARN',
    rule: '§9.2 No em dashes. Use commas, full stops or brackets',
    re: /—/g,
    note: 'Largest single count on the site. Not auto-fixable: each one wants a different replacement.',
  },
  {
    id: 'banned-adjectives',
    level: 'WARN',
    rule: '§5.6 Language that fails: sparkling, spotless, transform your home',
    re: /\b(sparkling|spotless|transform your home|your time is precious)\b/gi,
    note: 'Legitimate when quoting the standard a tenancy is NOT held to, or stating what TLB is not selling.',
  },
  {
    id: 'competitor-prose',
    level: 'WARN',
    rule: '§9.4 Comparisons live in a table, never in body copy',
    re: /\b(roster of strangers|anonymous contractors?|call centre|unlike the (big )?franchises?|you have to choose|nobody turns up)\b/gi,
    note: 'Naming a competitor MODEL factually (e.g. in a table row, or "TLB is not a franchise") is allowed.',
  },
];

const files = globSync('src/**/*.{astro,ts}', { withFileTypes: false });

let blockers = 0;
let warns = 0;
/** @type {Map<string, {file:string,line:number,text:string}[]>} */
const hits = new Map();

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!ALL && (line.startsWith('//') || line.startsWith('*') || line.startsWith('/*'))) return;
    for (const r of RULES) {
      r.re.lastIndex = 0;
      if (!r.re.test(raw)) continue;
      if (r.allow && r.allow.test(raw)) continue;
      if (!hits.has(r.id)) hits.set(r.id, []);
      hits.get(r.id).push({ file, line: i + 1, text: line.slice(0, 150) });
    }
  });
}

for (const r of RULES) {
  const found = hits.get(r.id) ?? [];
  if (found.length === 0) {
    console.log(`\x1b[32m  PASS\x1b[0m  ${r.id.padEnd(20)} ${r.rule}`);
    continue;
  }
  const tag = r.level === 'BLOCKER' ? '\x1b[31mBLOCK\x1b[0m' : '\x1b[33m WARN\x1b[0m';
  if (r.level === 'BLOCKER') blockers += found.length;
  else warns += found.length;
  console.log(`\n${tag}  ${r.id.padEnd(20)} ${r.rule}`);
  if (r.note) console.log(`        ${r.note}`);
  console.log(`        ${found.length} occurrence(s):`);
  for (const h of found.slice(0, 12)) {
    console.log(`          ${h.file}:${h.line}  ${h.text}`);
  }
  if (found.length > 12) console.log(`          ... and ${found.length - 12} more`);
}

console.log(`\n${blockers} blocker(s), ${warns} warning(s).`);
if (blockers > 0) {
  console.log('Blockers must be resolved before launch. Run with --all to include source comments.');
  process.exit(1);
}
