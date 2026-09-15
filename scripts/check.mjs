import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '..');
function walk(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(e => e.name.startsWith('.') ? [] : e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]); }
const files = walk(root);
let checked = 0;
for (const file of files) {
  if (file.endsWith('.js') || file.endsWith('.mjs')) execFileSync(process.execPath, ['--check', file]);
  if (file.endsWith('.json')) JSON.parse(readFileSync(file, 'utf8'));
  if (!file.endsWith('.html') && !file.endsWith('.css')) continue;
  const text = readFileSync(file, 'utf8');
  const links = file.endsWith('.html') ? [...text.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m => m[1]) : [...text.matchAll(/url\(["']?([^"')]+)["']?\)/g)].map(m => m[1]);
  for (const url of links) {
    if (/^(https?:|data:|mailto:|tel:)/.test(url)) continue;
    if (!existsSync(resolve(dirname(file), url.split(/[?#]/)[0]))) throw new Error(`Broken local link in ${file}: ${url}`);
    checked++;
  }
}
for (const worker of JSON.parse(readFileSync(join(root, 'data/workers.json')))) {
  if (!existsSync(join(root, worker.image))) throw new Error(`Missing portrait: ${worker.image}`);
}
console.log(`Checks passed: JavaScript syntax, JSON, worker portraits and ${checked} local references.`);
