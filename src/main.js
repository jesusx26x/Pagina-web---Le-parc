/**
 * ═══════════════════════════════════════════════════════════════════
 * Le Parc | Play & Chill Space — Main Application Entry Point
 * "Lujo Auténtico" — Elevated Brand DNA from leparc.do
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Styles ──
import './styles/design-system.css';

// ── Components ──
import { createNavigation, initNavigation } from './components/Navigation.js';
import { createHeroSection, initHeroVideo } from './components/HeroSection.js';
import { createAboutSection, createBentoGrid, initBentoCarousels, initCharacterModals } from './components/BentoGrid.js';
import { createEventConfigurator, initEventConfigurator } from './components/EventConfigurator.js';
import { createCorporatePlans } from './components/CorporatePlans.js';
import { createGallerySection, initGalleryCarousels } from './components/GallerySection.js';
import { createLightbox, initLightbox } from './components/Lightbox.js';
import { createParentGate, initParentGate, parentGateGuard } from './components/ParentGate.js';
import { createBookingModal, initBookingModal, openBookingModal } from './components/BookingModal.js';
import { createStickyCTA, initStickyCTA } from './components/StickyCTA.js';
import { createFooter } from './components/Footer.js';
import { createFloatingWhatsApp } from './components/FloatingWhatsApp.js';
import { showToast } from './components/Toast.js';

// ── Utilities ──
import { initScrollReveal, initSmoothScrollLinks } from './utils/scrollObserver.js';

/**
 * Build the application
 */
function buildApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const fragment = document.createDocumentFragment();

  // 1. Navigation
  fragment.appendChild(createNavigation());

  // 2. Main Content
  const main = document.createElement('main');
  main.id = 'main-content';

  // Hero Section
  main.appendChild(createHeroSection());

  // About — Nosotros (Real content from leparc.do)
  main.appendChild(createAboutSection());

  // Bento Grid — Experiencias
  main.appendChild(createBentoGrid());

  // Event Configurator — All 5 Plans + Cumpleaños Feliz with real pricing
  main.appendChild(createEventConfigurator());

  // Corporate Plans — Private events for 30/50/80 personas
  main.appendChild(createCorporatePlans());

  // Gallery — Uniform photo grid with real Le Parc photos
  main.appendChild(createGallerySection());

  fragment.appendChild(main);

  // 3. Footer with real contact data
  fragment.appendChild(createFooter());

  // 4. Parent Gate (Modal overlay)
  fragment.appendChild(createParentGate());

  // 5. Booking Modal (Smart WhatsApp lead capture)
  fragment.appendChild(createBookingModal());

  // 6. Lightbox (Fullscreen image viewer)
  fragment.appendChild(createLightbox());

  // 6. Floating WhatsApp button (fixed position, outside main)
  fragment.appendChild(createFloatingWhatsApp());

  // 7. Sticky Mobile CTA (fixed bottom bar)
  fragment.appendChild(createStickyCTA());

  // ── Mount ──
  app.appendChild(fragment);
}

/**
 * Initialize all interactive behaviors
 */
function initApp() {
  initNavigation();
  initHeroVideo();
  initEventConfigurator();
  initParentGate();
  initBookingModal();
  initStickyCTA();
  initLightbox();
  initBentoCarousels();
  initCharacterModals();
  initGalleryCarousels();
  initScrollReveal();
  initSmoothScrollLinks();

  // ── Unified click delegation (#18 consolidation) ──
  // Handles plan CTAs → Parent Gate → Booking Modal
  // and legal links → Toast notification
  document.addEventListener('click', (e) => {
    // 1. Plan selection: [data-action="select-plan"]
    const planBtn = e.target.closest('[data-action="select-plan"]');
    if (planBtn) {
      // Never intercept links inside nav or footer
      if (planBtn.closest('.nav') || planBtn.closest('.footer')) return;

      e.preventDefault();
      e.stopPropagation();

      const planLabel = planBtn.dataset.planLabel
        || planBtn.closest('.plan-card')?.querySelector('.plan-card__name')?.textContent
        || planBtn.dataset.tier;

      parentGateGuard(
        () => openBookingModal(planLabel),
        () => console.log('[Le Parc] Parent Gate cancelled')
      );
      return;
    }

    // 2. Legal links: [data-action="legal-modal"]
    const legalLink = e.target.closest('[data-action="legal-modal"]');
    if (legalLink) {
      e.preventDefault();
      showToast('Documentos legales en proceso de actualización. Disculpe las molestias.', { type: 'info', duration: 5000 });
    }
  });

  console.log(
    '%c🎪 Le Parc %c| Play & Chill Space %c— Digital Experience Loaded',
    'color: #3A7CA5; font-weight: bold; font-size: 14px;',
    'color: #E8879B; font-size: 12px;',
    'color: #7BAE6E; font-size: 12px;'
  );
}

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  buildApp();
  initApp();
});
