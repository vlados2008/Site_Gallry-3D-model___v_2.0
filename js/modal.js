/**
 * modal.js — Model Detail Modal
 * Opens a fullscreen overlay with model details
 * when a "View Details" card button is clicked.
 */

const Modal = (() => {

  // ─── DOM References ──────────────────────────
  const modal      = document.getElementById('modelModal');
  const backdrop   = document.getElementById('modalBackdrop');
  const closeBtn   = document.getElementById('modalClose');
  const previewEl  = document.getElementById('modalPreview');
  const categoryEl = document.getElementById('modalCategory');
  const titleEl    = document.getElementById('modalTitle');
  const descEl     = document.getElementById('modalDesc');
  const tagsEl     = document.getElementById('modalTags');

  // ─── State ───────────────────────────────────
  let isOpen        = false;
  let lastFocused   = null; // For focus trap / return focus on close

  // ─── Open Modal ──────────────────────────────
  function open(modelId) {
    // Find model data by ID
    const model = window.MODELS_DATA
      ? window.MODELS_DATA.find(m => m.id === modelId)
      : null;

    if (!model || !modal) return;

    // Populate content
    if (previewEl) {
      previewEl.innerHTML = `
        <div class="model-card__placeholder ${model.placeholderClass}">
          ${model.svgIcon}
        </div>
      `;
    }

    if (categoryEl) categoryEl.textContent = model.categoryLabel;
    if (titleEl)    titleEl.textContent    = model.title;
    if (descEl)     descEl.textContent     = model.description;

    if (tagsEl) {
      tagsEl.innerHTML = model.tags
        .map(tag => `<span class="model-card__tag">${tag}</span>`)
        .join('');
    }

    // Show modal
    isOpen = true;
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Save focus origin
    lastFocused = document.activeElement;

    // Focus close button for accessibility
    setTimeout(() => {
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  // ─── Close Modal ─────────────────────────────
  function close() {
    if (!isOpen || !modal) return;

    isOpen = false;
    modal.classList.remove('modal--open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Return focus
    if (lastFocused) {
      lastFocused.focus();
      lastFocused = null;
    }
  }

  // ─── Bind Events ─────────────────────────────
  function bindEvents() {
    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', close);
    }

    // Backdrop click
    if (backdrop) {
      backdrop.addEventListener('click', close);
    }

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen) close();
    });

    // Delegate click on all "View Details" buttons
    // (handles dynamically rendered cards too)
    document.addEventListener('click', e => {
      const btn = e.target.closest('.model-card__view-btn');
      if (btn) {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        if (!isNaN(id)) open(id);
      }

      // Also open if clicking anywhere on the card body (except buttons)
      const card = e.target.closest('.model-card');
      if (card && !e.target.closest('button')) {
        const viewBtn = card.querySelector('.model-card__view-btn');
        if (viewBtn) {
          const id = parseInt(viewBtn.getAttribute('data-id'), 10);
          if (!isNaN(id)) open(id);
        }
      }
    });
  }

  // ─── Init ────────────────────────────────────
  function init() {
    if (!modal) return;
    bindEvents();
  }

  return { init, open, close };

})();

document.addEventListener('DOMContentLoaded', () => Modal.init());
