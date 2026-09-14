// Per-town data for the location pages at /locations/<town>/.
//
// WHY THIS FILE EXISTS, and why there is not one .astro file per town:
// the sample Lismore page proved that a location page is one layout with a
// handful of town-specific values swapped through it. Shipping that as 56
// near-identical page files would mean every future copy tweak has to be made
// 56 times, which is exactly the drift locations.ts was extracted to stop
// (four copies of one town list, see its own header). So the layout lives
// once in src/pages/locations/[town].astro and the per-town substance lives
// here.
//
// WHAT A TOWN NEEDS, in order of how much it matters:
//   1. `local`   — the paragraph only true of that town. THE important one.
//                  See the ⚠️ below. Optional in the type, required in
//                  practice before a town's page should be considered done.
//   2. `nearby`  — the suburbs it links out to. Derived by default.
//   3. `hero`    — which of the three region photos it opens on.
// Everything else (region, state, service list, table, FAQs, CTA) is
// identical across towns by design and lives in the route file.
//
// ⚠️ THE DUPLICATE-CONTENT PROBLEM IS NOT SOLVED BY THIS FILE. It is only
// made cheap to solve. As shipped, 55 of these 56 towns have no `local`
// paragraph, which means 55 pages that differ by a town name and six suburb
// links. Google calls those doorway pages and the penalty is not scoped to
// the thin pages — it can pull down the whole domain. Two ways out, and TLB
// has to pick one:
//   (a) Write `local` for every town before launch. Two or three sentences
//       each, from someone who works there. That is the version that ranks.
//   (b) Ship only the towns that have one, and leave the rest as unlinked
//       pills (locations.ts already documents how). Ten real pages beat 56
//       thin ones.
// Whoever picks, pick deliberately. Publishing all 56 as they stand is a
// decision too, just an unexamined one.
import type { ImageMetadata } from 'astro';
import {
  northernRiversTowns,
  tweedTowns,
  southernGoldCoastTowns,
} from './locations';
import hinterlandHomeImg from '../assets/locations/weatherboard-home-with-hinterland-hills.jpg';
import coastalHomeImg from '../assets/locations/coastal-home-near-the-beach.jpg';
import valleyImg from '../assets/locations/hinterland-valley-farmland-and-homes.jpg';

