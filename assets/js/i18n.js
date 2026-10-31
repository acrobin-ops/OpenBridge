/**
 * OpenBridge — Bilingual Localization Engine (English / Español)
 * Powers zero-barrier onboarding for bilingual and Hispanic-Serving Institution (HSI) students.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 let currentLang = localStorage.getItem('openbridge_lang') || 'en';

 function getLang() {
 return currentLang;
 }

 function setLang(lang) {
 if (lang !== 'en' && lang !== 'es') return;
 currentLang = lang;
 localStorage.setItem('openbridge_lang', currentLang);
 applyI18n();
 window.dispatchEvent(new CustomEvent('openbridge:langchange', { detail: { lang: currentLang } }));
 }

 function toggleLang() {
 setLang(currentLang === 'en' ? 'es' : 'en');
 if (window.OpenBridge.sound) {
 window.OpenBridge.sound.play('click');
 }
 }

 function applyI18n() {
 if (typeof i18nStrings === 'undefined') return;
 const dict = i18nStrings[currentLang];
 if (!dict) return;

 document.querySelectorAll('[data-i18n]').forEach(el => {
 const key = el.getAttribute('data-i18n');
 if (dict[key]) {
 el.textContent = dict[key];
 }
 });

 const labelEn = document.getElementById('lang-label');
 const labelEs = document.getElementById('lang-label-alt');
 if (labelEn && labelEs) {
 labelEn.className = currentLang === 'en' ? 'text-sky-400 font-bold' : 'text-slate-400';
 labelEs.className = currentLang === 'es' ? 'text-sky-400 font-bold' : 'text-slate-400';
 }
 }

 window.OpenBridge.i18n = {
 getLang: getLang,
 setLang: setLang,
 toggle: toggleLang,
 apply: applyI18n
 };

 // Backwards compatibility
 window.currentLang = currentLang;
 window.applyI18n = applyI18n;
})();
