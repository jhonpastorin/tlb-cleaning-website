// Generates the four SAMPLE before/after images the house-cleaning page's
// BeforeAfter slider is wired to, so the interaction can be built, reviewed
// and signed off before any real client photography exists.
//
// ⚠️ THESE ARE NOT PHOTOGRAPHS AND MUST NEVER BE PRESENTED AS ONE. They are
// flat vector illustrations, each stamped with a visible SAMPLE badge, and
// their filenames say `sample-` for the same reason. The page's own guardrail
// stands: a fabricated "before and after from a real job" is a false trust
// claim. When real photography lands, swap the four imports in
// house-cleaning.astro and delete these files.
//
// Run: node scripts/make-before-after-samples.mjs
//
// Each PAIR shares its geometry exactly — same viewpoint, same furniture,
// same crop — and differs only in the grime layer and the overall tone. That
// is not a stylistic choice: a comparison slider wipes one image over the
// other in place, so anything that moves between the two frames reads as a
// glitch rather than as cleaning. The real photo brief says the same thing
// ("shoot both from one fixed position or the pair does not read").
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'home_cleaning', 'before_after');
const W = 1600;
const H = 1200;

// Brand palette, read off src/styles/tokens.css. Hardcoded here rather than
// parsed because this is a one-shot build script, not a component — nothing
// re-skins with the tokens.
const T = {
  darkTeal: '#234B51',
  mint: '#7FC282',
  cream: '#EBE1C7',
  offWhite: '#F4EFE3',
};

/** A deterministic PRNG, so re-running this script produces byte-identical
 *  files. With Math.random the "grime" would move on every run and every
 *  rebuild would churn the git diff and Astro's image cache for no reason. */
const rng = (seed) => () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);

const badge = () => `
  <g opacity="0.72">
    <rect x="28" y="${H - 74}" width="184" height="46" rx="8" fill="${T.darkTeal}"/>
    <text x="120" y="${H - 43}" font-family="monospace" font-size="22" font-weight="bold"
          fill="${T.offWhite}" text-anchor="middle" letter-spacing="3">SAMPLE</text>
  </g>`;

