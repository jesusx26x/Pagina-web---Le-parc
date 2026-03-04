/**
 * Toast — Le Parc
 * ───────────────
 * Minimal, elegant toast notification system.
 * Auto-dismisses after duration. Stackable.
 * Uses design system variables throughout.
 */
import './Toast.css';

let containerEl = null;

/**
 * Ensure the toast container exists in the DOM.
 */
function ensureContainer() {
    if (containerEl) return containerEl;
    containerEl = document.createElement('div');
    containerEl.className = 'toast-container';
    containerEl.id = 'toast-container';
    containerEl.setAttribute('aria-live', 'polite');
    containerEl.setAttribute('aria-atomic', 'true');
    document.body.appendChild(containerEl);
    return containerEl;
}

/**
 * Show a toast notification.
 * @param {string} message — The text to display
 * @param {object} options
 * @param {'info'|'success'|'warning'} [options.type='info'] — Visual variant
 * @param {number} [options.duration=4000] — Auto-dismiss in ms
 */
export function showToast(message, { type = 'info', duration = 4000 } = {}) {
    const container = ensureContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'status');

    toast.innerHTML = `
    <span class="toast__icon" aria-hidden="true">${getIcon(type)}</span>
    <span class="toast__message">${message}</span>
    <button class="toast__close" aria-label="Cerrar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M18 6L6 18M6 6l12 12"/>
      </svg>
    </button>
  `;

    // Close on click
    toast.querySelector('.toast__close').addEventListener('click', () => dismissToast(toast));

    container.appendChild(toast);

    // Trigger entrance animation
    requestAnimationFrame(() => {
        toast.classList.add('toast--visible');
    });

    // Auto dismiss
    if (duration > 0) {
        setTimeout(() => dismissToast(toast), duration);
    }
}

function dismissToast(toast) {
    toast.classList.remove('toast--visible');
    toast.classList.add('toast--exit');
    toast.addEventListener('transitionend', () => {
        toast.remove();
    }, { once: true });
    // Fallback removal if transitionend doesn't fire
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 500);
}

function getIcon(type) {
    switch (type) {
        case 'success':
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`;
        case 'warning':
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
        default: // info
            return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    }
}
