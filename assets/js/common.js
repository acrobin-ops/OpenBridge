/**
 * OpenBridge — Common UI Utilities, Toasts, Jargon Popovers & Global State
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 const state = {
 currentOrgBadge: localStorage.getItem('openbridge_org') || 'UTSA OSPO',
 currentPortalTitle: localStorage.getItem('openbridge_title') || 'OpenBridge',
 currentRepo: localStorage.getItem('openbridge_repo') || 'utsa-ospo/student-launchpad'
 };

 function showToast(msg, icon = '') {
 const container = document.getElementById('toast-container');
 if (!container) return;
 const toast = document.createElement('div');
 toast.className = 'px-4 py-3 rounded-xl bg-slate-900/95 border border-orange-500/40 text-white text-xs font-medium shadow-2xl flex items-center gap-2 transition-all transform translate-y-2 opacity-0';
 toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
 container.appendChild(toast);

 requestAnimationFrame(() => {
 toast.classList.remove('translate-y-2', 'opacity-0');
 });

 setTimeout(() => {
 toast.style.opacity = '0';
 toast.style.transform = 'translate-y-2';
 setTimeout(() => toast.remove(), 250);
 }, 3200);
 }

 function initJargonPopovers() {
 const popover = document.getElementById('jargon-popover');
 if (!popover || typeof glossaryTerms === 'undefined') return;

 document.querySelectorAll('.jargon-highlight').forEach(el => {
 el.addEventListener('mouseenter', () => {
 const termName = el.getAttribute('data-term');
 if (!termName) return;
 const entry = glossaryTerms.find(g => g.term.toLowerCase() === termName.toLowerCase());
 if (!entry) return;

 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

 document.getElementById('popover-term').textContent = `${entry.term} (${entry.esTerm})`;
 document.getElementById('popover-desc').textContent = lang === 'en' ? entry.enDef : entry.esDef;
 document.getElementById('popover-analogy').textContent = lang === 'en' ? entry.enAnalogy : entry.esAnalogy;

 const rect = el.getBoundingClientRect();
 popover.style.left = `${Math.min(window.innerWidth - 320, Math.max(10, rect.left - 40))}px`;
 popover.style.top = `${rect.bottom + 8}px`;
 popover.classList.remove('hidden');
 });

 el.addEventListener('mouseleave', () => {
 popover.classList.add('hidden');
 });
 });
 }

 function applyBranding() {
 const brandTitle = document.getElementById('brand-title');
 const brandBadge = document.getElementById('brand-badge');
 if (brandTitle) brandTitle.textContent = state.currentPortalTitle;
 if (brandBadge) brandBadge.textContent = state.currentOrgBadge;
 }

 function highlightActiveNavLink() {
 const path = window.location.pathname;
 const page = path.split('/').pop() || 'index.html';

 document.querySelectorAll('.nav-tab-btn').forEach(btn => {
 const href = btn.getAttribute('href');
 if (href && (href === page || (page === '' && href === 'index.html'))) {
 btn.classList.add('bg-orange-500', 'text-white', 'shadow-sm');
 btn.classList.remove('text-slate-300', 'hover:text-white', 'hover:bg-slate-800/60');
 }
 });
 }

 function initHeaderControls() {
 const langBtn = document.getElementById('lang-toggle-btn');
 if (langBtn && window.OpenBridge.i18n) {
 langBtn.addEventListener('click', () => {
 window.OpenBridge.i18n.toggle();
 });
 }

 const soundBtn = document.getElementById('sound-toggle-btn');
 if (soundBtn && window.OpenBridge.sound) {
 soundBtn.addEventListener('click', () => {
 window.OpenBridge.sound.toggle();
 const enabled = window.OpenBridge.sound.isEnabled();
 showToast(enabled ? 'Sound effects enabled' : 'Sound muted', enabled ? 'Audio: ON' : 'Audio: OFF');
 });
 window.OpenBridge.sound.updateUI();
 }

 applyBranding();
 highlightActiveNavLink();
 }

 window.OpenBridge.state = state;
 window.OpenBridge.common = {
 showToast: showToast,
 initJargonPopovers: initJargonPopovers,
 applyBranding: applyBranding,
 initHeaderControls: initHeaderControls
 };

 // Backwards compatibility
 window.showToast = showToast;
})();