// One scene per town, in locations.ts order. See townHeroes below.
import goonellabahHero from '../assets/locations/hilltop-brick-homes-above-a-green-valley.jpg';
import alstonvilleHero from '../assets/locations/plateau-village-street-under-mature-shade-trees.jpg';
import wollongbarHero from '../assets/locations/new-estate-street-beside-macadamia-orchard-rows.jpg';
import casinoHero from '../assets/locations/broad-country-town-street-with-verandahed-buildings.jpg';
import kyogleHero from '../assets/locations/small-town-rooftops-ringed-by-steep-forested-ranges.jpg';
import nimbinHero from '../assets/locations/village-shopfronts-below-craggy-rock-spires.jpg';
import clunesHero from '../assets/locations/hamlet-crossroads-among-rolling-green-hills.jpg';
import bexhillHero from '../assets/locations/open-grass-bowl-paddock-with-scattered-farmhouses.jpg';
import dunoonHero from '../assets/locations/macadamia-orchard-rows-on-steep-contours.jpg';
import ballinaHero from '../assets/locations/river-mouth-with-moored-fishing-trawlers-and-breakwall.jpg';
import eastBallinaHero from '../assets/locations/grassy-headland-above-a-rocky-shore.jpg';
import lennoxHeadHero from '../assets/locations/long-point-break-beach-below-a-grassy-coastal-park.jpg';
import skennarsHeadHero from '../assets/locations/elevated-coastal-street-with-ocean-to-the-horizon.jpg';
import wardellHero from '../assets/locations/quiet-river-crossing-with-timber-cottages-under-figs.jpg';
import evansHeadHero from '../assets/locations/fishing-boats-at-a-river-mouth-beside-a-headland.jpg';
import broadwaterHero from '../assets/locations/green-sugar-cane-fields-with-a-distant-mill-chimney.jpg';
import woodburnHero from '../assets/locations/slow-river-with-a-boat-ramp-under-river-gums.jpg';
import corakiHero from '../assets/locations/confluence-of-two-rivers-among-flat-grazing-country.jpg';
import bangalowHero from '../assets/locations/steep-heritage-main-street-with-iron-lace-verandahs.jpg';
import byronBayHero from '../assets/locations/wide-curving-bay-beach-below-a-green-headland.jpg';
import suffolkParkHero from '../assets/locations/sandy-track-through-tea-tree-dunes-to-an-empty-beach.jpg';
import mullumbimbyHero from '../assets/locations/town-street-with-palms-below-a-forested-peak.jpg';
import brunswickHeadsHero from '../assets/locations/tidal-river-with-a-timber-footbridge-and-fishing-boats.jpg';
import oceanShoresHero from '../assets/locations/curving-ridge-streets-above-green-fairways.jpg';
import newBrightonHero from '../assets/locations/beachfront-reserve-with-norfolk-pines-and-beach-shacks.jpg';
import billinudgelHero from '../assets/locations/old-low-buildings-beside-a-rail-line-and-cane-fields.jpg';
import federalHero from '../assets/locations/rainforest-crossroads-hamlet-among-macadamia-groves.jpg';
import murwillumbahHero from '../assets/locations/river-town-with-a-steel-truss-bridge-below-a-sharp-peak.jpg';
import tweedHeadsHero from '../assets/locations/broad-river-mouth-with-a-marina-and-apartment-towers.jpg';
import tweedHeadsSouthHero from '../assets/locations/residential-canal-frontages-with-small-boats.jpg';
import banoraPointHero from '../assets/locations/hillside-homes-above-a-river-bend.jpg';
import terranoraHero from '../assets/locations/acreage-homes-on-a-ridge-above-a-broadwater.jpg';
import bilambilHero from '../assets/locations/narrow-green-valley-with-cattle-paddocks-and-a-creek.jpg';
import bilambilHeightsHero from '../assets/locations/hilltop-estate-street-with-a-distant-coastal-skyline.jpg';
import chinderahHero from '../assets/locations/riverfront-cabins-and-dinghies-among-cane-flats.jpg';
import fingalHeadHero from '../assets/locations/basalt-rock-shelf-headland-beside-a-sandy-beach.jpg';
import kingscliffHero from '../assets/locations/beachfront-promenade-with-norfolk-pines.jpg';
import casuarinaHero from '../assets/locations/leafy-planned-coastal-street-with-a-dune-path.jpg';
import cudgenHero from '../assets/locations/red-soil-vegetable-fields-above-a-distant-coast.jpg';
import cabaritaBeachHero from '../assets/locations/crescent-beach-below-a-grassy-headland.jpg';
import bogangarHero from '../assets/locations/quiet-beach-village-street-behind-the-dunes.jpg';
import hastingsPointHero from '../assets/locations/clear-creek-crossing-the-sand-beside-a-rocky-headland.jpg';
import pottsvilleHero from '../assets/locations/creek-and-beach-with-big-shade-trees-behind.jpg';
import ukiHero from '../assets/locations/village-timber-shopfronts-at-the-foot-of-a-forested-peak.jpg';
import burringbarHero from '../assets/locations/ridge-road-village-with-banana-and-macadamia-slopes.jpg';
import mooballHero from '../assets/locations/rural-hamlet-buildings-beside-cattle-paddocks.jpg';
import coolangattaHero from '../assets/locations/curving-beach-below-a-headland-with-apartment-towers.jpg';
import bilingaHero from '../assets/locations/wide-quiet-beach-with-a-low-seawall-path.jpg';
import tugunHero from '../assets/locations/small-beachfront-park-with-pines-above-the-sand.jpg';
import currumbinHero from '../assets/locations/clear-tidal-creek-beside-a-large-rocky-outcrop.jpg';
import palmBeachHero from '../assets/locations/long-straight-beach-with-a-foreshore-park-of-palms.jpg';
import elanoraHero from '../assets/locations/leafy-inland-suburb-streets-around-a-lake.jpg';
import burleighHeadsHero from '../assets/locations/forested-headland-point-above-a-long-beach.jpg';
import burleighWatersHero from '../assets/locations/wide-residential-canals-with-pontoons-and-palms.jpg';
import miamiHero from '../assets/locations/wide-beach-backed-by-a-grassy-foreshore-and-low-apartments.jpg';

