// Generates the SAMPLE before/after images the five "Outside your home"
// pages' BeforeAfter sliders are wired to — window, gutter, roof, high
// pressure and exterior house washing.
//
// Companion to scripts/make-before-after-samples.mjs, which does the same job
// for the four INDOOR scenes (kitchen bench, shower screen, oven, bathroom
// ceiling). Kept as a second file rather than folded into that one for two
// reasons: the indoor script is a signed-off artefact whose eight outputs are
// already imported by five pages, and every scene function here is a new
// exterior geometry sharing nothing with those but the palette, the PRNG and
// the badge. Both write into the same folder, and the naming convention is
// the same, so a real photo swap works identically for either set.
//
// ⚠️ THESE ARE NOT PHOTOGRAPHS AND MUST NEVER BE PRESENTED AS ONE. They are
// flat vector illustrations, each stamped with a visible SAMPLE badge, and
// their filenames say `sample-` for the same reason. IMAGE-GUIDELINES §7
// forbids fabricated proof, and a generated pair implying a specific job is
// exactly that. Every page carrying one also carries BeforeAfter's `note`
// prop saying so in the reader's own view. When real photography lands, swap
// the two imports on the page and delete the note.
//
// Run: node scripts/make-exterior-before-after-samples.mjs
//
// Each PAIR shares its geometry EXACTLY — same viewpoint, same objects, same
// crop — and differs only in the grime layer and the overall tone. That is
// not a stylistic choice: BeforeAfter wipes one image over the other in
// place, so anything that moves between the two frames reads as a glitch
// rather than as cleaning. The real photo brief on each page says the same
// thing, because the component cannot enforce it.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'home_cleaning', 'before_after');
const W = 1600;
const H = 1200;

// Brand palette, read off src/styles/tokens.css. Hardcoded here rather than
// parsed for the same reason the indoor script hardcodes it: this is a
// one-shot build script, not a component, and nothing re-skins with tokens.
const T = {
  darkTeal: '#234B51',
  cream: '#EBE1C7',
  offWhite: '#F4EFE3',
};

/** A deterministic PRNG, so re-running this script produces byte-identical
 *  files. With Math.random the grime would move on every run and every
 *  rebuild would churn the git diff and Astro's image cache for nothing. */
const rng = (seed) => () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);

const badge = () => `
  <g opacity="0.72">
    <rect x="28" y="${H - 74}" width="184" height="46" rx="8" fill="${T.darkTeal}"/>
    <text x="120" y="${H - 43}" font-family="monospace" font-size="22" font-weight="bold"
          fill="${T.offWhite}" text-anchor="middle" letter-spacing="3">SAMPLE</text>
  </g>`;

