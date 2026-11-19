(() => {
  const root = document.documentElement;
  const scroller = document.scrollingElement || root;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  let scrollRange = 0;
  let heroDistance = 1;
  let targets = [];
  let needsMeasurement = true;
  let frame = 0;
  let lastProgress = '';
  let lastHeroProgress = '';

  function measure() {
    const viewportHeight = root.clientHeight;
    scrollRange = Math.max(0, scroller.scrollHeight - viewportHeight);
    heroDistance = Math.max(1, Math.min(620, viewportHeight * 0.68));
    // Keep the reveal in motion from the lower edge to around mid-screen.
    const entryLine = viewportHeight * 0.96;
    const revealDistance = Math.min(460, viewportHeight * 0.46);

    targets = Array.from(document.querySelectorAll('[data-reveal]'))
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => {
        // Layout offsets stay steady as CSS moves the element in and out of view.
        let top = 0;
        for (let node = element; node; node = node.offsetParent) top += node.offsetTop;
        const start = top - entryLine;
        const end = Math.min(start + revealDistance, scrollRange);
        return { element, start: Math.min(start, end - 1), end, previous: '' };
      });
  }

  function paint() {
    frame = 0;
    if (needsMeasurement) {
      needsMeasurement = false;
      measure();
    }

    const position = Math.max(0, scroller.scrollTop);
    const pageProgress = (scrollRange ? clamp(position / scrollRange) : 0).toFixed(4);
    const openingProgress = clamp(position / heroDistance);
    const heroProgress = (openingProgress * (2 - openingProgress)).toFixed(4);

    if (pageProgress !== lastProgress) {
      root.style.setProperty('--page-scroll-progress', pageProgress);
      lastProgress = pageProgress;
    }
    if (heroProgress !== lastHeroProgress) {
      root.style.setProperty('--hero-scroll-progress', heroProgress);
      lastHeroProgress = heroProgress;
    }

    for (const target of targets) {
      const fraction = clamp((position - target.start) / (target.end - target.start));
      const progress = (fraction * fraction * (3 - 2 * fraction)).toFixed(3);
      if (progress !== target.previous) {
        target.element.style.setProperty('--section-scroll-progress', progress);
        target.previous = progress;
      }
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(paint);
  }

  function refresh() {
    needsMeasurement = true;
    schedule();
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', refresh, { passive: true });
  window.addEventListener('pageshow', refresh);
  if ('ResizeObserver' in window) new ResizeObserver(refresh).observe(document.body);
  if ('MutationObserver' in window) {
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
  }

  paint();
  root.classList.add('scroll-effects-on');
})();
