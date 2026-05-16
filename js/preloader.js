/**
 * preloader.js — Page Loading Screen
 * Simulates a loading progress bar and hides
 * the preloader once the page assets are ready.
 */

const Preloader = (() => {

  // ─── DOM References ──────────────────────────
  const preloader = document.getElementById('preloader');
  const fill      = document.getElementById('preloaderFill');
  const percent   = document.getElementById('preloaderPercent');

  // ─── State ───────────────────────────────────
  let progress = 0;
  let timer    = null;

  // ─── Animate Progress Bar ────────────────────
  function animateProgress() {
    timer = setInterval(() => {
      // Increment at different speeds to feel natural
      const increment = progress < 60 ? 8 : progress < 85 ? 4 : 1;
      progress = Math.min(progress + increment, 99);

      // Update DOM
      if (fill)    fill.style.width   = `${progress}%`;
      if (percent) percent.textContent = `${progress}%`;

      // Stop at 99 — let hide() push it to 100
      if (progress >= 99) {
        clearInterval(timer);
      }
    }, 60);
  }

  // ─── Hide Preloader ──────────────────────────
  function hide() {
    // Complete to 100%
    progress = 100;
    if (fill)    fill.style.width   = '100%';
    if (percent) percent.textContent = '100%';

    // Short pause so user sees 100%, then fade out
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('preloader--hidden');
      }

      // Mark body as loaded → triggers CSS animations
      document.body.classList.add('is-loaded');

    }, 300);
  }

  // ─── Init ────────────────────────────────────
  function init() {
    if (!preloader) return;

    // Start progress animation immediately
    animateProgress();

    // Hide when window fully loads (including images)
    if (document.readyState === 'complete') {
      // Already loaded
      hide();
    } else {
      window.addEventListener('load', hide, { once: true });
    }

    // Fallback: force hide after 4 seconds max
    setTimeout(hide, 4000);
  }

  return { init };

})();

// Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => Preloader.init());
