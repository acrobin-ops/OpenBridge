/**
 * OpenBridge — Live Good First Issue Matcher
 * Helps students find vetted first issues across UTSA OSPO and real open-source repositories.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
  function renderLiveIssues(filterCategory = 'all') {
    const grid = document.getElementById('issues-grid');
    if (!grid || typeof liveIssues === 'undefined') return;

    const filtered = filterCategory === 'all'
      ? liveIssues
      : liveIssues.filter(item => item.category === filterCategory);

    grid.innerHTML = filtered.map(item => `
      <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex flex-col justify-between gap-3 transition-all hover:shadow-lg hover:shadow-slate-950/50">
        <div class="space-y-2">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-mono text-slate-400">${item.repo}</span>
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30">${item.categoryLabel}</span>
          </div>
          <h3 class="font-bold text-white text-sm sm:text-base leading-snug">${item.title}</h3>
          <div class="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
            <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">⚡ ${item.difficulty}</span>
            <span class="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">⏱ ${item.time}</span>
          </div>
        </div>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="mt-2 w-full py-2 px-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all">
          <span>View Issue on GitHub</span> <span>↗</span>
        </a>
      </div>
    `).join('');
  }

  function initIssues() {
    renderLiveIssues('all');

    document.querySelectorAll('.issue-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');

        document.querySelectorAll('.issue-filter-btn').forEach(b => {
          b.className = 'issue-filter-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800';
        });
        btn.className = 'issue-filter-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-orange-500 text-white';

        renderLiveIssues(filter);
      });
    });
  }

  window.OpenBridge.issues = {
    init: initIssues,
    render: renderLiveIssues
  };
})();
