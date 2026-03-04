# 📝 CHANGELOG — Le Parc | Play & Chill Space

Todos los cambios notables del proyecto se documentan aquí.  
Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/).

---

## [0.7.0] — 2026-03-04

### 🔬 Auditoría Forense v2 — 24 Hallazgos Resueltos

#### Fixed (Críticos ☠️)
- **StickyCTA** — `z-index: 99` era MENOR que el Nav (`200`). CTA invisible en mobile. → `calc(var(--z-sticky) + 1)`
- **CharacterModal** — `z-index: 2000` hardcoded. → `var(--z-modal)` (token system)
- **scrollObserver** — interceptaba clicks en legal links (`href="#" data-action`), bloqueando toasts. → Guard `if (link.dataset.action) return`

#### Fixed (Altos 🔴)
- **BentoGrid.js** — `setInterval` de carruseles corría infinitamente sin cleanup (memory leak × 5 timers). → Envuelto en `IntersectionObserver` play/pause
- **GallerySection.js** — Mismo memory leak × 8 timers. → Mismo fix con IntersectionObserver
- **HeroSection** — Video sin poster fallback para redes 3G lentas. → `poster="/images/hero-poster.jpg"`
- **Navigation.css** — Links sin `:focus-visible` (WCAG 2.4.7 violation). → Pink outline ring
- **design-system.css** — `.btn--ghost` invisible en fondo blanco (contraste 1.4.3). → `border: 2px solid`
- **FloatingWhatsApp.css** — `z-index: var(--z-toast)` colisionaba con Toast. → `var(--z-sticky)`

#### Fixed (Medios 🟡)
- **StickyCTA.css** — Botón WhatsApp era ~32px height, debajo del mínimo 44px tap target. → `min-height: var(--touch-target)`
- **BookingModal.js** — No restauraba foco al cerrar (WCAG §2.4.3). → `_previousFocus` save/restore
- **Navigation.css** — Phone link sin estilo distintivo. → `.nav__phone` class con verde `#1E8E3E`
- **BentoGrid.css** — MVV cards sin hover state (inconsistencia). → `translateY(-4px) + shadow-md`
- **main.js** — 2 `document.addEventListener('click')` separados. → 1 handler unificado

#### Fixed (Micro 🔵)
- **HeroSection.css** — Ticket price naranja `--lp-orange` bajo contraste 3.2:1. → `#B85400` (4.5:1+ AA)
- **BentoGrid.css** — Character buttons sin `:focus-visible`. → Pink ring
- **Toast.css** — Bottom no contaba `env(safe-area-inset-bottom)` para iOS notch
- **StickyCTA.js** — Faltaba `noreferrer` en `rel`
- **Navigation.css** — Regla `nav--scrolled .nav__link:hover` duplicada → consolidada

---

## [0.6.0] — 2026-03-03

### 🎨 Refinamiento Hero & Nav — "Lujo Auténtico"

#### Changed
- **HeroSection** — Transformado a split layout (55% texto / 45% video)
- **HeroSection** — Video HTML5 nativo con audio toggle y YouTube fallback
- **HeroSection** — Fondo con gradiente radial sutil (glow premium)
- **Navigation** — Background: `linear-gradient(dark)` → `rgba(255,255,255,0.9)` + `blur(16px)` (frosted glass)
- **Navigation** — Link colors: blanco → oscuro (para hero claro)
- **Navigation** — Logo: drop-shadow y text-shadow eliminados
- **About** — Eliminada imagen, grid 2-col → columna centrada editorial
- **About** — Título ampliado a `--text-4xl` en desktop
- **About** — Párrafo a `--text-lg` con `max-width: 680px`

---

## [0.5.0] — 2026-03-02

### 🖼️ Galerías, Carruseles & Modales

#### Added
- **GallerySection** — Galería con 8 grupos temáticos y carruseles auto-rotate 8s
- **Lightbox** — Viewer fullscreen con navegación prev/next y counter
- **Toast** — Sistema de notificaciones con slide-in y auto-dismiss
- **Character Modals** — Modal individual por personaje (Sol, Mar, Glow, George)
- **BookingModal** — Smart lead capture con fecha + turno → WhatsApp pre-armado

#### Changed
- Carruseles de 4s → 8s para mejor lectura
- `confirm()` → modales elegantes
- `alert()` → toasts elegantes

---

## [0.4.0] — 2026-03-01

### 💎 CRO & Compactación UI

#### Added
- **Cumpleaños Feliz** — Nuevo plan RD$24,500 todo incluido
- **Precio por persona** — Cálculo dinámico "desde RD$X / niño" (anclaje psicológico)
- **Badges de urgencia** — "Alta demanda este mes" en Premium/Premium Plus
- **StickyCTA** — Barra mobile fija con WhatsApp CTA

#### Changed
- Plan cards compactadas: padding reducido, tipografía ajustada
- Feature lists: `font-size` reducido, `gap` de 4px, icono ✔ inline

---

## [0.3.0] — 2026-02-28

### 🔒 Parent Gate & Event Delegation

#### Added
- **ParentGate** — Challenge aritmético con focus trap completo
- **FloatingWhatsApp** — FAB con pulse animation GPU-composited
- **CorporatePlans** — 3 paquetes corporativos (30/50/80 personas)

#### Fixed
- Event delegation: solo intercepta `[data-action="select-plan"]`
- WhatsApp links en nav/footer nunca interceptados
- Legal links → toast (evita 404s)

---

## [0.2.0] — 2026-02-27

### 🏗️ Componentes Core

#### Added
- Navigation con glassmorphism + mobile menu
- HeroSection con video-first overlay
- BentoGrid: About + 5 servicios
- EventConfigurator: 5 planes × 3 tiers con precios reales
- Footer con contacto real de leparc.do
- Scroll reveal animations (IntersectionObserver)
- Smooth scroll anchor links

---

## [0.1.0] — 2026-02-26

### 🎨 Design System "Lujo Auténtico"

#### Added
- Vite project scaffolding
- Design System CSS: 200+ custom properties
- Paleta vibrante (NO pasteles): blue, pink, green, purple, orange, turquoise
- Tipografía: Playfair Display + Inter
- Button system: primary, pink, green, ghost, whatsapp
- HTML5 semántico con SEO + Open Graph
- Skeleton loader GPU-composited
- `prefers-reduced-motion` global
