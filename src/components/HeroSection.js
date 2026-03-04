/**
 * Hero Section — Le Parc | Play & Chill Space
 * ────────────────────────────────────────────
 * SPLIT LAYOUT PREMIUM:
 *   Left: Text + CTAs (fondo claro con glow)
 *   Right: Video tarjeta flotante con bordes redondeados
 *
 * Features:
 *   - Native <video> autoplay muted loop
 *   - Audio toggle button (mute/unmute)
 *   - YouTube fallback if local video fails
 */
import './HeroSection.css';

const YOUTUBE_FALLBACK_ID = 'empL5AO4C2c';

export function createHeroSection() {
  const section = document.createElement('section');
  section.className = 'hero';
  section.id = 'hero';
  section.setAttribute('aria-label', 'Bienvenido a Le Parc');

  section.innerHTML = `
    <div class="hero__split">

      <!-- COL 1: Content (fondo con glow, texto oscuro) -->
      <div class="hero__content">
        <a href="https://maps.app.goo.gl/LbaTvtMHcMNPi8Mf7" target="_blank" rel="noopener noreferrer" class="hero__label-link">
          <span class="hero__label">
            <span class="hero__label-dot" aria-hidden="true"></span>
            Ave. López de Vega #11, Santo Domingo
          </span>
        </a>

        <h1 class="hero__title">
          Más que un parque,<br/>
          un <em>Social Club</em><br/>
          for <span class="hero__accent-pink">everyone</span>
        </h1>

        <hr class="hero__divider" aria-hidden="true" />

        <p class="hero__subtitle">
          Le Parc es un espacio para toda la familia, con atracciones únicas
          para el disfrute de niños y adultos tanto en interior como en exterior.
        </p>

        <div class="hero__actions">
          <a href="https://wa.me/18499172435?text=Hola%20Le%20Parc%2C%20quiero%20reservar%20una%20fiesta"
             target="_blank" rel="noopener noreferrer"
             class="btn btn--pink btn--lg"
             id="hero-cta-reservar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round"
                 stroke-linejoin="round" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Reservar mi Fiesta
          </a>
          <a href="https://wa.me/18499172435?text=Hola%20Leparc%20quiero%20reservar%20unas%20entradas"
             target="_blank" rel="noopener noreferrer"
             class="btn btn--secondary btn--lg"
             id="hero-cta-entradas">
            Comprar Entradas
          </a>
        </div>

        <div class="hero__ticket">
          <span class="hero__ticket-label">Entrada</span>
          <span class="hero__ticket-price">Niños RD$1,000</span>
          <span class="hero__ticket-free">Adultos GRATIS</span>
        </div>
      </div>

      <!-- COL 2: Video tarjeta flotante premium -->
      <div class="hero__media-col">
        <div class="hero__media-wrapper" id="hero-media-wrapper">
          <video
            class="hero__video"
            id="hero-video"
            autoplay
            loop
            muted
            playsinline
            preload="metadata"
            aria-hidden="true"
            poster="${import.meta.env.BASE_URL}images/hero-poster.jpg"
          >
            <source src="${import.meta.env.BASE_URL}videos/leparc-instalaciones.mp4" type="video/mp4" />
          </video>

          <!-- Audio toggle button -->
          <button class="hero__audio-btn" id="hero-audio-btn" aria-label="Activar sonido" type="button">
            <!-- Muted icon (speaker with X) -->
            <svg class="hero__audio-icon--muted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
            <!-- Unmuted icon (speaker with waves) -->
            <svg class="hero__audio-icon--unmuted" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
        </div>
      </div>

    </div>

    <div class="hero__scroll" aria-hidden="true">
      <span class="hero__scroll-text">Descubre</span>
      <div class="hero__scroll-line"></div>
    </div>
  `;

  return section;
}

/**
 * Initialize hero video:
 *   1. Autoplay check
 *   2. Audio toggle (mute/unmute)
 *   3. YouTube fallback on error
 */
export function initHeroVideo() {
  const video = document.getElementById('hero-video');
  const audioBtn = document.getElementById('hero-audio-btn');
  const wrapper = document.getElementById('hero-media-wrapper');

  if (!video || !wrapper) return;

  // ── Autoplay attempt ──
  video.play().catch(() => {
    // Autoplay blocked — video stays paused, user can interact
    console.log('[Le Parc] Autoplay blocked by browser policy');
  });

  // ── BLOQUE 3: Audio toggle ──
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      audioBtn.classList.toggle('hero__audio-btn--unmuted', !video.muted);
      audioBtn.setAttribute('aria-label', video.muted ? 'Activar sonido' : 'Silenciar video');

      // If video was paused (autoplay blocked), try playing on interaction
      if (video.paused) {
        video.play().catch(() => { });
      }
    });
  }

  // ── BLOQUE 3: YouTube fallback on video error ──
  video.addEventListener('error', () => {
    console.warn('[Le Parc] Local video failed — falling back to YouTube embed');
    fallbackToYouTube(wrapper);
  }, true);

  // Also listen on source error (more reliable cross-browser)
  const source = video.querySelector('source');
  if (source) {
    source.addEventListener('error', () => {
      console.warn('[Le Parc] Video source error — falling back to YouTube embed');
      fallbackToYouTube(wrapper);
    });
  }
}

/**
 * Replace video with YouTube iframe
 */
function fallbackToYouTube(wrapper) {
  // Prevent multiple fallbacks
  if (wrapper.dataset.fallback === 'true') return;
  wrapper.dataset.fallback = 'true';

  wrapper.innerHTML = `
    <iframe
      class="hero__youtube"
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/${YOUTUBE_FALLBACK_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_FALLBACK_ID}&controls=0&showinfo=0&modestbranding=1"
      title="Le Parc — Instalaciones"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  `;
}
