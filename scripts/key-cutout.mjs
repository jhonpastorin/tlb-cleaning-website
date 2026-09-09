// Turns a generated figure-on-white JPEG into a family B cut-out: a PNG with
// a real alpha channel, so the page's own background colour shows through
// behind the figure (IMAGE-GUIDELINES.md §1).
//
// WHY THIS EXISTS. The image provider has no transparent-background option,
// so every cut-out in this library has to be keyed after the fact. The recipe
// below was worked out during the commercial build and written down in
// src/assets/commercial_cleaning/IMAGE-PROMPTS.md; this file is that recipe
// as runnable code, so the next person does not have to reconstruct it from
// prose.
//
// Run:
//   node scripts/key-cutout.mjs <input.jpg> <output.png>
//
// THE THREE THINGS THAT GO WRONG, and what this does about them:
//
//  1. A LUMINANCE KEY EATS THE SUBJECT. The obvious approach — "make every
//     near-white pixel transparent" — also deletes white props, the white of
//     an eye, a highlight on a chrome handle and the pale rug the figure is
//     working on. So this does NOT threshold globally. It FLOOD FILLS from
//     the frame edges, so only white that is CONNECTED to the border is
//     removed. An enclosed white region (between an arm and a torso, say) is
//     reached by the fill only if there is a genuine gap, which is exactly
//     the behaviour we want.
//
//  2. A HARD MASK LEAVES A WHITE FRINGE. JPEG softens every edge over a few
//     pixels, so a binary mask keeps a pale halo that is invisible on a white
//     page and glaringly obvious over Dark Teal. So the mask is blurred
//     slightly and then pulled INWARD with a linear ramp, which eats the
//     half-white transition pixels instead of keeping them.
//
//  3. PALETTE-ENCODE IT, WITHOUT DITHER. The inherited recipe was right about
//     this and I was briefly wrong about it, so the reasoning is worth
//     keeping. Alpha scanlines did appear across the first keyed figure and
//     the palette encoder looked like the obvious culprit, exactly as the
//     recipe warned. It was not: the cause was the mask stride bug in step 2
//     below, and switching to a full RGBA PNG did not fix it because it was
//     never an encoding problem. Once the stride was right,
//     `png({ palette: true, dither: 0 })` came back clean AND five times
//     smaller — 176KB against 833KB for the same frame, with alpha differing
//     by more than 8 on 0.14% of pixels, all of them on the feathered edge.
//     Dither must stay off; dithering an alpha channel is what scatters it.
//
// ALWAYS CHECK THE RESULT OVER #234B51, NOT OVER WHITE. A fringe is invisible
// on a white background by definition. Pass --check to write a companion
// _on-teal.png composite for exactly that.
import sharp from 'sharp';
import process from 'node:process';

// What counts as background. A pure-white test alone is not enough: the
// generator lays a soft NEUTRAL GREY contact shadow under the figure, which
// is nowhere near 255 and so survives the fill as a grey-white blob floating
// on the teal band.
//
// Brightness alone cannot separate that shadow from a pale prop, because a
// cream rug and a grey shadow sit at nearly the same luminance. SATURATION
// can: the studio backdrop and its shadow are neutral (R, G and B within a
// few points of each other) while the pale props in this library are warm —
// cream wool, pale timber, linen. So a pixel is background when it is both
// LIGHT and NEUTRAL, which drops the shadow and keeps the cream.
const LIGHT_MIN = 216; // darkest channel must be at least this
const NEUTRAL_SPREAD = 8; // max channel minus min channel must be at most this

// ⚠️ WHEN TO USE `--green` INSTEAD. The white-background key above cannot
// separate the backdrop from a subject that is ITSELF white and neutral. Three
// of the six appliance heroes hit this immediately — a bare mattress, a pale
// tiled floor and a set of white venetian blinds all read as background and
// keyed away in ragged holes.
//
// There is no threshold that fixes that, because the two really are the same
// colour. The answer is to shoot against a colour no subject uses. Generate
// the figure on flat chroma green and pass --green, and the predicate becomes
// "is this pixel strongly green" instead of "is this pixel light and neutral".
// White props then survive untouched.
//
// Prefer --green for any subject with white, cream or pale grey in it. The
// white background is only worth using when the subject is entirely coloured,
// and even then green costs nothing.
const GREEN_DOMINANCE = 40; // green channel must beat both others by this much
const GREEN_MIN = 90; // and be at least this bright, so dark hair is never eaten
// How far the mask is pulled inward, in alpha units, after blurring. Higher
// eats more fringe and more subject; 60 is the point where the teal composite
// stopped showing a halo without visibly thinning the figure.
const EDGE_BITE = 60;
const FEATHER_SIGMA = 0.8;
const TEAL = { r: 0x23, g: 0x4b, b: 0x51 };

const [, , inputPath, outputPath, ...flags] = process.argv;
if (!inputPath || !outputPath) {
  console.error('usage: node scripts/key-cutout.mjs <input.jpg> <output.png> [--green] [--check]');
  process.exit(1);
}
const wantCheck = flags.includes('--check');
const greenScreen = flags.includes('--green');