export type HeroKey = 'hinterland-home' | 'coastal-home' | 'valley';

// The three region photos. These are no longer what a town page opens on —
// every town has its own scene in townHeroes below — but they are still the
// fallback for a town added to locations.ts before its photo exists, and the
// /locations/ hub uses them for its own hero and its three region cards,
// which is the one place a region-wide photo is the honest choice.
//
// IMPORTANT: none of these is a photograph of a specific town.
export const heroImages: Record<HeroKey, { src: ImageMetadata; label: string }> = {
  'hinterland-home': {
    src: hinterlandHomeImg,
    label: 'A weatherboard Northern Rivers home with the hinterland hills behind it',
  },
  'coastal-home': {
    src: coastalHomeImg,
    label: 'A modern coastal home on a quiet beachside street, with the ocean beyond',
  },
  valley: {
    src: valleyImg,
    label: 'Green hinterland farmland and scattered homes below a forested ridgeline',
  },
};

// ── ONE SCENE PER TOWN ───────────────────────────────────────────────────
// Every town now opens on its own photo instead of sharing one of the three
// above. The three-photo version was the honest thing to ship when there was
// no per-town imagery, but it meant twenty Northern Rivers pages opened on
// the same weatherboard house: a reader who checks two towns sees the same
// picture twice and correctly reads the whole set as stock.
//
// ⚠️ THE RULE THAT DID NOT CHANGE, AND THE ONE THAT DID.
// Each scene is chosen to be CHARACTERISTIC of its town — cane flats for
// Broadwater, red soil for Cudgen, canals for Burleigh Waters, a rock-shelf
// headland for Fingal Head. None of them is, or claims to be, a photograph
// OF that town. So the labels below still never name a town, a landmark or a
// street: they describe what is in the frame and nothing more. That is the
// whole reason this is publishable. A generated image captioned "the Byron
// Bay lighthouse" is a fabricated claim about a real place; the same image
// captioned "a headland above a curving bay" is a picture of a headland.
//
// Keep that distinction if you edit a label. If TLB shoots real town
// photography later, swap the file here and the label can finally say where
// it is.
//
// Regenerate the whole set, or re-shoot one town, with:
//   node scripts/locations/generate.mjs
// (prompts live in scripts/locations/town-scenes.json; delete a town's .jpg
// to re-shoot just that one)
export const townHeroes: Record<string, { src: ImageMetadata; label: string }> = {
  // Deliberately the shared region photo, not a Lismore-specific scene: this
  // is TLB's pick. Written out rather than left to the fallback below so that
  // a missing entry still reads as an oversight and this one does not.
  // ⚠️ The /locations/ hub shows this same photo on its Northern Rivers card,
  // so a reader going hub → Lismore sees it twice. That is the one place the
  // repetition this file set out to remove still happens.
  Lismore: heroImages['hinterland-home'],
  Goonellabah: { src: goonellabahHero, label: 'Brick-and-tile homes along a hilltop street above a broad green valley' },
  Alstonville: { src: alstonvilleHero, label: 'A wide village main street of low shopfronts under mature shade trees' },
  Wollongbar: { src: wollongbarHero, label: 'A new estate street of modern houses backing onto rows of a macadamia orchard' },
  Casino: { src: casinoHero, label: 'A broad country-town main street lined with two-storey verandahed brick buildings' },
  Kyogle: { src: kyogleHero, label: 'A small town of low cottages on a valley floor ringed by steep forested ranges' },
  Nimbin: { src: nimbinHero, label: 'Low painted timber village shopfronts with craggy rock spires rising behind' },
  Clunes: { src: clunesHero, label: 'A handful of old weatherboard cottages at a quiet hamlet crossroads in green hills' },
  Bexhill: { src: bexhillHero, label: 'A wide grassy paddock bowl between low hills with scattered farmhouses around it' },
  Dunoon: { src: dunoonHero, label: 'Rows of a macadamia orchard following steep green hillside contours above a farmhouse' },
  Ballina: { src: ballinaHero, label: 'Fishing trawlers moored on a wide river mouth with a long rock breakwall beyond' },
  'East Ballina': { src: eastBallinaHero, label: 'A grassy coastal headland above a rocky shore, with low houses set back along the ridge' },
  'Lennox Head': { src: lennoxHeadHero, label: 'A long sand beach curving from a rocky point below a grassy coastal reserve' },
  'Skennars Head': { src: skennarsHeadHero, label: 'An elevated street of modern homes above coastal scrub, with open ocean to the horizon' },
  Wardell: { src: wardellHero, label: 'A small vehicle ferry on a quiet river, with timber cottages under fig trees on the bank' },
  'Evans Head': { src: evansHeadHero, label: 'Small fishing boats moored at a river mouth beside a low green headland' },
  Broadwater: { src: broadwaterHero, label: 'Flat green sugar cane fields with a cane rail line and a distant mill chimney' },
  Woodburn: { src: woodburnHero, label: 'A boat ramp and small dinghies on a slow river lined with tall river gums' },
  Coraki: { src: corakiHero, label: 'Two slow rivers meeting among tall river gums and flat green grazing paddocks' },
  Bangalow: { src: bangalowHero, label: 'A steep village street of two-storey heritage shopfronts with iron-lace verandahs' },
  'Byron Bay': { src: byronBayHero, label: 'A wide curving bay of pale sand and turquoise water below a green forested headland' },
  'Suffolk Park': { src: suffolkParkHero, label: 'A sandy track through tea-tree dunes opening onto a wide empty beach' },
  Mullumbimby: { src: mullumbimbyHero, label: 'A wide town street with palms and awnings below a steep forested peak' },
  'Brunswick Heads': { src: brunswickHeadsHero, label: 'A white timber footbridge over a tidal river with small fishing boats moored alongside' },
  'Ocean Shores': { src: oceanShoresHero, label: 'Curving ridge streets of brick-and-tile homes above green fairways, ocean beyond' },
  'New Brighton': { src: newBrightonHero, label: 'A grassy beachfront reserve of Norfolk pines fronting a few low-set beach shacks' },
  Billinudgel: { src: billinudgelHero, label: 'A few old low buildings beside a disused rail line, with cane fields and ranges behind' },
  Federal: { src: federalHero, label: 'A tiny hamlet at a road junction among dense subtropical rainforest hills' },
  Murwillumbah: { src: murwillumbahHero, label: 'A steel truss bridge over a river beside a low-rise town, a sharp volcanic peak behind' },
  'Tweed Heads': { src: tweedHeadsHero, label: 'A marina on a broad river mouth with mid-rise apartment towers and a headland beyond' },
  'Tweed Heads South': { src: tweedHeadsSouthHero, label: 'Single-storey homes with lawns and pontoons along a quiet residential canal' },
  'Banora Point': { src: banoraPointHero, label: 'Brick-and-tile homes stepping down a green hillside above a wide river bend' },
  Terranora: { src: terranoraHero, label: 'Acreage homes along a green ridge road above a wide still broadwater' },
  Bilambil: { src: bilambilHero, label: 'A narrow valley of cattle paddocks and a paperbark creek between steep forested slopes' },
  'Bilambil Heights': { src: bilambilHeightsHero, label: 'A steep hilltop street of two-storey homes with a distant coastline and skyline beyond' },
  Chinderah: { src: chinderahHero, label: 'Low riverfront cabins and dinghies on a calm tidal river among flat cane country' },
  'Fingal Head': { src: fingalHeadHero, label: 'A columnar basalt rock shelf headland beside a wide curving sandy beach' },
  Kingscliff: { src: kingscliffHero, label: 'A beachfront promenade beside a grassy reserve of Norfolk pines above a wide beach' },
  Casuarina: { src: casuarinaHero, label: 'A leafy coastal village street of modern homes with a sandy dune path to the beach' },
  Cudgen: { src: cudgenHero, label: 'Rows of vegetable crops in deep-red volcanic soil, with a distant line of coast beyond' },
  'Cabarita Beach': { src: cabaritaBeachHero, label: 'A crescent beach and clean surf below a green grassy headland' },
  Bogangar: { src: bogangarHero, label: 'A quiet village street of modest beach houses with a sandy beach access path' },
  'Hastings Point': { src: hastingsPointHero, label: 'A clear tidal creek running across the sand to the sea beside a low rocky headland' },
  Pottsville: { src: pottsvilleHero, label: 'A tidal creek meeting a wide beach beside a grassy park of big shade trees' },
  Uki: { src: ukiHero, label: 'A few old timber village shopfronts below a steep forested volcanic peak' },
  Burringbar: { src: burringbarHero, label: 'A short strip of old buildings on a ridge road above banana and macadamia slopes' },
  Mooball: { src: mooballHero, label: 'A couple of old rural buildings beside a quiet highway among green cattle paddocks' },
  Coolangatta: { src: coolangattaHero, label: 'A curving beach with clean surf below a headland, mid-rise apartment towers behind' },
  Bilinga: { src: bilingaHero, label: 'A wide quiet beach with a low seawall path and modest low-rise apartments behind' },
  Tugun: { src: tugunHero, label: 'A small grassy beachfront park under tall pines above a wide beach' },
  Currumbin: { src: currumbinHero, label: 'A clear turquoise tidal creek meeting the sea beside a large steep rocky outcrop' },
  'Palm Beach': { src: palmBeachHero, label: 'A long straight beach beside a narrow foreshore park of tall palms' },
  Elanora: { src: elanoraHero, label: 'Leafy suburban streets of brick-and-tile homes around a calm parkland lake' },
  'Burleigh Heads': { src: burleighHeadsHero, label: 'A forested headland point above a long sand beach, distant towers hazy on the horizon' },
  'Burleigh Waters': { src: burleighWatersHero, label: 'Wide residential canals with lawns, timber pontoons and moored boats' },
  Miami: { src: miamiHero, label: 'A wide beach and grassy foreshore backed by older beach houses and low apartments' },
};

