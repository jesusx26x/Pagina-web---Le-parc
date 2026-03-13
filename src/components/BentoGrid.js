/**
 * Bento Grid + About Section — Le Parc | Play & Chill Space
 * ──────────────────────────────────────────────────────────
 * LUJO AUTÉNTICO: Real photos only, carousel per card,
 * click-to-lightbox with full carousel navigation.
 */
import './BentoGrid.css';
import { openLightbox } from './Lightbox.js';

/**
 * Service data — each service has an array of images for its carousel.
 */
const SERVICES = [
  {
    id: 'indoor',
    tag: 'Parque Interior',
    title: 'Atracciones Indoor',
    desc: 'Piscina de pelotas gigante, carrusel, toboganes y zonas de juego temáticas.',
    images: [
      import.meta.env.BASE_URL + 'images/bento-indoor-play.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-ballpit-carousel.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-slides-indoor.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-ball-pit.jpeg',
    ],
    icon: 'play',
    iconColor: 'blue',
  },
  {
    id: 'chill',
    tag: 'Zona Chill',
    title: 'Lounge para Adultos',
    desc: 'Mezzanine con vista al parque donde los padres disfrutan mientras los niños juegan.',
    images: [
      import.meta.env.BASE_URL + 'images/gallery-carousel-closeup.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-lounge-view.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-party-setup.jpeg',
    ],
    icon: 'coffee',
    iconColor: 'pink',
  },
  {
    id: 'events',
    tag: 'Eventos',
    title: 'Salón de Fiestas',
    desc: 'Celebraciones inolvidables con decoración temática, catering y todo resuelto.',
    images: [
      import.meta.env.BASE_URL + 'images/gallery-ballpit-carousel.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-play-area.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-indoor-toddler.jpeg',
    ],
    icon: 'star',
    iconColor: 'orange',
  },
  {
    id: 'outdoor',
    tag: 'Exterior',
    title: 'Parque Exterior',
    desc: 'Columpios, zona verde y área al aire libre para conectar con la naturaleza.',
    images: [
      import.meta.env.BASE_URL + 'images/gallery-playground-slides.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-swings-outdoor.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-outdoor-adventure.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-climbing-wall.jpeg',
      import.meta.env.BASE_URL + 'images/gallery-outdoor-green.jpeg',
    ],
    icon: 'sun',
    iconColor: 'green',
  },
  {
    id: 'gastro',
    tag: 'Gastronomía',
    title: 'Comida & Bebidas',
    desc: 'Picaderas para adultos, pizza y palomitas para niños, sangría, refrescos y más.',
    images: [
      import.meta.env.BASE_URL + 'images/food-pizza-vegetariana.jpeg',
      import.meta.env.BASE_URL + 'images/food-rigatoni.jpeg',
      import.meta.env.BASE_URL + 'images/food-sandwich-fries.jpeg',
      import.meta.env.BASE_URL + 'images/food-dip-chips.jpeg',
      import.meta.env.BASE_URL + 'images/food-risotto.jpeg',
    ],
    icon: 'utensils',
    iconColor: 'orange',
  },
];

const ICONS = {
  play: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  coffee: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  star: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  utensils: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
};


/**
 * Character data from leparc.do — clickable info modals
 */
const CHARACTERS = [
  {
    id: 'sol',
    name: 'Sol',
    emoji: '🌞',
    color: 'var(--lp-orange-soft)',
    nameColor: '#EF6C00',
    traits: ['Chispa', 'Alegría', 'Energía', 'Luz'],
    traitColors: ['#E91E6C', '#3A7CA5', '#EF6C00', '#7BAE6E'],
    desc: '¡Soy la niña dinamita! Tengo mucha energía por eso me encanta jugar, bailar y brincar. Mi pasatiempo es reírme de todo, correr de un lado a otro y jugar con mis otros hermanitos.',
  },
  {
    id: 'mar',
    name: 'Mar',
    emoji: '🌊',
    color: 'var(--lp-turquoise-soft)',
    nameColor: '#80CBC4',
    traits: ['Ternura', 'Amor', 'Dulzura', 'Paz'],
    traitColors: ['#E91E6C', '#3A7CA5', '#EF6C00', '#7BAE6E'],
    desc: 'Soy la hermanita pequeña de Sol y la más cariñosa de todo el Clan. Me encanta jugar aunque no puedo negar que me encanta estar con mi mami recibiendo mimos. Transmito paz, y consigo todo lo que quiero con mi miradita tierna.',
  },
  {
    id: 'glow',
    name: 'Glow',
    emoji: '✨',
    color: 'var(--lp-purple-soft)',
    nameColor: '#AB47BC',
    traits: ['Magia', 'Creatividad', 'Imaginación', 'Brillo'],
    traitColors: ['#E91E6C', '#AB47BC', '#EF6C00', '#3A7CA5'],
    desc: '¡Soy la más creativa del grupo! Me encanta inventar juegos nuevos, pintar y hacer manualidades. Mi poder especial es convertir cualquier momento aburrido en una aventura mágica llena de colores y sorpresas.',
  },
  {
    id: 'george',
    name: 'George',
    emoji: '🌿',
    color: 'var(--lp-green-soft)',
    nameColor: '#7BAE6E',
    traits: ['Naturaleza', 'Calma', 'Curiosidad', 'Aventura'],
    traitColors: ['#7BAE6E', '#3A7CA5', '#EF6C00', '#E91E6C'],
    desc: 'Soy el explorador del grupo y el más curioso de todos. Me fascina la naturaleza, los animales y descubrir cosas nuevas. Mi lugar favorito es el parque exterior donde puedo correr, trepar y respirar aire fresco.',
  },
];

