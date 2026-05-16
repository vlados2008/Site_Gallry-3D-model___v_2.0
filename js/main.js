/**
 * main.js — App Entry Point
 * Handles miscellaneous global initializations:
 *  - Footer year
 *  - Body overflow guard
 *  - Console branding
 */

const App = (() => {

  // ─── Set Footer Year ─────────────────────────
  function setYear() {
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  // ─── Console Branding ────────────────────────
  function consoleBrand() {
    console.log(
      '%c BLND3R ',
      'background:#5DE8FF;color:#080b0f;font-family:monospace;font-size:20px;font-weight:900;padding:4px 8px;border-radius:4px;',
      '\n%c3D Artist Portfolio — Built with ❤ and Blender',
      'color:#8892a4;font-family:monospace;'
    );
  }

  // ─── Init ────────────────────────────────────
  function init() {
    setYear();
    consoleBrand();
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => App.init());