export interface Region {
  /** Used in prose: "the surrounding Northern Rivers". No leading "the". */
  label: string;
  state: 'NSW' | 'QLD';
  /** Every town in the region, in locations.ts order. Feeds `nearby`. */
  towns: string[];
  /** The hero a town in this region gets unless it overrides. */
  hero: HeroKey;
}

export const regions: Region[] = [
  { label: 'Northern Rivers', state: 'NSW', towns: northernRiversTowns, hero: 'hinterland-home' },
  { label: 'The Tweed', state: 'NSW', towns: tweedTowns, hero: 'valley' },
  { label: 'Southern Gold Coast', state: 'QLD', towns: southernGoldCoastTowns, hero: 'coastal-home' },
];

export interface TownOverride {
  /** The two-or-three-sentence paragraph only true of this town. */
  local?: string[];
  /** Hand-picked neighbours, when the derived window gets it wrong. */
  nearby?: string[];
  /** A hero other than the region default. */
  hero?: HeroKey;
}

// ⚠️ COASTAL TOWNS IN A HINTERLAND REGION. The Northern Rivers list runs from
// Lismore in the hills out to Byron and Ballina on the coast, so one region
// photo cannot be right for all of it: a beach town opening on a picture of
// farmland reads as a stock photo, which is the one thing a location page
// cannot afford. These towns take the coastal hero instead of their region's
// default. Judgement call from the map, not from local knowledge — worth a
// glance from someone who drives these roads.
const coastalTowns = new Set([
  'Ballina', 'East Ballina', 'Lennox Head', 'Skennars Head', 'Wardell', 'Evans Head',
  'Byron Bay', 'Suffolk Park', 'Brunswick Heads', 'Ocean Shores', 'New Brighton',
  'Tweed Heads', 'Tweed Heads South', 'Banora Point', 'Chinderah', 'Fingal Head',
  'Kingscliff', 'Casuarina', 'Cabarita Beach', 'Bogangar', 'Hastings Point', 'Pottsville',
]);

