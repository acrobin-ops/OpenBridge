/**
 * OpenBridge — Bilingual Jargon Decoder & Custom Term Manager
 * Plain-language translations & real-world analogies for intimidating open-source jargon.
 * Supports adding, persisting (localStorage), and searching custom user terms.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
  const STORAGE_KEY = 'openbridge_custom_jargon_terms';

  function getCustomTerms() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomTerms(terms) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
    } catch (e) {}
  }

  function getAllTerms() {
    const base = typeof glossaryTerms !== 'undefined' ? [...glossaryTerms] : [];
    const custom = getCustomTerms();
    // Merge base + custom, avoiding duplicate terms by name
    const customNames = new Set(custom.map(c => c.term.toLowerCase()));
    const merged = [
      ...custom,
      ...base.filter(b => !customNames.has(b.term.toLowerCase()))
    ];
    // Update global reference so hover tooltips across pages know about new terms
    if (typeof window.glossaryTerms !== 'undefined') {
      window.glossaryTerms = merged;
    }
    return merged;
  }

  function renderGlossary(searchQuery = '') {
    const grid = document.getElementById('glossary-grid');
    if (!grid) return;

    const all = getAllTerms();
    const q = (searchQuery || '').trim().toLowerCase();
    const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

    const filtered = all.filter(item =>
      (item.term && item.term.toLowerCase().includes(q)) ||
      (item.esTerm && item.esTerm.toLowerCase().includes(q)) ||
      (item.enDef && item.enDef.toLowerCase().includes(q)) ||
      (item.esDef && item.esDef.toLowerCase().includes(q))
    );

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <p class="font-semibold text-white">No jargon terms found matching "${searchQuery}"</p>
          <p class="text-xs text-slate-500 mt-1">Click "+ Add Custom Term" above to add it to your dictionary!</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(item => `
      <div class="p-4 sm:p-5 rounded-2xl bg-slate-950 border ${item.isCustom ? 'border-orange-500/40 ring-1 ring-orange-500/20' : 'border-slate-800 hover:border-slate-700'} space-y-3 transition-all flex flex-col justify-between">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="text-base font-extrabold text-white">${escapeHtml(item.term)}</span>
              ${item.isCustom ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">Custom</span>' : ''}
            </div>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-sky-400 border border-slate-800">${escapeHtml(item.esTerm || item.term)}</span>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${escapeHtml(lang === 'en' ? item.enDef : (item.esDef || item.enDef))}</p>
          
          <div class="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] sm:text-xs text-amber-300/90 leading-relaxed">
            <span class="font-bold block text-amber-400 mb-0.5">Analogy:</span>
            ${escapeHtml(lang === 'en' ? item.enAnalogy : (item.esAnalogy || item.enAnalogy))}
          </div>
        </div>

        ${item.isCustom ? `
          <div class="pt-2 border-t border-slate-900 flex justify-end">
            <button data-delete-term="${escapeHtml(item.term)}" class="delete-custom-term-btn text-xs text-rose-400 hover:text-rose-300 transition-colors">
              Delete Custom Term
            </button>
          </div>
        ` : ''}
      </div>
    `).join('');

    // Bind delete buttons for custom terms
    grid.querySelectorAll('.delete-custom-term-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const termName = e.target.getAttribute('data-delete-term');
        if (termName) {
          deleteCustomTerm(termName);
        }
      });
    });
  }

  function addCustomTerm(termData) {
    const custom = getCustomTerms();
    const existingIndex = custom.findIndex(c => c.term.toLowerCase() === termData.term.toLowerCase());
    const newEntry = {
      ...termData,
      isCustom: true,
      esTerm: termData.esTerm || termData.term,
      esDef: termData.esDef || termData.enDef,
      esAnalogy: termData.esAnalogy || termData.enAnalogy
    };

    if (existingIndex >= 0) {
      custom[existingIndex] = newEntry;
    } else {
      custom.unshift(newEntry);
    }

    saveCustomTerms(custom);
    renderGlossary(document.getElementById('glossary-search-input')?.value || '');

    if (window.OpenBridge.sound) window.OpenBridge.sound.play('success');
    if (window.OpenBridge.common) {
      window.OpenBridge.common.showToast(`Added "${termData.term}" to Jargon Decoder!`);
      window.OpenBridge.common.initJargonPopovers();
    }
  }

  function deleteCustomTerm(termName) {
    const custom = getCustomTerms().filter(c => c.term.toLowerCase() !== termName.toLowerCase());
    saveCustomTerms(custom);
    renderGlossary(document.getElementById('glossary-search-input')?.value || '');
    if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
    if (window.OpenBridge.common) {
      window.OpenBridge.common.showToast(`Removed "${termName}"`);
      window.OpenBridge.common.initJargonPopovers();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function initGlossary() {
    renderGlossary('');

    const searchInput = document.getElementById('glossary-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderGlossary(e.target.value);
      });
    }

    // Modal toggle for Adding a Term
    const openModalBtn = document.getElementById('open-add-term-btn');
    const modal = document.getElementById('add-term-modal');
    const cancelModalBtn = document.getElementById('cancel-add-term-btn');
    const form = document.getElementById('add-term-form');

    if (openModalBtn && modal) {
      openModalBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
        document.getElementById('new-term-name')?.focus();
      });
    }

    if (cancelModalBtn && modal) {
      cancelModalBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    if (form && modal) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const term = document.getElementById('new-term-name')?.value.trim();
        const esTerm = document.getElementById('new-term-es')?.value.trim();
        const enDef = document.getElementById('new-term-def')?.value.trim();
        const enAnalogy = document.getElementById('new-term-analogy')?.value.trim();

        if (!term || !enDef) {
          alert('Please enter at least the term name and its plain-language definition.');
          return;
        }

        addCustomTerm({
          term: term,
          esTerm: esTerm || term,
          enDef: enDef,
          enAnalogy: enAnalogy || 'Real-world comparison: Everyday collaborative concept.'
        });

        form.reset();
        modal.classList.add('hidden');
      });
    }

    window.addEventListener('openbridge:langchange', () => {
      renderGlossary(searchInput ? searchInput.value : '');
    });
  }

  window.OpenBridge.glossary = {
    init: initGlossary,
    render: renderGlossary,
    addTerm: addCustomTerm,
    deleteTerm: deleteCustomTerm,
    getAllTerms: getAllTerms
  };
})();
