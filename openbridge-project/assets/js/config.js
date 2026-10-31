/**
 * OpenBridge — Club Reusability & `club.config.json` Builder
 * Empowers any university OSPO, ACM chapter, or high school club to customize OpenBridge in 60 seconds.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 function updateClubConfigPreview() {
 const orgInput = document.getElementById('cfg-org-input');
 const titleInput = document.getElementById('cfg-title-input');
 const repoInput = document.getElementById('cfg-repo-input');
 const previewEl = document.getElementById('config-json-preview');

 if (!previewEl) return;

 const org = (orgInput && orgInput.value.trim()) || 'UTSA OSPO';
 const title = (titleInput && titleInput.value.trim()) || 'OpenBridge';
 const repo = (repoInput && repoInput.value.trim()) || 'utsa-ospo/student-launchpad';

 const configObj = {
 portalTitle: title,
 organizationBadge: org,
 defaultPracticeRepo: repo,
 license: 'MIT',
 bilingualLocales: ['en', 'es'],
 tracksEnabled: ['docs-fix', 'es-translation', 'wall-of-fame', 'css-theme']
 };

 previewEl.textContent = JSON.stringify(configObj, null, 2);
 }

 function initConfig() {
 ['cfg-org-input', 'cfg-title-input', 'cfg-repo-input'].forEach(id => {
 const el = document.getElementById(id);
 if (el) {
 el.addEventListener('input', updateClubConfigPreview);
 }
 });

 const applyBtn = document.getElementById('apply-config-btn');
 if (applyBtn) {
 applyBtn.addEventListener('click', () => {
 const org = (document.getElementById('cfg-org-input')?.value.trim()) || 'UTSA OSPO';
 const title = (document.getElementById('cfg-title-input')?.value.trim()) || 'OpenBridge';
 const repo = (document.getElementById('cfg-repo-input')?.value.trim()) || 'utsa-ospo/student-launchpad';

 if (window.OpenBridge.state) {
 window.OpenBridge.state.currentOrgBadge = org;
 window.OpenBridge.state.currentPortalTitle = title;
 window.OpenBridge.state.currentRepo = repo;
 }

 localStorage.setItem('openbridge_org', org);
 localStorage.setItem('openbridge_title', title);
 localStorage.setItem('openbridge_repo', repo);

 const badgeEl = document.getElementById('brand-badge');
 const titleEl = document.getElementById('brand-title');
 if (badgeEl) badgeEl.textContent = org;
 if (titleEl) titleEl.textContent = title;

 if (window.OpenBridge.sound) window.OpenBridge.sound.play('success');
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast(`Live branding applied: ${title} (${org})!`, '');
 }
 });
 }

 const copyBtn = document.getElementById('copy-config-btn');
 if (copyBtn) {
 copyBtn.addEventListener('click', () => {
 const previewEl = document.getElementById('config-json-preview');
 const text = previewEl ? previewEl.textContent : '';

 try {
 navigator.clipboard.writeText(text);
 } catch (e) {
 const ta = document.createElement('textarea');
 ta.value = text;
 document.body.appendChild(ta);
 ta.select();
 document.execCommand('copy');
 ta.remove();
 }

 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast('Copied club.config.json to clipboard!', '');
 }
 });
 }

 updateClubConfigPreview();
 }

 window.OpenBridge.config = {
 init: initConfig,
 updatePreview: updateClubConfigPreview
 };
})();