// Per-town overrides. Everything not listed here runs on region defaults and
// derived neighbours.
//
// ⚠️ ONLY LISMORE HAS A HAND-PICKED `nearby`, and NO town has a `local` yet.
// This map is where both go as TLB supplies them. Adding a town here is the
// entire cost of making its page real.
export const townOverrides: Record<string, TownOverride> = {
  Lismore: {
    // Hand-picked rather than derived: the derived window (see nearbyFor
    // below) walks locations.ts' own order, which puts Alstonville and
    // Wollongbar next to Lismore but pushes Dunoon and Bexhill further out
    // than they really are. These six are the ones a Lismore resident would
    // name. Confirm they match where TLB's Lismore run actually goes.
    nearby: ['Goonellabah', 'Clunes', 'Bexhill', 'Dunoon', 'Alstonville', 'Wollongbar'],
    // local: ⚠️ still outstanding. The strongest material for this town is
    // the 2022 flood — mould, rebuilt and repaired homes, and cleaning work
    // that has a different context here than anywhere else in the service
    // area, linking naturally to /mould-cleaning-and-removal/. Deliberately
    // NOT drafted: inventing TLB's own account of a disaster in a community
    // they work in is not a placeholder decision to make on their behalf.
    // Also worth asking: which days the team is in Lismore, typical lead
    // time, and the split between homes, rentals and CBD premises.
  },
};

