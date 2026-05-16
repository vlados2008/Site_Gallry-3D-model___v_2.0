/**
 * nav.js — Navigation Controller
 * Handles:
 *  - Header scroll state (adds shadow on scroll)
 *  - Mobile menu open / close
 *  - Active link highlighting based on scroll position
 *  - Smooth scroll for anchor links
 *  - Scroll-to-top button visibility
 */

const Nav = (() => {

  // ─── DOM References ──────────────────────────
  const header       = document.getElementById('header');
  const hamburger    = document.getElementById('hamburger');
  const mobileMenu   = document.getElementById('mobileMenu');
  const navLinks     = document.querySelectorAll('.nav__link');
  const mobileLinks  = document.querySelectorAll('.mobile-menu__link');
  const scrollTopBtn = document.getElementById('scrollTop');
  const allAnchors   = document.querySelectorAll('a[href^="#"]');

  // ─── State ───────────────────────────────────
  let isMenuOpen   = false;
  let lastScrollY  = 0;
  let ticking      = false;

  // ─── Scroll Handler ──────────────────────────
  function onScroll() {
    lastScrollY = window.scrollY;

    // Throttle via requestAnimationFrame
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeader();
        updateScrollTop();
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Update header shadow/bg
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('header--scrolled', lastScrollY > 40);
  }

  // Show / hide scroll-to-top button
  function updateScrollTop() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('scroll-top--visible', lastScrollY > 400);
  }

  // Highlight active nav link based on section in viewport
  function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    let currentId  = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (lastScrollY >= top) {
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      const section = link.getAttribute('data-section');
      link.classList.toggle('nav__link--active', section === currentId);
    });
  }

  // ─── Mobile Menu ─────────────────────────────
  function openMenu() {
    isMenuOpen = true;
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeMenu() {
    isMenuOpen = false;
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('mobile-menu--open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    isMenuOpen ? closeMenu() : openMenu();
  }

  // ─── Smooth Scroll ───────────────────────────
  function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const navHeight = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
      10
    ) || 72;

    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

    window.scrollTo({ top, behavior: 'smooth' });
  }

  // ─── Bind Events ─────────────────────────────
  function bindEvents() {

    // Scroll
    window.addEventListener('scroll', onScroll, { passive: true });

    // Hamburger
    if (hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close mobile menu on ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isMenuOpen) closeMenu();
    });

    // Smooth scroll for all anchor links
    allAnchors.forEach(anchor => {
      anchor.addEventListener('click', e => {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScrollTo(href);
        }
      });
    });

    // Scroll to top button
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // ─── Init ────────────────────────────────────
  function init() {
    bindEvents();
    onScroll(); // Run once to set initial states
  }

  return { init };

})();

document.addEventListener('DOMContentLoaded', () => Nav.init());
