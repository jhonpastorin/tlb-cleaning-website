// Generates the SAMPLE before/after images the BeforeAfter sliders are wired
// to, so the interaction can be built, reviewed and signed off before any real
// client photography exists. Four scenes, each a pair: kitchen bench and
// shower screen (house-cleaning, home, deep-cleaning), oven interior
// (end-of-lease, whose brief names the oven) and bathroom ceiling with cornice
// (mould-cleaning, whose brief names the ceiling).
//
// ⚠️ THESE ARE NOT PHOTOGRAPHS AND MUST NEVER BE PRESENTED AS ONE. They are
// flat vector illustrations, each stamped with a visible SAMPLE badge, and
// their filenames say `sample-` for the same reason. The page's own guardrail
// stands: a fabricated "before and after from a real job" is a false trust
// claim. When real photography lands, swap the four imports in
// each page that uses them and delete these files.
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

/* ──────────────────────────── Oven interior ──────────────────────────── */
// For the end-of-lease page, whose photo brief names the oven specifically:
// it is the single item agents inspect hardest and the one tenants most often
// lose bond over, so a generic kitchen bench would not stand in for it.
// Shared geometry: the cavity walls in perspective, two wire racks on their
// side rails, the lower element, and the door glass framing the whole shot.
// Only the burnt-on layer and the tone change between states.
const oven = (dirty) => {
  const r = rng(31);
  const cavity = dirty ? '#4a4238' : '#b9b5ab';
  const backWall = dirty ? '#3d362e' : '#a8a49a';
  const rack = dirty ? '#5e5648' : '#d8d5cd';

  // Burnt-on carbon: heaviest on the floor of the cavity where spills land
  // and bake, thinning up the walls. Suppressed entirely in the clean state.
  let grime = '';
  if (dirty) {
    for (let i = 0; i < 70; i++) {
      const x = 300 + r() * 1000;
      const y = 840 + r() * 190;
      grime += `<ellipse cx="${x}" cy="${y}" rx="${6 + r() * 46}" ry="${3 + r() * 16}"
                fill="#17120c" opacity="${0.22 + r() * 0.5}"/>`;
    }
    for (let i = 0; i < 40; i++) {
      const x = 280 + r() * 1040;
      const y = 250 + r() * 560;
      grime += `<ellipse cx="${x}" cy="${y}" rx="${4 + r() * 20}" ry="${3 + r() * 14}"
                fill="#221a11" opacity="${0.14 + r() * 0.36}"/>`;
    }
    // A run of boiled-over fat down the back wall, and spatter on the glass.
    grime += `<path d="M 830 300 q 22 210 -10 430" stroke="#1d160e" stroke-width="26"
               fill="none" opacity="0.42" stroke-linecap="round"/>`;
    for (let i = 0; i < 34; i++) {
      grime += `<circle cx="${200 + r() * 1200}" cy="${140 + r() * 940}" r="${3 + r() * 9}"
                 fill="#2b2118" opacity="${0.16 + r() * 0.3}"/>`;
    }
  }

  // The clean state's gleam: enamel throws light back off the cavity floor
  // and along the rack wires, which is most of what "clean" reads as here.
  const shine = dirty
    ? ''
    : `<ellipse cx="800" cy="930" rx="420" ry="34" fill="#ffffff" opacity="0.3"/>
       <ellipse cx="560" cy="470" rx="150" ry="26" fill="#ffffff" opacity="0.18"/>
       <rect x="250" y="180" width="46" height="700" rx="23" fill="#ffffff" opacity="0.14"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${dirty ? '#2a251f' : '#8f8b82'}"/>
    <!-- door frame: the shot is taken through the open door -->
    <rect x="0" y="0" width="${W}" height="${H}" fill="${dirty ? '#39332b' : '#9c988f'}"/>
    <rect x="150" y="110" width="1300" height="990" rx="18" fill="${cavity}"/>
    <!-- cavity floor and ceiling, angled to read as depth -->
    <path d="M 150 110 L 340 260 L 1260 260 L 1450 110 Z" fill="${dirty ? '#443c33' : '#aeaaa0'}"/>
    <path d="M 150 1100 L 340 950 L 1260 950 L 1450 1100 Z" fill="${dirty ? '#332c25' : '#a5a197'}"/>
    <rect x="340" y="260" width="920" height="690" fill="${backWall}"/>
    <!-- side rails the racks sit on -->
    <rect x="360" y="430" width="30" height="380" rx="15" fill="${rack}" opacity="0.8"/>
    <rect x="1210" y="430" width="30" height="380" rx="15" fill="${rack}" opacity="0.8"/>
    <!-- two wire racks -->
    ${[470, 700].map((y) => {
      let wires = `<rect x="360" y="${y}" width="880" height="12" rx="6" fill="${rack}"/>`;
      for (let x = 390; x < 1230; x += 60) {
        wires += `<rect x="${x}" y="${y - 4}" width="9" height="20" rx="4" fill="${rack}" opacity="0.9"/>`;
      }
      return wires;
    }).join('')}
    <!-- lower element -->
    <path d="M 430 880 h 300 q 60 0 60 40 q 0 40 60 40 h 290"
      stroke="${dirty ? '#6b6154' : '#c9c5bc'}" stroke-width="22" fill="none" stroke-linecap="round"/>
    ${grime}
    ${shine}
    <!-- door glass edge, drawn last so it sits over the cavity -->
    <rect x="150" y="110" width="1300" height="990" rx="18" fill="none"
      stroke="${dirty ? '#575046' : '#d2cec5'}" stroke-width="26"/>
    ${badge()}
  </svg>`;
};