/* ─────────────────────────── Kitchen benchtop ─────────────────────────── */
// Shared geometry: tiled splashback across the top two thirds, a benchtop
// band, an undermount sink with a mixer tap, a kettle and a board. Only the
// grime layer and the tone change between states.
const kitchen = (dirty) => {
  const r = rng(7);
  const tile = 100;
  const groutBase = dirty ? '#9d9276' : '#e8e4d6';
  const tileFill = dirty ? '#d9d3c0' : '#f7f4ec';
  const benchFill = dirty ? '#7d7466' : '#c4bdae';

  let tiles = '';
  for (let y = 120; y < 700; y += tile) {
    for (let x = -40; x < W + tile; x += tile) {
      const off = ((y - 120) / tile) % 2 ? tile / 2 : 0;
      // Per-tile jitter, tiny — real tiles are not uniformly coloured, and a
      // perfectly flat wall reads as a swatch rather than a room.
      const j = Math.round(r() * (dirty ? 16 : 5));
      tiles += `<rect x="${x + off}" y="${y}" width="${tile - 6}" height="${tile - 6}" rx="3"
                 fill="${tileFill}" opacity="${1 - j / 200}"/>`;
    }
  }

  // Grime: grout darkening is carried by `groutBase` above; these are the
  // discrete marks — splatter on the splashback, spills and crumbs on the
  // bench. All suppressed entirely in the clean state.
  let grime = '';
  if (dirty) {
    for (let i = 0; i < 46; i++) {
      const x = 60 + r() * (W - 120);
      const y = 150 + r() * 520;
      grime += `<ellipse cx="${x}" cy="${y}" rx="${3 + r() * 13}" ry="${2 + r() * 9}"
                fill="#6b5f45" opacity="${0.1 + r() * 0.24}"/>`;
    }
    for (let i = 0; i < 30; i++) {
      const x = 80 + r() * (W - 160);
      const y = 790 + r() * 240;
      grime += `<ellipse cx="${x}" cy="${y}" rx="${4 + r() * 24}" ry="${2 + r() * 8}"
                fill="#4a3f2c" opacity="${0.13 + r() * 0.28}"/>`;
    }
    // A ring where a mug has been sitting, and a dried run down the cupboard.
    grime += `<ellipse cx="1180" cy="880" rx="52" ry="17" fill="none" stroke="#4a3f2c"
               stroke-width="7" opacity="0.34"/>`;
    grime += `<path d="M 470 700 q 14 90 -6 170" stroke="#6b5f45" stroke-width="11"
               fill="none" opacity="0.3" stroke-linecap="round"/>`;
  }

  // Highlights only exist in the clean state — a wiped surface throws light
  // back, and that gleam is most of what "clean" looks like in one frame.
  // Highlights only exist in the clean state — a wiped surface throws light
  // back, and that gleam is most of what "clean" looks like in one frame.
  // Soft ellipses, not strokes: a hard line laid across the sink and the
  // board read as a stray wire crossing them rather than as light on stone.
  // Both sit on OPEN stretches of bench, clear of every object.
  const shine = dirty
    ? ''
    : `<ellipse cx="105" cy="800" rx="80" ry="13" fill="#ffffff" opacity="0.4"/>
       <ellipse cx="1230" cy="812" rx="230" ry="15" fill="#ffffff" opacity="0.34"/>
       <ellipse cx="550" cy="990" rx="150" ry="11" fill="#ffffff" opacity="0.22"/>
       <rect x="1330" y="200" width="70" height="330" rx="35" fill="#ffffff" opacity="0.22"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${dirty ? '#b3ab97' : T.offWhite}"/>
    <rect x="0" y="0" width="${W}" height="130" fill="${dirty ? '#8e8672' : T.cream}"/>
    <rect x="0" y="120" width="${W}" height="580" fill="${groutBase}"/>
    ${tiles}
    <!-- benchtop -->
    <rect x="0" y="700" width="${W}" height="34" fill="${dirty ? '#5f5748' : '#7c7568'}"/>
    <rect x="0" y="734" width="${W}" height="300" fill="${benchFill}"/>
    <!-- undermount sink + mixer tap -->
    <rect x="620" y="770" width="360" height="180" rx="16" fill="${dirty ? '#5a5344' : '#6f6a5e'}"/>
    <rect x="648" y="792" width="304" height="136" rx="10" fill="${dirty ? '#6d6555' : '#8d8a7e'}"/>
    <path d="M 800 770 v -120 q 0 -46 46 -46 h 40" stroke="${dirty ? '#8a8271' : '#cfcabd'}"
      stroke-width="18" fill="none" stroke-linecap="round"/>
    <!-- kettle -->
    <rect x="1150" y="560" width="140" height="140" rx="18" fill="${dirty ? '#8a8271' : '#d5d0c3'}"/>
    <path d="M 1290 600 q 40 30 0 60" stroke="${dirty ? '#8a8271' : '#d5d0c3'}" stroke-width="14" fill="none"/>
    <!-- board -->
    <rect x="180" y="760" width="300" height="190" rx="12" fill="${dirty ? '#7a6a4e' : '#a89372'}"/>
    <!-- cupboard fronts below -->
    <rect x="0" y="1034" width="${W}" height="${H - 1034}" fill="${dirty ? '#6f6757' : T.cream}"/>
    <rect x="60" y="1060" width="700" height="120" rx="8" fill="${dirty ? '#7d7563' : '#e2d8bc'}"/>
    <rect x="840" y="1060" width="700" height="120" rx="8" fill="${dirty ? '#7d7563' : '#e2d8bc'}"/>
    ${grime}
    ${shine}
    ${badge()}
  </svg>`;
};

