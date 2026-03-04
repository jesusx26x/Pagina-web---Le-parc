/**
 * Cinderella Section — Le Parc | Play & Chill Space
 * ──────────────────────────────────────────────────
 * Dedicated section for the Cinderella Princess Salon.
 * Plan especial RD$40,000. CTA integrado con parentGateGuard
 * via data-action="select-plan" (event delegation en main.js).
 *
 * LUJO AUTÉNTICO: --lp-purple + --lp-pink como acentos.
 * Fondo: --color-bg-warm (#F5F5F0).
 */
import './CinderellaSection.css';

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const HIGHLIGHTS = [
    'Maquillaje y peinado profesional para princesas',
    'Disfraces y accesorios temáticos de alta calidad',
    'Sesión de fotos con escenario de cuento de hadas',
    'Decoración completa del salón estilo castillo',
    'Animación con personajes de princesas',
    'Bizcocho temático incluido (2 niveles)',
    'Duración: 4 horas de evento + 2 de montaje',
    'Capacidad: hasta 25 niñas + adultos acompañantes',
];

const FEATURES = [
    { emoji: '👑', label: 'Coronación' },
    { emoji: '💄', label: 'Maquillaje' },
    { emoji: '📸', label: 'Fotos Pro' },
    { emoji: '🏰', label: 'Decoración' },
];

export function createCinderellaSection() {
    const section = document.createElement('section');
    section.className = 'cinderella section';
    section.id = 'cinderella';
    section.setAttribute('aria-label', 'Salón Cinderella — Experiencia de princesas');

    section.innerHTML = `
    <div class="container">
      <div class="cinderella__grid">
        <!-- Visual — Real photo container -->
        <div class="cinderella__visual reveal">
          <picture>
            <!-- AVIF: <source srcset="/images/cinderella-salon.avif" type="image/avif" /> -->
            <!-- WebP: <source srcset="/images/cinderella-salon.webp" type="image/webp" /> -->
            <img
              src="/images/service-membership.png"
              alt="Salón Cinderella de Le Parc — espacio mágico para princesas"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div class="cinderella__crown" aria-hidden="true">👑</div>
        </div>

        <!-- Content -->
        <div class="cinderella__content reveal reveal--delay-2">
          <div class="cinderella__label text-label">
            <span class="cinderella__label-dot" aria-hidden="true"></span>
            Experiencia Exclusiva
          </div>

          <h2 class="cinderella__title heading-serif">
            Salón <em>Cinderella</em>
          </h2>

          <hr class="divider" style="background: var(--lp-purple);" aria-hidden="true" />

          <p class="cinderella__desc">
            Un espacio mágico diseñado para niñas de 2 a 10 años. Cada detalle
            está pensado para crear la experiencia de princesa perfecta: maquillaje,
            peinado, disfraces, decoración de castillo y una sesión de fotos inolvidable.
          </p>

          <div class="cinderella__highlights">
            ${HIGHLIGHTS.map(h => `
              <div class="cinderella__highlight">
                <span class="cinderella__highlight-icon" aria-hidden="true">${CHECK_ICON}</span>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>

          <!-- Price -->
          <div class="cinderella__price-card">
            <span class="cinderella__price-from">Desde</span>
            <span class="cinderella__price-currency">RD$</span>
            <span class="cinderella__price-amount">40,000</span>
          </div>

          <!-- CTA — intercepted by event delegation in main.js -->
          <a
            href="https://wa.me/18499172435?text=Hola%20Le%20Parc%2C%20me%20interesa%20el%20Sal%C3%B3n%20Cinderella"
            target="_blank"
            rel="noopener"
            class="btn cinderella__cta btn--lg"
            data-action="select-plan"
            data-tier="cinderella"
            id="cta-cinderella"
          >
            👑 Reservar Salón Cinderella
          </a>
        </div>
      </div>

      <!-- Feature cards -->
      <div class="cinderella__features stagger-children">
        ${FEATURES.map(f => `
          <div class="cinderella__feature">
            <span class="cinderella__feature-emoji" aria-hidden="true">${f.emoji}</span>
            <span class="cinderella__feature-label">${f.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

    return section;
}
