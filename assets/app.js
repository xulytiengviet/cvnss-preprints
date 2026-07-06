const state = { papers: [], category: 'all', year: 'all', query: '' };

function unique(values) { return [...new Set(values.filter(Boolean))].sort(); }
function el(tag, className, html) { const node = document.createElement(tag); if (className) node.className = className; if (html) node.innerHTML = html; return node; }
function safe(text = '') { return String(text).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

async function loadPapers() {
  const res = await fetch('data/papers.json');
  state.papers = await res.json();
  initFilters();
  render();
}

function initFilters() {
  const categories = unique(state.papers.flatMap(p => p.categories || []));
  const years = unique(state.papers.map(p => String(p.year)));
  document.getElementById('paperCount').textContent = state.papers.length;
  document.getElementById('versionCount').textContent = state.papers.reduce((sum, p) => sum + (p.versions?.length || 1), 0);
  document.getElementById('categoryCount').textContent = categories.length;

  const categoryFilter = document.getElementById('categoryFilter');
  categories.forEach(cat => categoryFilter.appendChild(new Option(cat, cat)));
  categoryFilter.addEventListener('change', e => { state.category = e.target.value; render(); });

  const yearFilter = document.getElementById('yearFilter');
  years.reverse().forEach(year => yearFilter.appendChild(new Option(year, year)));
  yearFilter.addEventListener('change', e => { state.year = e.target.value; render(); });

  document.getElementById('searchInput').addEventListener('input', e => { state.query = e.target.value.toLowerCase(); render(); });

  const chips = document.getElementById('categories');
  const allChip = el('button', 'chip active', 'Tất cả');
  allChip.onclick = () => { state.category = 'all'; categoryFilter.value = 'all'; render(); };
  chips.appendChild(allChip);
  categories.forEach(cat => {
    const chip = el('button', 'chip', cat);
    chip.dataset.category = cat;
    chip.onclick = () => { state.category = cat; categoryFilter.value = cat; render(); };
    chips.appendChild(chip);
  });
}

function render() {
  document.querySelectorAll('.chip').forEach(chip => chip.classList.toggle('active', (chip.dataset.category || 'all') === state.category));
  const list = document.getElementById('paperList');
  list.innerHTML = '';
  const papers = state.papers.filter(p => {
    const blob = [p.id, p.title, ...(p.authors || []), ...(p.keywords || []), p.abstract].join(' ').toLowerCase();
    const categoryOk = state.category === 'all' || (p.categories || []).includes(state.category);
    const yearOk = state.year === 'all' || String(p.year) === state.year;
    const queryOk = !state.query || blob.includes(state.query);
    return categoryOk && yearOk && queryOk;
  }).sort((a, b) => String(b.submitted).localeCompare(String(a.submitted)));

  if (!papers.length) {
    list.appendChild(el('div', 'empty', 'Không tìm thấy preprint phù hợp.'));
    return;
  }

  papers.forEach(p => {
    const card = el('article', 'paper-card');
    const latest = p.versions?.[p.versions.length - 1];
    const doiBadge = p.doi ? 'DOI' : 'DOI pending';
    const badges = [
      `<span class="badge">${safe(p.id)}</span>`,
      `<span class="badge green">${safe(p.status || 'preprint')}</span>`,
      `<span class="badge orange">v${safe(latest?.version || p.version || '1')}</span>`,
      `<span class="badge">${safe(doiBadge)}</span>`,
      ...(p.categories || []).map(cat => `<span class="badge">${safe(cat)}</span>`)
    ].join('');
    const links = [
      p.pdf ? `<a class="primary-link" href="${safe(p.pdf)}">PDF</a>` : '',
      p.source ? `<a href="${safe(p.source)}">Source</a>` : '',
      p.code ? `<a href="${safe(p.code)}">GitHub</a>` : '',
      p.data ? `<a href="${safe(p.data)}">Data</a>` : '',
      p.doi ? `<a href="https://doi.org/${safe(p.doi)}">DOI</a>` : '',
      p.bibtex ? `<a href="${safe(p.bibtex)}">BibTeX</a>` : ''
    ].filter(Boolean).join('');
    card.innerHTML = `
      <div class="paper-meta">${badges}</div>
      <h3>${safe(p.title)}</h3>
      <div class="authors">${safe((p.authors || []).join(', '))}</div>
      <p class="abstract">${safe(p.abstract)}</p>
      <div class="paper-small">Submitted: ${safe(p.submitted || '')} · License: ${safe(p.license || 'see metadata')} · ${p.doi ? `DOI: ${safe(p.doi)}` : 'DOI: pending Zenodo release'}</div>
      <div class="links">${links || '<span class="badge">Chưa gắn tệp PDF/DOI</span>'}</div>
    `;
    list.appendChild(card);
  });
}

loadPapers().catch(err => {
  document.getElementById('paperList').innerHTML = `<div class="empty">Lỗi tải data/papers.json: ${safe(err.message)}</div>`;
});
