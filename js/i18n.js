/**
 * i18n.js — Internationalization / Localization
 * Supports: English (en), Russian (ru), Ukrainian (ua)
 *
 * How it works:
 *  1. TRANSLATIONS object holds all strings for every language
 *  2. Every translatable element has a [data-i18n="key"] attribute
 *  3. applyLanguage(lang) walks the DOM and swaps all strings
 *  4. Choice is saved to localStorage and restored on next visit
 */

const I18n = (() => {

  // ─── Storage key ─────────────────────────────
  const STORAGE_KEY = 'blnd3r-lang';
  const DEFAULT_LANG = 'en';

  // ─── All translations ─────────────────────────
  const TRANSLATIONS = {

    /* ══════════════════════════════════════════
       ENGLISH
    ══════════════════════════════════════════ */
    en: {
      // Nav
      'nav.home':        'Home',
      'nav.gallery':     'Gallery',
      'nav.about':       'About',
      'nav.contact':     'Contact',

      // Hero
      'hero.eyebrow':    '3D Artist & Blender Creator',
      'hero.line1':      'Crafting',
      'hero.line2':      'Digital Worlds',
      'hero.line3':      'In 3D',
      'hero.desc':       'I create detailed, production-ready 3D models in Blender — from characters and vehicles to sci-fi environments. Every polygon tells a story.',
      'hero.cta.gallery':'Explore Gallery',
      'hero.cta.contact':'Contact Me',
      'hero.stat1.label':'Models Created',
      'hero.stat2.label':'Years Experience',
      'hero.stat3.label':'Categories',

      // Gallery
      'gallery.eyebrow': 'Portfolio',
      'gallery.title1':  '3D Model',
      'gallery.title2':  'Gallery',
      'gallery.desc':    'Browse through my collection of handcrafted 3D models, each built with attention to detail.',
      'filter.all':      'All',
      'filter.characters':'Characters',
      'filter.vehicles': 'Vehicles',
      'filter.weapons':  'Weapons',
      'filter.buildings':'Buildings',
      'filter.scifi':    'Sci-Fi',
      'filter.other':    'Other',
      'card.view':       'View Details',
      'gallery.empty':   'No models found in this category yet.',

      // Model cards
      'model.1.title':   'Cyber Warrior',
      'model.1.desc':    'High-poly futuristic soldier with modular armor, procedural textures and rig-ready topology.',
      'model.2.title':   'Neon Cruiser',
      'model.2.desc':    'Cyberpunk-inspired sports car with glowing underglow, PBR materials and detailed interior.',
      'model.3.title':   'Plasma Rifle',
      'model.3.desc':    'Sci-fi energy weapon with procedural glow effects, worn metal textures and ejectable magazine.',
      'model.4.title':   'Tokyo Highrise',
      'model.4.desc':    'Detailed urban skyscraper with night lighting, reflective glass facade and modular floor design.',
      'model.5.title':   'Orbital Station',
      'model.5.desc':    'Modular space station with docking bays, solar panels, procedural hull damage and interior rooms.',
      'model.6.title':   'Android Pilot',
      'model.6.desc':    'Humanoid android character with exposed mechanical joints, flight suit and face visor with HUD.',
      'model.7.title':   'Recon Drone',
      'model.7.desc':    'Autonomous surveillance drone with scanning lasers, rotor animation and weathered chassis.',
      'model.8.title':   'Crystal Formation',
      'model.8.desc':    'Procedural crystal cluster with subsurface scattering, caustics lighting and volumetric glow.',
      'model.9.title':   'Stealth Jet',
      'model.9.desc':    'Military stealth aircraft with folding wings, afterburner effect, cockpit interior and landing gear.',

      // About
      'about.eyebrow':   'About Me',
      'about.title1':    'The Artist',
      'about.title2':    'Behind',
      'about.title3':    'The Models',
      'about.p1':        'I\'m a self-taught 3D artist passionate about creating hyper-detailed digital worlds. My journey began with curiosity about how movies and games were made — today I craft those same worlds myself using Blender.',
      'about.p2':        'My focus is on sci-fi aesthetics, characters, and hard-surface modeling. I love the challenge of making something purely digital feel physically real — every scratch, every weld, every light bounce matters.',
      'about.p3':        'When I\'m not modeling, I study concept art, follow CGI breakdowns, and constantly experiment with new Blender techniques. Creating is not just a skill — it\'s how I think.',
      'about.feat1':     'Production-ready topology and UV maps',
      'about.feat2':     'PBR materials compatible with major engines',
      'about.feat3':     'Detailed scene composition and lighting',
      'about.feat4':     'Custom rigs and procedural animations',
      'about.badge':     'Available for projects',

      // Contact
      'contact.eyebrow': 'Get In Touch',
      'contact.title1':  'Let\'s',
      'contact.title2':  'Connect',
      'contact.desc':    'Have a project in mind? Want to commission a model? Reach me directly on Telegram.',
      'tg.text':         'The fastest way to reach me. I typically respond within a few hours. Commission inquiries, collaborations, and feedback are all welcome.',
      'tg.btn':          'Open in Telegram',
      'tg.chip1':        '🚀 Fast replies',
      'tg.chip2':        '🌍 Remote work',
      'tg.chip3':        '💎 Custom orders',
      'qr.label':        'Scan to open Telegram',
      'qr.hint':         'Replace with your real QR code',

      // Modal
      'modal.cta':       'Commission This Model',

      // Footer
      'footer.tagline':  'Crafting Digital Worlds In 3D',
      'footer.made':     'Made with Blender & passion ◈',

      // Theme toggle aria
      'theme.toDark':    'Switch to dark theme',
      'theme.toLight':   'Switch to light theme',
    },

    /* ══════════════════════════════════════════
       RUSSIAN
    ══════════════════════════════════════════ */
    ru: {
      'nav.home':        'Главная',
      'nav.gallery':     'Галерея',
      'nav.about':       'Обо мне',
      'nav.contact':     'Контакт',

      'hero.eyebrow':    '3D Художник & Blender Мастер',
      'hero.line1':      'Создаю',
      'hero.line2':      'Цифровые Миры',
      'hero.line3':      'В 3D',
      'hero.desc':       'Я создаю детализированные 3D модели в Blender — от персонажей и транспорта до sci-fi окружений. Каждый полигон рассказывает историю.',
      'hero.cta.gallery':'Смотреть Галерею',
      'hero.cta.contact':'Написать мне',
      'hero.stat1.label':'Созданных моделей',
      'hero.stat2.label':'Лет опыта',
      'hero.stat3.label':'Категорий',

      'gallery.eyebrow': 'Портфолио',
      'gallery.title1':  '3D Коллекция',
      'gallery.title2':  'Моделей',
      'gallery.desc':    'Просмотрите мою коллекцию 3D моделей, каждая создана с вниманием к деталям.',
      'filter.all':      'Все',
      'filter.characters':'Персонажи',
      'filter.vehicles': 'Транспорт',
      'filter.weapons':  'Оружие',
      'filter.buildings':'Здания',
      'filter.scifi':    'Sci-Fi',
      'filter.other':    'Прочее',
      'card.view':       'Подробнее',
      'gallery.empty':   'В этой категории пока нет моделей.',

      'model.1.title':   'Кибер Воин',
      'model.1.desc':    'Высокополигональный солдат будущего с модульной бронёй, процедурными текстурами и готовой топологией для риггинга.',
      'model.2.title':   'Неоновый Крейсер',
      'model.2.desc':    'Спортивный автомобиль в стиле киберпанка с неоновой подсветкой, PBR-материалами и детализированным интерьером.',
      'model.3.title':   'Плазменная Винтовка',
      'model.3.desc':    'Sci-fi оружие с процедурным свечением, потёртыми металлическими текстурами и отстёгиваемым магазином.',
      'model.4.title':   'Токийский Небоскрёб',
      'model.4.desc':    'Детализированный городской небоскрёб с ночной подсветкой, зеркальным стеклом и модульным дизайном этажей.',
      'model.5.title':   'Орбитальная Станция',
      'model.5.desc':    'Модульная космическая станция с доками, солнечными панелями, процедурными повреждениями и внутренними помещениями.',
      'model.6.title':   'Пилот-Андроид',
      'model.6.desc':    'Гуманоидный андроид с открытыми механическими суставами, лётным костюмом и козырьком с HUD-дисплеем.',
      'model.7.title':   'Разведывательный Дрон',
      'model.7.desc':    'Автономный дрон с лазерными сканерами, анимацией роторов и состаренным корпусом.',
      'model.8.title':   'Кристальный Кластер',
      'model.8.desc':    'Процедурное кристальное образование с подповерхностным рассеянием, каустиками и объёмным свечением.',
      'model.9.title':   'Стелс-Истребитель',
      'model.9.desc':    'Военный самолёт-невидимка со складными крыльями, эффектом форсажа, кабиной и шасси.',

      'about.eyebrow':   'Обо Мне',
      'about.title1':    'Художник',
      'about.title2':    'За',
      'about.title3':    'Моделями',
      'about.p1':        'Я самоучка в 3D-арте, влюблённый в создание гиперреалистичных цифровых миров. Мой путь начался с любопытства — как снимаются фильмы и создаются игры. Сегодня я создаю эти миры сам в Blender.',
      'about.p2':        'Мой фокус — sci-fi эстетика, персонажи и hard-surface моделирование. Мне нравится вызов: сделать цифровое физически реальным — каждая царапина, каждый шов, каждый блик имеет значение.',
      'about.p3':        'Когда не моделирую — изучаю концепт-арт, смотрю разборы CGI и постоянно экспериментирую с новыми техниками в Blender. Создавать — не просто навык, это способ мыслить.',
      'about.feat1':     'Готовая к производству топология и UV-развёртки',
      'about.feat2':     'PBR-материалы, совместимые с основными движками',
      'about.feat3':     'Детальная компоновка сцены и освещение',
      'about.feat4':     'Кастомный риггинг и процедурные анимации',
      'about.badge':     'Открыт для проектов',

      'contact.eyebrow': 'Связаться',
      'contact.title1':  'Давай',
      'contact.title2':  'Общаться',
      'contact.desc':    'Есть идея проекта? Хочешь заказать модель? Напиши мне напрямую в Telegram.',
      'tg.text':         'Самый быстрый способ связаться. Обычно отвечаю в течение нескольких часов. Принимаю заказы, рассматриваю коллаборации и всегда рад обратной связи.',
      'tg.btn':          'Открыть Telegram',
      'tg.chip1':        '🚀 Быстрые ответы',
      'tg.chip2':        '🌍 Удалённая работа',
      'tg.chip3':        '💎 Индивидуальные заказы',
      'qr.label':        'Сканируй для Telegram',
      'qr.hint':         'Замените на свой QR-код',

      'modal.cta':       'Заказать эту модель',

      'footer.tagline':  'Создаю цифровые миры в 3D',
      'footer.made':     'Сделано с Blender и страстью ◈',

      'theme.toDark':    'Тёмная тема',
      'theme.toLight':   'Светлая тема',
    },

    /* ══════════════════════════════════════════
       UKRAINIAN
    ══════════════════════════════════════════ */
    ua: {
      'nav.home':        'Головна',
      'nav.gallery':     'Галерея',
      'nav.about':       'Про мене',
      'nav.contact':     'Контакт',

      'hero.eyebrow':    '3D Художник & Blender Майстер',
      'hero.line1':      'Створюю',
      'hero.line2':      'Цифрові Світи',
      'hero.line3':      'У 3D',
      'hero.desc':       'Я створюю деталізовані 3D моделі в Blender — від персонажів і транспорту до sci-fi середовищ. Кожен полігон розповідає історію.',
      'hero.cta.gallery':'Переглянути Галерею',
      'hero.cta.contact':'Написати мені',
      'hero.stat1.label':'Створених моделей',
      'hero.stat2.label':'Років досвіду',
      'hero.stat3.label':'Категорій',

      'gallery.eyebrow': 'Портфоліо',
      'gallery.title1':  '3D Колекція',
      'gallery.title2':  'Моделей',
      'gallery.desc':    'Перегляньте мою колекцію 3D моделей, кожна створена з увагою до деталей.',
      'filter.all':      'Усі',
      'filter.characters':'Персонажі',
      'filter.vehicles': 'Транспорт',
      'filter.weapons':  'Зброя',
      'filter.buildings':'Будівлі',
      'filter.scifi':    'Sci-Fi',
      'filter.other':    'Інше',
      'card.view':       'Детальніше',
      'gallery.empty':   'У цій категорії поки що немає моделей.',

      'model.1.title':   'Кіберовоїн',
      'model.1.desc':    'Високополігональний солдат майбутнього з модульною бронею, процедурними текстурами та топологією для рігінгу.',
      'model.2.title':   'Неоновий Крейсер',
      'model.2.desc':    'Спортивний автомобіль у стилі кіберпанку з неоновим підсвічуванням, PBR-матеріалами та деталізованим інтер\'єром.',
      'model.3.title':   'Плазмова Гвинтівка',
      'model.3.desc':    'Sci-fi зброя з процедурним сяйвом, потертими металевими текстурами та знімним магазином.',
      'model.4.title':   'Токійський Хмарочос',
      'model.4.desc':    'Деталізований міський хмарочос із нічним підсвічуванням, дзеркальним склом та модульним дизайном поверхів.',
      'model.5.title':   'Орбітальна Станція',
      'model.5.desc':    'Модульна космічна станція з доками, сонячними панелями, процедурними пошкодженнями та внутрішніми приміщеннями.',
      'model.6.title':   'Пілот-Андроїд',
      'model.6.desc':    'Гуманоїдний андроїд із відкритими механічними суглобами, льотним костюмом та козирком з HUD-дисплеєм.',
      'model.7.title':   'Розвідувальний Дрон',
      'model.7.desc':    'Автономний дрон із лазерними сканерами, анімацією роторів та постарілим корпусом.',
      'model.8.title':   'Кристалічний Кластер',
      'model.8.desc':    'Процедурне кристалічне утворення з підповерхневим розсіюванням, каустиками та об\'ємним сяйвом.',
      'model.9.title':   'Стелс-Винищувач',
      'model.9.desc':    'Військовий літак-невидимка зі складними крилами, ефектом форсажу, кабіною та шасі.',

      'about.eyebrow':   'Про Мене',
      'about.title1':    'Художник',
      'about.title2':    'За',
      'about.title3':    'Моделями',
      'about.p1':        'Я самоучка у 3D-арті, закоханий у створення гіперреалістичних цифрових світів. Мій шлях розпочався з цікавості — як знімаються фільми та створюються ігри. Сьогодні я створюю ці світи сам у Blender.',
      'about.p2':        'Мій фокус — sci-fi естетика, персонажі та hard-surface моделювання. Мені подобається виклик: зробити цифрове фізично реальним — кожна подряпина, кожен шов, кожен відблиск має значення.',
      'about.p3':        'Коли не моделюю — вивчаю концепт-арт, дивлюся розбори CGI та постійно експериментую з новими техніками в Blender. Створювати — не просто навичка, це спосіб мислити.',
      'about.feat1':     'Готова до виробництва топологія та UV-розгортки',
      'about.feat2':     'PBR-матеріали, сумісні з основними рушіями',
      'about.feat3':     'Детальне компонування сцени та освітлення',
      'about.feat4':     'Кастомний рігінг та процедурні анімації',
      'about.badge':     'Відкритий для проектів',

      'contact.eyebrow': 'Зв\'язатись',
      'contact.title1':  'Давай',
      'contact.title2':  'Спілкуватись',
      'contact.desc':    'Є ідея проекту? Хочеш замовити модель? Напиши мені напряму в Telegram.',
      'tg.text':         'Найшвидший спосіб зв\'язатися. Зазвичай відповідаю протягом кількох годин. Приймаю замовлення, розглядаю колаборації та завжди радий зворотному зв\'язку.',
      'tg.btn':          'Відкрити Telegram',
      'tg.chip1':        '🚀 Швидкі відповіді',
      'tg.chip2':        '🌍 Дистанційна робота',
      'tg.chip3':        '💎 Індивідуальні замовлення',
      'qr.label':        'Скануй для Telegram',
      'qr.hint':         'Замініть на власний QR-код',

      'modal.cta':       'Замовити цю модель',

      'footer.tagline':  'Створюю цифрові світи у 3D',
      'footer.made':     'Зроблено з Blender та пристрастю ◈',

      'theme.toDark':    'Темна тема',
      'theme.toLight':   'Світла тема',
    },
  };

  // ─── State ───────────────────────────────────
  let currentLang = DEFAULT_LANG;

  // ─── Get saved lang ──────────────────────────
  function getSaved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }

  // ─── Apply language to DOM ───────────────────
  function applyLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    saveLang(lang);

    const t = TRANSLATIONS[lang];

    // Update all [data-i18n] elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        // Respect innerHTML vs textContent
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update [data-i18n-placeholder] for inputs
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Update [data-i18n-aria] for aria-label
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });

    // Set lang attribute on <html> for SEO / accessibility
    document.documentElement.setAttribute('lang', lang === 'ua' ? 'uk' : lang);

    // Update active state on lang buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-btn--active', btn.getAttribute('data-lang') === lang);
    });
  }

  // ─── Get current translation ─────────────────
  function t(key) {
    return (TRANSLATIONS[currentLang] || TRANSLATIONS[DEFAULT_LANG])[key] || key;
  }

  // ─── Build lang switcher HTML ─────────────────
  function buildSwitcher() {
    const wrap = document.getElementById('langSwitcher');
    if (!wrap) return;

    const langs = [
      { code: 'en', label: 'EN', title: 'English' },
      { code: 'ru', label: 'RU', title: 'Русский' },
      { code: 'ua', label: 'UA', title: 'Українська' },
    ];

    langs.forEach(({ code, label, title }) => {
      const btn = document.createElement('button');
      btn.className = 'lang-btn';
      btn.setAttribute('data-lang', code);
      btn.setAttribute('title', title);
      btn.setAttribute('aria-label', `Switch to ${title}`);
      btn.textContent = label;
      btn.addEventListener('click', () => applyLanguage(code));
      wrap.appendChild(btn);
    });
  }

  // ─── Init ────────────────────────────────────
  function init() {
    buildSwitcher();

    // Detect language: saved → browser → default
    const saved    = getSaved();
    const browser  = navigator.language?.slice(0, 2).toLowerCase();
    const detected = saved || (['en','ru','ua'].includes(browser) ? browser : DEFAULT_LANG);

    applyLanguage(detected);
  }

  // ─── Public ──────────────────────────────────
  return { init, applyLanguage, t, current: () => currentLang };

})();

// Make globally accessible (used by modal.js to get translated model data)
window.I18n = I18n;

document.addEventListener('DOMContentLoaded', () => I18n.init());