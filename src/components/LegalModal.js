/**
 * LegalModal — Le Parc | Play & Chill Space
 * ──────────────────────────────────────────
 * Native <dialog> modal for legal pages.
 * Event delegation on [data-legal] attributes.
 * WCAG §2.4.3 focus return on close.
 */
import './LegalModal.css';

const LEGAL_CONTENT = {
    privacidad: {
        title: 'Política de Privacidad',
        body: `
      <p>En <strong>Le Parc | Play &amp; Chill Space</strong>, respetamos y protegemos la privacidad de nuestros visitantes. Esta política describe cómo recopilamos, usamos y protegemos la información personal que usted nos proporciona al utilizar nuestro sitio web o nuestros servicios.</p>
      <h3>Información que Recopilamos</h3>
      <p>Podemos recopilar datos personales como su nombre, dirección de correo electrónico, número de teléfono y datos de pago cuando usted realiza una reservación, se registra para un evento o se comunica con nosotros a través de nuestros canales digitales.</p>
      <h3>Uso de la Información</h3>
      <p>Utilizamos su información exclusivamente para procesar reservaciones, personalizar su experiencia, enviar confirmaciones y, con su consentimiento previo, comunicar promociones o novedades de Le Parc. No vendemos ni compartimos sus datos con terceros sin su autorización expresa.</p>
      <h3>Seguridad de los Datos</h3>
      <p>Implementamos medidas de seguridad técnicas y organizativas para proteger su información contra acceso no autorizado, alteración o destrucción. Si tiene preguntas sobre nuestra política de privacidad, puede contactarnos en <strong>info@leparc.do</strong>.</p>
    `
    },
    seguridad: {
        title: 'Políticas de Seguridad',
        body: `
      <p>La seguridad de nuestros visitantes, especialmente los niños, es la prioridad absoluta de <strong>Le Parc</strong>. Todas nuestras instalaciones cumplen con los estándares de seguridad establecidos por las autoridades competentes de la República Dominicana.</p>
      <h3>Supervisión y Personal</h3>
      <p>Contamos con personal capacitado en primeros auxilios y supervisión de áreas de juego. Todas las atracciones son inspeccionadas diariamente antes de la apertura para garantizar su correcto funcionamiento.</p>
      <h3>Normas de Acceso</h3>
      <p>Los niños menores de 3 años deben estar acompañados por un adulto responsable en todo momento. El uso de medias antideslizantes es obligatorio en las áreas de juego interior. Le Parc se reserva el derecho de restringir el acceso a cualquier atracción por razones de seguridad.</p>
      <h3>Protocolo de Emergencia</h3>
      <p>Disponemos de protocolos de evacuación, extintores, botiquín de primeros auxilios y un plan de contingencia activo. Nuestro equipo está entrenado para actuar ante cualquier eventualidad.</p>
    `
    },
    cookies: {
        title: 'Política de Cookies',
        body: `
      <p>Nuestro sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación, analizar el tráfico del sitio y personalizar el contenido que le mostramos.</p>
      <h3>¿Qué son las Cookies?</h3>
      <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Nos permiten recordar sus preferencias y entender cómo interactúa con nuestro sitio.</p>
      <h3>Tipos de Cookies que Usamos</h3>
      <ul>
        <li><strong>Esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
        <li><strong>Analíticas:</strong> Nos ayudan a comprender cómo los visitantes interactúan con el sitio (Google Analytics).</li>
        <li><strong>Marketing:</strong> Utilizadas para mostrarle anuncios relevantes (Meta Pixel).</li>
      </ul>
      <p>Puede gestionar sus preferencias de cookies en la configuración de su navegador. Al continuar navegando, usted acepta el uso de cookies conforme a esta política.</p>
    `
    },
    cancelaciones: {
        title: 'Política de Cancelaciones',
        body: `
      <p>En <strong>Le Parc</strong>, entendemos que los planes pueden cambiar. A continuación, describimos nuestra política de cancelaciones y reembolsos para reservaciones de fiestas y eventos.</p>
      <h3>Cancelaciones con Anticipación</h3>
      <p>Las cancelaciones realizadas con al menos <strong>72 horas de anticipación</strong> a la fecha del evento podrán recibir un reembolso completo del depósito. Cancelaciones entre 24 y 72 horas recibirán un crédito equivalente aplicable a una futura reservación.</p>
      <h3>Cancelaciones Tardías</h3>
      <p>Las cancelaciones realizadas con menos de 24 horas de anticipación o la no presentación ("no-show") resultarán en la pérdida del depósito. Le Parc se reserva el derecho de modificar estas condiciones según la temporada.</p>
      <h3>Reprogramaciones</h3>
      <p>Puede reprogramar su evento sin costo adicional con un mínimo de 48 horas de anticipación, sujeto a disponibilidad. Para gestionar cambios en su reservación, comuníquese al <strong>1 849-917-2435</strong> o escriba a <strong>info@leparc.do</strong>.</p>
    `
    }
};

let _dialog = null;
let _previousFocus = null;

function _getOrCreateDialog() {
    if (_dialog) return _dialog;

    _dialog = document.createElement('dialog');
    _dialog.className = 'legal-modal';
    _dialog.setAttribute('aria-modal', 'true');

    _dialog.innerHTML = `
    <button class="legal-modal__close" aria-label="Cerrar" type="button">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round"
           stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <h2 class="legal-modal__title"></h2>
    <div class="legal-modal__body"></div>
  `;

    // Close button
    _dialog.querySelector('.legal-modal__close').addEventListener('click', _close);

    // Backdrop click (native dialog fires 'click' on dialog element for backdrop)
    _dialog.addEventListener('click', (e) => {
        if (e.target === _dialog) _close();
    });

    // ESC is handled natively by <dialog>, but we still need focus return
    _dialog.addEventListener('close', () => {
        if (_previousFocus && typeof _previousFocus.focus === 'function') {
            _previousFocus.focus();
            _previousFocus = null;
        }
    });

    document.body.appendChild(_dialog);
    return _dialog;
}

function _close() {
    if (_dialog && _dialog.open) {
        _dialog.close();
    }
}

function _open(key, triggerElement) {
    const content = LEGAL_CONTENT[key];
    if (!content) return;

    _previousFocus = triggerElement || document.activeElement;

    const dialog = _getOrCreateDialog();
    dialog.querySelector('.legal-modal__title').textContent = content.title;
    dialog.querySelector('.legal-modal__body').innerHTML = content.body;
    dialog.showModal();
}

/**
 * Initialize Legal Modal — Event Delegation on [data-legal]
 */
export function initLegalModal() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-legal]');
        if (!trigger) return;

        e.preventDefault();
        _open(trigger.dataset.legal, trigger);
    });
}
