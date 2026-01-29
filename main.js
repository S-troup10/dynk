const quotes = [
  {
    text: "Tokenization and stable coins might be the name of the game really this year.",
    meta: "Francois Villeroy de Galhau - WEF Davos 2026",
  },
  {
    text: "Tokenisation is at an 'inflection point' and 'eventually all things will settle in digitised form.'",
    meta: "Bill Winters - WEF Davos 2026",
  },
  {
    text: "Bitcoin is a decentralized protocol. There's actually no issuer of it. So, in the sense that central banks have independence, Bitcoin is even more independent. No country, company, or individual controls it in the world.",
    meta: "Brian Armstrong - WEF Davos 2026",
  },
  {
    text: "We're seeing use grow in cross-border trade settlement; we're seeing use grow in trade finance; we're seeing the biggest e-commerce platforms like Stripe and Shopify adding USDC payment acceptance in their own platforms.",
    meta: "Jeremy Allaire - WEF Davos 2026",
  },
  {
    text: "In a growing world of agent-driven activity, a proliferation of payment protocols using stablecoins is emerging. Taking out a Visa card or firing up a bank wire is absurd, we need a medium of exchange that can scale to fractions of a cent, with speed and interoperability across applications and devices.",
    meta: "Jeremy Allaire - WEF Davos 2026",
  },
  {
    text: "1.5 billion people globally do not have access to a bank account, 650 million people on the African continent. With a smartphone, you have access to stablecoin, so you can actually save in a currency that is not exposed to the fluctuations of inflation and making you poorer. That's a big contribution of stablecoin.",
    meta: "Vera Songwe - WEF Davos 2026",
  },
  {
    text: "As stablecoins create the potential for additional uptake in jurisdictions that have weak fiscal and monetary frameworks for dollars, or for other currencies, that creates a competitive pressure on those countries themselves in order to improve their fiscal and monetary frameworks.",
    meta: "Dan Katz - WEF Davos 2026",
  },
  {
    text: "We've seen a dramatic explosion in the use of stablecoin.",
    meta: "Gerard Baker - WEF Davos 2026",
  },
];

const bindTap = (element, handler) => {
  let lastTouchTime = 0;

  const onTouchEnd = (event) => {
    lastTouchTime = Date.now();
    if (event.cancelable) {
      event.preventDefault();
    }
    handler(event);
  };

  const onClick = (event) => {
    if (Date.now() - lastTouchTime < 500) {
      event.preventDefault();
      return;
    }
    handler(event);
  };

  element.addEventListener("touchend", onTouchEnd, { passive: false });
  element.addEventListener("click", onClick);
};

const quoteCarousel = document.querySelector("[data-quote-carousel]");
const quoteSlides = document.querySelector("[data-quote-slides]");
const nextBtn = document.querySelector("[data-quote-next]");
const prevBtn = document.querySelector("[data-quote-prev]");

if (quoteCarousel && quoteSlides && nextBtn && prevBtn) {
  quotes.forEach(({ text, meta }) => {
    const slide = document.createElement("div");
    slide.className = "quote-slide";

    const card = document.createElement("div");
    card.className = "quote-card";

    const blockquote = document.createElement("blockquote");
    blockquote.textContent = `"${text}"`;

    const metaEl = document.createElement("div");
    metaEl.className = "quote-meta";
    metaEl.textContent = meta;

    card.appendChild(blockquote);
    card.appendChild(metaEl);
    slide.appendChild(card);
    quoteSlides.appendChild(slide);
  });

  const slides = Array.from(quoteSlides.querySelectorAll(".quote-slide"));
  let index = 0;

  const update = () => {
    slides.forEach((slide) => (slide.className = "quote-slide"));
    const left = (index - 1 + slides.length) % slides.length;
    const right = (index + 1) % slides.length;

    slides[left].classList.add("left");
    slides[index].classList.add("center");
    slides[right].classList.add("right");
  };

  const next = () => {
    index = (index + 1) % slides.length;
    update();
  };

  const prev = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  nextBtn.addEventListener("click", (event) => {
    event.preventDefault();
    next();
  });
  prevBtn.addEventListener("click", (event) => {
    event.preventDefault();
    prev();
  });
  update();
}

const circleFlip = document.getElementById("circleFlip");
const circleBackTitle = document.getElementById("circleBackTitle");
const circleBackText = document.getElementById("circleBackText");
const circleBackQuote = document.getElementById("circleBackQuote");
const circleBackQuoteMeta = document.getElementById("circleBackQuoteMeta");
const circleItems = document.querySelectorAll(".circle-item");