/* ─────────────────────── Bathroom ceiling and cornice ─────────────────────── */
// For the mould page, whose brief names a ceiling and cornice rather than a
// bench or a screen — mould reads as a ceiling problem to the people who
// search for it, and the shower pair above cannot carry that on its own.
// Shared geometry: the ceiling plane, the cornice run across it, the wall
// below, a downlight and an exhaust vent. Only the colony and the tone move.
const ceiling = (dirty) => {
  const r = rng(53);
  const ceilFill = dirty ? '#cbcabb' : '#f7f5ec';
  const corniceFill = dirty ? '#dedccd' : '#fdfcf6';
  const wallFill = dirty ? '#a09e8f' : '#ddd9cb';

  // The colony: dense in the corner where the two planes meet and the air
  // moves least, thinning along the cornice run. Drawn as clustered blooms
  // rather than even scatter — that clustering is what distinguishes mould
  // from ordinary dirt at a glance.
  let grime = '';
  if (dirty) {
    const bloom = (cx, cy, n, spread, maxR) => {
      let out = '';
      for (let i = 0; i < n; i++) {
        const a = r() * Math.PI * 2;
        const d = r() * spread;
        out += `<circle cx="${cx + Math.cos(a) * d}" cy="${cy + Math.sin(a) * d * 0.6}"
                 r="${2 + r() * maxR}" fill="#2f3a2c" opacity="${0.18 + r() * 0.46}"/>`;
      }
      return out;
    };
    grime += bloom(210, 250, 150, 240, 11);
    grime += bloom(520, 190, 90, 190, 8);
    grime += bloom(1040, 300, 70, 210, 7);
    grime += bloom(1430, 235, 110, 200, 9);
    // Staining along the cornice join itself, where condensation runs.
    for (let i = 0; i < 120; i++) {
      grime += `<circle cx="${r() * W}" cy="${470 + r() * 46}" r="${2 + r() * 7}"
                 fill="#3a4436" opacity="${0.16 + r() * 0.4}"/>`;
    }
    // A damp shadow spreading down the wall below the worst corner.
    grime += `<ellipse cx="240" cy="700" rx="300" ry="180" fill="#6f7566" opacity="0.26"/>`;
  }

  const shine = dirty
    ? ''
    : `<ellipse cx="900" cy="240" rx="520" ry="130" fill="#ffffff" opacity="0.26"/>
       <ellipse cx="1180" cy="760" rx="380" ry="150" fill="#ffffff" opacity="0.16"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <!-- ceiling plane across the top, wall below, cornice on the join -->
    <rect width="${W}" height="${H}" fill="${wallFill}"/>
    <rect x="0" y="0" width="${W}" height="470" fill="${ceilFill}"/>
    <rect x="0" y="452" width="${W}" height="66" fill="${corniceFill}"/>
    <path d="M 0 452 h ${W}" stroke="${dirty ? '#8f8e80' : '#ddd9cc'}" stroke-width="6"/>
    <path d="M 0 518 h ${W}" stroke="${dirty ? '#8f8e80' : '#ddd9cc'}" stroke-width="6"/>
    <!-- downlight -->
    <circle cx="1150" cy="200" r="76" fill="${dirty ? '#a3a293' : '#dedbcd'}"/>
    <circle cx="1150" cy="200" r="54" fill="${dirty ? '#87867a' : '#fdfcf6'}"/>
    <!-- exhaust vent, the other place mould gathers -->
    <rect x="330" y="120" width="200" height="140" rx="12" fill="${dirty ? '#a5a495' : '#e2dfd2'}"/>
    ${[40, 76, 112].map((o) => `<rect x="352" y="${120 + o}" width="156" height="14" rx="7"
      fill="${dirty ? '#75746a' : '#a9a596'}"/>`).join('')}
    <!-- part-height wall tiling below -->
    <rect x="0" y="820" width="${W}" height="${H - 820}" fill="${dirty ? '#8e8d80' : '#c9c6b7'}"/>
    <path d="M 0 820 h ${W}" stroke="${dirty ? '#6f6e63' : '#b0ac9c'}" stroke-width="8"/>
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
  ['sample-oven-before.png', oven(true)],
  ['sample-oven-after.png', oven(false)],
  ['sample-ceiling-before.png', ceiling(true)],
  ['sample-ceiling-after.png', ceiling(false)],
];

await mkdir(OUT, { recursive: true });
for (const [name, svg] of files) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(OUT, name));
  console.log('wrote', name);
}
