/**
 * Navigation — Le Parc | Play & Chill Space
 * Real brand links and contact info from leparc.do
 */
import './Navigation.css';

const NAV_LINKS = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Experiencias', href: '#experiencias' },
  { label: 'Nuestros Planes', href: '#planes' },
  { label: 'Corporativo', href: '#corporativo' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

export function createNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'nav';
  nav.id = 'main-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Navegación principal');

  nav.innerHTML = `
    <div class="nav__inner">
      <!-- Logo — Real Le Parc brand image -->
      <a href="#" class="nav__logo" aria-label="Le Parc - Inicio">
        <img
          src="${import.meta.env.BASE_URL}images/logo-leparc.jpeg"
          alt="Le Parc Play & Chill Space"
          class="nav__logo-img"
          width="120"
          height="52"
        />
      </a>

      <!-- Desktop Links -->
      <ul class="nav__links">
        ${NAV_LINKS.map(link => `
          <li>
            <a href="${link.href}" class="nav__link"${link.external ? ' target="_blank" rel="noopener"' : ''}>${link.label}</a>
          </li>
        `).join('')}
      </ul>

      <!-- Phone -->
      <a href="tel:+18499172435" class="nav__phone" aria-label="Llamar a Le Parc">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        849-917-2435
      </a>

      <!-- CTA — Direct WhatsApp, no Parent Gate intercept -->
      <a href="https://wa.me/18499172435?text=Hola%20Le%20Parc%2C%20quiero%20reservar%20una%20fiesta" target="_blank" rel="noopener noreferrer" class="btn btn--pink nav__cta" id="nav-cta-reservar">
        Reservar Fiesta
      </a>

      <!-- Mobile Toggle -->
      <button class="nav__toggle" id="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
        <span class="nav__toggle-line"></span>
        <span class="nav__toggle-line"></span>
        <span class="nav__toggle-line"></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div class="nav__mobile" id="nav-mobile" aria-hidden="true">
      ${NAV_LINKS.map(link => `
        <a href="${link.href}" class="nav__mobile-link"${link.external ? ' target="_blank" rel="noopener"' : ''}>${link.label}</a>
      `).join('')}
      <a href="https://wa.me/18499172435?text=Hola%20Le%20Parc%2C%20quiero%20reservar%20una%20fiesta" target="_blank" rel="noopener noreferrer" class="btn btn--pink btn--lg nav__mobile-cta">Reservar Fiesta</a>
    </div>
  `;

  return nav;
}

export function initNavigation() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');
  if (!nav || !toggle || !mobile) return;

  const handleScroll = () => {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('active');
    toggle.classList.toggle('active');
    mobile.classList.toggle('active');
    toggle.setAttribute('aria-expanded', !isOpen);
    mobile.setAttribute('aria-hidden', isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  mobile.querySelectorAll('.nav__mobile-link, .nav__mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      mobile.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      mobile.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}
