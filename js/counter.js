/**
 * counter.js — Animated Number Counter
 * Counts up stat numbers in the hero section
 * when they scroll into view.
 */

const Counter = (() => {

  // ─── Animate a single counter ────────────────
  function animateCount(el) {
    const target   = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(eased * target);

      el.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target; // Ensure exact final value
      }
    }

    requestAnimationFrame(step);
  }

  // ─── Init ────────────────────────────────────
  function init() {
    const counters = document.querySelectorAll('.hero__stat-num[data-count]');
    if (!counters.length) return;

    // Use IntersectionObserver so counter fires when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => Counter.init());
