(() => {
  const root = document.documentElement;
  const scroller = document.scrollingElement || root;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const preferenceKey = 'esom-scroll-effects';
  const revealSelector = '[data-reveal]';
  const controlSelector = '[data-scroll-effects-toggle]';
  const inset = Math.min(80, Math.round(root.clientHeight * 0.11));
  const seen = new WeakSet();
  const pending = new Set();
  let override = readPreference();
  let enabled;
  let lastProgress = -1;
  let lastHeroProgress = -1;
  let scrollFrame = 0;
  let refreshFrame = 0;

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) show(entry.target, true);
        }
      }, { rootMargin: `0px 0px -${inset}px 0px` })
    : null;

  function readPreference() {
    try {
      const value = window.localStorage.getItem(preferenceKey);
      return value === 'on' ? true : value === 'off' ? false : null;
    } catch {
      return null;
    }
  }

  function show(element, animate) {
    if (!pending.delete(element)) return;
    observer?.unobserve(element);
    element.classList.remove('reveal-waiting');
    if (animate && enabled && !element.matches(':focus-within, :target')) {
      element.classList.add('reveal-entering');
    }
  }

  function updateScroll() {
    if (!enabled) return;
    const position = Math.max(0, scroller.scrollTop);
    const range = Math.max(1, scroller.scrollHeight - root.clientHeight);
    const pageProgress = Math.min(1, position / range);
    const openingProgress = Math.min(1, position / 320);
    const heroProgress = openingProgress * (2 - openingProgress);

    if (pageProgress !== lastProgress) {
      root.style.setProperty('--page-scroll-progress', pageProgress.toFixed(4));
      lastProgress = pageProgress;
    }
    if (heroProgress !== lastHeroProgress) {
      root.style.setProperty('--hero-scroll-progress', heroProgress.toFixed(4));
      lastHeroProgress = heroProgress;
    }
  }

  function scheduleScroll() {
    if (!enabled || scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      updateScroll();
    });
  }

  function refresh() {
    for (const control of document.querySelectorAll(controlSelector)) {
      const state = enabled ? 'On' : 'Off';
      if (control.getAttribute('aria-pressed') !== String(enabled)) {
        control.setAttribute('aria-pressed', String(enabled));
      }
      const label = control.querySelector('[data-scroll-effects-state]');
      if (label && label.textContent !== state) label.textContent = state;
      control.hidden = false;
    }
    for (const element of pending) {
      if (!element.isConnected) {
        show(element, false);
        seen.delete(element);
      }
    }
    if (!enabled || !observer) return;

    const activationEdge = root.clientHeight - inset;
    const below = [];
    for (const element of document.querySelectorAll(revealSelector)) {
      if (seen.has(element) || !element.getClientRects().length) continue;
      seen.add(element);
      if (element.getBoundingClientRect().top >= activationEdge && !element.matches(':focus-within, :target')) {
        below.push(element);
      }
    }
    for (const element of below) {
      pending.add(element);
      element.classList.add('reveal-waiting');
      observer.observe(element);
    }
  }

  function scheduleRefresh() {
    if (refreshFrame) return;
    refreshFrame = requestAnimationFrame(() => {
      refreshFrame = 0;
      refresh();
      updateScroll();
    });
  }

  function syncPreference() {
    enabled = override ?? !reducedMotion.matches;
    root.classList.toggle('scroll-effects-on', enabled);
    if (!enabled) {
      for (const element of pending) {
        show(element, false);
        seen.delete(element);
      }
      document.querySelectorAll('.reveal-entering').forEach((element) => element.classList.remove('reveal-entering'));
    }
    refresh();
    updateScroll();
  }

  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleRefresh, { passive: true });
  window.addEventListener('pageshow', scheduleRefresh);
  reducedMotion.addEventListener('change', syncPreference);

  if ('ResizeObserver' in window) new ResizeObserver(scheduleScroll).observe(document.body);
  if ('MutationObserver' in window) {
    new MutationObserver(scheduleRefresh).observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest(controlSelector)) return;
    override = !enabled;
    try {
      window.localStorage.setItem(preferenceKey, override ? 'on' : 'off');
    } catch {
      // The control still works when this browser blocks storage.
    }
    syncPreference();
  });
  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element)) return;
    const element = event.target.closest(revealSelector);
    if (element) show(element, false);
  });
  document.addEventListener('animationend', (event) => {
    if (event.animationName === 'section-reveal') event.target.classList.remove('reveal-entering');
  });

  syncPreference();
})();