export interface TownPage {
  town: string;
  slug: string;
  region: Region;
  nearby: string[];
  hero: { src: ImageMetadata; label: string };
  local: string[];
}

// ── NEIGHBOURS ───────────────────────────────────────────────────────────
// Which suburbs a town links out to, when it has no hand-picked list.
//
// FIRST ATTEMPT, AND WHY IT WAS THROWN AWAY: a sliding window over the town's
// position in its region array, on the theory that locations.ts' order is
// roughly geographic. It is roughly geographic WITHIN a sub-area and jumps
// between them, so every town sitting at the start of a cluster got half its
// neighbours from the previous one. Ballina came out linking to Clunes,
// Bexhill and Dunoon: hinterland towns half an hour inland, on the page of a
// beach town. Wrong in a way a local spots instantly and a reader quietly
// distrusts. Don't reintroduce it.
//
// WHAT REPLACED IT: explicit clusters, written out below. Six of these lists
// is a few minutes of work and it is checkable — someone who knows the area
// can read them and say yes or no, which is not true of an index heuristic.
//
// ⚠️ CLUSTERS ARE DRAWN FROM THE MAP, NOT FROM LOCAL KNOWLEDGE. They are
// ordinary geography rather than guesses about TLB's runs, but the person who
// drives these roads should still read them once. A town in the wrong cluster
// is a wrong-looking page, not a broken one.
//
// Every town belongs to exactly one cluster, and every town in a region is in
// one — the `clusterCoverage` check below fails the build if that ever stops
// being true, so adding a town to locations.ts can't silently produce a page
// with no neighbours.
const clusters: string[][] = [
  // Northern Rivers
  // Ordered south-east to north-west, not alphabetically and not in
  // locations.ts' order: the within-cluster ordering IS the distance
  // heuristic, so a list that jumps around produces neighbours that jump
  // around. Wollongbar and Alstonville sit south-east of Lismore, Nimbin is
  // the far end of the northern run, and putting Nimbin mid-list (as the
  // first draft did) had it linking to Alstonville and Wollongbar over
  // Clunes and Bexhill.
  ['Wollongbar', 'Alstonville', 'Lismore', 'Goonellabah', 'Bexhill', 'Clunes', 'Dunoon', 'Nimbin'],
  ['Casino', 'Kyogle', 'Coraki', 'Woodburn', 'Broadwater', 'Evans Head'],
  ['Ballina', 'East Ballina', 'Lennox Head', 'Skennars Head', 'Wardell'],
  ['Bangalow', 'Byron Bay', 'Suffolk Park', 'Federal'],
  ['Mullumbimby', 'Brunswick Heads', 'Ocean Shores', 'New Brighton', 'Billinudgel'],
  // The Tweed
  [
    'Tweed Heads', 'Tweed Heads South', 'Banora Point', 'Terranora',
    'Bilambil', 'Bilambil Heights', 'Fingal Head',
  ],
  [
    'Kingscliff', 'Chinderah', 'Casuarina', 'Cudgen', 'Cabarita Beach',
    'Bogangar', 'Hastings Point', 'Pottsville',
  ],
  ['Murwillumbah', 'Uki', 'Burringbar', 'Mooball'],
  // Southern Gold Coast — nine towns in one strip, no useful sub-division.
  [
    'Coolangatta', 'Bilinga', 'Tugun', 'Currumbin', 'Palm Beach',
    'Elanora', 'Burleigh Heads', 'Burleigh Waters', 'Miami',
  ],
];

