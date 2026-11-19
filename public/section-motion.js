(() => {
  const root = document.documentElement;
  const scroller = document.scrollingElement || root;
  const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
  let scrollRange = 0;
  let heroDistance = 1;
  let targets = [];
  let parallaxTargets = [];
  let needsMeasurement = true;
  let frame = 0;
  let lastProgress = '';
  let lastHeroProgress = '';
  let lastScrolled = null;

  function getDocumentTop(element) {
    let top = 0;
    for (let node = element; node; node = node.offsetParent) {
      top += node.offsetTop;
    }
    return top;
  }

  function measure() {
    const viewportHeight = root.clientHeight || window.innerHeight || 800;
    scrollRange = Math.max(0, scroller.scrollHeight - viewportHeight);
    heroDistance = Math.max(1, Math.min(620, viewportHeight * 0.68));
    // Keep the reveal in motion from the lower edge to around mid-screen.
    const entryLine = viewportHeight * 0.96;
    const revealDistance = Math.min(460, viewportHeight * 0.46);

    targets = Array.from(document.querySelectorAll('[data-reveal]'))
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => {
        const top = getDocumentTop(element);
        const staggerIndex = Number(element.getAttribute('data-stagger') || 0);
        const staggerShift = Math.min(staggerIndex, 5) * 26;
        const start = top - entryLine + staggerShift;
        const end = Math.min(start + revealDistance, scrollRange);
        return {
          element,
          start: Math.min(start, end - 1),
          end,
          previous: '',
        };
      });

    parallaxTargets = Array.from(document.querySelectorAll('[data-parallax]'))
      .filter((element) => element.getClientRects().length > 0)
      .map((element) => {
        const top = getDocumentTop(element);
        const height = element.offsetHeight || 200;
        const speed = Number(element.getAttribute('data-parallax') || 24);
        return { element, top, height, speed, previous: '' };
      });
  }

  function paint() {
    frame = 0;
    if (needsMeasurement) {
      needsMeasurement = false;
      measure();
    }

    const viewportHeight = root.clientHeight || window.innerHeight || 800;
    const position = Math.max(0, scroller.scrollTop);
    const isScrolled = position > 18;

    if (isScrolled !== lastScrolled) {
      root.classList.toggle('is-scrolled', isScrolled);
      lastScrolled = isScrolled;
    }

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
      // Smoothstep easing for tactile scroll-linked reveal
      const progress = (fraction * fraction * (3 - 2 * fraction)).toFixed(3);
      if (progress !== target.previous) {
        target.element.style.setProperty('--section-scroll-progress', progress);
        target.previous = progress;
      }
    }

    const viewportCenter = position + viewportHeight * 0.5;
    for (const item of parallaxTargets) {
      const elementCenter = item.top + item.height * 0.5;
      const raw = clamp((viewportCenter - elementCenter) / (viewportHeight * 0.85), -1, 1);
      const offset = (raw * item.speed).toFixed(1);
      if (offset !== item.previous) {
        item.element.style.setProperty('--parallax-y', `${offset}px`);
        item.previous = offset;
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
  window.addEventListener('load', refresh);
  if ('ResizeObserver' in window) new ResizeObserver(refresh).observe(document.body);
  if ('MutationObserver' in window) {
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
  }

  paint();
  root.classList.add('scroll-effects-on');
})();