if (
  circleFlip &&
  circleBackTitle &&
  circleBackText &&
  circleBackQuote &&
  circleBackQuoteMeta &&
  circleItems.length
) {
  const defaultQuote =
    "The key is to harness the benefits while managing the risks.";
  const defaultQuoteMeta = "Christine Lagarde - IMF 2018";
  const canHover = window.matchMedia("(hover: hover)").matches;
  let activeItem = null;
  const isTouch = () =>
    window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const useModal = () =>
    isTouch() || window.matchMedia("(max-width: 900px)").matches;
  const circleModal = document.querySelector("[data-circle-modal]");
  const circleModalClose = document.querySelector("[data-circle-modal-close]");
  const circleModalTitle = document.getElementById("circleModalTitle");
  const circleModalText = document.getElementById("circleModalText");
  const circleModalQuote = document.getElementById("circleModalQuote");
  const circleModalMeta = document.getElementById("circleModalMeta");

  const getItemContent = (item) => ({
    title: item.dataset.title || "Protocol",
    text: item.dataset.text || "A discreet layer in the Dynk architecture.",
    quote: item.dataset.quote || defaultQuote,
    meta: item.dataset.quoteMeta || defaultQuoteMeta,
  });

  const applyToBack = (content) => {
    circleBackTitle.textContent = content.title;
    circleBackText.textContent = content.text;
    circleBackQuote.textContent = `"${content.quote}"`;
    circleBackQuoteMeta.textContent = content.meta;
  };

  const applyToModal = (content) => {
    if (
      !circleModalTitle ||
      !circleModalText ||
      !circleModalQuote ||
      !circleModalMeta
    ) {
      return;
    }
    circleModalTitle.textContent = content.title;
    circleModalText.textContent = content.text;
    circleModalQuote.textContent = `"${content.quote}"`;
    circleModalMeta.textContent = content.meta;
  };

  const openItem = (item) => {
    applyToBack(getItemContent(item));
    circleFlip.classList.add("is-flipped");
    activeItem = item;
  };

  const closeItem = () => {
    circleFlip.classList.remove("is-flipped");
    activeItem = null;
  };

  circleItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      if (!canHover) {
        return;
      }
      openItem(item);
    });

    item.addEventListener("mouseleave", () => {
      if (!canHover) {
        return;
      }
      closeItem();
    });

    bindTap(item, (event) => {
      event.preventDefault();
      if (useModal() && circleModal) {
        const content = getItemContent(item);
        applyToModal(content);
        circleFlip.classList.remove("is-flipped");
        circleModal.classList.add("is-open");
        circleModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (circleModalClose) {
          circleModalClose.focus();
        }
        return;
      }
      if (activeItem === item) {
        closeItem();
        return;
      }
      openItem(item);
    });
  });

  document.addEventListener("click", (event) => {
    if (
      event.target.closest(".circle-item") ||
      event.target.closest("#circleFlip")
    ) {
      return;
    }
    closeItem();
  });

  if (circleModal) {
    const closeCircleModal = () => {
      circleModal.classList.remove("is-open");
      circleModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    if (circleModalClose) {
      bindTap(circleModalClose, (event) => {
        event.preventDefault();
        closeCircleModal();
      });
    }

    circleModal.addEventListener("click", (event) => {
      if (event.target === circleModal) {
        closeCircleModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && circleModal.classList.contains("is-open")) {
        closeCircleModal();
      }
    });

    window.addEventListener("resize", () => {
      if (!useModal() && circleModal.classList.contains("is-open")) {
        closeCircleModal();
      }
      if (useModal()) {
        circleFlip.classList.remove("is-flipped");
      }
    });
  }
}

const showcaseModalTrigger = document.querySelector("[data-showcase-modal]");
const showcaseModal = document.querySelector("[data-modal]");
const showcaseModalClose = document.querySelector("[data-modal-close]");

