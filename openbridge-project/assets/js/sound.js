/**
 * OpenBridge — Synthesized Sound Effects (Web Audio API)
 * Zero external audio files required — synthesizes tones dynamically in browser.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 let soundEnabled = localStorage.getItem('openbridge_sound') !== 'false';

 function isSoundEnabled() {
 return soundEnabled;
 }

 function setSoundEnabled(val) {
 soundEnabled = !!val;
 localStorage.setItem('openbridge_sound', soundEnabled ? 'true' : 'false');
 updateSoundUI();
 }

 function toggleSound() {
 setSoundEnabled(!soundEnabled);
 if (soundEnabled) {
 playSound('click');
 }
 return soundEnabled;
 }

 function updateSoundUI() {
 const soundIcon = document.getElementById('sound-icon');
 if (soundIcon) {
 soundIcon.textContent = soundEnabled ? 'Audio: ON' : 'Audio: OFF';
 }
 }

 function playSound(type) {
 if (!soundEnabled) return;
 try {
 const AudioCtx = window.AudioContext || window.webkitAudioContext;
 if (!AudioCtx) return;
 const ctx = new AudioCtx();
 const osc = ctx.createOscillator();
 const gain = ctx.createGain();
 osc.connect(gain);
 gain.connect(ctx.destination);

 const now = ctx.currentTime;
 if (type === 'click') {
 osc.type = 'sine';
 osc.frequency.setValueAtTime(520, now);
 osc.frequency.exponentialRampToValueAtTime(680, now + 0.06);
 gain.gain.setValueAtTime(0.08, now);
 gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
 osc.start(now);
 osc.stop(now + 0.06);
 } else if (type === 'success') {
 osc.type = 'triangle';
 osc.frequency.setValueAtTime(440, now);
 osc.frequency.setValueAtTime(554.37, now + 0.09);
 osc.frequency.setValueAtTime(659.25, now + 0.18);
 osc.frequency.setValueAtTime(880, now + 0.28);
 gain.gain.setValueAtTime(0.12, now);
 gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
 osc.start(now);
 osc.stop(now + 0.5);
 }
 } catch (e) {
 // Audio context may be restricted before user gesture
 }
 }

 window.OpenBridge.sound = {
 play: playSound,
 toggle: toggleSound,
 isEnabled: isSoundEnabled,
 setEnabled: setSoundEnabled,
 updateUI: updateSoundUI
 };

 // Backwards compatibility alias
 window.playSound = playSound;
})();
