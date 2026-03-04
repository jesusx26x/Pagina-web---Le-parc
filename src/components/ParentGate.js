/**
 * Parent Gate — Security Middleware Component
 * Cognitive arithmetic challenge to prevent child access
 * to payment gateways and account management areas
 */
import './ParentGate.css';

/**
 * Generate a random arithmetic challenge
 * Uses multiplication/addition with numbers that are difficult for young children
 */
function generateChallenge() {
    const operations = [
        () => {
            const a = Math.floor(Math.random() * 20) + 12;
            const b = Math.floor(Math.random() * 15) + 7;
            return { question: `${a} + ${b}`, answer: a + b };
        },
        () => {
            const a = Math.floor(Math.random() * 12) + 6;
            const b = Math.floor(Math.random() * 8) + 3;
            return { question: `${a} × ${b}`, answer: a * b };
        },
        () => {
            const a = Math.floor(Math.random() * 40) + 30;
            const b = Math.floor(Math.random() * 15) + 5;
            return { question: `${a} − ${b}`, answer: a - b };
        },
    ];

    const op = operations[Math.floor(Math.random() * operations.length)];
    return op();
}

/**
 * Create the Parent Gate DOM element
 */
export function createParentGate() {
    const overlay = document.createElement('div');
    overlay.className = 'parent-gate-overlay';
    overlay.id = 'parent-gate';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Verificación de adulto');
    overlay.setAttribute('aria-hidden', 'true');

    const challenge = generateChallenge();

    overlay.innerHTML = `
    <div class="parent-gate">
      <div class="parent-gate__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      <h2 class="parent-gate__title">Verificación de Adulto</h2>
      <p class="parent-gate__desc">
        Para proteger la seguridad de los más pequeños, por favor resuelve 
        esta operación para continuar.
      </p>

      <div class="parent-gate__challenge">
        <p class="parent-gate__question" id="gate-question" aria-live="polite">
          ${challenge.question} = ?
        </p>
        <div class="parent-gate__input-group">
          <input 
            type="number" 
            class="parent-gate__input" 
            id="gate-input"
            aria-label="Resultado de la operación"
            autocomplete="off"
            inputmode="numeric"
            pattern="[0-9]*"
          />
          <button class="parent-gate__submit" id="gate-submit" aria-label="Verificar respuesta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </button>
        </div>
        <p class="parent-gate__error" id="gate-error" role="alert">
          Respuesta incorrecta. Intenta de nuevo.
        </p>
      </div>

      <button class="parent-gate__cancel" id="gate-cancel">Cancelar</button>
    </div>
  `;

    // Store the answer in a data attribute (not visible in UI)
    overlay.dataset.answer = challenge.answer;

    return overlay;
}

/**
 * Parent Gate Controller
 * Manages gate state, verification, and callbacks
 */
class ParentGateController {
    constructor() {
        this.overlay = null;
        this.input = null;
        this.error = null;
        this.onSuccess = null;
        this.onCancel = null;
        this.attempts = 0;
        this.maxAttempts = 5;
        this._focusTrapHandler = null;
        this._previousFocus = null;
    }

