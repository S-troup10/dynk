const quotes = [
  {
    text: "The point of this technology is that you can move assets extremely quickly, peer-to-peer and get them, without borders, all over the world.",
    meta: "Denelle Dixon - WEF Davos 2025",
  },
  {
    text: "What this technology does is it has a source of truth.",
    meta: "Jennifer Johnson - WEF Davos 2025",
  },
  {
    text: "We need to make crypto easier to use.",
    meta: "Brian Armstrong - WEF Davos 2025",
  },
  {
    text: "Most people don't understand how electricity works, but they can flip on a light switch.",
    meta: "Brian Armstrong - WEF Davos 2025",
  },
  {
    text: "Clear, clean, such that everybody could understand it.",
    meta: "Lesetja Kganyago - WEF Davos 2025",
  },
  {
    text: "I'm always surprised by how big the crypto space is.",
    meta: "Jennifer Johnson - WEF Davos 2025",
  },
  {
    text: "Crypto is really in its infancy.",
    meta: "Brian Armstrong - WEF Davos 2025",
  },
  {
    text: "It actually improves the local economy.",
    meta: "Denelle Dixon - WEF Davos 2025",
  },
  {
    text: "The key is to harness the benefits while managing the risks.",
    meta: "Christine Lagarde - IMF 2018",
  },
  {
    text: "I believe we should consider the possibility to issue digital currency.",
    meta: "Christine Lagarde - IMF 2018",
  },
  {
    text: "We expect it to be cheap and safe, protected against criminals and prying eyes.",
    meta: "Christine Lagarde - IMF 2018",
  },
  {
    text: "We have built a planetary nervous system for information, but no circulatory system for value.",
    meta: "Jeremy Allaire - WEF 2025",
  },
  {
    text: "The internet has never been able to encode these rights natively.",
    meta: "Jeremy Allaire - WEF 2025",
  },
  {
    text: "AI is emerging as a new kind of operating system.",
    meta: "Jeremy Allaire - WEF 2025",
  },
  {
    text: "The long-term impact is going to increase economic freedom in the world.",
    meta: "Brian Armstrong - WEF Davos 2025",
  },
  {
    text: "The modern global economy rests on two pillars: ownership rights and value exchange.",
    meta: "Jeremy Allaire - WEF 2025",
  },
];

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

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);
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

  circleItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      circleBackTitle.textContent = item.dataset.title || "Protocol";
      circleBackText.textContent =
        item.dataset.text || "A discreet layer in the Dynk architecture.";
      circleBackQuote.textContent = `"${item.dataset.quote || defaultQuote}"`;
      circleBackQuoteMeta.textContent =
        item.dataset.quoteMeta || defaultQuoteMeta;
      circleFlip.classList.add("is-flipped");
    });

    item.addEventListener("mouseleave", () => {
      circleFlip.classList.remove("is-flipped");
    });
  });
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

  showcaseModalTrigger.addEventListener("click", (event) => {
    if (!isMobile()) {
      return;
    }
    event.preventDefault();
    openModal();
  });

  showcaseModalClose.addEventListener("click", closeModal);

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

const showcaseAccordion = document.querySelector("[data-showcase-accordion]");
const showcaseCopy = document.querySelector(".showcase-copy");

if (showcaseAccordion) {
  const items = Array.from(showcaseAccordion.querySelectorAll(".showcase-item"));
  const panels = items
    .map((item) => item.querySelector(".showcase-panel"))
    .filter(Boolean);
  const openPadding = 26;
  const openMargin = 10;
  const openBorder = 2;
  const openExtra = openPadding + openMargin + openBorder;

  const updatePanelHeights = () => {
    panels.forEach((panel) => {
      const panelHeight = panel.scrollHeight + openExtra;
      panel.style.setProperty("--panel-height", `${panelHeight}px`);
    });

    if (showcaseCopy && panels.length) {
      const openItems = items.filter((item) => item.classList.contains("is-open"));
      showcaseAccordion.classList.add("is-measuring");
      openItems.forEach((item) => setClosed(item));
      showcaseCopy.style.minHeight = "";
      const baseHeight = showcaseCopy.getBoundingClientRect().height;
      openItems.forEach((item) => setOpen(item));
      showcaseAccordion.classList.remove("is-measuring");
      const maxPanelHeight = Math.max(
        ...panels.map((panel) =>
          parseFloat(panel.style.getPropertyValue("--panel-height")) || 0
        )
      );
      showcaseCopy.style.minHeight = `${Math.ceil(
        baseHeight + maxPanelHeight
      )}px`;
    }
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



