/**
 * Lightbox — Le Parc
 * ──────────────────
 * Fullscreen image viewer with carousel functionality.
 * - Click any gallery/bento image → opens lightbox
 * - Auto-advances every 6s (paused when open for viewing)
 * - Left/Right arrows + swipe + keyboard navigation
 * - Close via X, backdrop click, or ESC
 */
import './Lightbox.css';

let currentImages = [];
let currentIndex = 0;
let lightboxEl = null;

export function createLightbox() {
    const el = document.createElement('div');
    el.className = 'lightbox';
    el.id = 'lightbox';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Visor de imágenes');
    el.setAttribute('aria-hidden', 'true');

    el.innerHTML = `
    <div class="lightbox__backdrop"></div>
    <button class="lightbox__close" aria-label="Cerrar visor">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Imagen anterior">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Imagen siguiente">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"/>
      </svg>
    </button>
    <div class="lightbox__stage">
      <img class="lightbox__image" src="" alt="" />
    </div>
    <div class="lightbox__caption" id="lightbox-caption"></div>
    <div class="lightbox__counter" id="lightbox-counter"></div>
  `;

    lightboxEl = el;
    return el;
}

export function initLightbox() {
    if (!lightboxEl) return;

    const backdrop = lightboxEl.querySelector('.lightbox__backdrop');
    const closeBtn = lightboxEl.querySelector('.lightbox__close');
    const prevBtn = lightboxEl.querySelector('.lightbox__nav--prev');
    const nextBtn = lightboxEl.querySelector('.lightbox__nav--next');

    closeBtn.addEventListener('click', closeLightbox);
    backdrop.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    document.addEventListener('keydown', (e) => {
        if (!lightboxEl.classList.contains('lightbox--open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    // Touch swipe
    let touchStartX = 0;
    const stage = lightboxEl.querySelector('.lightbox__stage');
    stage.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1);
    });
}

/**
 * Open lightbox with an array of images and starting index.
 * @param {Array<{src: string, caption: string}>} images
 * @param {number} startIndex
 */
export function openLightbox(images, startIndex = 0) {
    currentImages = images;
    currentIndex = startIndex;
    showImage();
    lightboxEl.classList.add('lightbox--open');
    lightboxEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightboxEl.classList.remove('lightbox--open');
    lightboxEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function navigate(dir) {
    currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
    showImage();
}

function showImage() {
    const img = lightboxEl.querySelector('.lightbox__image');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');
    const data = currentImages[currentIndex];

    // Crossfade
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = data.src;
        img.alt = data.caption || '';
        caption.textContent = data.caption || '';
        counter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
        img.style.opacity = '1';
    }, 200);
}
