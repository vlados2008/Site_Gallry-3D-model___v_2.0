/**
 * animations.js — Scroll Reveal System
 * Uses IntersectionObserver to trigger CSS reveal
 * animations when elements enter the viewport.
 */

const Animations = (() => {

  // ─── Config ──────────────────────────────────
  const OBSERVER_OPTIONS = {
    root:       null,       // Viewport
    rootMargin: '0px 0px -80px 0px', // Trigger 80px before bottom
    threshold:  0.1,        // 10% of element visible
  };

  // ─── Observe Elements ────────────────────────
  function observe() {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Make all reveal elements visible immediately
      document.querySelectorAll('.reveal-up, .reveal-fade').forEach(el => {
        el.classList.add('is-visible');
      });
      return;
    }

    const targets = document.querySelectorAll('.reveal-up, .reveal-fade');

    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Unobserve after animation — performance optimization
          observer.unobserve(entry.target);
        }
      });
    }, OBSERVER_OPTIONS);

    targets.forEach(el => observer.observe(el));
  }

  // ─── Init ────────────────────────────────────
  function init() {
    // Small delay to let preloader finish first
    setTimeout(observe, 400);
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => Animations.init());
