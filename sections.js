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

  var total = 2100;
  var takenCount = 100; // First 100 wallets are claimed

  // Build grid
  var frag = document.createDocumentFragment();
  for (var i = 0; i < total; i++) {
    var isTaken = i < takenCount;
    var cell = document.createElement('div');
    var num = String(i + 1).padStart(4, '0');
    cell.className = 'board-cell' + (isTaken ? ' taken' : '');
    cell.dataset.wallet = num;
    cell.dataset.taken = isTaken ? '1' : '0';
    frag.appendChild(cell);
  }
  board.appendChild(frag);

  // Update counters
  var takenEl = document.getElementById('boardTaken');
  var openEl = document.getElementById('boardOpen');
  if (takenEl) takenEl.textContent = takenCount.toLocaleString();
  if (openEl) openEl.textContent = (total - takenCount).toLocaleString();

  // ── Tooltip ──
  var tooltip = document.getElementById('boardTooltip');
  board.addEventListener('mouseover', function(e) {
    var cell = e.target.closest('.board-cell');
    if (!cell || !tooltip) return;
    tooltip.textContent = '#' + cell.dataset.wallet + (cell.dataset.taken === '1' ? ' · Claimed' : ' · Available');
    tooltip.classList.add('visible');
  });
  board.addEventListener('mousemove', function(e) {
    if (!tooltip) return;
    tooltip.style.left = (e.clientX + 12) + 'px';
    tooltip.style.top  = (e.clientY - 28) + 'px';
  });
  board.addEventListener('mouseleave', function() {
    if (tooltip) tooltip.classList.remove('visible');
  });

  // ── Token tier lookup ──
  function getTokens(walletNum) {
    if (walletNum <= 800)  return '~10,000';
    if (walletNum <= 865)  return '~6,500';
    if (walletNum <= 930)  return '~4,500';
    if (walletNum <= 1060) return '~3,000';
    if (walletNum <= 1255) return '~2,000';
    if (walletNum <= 1580) return '~1,500';
    return '~1,000';
  }

  // ── Modal ──
  var modal    = document.getElementById('walletModal');
  var wcNum    = document.getElementById('wcNumber');
  var wcStatus = document.getElementById('wcStatus');
  var wcTokens = document.getElementById('wcTokensVal');
  var closeBtn = document.getElementById('walletModalClose');

  function openModal(num, isTaken) {
    if (!modal || !wcNum) return;
    var n = parseInt(num, 10);
    wcNum.textContent = '#' + num;
    if (wcTokens) wcTokens.textContent = getTokens(n);
    if (wcStatus) {
      wcStatus.textContent = isTaken ? 'Claimed' : 'Available';
      wcStatus.className = 'wc-status ' + (isTaken ? 'wc-status--claimed' : 'wc-status--available');
    }
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  board.addEventListener('click', function(e) {
    var cell = e.target.closest('.board-cell');
    if (cell) openModal(cell.dataset.wallet, cell.dataset.taken === '1');
  });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
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
