// Checks .pages.yml against the content files it edits. See PAGES-CMS-PLAN.md.
//
// The build already validates each content file against its page's Zod
// schema (src/lib/cms-schemas.ts). This covers the other side: that Pages CMS
// can actually edit what is in the file. It fails when
//   - a content file has a key .pages.yml does not describe (an editor would
//     never see it, and the page would carry a value nobody can change),
//   - a field marked required in .pages.yml is missing from the file,
//   - a block's type is not one .pages.yml offers,
//   - .pages.yml points at a component or a file that does not exist.
//
// Collections (a folder of files, e.g. src/content/towns) are checked file by
// file.
//
// Run: npm run check-cms

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { parse } from 'yaml';

const config = parse(readFileSync('.pages.yml', 'utf8'));
const components = config.components ?? {};
const problems = [];

/** A field with its component reference expanded. Field-level keys override
 *  the component's, as they do in Pages CMS. */
function resolve(field, where) {
  if (!field.component) return field;
  const base = components[field.component];
  if (!base) {
    problems.push(`${where}: unknown component "${field.component}"`);
    return { ...field, type: 'unknown' };
  }
  const { component, ...overrides } = field;
  return resolve({ ...base, ...overrides }, where);
}

function isList(field) {
  return field.list === true || (typeof field.list === 'object' && field.list !== null);
}

function checkFields(fields, data, where) {
  if (data === null || data === undefined) return;
  if (typeof data !== 'object' || Array.isArray(data)) {
    problems.push(`${where}: expected a group of fields, found ${JSON.stringify(data).slice(0, 60)}`);
    return;
  }
  const byName = new Map(fields.map((f) => [f.name, resolve(f, `${where}${f.name}`)]));
  for (const [key, value] of Object.entries(data)) {
    const field = byName.get(key);
    if (!field) {
      problems.push(`${where}${key}: in the content file but not in .pages.yml`);
      continue;
    }
    checkValue(field, value, `${where}${key}`);
  }
  for (const [name, field] of byName) {
    if (field.required && !(name in data)) problems.push(`${where}${name}: required in .pages.yml but missing`);
  }
}

function checkValue(field, value, where) {
  if (value === null || value === undefined) return;
  if (isList(field)) {
    if (!Array.isArray(value)) {
      problems.push(`${where}: .pages.yml expects a list`);
      return;
    }
    value.forEach((item, i) => checkOne(field, item, `${where}[${i}]`));
    return;
  }
  checkOne(field, value, where);
}

function checkOne(field, value, where) {
  if (field.type === 'object') {
    checkFields(field.fields ?? [], value, `${where}.`);
  } else if (field.type === 'block') {
    const key = field.blockKey ?? '_block';
    const block = (field.blocks ?? []).find((b) => b.name === value?.[key]);
    if (!block) {
      problems.push(`${where}: block type "${value?.[key]}" is not offered in .pages.yml`);
      return;
    }
    const { [key]: _, ...rest } = value;
    const blockFields = block.component ? resolve(block, where).fields : block.fields;
    checkFields(blockFields ?? [], rest, `${where}.`);
  } else if (field.type === 'select') {
    const allowed = (field.options?.values ?? []).map((v) => (typeof v === 'object' ? v.name : v));
    const chosen = field.options?.multiple ? (Array.isArray(value) ? value : [value]) : [value];
    for (const v of chosen) {
      if (!allowed.includes(v)) problems.push(`${where}: "${v}" is not one of the options in .pages.yml`);
    }
  }
}

/** Every file entry, through groups. Collections are checked file by file. */
function entries(items) {
  return items.flatMap((item) => (item.type === 'group' ? entries(item.items ?? []) : [item]));
}

let files = 0;
for (const entry of entries(config.content ?? [])) {
  if (!existsSync(entry.path)) {
    problems.push(`${entry.name}: ${entry.path} does not exist`);
    continue;
  }
  const paths =
    entry.type === 'collection'
      ? readdirSync(entry.path)
          .filter((name) => /\.ya?ml$/.test(name))
          .map((name) => `${entry.path}/${name}`)
      : [entry.path];
  for (const path of paths) {
    files++;
    checkFields(entry.fields ?? [], parse(readFileSync(path, 'utf8')), `${path}: `);
  }
}

// Every content file must be reachable from the editor: a file with no entry
// in .pages.yml is content nobody can change.
const covered = new Set();
for (const entry of entries(config.content ?? [])) {
  if (!existsSync(entry.path)) continue;
  if (entry.type === 'collection') {
    for (const name of readdirSync(entry.path)) covered.add(`${entry.path}/${name}`);
  } else {
    covered.add(entry.path);
  }
}
function contentFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? contentFiles(`${dir}/${d.name}`) : /\.ya?ml$/.test(d.name) ? [`${dir}/${d.name}`] : [],
  );
}
for (const path of contentFiles('src/content')) {
  if (!covered.has(path)) problems.push(`${path}: has no entry in .pages.yml, so nobody can edit it`);
}

if (problems.length) {
  console.log(problems.map((p) => `  - ${p}`).join('\n'));
  console.log(`\n${problems.length} problem(s) between .pages.yml and the content files.`);
  process.exit(1);
}
console.log(`.pages.yml and ${files} content file(s) agree.`);
