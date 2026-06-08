/* ═══════════════════════════════════════
   DYNK — Hero Interactivity
   ═══════════════════════════════════════ */

// ── ENTRANCE ANIMATIONS ──
(function runEntrance() {
  var sequence = [
    { sel: '.hero-entrance--text', delay: 200 },
    { sel: '.hero-entrance--visual', delay: 500 },
    { sel: '.hero-entrance--featured', delay: 900 }
  ];
  sequence.forEach(function(item) {
    var el = document.querySelector(item.sel);
    if (el) {
      setTimeout(function() { el.classList.add('entered'); }, item.delay);
    }
  });
})();

// ── SUBTLE PARALLAX ON 3D IMAGE ──
(function initParallax() {
  var visual = document.getElementById('heroVisual');
  if (!visual) return;
  var img = visual.querySelector('img');
  if (!img) return;

  var targetX = 0, targetY = 0;
  var currentX = 0, currentY = 0;

  document.addEventListener('mousemove', function(e) {
    targetX = (e.clientX / window.innerWidth - 0.5) * 24;
    targetY = (e.clientY / window.innerHeight - 0.5) * 16;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;
    img.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
    requestAnimationFrame(animate);
  }

  // Start after entrance animation completes
  setTimeout(animate, 1600);
})();
