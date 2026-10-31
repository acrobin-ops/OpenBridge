/**
 * OpenBridge — Main Application Bootstrapper
 * Initializes components gracefully based on current page markup.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Localization
  if (window.OpenBridge.i18n) {
    window.OpenBridge.i18n.apply();
  }

  // 2. Initialize Common UI Controls (Navigation, Branding, Audio, Toasts)
  if (window.OpenBridge.common) {
    window.OpenBridge.common.initHeaderControls();
    window.OpenBridge.common.initJargonPopovers();
  }

  // 3. Tab Switching for All-in-One SPA View (if present)
  const tabBtns = document.querySelectorAll('.nav-tab-btn[data-tab]');
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        if (!target) return;

        if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');

        // Update tab buttons
        tabBtns.forEach(b => {
          b.className = 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all flex items-center gap-1.5';
        });
        btn.className = 'nav-tab-btn px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all bg-orange-500 text-white shadow-sm flex items-center gap-1.5';

        // Hide all tab panels
        document.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.add('hidden');
        });

        // Show active tab panel
        const activePanel = document.getElementById(`tab-${target}`);
        if (activePanel) {
          activePanel.classList.remove('hidden');
        }
      });
    });
  }

  // 4. Feature Module Initializations (Auto-detecting current page DOM)
  if (document.getElementById('quest-list-container') && window.OpenBridge.simulator) {
    window.OpenBridge.simulator.init();
  }

  if (document.getElementById('viz-step-buttons') && window.OpenBridge.visualizer) {
    window.OpenBridge.visualizer.init();
  }

  if (document.getElementById('issues-grid') && window.OpenBridge.issues) {
    window.OpenBridge.issues.init();
  }

  if (document.getElementById('glossary-grid') && window.OpenBridge.glossary) {
    window.OpenBridge.glossary.init();
  }

  if (document.getElementById('config-json-preview') && window.OpenBridge.config) {
    window.OpenBridge.config.init();
  }
});
