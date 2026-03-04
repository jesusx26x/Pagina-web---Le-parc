/**
 * Event Configurator — Le Parc Birthday Plans
 * Complete real pricing from leparc.do (5 plans × 3 tiers)
 * Prepared for ROLLER/Clubspeed API integration
 */
import './EventConfigurator.css';

const PLANS_DATA = {
  plan1: {
    label: '10 Niños / 10 Adultos', capacity: { kids: 10, adults: 10 },
    tiers: [{ price: '41,800', key: 'basic' }, { price: '58,300', key: 'premium' }, { price: '119,900', key: 'premiumPlus' }]
  },
  plan2: {
    label: '20 Niños / 20 Adultos', capacity: { kids: 20, adults: 20 },
    tiers: [{ price: '50,600', key: 'basic' }, { price: '88,000', key: 'premium' }, { price: '154,000', key: 'premiumPlus' }]
  },
  plan3: {
    label: '30 Niños / 30 Adultos', capacity: { kids: 30, adults: 30 },
    tiers: [{ price: '68,200', key: 'basic' }, { price: '99,000', key: 'premium' }, { price: '176,000', key: 'premiumPlus' }]
  },
  plan4: {
    label: '40 Niños / 40 Adultos', capacity: { kids: 40, adults: 40 },
    tiers: [{ price: '93,500', key: 'basic' }, { price: '162,800', key: 'premium' }, { price: '225,500', key: 'premiumPlus' }]
  },
  plan5: {
    label: '60 Niños / 60 Adultos', capacity: { kids: 60, adults: 60 },
    tiers: [{ price: '126,500', key: 'basic' }, { price: '184,800', key: 'premium' }, { price: '253,000', key: 'premiumPlus' }]
  },
};

/** Nuevo plan: Cumpleaños Feliz — paquete pequeño todo incluido */
const CUMPLE_FELIZ = {
  name: 'Cumpleaños Feliz',
  price: '24,500',
  tagline: '3 horas de reserva · 5 niños + 8 adultos',
  priceNote: 'Impuestos incluidos',
  features: [
    'Decoración de la mesa',
    'Bizcocho incluido',
    'Funditas para los niños',
    'Invitación digital',
    'Picadera para los adultos',
    '2 pedazos de pizza, 1 palomitas, 1 algodón de azúcar por niño',
    'Agua, refrescos para niños y adultos',
  ],
};

