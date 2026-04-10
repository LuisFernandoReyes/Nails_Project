const components = [
  ['navbar', './partials/navbar.html'],
  ['hero', './partials/hero.html'],
  ['gallery', './partials/gallery.html'],
  ['services', './partials/services.html'],
  ['about', './partials/about.html'],
  ['testimonials', './partials/testimonials.html'],
  ['cta', './partials/cta.html'],
  ['footer', './partials/footer.html']
];

const navLinks = [
  { href: '#gallery', label: 'Lookbook' },
  { href: '#services', label: 'Servicios' },
  { href: '#about', label: 'Experiencia' },
  { href: '#testimonials', label: 'Opiniones' }
];

const loadComponent = async (id, file) => {
  const target = document.getElementById(id);

  if (!target) return;

  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`No se pudo cargar ${file}`);
    }

    target.innerHTML = await response.text();
  } catch (error) {
    target.innerHTML = `
      <section class="mx-auto max-w-4xl px-6 py-10">
        <div class="rounded-3xl border border-stone-200 bg-white p-6 text-center text-stone-700 shadow-soft">
          Hubo un problema al cargar esta seccion.
        </div>
      </section>
    `;
    console.error(error);
  }
};

const initNavbar = () => {
  const nav = document.querySelector('[data-nav-root]');
  if (!nav) return;

  const desktopLinks = nav.querySelector('[data-nav-links-desktop]');
  const mobileLinks = nav.querySelector('[data-nav-links-mobile]');
  const toggle = nav.querySelector('[data-menu-toggle]');
  const panel = nav.querySelector('[data-menu-panel]');

  if (!desktopLinks || !mobileLinks || !toggle || !panel) return;

  desktopLinks.innerHTML = navLinks
    .map(
      ({ href, label }) =>
        `<a href="${href}" class="text-sm font-semibold text-stone-700 transition hover:text-mulberry">${label}</a>`
    )
    .join('');

  mobileLinks.innerHTML = navLinks
    .map(
      ({ href, label }) =>
        `<a href="${href}" class="block rounded-2xl px-4 py-3 font-semibold text-stone-700 transition hover:bg-stone-100 hover:text-mulberry">${label}</a>`
    )
    .join('');

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    panel.classList.toggle('hidden', isOpen);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      panel.classList.add('hidden');
    });
  });
};

const initFooter = () => {
  const year = document.querySelector('[data-current-year]');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
};

const initPage = () => {
  initNavbar();
  initFooter();
};

Promise.all(components.map(([id, file]) => loadComponent(id, file))).then(initPage);