    init() {
        this.overlay = document.getElementById('parent-gate');
        if (!this.overlay) return;

        this.input = document.getElementById('gate-input');
        this.error = document.getElementById('gate-error');
        const submit = document.getElementById('gate-submit');
        const cancel = document.getElementById('gate-cancel');

        submit?.addEventListener('click', () => this.verify());
        cancel?.addEventListener('click', () => this.close(false));

        // Enter key support
        this.input?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.verify();
        });

        // Close on overlay click (outside modal)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close(false);
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay?.classList.contains('active')) {
                this.close(false);
            }
        });
    }

    /**
     * Open the Parent Gate
     * @param {Function} onSuccess - Callback when verified
     * @param {Function} onCancel - Callback when cancelled
     */
    open(onSuccess, onCancel) {
        this.onSuccess = onSuccess;
        this.onCancel = onCancel;
        this.attempts = 0;

        // Generate fresh challenge
        const challenge = generateChallenge();
        const questionEl = document.getElementById('gate-question');
        if (questionEl) questionEl.textContent = `${challenge.question} = ?`;
        if (this.overlay) this.overlay.dataset.answer = challenge.answer;

        // Reset UI
        if (this.input) this.input.value = '';
        if (this.input) this.input.classList.remove('error');
        if (this.error) this.error.classList.remove('visible');

        // Show
        if (this.overlay) {
            this.overlay.classList.add('active');
            this.overlay.setAttribute('aria-hidden', 'false');
        }
        document.body.style.overflow = 'hidden';

        // Focus trap — WCAG 2.1 §2.1.2
        this._previousFocus = document.activeElement;
        this._trapFocus();

        // Focus input after enter animation
        setTimeout(() => this.input?.focus(), 300);
    }

    /**
     * Trap keyboard focus within the modal.
     * Tab cycles: input → submit → cancel → input
     * Shift+Tab reverses. No focus escapes to background.
     */
    _trapFocus() {
        if (!this.overlay) return;

        const focusableEls = this.overlay.querySelectorAll(
            'input, button, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];

        this._focusTrapHandler = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey && document.activeElement === firstEl) {
                e.preventDefault();
                lastEl.focus();
            } else if (!e.shiftKey && document.activeElement === lastEl) {
                e.preventDefault();
                firstEl.focus();
            }
        };

        this.overlay.addEventListener('keydown', this._focusTrapHandler);
    }

    /**
     * Release focus trap and restore previous focus.
     */
    _releaseFocus() {
        if (this._focusTrapHandler && this.overlay) {
            this.overlay.removeEventListener('keydown', this._focusTrapHandler);
            this._focusTrapHandler = null;
        }
        // Restore focus to the element that opened the gate
        this._previousFocus?.focus();
        this._previousFocus = null;
    }

    /**
     * Verify the answer
     */
    verify() {
        const userAnswer = parseInt(this.input?.value, 10);
        const correctAnswer = parseInt(this.overlay?.dataset.answer, 10);

        if (userAnswer === correctAnswer) {
            this.close(true);
        } else {
            this.attempts++;
            if (this.input) this.input.classList.add('error');
            if (this.error) this.error.classList.add('visible');

            // Remove error animation after it plays
            setTimeout(() => {
                if (this.input) {
                    this.input.classList.remove('error');
                    this.input.value = '';
                    this.input.focus();
                }
            }, 500);

            // After max attempts, regenerate challenge
            if (this.attempts >= this.maxAttempts) {
                this.attempts = 0;
                const newChallenge = generateChallenge();
                const questionEl = document.getElementById('gate-question');
                if (questionEl) questionEl.textContent = `${newChallenge.question} = ?`;
                if (this.overlay) this.overlay.dataset.answer = newChallenge.answer;
            }
        }
    }

    /**
     * Close the gate
     * @param {boolean} success - Whether verification was successful
     */
    close(success) {
        // Release focus trap before hiding
        this._releaseFocus();

        if (this.overlay) {
            this.overlay.classList.remove('active');
            this.overlay.setAttribute('aria-hidden', 'true');
        }
        document.body.style.overflow = '';

        if (success && this.onSuccess) {
            this.onSuccess();
        } else if (!success && this.onCancel) {
            this.onCancel();
        }
    }
}

// Singleton instance
export const parentGate = new ParentGateController();

/**
 * Initialize the Parent Gate system
 */
export function initParentGate() {
    parentGate.init();
}

/**
 * Utility: Wrap any action with Parent Gate verification
 * Usage: parentGateGuard(() => { // protected action })
 */
export function parentGateGuard(protectedAction, onCancel = null) {
    parentGate.open(protectedAction, onCancel);
}