const NEARBY_COUNT = 6;

const clusterIndexOf = (town: string) => clusters.findIndex((c) => c.includes(town));

// Two orderings do the work, and both are "nearest first by list position",
// which is only sound because both lists are written in geographic order:
//
//  1. WITHIN the cluster — nearest by distance from the town's own position,
//     not the first six in the list. Miami sits at the far end of the nine
//     Southern Gold Coast suburbs; taking the first six would give it
//     Coolangatta and skip Burleigh Heads next door.
//  2. TOPPING UP a small cluster — from the CLOSEST OTHER CLUSTER outward,
//     not from the top of the region. Byron Bay's cluster holds only four, so
//     it needs three more; region order would hand it Lismore and Goonellabah
//     (inland, half an hour away) when Mullumbimby and Brunswick Heads are
//     the next suburbs up the road.
//
// Both are still list-position heuristics over a hand-written order. They are
// good enough that the output reads right on inspection, and the escape hatch
// for anywhere they don't is a hand-picked `nearby` in townOverrides.
const byDistanceFrom = (index: number) => (a: { i: number }, b: { i: number }) =>
  Math.abs(a.i - index) - Math.abs(b.i - index);

const nearbyFor = (town: string, region: Region): string[] => {
  const ci = clusterIndexOf(town);
  const own = clusters[ci] ?? region.towns;
  const ti = own.indexOf(town);

  const inCluster = own
    .map((t, i) => ({ t, i }))
    .filter((e) => e.t !== town)
    .sort(byDistanceFrom(ti))
    .map((e) => e.t);

  if (inCluster.length >= NEARBY_COUNT) return inCluster.slice(0, NEARBY_COUNT);

  // Top up from neighbouring clusters, nearest cluster first, and never
  // across a region boundary: a Queensland suburb on a NSW town's page would
  // read as a mistake even where it is geographically true (Coolangatta and
  // Tweed Heads share a street).
  const rest = clusters
    .map((c, i) => ({ c, i }))
    .filter((e) => e.i !== ci && e.c.some((t) => region.towns.includes(t)))
    .sort(byDistanceFrom(ci))
    .flatMap((e) => e.c)
    .filter((t) => region.towns.includes(t) && !inCluster.includes(t) && t !== town);

  return [...inCluster, ...rest].slice(0, NEARBY_COUNT);
};

// Build-time guard, not a runtime one: a town in locations.ts that nobody put
// in a cluster falls back to region order, which is the behaviour that
// produced the Ballina bug. Better to fail the build than to ship it again.
const clustered = new Set(clusters.flat());
const unclustered = regions.flatMap((r) => r.towns).filter((t) => !clustered.has(t));
if (unclustered.length > 0) {
  throw new Error(
    `townPages.ts: these towns are in locations.ts but not in any cluster, so their ` +
      `"nearby" list would fall back to region order: ${unclustered.join(', ')}. ` +
      `Add each one to the right cluster above.`,
  );
}
const strays = clusters.flat().filter((t) => !regions.some((r) => r.towns.includes(t)));
if (strays.length > 0) {
  throw new Error(
    `townPages.ts: these towns are in a cluster but not in locations.ts, so nothing ` +
      `links to them and their pages don't exist: ${strays.join(', ')}.`,
  );
}

// Reuses locations.ts' own slug derivation rather than a second copy of the
// same rule — the whole point being that the mega-menu's hrefs and these
// pages' URLs can never disagree.
const slugOf = (town: string) => town.toLowerCase().replace(/\s+/g, '-');

export const townPages: TownPage[] = regions.flatMap((region) =>
  region.towns.map((town) => {
    const override = townOverrides[town] ?? {};
    // townHeroes wins; the region photo is the fallback for a town whose
    // scene has not been generated yet. `override.hero` still beats the
    // coastal/region guess, so a hand-set region photo keeps working.
    const heroKey = override.hero ?? (coastalTowns.has(town) ? 'coastal-home' : region.hero);
    return {
      town,
      slug: slugOf(town),
      region,
      nearby: override.nearby ?? nearbyFor(town, region),
      hero: townHeroes[town] ?? heroImages[heroKey],
      local: override.local ?? [],
    };
  }),
);
