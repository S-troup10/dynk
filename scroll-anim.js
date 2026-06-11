/* DYNK Scroll-Driven Animations — scroll event + interval driven */
(function() {
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  function update() {
    try {
    var vh = window.innerHeight;
    var scrollY = window.scrollY || 0;

    // ── HERO PARALLAX EXIT ──
    if (scrollY > 10) {
      var hp = clamp(scrollY / vh);
      var hInner = document.querySelector('.hero-inner');
      var hFeat = document.querySelector('.hero-featured');
      if (hInner) {
        hInner.style.transform = 'translateY(' + (hp * -80) + 'px)';
        hInner.style.opacity = '' + Math.max(0, 1 - hp * 1.2);
      }
      if (hFeat) {
        hFeat.style.opacity = '' + Math.max(0, 1 - hp * 2);
      }
    }

    // ── SECTION TEXT — rise and fade ──
    var texts = document.querySelectorAll('.sec-title, .sec-label, .sec-desc');
    for (var i = 0; i < texts.length; i++) {
      var el = texts[i];
      if (el.closest('.hero')) continue;
      var r = el.getBoundingClientRect();
      var p = clamp((vh - r.top) / (vh * 0.5));
      var t = ease(p);
      el.style.transform = 'translateY(' + lerp(40, 0, t) + 'px)';
      el.style.opacity = '' + t;
    }

    // ── WALLET CARDS — staggered rise ──
    var cards = document.querySelectorAll('.w-card');
    for (var i = 0; i < cards.length; i++) {
      var el = cards[i];
      var r = el.getBoundingClientRect();
      var offset = 60 + i * 30;
      var p = clamp((vh - r.top + 50) / (vh * 0.55));
      var t = ease(p);
      el.style.transform = 'translateY(' + lerp(offset, 0, t) + 'px) scale(' + lerp(0.92, 1, t) + ')';
      el.style.opacity = '' + t;
    }

    // ── DATA ITEMS — slide right ──
    var ditems = document.querySelectorAll('.d-item');
    for (var i = 0; i < ditems.length; i++) {
      var el = ditems[i];
      var r = el.getBoundingClientRect();
      var offset = 60 + i * 25;
      var p = clamp((vh - r.top + 30) / (vh * 0.5));
      var t = ease(p);
      el.style.transform = 'translateX(' + lerp(offset, 0, t) + 'px)';
      el.style.opacity = '' + t;
    }

    // ── FOUNDATION STATS — scale ──
    var fs = document.querySelector('.f-stats');
    if (fs) {
      var r = fs.getBoundingClientRect();
      var p = clamp((vh - r.top) / (vh * 0.45));
      var t = ease(p);
      fs.style.transform = 'scale(' + lerp(0.82, 1, t) + ')';
      fs.style.opacity = '' + t;
    }

    // ── PILLS — float up ──
    var pills = document.querySelectorAll('.f-pill');
    for (var i = 0; i < pills.length; i++) {
      var el = pills[i];
      var r = el.getBoundingClientRect();
      var p = clamp((vh - r.top + 20) / (vh * 0.4));
      var t = ease(p);
      el.style.transform = 'translateY(' + lerp(30 + i * 15, 0, t) + 'px)';
      el.style.opacity = '' + t;
    }

    // ── BOARD SWEEP ──
    var board = document.getElementById('walletBoard');
    if (board && board.children.length > 0) {
      var r = board.getBoundingClientRect();
      var p = clamp((vh - r.top) / (vh * 0.6));
      var cells = board.children;
      for (var c = 0; c < cells.length; c++) {
        var row = Math.floor(c / 40);
        var col = c % 40;
        var cd = (row + col) / 60;
        var cp = clamp((p - cd * 0.6) / 0.4);
        cells[c].style.opacity = '' + cp;
        cells[c].style.transform = cp > 0 ? 'scale(' + lerp(0.5, 1, ease(cp)) + ')' : 'scale(0.5)';
      }
    }

    // ── BOARD COUNTER + CTA ──
    var bc = document.querySelector('.board-counter');
    if (bc) { var r=bc.getBoundingClientRect(); var p=clamp((vh-r.top)/(vh*0.5)); var t=ease(p); bc.style.transform='translateY('+lerp(30,0,t)+'px)'; bc.style.opacity=''+t; }
    var bcta = document.querySelector('.board-cta-row');
    if (bcta) { var r=bcta.getBoundingClientRect(); var p=clamp((vh-r.top)/(vh*0.5)); var t=ease(p); bcta.style.transform='translateY('+lerp(20,0,t)+'px)'; bcta.style.opacity=''+t; }

    // ── WDARK METRICS — staggered slide up ──
    var metrics = document.querySelectorAll('.wdark-metric');
    for (var i = 0; i < metrics.length; i++) {
      var el = metrics[i];
      var r = el.getBoundingClientRect();
      var p = clamp((vh - r.top + 30 - i * 25) / (vh * 0.45));
      var t = ease(p);
      el.style.transform = 'translateY(' + lerp(30, 0, t) + 'px)';
      el.style.opacity = '' + t;
    }

    // ── WAITLIST SECTION — staggered rise ──
    var wlItems = document.querySelectorAll('.waitlist-label, .waitlist-headline, .waitlist-sub, .waitlist-form');
    for (var i = 0; i < wlItems.length; i++) {
      var el = wlItems[i];
      var r = el.getBoundingClientRect();
      var p = clamp((vh - r.top + 20 - i * 30) / (vh * 0.5));
      var t = ease(p);
      el.style.transform = 'translateY(' + lerp(40, 0, t) + 'px)';
      el.style.opacity = '' + t;
    }

    // ── DATA-ANIM SYSTEM — fade-up, slide-left, slide-right ──
    var animEls = document.querySelectorAll('[data-anim]');
    for (var i = 0; i < animEls.length; i++) {
      var el = animEls[i];
      var type = el.getAttribute('data-anim');
      var delay = parseInt(el.getAttribute('data-delay') || '0');
      var r = el.getBoundingClientRect();
      var p = clamp((vh - r.top + 20 - delay * 22) / (vh * 0.5));
      var t = ease(p);
      if (type === 'fade-up') {
        el.style.transform = 'translateY(' + lerp(40, 0, t) + 'px)';
      } else if (type === 'slide-left') {
        el.style.transform = 'translateX(' + lerp(60, 0, t) + 'px)';
      } else if (type === 'slide-right') {
        el.style.transform = 'translateX(' + lerp(-60, 0, t) + 'px)';
      }
      el.style.opacity = '' + t;
    }

    // ── PHONE MOCKUPS IN SECTIONS ──
    var wPhone = document.querySelector('.wallet-showcase-phone .phone-mockup');
    if (wPhone) { var r=wPhone.getBoundingClientRect(); var p=clamp((vh-r.top+50)/(vh*0.55)); var t=ease(p); wPhone.style.transform='translateY('+lerp(60,0,t)+'px) scale('+lerp(0.88,1,t)+')'; wPhone.style.opacity=''+t; }

    var dPhones = document.querySelectorAll('.data-screens .phone-mockup');
    for (var di=0; di<dPhones.length; di++) { var el=dPhones[di]; var r=el.getBoundingClientRect(); var dRot=di===0?-4:4; var dYOff=di===0?10:-10; var p=clamp((vh-r.top+30)/(vh*0.5)); var t=ease(p); el.style.transform='rotate('+lerp(dRot*2,dRot,t)+'deg) translateY('+lerp(50+dYOff,dYOff,t)+'px)'; el.style.opacity=''+t; }

    // ── CTA SECTION ──
    var ctCenter = document.querySelector('.cta-center');
    if (ctCenter) { var r=ctCenter.getBoundingClientRect(); var p=clamp((vh-r.top)/(vh*0.5)); var t=ease(p); ctCenter.style.transform='scale('+lerp(0.88,1,t)+')'; ctCenter.style.opacity=''+t; }
    var ctPhones = document.querySelectorAll('.cta-phone .phone-mockup');
    for (var ci=0; ci<ctPhones.length; ci++) { var el=ctPhones[ci]; var r=el.getBoundingClientRect(); var cRot=ci===0?-6:6; var p=clamp((vh-r.top+30)/(vh*0.5)); var t=ease(p); el.style.transform='rotate('+lerp(cRot*1.5,cRot,t)+'deg) translateY('+lerp(80,20,t)+'px)'; el.style.opacity=''+t; }

    // ── FOUNDERS CTA SECTION ──
    var fCtaTitle = document.querySelector('.f-cta-title');
    if (fCtaTitle) { var r=fCtaTitle.getBoundingClientRect(); var p=clamp((vh-r.top)/(vh*0.5)); var t=ease(p); fCtaTitle.style.transform='translateY('+lerp(40,0,t)+'px)'; fCtaTitle.style.opacity=''+t; }
    var fCtaDesc = document.querySelector('.f-cta-desc');
    if (fCtaDesc) { var r=fCtaDesc.getBoundingClientRect(); var p=clamp((vh-r.top+20)/(vh*0.5)); var t=ease(p); fCtaDesc.style.transform='translateY('+lerp(30,0,t)+'px)'; fCtaDesc.style.opacity=''+t; }

    } catch(e) { console.error('scroll-anim:', e); }
  }

  // Run on scroll
  window.addEventListener('scroll', update, { passive: true });
  // Interval fallback for environments where scroll events are unreliable
  setInterval(update, 50);
  // Initial runs
  setTimeout(update, 100);
  setTimeout(update, 300);
  setTimeout(update, 600);
})();
