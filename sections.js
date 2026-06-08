/* ═══════════════════════════════════════
   DYNK — Section Interactivity
   ═══════════════════════════════════════ */

// Nav scroll effect
window.addEventListener('scroll', function() {
  document.getElementById('siteNav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── FOUNDER WALLET BOARD ──
(function initBoard() {
  var board = document.getElementById('walletBoard');
  if (!board) return;

  var total = 800;
  var takenCount = 137; // Number of claimed wallets

  // Generate a deterministic set of "taken" wallet IDs
  var taken = new Set();
  // Seed: spread across the range for visual interest
  var seed = 42;
  function pseudoRandom() {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  }
  while (taken.size < takenCount) {
    taken.add(Math.floor(pseudoRandom() * total));
  }

  // Build grid
  var frag = document.createDocumentFragment();
  for (var i = 0; i < total; i++) {
    var cell = document.createElement('div');
    cell.className = 'board-cell' + (taken.has(i) ? ' taken' : '');
    cell.title = '#' + String(i + 1).padStart(3, '0') + (taken.has(i) ? ' — Claimed' : ' — Available');
    frag.appendChild(cell);
  }
  board.appendChild(frag);

  // Update counters
  var takenEl = document.getElementById('boardTaken');
  var openEl = document.getElementById('boardOpen');
  if (takenEl) takenEl.textContent = takenCount.toLocaleString();
  if (openEl) openEl.textContent = (total - takenCount).toLocaleString();
})();

// Counter animation
function animateCounter(el, target) {
  var start = performance.now(), duration = 1500;
  function tick(now) {
    var p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

var counted = new Set();
function checkCounters() {
  document.querySelectorAll('[data-count]').forEach(function(el) {
    if (counted.has(el)) return;
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
      counted.add(el);
      var t = parseInt(el.getAttribute('data-count'));
      el.textContent = '0';
      setTimeout(function() { animateCounter(el, t); }, 200);
    }
  });
}
window.addEventListener('scroll', checkCounters, { passive: true });
setTimeout(checkCounters, 600);
