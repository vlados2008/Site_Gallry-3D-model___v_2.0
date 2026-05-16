/**
 * particles.js — Canvas Particle System
 * Renders floating particles in the hero section.
 * Lightweight, GPU-friendly, respects reduced-motion.
 */

const Particles = (() => {

  // ─── Config ──────────────────────────────────
  const CONFIG = {
    count:       55,     // Number of particles
    minRadius:   0.8,
    maxRadius:   2.5,
    minSpeed:    0.08,
    maxSpeed:    0.3,
    connectDist: 120,    // Max distance to draw connecting line
    lineOpacity: 0.06,   // Max opacity for connecting lines
    color:       null,   // Derived from CSS var at runtime
  };

  // ─── State ───────────────────────────────────
  let canvas, ctx, particles = [], animId, W, H;
  let reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ─── Particle Class ──────────────────────────
  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(randomY = false) {
      this.x  = Math.random() * W;
      this.y  = randomY ? Math.random() * H : H + 10;
      this.r  = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
      this.vx = (Math.random() - 0.5) * CONFIG.maxSpeed;
      this.vy = -(CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed));
      this.o  = 0.1 + Math.random() * 0.5; // base opacity
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap horizontally
      if (this.x < -10)  this.x = W + 10;
      if (this.x > W + 10) this.x = -10;

      // Reset when floated off top
      if (this.y < -10) this.reset(false);
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, ${this.o})`;
      ctx.fill();
    }
  }

  // ─── Get Accent Color ────────────────────────
  function getAccentRGB() {
    // Read the CSS variable --accent and convert to r,g,b string
    const theme = document.documentElement.getAttribute('data-theme');
    // Dark theme accent: #5DE8FF → 93,232,255
    // Light theme accent: #0ea5e9 → 14,165,233
    return theme === 'light' ? '14,165,233' : '93,232,255';
  }

  // ─── Setup Canvas ────────────────────────────
  function setup() {
    canvas = document.getElementById('heroParticles');
    if (!canvas) return false;

    ctx = canvas.getContext('2d');
    resize();
    return true;
  }

  // ─── Resize ──────────────────────────────────
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // ─── Create Particles ────────────────────────
  function createParticles() {
    particles = [];
    for (let i = 0; i < CONFIG.count; i++) {
      particles.push(new Particle());
    }
  }

  // ─── Draw Connections ────────────────────────
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectDist) {
          const alpha = CONFIG.lineOpacity * (1 - dist / CONFIG.connectDist);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // ─── Animation Loop ──────────────────────────
  function animate() {
    animId = requestAnimationFrame(animate);

    // Refresh accent color on each frame (handles theme changes)
    CONFIG.color = getAccentRGB();

    ctx.clearRect(0, 0, W, H);

    drawConnections();

    particles.forEach(p => {
      p.update();
      p.draw();
    });
  }

  // ─── Init ────────────────────────────────────
  function init() {
    // Skip animation if user prefers reduced motion
    if (reducedMotion) return;

    if (!setup()) return;

    CONFIG.color = getAccentRGB();
    createParticles();
    animate();

    // Handle resize (debounced)
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        createParticles();
      }, 200);
    }, { passive: true });
  }

  // ─── Cleanup ─────────────────────────────────
  function destroy() {
    if (animId) cancelAnimationFrame(animId);
  }

  return { init, destroy };

})();

document.addEventListener('DOMContentLoaded', () => Particles.init());
