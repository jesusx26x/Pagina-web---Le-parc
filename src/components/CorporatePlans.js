/**
 * Corporate Plans Section — Le Parc | Play & Chill Space
 * ──────────────────────────────────────────────────────
 * Private event space rental for corporate, family or institutional events.
 * Real pricing from Planes Corporativos LE PARC 2025.
 */
import './CorporatePlans.css';

const CORPORATE_PLANS = [
    {
        capacity: 30,
        price: '53,735',
        highlight: false,
    },
    {
        capacity: 50,
        price: '86,460',
        highlight: true,
    },
    {
        capacity: 80,
        price: '115,390',
        highlight: false,
    },
];

const INCLUDES_BASE = [
    'Camareros y bartender',
    'Supervisor y personal de limpieza',
    'Mobiliario completo',
    'Sonido ambiental',
    'Cristalería y material gastable',
];

const INCLUDES_LARGE = [
    ...INCLUDES_BASE,
    'Servicio de valet parking',
];

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

export function createCorporatePlans() {
    const section = document.createElement('section');
    section.className = 'corporate section';
    section.id = 'corporativo';
    section.setAttribute('aria-label', 'Planes corporativos para eventos privados');

    section.innerHTML = `
    <div class="container">
      <header class="corporate__header reveal">
        <div class="text-label" style="margin-bottom: var(--space-4);">
          <span class="hero__label-dot" aria-hidden="true"></span>
          Eventos Privados
        </div>
        <h2 class="corporate__title heading-serif">
          Celebra tus eventos en <em>Le Parc</em>
        </h2>
        <hr class="divider divider--center" aria-hidden="true" />
        <p class="corporate__subtitle">
          Espacios cerrados y exclusivos con capacidad hasta 80 personas,
          ideales para eventos corporativos, familiares o institucionales.
        </p>
      </header>

      <div class="corporate__grid stagger-children">
        ${CORPORATE_PLANS.map(plan => {
        const features = plan.capacity >= 35 ? INCLUDES_LARGE : INCLUDES_BASE;
        return `
          <div class="corporate__card ${plan.highlight ? 'corporate__card--highlight' : ''}" role="article">
            ${plan.highlight ? '<div class="corporate__badge">Más Popular</div>' : ''}
            <div class="corporate__capacity">
              <span class="corporate__capacity-number">${plan.capacity}</span>
              <span class="corporate__capacity-label">personas</span>
            </div>
            <div class="corporate__pricing">
              <span class="corporate__currency">RD$</span>
              <span class="corporate__price">${plan.price}</span>
            </div>
            <p class="corporate__price-note">No incluye ITBIS</p>
            <hr class="corporate__divider" aria-hidden="true" />
            <ul class="corporate__features">
              ${features.map(f => `
                <li class="corporate__feature">
                  <span class="corporate__feature-icon" aria-hidden="true">${CHECK_ICON}</span>
                  ${f}
                </li>
              `).join('')}
            </ul>
            <a href="https://wa.me/18499172435?text=Hola%20Le%20Parc%2C%20me%20interesa%20el%20plan%20corporativo%20para%20${plan.capacity}%20personas"
               target="_blank" rel="noopener"
               class="btn ${plan.highlight ? 'btn--primary' : 'btn--ghost'} corporate__cta"
               data-action="select-plan" data-tier="corporate-${plan.capacity}">
              Solicitar Cotización
            </a>
          </div>
        `;
    }).join('')}
      </div>

      <!-- Servicios Adicionales -->
      <div class="corporate__extras reveal">
        <h3 class="corporate__extras-title">Servicios Adicionales</h3>
        <div class="corporate__extras-grid">
          <div class="corporate__extra">
            <span class="corporate__extra-icon">🍽️</span>
            <span>Catering personalizado</span>
          </div>
          <div class="corporate__extra">
            <span class="corporate__extra-icon">🍸</span>
            <span>Bebidas y barra libre</span>
          </div>
          <div class="corporate__extra">
            <span class="corporate__extra-icon">🎨</span>
            <span>Decoración temática</span>
          </div>
          <div class="corporate__extra">
            <span class="corporate__extra-icon">🎓</span>
            <span>Talleres personalizados</span>
          </div>
        </div>
      </div>

      <!-- Condiciones -->
      <div class="corporate__conditions reveal">
        <div class="corporate__condition">
          <strong>📅 Horario:</strong> Lunes a domingo, 8:00 AM — 10:00 PM
        </div>
        <div class="corporate__condition">
          <strong>💳 Reserva:</strong> 60% de adelanto · Total 48h antes del evento
        </div>
        <div class="corporate__condition">
          <strong>↩️ Cancelación:</strong> Notificar con 7 días de anticipación para reembolso del 40%
        </div>
      </div>
    </div>
  `;

    return section;
}
