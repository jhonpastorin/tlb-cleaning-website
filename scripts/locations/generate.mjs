// Generates one hero scene per town from scripts/locations/town-scenes.json.
//
// WHY A SCRIPT AND NOT 56 HAND-RUN COMMANDS: the style suffix below has to be
// byte-identical across every image or the set stops looking like one library
// (IMAGE-GUIDELINES.md §2). Keeping it in one string is the only way to
// guarantee that, and it makes a re-shoot of the whole set one command.
//
// The generator returns ~1376x768 JPEGs at ~850KB. The library norm for a
// location hero is 1920x1072 under 600KB (§5), so every image is re-encoded
// on the way in. Upscaling a synthetic source is lossless of nothing real and
// Astro re-encodes to webp at 400/800/1200 anyway; the point is that these
// files sit next to the three originals without looking different.
//
// Re-runnable: a town whose file already exists is skipped, so a partial run
// resumes instead of re-billing. Delete a file to re-shoot just that town.
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';

const run = promisify(execFile);

const CLI =
  'C:/Users/JL/.claude/plugins/cache/media-pipeline-marketplace/media-pipeline/1.2.2/mcp-server/build/cli.bundle.js';
const OUT_DIR = 'src/assets/locations';
const TMP_DIR = 'src/assets/locations/.raw';

// Appended verbatim to every subject line. Two jobs: hold the house grade
// steady across 56 prompts, and carry §4's hard rules (no text, no logos, no
// collage) into every single request rather than most of them.
const STYLE = [
  'No people in frame.',
  'Mid-morning natural light under a clear blue sky, soft shadows, bright optimistic grade,',
  'lush subtropical greens, cool whites and warm timber mid-tones. Never moody, never orange.',
  'Wide eye-level shot, approximately 28mm.',
  'Photorealistic documentary landscape photography, 16:9, high resolution.',
  'No text, no signage, no lettering, no logos, no watermark, no border, no vignette, no collage.',
].join(' ');

const CONCURRENCY = 3;
const ATTEMPTS = 3;

const scenes = JSON.parse(fs.readFileSync('scripts/locations/town-scenes.json', 'utf8'));
fs.mkdirSync(TMP_DIR, { recursive: true });

const failures = [];
let done = 0;

async function generate(scene) {
  // `preexisting` means the town points at a photo that was already in the
  // library rather than one this script made — currently only Lismore, which
  // TLB chose to leave on the shared region photo. Never regenerate those:
  // the file is not ours to overwrite, and `subject` is deliberately absent.
  if (scene.preexisting) {
    console.log(`skip   ${scene.town} (uses an existing library photo)`);
    return;
  }

  const final = path.join(OUT_DIR, `${scene.file}.jpg`);
  if (fs.existsSync(final)) {
    console.log(`skip   ${scene.town} (already present)`);
    return;
  }
  const raw = path.join(TMP_DIR, `${scene.file}.jpg`);

  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    try {
      const { stdout } = await run(
        'node',
        [CLI, '--prompt', `${scene.subject} ${STYLE}`, '--output', raw, '--aspect-ratio', '16:9'],
        { maxBuffer: 1024 * 1024 * 16 },
      );
      const result = JSON.parse(stdout.trim().split('\n').pop());
      if (!result.success) throw new Error(result.error ?? 'generator reported failure');

      // Match the three originals exactly: 1920x1072, JPEG, well under 600KB.
      await sharp(raw)
        .resize(1920, 1072, { fit: 'cover', kernel: 'lanczos3' })
        .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: '4:4:4' })
        .toFile(final);

      const kb = Math.round(fs.statSync(final).size / 1024);
      done += 1;
      console.log(`ok     ${scene.town} -> ${scene.file}.jpg (${kb}KB) [${done}]`);
      return;
    } catch (err) {
      const msg = String(err.message ?? err).slice(0, 160);
      if (attempt === ATTEMPTS) {
        console.log(`FAIL   ${scene.town}: ${msg}`);
        failures.push({ town: scene.town, error: msg });
        return;
      }
      console.log(`retry  ${scene.town} (attempt ${attempt}): ${msg}`);
      await new Promise((r) => setTimeout(r, 4000 * attempt));
    }
  }
}

// Fixed-size worker pool rather than Promise.all over all 56: the API
// rate-limits, and 56 simultaneous requests fail as a block.
const queue = [...scenes];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) await generate(queue.shift());
  }),
);

fs.rmSync(TMP_DIR, { recursive: true, force: true });

console.log(`\ngenerated ${done} / ${scenes.length}`);
if (failures.length > 0) {
  fs.writeFileSync(
    'scripts/locations/failures.json',
    JSON.stringify(failures, null, 2) + '\n',
  );
  console.log(`failed ${failures.length}: ${failures.map((f) => f.town).join(', ')}`);
}