const TIER_INFO = {
  basic: {
    name: 'Básico',
    tagline: '3 horas de evento + 1 hora de montaje',
    iconClass: 'plan-card__icon--basic',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    features: [
      'Invitación digital',
      'Mesas y sillas para invitados',
      '1 gruesa de globos + trío de cilindros',
      'Mueble para funditas',
      'Mampara redonda temática + caja de regalo',
      'Palomitas y pizza para niños',
      'Picadera adultos (4 variedades)',
      'Agua, refrescos, té frío',
      'Desechables + camarero',
      'Vallet parking',
    ],
    btnClass: 'btn--ghost', btnText: 'Más Información',
  },
  premium: {
    name: 'Premium',
    tagline: '4 horas de evento + 2 horas de montaje',
    iconClass: 'plan-card__icon--premium',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    features: [
      'Todo lo incluido en Básico',
      '2 gruesas de globos + Backpanel temático',
      'Bizcocho camuflaje 2 niveles con suspiro + bizcocho para partir',
      '4 variedades de postres (cakepop, ricekrispies, suspirito, minicupcakes)',
      'Palomitas, algodón y pizza para niños',
      'Música, animación y pinta caritas',
      'Funditas + sangría para adultos',
    ],
    btnClass: 'btn--pink', btnText: 'Elegir Premium',
    recommended: true,
  },
  premiumPlus: {
    name: 'Premium Plus',
    tagline: '4 horas de evento + 2 horas de montaje',
    iconClass: 'plan-card__icon--plus',
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>`,
    features: [
      'Todo lo incluido en Premium',
      '3 gruesas de globos + centros de mesa',
      'Bizcocho camuflaje 2 niveles en fondant + bizcocho para partir',
      '5 variedades de postres',
      'Picadera adultos (6 variedades)',
      'Jugo natural + sangría (1 copa p/persona)',
      'Fotografía digital profesional',
      'Funditas + caja de regalo',
      'Música, animación y pinta caritas',
      'Vallet parking',
    ],
    btnClass: 'btn--primary', btnText: 'Reservar Premium Plus',
  },
};

const CHECK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
const PEOPLE_ICON = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`;

function buildPlanCard(tierKey, priceStr, capacity) {
  const tier = TIER_INFO[tierKey];
  // CRO: Calculate price-per-child for psychological anchoring
  const priceNum = parseInt(priceStr.replace(/,/g, ''), 10);
  const perChild = Math.round(priceNum / capacity.kids).toLocaleString('es-DO');
  // CRO: Urgency badge on Premium/Plus tiers
  const showUrgency = tierKey === 'premium' || tierKey === 'premiumPlus';
  const planLabel = `${tier.name} — ${capacity.kids}+${capacity.adults}`;
  return `
    <div class="plan-card ${tier.recommended ? 'plan-card--recommended' : ''}"
         id="plan-${tierKey}" data-tier="${tierKey}" role="article" tabindex="0">
      ${tier.recommended ? '<div class="plan-card__badge">Más Popular</div>' : ''}
      ${showUrgency ? '<div class="badge-urgency">🔥 Alta demanda este mes</div>' : ''}
      <div class="plan-card__icon ${tier.iconClass}" aria-hidden="true">${tier.icon}</div>
      <h3 class="plan-card__name">${tier.name}</h3>
      <p class="plan-card__tagline">${tier.tagline}</p>
      <div class="plan-card__capacity">
        <span class="plan-card__capacity-icon" aria-hidden="true">${PEOPLE_ICON}</span>
        ${capacity.kids} niños + ${capacity.adults} adultos
      </div>
      <div class="plan-card__pricing">
        <span class="plan-card__currency">RD$</span>
        <span class="plan-card__price">${priceStr}</span>
      </div>
      <span class="plan-price-anchor">desde RD$${perChild} / niño</span>
      <p class="plan-card__price-note">Precio L-J · <em>+20% fines de semana</em></p>
      <hr class="plan-card__divider" aria-hidden="true" />
      <ul class="plan-card__features">
        ${tier.features.map(f => `
          <li class="plan-card__feature">
            <span class="plan-card__feature-icon" aria-hidden="true">${CHECK_ICON}</span>
            ${f}
          </li>
        `).join('')}
      </ul>
      <button class="btn ${tier.btnClass} plan-card__cta"
         data-action="select-plan" data-tier="${tierKey}"
         data-plan-label="${planLabel}">
        ${tier.btnText}
      </button>
    </div>
  `;
}

export function createEventConfigurator() {
  const section = document.createElement('section');
  section.className = 'configurator section';
  section.id = 'planes';
  section.setAttribute('aria-label', 'Nuestros planes de cumpleaños');

  const defaultPlan = PLANS_DATA.plan1;

  section.innerHTML = `
    <div class="container">
      <header class="configurator__header reveal">
        <div class="text-label" style="margin-bottom: var(--space-4);">
          <span class="hero__label-dot" aria-hidden="true"></span>
          Nuestros Planes
        </div>
        <h2 class="configurator__title heading-serif">
          ¡Todo listo y resuelto en un <em>mismo lugar!</em>
        </h2>
        <hr class="divider divider--center" aria-hidden="true" />
        <p class="configurator__subtitle">
          Selecciona la cantidad de invitados y elige el paquete perfecto para
          la celebración de tu familia.
        </p>
      </header>

      <!-- ═══ NUEVO: Plan Cumpleaños Feliz ═══ -->
      <div class="configurator__cumple-feliz reveal" id="cumple-feliz">
        <div class="plan-card plan-card--cumple">
          <div class="plan-card__badge" style="background: var(--lp-orange);">🎂 Nuevo</div>
          <div class="plan-card__icon plan-card__icon--cumple" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/>
              <path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>
              <path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/>
            </svg>
          </div>
          <h3 class="plan-card__name">${CUMPLE_FELIZ.name}</h3>
          <p class="plan-card__tagline">${CUMPLE_FELIZ.tagline}</p>
          <div class="plan-card__pricing">
            <span class="plan-card__currency">RD$</span>
            <span class="plan-card__price">${CUMPLE_FELIZ.price}</span>
          </div>
          <p class="plan-card__price-note" style="color: var(--lp-green);">${CUMPLE_FELIZ.priceNote}</p>
          <hr class="plan-card__divider" aria-hidden="true" />
          <ul class="plan-card__features">
            ${CUMPLE_FELIZ.features.map(f => `
              <li class="plan-card__feature">
                <span class="plan-card__feature-icon" aria-hidden="true">${CHECK_ICON}</span>
                ${f}
              </li>
            `).join('')}
          </ul>
          <a href="https://wa.me/18499172435?text=Hola%20Le%20Parc%2C%20me%20interesa%20el%20Plan%20Cumplea%C3%B1os%20Feliz"
             target="_blank" rel="noopener"
             class="btn btn--orange plan-card__cta"
             id="cta-cumple-feliz" data-action="select-plan" data-tier="cumpleFeliz">
            🎂 Reservar Cumpleaños Feliz
          </a>
        </div>
      </div>

      <div class="configurator__tabs reveal reveal--delay-1" role="tablist" aria-label="Seleccionar capacidad">
        <button class="configurator__tab active" role="tab" data-plan="plan1" aria-selected="true" id="tab-plan1">Plan 1 · 10+10</button>
        <button class="configurator__tab" role="tab" data-plan="plan2" aria-selected="false" id="tab-plan2">Plan 2 · 20+20</button>
        <button class="configurator__tab" role="tab" data-plan="plan3" aria-selected="false" id="tab-plan3">Plan 3 · 30+30</button>
        <button class="configurator__tab" role="tab" data-plan="plan4" aria-selected="false" id="tab-plan4">Plan 4 · 40+40</button>
        <button class="configurator__tab" role="tab" data-plan="plan5" aria-selected="false" id="tab-plan5">Plan 5 · 60+60</button>
      </div>

      <div class="configurator__plans stagger-children" id="plans-container" role="tabpanel">
        ${defaultPlan.tiers.map(t => buildPlanCard(t.key, t.price, defaultPlan.capacity)).join('')}
      </div>

      <div class="configurator__notice reveal reveal--delay-3">
        <p class="configurator__notice-text">
          <strong>*</strong> Estos precios no incluyen ITBIS. Los eventos realizados viernes,
          sábado y domingo tienen un costo adicional de un <strong>20%</strong>.
        </p>
        <p class="configurator__notice-text" style="margin-top: var(--space-2);">
          <strong>*</strong> Cada niño o adulto adicional tiene un costo de
          <strong>RD$1,000</strong>. Si pasa de 8 personas adicionales debe
          pasar al siguiente plan. Las entradas están contempladas en el valor del plan.
        </p>
      </div>
    </div>
  `;

  return section;
}

export function initEventConfigurator() {
  const tabs = document.querySelectorAll('.configurator__tab');
  const container = document.getElementById('plans-container');
  if (!tabs.length || !container) return;

  // Roving tabindex: only the active tab is in the tab order
  tabs.forEach(t => { t.setAttribute('tabindex', t.classList.contains('active') ? '0' : '-1'); });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      tab.setAttribute('tabindex', '0');

      const planKey = tab.dataset.plan;
      const planData = PLANS_DATA[planKey];
      if (!planData) return;

      container.style.opacity = '0';
      container.style.transform = 'translateY(10px)';

      setTimeout(() => {
        container.innerHTML = planData.tiers.map(t => buildPlanCard(t.key, t.price, planData.capacity)).join('');
        requestAnimationFrame(() => {
          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        });
      }, 300);
    });
  });

  // F-04: WAI-ARIA keyboard navigation for tablist
  // ArrowRight/ArrowLeft cycle tabs with wrapping. Home/End jump.
  const tabList = document.querySelector('.configurator__tabs');
  tabList?.addEventListener('keydown', (e) => {
    const tabArr = Array.from(tabs);
    const current = tabArr.findIndex(t => t.classList.contains('active'));

    let next = current;
    if (e.key === 'ArrowRight') next = (current + 1) % tabArr.length;
    else if (e.key === 'ArrowLeft') next = (current - 1 + tabArr.length) % tabArr.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = tabArr.length - 1;
    else return; // Let other keys pass through

    if (next !== current) {
      e.preventDefault();
      tabArr[next].focus();
      tabArr[next].click();
    }
  });

  container.style.transition = 'opacity 300ms ease, transform 300ms ease';
}
