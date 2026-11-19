(() => {
  if (!('IntersectionObserver' in window) || !('MutationObserver' in window)) return;

  const selector = '[data-reveal]';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const revealInset = Math.min(104, Math.round(document.documentElement.clientHeight * 0.14));
  const seen = new WeakSet();
  const pending = new Set();
  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (isIntersecting) show(target, true);
    }
  }, { rootMargin: `0px 0px -${revealInset}px 0px` });

  function show(element, animate) {
    if (!pending.delete(element)) return;
    observer.unobserve(element);
    element.classList.remove('reveal-waiting');
    if (animate && !reducedMotion.matches && !element.matches(':focus-within, :target')) {
      element.classList.add('reveal-entering');
    }
  }

  function refresh() {
    for (const element of pending) {
      if (!element.isConnected) {
        show(element, false);
        seen.delete(element);
      }
    }

    if (reducedMotion.matches) return;

    const activationEdge = document.documentElement.clientHeight - revealInset;
    const belowViewport = [];
    for (const element of document.querySelectorAll(selector)) {
      if (seen.has(element) || !element.getClientRects().length) continue;

      seen.add(element);
      // Leave content that already reached the reading area visible.
      if (element.getBoundingClientRect().top >= activationEdge && !element.matches(':focus-within, :target')) {
        belowViewport.push(element);
      }
    }

    for (const element of belowViewport) {
      pending.add(element);
      element.classList.add('reveal-waiting');
      observer.observe(element);
    }
  }

  let frame = 0;
  const scheduleRefresh = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      refresh();
    });
  };

  new MutationObserver(scheduleRefresh).observe(document.body, { childList: true, subtree: true });
  document.addEventListener('focusin', (event) => {
    const element = event.target.closest(selector);
    if (element) show(element, false);
  });
  document.addEventListener('animationend', (event) => {
    if (event.animationName === 'section-reveal') event.target.classList.remove('reveal-entering');
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      for (const element of pending) show(element, false);
      document.querySelectorAll('.reveal-entering').forEach((element) => element.classList.remove('reveal-entering'));
    } else {
      scheduleRefresh();
    }
  });
  refresh();
})();
