'use strict';

// Keep build verification outside scripts/, which Hexo executes as plugins.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../public');
const files = fs.readdirSync(root, { recursive: true }).filter(file => file.endsWith('.html'));
assert(files.length > 0, 'Run npm run build before checking the theme');
let links = 0;
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  assert(html.includes('<main id="main">'), `${file}: missing main landmark`);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: expected one page heading`);
  assert(html.includes('id="search-dialog"'), `${file}: missing search dialog`);
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const url = new URL(match[1], 'https://garden.test/' + file);
    if (url.origin !== 'https://garden.test') continue;
    const pathname = decodeURIComponent(url.pathname);
    const target = path.join(root, pathname, pathname.endsWith('/') ? 'index.html' : '');
    assert(fs.existsSync(target), `${file}: broken link ${match[1]}`);
    if (url.hash && target.endsWith('.html')) {
      const content = fs.readFileSync(target, 'utf8');
      const fragment = decodeURIComponent(url.hash.slice(1));
      assert(content.includes(`id="${fragment}"`), `${file}: missing anchor ${match[1]}`);
    }
    links++;
  }
}
assert(fs.readFileSync(path.join(root, 'search.xml'), 'utf8').includes('<entry>'), 'Search index must contain the published article');
console.log(`Verified ${files.length} pages and ${links} local links, assets and anchors.`);
