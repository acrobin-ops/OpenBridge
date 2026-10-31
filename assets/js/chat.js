/**
 * assets/js/chat.js — Open Source AI Chatbot Engine
 * Powered by Gemma 4 E4B & UTSA OSPO Knowledge Base
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 const KNOWLEDGE_BASE = {
 en: {
 nocode:"Absolutely! Over 40% of open-source contributions require zero programming. You can contribute by fixing documentation typos, translating READMEs into Spanish, improving UI design, writing tutorials, testing software and reporting bugs, or triaging issues for maintainers. Every project needs great writers and designers!",
 fork_clone:"Think of a **Fork** as taking a personal photocopy of a shared recipe book into your own GitHub account. A **Clone** is downloading that photocopy onto your local laptop computer so you can work on it offline. You Fork on GitHub.com first, then Clone to your machine!",
 license:"An open-source license tells the world how they are legally allowed to use, modify, and share your software. The **MIT License** is the most popular: it essentially says 'You can do whatever you want with this code, just keep the original copyright notice and don't sue me!'",
 first_issue:"Look for labels called **'good first issue'**, **'help wanted'**, or **'documentation'** on GitHub repositories. You can also visit our Live Issues tab in OpenBridge! When you find one, comment politely: 'Hi! I'm a first-time contributor, could I please be assigned this issue?'",
 conflict:"A **Merge Conflict** happens when two contributors edit the exact same line of code at the same time, and Git doesn't know which person's version to keep. Think of it like two editors revising paragraph 3 of a document differently. You simply open the file, decide which line is right, delete the markers (<<<<<<<, =======, >>>>>>>), and commit!"
 },
 es: {
 nocode:"¡Por supuesto! Más del 40% de las contribuciones al código abierto no requieren programar. Puedes contribuir mejorando documentación, traduciendo guías al español, diseñando interfaces, reportando errores o respondiendo dudas de otros usuarios. ¡Los proyectos necesitan escritores y diseñadores!",
 fork_clone:"Piensa en un **Fork** como hacer una fotocopia de un libro de recetas en tu propia cuenta de GitHub. Un **Clone** es descargar esa fotocopia en tu laptop para trabajar sin internet. Primero haces Fork en GitHub y luego Clone en tu máquina.",
 license:"Una licencia de código abierto indica legalmente cómo otros pueden usar y modificar tu proyecto. La licencia **MIT** es la más común: significa '¡Puedes usar este código libremente para lo que quieras, siempre que mantengas los créditos del autor original!'",
 first_issue:"Busca etiquetas como **'good first issue'** o **'documentación'** en GitHub. ¡También puedes usar la pestaña Live Issues en OpenBridge! Deja un comentario cordial diciendo: '¡Hola! Soy nuevo contribuyente, ¿me podrían asignar este issue?'",
 conflict:"Un **conflicto de fusión** ocurre cuando dos personas editan exactamente la misma línea al mismo tiempo y Git no sabe cuál versión conservar. Solo abres el archivo, eliges el cambio correcto, borras las marcas de conflicto y guardas."
 }
 };

 let chatHistory = [];

 function appendMessage(sender, text, isAi = false) {
 const chatContainer = document.getElementById('chat-messages-container');
 if (!chatContainer) return null;

 const msgDiv = document.createElement('div');
 msgDiv.className = `flex gap-3 items-start ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

 if (sender === 'user') {
 msgDiv.innerHTML = `
 <div class="max-w-lg bg-orange-500 text-white p-3.5 sm:p-4 rounded-2xl rounded-tr-sm text-xs sm:text-sm shadow-md leading-relaxed">
 <p>${escapeHtml(text)}</p>
 </div>
 <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
 You
 </div>
 `;
 } else {
 msgDiv.innerHTML = `
 <img src="assets/images/images.png" alt="RowdyBot" class="w-9 h-9 rounded-xl object-contain bg-slate-900 border border-sky-400/50 p-0.5 flex-shrink-0 mt-0.5" />
 <div class="max-w-xl bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-2xl rounded-tl-sm text-xs sm:text-sm shadow-lg space-y-2 leading-relaxed">
 <div class="flex items-center gap-2 pb-1 border-b border-slate-800/80">
 <span class="font-bold text-white text-xs">RowdyBot AI</span>
 <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
 Gemma 4 E4B
 </span>
 </div>
 <div class="ai-msg-body leading-relaxed">${escapeHtml(text)}</div>
 </div>
 `;
 }

 chatContainer.appendChild(msgDiv);
 chatContainer.scrollTop = chatContainer.scrollHeight;
 return msgDiv;
 }

 function escapeHtml(str) {
 if (!str) return '';
 return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
 }

 async function handleSendQuestion(customText = null) {
 const input = document.getElementById('chat-user-input');
 const text = customText || (input ? input.value.trim() : '');
 if (!text) return;

 if (input) input.value = '';
 if (window.OpenBridge.sound) window.OpenBridge.sound.play('click');

 // 1. Append User message
 appendMessage('user', text);

 // 2. Append AI thinking placeholder
 const aiBubble = appendMessage('ai', 'Thinking with Gemma 4 E4B...');
 const bodyEl = aiBubble ? aiBubble.querySelector('.ai-msg-body') : null;

 const lang = window.OpenBridge.i18n ? window.OpenBridge.i18n.getLang() : 'en';

 // 3. Check quick knowledge base for instant high-speed answers
 const lower = text.toLowerCase();
 let directAnswer = null;

 if (lower.includes('code') || lower.includes('program') || lower.includes('non-coder') || lower.includes('sin programar')) {
 directAnswer = KNOWLEDGE_BASE[lang].nocode;
 } else if (lower.includes('fork') || lower.includes('clone')) {
 directAnswer = KNOWLEDGE_BASE[lang].fork_clone;
 } else if (lower.includes('license') || lower.includes('licencia') || lower.includes('mit')) {
 directAnswer = KNOWLEDGE_BASE[lang].license;
 } else if (lower.includes('first issue') || lower.includes('beginner') || lower.includes('primer issue') || lower.includes('empezar')) {
 directAnswer = KNOWLEDGE_BASE[lang].first_issue;
 } else if (lower.includes('conflict') || lower.includes('conflicto')) {
 directAnswer = KNOWLEDGE_BASE[lang].conflict;
 }

 if (directAnswer) {
 if (bodyEl) bodyEl.innerHTML = '';
 let streamed = '';
 const words = directAnswer.split(' ');
 for (const w of words) {
 streamed += w + ' ';
 if (bodyEl) bodyEl.innerHTML = streamed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
 await new Promise(r => setTimeout(r, 16));
 }
 return;
 }

 // 4. Otherwise, use Gemma 4 E4B live streamer / fallback
 if (window.OpenBridge.gemma) {
 if (bodyEl) bodyEl.innerHTML = '';
 await window.OpenBridge.gemma.askCoach(text, null, lang, (chunk, fullText) => {
 if (bodyEl) bodyEl.innerHTML = escapeHtml(fullText);
 });
 }
 }

 function initChat() {
 const sendBtn = document.getElementById('chat-send-btn');
 const input = document.getElementById('chat-user-input');

 if (sendBtn) {
 sendBtn.addEventListener('click', () => handleSendQuestion());
 }

 if (input) {
 input.addEventListener('keydown', (e) => {
 if (e.key === 'Enter') handleSendQuestion();
 });
 }

 // Quick Question Suggestion Chips
 document.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
 chip.addEventListener('click', () => {
 const query = chip.getAttribute('data-query');
 if (query) {
 handleSendQuestion(query);
 }
 });
 });

 // Clear Chat
 const clearBtn = document.getElementById('clear-chat-btn');
 if (clearBtn) {
 clearBtn.addEventListener('click', () => {
 const container = document.getElementById('chat-messages-container');
 if (container) {
 container.innerHTML = `
 <div class="text-center py-6 text-slate-500 text-xs">
 <span>Chat history cleared. Ask any question below to get started!</span>
 </div>
 `;
 }
 if (window.OpenBridge.common) {
 window.OpenBridge.common.showToast('Chat history cleared', '');
 }
 });
 }
 }

 window.OpenBridge.chat = {
 init: initChat,
 send: handleSendQuestion
 };

 document.addEventListener('DOMContentLoaded', () => {
 if (document.getElementById('chat-messages-container')) {
 initChat();
 }
 });
})();
