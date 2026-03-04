/**
 * Scroll Observer — Reveal Animations
 * Uses IntersectionObserver for performant scroll-triggered animations
 */

const OBSERVER_OPTIONS = {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px',
};

/**
 * Initialize scroll-reveal animations for elements with .reveal class
 */
export function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, OBSERVER_OPTIONS);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Smooth scroll to anchor links
 */
export function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            // Skip links with data-action (handled by delegation in main.js)
            if (link.dataset.action) return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}
