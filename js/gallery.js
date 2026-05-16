/**
 * gallery.js — Gallery Filter & Render
 * Handles category filtering with smooth transitions.
 * Cards are filtered in the DOM; no re-render needed.
 */

const Gallery = (() => {

  // ─── DOM References ──────────────────────────
  const filterBtns = document.querySelectorAll('.filter__btn');
  const grid       = document.getElementById('galleryGrid');
  const emptyMsg   = document.getElementById('galleryEmpty');

  // ─── State ───────────────────────────────────
  let currentFilter = 'all';

  // ─── Get All Cards ───────────────────────────
  function getCards() {
    return grid ? Array.from(grid.querySelectorAll('.model-card')) : [];
  }

  // ─── Filter Cards ────────────────────────────
  function filterCards(category) {
    if (currentFilter === category) return;
    currentFilter = category;

    const cards   = getCards();
    let visible   = 0;

    cards.forEach((card, index) => {
      const cardCategory = card.getAttribute('data-category');
      const match        = category === 'all' || cardCategory === category;

      if (match) {
        // Show card with staggered delay
        card.classList.remove('is-hidden');

        // Small stagger for each visible card
        setTimeout(() => {
          card.classList.add('is-filtering-in');
          card.classList.remove('is-filtering-out');
        }, index * 40);

        // Clean up animation class
        setTimeout(() => {
          card.classList.remove('is-filtering-in');
        }, index * 40 + 500);

        visible++;
      } else {
        // Hide card
        card.classList.add('is-filtering-out');

        setTimeout(() => {
          card.classList.add('is-hidden');
          card.classList.remove('is-filtering-out');
        }, 250);
      }
    });

    // Toggle empty state message
    if (emptyMsg) {
      emptyMsg.classList.toggle('gallery__empty--visible', visible === 0);
    }
  }

  // ─── Update Active Filter Button ─────────────
  function setActiveButton(btn) {
    filterBtns.forEach(b => {
      b.classList.remove('filter__btn--active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('filter__btn--active');
    btn.setAttribute('aria-selected', 'true');
  }

  // ─── Bind Filter Buttons ─────────────────────
  function bindFilters() {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        setActiveButton(btn);
        filterCards(category);
      });
    });
  }

  // ─── Init ────────────────────────────────────
  function init() {
    if (!grid) return;
    bindFilters();
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => Gallery.init());
