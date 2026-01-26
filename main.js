const quotes = [
  {
    text: "It is only together that we can find solid and lasting solutions to the major challenges of our time.",
    meta: "Guy Parmelin - WEF Davos 2026",
  },
  {
    text: "Technology is never inherently good or bad; it is what we make it.",
    meta: "Guy Parmelin - WEF Davos 2026",
  },
  {
    text: "Long-term thinking is necessary in any situation.",
    meta: "Guy Parmelin - WEF Davos 2026",
  },
  {
    text: "Solidarity and humanity are not part of the digital vocabulary.",
    meta: "Guy Parmelin - WEF Davos 2026",
  },
  {
    text: "I've come to this year's World Economic Forum with truly phenomenal news from America.",
    meta: "Donald J. Trump - WEF Davos 2026",
  },
  {
    text: "Our economy is booming.",
    meta: "Donald J. Trump - WEF Davos 2026",
  },
  {
    text: "We're leading the world in AI by a lot.",
    meta: "Donald J. Trump - WEF Davos 2026",
  },
  {
    text: "I want Europe to do great.",
    meta: "Donald J. Trump - WEF Davos 2026",
  },
  {
    text: "We accept neither the law of the strongest nor a purely moral stance.",
    meta: "Emmanuel Macron - WEF Davos 2026",
  },
  {
    text: "We are reaching a time of instability, of imbalances.",
    meta: "Emmanuel Macron - WEF Davos 2026",
  },
  {
    text: "A world without rules, where international law is trampled underfoot.",
    meta: "Emmanuel Macron - WEF Davos 2026",
  },
  {
    text: "France and Europe must defend an effective multilateralism.",
    meta: "Emmanuel Macron - WEF Davos 2026",
  },
  {
    text: "NATO is constructed like this: that the US, Canada and the European NATO Allies work completely integrated.",
    meta: "Mark Rutte - WEF Davos 2026",
  },
  {
    text: "For the protection of both the US and Europe, it's crucial that NATO is there.",
    meta: "Mark Rutte - WEF Davos 2026",
  },
  {
    text: "The US is spending 3.5% of GDP on core defence; we are spending in Europe average 2% on defence.",
    meta: "Mark Rutte - WEF Davos 2026",
  },
  {
    text: "No way. Without Donald Trump, this would never have happened.",
    meta: "Mark Rutte - WEF Davos 2026",
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
    if (!circleModalTitle || !circleModalText || !circleModalQuote || !circleModalMeta) {
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
  document.querySelectorAll("[data-wallet-modal]")
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
  const items = Array.from(showcaseAccordion.querySelectorAll(".showcase-item"));
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
    const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
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
      const openItems = items.filter((item) => item.classList.contains("is-open"));
      openItems.forEach((item) => setClosed(item));
      showcaseCopy.style.minHeight = "";
      const baseHeight = showcaseCopy.getBoundingClientRect().height;
      openItems.forEach((item) => setOpen(item));
      const maxPanelHeight = Math.max(
        ...panels.map((panel) =>
          parseFloat(panel.style.getPropertyValue("--panel-height")) || 0
        )
      );
      showcaseCopy.style.minHeight = `${Math.ceil(
        baseHeight + maxPanelHeight
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

