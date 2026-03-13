/**
 * Gallery Section — Le Parc | Play & Chill Space
 * ────────────────────────────────────────────────
 * Grouped carousel grid. Each category has multiple images
 * that auto-rotate every 4s. Click any image → fullscreen lightbox
 * with carousel navigation across ALL gallery images.
 */
import './GallerySection.css';
import { openLightbox } from './Lightbox.js';

/**
 * Gallery data — grouped by category, each with multiple images.
 * This creates carousel blocks instead of static single images.
 */
const GALLERY_GROUPS = [
    {
        id: 'interior-play',
        tag: 'Interior',
        caption: 'Zona de juegos interior',
        images: [
            import.meta.env.BASE_URL + 'images/gallery-ballpit-carousel.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-slides-indoor.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-ball-pit.jpeg',
            import.meta.env.BASE_URL + 'images/bento-indoor-play.jpeg',
        ],
    },
    {
        id: 'carousel-rides',
        tag: 'Atracciones',
        caption: 'Carrusel y atracciones',
        images: [
            import.meta.env.BASE_URL + 'images/gallery-carousel-closeup.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-play-area.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-indoor-toddler.jpeg',
        ],
    },
    {
        id: 'outdoor-zone',
        tag: 'Exterior',
        caption: 'Parque exterior y zona verde',
        images: [
            import.meta.env.BASE_URL + 'images/gallery-playground-slides.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-swings-outdoor.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-outdoor-adventure.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-outdoor-green.jpeg',
        ],
    },
    {
        id: 'climbing-mural',
        tag: 'Aventura',
        caption: 'Escalada y arte al aire libre',
        images: [
            import.meta.env.BASE_URL + 'images/gallery-climbing-wall.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-mural-outdoor.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-mural-detail.jpeg',
            import.meta.env.BASE_URL + 'images/gallery-outdoor-toys.jpeg',
        ],
    },
    {
        id: 'pizza-pastas',
        tag: 'Gastronomía',
        caption: 'Pizzas y pastas artesanales',
        images: [
            import.meta.env.BASE_URL + 'images/food-pizza-vegetariana.jpeg',
            import.meta.env.BASE_URL + 'images/food-pizza-pepperoni.jpeg',
            import.meta.env.BASE_URL + 'images/food-pizza-queso.jpeg',
            import.meta.env.BASE_URL + 'images/food-rigatoni.jpeg',
            import.meta.env.BASE_URL + 'images/food-pasta-crema.jpeg',
        ],
    },
    {
        id: 'food-premium',
        tag: 'Gastronomía',
        caption: 'Platos premium y picaderas',
        images: [
            import.meta.env.BASE_URL + 'images/food-sandwich-fries.jpeg',
            import.meta.env.BASE_URL + 'images/food-dip-chips.jpeg',
            import.meta.env.BASE_URL + 'images/food-risotto.jpeg',
            import.meta.env.BASE_URL + 'images/food-ensalada.jpeg',
            import.meta.env.BASE_URL + 'images/food-gratinado.jpeg',
        ],
    },
];

// Flatten all images for full gallery lightbox
const ALL_IMAGES = GALLERY_GROUPS.flatMap(g =>
    g.images.map(src => ({ src, caption: `${g.caption} — ${g.tag}` }))
);

export function createGallerySection() {
    const section = document.createElement('section');
    section.className = 'gallery section';
    section.id = 'galeria';
    section.setAttribute('aria-label', 'Galería de fotos de Le Parc');

    section.innerHTML = `
    <div class="container">
      <header class="gallery__header reveal">
        <div class="text-label" style="margin-bottom: var(--space-4);">
          <span class="hero__label-dot" aria-hidden="true"></span>
          Nuestras Instalaciones
        </div>
        <h2 class="gallery__title heading-serif">
          Vive la <em>experiencia</em>
        </h2>
        <hr class="divider divider--center" aria-hidden="true" />
        <p class="gallery__subtitle">
          Conoce cada rincón de Le Parc. Espacios de juego, arte al aire libre
          y gastronomía premium para toda la familia.
        </p>
      </header>

      <div class="gallery__grid stagger-children" role="list">
        ${GALLERY_GROUPS.map(group => `
          <div class="gallery__item" id="gallery-${group.id}" role="listitem"
               data-gallery-carousel="${group.id}">
            ${group.images.map((src, i) => {
        const basePath = src.replace(/\.(png|jpe?g)$/i, '');
        return `
              <picture>
                <source srcset="${basePath}.avif" type="image/avif">
                <source srcset="${basePath}.webp" type="image/webp">
                <img class="gallery__img ${i === 0 ? 'gallery__img--active' : ''}"
                     src="${src}" alt="${group.caption} — Foto ${i + 1}"
                     loading="lazy" decoding="async" data-index="${i}" />
              </picture>
            `}).join('')}
            <div class="gallery__carousel-dots">
              ${group.images.map((_, i) => `
                <span class="gallery__dot ${i === 0 ? 'gallery__dot--active' : ''}" data-dot="${i}"></span>
              `).join('')}
            </div>
            <span class="gallery__tag">${group.tag}</span>
            <div class="gallery__overlay" aria-hidden="true">
              <span class="gallery__caption">${group.caption}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="gallery__cta-row reveal">
        <a href="https://www.instagram.com/leparcrd/"
           target="_blank" rel="noopener"
           class="btn btn--ghost">
          Ver más en Instagram →
        </a>
      </div>
    </div>
  `;

    return section;
}

/**
 * Initialize gallery carousels: auto-advance + click-to-lightbox
 */
export function initGalleryCarousels() {
    const carousels = document.querySelectorAll('[data-gallery-carousel]');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.gallery__img');
        const dots = carousel.querySelectorAll('.gallery__dot');
        if (images.length <= 1) return;

        let current = 0;
        let interval = null;
        let isVisible = false;

        function showSlide(idx) {
            images.forEach(img => img.classList.remove('gallery__img--active'));
            dots.forEach(dot => dot.classList.remove('gallery__dot--active'));
            images[idx].classList.add('gallery__img--active');
            dots[idx].classList.add('gallery__dot--active');
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

        // IntersectionObserver: only run interval when visible (#8 memory leak fix)
        const visibilityObserver = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
        }, { threshold: 0.1 });
        visibilityObserver.observe(carousel);

        // Pause on hover
        carousel.addEventListener('mouseenter', () => stopAutoplay());
        carousel.addEventListener('mouseleave', () => startAutoplay());

        // Dot click
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoplay();
                showSlide(parseInt(dot.dataset.dot, 10));
                startAutoplay();
            });
        });

        // Click → open lightbox with ALL gallery images, starting at this group's current
        carousel.addEventListener('click', () => {
            const groupId = carousel.dataset.galleryCarousel;
            const groupIdx = GALLERY_GROUPS.findIndex(g => g.id === groupId);
            // Calculate global index
            let globalIdx = 0;
            for (let i = 0; i < groupIdx; i++) {
                globalIdx += GALLERY_GROUPS[i].images.length;
            }
            globalIdx += current;
            openLightbox(ALL_IMAGES, globalIdx);
        });
    });
}
