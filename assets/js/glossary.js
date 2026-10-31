/**
 * OpenBridge — Bilingual Jargon Decoder & Search
 * Plain-language translations & real-world analogies for intimidating open-source jargon.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
  function renderGlossary(searchQuery = '') {
    const grid = document.getElementById('glossary-grid');
    if (!grid || typeof glossaryTerms === 'undefined') return;

    const q = (searchQuery || '').trim().toLowerCase();
    const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

    const filtered = glossaryTerms.filter(item =>
      item.term.toLowerCase().includes(q) ||
      item.esTerm.toLowerCase().includes(q) ||
      item.enDef.toLowerCase().includes(q) ||
      item.esDef.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <p class="text-3xl mb-2">🔍</p>
          <p class="font-semibold text-white">No jargon terms found matching "${searchQuery}"</p>
          <p class="text-xs text-slate-500 mt-1">Try searching for Fork, PR, Rebase, or Upstream.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 space-y-2.5 transition-all">
        <div class="flex items-center justify-between">
          <span class="text-base font-extrabold text-white">${item.term}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-sky-400 border border-slate-800">${item.esTerm}</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${lang === 'en' ? item.enDef : item.esDef}</p>
        <div class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-amber-300/90 leading-relaxed">
          ${lang === 'en' ? item.enAnalogy : item.esAnalogy}
        </div>
      </div>
    `).join('');
  }

  function initGlossary() {
    renderGlossary('');

    const searchInput = document.getElementById('glossary-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderGlossary(e.target.value);
      });
    }

    window.addEventListener('openbridge:langchange', () => {
      renderGlossary(searchInput ? searchInput.value : '');
    });
  }

  window.OpenBridge.glossary = {
    init: initGlossary,
    render: renderGlossary
  };
})();
