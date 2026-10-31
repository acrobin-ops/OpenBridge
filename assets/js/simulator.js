/**
 * OpenBridge — Interactive Pull Request Simulator
 * A zero-barrier, browser-based sandboxed editor that mirrors professional GitHub PR workflows.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 let activeQuestId = 'docs-fix';
 let currentStep = 1;

 function getActiveQuest() {
 if (typeof quests === 'undefined') return null;
 return quests.find(q => q.id === activeQuestId) || quests[0];
 }

 function escapeHtml(str) {
 if (!str) return '';
 return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
 }

 function renderQuestList() {
 const container = document.getElementById('quest-list-container');
 if (!container || typeof quests === 'undefined') return;

 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

 container.innerHTML = quests.map(q => {
 const isSelected = q.id === activeQuestId;
 const title = lang === 'en' ? q.enTitle : q.esTitle;
 const story = lang === 'en' ? q.enStory : q.esStory;
 return `
 <div data-quest-id="${q.id}" class="quest-item-btn cursor-pointer p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
 isSelected
 ? 'bg-orange-500/10 border-orange-500 shadow-xl shadow-orange-500/10 ring-2 ring-orange-500/30'
 : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
 }">
 <div class="space-y-2.5">
 <div class="flex items-center justify-between gap-2">
 <span class="text-3xl">${q.icon}</span>
 <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-300 font-semibold border border-slate-700">${q.badgeTag}</span>
 </div>
 <div>
 <h3 class="font-bold text-white text-base sm:text-lg">${title}</h3>
 <p class="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">${story}</p>
 </div>
 </div>
 <div class="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
 <span class="font-mono text-slate-400"> ${q.file}</span>
 <span class="font-bold flex items-center gap-1 ${isSelected ? 'text-orange-400' : 'text-sky-400'}">
 ${isSelected ? 'Active Quest' : 'Start Quest →'}
 </span>
 </div>
 </div>
 `;
 }).join('');

 container.querySelectorAll('.quest-item-btn').forEach(btn => {
 btn.addEventListener('click', () => {
 const id = btn.getAttribute('data-quest-id');
 if (id) {
 activeQuestId = id;
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 loadActiveQuestIntoWorkspace();
 renderQuestList();
 setStepIndicator(2);
 const s2 = document.getElementById('step-section-2');
 if (s2) s2.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
 });
 });
 }

 function loadActiveQuestIntoWorkspace() {
 const q = getActiveQuest();
 if (!q) return;

 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

 const timeEl = document.getElementById('active-quest-time');
 const descEl = document.getElementById('active-quest-desc');
 const goalEl = document.getElementById('active-quest-goal');
 const branchEl = document.getElementById('current-branch-name');
 const fileEl = document.getElementById('current-file-name');
 const textarea = document.getElementById('sandbox-textarea');

 if (timeEl) timeEl.textContent = q.time;
 if (descEl) descEl.textContent = lang === 'en' ? q.enDesc : q.esDesc;
 if (goalEl) goalEl.textContent = lang === 'en' ? q.enGoal : q.esGoal;
 if (branchEl) branchEl.textContent = q.branch;
 if (fileEl) fileEl.textContent = q.file;

 if (textarea) textarea.value = q.initialCode;

 const prTitleInput = document.getElementById('pr-title-input');
 const prBodyInput = document.getElementById('pr-body-input');
 const botReviewCard = document.getElementById('bot-review-card');

 if (prTitleInput) prTitleInput.value = '';
 if (prBodyInput) prBodyInput.value = '';
 if (botReviewCard) botReviewCard.classList.add('hidden');

 updateDiffAndValidation();
 setStepIndicator(1);
 }

 function setStepIndicator(stepNum) {
 currentStep = stepNum;
 document.querySelectorAll('.step-pill').forEach(pill => {
 const s = parseInt(pill.getAttribute('data-step-nav'), 10);
 if (s === stepNum) {
 pill.className = 'step-pill flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 text-white shadow';
 } else if (s < stepNum) {
 pill.className = 'step-pill flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
 } else {
 pill.className = 'step-pill flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400';
 }
 });
 }

 function updateDiffAndValidation() {
 const q = getActiveQuest();
 const textarea = document.getElementById('sandbox-textarea');
 if (!q || !textarea) return;

 const currentText = textarea.value;
 const origLines = q.initialCode.split('\n');
 const newLines = currentText.split('\n');
 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

 let added = 0;
 let removed = 0;
 const diffHtml = [];
 const maxLen = Math.max(origLines.length, newLines.length);

 for (let i = 0; i < maxLen; i++) {
 const o = origLines[i];
 const n = newLines[i];
 if (o === n) {
 diffHtml.push(`<div class="px-2 py-0.5 text-slate-400"> ${escapeHtml(o || '')}</div>`);
 } else {
 if (o !== undefined) {
 removed++;
 diffHtml.push(`<div class="px-2 py-0.5 bg-rose-500/15 text-rose-300 border-l-2 border-rose-500">- ${escapeHtml(o)}</div>`);
 }
 if (n !== undefined) {
 added++;
 diffHtml.push(`<div class="px-2 py-0.5 bg-emerald-500/15 text-emerald-300 border-l-2 border-emerald-500">+ ${escapeHtml(n)}</div>`);
 }
 }
 }

 const diffOutput = document.getElementById('diff-output');
 const diffStatLabel = document.getElementById('diff-stat-label');
 if (diffOutput) diffOutput.innerHTML = diffHtml.join('');
 if (diffStatLabel) diffStatLabel.textContent = `+${added} -${removed} lines`;

 const isValid = q.validate(currentText);
 const pill = document.getElementById('validation-pill');
 const coachMsg = document.getElementById('rowdybot-coach-msg');

 if (pill) {
 if (isValid) {
 pill.className = 'text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
 pill.textContent = lang === 'en' ? ' Goal Completed! Ready for PR' : ' ¡Objetivo Logrado! Listo para PR';
 if (coachMsg) {
 coachMsg.textContent = lang === 'en'
 ? '"Awesome edit! Your diff looks super clean. Now scroll down to Step 3 and submit your Pull Request!"'
 : '"¡Excelente edición! Tus cambios se ven impecables. ¡Ahora baja al Paso 3 y envía tu Pull Request!"';
 }
 if (currentStep < 2) setStepIndicator(2);
 } else if (currentText !== q.initialCode) {
 pill.className = 'text-xs font-medium px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30';
 pill.textContent = lang === 'en' ? ' Editing in progress...' : ' Editando archivo...';
 if (currentStep < 2) setStepIndicator(2);
 } else {
 pill.className = 'text-xs font-medium px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30';
 pill.textContent = lang === 'en' ? ' Waiting for your edit...' : ' Esperando tu edición...';
 }
 }
 }

 function initSimulator() {
 renderQuestList();
 loadActiveQuestIntoWorkspace();

 const textarea = document.getElementById('sandbox-textarea');
 if (textarea) {
 textarea.addEventListener('input', () => {
 updateDiffAndValidation();
 });
 }

 // Editor vs Diff View Toggle
 const editBtn = document.getElementById('view-edit-btn');
 const diffBtn = document.getElementById('view-diff-btn');
 const editorPane = document.getElementById('editor-pane');
 const diffPane = document.getElementById('diff-pane');

 if (editBtn && diffBtn && editorPane && diffPane) {
 editBtn.addEventListener('click', () => {
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 editorPane.classList.remove('hidden');
 diffPane.classList.add('hidden');
 editBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-white border border-slate-700';
 diffBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white';
 });

 diffBtn.addEventListener('click', () => {
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 updateDiffAndValidation();
 editorPane.classList.add('hidden');
 diffPane.classList.remove('hidden');
 diffBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-white border border-slate-700';
 editBtn.className = 'px-3 py-1 rounded-lg text-xs font-semibold text-slate-400 hover:text-white';
 });
 }

 // Auto-Fill Guided Solution
 const hintBtn = document.getElementById('apply-hint-btn');
 if (hintBtn) {
 hintBtn.addEventListener('click', () => {
 const q = getActiveQuest();
 if (!q || !textarea) return;
 textarea.value = q.solutionCode;
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 updateDiffAndValidation();
 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast(
 lang === 'en' ? 'Solution applied! Check the Live Diff tab.' : '¡Solución aplicada! Revisa la pestaña Diff.',
 ''
 );
 }
 });
 }

 // Reset Code
 const resetBtn = document.getElementById('reset-code-btn');
 if (resetBtn) {
 resetBtn.addEventListener('click', () => {
 loadActiveQuestIntoWorkspace();
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast('Sandbox reset to original state', '↺');
 }
 });
 }

 // Scroll to PR Form
 const openPrBtn = document.getElementById('open-pr-drawer-btn');
 if (openPrBtn) {
 openPrBtn.addEventListener('click', () => {
 setStepIndicator(3);
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 const prCard = document.getElementById('pr-submission-card');
 if (prCard) prCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
 });
 }

 // Auto-Fill PR Template
 const fillPrBtn = document.getElementById('fill-pr-template-btn');
 if (fillPrBtn) {
 fillPrBtn.addEventListener('click', () => {
 const q = getActiveQuest();
 if (!q) return;
 const prTitleInput = document.getElementById('pr-title-input');
 const prBodyInput = document.getElementById('pr-body-input');
 if (prTitleInput) prTitleInput.value = q.prTitle;
 if (prBodyInput) prBodyInput.value = q.prBody;
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast('PR Title & Description populated!', '');
 }
 });
 }

 // Submit PR & Trigger RowdyBot Review + Confetti
 const submitPrBtn = document.getElementById('submit-pr-btn');
 if (submitPrBtn) {
 submitPrBtn.addEventListener('click', async () => {
 const q = getActiveQuest();
 if (!q || !textarea) return;

 const code = textarea.value;
 const nameInput = document.getElementById('contributor-name-input');
 const contributor = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Rowdy Hacker';

 const prTitleInput = document.getElementById('pr-title-input');
 const prBodyInput = document.getElementById('pr-body-input');

 let prTitle = (prTitleInput && prTitleInput.value.trim()) ? prTitleInput.value.trim() : q.prTitle;
 let prBody = (prBodyInput && prBodyInput.value.trim()) ? prBodyInput.value.trim() : q.prBody;

 if (code === q.initialCode) {
 textarea.value = q.solutionCode;
 updateDiffAndValidation();
 }
 if (prTitleInput) prTitleInput.value = prTitle;
 if (prBodyInput) prBodyInput.value = prBody;

 setStepIndicator(4);
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('success');

 if (typeof confetti === 'function') {
 confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
 }

 const reviewCard = document.getElementById('bot-review-card');
 if (reviewCard) {
 reviewCard.classList.remove('hidden');
 reviewCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }

 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';
 const questTitle = lang === 'en' ? q.enTitle : q.esTitle;
 const botComment = document.getElementById('bot-review-comment');

 if (botComment) {
 botComment.innerHTML = `
 <div class="flex items-center gap-2.5 text-sky-400 py-1">
 <span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
 <span class="text-xs sm:text-sm font-semibold">RowdyBot AI (Gemma 4 E4B) is analyzing your code diff...</span>
 </div>
 `;
 }

 // Call Gemma 4 E4B AI engine for live token streaming review
 const diffText = document.getElementById('diff-output')?.innerText || '';
 if (window.OpenBridge.gemma) {
 await window.OpenBridge.gemma.reviewPullRequest(diffText, questTitle, contributor, lang, (chunk, fullText) => {
 if (botComment) {
 botComment.innerHTML = `
 <div class="space-y-1.5">
 <div class="flex items-center gap-2">
 <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
 <span>Verified by Gemma 4 E4B</span>
 </span>
 <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
 </div>
 <p class="text-slate-100 text-sm sm:text-base font-medium leading-relaxed">${escapeHtml(fullText)}</p>
 </div>
 `;
 }
 });
 }

 // Draw Official Verified Certificate
 if (window.OpenBridge.badge) {
 window.OpenBridge.badge.draw(contributor, questTitle);
 }

 if (window.OpenBridge.sound) window.OpenBridge.sound.play('success');
 if (typeof confetti === 'function') {
 confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
 }

 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast('Pull Request Merged! Gemma 4 E4B verified your badge ', '');
 }
 });
 }

 // Jump to Real Issues Page / Tab
 const goToIssuesBtn = document.getElementById('go-to-live-issues-btn');
 if (goToIssuesBtn) {
 goToIssuesBtn.addEventListener('click', () => {
 const issuesTabBtn = document.querySelector('[data-tab="issues"]');
 if (issuesTabBtn) {
 issuesTabBtn.click();
 } else {
 window.location.href = 'issues.html';
 }
 });
 }

 // Download PNG Badge
 const downloadBadgeBtn = document.getElementById('download-badge-btn');
 if (downloadBadgeBtn) {
 downloadBadgeBtn.addEventListener('click', () => {
 if (window.OpenBridge.badge) {
 window.OpenBridge.badge.download();
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast('Certificate downloaded!', '⬇');
 }
 }
 });
 }

 // Step Pills Navigation
 document.querySelectorAll('.step-pill').forEach(pill => {
 pill.addEventListener('click', () => {
 const s = parseInt(pill.getAttribute('data-step-nav'), 10);
 setStepIndicator(s);
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 const target = document.getElementById(`step-section-${s}`);
 if (target) {
 target.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
 });
 });

 // Listen for language changes
 window.addEventListener('openbridge:langchange', () => {
 renderQuestList();
 const q = getActiveQuest();
 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';
 if (q) {
 const plainTitle = document.getElementById('mission-plain-title');
 const plainDesc = document.getElementById('mission-plain-desc');
 const goalExact = document.getElementById('mission-goal-exact');
 if (plainTitle) plainTitle.textContent = lang === 'en' ? q.enTitle : q.esTitle;
 if (plainDesc) plainDesc.textContent = lang === 'en' ? q.enStory : q.esStory;
 if (goalExact) goalExact.textContent = lang === 'en' ? q.enGoal : q.esGoal;
 }
 updateDiffAndValidation();
 });
 }

 // Ask RowdyBot AI Coach Question Listener (Gemma 4 E4B)
 const askCoachBtn = document.getElementById('ask-coach-btn');
 const coachInput = document.getElementById('coach-question-input');
 const coachMsg = document.getElementById('rowdybot-coach-msg');

 if (askCoachBtn && coachInput && coachMsg) {
 askCoachBtn.addEventListener('click', async () => {
 const question = coachInput.value.trim();
 if (!question) return;

 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');
 coachMsg.textContent = 'Thinking with Gemma 4 E4B...';

 const q = getActiveQuest();
 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

 if (window.OpenBridge.gemma) {
 await window.OpenBridge.gemma.askCoach(question, q, lang, (chunk, fullText) => {
 coachMsg.textContent = `"${fullText}"`;
 });
 }
 coachInput.value = '';
 });

 coachInput.addEventListener('keydown', (e) => {
 if (e.key === 'Enter') askCoachBtn.click();
 });
 }

 window.OpenBridge.simulator = {
 init: initSimulator,
 getActiveQuest: getActiveQuest,
 updateDiffAndValidation: updateDiffAndValidation,
 setStepIndicator: setStepIndicator,
 loadActiveQuest: loadActiveQuestIntoWorkspace,
 renderQuestList: renderQuestList
 };
})();