/* ────────────────────────── Shower screen + tiles ────────────────────────── */
// Shared geometry: a tiled back wall, a glass screen panel with a frame and
// handle, a tiled floor, and a shower head. Same rules as the kitchen — only
// grime and tone move.
const shower = (dirty) => {
  const r = rng(19);
  const tile = 150;
  const groutBase = dirty ? '#8b8f86' : '#eceade';
  const tileFill = dirty ? '#c8ccc4' : '#f6f5ee';

  let tiles = '';
  for (let y = 0; y < 900; y += tile) {
    for (let x = 0; x < W; x += tile) {
      const j = Math.round(r() * (dirty ? 18 : 4));
      tiles += `<rect x="${x + 5}" y="${y + 5}" width="${tile - 10}" height="${tile - 10}" rx="4"
                 fill="${tileFill}" opacity="${1 - j / 200}"/>`;
    }
  }

  let grime = '';
  if (dirty) {
    // Mould in the grout lines, which is what a real "before" shower shows
    // first — dotted along the joins rather than scattered at random.
    for (let y = 0; y < 900; y += tile) {
      for (let i = 0; i < 26; i++) {
        const x = r() * W;
        grime += `<circle cx="${x}" cy="${y + 5 + r() * 6}" r="${2 + r() * 6}"
                   fill="#3d4a3a" opacity="${0.2 + r() * 0.42}"/>`;
      }
    }
    // Soap scum streaking down the glass.
    for (let i = 0; i < 22; i++) {
      const x = 430 + r() * 700;
      grime += `<path d="M ${x} ${120 + r() * 120} q ${-8 + r() * 16} ${180 + r() * 260} ${-4 + r() * 8} ${420 + r() * 260}"
                 stroke="#cfd6cb" stroke-width="${5 + r() * 16}" fill="none"
                 opacity="${0.24 + r() * 0.4}" stroke-linecap="round"/>`;
    }
    // Water spotting.
    for (let i = 0; i < 90; i++) {
      grime += `<circle cx="${430 + r() * 700}" cy="${120 + r() * 800}" r="${2 + r() * 5}"
                 fill="#ffffff" opacity="${0.2 + r() * 0.34}"/>`;
    }
  }

  const shine = dirty
    ? ''
    : `<path d="M 520 180 L 760 1000" stroke="#ffffff" stroke-width="46" opacity="0.3" stroke-linecap="round"/>
       <path d="M 640 170 L 850 990" stroke="#ffffff" stroke-width="18" opacity="0.24" stroke-linecap="round"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${groutBase}"/>
    ${tiles}
    <!-- floor -->
    <rect x="0" y="900" width="${W}" height="${H - 900}" fill="${dirty ? '#7e8279' : '#e4e2d4'}"/>
    <rect x="0" y="900" width="${W}" height="12" fill="${dirty ? '#5f6359' : '#cfccbd'}"/>
    <!-- shower head + arm -->
    <path d="M 210 90 h 150" stroke="${dirty ? '#8d9188' : '#c9c5b8'}" stroke-width="20" stroke-linecap="round"/>
    <circle cx="380" cy="90" r="52" fill="${dirty ? '#8d9188' : '#d8d4c7'}"/>
    <!-- glass screen: a translucent panel over the wall, frame and handle -->
    <rect x="420" y="110" width="720" height="900" fill="#ffffff" opacity="${dirty ? 0.1 : 0.16}"/>
    <rect x="420" y="110" width="720" height="900" fill="none"
      stroke="${dirty ? '#6f7369' : '#b9b5a8'}" stroke-width="14"/>
    <rect x="1076" y="470" width="22" height="180" rx="11" fill="${dirty ? '#6f7369' : '#c6c2b5'}"/>
    ${grime}
    ${shine}
    ${badge()}
  </svg>`;
};

const files = [
  ['sample-kitchen-before.png', kitchen(true)],
  ['sample-kitchen-after.png', kitchen(false)],
  ['sample-shower-before.png', shower(true)],
  ['sample-shower-after.png', shower(false)],
];

await mkdir(OUT, { recursive: true });
for (const [name, svg] of files) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(OUT, name));
  console.log('wrote', name);
}