/* ═════════════════════════════════════════════
   ABOUT SECTION (Nosotros) — with Mission/Vision + Characters
   ═════════════════════════════════════════════ */
export function createAboutSection() {
  const section = document.createElement('section');
  section.className = 'about section';
  section.id = 'nosotros';
  section.setAttribute('aria-label', 'Sobre Le Parc');

  section.innerHTML = `
    <div class="container">
      <div class="about__content reveal">
          <div class="text-label" style="margin-bottom: var(--space-4);">
            Sobre Nosotros
          </div>
          <h2 class="about__title heading-serif">
            Meet the <em>family!</em>
          </h2>
          <hr class="divider divider--center" aria-hidden="true" />
          <p class="about__text">
            Le Parc es un espacio para toda la familia, que cuenta con atracciones únicas
            para el disfrute de los niños y adultos tanto en interior como en exterior.
            Nuestro compromiso es crear momentos inolvidables de diversión y entretenimiento
            a través de experiencias enriquecedoras, novedosas, creativas y seguras.
          </p>
          <div class="about__values">
            <span class="about__value">
              <span class="about__value-dot" style="background: var(--lp-orange);"></span>
              Diversidad
            </span>
            <span class="about__value">
              <span class="about__value-dot" style="background: var(--lp-blue);"></span>
              Integridad
            </span>
            <span class="about__value">
              <span class="about__value-dot" style="background: var(--lp-green);"></span>
              Innovación
            </span>
            <span class="about__value">
              <span class="about__value-dot" style="background: var(--lp-pink);"></span>
              Tradición
            </span>
          </div>
        </div>

      <!-- ═══ Misión · Visión · Valores ═══ -->
      <div class="about__mvv reveal reveal--delay-2">
        <div class="about__mvv-card">
          <div class="about__mvv-icon" style="background: var(--lp-blue-soft); color: var(--lp-blue);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <h4 class="about__mvv-title">Misión</h4>
          <p class="about__mvv-text">
            Ofrecer a nuestros clientes diversión para toda la familia, con la mejor y mayor variedad
            de atracciones. Crear momentos inolvidables a través de experiencias únicas, enriquecedoras,
            novedosas, creativas y seguras.
          </p>
        </div>
        <div class="about__mvv-card">
          <div class="about__mvv-icon" style="background: var(--lp-green-soft); color: var(--lp-green);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h4 class="about__mvv-title">Visión</h4>
          <p class="about__mvv-text">
            Ser el parque más completo de todo nuestro país con la mejor atención al cliente
            y los precios más competitivos del mercado.
          </p>
        </div>
        <div class="about__mvv-card">
          <div class="about__mvv-icon" style="background: var(--lp-pink-soft); color: var(--lp-pink);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <h4 class="about__mvv-title">Valores</h4>
          <p class="about__mvv-text">
            Diversidad, Integridad, Innovación y Tradición. En Le Parc, la familia es lo más importante.
            Fomentamos los lazos familiares, el compartir, la unión y el amor.
          </p>
        </div>
      </div>

      <!-- ═══ Le Parc Brand Characters — Clickable ═══ -->
      <div class="about__characters reveal reveal--delay-3">
        ${CHARACTERS.map(c => `
          <button class="about__character" data-character="${c.id}" aria-label="Conoce a ${c.name}" type="button">
            <div class="about__character-circle" style="background: ${c.color};">${c.emoji}</div>
            <span class="about__character-name">Conoce a<br><strong>${c.name}</strong></span>
            <span class="about__character-info" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}

/**
 * Initialize character modal interactions
 */
export function initCharacterModals() {
  document.querySelectorAll('[data-character]').forEach(btn => {
    btn.addEventListener('click', () => {
      const char = CHARACTERS.find(c => c.id === btn.dataset.character);
      if (!char) return;
      showCharacterModal(char);
    });
  });
}

