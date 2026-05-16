/**
 * theme.js — Dark / Light Theme Manager
 * Handles theme toggling, persistence via localStorage,
 * and smooth transitions between themes.
 */

const Theme = (() => {

  // ─── Constants ───────────────────────────────
  const STORAGE_KEY   = 'blnd3r-theme';
  const DARK          = 'dark';
  const LIGHT         = 'light';
  const ATTR          = 'data-theme';

  // ─── State ───────────────────────────────────
  let current = DARK;

  // ─── DOM References ──────────────────────────
  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  // ─── Get Saved Theme ─────────────────────────
  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  }

  // ─── Save Theme ──────────────────────────────
  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable (e.g. private mode)
    }
  }

  // ─── Apply Theme ─────────────────────────────
  function apply(theme) {
    current = theme;
    html.setAttribute(ATTR, theme);
    saveTheme(theme);

    // Update toggle button aria-label
    if (toggle) {
      toggle.setAttribute(
        'aria-label',
        theme === DARK ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }
  }

  // ─── Toggle ──────────────────────────────────
  function toggle_() {
    apply(current === DARK ? LIGHT : DARK);
  }

  // ─── Init ────────────────────────────────────
  function init() {
    // 1. Check saved preference
    // 2. Fall back to system preference
    // 3. Default to dark
    const saved  = getSavedTheme();
    const system = window.matchMedia('(prefers-color-scheme: light)').matches ? LIGHT : DARK;
    apply(saved || system);

    // Bind toggle button
    if (toggle) {
      toggle.addEventListener('click', toggle_);
    }

    // Listen to system preference changes (in case user changes OS settings)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      // Only react if user hasn't manually set a preference
      if (!getSavedTheme()) {
        apply(e.matches ? LIGHT : DARK);
      }
    });
  }

  // ─── Public API ──────────────────────────────
  return { init, apply, toggle: toggle_ };

})();

// Auto-initialise as soon as script loads (before DOM ready)
// This prevents flash of wrong theme
Theme.init();
