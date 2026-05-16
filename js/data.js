/**
 * data.js — Model Data Store
 * Central data source for all 3D models in the gallery.
 * Add new models here; the gallery renders dynamically from this list.
 */

const MODELS_DATA = [
  {
    id: 1,
    title: 'Cyber Warrior',
    category: 'characters',
    categoryLabel: 'Characters',
    description: 'High-poly futuristic soldier with modular armor, procedural textures and rig-ready topology. Features separate armor pieces, working visor, and hand-painted skin textures.',
    tags: ['High-Poly', 'Rigged', 'Textured'],
    placeholderClass: 'model-card__placeholder--characters',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="22" r="12" stroke="currentColor" stroke-width="1.5"/>
      <path d="M18 68c0-12 10-20 22-20s22 8 22 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M18 42l-6 14M62 42l6 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 2,
    title: 'Neon Cruiser',
    category: 'vehicles',
    categoryLabel: 'Vehicles',
    description: 'Cyberpunk-inspired sports car with glowing underglow, PBR materials and detailed interior. Includes animated wheels, opening doors and steering wheel rig.',
    tags: ['PBR', 'Animated', 'Interior'],
    placeholderClass: 'model-card__placeholder--vehicles',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="32" width="56" height="24" rx="4" stroke="currentColor" stroke-width="1.5"/>
      <path d="M20 32l8-14h24l8 14" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <circle cx="24" cy="58" r="7" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="56" cy="58" r="7" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 3,
    title: 'Plasma Rifle',
    category: 'weapons',
    categoryLabel: 'Weapons',
    description: 'Sci-fi energy weapon with procedural glow effects, worn metal textures and ejectable magazine. Optimized for real-time use with a 4K texture atlas.',
    tags: ['Game-Ready', 'Low-Poly', 'PBR'],
    placeholderClass: 'model-card__placeholder--weapons',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 44l28-28 8 8-4 4 10 10-4 4 4 4-14 14-8-8-4 4-8-8 4-4-12-12z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M54 26l8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 4,
    title: 'Tokyo Highrise',
    category: 'buildings',
    categoryLabel: 'Buildings',
    description: 'Detailed urban skyscraper with night lighting, reflective glass facade and modular floor design. Includes interior rooms visible through windows.',
    tags: ['Modular', 'Night-Lit', 'High-Poly'],
    placeholderClass: 'model-card__placeholder--buildings',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="22" y="20" width="36" height="48" stroke="currentColor" stroke-width="1.5"/>
      <rect x="28" y="28" width="8" height="8" stroke="currentColor" stroke-width="1"/>
      <rect x="44" y="28" width="8" height="8" stroke="currentColor" stroke-width="1"/>
      <rect x="28" y="44" width="8" height="8" stroke="currentColor" stroke-width="1"/>
      <rect x="44" y="44" width="8" height="8" stroke="currentColor" stroke-width="1"/>
      <rect x="34" y="56" width="12" height="12" stroke="currentColor" stroke-width="1"/>
      <path d="M22 20L40 10l18 10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: 5,
    title: 'Orbital Station',
    category: 'scifi',
    categoryLabel: 'Sci-Fi',
    description: 'Modular space station with docking bays, solar panels, procedural hull damage and interior rooms. Lit by HDRI space environment and custom emission materials.',
    tags: ['Modular', 'High-Poly', 'Cycles'],
    placeholderClass: 'model-card__placeholder--scifi',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,12 62,28 62,52 40,68 18,52 18,28" stroke="currentColor" stroke-width="1.5"/>
      <polygon points="40,24 52,32 52,48 40,56 28,48 28,32" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
      <circle cx="40" cy="40" r="6" stroke="currentColor" stroke-width="1.5"/>
    </svg>`,
  },
  {
    id: 6,
    title: 'Android Pilot',
    category: 'characters',
    categoryLabel: 'Characters',
    description: 'Humanoid android character with exposed mechanical joints, flight suit and face visor with HUD. Fully rigged with IK/FK switching.',
    tags: ['Rigged', 'Textured', 'IK/FK'],
    placeholderClass: 'model-card__placeholder--characters',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="22" r="12" stroke="currentColor" stroke-width="1.5"/>
      <path d="M20 68c0-12 10-20 20-20s20 8 20 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M28 50l-8 6M52 50l8 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M32 40l-4 6h24l-4-6" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
    </svg>`,
  },
  {
    id: 7,
    title: 'Recon Drone',
    category: 'scifi',
    categoryLabel: 'Sci-Fi',
    description: 'Autonomous surveillance drone with scanning lasers, rotor animation and weathered chassis. Exported as FBX with baked normal maps.',
    tags: ['Animated', 'Game-Ready', 'Baked'],
    placeholderClass: 'model-card__placeholder--scifi',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="40" rx="28" ry="10" stroke="currentColor" stroke-width="1.5"/>
      <ellipse cx="40" cy="38" rx="14" ry="10" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="40" cy="38" r="5" stroke="currentColor" stroke-width="1.5"/>
      <path d="M12 40l-6 4M68 40l6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: 8,
    title: 'Crystal Formation',
    category: 'other',
    categoryLabel: 'Other',
    description: 'Procedural crystal cluster with subsurface scattering, caustics lighting and volumetric glow. Rendered in Cycles with 2048 samples.',
    tags: ['Procedural', 'Cycles', 'Volumetric'],
    placeholderClass: 'model-card__placeholder--other',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 14l6 18h20l-16 12 6 18-16-12-16 12 6-18L14 32h20z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
  },
  {
    id: 9,
    title: 'Stealth Jet',
    category: 'vehicles',
    categoryLabel: 'Vehicles',
    description: 'Military stealth aircraft with folding wings, afterburner effect, cockpit interior and landing gear. Full LOD chain included.',
    tags: ['High-Poly', 'PBR', 'LOD'],
    placeholderClass: 'model-card__placeholder--vehicles',
    svgIcon: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 50L40 18l30 32" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
      <rect x="30" y="38" width="20" height="24" rx="2" stroke="currentColor" stroke-width="1.5"/>
      <path d="M10 50h60" stroke="currentColor" stroke-width="1.5"/>
      <path d="M20 50V66M60 50V66" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="20" cy="60" r="4" stroke="currentColor" stroke-width="1"/>
      <circle cx="60" cy="60" r="4" stroke="currentColor" stroke-width="1"/>
    </svg>`,
  },
];

// Export for use in other modules
// (No module system needed; data is available globally on window)
window.MODELS_DATA = MODELS_DATA;