const wrap = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}${badge()}</svg>`;

/* ──────────────────────────── Concrete driveway ───────────────────────────
 * High pressure cleaning. A slab in perspective with two control joints, a
 * garage door across the top and a strip of lawn down one edge. The dirty
 * state carries the three things a real driveway actually has — a general
 * grey-black film, algae in the shaded edge and joints, and one oil patch
 * under where a car sits.
 */
const driveway = (dirty) => {
  const r = rng(11);
  const slab = dirty ? '#8d897c' : '#d9d4c6';
  const joint = dirty ? '#6b6659' : '#b9b3a4';
  const door = dirty ? '#9a978d' : '#dcd8cd';

  let grime = '';
  if (dirty) {
    // General mottling across the slab, heaviest toward the shaded left edge.
    for (let i = 0; i < 220; i++) {
      const x = r() * W;
      const y = 430 + r() * (H - 430);
      const edge = 1 - x / W; // more grime nearer the left/shaded side
      grime += `<ellipse cx="${x}" cy="${y}" rx="${14 + r() * 70}" ry="${6 + r() * 22}"
                fill="#4f4a3c" opacity="${(0.05 + r() * 0.16) * (0.5 + edge)}"/>`;
    }
    // Algae along the shaded edge where the lawn meets the concrete.
    for (let i = 0; i < 90; i++) {
      const y = 470 + r() * (H - 470);
      grime += `<ellipse cx="${r() * 130}" cy="${y}" rx="${18 + r() * 60}" ry="${5 + r() * 14}"
                fill="#5d6b45" opacity="${0.16 + r() * 0.3}"/>`;
    }
    // Growth in the two control joints.
    grime += `<path d="M 470 430 L 250 ${H}" stroke="#5d6b45" stroke-width="16" opacity="0.4"/>`;
    grime += `<path d="M 1030 430 L 1230 ${H}" stroke="#5d6b45" stroke-width="14" opacity="0.32"/>`;
    // One oil patch, where a car parks. Soft edged, darker at the centre.
    grime += `<ellipse cx="800" cy="880" rx="230" ry="120" fill="#3a352a" opacity="0.34"/>`;
    grime += `<ellipse cx="800" cy="880" rx="120" ry="62" fill="#2b2720" opacity="0.42"/>`;
    for (let i = 0; i < 22; i++) {
      grime += `<ellipse cx="${640 + r() * 320}" cy="${790 + r() * 190}" rx="${6 + r() * 26}"
                ry="${4 + r() * 12}" fill="#2b2720" opacity="${0.12 + r() * 0.3}"/>`;
    }
    // Leaf litter caught against the door, and a dark tyre track arc.
    for (let i = 0; i < 26; i++) {
      grime += `<ellipse cx="${200 + r() * 1200}" cy="${430 + r() * 40}" rx="${8 + r() * 16}"
                ry="${3 + r() * 6}" fill="#6b5c3c" opacity="${0.3 + r() * 0.35}"
                transform="rotate(${r() * 60 - 30} ${200 + r() * 1200} 440)"/>`;
    }
  }

  // A washed slab throws light back, and that sheen is most of what "clean"
  // looks like in a single frame. Soft ellipses only, never hard strokes.
  const shine = dirty
    ? ''
    : `<ellipse cx="1080" cy="700" rx="420" ry="120" fill="#ffffff" opacity="0.26"/>
       <ellipse cx="520" cy="980" rx="360" ry="110" fill="#ffffff" opacity="0.18"/>
       <ellipse cx="820" cy="500" rx="520" ry="60" fill="#ffffff" opacity="0.14"/>`;

  return wrap(`
    <rect width="${W}" height="${H}" fill="${slab}"/>
    <!-- sky and treeline above the garage -->
    <rect x="0" y="0" width="${W}" height="150" fill="${dirty ? '#c9cfcd' : '#dfe7e6'}"/>
    <ellipse cx="180" cy="150" rx="260" ry="90" fill="${dirty ? '#6e7a5f' : '#7f8f6c'}"/>
    <ellipse cx="1460" cy="146" rx="240" ry="80" fill="${dirty ? '#6e7a5f' : '#7f8f6c'}"/>
    <!-- house wall and garage door -->
    <rect x="0" y="140" width="${W}" height="290" fill="${dirty ? '#b8b4a8' : T.cream}"/>
    <rect x="300" y="196" width="1000" height="234" rx="6" fill="${door}"/>
    ${[0, 58, 116, 174].map((o) => `<rect x="300" y="${200 + o}" width="1000" height="48"
      fill="none" stroke="${dirty ? '#84817a' : '#c3bfb2'}" stroke-width="5"/>`).join('')}
    <!-- the slab edge, then the lawn strip down the shaded side -->
    <rect x="0" y="424" width="${W}" height="12" fill="${joint}"/>
    <rect x="0" y="436" width="60" height="${H - 436}" fill="${dirty ? '#5f6b4a' : '#77894f'}"/>
    <!-- two control joints, running away in perspective -->
    <path d="M 470 436 L 250 ${H}" stroke="${joint}" stroke-width="10"/>
    <path d="M 1030 436 L 1230 ${H}" stroke="${joint}" stroke-width="10"/>
    ${grime}
    ${shine}`);
};

/* ───────────────────────────── Roof tiles ─────────────────────────────────
 * Roof cleaning. Rows of concrete tiles running away up to a ridge, with a
 * valley on one side. The dirty state is the two things that actually grow on
 * a Northern Rivers roof: black algae in downslope streaks, and pale lichen
 * crusted on individual tile edges.
 */
const roof = (dirty) => {
  const r = rng(23);
  const tileW = 132;
  const rowH = 92;
  const tileFill = dirty ? '#8f8d84' : '#c2beb2';
  const tileEdge = dirty ? '#6e6c64' : '#a5a094';

  let tiles = '';
  for (let row = 0, y = 250; y < H; row++, y += rowH) {
    const off = row % 2 ? tileW / 2 : 0;
    for (let x = -tileW; x < W + tileW; x += tileW) {
      const j = Math.round(r() * (dirty ? 22 : 7));
      tiles += `<rect x="${x + off}" y="${y}" width="${tileW - 5}" height="${rowH - 4}" rx="5"
                fill="${tileFill}" opacity="${1 - j / 160}"/>
                <path d="M ${x + off} ${y + rowH - 4} h ${tileW - 5}" stroke="${tileEdge}" stroke-width="5"/>`;
    }
  }

  let grime = '';
  if (dirty) {
    // Downslope algae streaks, softened and widening as they run.
    for (let i = 0; i < 26; i++) {
      const x = r() * W;
      const w = 26 + r() * 90;
      grime += `<path d="M ${x} 250 q ${r() * 40 - 20} ${(H - 250) / 2} ${r() * 60 - 30} ${H - 250}"
                stroke="#2f3a30" stroke-width="${w}" fill="none" opacity="${0.1 + r() * 0.2}"
                stroke-linecap="round"/>`;
    }
    // Lichen: pale crusty blotches, on tile edges rather than mid-tile.
    for (let i = 0; i < 130; i++) {
      const x = r() * W;
      const y = 250 + Math.floor(r() * ((H - 250) / rowH)) * rowH + rowH - 8;
      grime += `<circle cx="${x}" cy="${y}" r="${4 + r() * 16}" fill="#9aa583" opacity="${0.24 + r() * 0.4}"/>`;
    }
    // Leaf litter caught in the valley, and staining along the ridge line.
    for (let i = 0; i < 40; i++) {
      grime += `<ellipse cx="${1290 + r() * 300}" cy="${300 + r() * 860}" rx="${8 + r() * 20}"
                ry="${3 + r() * 7}" fill="#6b5c3c" opacity="${0.3 + r() * 0.4}"/>`;
    }
    grime += `<rect x="0" y="250" width="${W}" height="70" fill="#2f3a30" opacity="0.22"/>`;
  }

  const shine = dirty
    ? ''
    : `<ellipse cx="700" cy="420" rx="620" ry="120" fill="#ffffff" opacity="0.2"/>
       <ellipse cx="1000" cy="900" rx="520" ry="150" fill="#ffffff" opacity="0.13"/>`;

  return wrap(`
    <rect width="${W}" height="${H}" fill="${tileFill}"/>
    <!-- sky and treeline over the ridge -->
    <rect x="0" y="0" width="${W}" height="196" fill="${dirty ? '#c9cfcd' : '#dfe7e6'}"/>
    <ellipse cx="330" cy="196" rx="330" ry="86" fill="${dirty ? '#6e7a5f' : '#7f8f6c'}"/>
    <ellipse cx="1330" cy="190" rx="300" ry="76" fill="${dirty ? '#6e7a5f' : '#7f8f6c'}"/>
    <!-- ridge capping -->
    <rect x="0" y="186" width="${W}" height="64" rx="10" fill="${dirty ? '#7e7c73' : '#b3aea1'}"/>
    ${tiles}
    <!-- valley flashing down the right hand side -->
    <path d="M 1420 250 L 1290 ${H} L 1600 ${H} L 1600 250 Z"
      fill="${dirty ? '#7c7a72' : '#aeaa9e'}" opacity="0.9"/>
    ${grime}
    ${shine}`);
};

/* ─────────────────────────────── Gutter run ───────────────────────────────
 * Gutter cleaning. A gutter channel across the frame in slight perspective,
 * fascia below it, roof sheeting above, and a downpipe at one end. The dirty
 * state fills the channel with leaf litter and puts an overflow stain down
 * the wall under the blocked join — which is the thing a homeowner actually
 * notices from the ground.
 */
const gutter = (dirty) => {
  const r = rng(37);
  const channel = dirty ? '#6d6754' : '#b6b2a5';
  const fascia = dirty ? '#a9a496' : T.offWhite;
  const sheet = dirty ? '#8f8d85' : '#c0bcb0';

  let litter = '';
  if (dirty) {
    // The channel packed solid: long leaves, bark strips and twigs.
    for (let i = 0; i < 300; i++) {
      const x = r() * W;
      const y = 486 + r() * 150;
      const l = 18 + r() * 74;
      litter += `<rect x="${x}" y="${y}" width="${l}" height="${5 + r() * 11}" rx="6"
                 fill="${['#6b5c3c', '#7d6a42', '#54492f', '#8a7550'][Math.floor(r() * 4)]}"
                 opacity="${0.65 + r() * 0.35}" transform="rotate(${r() * 70 - 35} ${x} ${y})"/>`;
    }
    // A seedling growing out of the blockage. It is the detail that says
    // "this has been like it for two seasons", which the copy also says.
    litter += `<path d="M 980 500 q 10 -70 -36 -104 M 980 500 q 6 -58 54 -84 M 980 500 v -96"
      stroke="#5d6b45" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.9"/>`;
    // Leaves scattered on the roof sheeting above, feeding the gutter.
    for (let i = 0; i < 60; i++) {
      const x = r() * W;
      const y = 120 + r() * 320;
      litter += `<ellipse cx="${x}" cy="${y}" rx="${9 + r() * 22}" ry="${4 + r() * 8}"
                 fill="#6b5c3c" opacity="${0.28 + r() * 0.4}"
                 transform="rotate(${r() * 90 - 45} ${x} ${y})"/>`;
    }
    // Overflow staining down the fascia under the blocked join, plus mould.
    litter += `<path d="M 1010 640 q -12 120 4 240" stroke="#4f4a3c" stroke-width="66"
      fill="none" opacity="0.26" stroke-linecap="round"/>`;
    for (let i = 0; i < 70; i++) {
      litter += `<ellipse cx="${r() * W}" cy="${650 + r() * 250}" rx="${10 + r() * 40}"
                 ry="${5 + r() * 16}" fill="#5d6b45" opacity="${0.08 + r() * 0.2}"/>`;
    }
  }

  // The clean state gets what a cleared gutter actually shows: bare metal,
  // and a thin run of water finding the downpipe.
  const water = dirty
    ? ''
    : `<rect x="0" y="560" width="${W}" height="26" rx="10" fill="#cfe0dd" opacity="0.55"/>
       <ellipse cx="1300" cy="574" rx="180" ry="18" fill="#ffffff" opacity="0.35"/>
       <ellipse cx="420" cy="520" rx="300" ry="16" fill="#ffffff" opacity="0.26"/>`;

  return wrap(`
    <rect width="${W}" height="${H}" fill="${fascia}"/>
    <!-- sky, then roof sheeting running down to the gutter -->
    <rect x="0" y="0" width="${W}" height="110" fill="${dirty ? '#c9cfcd' : '#dfe7e6'}"/>
    <rect x="0" y="100" width="${W}" height="360" fill="${sheet}"/>
    ${Array.from({ length: 14 }, (_, i) => `<path d="M ${i * 120} 100 L ${i * 120 - 26} 460"
      stroke="${dirty ? '#7b7971' : '#a8a498'}" stroke-width="7"/>`).join('')}
    <!-- the gutter: back edge, channel, front bead -->
    <rect x="0" y="452" width="${W}" height="40" fill="${dirty ? '#5d5847' : '#9d9a8d'}"/>
    <rect x="0" y="480" width="${W}" height="170" fill="${channel}"/>
    <rect x="0" y="632" width="${W}" height="34" rx="14" fill="${dirty ? '#5d5847' : '#a8a498'}"/>
    ${litter}
    ${water}
    <!-- fascia and wall below, with the downpipe at the right hand end -->
    <rect x="0" y="666" width="${W}" height="${H - 666}" fill="${fascia}"/>
    <rect x="1240" y="666" width="120" height="${H - 666}" rx="10" fill="${dirty ? '#a19c8e' : '#e3ded1'}"/>
    <rect x="1216" y="666" width="168" height="44" rx="12" fill="${dirty ? '#918c7e' : '#d5d0c2'}"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M 0 ${760 + i * 76} h 1216"
      stroke="${dirty ? '#98937f' : '#e8e3d6'}" stroke-width="6"/>`).join('')}`);
};

/* ──────────────────────────── Window and glass ────────────────────────────
 * Window cleaning. One large pane in a white frame with a sill and a gritty
 * bottom track, the garden reflected in the glass. The dirty state is the
 * coastal set: salt haze flattening the reflection, hard water spotting,
 * dried runs, a cobweb in the corner and grit in the track.
 */
const window_ = (dirty) => {
  const r = rng(53);
  const frame = dirty ? '#b0ab9c' : T.offWhite;
  const glass = dirty ? '#a7b0ac' : '#bcd3d2';

  let film = '';
  if (dirty) {
    // The haze itself: a flat pale wash over the whole pane. This is what
    // actually reads as "dirty glass" at a glance, more than any speck does.
    film += `<rect x="150" y="150" width="1300" height="800" fill="#d8d4c4" opacity="0.4"/>`;
    // Hard water spotting, dense toward the bottom where runs collect.
    for (let i = 0; i < 420; i++) {
      const x = 160 + r() * 1280;
      const y = 160 + r() * 780;
      const low = y / 950;
      film += `<circle cx="${x}" cy="${y}" r="${2 + r() * 8}" fill="#efe9d6"
                opacity="${(0.14 + r() * 0.34) * (0.5 + low)}"/>`;
    }
    // Dried runs from the top edge, the signature of a hose rinse.
    for (let i = 0; i < 14; i++) {
      const x = 200 + r() * 1200;
      film += `<path d="M ${x} 160 q ${r() * 24 - 12} 380 ${r() * 30 - 15} 780"
                stroke="#e4dcc6" stroke-width="${8 + r() * 18}" fill="none" opacity="${0.16 + r() * 0.22}"/>`;
    }
    // A cobweb in the top corner of the reveal.
    film += `<g stroke="#d9d5c6" stroke-width="4" fill="none" opacity="0.6">
      <path d="M 150 150 L 420 150 M 150 150 L 150 420 M 150 150 L 372 372"/>
      <path d="M 150 250 q 78 12 100 100 M 150 330 q 118 20 152 152"/></g>`;
    // Grit and a dead leaf in the bottom track.
    for (let i = 0; i < 120; i++) {
      film += `<circle cx="${150 + r() * 1300}" cy="${960 + r() * 34}" r="${2 + r() * 7}"
                fill="#6b5c3c" opacity="${0.3 + r() * 0.5}"/>`;
    }
    film += `<ellipse cx="1180" cy="976" rx="46" ry="16" fill="#6b5c3c" opacity="0.7"
              transform="rotate(-12 1180 976)"/>`;
  }

  // Clean glass reads through two things: a sharper reflection, and one long
  // specular band across the pane.
  const shine = dirty
    ? ''
    : `<path d="M 300 150 L 720 950 L 900 950 L 480 150 Z" fill="#ffffff" opacity="0.3"/>
       <path d="M 1000 150 L 1250 950 L 1310 950 L 1060 150 Z" fill="#ffffff" opacity="0.2"/>`;

  return wrap(`
    <rect width="${W}" height="${H}" fill="${dirty ? '#b8b4a8' : T.cream}"/>
    <!-- the reveal, then the pane -->
    <rect x="110" y="110" width="1380" height="880" rx="8" fill="${frame}"/>
    <rect x="150" y="150" width="1300" height="800" fill="${glass}"/>
    <!-- what the glass reflects: sky over a treeline, and a lawn strip -->
    <rect x="150" y="150" width="1300" height="430" fill="${dirty ? '#b3bcba' : '#cfe0de'}"/>
    <ellipse cx="520" cy="600" rx="420" ry="150" fill="${dirty ? '#77836a' : '#88976f'}" opacity="0.9"/>
    <ellipse cx="1240" cy="620" rx="330" ry="120" fill="${dirty ? '#77836a' : '#88976f'}" opacity="0.85"/>
    <rect x="150" y="720" width="1300" height="230" fill="${dirty ? '#7d8a62' : '#8fa06a'}" opacity="0.55"/>
    ${film}
    ${shine}
    <!-- glazing bar, sill and the bottom track -->
    <rect x="786" y="150" width="28" height="800" fill="${frame}"/>
    <rect x="150" y="950" width="1300" height="40" fill="${dirty ? '#9d9789' : '#e6e1d4'}"/>
    <rect x="90" y="990" width="1420" height="54" rx="10" fill="${frame}"/>
    <rect x="90" y="1044" width="1420" height="22" fill="${dirty ? '#8f8a7c' : '#d6d1c3'}"/>`);
};

/* ───────────────────────── Weatherboard wall and eaves ────────────────────
 * Exterior house washing. A weatherboard wall with the eaves and soffit
 * above it and a window reveal to one side. The dirty state is the shaded
 * southern elevation: a grey green film over the boards, heavier under the
 * eaves and rising out of the garden bed, plus cobwebs in the soffit corner.
 */
const wall = (dirty) => {
  const r = rng(71);
  const board = dirty ? '#a8a893' : T.offWhite;
  const boardEdge = dirty ? '#8b8b78' : '#ddd8c9';
  const soffit = dirty ? '#9c9c8a' : '#efeade';

  let boards = '';
  for (let y = 300; y < 1060; y += 76) {
    boards += `<rect x="0" y="${y}" width="${W}" height="76" fill="${board}"
                opacity="${1 - Math.round(r() * (dirty ? 14 : 4)) / 140}"/>
               <path d="M 0 ${y + 76} h ${W}" stroke="${boardEdge}" stroke-width="6"/>`;
  }

  let growth = '';
  if (dirty) {
    // The film: soft green grey blooms, densest under the eaves and at the
    // base of the wall. Two passes so the edges stay irregular.
    const bloom = (cx, cy, rx, ry, n, fill, op) => {
      let out = '';
      for (let i = 0; i < n; i++) {
        out += `<ellipse cx="${cx + (r() - 0.5) * rx * 2}" cy="${cy + (r() - 0.5) * ry * 2}"
                 rx="${20 + r() * rx}" ry="${14 + r() * ry}" fill="${fill}"
                 opacity="${op + r() * 0.16}"/>`;
      }
      return out;
    };
    growth += bloom(760, 330, 780, 60, 40, '#6f7a5c', 0.14);
    growth += bloom(700, 1010, 760, 70, 46, '#5d6b45', 0.14);
    growth += bloom(180, 640, 190, 300, 18, '#6f7a5c', 0.1);
    // Streaks running down from the eaves line.
    for (let i = 0; i < 20; i++) {
      const x = r() * W;
      growth += `<path d="M ${x} 300 q ${r() * 20 - 10} 260 ${r() * 26 - 13} 520"
                  stroke="#4f5a42" stroke-width="${16 + r() * 46}" fill="none"
                  opacity="${0.07 + r() * 0.13}" stroke-linecap="round"/>`;
    }
    // A run below the window sill, where water sheds off the frame.
    growth += `<path d="M 1210 700 q -8 110 6 210" stroke="#4f5a42" stroke-width="54"
      fill="none" opacity="0.2" stroke-linecap="round"/>`;
    // Cobwebs in the soffit corner and the window reveal.
    growth += `<g stroke="#cfcbba" stroke-width="4" fill="none" opacity="0.55">
      <path d="M 0 300 L 240 300 M 0 300 L 0 300 M 0 300 L 210 210"/>
      <path d="M 60 300 q 60 -40 78 -78 M 130 300 q 44 -56 60 -96"/></g>`;
    growth += `<g stroke="#cfcbba" stroke-width="4" fill="none" opacity="0.5">
      <path d="M 1020 470 L 1160 470 M 1020 470 L 1020 590 M 1020 470 L 1130 570"/></g>`;
    // Grime greying the white window frame itself.
    growth += `<rect x="1000" y="450" width="360" height="270" fill="#6f7a5c" opacity="0.16"/>`;
  }

  const shine = dirty
    ? ''
    : `<ellipse cx="520" cy="560" rx="520" ry="180" fill="#ffffff" opacity="0.24"/>
       <ellipse cx="1300" cy="900" rx="360" ry="150" fill="#ffffff" opacity="0.14"/>`;

  return wrap(`
    <rect width="${W}" height="${H}" fill="${board}"/>
    <!-- fascia and soffit across the top -->
    <rect x="0" y="0" width="${W}" height="150" fill="${dirty ? '#8d8d7c' : '#e2ddd0'}"/>
    <rect x="0" y="150" width="${W}" height="150" fill="${soffit}"/>
    <path d="M 0 296 h ${W}" stroke="${dirty ? '#7c7c6c' : '#cec9bb'}" stroke-width="8"/>
    ${boards}
    <!-- window reveal, sill and glass -->
    <rect x="1000" y="450" width="360" height="270" rx="6" fill="${dirty ? '#b5b0a1' : '#f7f3e8'}"/>
    <rect x="1032" y="482" width="296" height="206" fill="${dirty ? '#93a09c' : '#bcd3d2'}"/>
    <rect x="984" y="704" width="392" height="34" rx="8" fill="${dirty ? '#a9a494' : '#efeade'}"/>
    <!-- garden bed along the foot of the wall -->
    <rect x="0" y="1060" width="${W}" height="${H - 1060}" fill="${dirty ? '#4f4a3a' : '#6b6047'}"/>
    ${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${120 + i * 240}" cy="1080"
      rx="${86 + (i % 3) * 22}" ry="54" fill="${dirty ? '#4c5940' : '#69804f'}"/>`).join('')}
    ${growth}
    ${shine}`);
};

const files = [
  ['sample-driveway-before.png', driveway(true)],
  ['sample-driveway-after.png', driveway(false)],
  ['sample-roof-before.png', roof(true)],
  ['sample-roof-after.png', roof(false)],
  ['sample-gutter-before.png', gutter(true)],
  ['sample-gutter-after.png', gutter(false)],
  ['sample-window-before.png', window_(true)],
  ['sample-window-after.png', window_(false)],
  ['sample-wall-before.png', wall(true)],
  ['sample-wall-after.png', wall(false)],
];

await mkdir(OUT, { recursive: true });
for (const [name, svg] of files) {
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(OUT, name));
  console.log('wrote', name);
}