function showCharacterModal(char) {
  // Remove any existing character modal
  document.getElementById('character-modal')?.remove();

  const overlay = document.createElement('div');
  overlay.className = 'char-modal';
  overlay.id = 'character-modal';

  overlay.innerHTML = `
    <div class="char-modal__backdrop"></div>
    <div class="char-modal__card">
      <button class="char-modal__close" aria-label="Cerrar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div class="char-modal__hero" style="background: ${char.color};">
        <span class="char-modal__emoji">${char.emoji}</span>
      </div>
      <div class="char-modal__body">
        <h3 class="char-modal__name" style="color: ${char.nameColor};">${char.name}</h3>
        <div class="char-modal__traits">
          ${char.traits.map((t, i) => `<span class="char-modal__trait" style="color: ${char.traitColors[i]};">${t}</span>`).join('')}
        </div>
        <p class="char-modal__desc">${char.desc}</p>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Animate in
  requestAnimationFrame(() => {
    overlay.classList.add('char-modal--open');
  });

  // Close handlers
  const close = () => {
    overlay.classList.remove('char-modal--open');
    setTimeout(() => overlay.remove(), 300);
  };
  overlay.querySelector('.char-modal__close').addEventListener('click', close);
  overlay.querySelector('.char-modal__backdrop').addEventListener('click', close);
  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
}



/* ═════════════════════════════════════════════
   BENTO GRID (Experiencias) — with Carousels
   ═════════════════════════════════════════════ */
export function createBentoGrid() {
  const section = document.createElement('section');
  section.className = 'services section';
  section.id = 'experiencias';
  section.setAttribute('aria-label', 'Nuestras experiencias');

  section.innerHTML = `
    <div class="container">
      <header class="services__header reveal">
        <div class="services__label text-label">
          Experiencias Le Parc
        </div>
        <h2 class="services__title heading-serif">
          ¡Todo listo y resuelto en un <em>mismo lugar!</em>
        </h2>
        <hr class="divider divider--center" aria-hidden="true" />
        <p class="services__subtitle">
          Nuestro salón de eventos cuenta con mezzanine con vista al parque,
          donde los padres pueden tener su espacio mientras los niños se divierten.
        </p>
      </header>

      <div class="bento stagger-children" role="list">
        ${SERVICES.map(service => `
          <article
            class="bento__item"
            id="service-${service.id}"
            role="listitem"
            tabindex="0"
            aria-label="${service.title}: ${service.desc}"
          >
            <div class="bento__carousel" data-carousel="${service.id}">
              ${service.images.map((src, i) => {
    const basePath = src.replace(/\.(png|jpe?g)$/i, '');
    return `
                <picture>
                  <source srcset="${basePath}.avif" type="image/avif">
                  <source srcset="${basePath}.webp" type="image/webp">
                  <img class="bento__image ${i === 0 ? 'bento__image--active' : ''}"
                       src="${src}" alt="${service.title} — Foto ${i + 1}"
                       loading="lazy" decoding="async"
                       data-index="${i}" />
                </picture>
              `}).join('')}
              <div class="bento__carousel-dots">
                ${service.images.map((_, i) => `
                  <span class="bento__dot ${i === 0 ? 'bento__dot--active' : ''}" data-dot="${i}"></span>
                `).join('')}
              </div>
            </div>
            <div class="bento__overlay" aria-hidden="true"></div>
            <div class="bento__content">
              <div class="bento__icon bento__icon--${service.iconColor}" aria-hidden="true">
                ${ICONS[service.icon]}
              </div>
              <span class="bento__tag">${service.tag}</span>
              <h3 class="bento__title">${service.title}</h3>
              <p class="bento__desc">${service.desc}</p>
            </div>
            <div class="bento__arrow" aria-hidden="true">${ICONS.arrow}</div>
          </article>
        `).join('')}
      </div>
    </div>
  `;

  return section;
}

/**
 * Initialize bento carousels: auto-advance + click-to-lightbox
 */
export function initBentoCarousels() {
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('.bento__image');
    const dots = carousel.querySelectorAll('.bento__dot');
    if (images.length <= 1) return;

    let current = 0;
    let interval = null;
    let isVisible = false;

    function showSlide(idx) {
      images.forEach(img => img.classList.remove('bento__image--active'));
      dots.forEach(dot => dot.classList.remove('bento__dot--active'));
      images[idx].classList.add('bento__image--active');
      dots[idx].classList.add('bento__dot--active');
      current = idx;
    }

    function startAutoplay() {
      clearInterval(interval);
      if (!isVisible) return;
      interval = setInterval(() => {
        showSlide((current + 1) % images.length);
      }, 8000);
    }

    function stopAutoplay() {
      clearInterval(interval);
      interval = null;
    }

    // IntersectionObserver: only run interval when visible (#7 memory leak fix)
    const item = carousel.closest('.bento__item');
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        startAutoplay();
      } else {
        stopAutoplay();
      }
    }, { threshold: 0.1 });
    visibilityObserver.observe(item);

    // Pause on hover
    item.addEventListener('mouseenter', () => stopAutoplay());
    item.addEventListener('mouseleave', () => startAutoplay());

    // Dot click
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        stopAutoplay();
        showSlide(parseInt(dot.dataset.dot, 10));
        startAutoplay();
      });
    });

    // Click on the ITEM (not carousel) → open lightbox
    item.addEventListener('click', (e) => {
      if (e.target.closest('.bento__dot')) return;
      const serviceId = carousel.dataset.carousel;
      const service = SERVICES.find(s => s.id === serviceId);
      if (!service) return;
      const lightboxImages = service.images.map((src, i) => ({
        src,
        caption: `${service.title} — ${service.tag} (${i + 1}/${service.images.length})`,
      }));
      openLightbox(lightboxImages, current);
    });
  });
}