if (showcaseModalTrigger && showcaseModal && showcaseModalClose) {
  const isMobile = () => window.matchMedia("(max-width: 700px)").matches;

  const openModal = () => {
    showcaseModal.classList.add("is-open");
    showcaseModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    showcaseModalClose.focus();
  };

  const closeModal = () => {
    showcaseModal.classList.remove("is-open");
    showcaseModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  bindTap(showcaseModalTrigger, (event) => {
    if (!isMobile()) {
      return;
    }
    event.preventDefault();
    openModal();
  });

  bindTap(showcaseModalClose, (event) => {
    event.preventDefault();
    closeModal();
  });

  showcaseModal.addEventListener("click", (event) => {
    if (event.target === showcaseModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && showcaseModal.classList.contains("is-open")) {
      closeModal();
    }
  });

  window.addEventListener("resize", () => {
    if (!isMobile() && showcaseModal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

const walletModalTriggers = Array.from(
  document.querySelectorAll("[data-wallet-modal]"),
);
const walletModal = document.querySelector("[data-wallet-modal-dialog]");
const walletModalClose = document.querySelector("[data-wallet-modal-close]");

if (walletModalTriggers.length && walletModal && walletModalClose) {
  const openWalletModal = () => {
    walletModal.classList.add("is-open");
    walletModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    walletModalClose.focus();
  };

  const closeWalletModal = () => {
    walletModal.classList.remove("is-open");
    walletModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  walletModalTriggers.forEach((trigger) => {
    bindTap(trigger, (event) => {
      event.preventDefault();
      openWalletModal();
    });
  });

  bindTap(walletModalClose, (event) => {
    event.preventDefault();
    closeWalletModal();
  });

  walletModal.addEventListener("click", (event) => {
    if (event.target === walletModal) {
      closeWalletModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && walletModal.classList.contains("is-open")) {
      closeWalletModal();
    }
  });
}

const showcaseAccordion = document.querySelector("[data-showcase-accordion]");
const showcaseCopy = document.querySelector(".showcase-copy");

if (showcaseAccordion) {
  const items = Array.from(
    showcaseAccordion.querySelectorAll(".showcase-item"),
  );
  const panels = items
    .map((item) => item.querySelector(".showcase-panel"))
    .filter(Boolean);
  const getPanelHeight = (panel) => {
    const item = panel.closest(".showcase-item");
    if (!item) {
      return panel.scrollHeight;
    }
    const wasOpen = item.classList.contains("is-open");
    if (!wasOpen) {
      item.classList.add("is-open");
    }
    const styles = window.getComputedStyle(panel);
    const padding =
      parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const margin =
      parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    const border =
      parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
    const height = panel.scrollHeight + padding + margin + border;
    if (!wasOpen) {
      item.classList.remove("is-open");
    }
    return height;
  };

  const updatePanelHeights = () => {
    showcaseAccordion.classList.add("is-measuring");
    panels.forEach((panel) => {
      const panelHeight = getPanelHeight(panel);
      panel.style.setProperty("--panel-height", `${panelHeight}px`);
    });

    if (showcaseCopy && panels.length) {
      const openItems = items.filter((item) =>
        item.classList.contains("is-open"),
      );
      openItems.forEach((item) => setClosed(item));
      showcaseCopy.style.minHeight = "";
      const baseHeight = showcaseCopy.getBoundingClientRect().height;
      openItems.forEach((item) => setOpen(item));
      const maxPanelHeight = Math.max(
        ...panels.map(
          (panel) =>
            parseFloat(panel.style.getPropertyValue("--panel-height")) || 0,
        ),
      );
      showcaseCopy.style.minHeight = `${Math.ceil(
        baseHeight + maxPanelHeight,
      )}px`;
    }
    showcaseAccordion.classList.remove("is-measuring");
  };

  const setClosed = (item) => {
    const toggle = item.querySelector(".showcase-toggle");
    const panel = item.querySelector(".showcase-panel");
    if (!toggle || !panel) {
      return;
    }
    item.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  };

  const setOpen = (item) => {
    const toggle = item.querySelector(".showcase-toggle");
    const panel = item.querySelector(".showcase-panel");
    if (!toggle || !panel) {
      return;
    }
    item.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  };

  items.forEach((item) => {
    const toggle = item.querySelector(".showcase-toggle");
    const panel = item.querySelector(".showcase-panel");
    if (!toggle || !panel) {
      return;
    }

    toggle.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");

    toggle.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      items.forEach((other) => setClosed(other));
      if (!isOpen) {
        setOpen(item);
      }
    });
  });
  updatePanelHeights();
  window.addEventListener("resize", updatePanelHeights);
}

const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (parallaxItems.length && !reducedMotion.matches) {
  let ticking = false;
  const baseOffsets = new Map();

  parallaxItems.forEach((item) => {
    baseOffsets.set(item, item.getBoundingClientRect().top + window.scrollY);
  });

  const updateParallax = () => {
    const scrollY = window.scrollY;
    const viewportH = window.innerHeight;

    parallaxItems.forEach((item) => {
      const speed = parseFloat(item.dataset.speed || "0.08");
      const base = baseOffsets.get(item) || 0;
      const progress = (scrollY + viewportH * 0.5 - base) / viewportH;
      const translate = Math.max(Math.min(progress * 40 * speed, 32), -32);
      item.style.transform = `translate3d(0, ${translate}px, 0)`;
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    baseOffsets.clear();
    parallaxItems.forEach((item) => {
      baseOffsets.set(item, item.getBoundingClientRect().top + window.scrollY);
    });
    onScroll();
  });

  onScroll();
}

const boardShell = document.querySelector("[data-board-shell]");
const boardViewport = document.querySelector("[data-board-viewport]");
const boardCanvas = document.querySelector("[data-board-canvas]");
const boardGrid = document.querySelector("[data-board-grid]");

if (boardShell && boardViewport && boardCanvas && boardGrid) {
  const BOARD = {
    walletCount: 1000,
    cols: 50,
    tilePx: 14,
    minZoom: 0.92,
    maxZoom: 4.5,
    zoomSpeed: 0.0018,
    persistLocal: false,
    storageKey: "dynk.founderBoard.v1",
    cycle: ["available", "sold"],
  };

  // Add sold wallet IDs here (e.g., [1,2,3,10,57])
  const SOLD_IDS = [1, 3, 6, 8, 10, 11, 16, 18, 25, 67, 90, 100, 87];

  const STATUSES = new Set(BOARD.cycle);
  let statusById = new Array(BOARD.walletCount + 1).fill("available");

  let scale = 1;
  let tx = 0;
  let ty = 0;
  let minZoom = BOARD.minZoom;
  let isActive = false;

  let pointerDown = false;
  let isPanning = false;
  let isPainting = false;
  let lastX = 0;
  let lastY = 0;

  const pad4 = (n) => String(n).padStart(4, "0");
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const getCols = () => {
    if (BOARD.cols && BOARD.cols > 0) {
      return BOARD.cols;
    }
    return Math.ceil(Math.sqrt(BOARD.walletCount));
  };

  const applyTransform = () => {
    boardCanvas.style.transform = `translate(${tx}px, ${ty}px) scale(${scale}) translate(-50%, -50%)`;
  };

  const zoomAt = (clientX, clientY, deltaY) => {
    const oldScale = scale;
    const factor = Math.exp(-deltaY * BOARD.zoomSpeed);
    const nextScale = clamp(oldScale * factor, minZoom, BOARD.maxZoom);

    const r = boardViewport.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const centerY = r.top + r.height / 2;
    const qx = (clientX - centerX - tx) / oldScale;
    const qy = (clientY - centerY - ty) / oldScale;

    scale = nextScale;
    tx = clientX - centerX - scale * qx;
    ty = clientY - centerY - scale * qy;
    applyTransform();
  };

  const updateSizing = () => {
    const cols = getCols();
    const rows = Math.ceil(BOARD.walletCount / cols);
    const rect = boardViewport.getBoundingClientRect();
    const tilePx = Math.max(6, Math.floor(rect.width / cols));
    BOARD.tilePx = tilePx;
    boardShell.style.setProperty("--board-tile", `${tilePx}px`);
    boardShell.style.setProperty("--board-label", tilePx <= 12 ? "6px" : "7px");
    boardGrid.classList.toggle("is-compact", tilePx <= 10);
    boardGrid.style.gridTemplateColumns = `repeat(${cols}, ${tilePx}px)`;
    boardViewport.style.height = `${rows * tilePx}px`;
    minZoom = BOARD.minZoom;
    if (scale < minZoom) {
      scale = minZoom;
    }
    if (scale > minZoom) {
      scale = minZoom;
    }
    tx = 0;
    ty = 0;
    applyTransform();
    return { cols, rows };
  };

  const save = () => {
    if (!BOARD.persistLocal) return;
    try {
      localStorage.setItem(BOARD.storageKey, JSON.stringify({ statusById }));
    } catch (e) {}
  };

  const load = () => {
    if (!BOARD.persistLocal) return;
    try {
      const raw = localStorage.getItem(BOARD.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.statusById) &&
        parsed.statusById.length === BOARD.walletCount + 1
      ) {
        statusById = parsed.statusById.map((s) =>
          STATUSES.has(s) ? s : "available",
        );
      }
    } catch (e) {}
  };

  const setActive = (value) => {
    isActive = value;
    boardShell.classList.toggle("is-active", value);
    boardShell.classList.toggle("is-locked", !value);
  };

  const setStatus = (id, status) => {
    if (!STATUSES.has(status)) return;
    statusById[id] = status;
    const el = boardGrid.querySelector(`[data-id="${id}"]`);
    if (el) el.dataset.status = status;
  };

  const nextStatus = (current) => {
    const idx = BOARD.cycle.indexOf(current);
    if (idx === -1) return BOARD.cycle[0];
    return BOARD.cycle[(idx + 1) % BOARD.cycle.length];
  };

  const paintTile = (el) => {
    const id = Number(el.dataset.id);
    const status = nextStatus(statusById[id]);
    setStatus(id, status);
  };

  const tileFromEvent = (e) => {
    const tile = e.target.closest(".board-tile");
    if (!tile || !tile.dataset.id) return null;
    return tile;
  };

  const applySoldIds = () => {
    SOLD_IDS.forEach((id) => {
      if (id >= 1 && id <= BOARD.walletCount) {
        statusById[id] = "sold";
      }
    });
  };

  const build = () => {
    const { cols, rows } = updateSizing();
    boardGrid.innerHTML = "";
    const totalTiles = cols * rows;
    const frag = document.createDocumentFragment();
    for (let i = 1; i <= totalTiles; i++) {
      const tile = document.createElement("div");
      tile.className = "board-tile";
      if (i <= BOARD.walletCount) {
        tile.dataset.id = String(i);
        tile.dataset.status = statusById[i] || "available";
        const label = document.createElement("span");
        label.textContent = pad4(i);
        tile.appendChild(label);
      } else {
        tile.classList.add("is-empty");
      }
      frag.appendChild(tile);
    }
    boardGrid.appendChild(frag);
  };

  const activateBoard = () => {
    if (isActive) return;
    setActive(true);
  };

  boardShell.addEventListener("click", activateBoard);

  boardViewport.addEventListener(
    "wheel",
    (event) => {
      if (!isActive) return;
      event.preventDefault();
      const r = boardViewport.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      zoomAt(cx, cy, event.deltaY);
    },
    { passive: false },
  );

  boardViewport.addEventListener("pointerdown", (event) => {
    if (!isActive) return;
    pointerDown = true;
    lastX = event.clientX;
    lastY = event.clientY;

    const tile = tileFromEvent(event);
    if (tile && event.shiftKey) {
      isPainting = true;
      paintTile(tile);
      save();
      boardViewport.setPointerCapture(event.pointerId);
      return;
    }

    isPanning = true;
    boardViewport.setPointerCapture(event.pointerId);
  });

  boardViewport.addEventListener("pointermove", (event) => {
    if (!pointerDown || !isActive) return;

    if (isPainting) {
      const tile = tileFromEvent(event);
      if (tile) {
        paintTile(tile);
        save();
      }
      return;
    }

    if (isPanning) {
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      tx += dx;
      ty += dy;
      applyTransform();
    }
  });

  const endPointer = (event) => {
    pointerDown = false;
    isPanning = false;
    isPainting = false;
    try {
      boardViewport.releasePointerCapture(event.pointerId);
    } catch (_) {}
  };

  boardViewport.addEventListener("pointerup", endPointer);
  boardViewport.addEventListener("pointercancel", endPointer);

  boardGrid.addEventListener("click", (event) => {
    if (!isActive) return;
    const tile = tileFromEvent(event);
    if (!tile) return;
    paintTile(tile);
    save();
  });

  boardViewport.addEventListener("dblclick", (event) => {
    if (!isActive) return;
    event.preventDefault();
    zoomAt(event.clientX, event.clientY, -220);
  });

  load();
  applySoldIds();
  build();
  scale = minZoom;
  tx = 0;
  ty = 0;
  applyTransform();
  setActive(false);

  window.addEventListener("resize", () => {
    updateSizing();
  });

  window.DynkBoard = {
    setSold(ids) {
      if (!Array.isArray(ids)) return;
      ids.forEach((id) => {
        if (id >= 1 && id <= BOARD.walletCount) {
          setStatus(id, "sold");
        }
      });
      save();
    },
    setAvailable(ids) {
      if (!Array.isArray(ids)) return;
      ids.forEach((id) => {
        if (id >= 1 && id <= BOARD.walletCount) {
          setStatus(id, "available");
        }
      });
      save();
    },
  };
}


