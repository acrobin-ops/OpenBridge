/**
 * OpenBridge — Contributor Badge & Certificate Generator (HTML5 Canvas)
 * Generates official high-resolution contribution certificate directly in-browser.
 */

window.OpenBridge = window.OpenBridge || {};

(function () {
 function drawContributorBadge(contributorName, questTitle, customOrgBadge) {
 const canvas = document.getElementById('badge-canvas');
 if (!canvas) return;
 const ctx = canvas.getContext('2d');
 const w = canvas.width;
 const h = canvas.height;

 const orgBadge = customOrgBadge || window.OpenBridge.state?.currentOrgBadge || 'UTSA OSPO';

 // Background Gradient
 const grad = ctx.createLinearGradient(0, 0, w, h);
 grad.addColorStop(0, '#0C2340');
 grad.addColorStop(0.6, '#0f172a');
 grad.addColorStop(1, '#1e1b4b');
 ctx.fillStyle = grad;
 ctx.fillRect(0, 0, w, h);

 // Glowing Border
 ctx.strokeStyle = '#F15A22';
 ctx.lineWidth = 6;
 ctx.strokeRect(12, 12, w - 24, h - 24);

 ctx.strokeStyle = '#38bdf8';
 ctx.lineWidth = 1.5;
 ctx.strokeRect(20, 20, w - 40, h - 40);

 // Header Pill
 ctx.fillStyle = 'rgba(241, 90, 34, 0.2)';
 ctx.fillRect(36, 36, 230, 28);
 ctx.fillStyle = '#F15A22';
 ctx.font = 'bold 12px Inter, sans-serif';
 ctx.fillText(`${orgBadge} • OPENBRIDGE`, 46, 54);

 // Title
 ctx.fillStyle = '#ffffff';
 ctx.font = 'extrabold 24px Inter, sans-serif';
 ctx.fillText('FIRST OPEN SOURCE PR', 36, 100);

 // Subtitle
 ctx.fillStyle = '#94a3b8';
 ctx.font = '13px Inter, sans-serif';
 ctx.fillText('Official Verified Contribution Certificate', 36, 122);

 // Recipient Name
 ctx.fillStyle = '#38bdf8';
 ctx.font = 'bold 26px Inter, sans-serif';
 ctx.fillText(contributorName || 'Rowdy Contributor', 36, 168);

 // Quest Completed
 ctx.fillStyle = '#e2e8f0';
 ctx.font = '13px JetBrains Mono, monospace';
 ctx.fillText(`Quest: ${questTitle || 'Documentation Polish'}`, 36, 202);

 // Footer Metadata
 const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
 ctx.fillStyle = '#10b981';
 ctx.font = 'bold 12px JetBrains Mono, monospace';
 ctx.fillText(`STATUS: MERGED INTO MAIN • ${dateStr}`, 36, 250);

 // Seal Circle on Right
 ctx.beginPath();
 ctx.arc(w - 85, h / 2 + 10, 46, 0, Math.PI * 2);
 ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
 ctx.fill();
 ctx.lineWidth = 3;
 ctx.strokeStyle = '#10b981';
 ctx.stroke();

 ctx.fillStyle = '#10b981';
 ctx.font = 'bold 14px Inter, sans-serif';
 ctx.textAlign = 'center';
 ctx.fillText('MERGED', w - 85, h / 2 + 8);
 ctx.font = '10px JetBrains Mono, monospace';
 ctx.fillText('100% OPEN', w - 85, h / 2 + 24);
 ctx.textAlign = 'left';
 }

 function downloadBadge(filename = 'OpenBridge-First-PR-Badge.png') {
 const canvas = document.getElementById('badge-canvas');
 if (!canvas) return;
 const link = document.createElement('a');
 link.download = filename;
 link.href = canvas.toDataURL('image/png');
 link.click();
 }

 window.OpenBridge.badge = {
 draw: drawContributorBadge,
 download: downloadBadge
 };

 window.drawContributorBadge = drawContributorBadge;
})();
