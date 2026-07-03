/* ═══════════════════════════════════════
   DYNK — Section Interactivity
   ═══════════════════════════════════════ */

// Nav scroll effect
window.addEventListener('scroll', function() {
  document.getElementById('siteNav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── MARKETPLACE DATA (30-min localStorage cache) ──
var MKT_CACHE_KEY = 'dynk_mkt_cache';
var MKT_TTL = 30 * 60 * 1000;

function getCachedMarketplace() {
  try {
    var raw = localStorage.getItem(MKT_CACHE_KEY);
    if (!raw) return null;
    var entry = JSON.parse(raw);
    if (Date.now() - entry.ts < MKT_TTL) return entry.payload;
  } catch (e) {}
  return null;
}

function fetchMarketplace() {
  var cached = getCachedMarketplace();
  if (cached) return Promise.resolve(cached);
  return fetch('/api/marketplace')
    .then(function(r) { return r.json(); })
    .then(function(json) {
      if (!json.ok) return null;
      try {
        localStorage.setItem(MKT_CACHE_KEY, JSON.stringify({ ts: Date.now(), payload: json }));
      } catch (e) {}
      return json;
    })
    .catch(function() { return null; });
}

// ── FOUNDER WALLET BOARD ──
(function initBoard() {
  var board = document.getElementById('walletBoard');
  if (!board) return;

  var total = 2100;
  var takenCount = 100;
  var isMobile = window.innerWidth <= 768;
  var MOBILE_GROUPS = 210;
  var walletsPerGroup = total / MOBILE_GROUPS; // 10

  // Build grid — on mobile render 210 macro-cells to avoid lag
  var frag = document.createDocumentFragment();
  var cellCount = isMobile ? MOBILE_GROUPS : total;

  for (var i = 0; i < cellCount; i++) {
    var walletNum = isMobile ? (i * walletsPerGroup + 1) : (i + 1);
    var taken = isMobile ? (i * walletsPerGroup < takenCount) : (i < takenCount);
    var cell = document.createElement('div');
    var num = String(walletNum).padStart(4, '0');
    cell.className = 'board-cell' + (taken ? ' taken' : '');
    cell.dataset.wallet = num;
    cell.dataset.taken = taken ? '1' : '0';
    frag.appendChild(cell);
  }
  board.appendChild(frag);

  if (isMobile) {
    board.classList.add('board-grid--mobile');
  }

  // Update counters (defaults; overwritten by live data when available)
  var takenEl = document.getElementById('boardTaken');
  var openEl = document.getElementById('boardOpen');
  if (takenEl) takenEl.textContent = takenCount.toLocaleString();
  if (openEl) openEl.textContent = (total - takenCount).toLocaleString();

  // ── Tooltip (desktop only) ──
  var tooltip = document.getElementById('boardTooltip');
  if (!isMobile && tooltip) {
    board.addEventListener('mouseover', function(e) {
      var cell = e.target.closest('.board-cell');
      if (!cell) return;
      tooltip.textContent = '#' + cell.dataset.wallet + (cell.dataset.taken === '1' ? ' · Claimed' : ' · Available');
      tooltip.classList.add('visible');
    });
    board.addEventListener('mousemove', function(e) {
      tooltip.style.left = (e.clientX + 12) + 'px';
      tooltip.style.top  = (e.clientY - 28) + 'px';
    });
    board.addEventListener('mouseleave', function() {
      tooltip.classList.remove('visible');
    });
  }

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

  function openModal(num, taken) {
    if (!modal || !wcNum) return;
    var n = parseInt(num, 10);
    wcNum.textContent = '#' + String(n).padStart(4, '0');
    if (wcTokens) wcTokens.textContent = getTokens(n);
    if (wcStatus) {
      wcStatus.textContent = taken ? 'Claimed' : 'Available';
      wcStatus.className = 'wc-status ' + (taken ? 'wc-status--claimed' : 'wc-status--available');
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

  // ── Mobile wallet picker ──
  var pickerInput = document.getElementById('boardPickerInput');
  var pickerBtn   = document.getElementById('boardPickerBtn');
  var pickerRand  = document.getElementById('boardPickerRandom');

  if (pickerBtn && pickerInput) {
    pickerBtn.addEventListener('click', function() {
      var n = parseInt(pickerInput.value, 10);
      if (n >= 1 && n <= 2100) {
        openModal(String(n).padStart(4, '0'), n <= takenCount);
      }
    });
    pickerInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') pickerBtn.click();
    });
  }
  if (pickerRand) {
    pickerRand.addEventListener('click', function() {
      var n = Math.floor(Math.random() * 2100) + 1;
      openModal(String(n).padStart(4, '0'), n <= takenCount);
    });
  }

  // ── Apply live marketplace data when available ──
  function applyLiveData(json) {
    if (!json || !json.ok || !json.data) return;
    var d = json.data;

    // Update claimed count from live data (activeWallets = status 'sold' = claimed)
    var liveClaimed = typeof d.activeWallets === 'number' ? d.activeWallets : null;
    var liveAvail   = typeof d.availableWallets === 'number' ? d.availableWallets : null;
    var liveListed  = typeof d.listedWallets === 'number' ? d.listedWallets : null;

    if (liveClaimed !== null) {
      takenCount = liveClaimed;
      // Re-flag cells
      var cells = board.querySelectorAll('.board-cell');
      cells.forEach(function(cell) {
        var n = parseInt(cell.dataset.wallet, 10);
        var taken = isMobile ? ((n - 1) * walletsPerGroup < takenCount) : (n <= takenCount);
        cell.classList.toggle('taken', taken);
        cell.dataset.taken = taken ? '1' : '0';
      });
      // Animate counters
      if (takenEl) animateCounter(takenEl, liveClaimed);
      var openCount = (liveAvail !== null ? liveAvail : 0) + (liveListed !== null ? liveListed : 0);
      if (openEl) animateCounter(openEl, openCount);
    }

    // Populate the live supply panel
    var panel = document.getElementById('mktLivePanel');
    if (!panel) return;

    var minted  = typeof d.totalWalletsMinted === 'number' ? d.totalWalletsMinted : 0;
    var claimed = liveClaimed !== null ? liveClaimed : 0;
    var listed  = liveListed  !== null ? liveListed  : 0;
    var avail   = liveAvail   !== null ? liveAvail   : 0;

    function setNum(id, val) {
      var el = document.getElementById(id);
      if (el) animateCounter(el, val);
    }
    setNum('mktAvailable',    avail);
    setNum('mktAvailableLeg', avail);
    setNum('mktMinted',       minted);
    setNum('mktClaimed',      claimed);
    setNum('mktListed',       listed);

    // Segmented supply bar — widths as a share of total minted
    if (minted > 0) {
      var pct = function(n) { return (Math.max(0, n) / minted * 100).toFixed(2) + '%'; };
      var seg;
      if ((seg = document.getElementById('mktBarClaimed'))) seg.style.width = pct(claimed);
      if ((seg = document.getElementById('mktBarListed')))  seg.style.width = pct(listed);
      if ((seg = document.getElementById('mktBarOpen')))    seg.style.width = pct(avail);
    }

    // Last updated timestamp
    var updatedEl = document.getElementById('mktLastUpdated');
    if (updatedEl && json.generatedAt) {
      var dt = new Date(json.generatedAt);
      updatedEl.textContent = 'Updated ' + dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    panel.style.display = '';
  }

  fetchMarketplace().then(applyLiveData);
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
