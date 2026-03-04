/**
 * Smart Booking Modal — Le Parc
 * ─────────────────────────────
 * Premium <dialog> overlay that intercepts direct WhatsApp links.
 * Collects date, shift, and plan → builds a rich WhatsApp message.
 * Instanciable: accepts plan name as parameter via `openBookingModal(planLabel)`.
 */
import './BookingModal.css';

const WA_NUMBER = '18499172435';
let _previousFocus = null;

const SHIFTS = [
    { value: 'mañana', label: 'Mañana (9:00 AM — 1:00 PM)' },
    { value: 'tarde', label: 'Tarde (3:00 PM — 7:00 PM)' },
];

export function createBookingModal() {
    const dialog = document.createElement('dialog');
    dialog.className = 'booking-modal';
    dialog.id = 'booking-modal';

    dialog.innerHTML = `
    <div class="booking-modal__backdrop"></div>
    <div class="booking-modal__panel">
      <button class="booking-modal__close" aria-label="Cerrar" id="booking-close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>

      <div class="booking-modal__header">
        <div class="booking-modal__icon" aria-hidden="true">📅</div>
        <h3 class="booking-modal__title">Reserva tu Evento</h3>
        <p class="booking-modal__plan" id="booking-plan-label">—</p>
      </div>

      <form class="booking-modal__form" id="booking-form">
        <div class="booking-modal__field">
          <label class="booking-modal__label" for="booking-date">Fecha deseada</label>
          <input type="date" class="booking-modal__input" id="booking-date" required
                 min="${new Date().toISOString().split('T')[0]}" />
        </div>

        <div class="booking-modal__field">
          <label class="booking-modal__label" for="booking-shift">Turno</label>
          <select class="booking-modal__select" id="booking-shift" required>
            <option value="" disabled selected>Selecciona un turno</option>
            ${SHIFTS.map(s => `<option value="${s.value}">${s.label}</option>`).join('')}
          </select>
        </div>

        <button type="submit" class="btn btn--primary booking-modal__submit" id="booking-submit">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Verificar Disponibilidad en WhatsApp
        </button>
      </form>

      <p class="booking-modal__note">
        Le Parc te confirmará la disponibilidad en minutos.
      </p>
    </div>
  `;

    return dialog;
}

/**
 * Open the booking modal with a specific plan label.
 * @param {string} planLabel — e.g. "Premium — 20+20"
 */
export function openBookingModal(planLabel) {
    const dialog = document.getElementById('booking-modal');
    if (!dialog) return;

    // Save focus for WCAG §2.4.3 focus restore
    _previousFocus = document.activeElement;

    // Set the plan label
    const labelEl = document.getElementById('booking-plan-label');
    if (labelEl) labelEl.textContent = planLabel;

    // Reset form
    const form = document.getElementById('booking-form');
    if (form) form.reset();

    // Show dialog
    dialog.showModal();
    dialog.classList.add('booking-modal--open');

    // Focus the date input after animation
    setTimeout(() => {
        document.getElementById('booking-date')?.focus();
    }, 300);
}

export function initBookingModal() {
    const dialog = document.getElementById('booking-modal');
    if (!dialog) return;

    // Close button
    document.getElementById('booking-close')?.addEventListener('click', () => {
        closeModal(dialog);
    });

    // Backdrop click
    dialog.querySelector('.booking-modal__backdrop')?.addEventListener('click', () => {
        closeModal(dialog);
    });

    // ESC key (native <dialog> handles this, but we also manage the class)
    dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeModal(dialog);
    });

    // Form submit → build WhatsApp URL
    document.getElementById('booking-form')?.addEventListener('submit', (e) => {
        e.preventDefault();

        const planLabel = document.getElementById('booking-plan-label')?.textContent || '';
        const dateVal = document.getElementById('booking-date')?.value || '';
        const shiftVal = document.getElementById('booking-shift')?.value || '';

        if (!dateVal || !shiftVal) return;

        // Format date for display
        const [y, m, d] = dateVal.split('-');
        const dateFormatted = `${d}/${m}/${y}`;

        const message = `Hola, quiero reservar el ${planLabel} para el día ${dateFormatted} en el turno de la ${shiftVal}. ¿Tienen disponibilidad?`;
        const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

        window.open(waUrl, '_blank');
        closeModal(dialog);
    });
}

function closeModal(dialog) {
    dialog.classList.remove('booking-modal--open');
    setTimeout(() => {
        dialog.close();
        // Restore focus (WCAG §2.4.3)
        _previousFocus?.focus();
        _previousFocus = null;
    }, 300);
}