const src = sharp(inputPath).ensureAlpha();
const { width, height } = await src.metadata();
const { data } = await src.raw().toBuffer({ resolveWithObject: true });

// --- 1. flood fill the background from every frame edge ---------------------
// Iterative stack fill rather than recursion: a 1024x1024 frame is a million
// pixels and a recursive fill blows the call stack on the first big one.
const isBackground = (i) => {
  const r = data[i * 4];
  const g = data[i * 4 + 1];
  const b = data[i * 4 + 2];
  if (greenScreen) {
    return g >= GREEN_MIN && g - r >= GREEN_DOMINANCE && g - b >= GREEN_DOMINANCE;
  }
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  return min >= LIGHT_MIN && max - min <= NEUTRAL_SPREAD;
};

const background = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x += 1) {
  stack.push(x, (height - 1) * width + x);
}
for (let y = 0; y < height; y += 1) {
  stack.push(y * width, y * width + width - 1);
}

while (stack.length) {
  const i = stack.pop();
  if (background[i] || !isBackground(i)) continue;
  background[i] = 1;
  const x = i % width;
  const y = (i - x) / width;
  if (x > 0) stack.push(i - 1);
  if (x < width - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - width);
  if (y < height - 1) stack.push(i + width);
}

// --- 2. feather, then pull the mask inward ----------------------------------
const hardMask = Buffer.alloc(width * height);
for (let i = 0; i < width * height; i += 1) hardMask[i] = background[i] ? 0 : 255;

// ⚠️ READ `info.channels`, DO NOT ASSUME 1. Handed a single-channel raw
// buffer, this sharp build returns THREE channels from .blur() — it promotes
// greyscale to sRGB on the way out. Indexing the result as if it were still
// one channel reads every third byte, which walks the mask diagonally and
// lays clean alternating scanlines of transparency straight across the
// figure. That looked exactly like the palette-dither failure the recipe
// warned about, and cost a wrong diagnosis before the buffer length was
// actually measured. Stride by whatever comes back.
const { data: softMask, info: maskInfo } = await sharp(hardMask, { raw: { width, height, channels: 1 } })
  .blur(FEATHER_SIGMA)
  .raw()
  .toBuffer({ resolveWithObject: true });
const maskStride = maskInfo.channels;

// Linear ramp: everything below EDGE_BITE goes to fully transparent, the rest
// is rescaled back up to 255. This is the step that kills the halo.
const alpha = Buffer.alloc(width * height);
for (let i = 0; i < width * height; i += 1) {
  const v = softMask[i * maskStride];
  alpha[i] = v <= EDGE_BITE ? 0 : Math.min(255, Math.round(((v - EDGE_BITE) / (255 - EDGE_BITE)) * 255));
}

// --- 3. write a NON-DITHERED png -------------------------------------------
// DESPILL, green mode only. A chroma key always leaves a faint green rim on
// the subject where the backdrop bled into the edge pixels, and on this
// library's palette that rim reads as a sickly halo around an aqua polo. The
// standard fix: wherever green leads the other two channels, pull it back to
// the higher of them. Neutral and warm pixels are untouched, so the figure's
// own colour survives; only the contaminated edge changes.
const out = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i += 1) {
  const r = data[i * 4];
  let g = data[i * 4 + 1];
  const b = data[i * 4 + 2];
  if (greenScreen) {
    const cap = Math.max(r, b);
    if (g > cap) g = cap;
  }
  // FLATTEN THE INVISIBLE PIXELS. Where alpha is 0 the colour is never
  // shown, but PNG still stores it, and what is stored there is a megapixel
  // of JPEG noise and green-screen mottle that deflate cannot compress. Zero
  // it to a single flat value and the file drops by roughly a third to a half
  // (1.5MB to under 600KB on the worst of these) with no visible change at
  // all. This is the difference between hitting IMAGE-GUIDELINES §5's weight
  // target and blowing through it.
  if (alpha[i] === 0) {
    out[i * 4] = 255;
    out[i * 4 + 1] = 255;
    out[i * 4 + 2] = 255;
    out[i * 4 + 3] = 0;
    continue;
  }
  out[i * 4] = r;
  out[i * 4 + 1] = g;
  out[i * 4 + 2] = b;
  out[i * 4 + 3] = alpha[i];
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png({ palette: true, dither: 0, quality: 90, effort: 10 })
  .toFile(outputPath);

const keptPct = ((alpha.reduce((n, a) => n + (a > 0 ? 1 : 0), 0) / (width * height)) * 100).toFixed(1);
console.log(`${outputPath}  ${width}x${height}  ${keptPct}% opaque`);

if (wantCheck) {
  const checkPath = outputPath.replace(/\.png$/, '_on-teal.png');
  await sharp({
    create: { width, height, channels: 4, background: { ...TEAL, alpha: 1 } },
  })
    .composite([{ input: outputPath }])
    .png()
    .toFile(checkPath);
  console.log(`${checkPath}  <- check this one, not the cut-out`);
}
