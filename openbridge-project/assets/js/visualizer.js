/**
 * OpenBridge — Git vs Plain English Visualizer
 * Demystifies terminal commands using the interactive Potluck Analogy.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
  function renderVisualizerStep(stepIdx) {
    if (typeof vizSteps === 'undefined') return;
    const data = vizSteps[stepIdx] || vizSteps[0];

    const titleEl = document.getElementById('viz-analogy-title');
    const bodyEl = document.getElementById('viz-analogy-body');
    const webTitleEl = document.getElementById('viz-web-title');
    const webBodyEl = document.getElementById('viz-web-body');
    const cliCodeEl = document.getElementById('viz-cli-code');
    const cliNoteEl = document.getElementById('viz-cli-note');

    if (titleEl) titleEl.textContent = data.analogyTitle;
    if (bodyEl) bodyEl.textContent = data.analogyBody;
    if (webTitleEl) webTitleEl.textContent = data.webTitle;
    if (webBodyEl) webBodyEl.textContent = data.webBody;
    if (cliCodeEl) cliCodeEl.textContent = data.cliCode;
    if (cliNoteEl) cliNoteEl.textContent = data.cliNote;

    document.querySelectorAll('.viz-btn').forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-viz'), 10);
      if (idx === stepIdx) {
        btn.className = 'viz-btn p-3 rounded-xl border border-orange-500 bg-orange-500/15 text-left transition-all';
      } else {
        btn.className = 'viz-btn p-3 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800/70 text-left transition-all';
      }
    });
  }

  function initVisualizer() {
    renderVisualizerStep(0);

    document.querySelectorAll('.viz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-viz'), 10);
        if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
        renderVisualizerStep(idx);
      });
    });
  }

  window.OpenBridge.visualizer = {
    init: initVisualizer,
    renderStep: renderVisualizerStep
  };
})();
