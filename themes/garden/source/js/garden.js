'use strict';

const themeToggle = document.querySelector('.theme-toggle');
function updateThemeLabel() {
  themeToggle.setAttribute('aria-label', document.documentElement.dataset.theme === 'dark' ? '切换为浅色主题' : '切换为深色主题');
}
updateThemeLabel();
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('nova-theme', theme); } catch (_) {}
  updateThemeLabel();
});

const dialog = document.getElementById('search-dialog');
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
let entriesPromise;

function searchMessage(message) {
  const paragraph = document.createElement('p');
  paragraph.textContent = message;
  results.replaceChildren(paragraph);
}

async function loadEntries() {
  if (!entriesPromise) {
    entriesPromise = fetch(dialog.dataset.source).then(response => {
      if (!response.ok) throw new Error('Search index unavailable');
      return response.text();
    }).then(xml => {
      const document = new DOMParser().parseFromString(xml, 'text/xml');
      if (document.querySelector('parsererror')) throw new Error('Invalid search index');
      return [...document.querySelectorAll('entry')].map(entry => ({
        title: entry.querySelector('title')?.textContent || '',
        url: entry.querySelector('url')?.textContent || '/',
        content: new DOMParser().parseFromString(entry.querySelector('content')?.textContent || '', 'text/html').body.textContent || ''
      }));
    }).catch(error => { entriesPromise = undefined; throw error; });
  }
  return entriesPromise;
}

async function search() {
  const query = input.value.trim().toLocaleLowerCase();
  if (!query) { searchMessage('输入关键词，寻找一篇文章。'); return; }
  searchMessage('正在寻找…');
  try {
    const entries = await loadEntries();
    if (input.value.trim().toLocaleLowerCase() !== query) return;
    const matches = entries.filter(entry => query.split(/\s+/).every(word => (entry.title + ' ' + entry.content).toLocaleLowerCase().includes(word)));
    if (!matches.length) { searchMessage('还没有找到相关记录，试试其他关键词吧。'); return; }
    results.replaceChildren();
    matches.forEach(entry => {
      const url = new URL(entry.url, location.origin);
      if (url.origin !== location.origin) return;
      const link = document.createElement('a');
      link.className = 'search-result';
      link.href = url.pathname + url.search + url.hash;
      const title = document.createElement('strong');
      title.textContent = entry.title;
      const description = document.createElement('p');
      const position = Math.max(0, entry.content.toLocaleLowerCase().indexOf(query.split(/\s+/)[0]) - 25);
      description.textContent = (position ? '…' : '') + entry.content.slice(position, position + 110).replace(/\s+/g, ' ') + '…';
      link.append(title, description);
      results.append(link);
    });
  } catch (_) {
    searchMessage('搜索暂时不可用，请稍后重试。你也可以通过文章归档浏览。');
  }
}

function openSearch() {
  if (!dialog.open) dialog.showModal();
  input.focus();
}
document.querySelector('[data-open-search]').addEventListener('click', openSearch);
document.querySelector('[data-close-search]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
input.addEventListener('input', search);
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (dialog.open) dialog.close(); else openSearch();
  }
});
