# 🎪 Le Parc | Play & Chill Space

> **Renovación Web Premium** — Centro de entretenimiento familiar de alta gama en Santo Domingo, R.D.

Experiencia digital completamente nueva para [leparc.do](https://leparc.do/) que eleva la identidad de marca al concepto **"Lujo Auténtico"**: elegancia premium con el ADN colorido y familiar de Le Parc. Lienzo neutro `#FAFAFA` con acentos vibrantes, tipografía serif/sans combinada, y micro-interacciones de alta gama.

[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES2022+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Custom_Properties-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)

---

## ✨ Características Principales

- 🎬 **Hero con Video Nativo** — Split layout con video HTML5 autoplay + fallback YouTube
- 🎂 **Configurador de Eventos** — 6 planes × 3 tiers con precios reales RD$
- 🖼️ **Galería con Carruseles** — Auto-rotación inteligente (IntersectionObserver) + Lightbox fullscreen
- 🔒 **Parent Gate** — Challenge aritmético para proteger a menores
- 📱 **WhatsApp CTA Inteligente** — Booking Modal con mensaje pre-armado
- 🧊 **Frosted Glass Nav** — Glassmorphism premium con scroll detection
- ♿ **WCAG 2.1 AA** — Focus traps, focus restore, contrast audit, keyboard navigation
- ⚡ **Zero Frameworks** — Vanilla JS modular, ~0 dependencias runtime

---

## 🏗️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **Vite** | 5.x | Bundler y Dev Server |
| **Vanilla JS** | ES2022+ | Módulos, clases, DOM API |
| **CSS Custom Properties** | — | Design System completo con 200+ tokens |
| **HTML5 Semántico** | — | SEO, accesibilidad, Open Graph |
| **Google Fonts** | — | Playfair Display (serif) + Inter (sans) |

> **Nota:** No se usa React, Vue, Tailwind ni frameworks CSS. Todo es Vanilla JS modular con arquitectura de componentes `create() + init()`.

---

## 📁 Estructura del Proyecto

```
web/
├── index.html                        # Shell HTML con SEO + Open Graph
├── package.json                      # Scripts y dependencias
├── .gitignore
├── TASKME.md                         # Roadmap y progreso del proyecto
├── CHANGELOG.md                      # Historial de cambios
│
├── public/
│   ├── images/                       # Fotos reales de Le Parc
│   │   ├── hero-poster.jpg           # Poster fallback del video (3G)
│   │   ├── bento-indoor-play.jpeg    # Zona de juegos interior
│   │   ├── gallery-*.jpeg            # ~20 fotos de galería
│   │   └── food-*.jpeg               # ~10 fotos gastronomía
│   └── videos/
│       └── leparc-instalaciones.mp4  # Video real de instalaciones
│
└── src/
    ├── main.js                       # Entry point — ensamblaje + click delegation
    │
    ├── styles/
    │   └── design-system.css         # Variables, reset, tipografía, botones, utilidades
    │
    ├── components/
    │   ├── Navigation.js/.css        # Nav frosted glass + scroll-aware + mobile menu
    │   ├── HeroSection.js/.css       # Split layout: texto + video nativo con audio toggle
    │   ├── BentoGrid.js/.css         # About (editorial) + Experiencias (5 carruseles) + MVV + Characters
    │   ├── EventConfigurator.js/.css  # 6 planes de cumpleaños: Feliz + 5×3 tiers con tabs
    │   ├── CorporatePlans.js/.css    # Planes corporativos: 30/50/80 personas
    │   ├── GallerySection.js/.css    # Galería agrupada con carruseles auto-rotate
    │   ├── Lightbox.js/.css          # Viewer fullscreen con navegación prev/next
    │   ├── ParentGate.js/.css        # Modal de seguridad: challenge aritmético + focus trap
    │   ├── BookingModal.js/.css      # Smart booking: fecha + turno → WhatsApp pre-armado
    │   ├── FloatingWhatsApp.js/.css  # FAB con pulse animation + tooltip
    │   ├── StickyCTA.js/.css         # Barra mobile fija con glassmorphism dark
    │   ├── Toast.js/.css             # Notificaciones toast con slide-in animation
    │   └── Footer.js/.css            # Footer con contacto real + links legales
    │
    └── utils/
        └── scrollObserver.js         # IntersectionObserver reveal + smooth scroll
```

---

## 🚀 Cómo Ejecutar

```bash
# 1. Clonar el repositorio
git clone https://github.com/jesusx26x/Pagina-web---Le-parc.git
cd Pagina-web---Le-parc/web

# 2. Instalar dependencias
npm install

# 3. Servidor de desarrollo
npm run dev
# → http://localhost:5173

# 4. Build de producción
npm run build

# 5. Preview del build
npm run preview
```

> **Requisito:** Node.js 18+ (recomendado 20.x)

---

## 🎨 Sistema de Diseño — "Lujo Auténtico"

### Paleta de Colores

| Color | Variable | Hex | Uso |
|---|---|---|---|
| 🔵 Blue | `--lp-blue` | `#1565C0` | Color primario, CTAs info |
| 🩷 Pink | `--lp-pink` | `#E91E6C` | CTAs principales, acentos, badges |
| 🟢 Green | `--lp-green` | `#7BAE6E` | Confirmaciones, outdoor, contacto |
| 🟠 Orange | `--lp-orange` | `#E8A54B` | Precios, warm accents |
| 🟣 Purple | `--lp-purple` | `#9B7EC8` | Sección especial |
| 🔷 Turquoise | `--lp-turquoise` | `#6EC6CA` | Hero highlights |

### Tipografía

| Fuente | Tipo | Uso |
|---|---|---|
| **Playfair Display** | Serif | Headings, títulos de sección |
| **Inter** | Sans-Serif | Body text, UI, botones |

### Filosofía de Diseño

> Los colores originales de Le Parc se mantienen pero sobre un lienzo neutro `#FAFAFA`.  
> El resultado: marca **premium** pero inmediatamente reconocible.  
> Inspiración: editorial de revista de alta gama + interactividad moderna.

---

## 📄 Componentes

### Navigation *(Frosted Glass)*
- Background translúcido `rgba(255,255,255,0.9)` + `backdrop-filter: blur(16px)`
- Logo multi-color "Le Parc"
- Links: Nosotros, Experiencias, Nuestros Planes, Corporativo, Galería, Contacto
- Teléfono real con ícono verde: `849-917-2435`
- CTA → WhatsApp directo
- Mobile hamburger con animación slide-in
- Focus-visible rings (WCAG 2.4.7)

### Hero Section *(Split Layout)*
- Grid 55/45: texto a la izquierda, video a la derecha
- Video HTML5 nativo con poster fallback para 3G
- Audio toggle button (44px touch target)
- YouTube iframe fallback si MP4 falla
- Headline: *"Más que un parque, un Social Club for everyone"*
- Ticket badge: Niños RD$1,000 / Adultos GRATIS

### Sobre Nosotros *(Editorial Centrado)*
- Layout de columna única, texto centrado, max-width 800px
- Misión • Visión • Valores con hover lift
- 4 personajes mascota clickeables: Sol 🌞, Mar 🌊, Glow ✨, George 🌿
- Modal individual por personaje con descripción

### Experiencias *(Bento Grid + Carruseles)*
- 5 servicios con carruseles de imágenes auto-rotate (8s)
- IntersectionObserver: timers solo activos cuando visible
- Click → Lightbox fullscreen con navegación
- Servicios: Indoor, Chill/Lounge, Eventos, Outdoor, Gastronomía

### Event Configurator *(Planes de Cumpleaños)*
- **Cumpleaños Feliz**: RD$24,500 — paquete todo incluido
- **5 capacidades**: 10, 20, 30, 40, 60 niños+adultos
- **3 tiers**: Básico, Premium, Premium Plus
- Precios reales de leparc.do
- Precio por persona dinámico (anclaje psicológico)
- Badges de urgencia en Premium/Premium Plus
- CTA → Parent Gate → Booking Modal → WhatsApp

### Corporate Plans *(Eventos Privados)*
- 3 paquetes: 30, 50, 80 personas
- Precios y features reales

### Gallery *(Carruseles Agrupados)*
- 8 grupos temáticos con auto-rotate
- Click → Lightbox con todas las imágenes globales
- IntersectionObserver para performance

### Parent Gate *(Seguridad)*
- Challenge aritmético aleatorio (suma, multiplicación, resta)
- 5 intentos → regenera challenge
- Focus trap completo (Tab cycling)
- ESC para cerrar, click outside para cerrar

### Booking Modal *(Smart Lead Capture)*
- `<dialog>` nativo con campo fecha + turno
- Genera mensaje WhatsApp pre-armado con plan, fecha y turno
- Focus restore al cerrar (WCAG §2.4.3)

---

## 🔒 z-index Stack (Auditado)

```
200   var(--z-sticky)      → Navigation, FloatingWhatsApp
201   calc(sticky + 1)     → StickyCTA (mobile)
300   var(--z-overlay)     → Nav mobile menu
400   var(--z-modal)       → ParentGate, CharacterModal
1000  dialog top-layer     → BookingModal (<dialog> nativo)
2000  hardcoded            → Lightbox (sobre todos los modales)
3000  hardcoded            → Toast container (siempre visible)
```

---

## ♿ Accesibilidad (WCAG 2.1 AA)

| Feature | Implementación |
|---|---|
| Focus Trap | ParentGate: Tab cycles input→submit→cancel |
| Focus Restore | BookingModal: restaura foco al elemento que abrió |
| Focus Visible | Nav links + characters con `outline: 2px solid --lp-pink` |
| Contrast AA | Ticket price `#B85400` → 4.5:1+ sobre blanco |
| Touch Targets | Mínimo `44px` en todos los botones interactivos |
| Safe Area | Toast + StickyCTA respetan `env(safe-area-inset-bottom)` |
| Reduced Motion | Animaciones deshabilitadas con `prefers-reduced-motion` |
| Keyboard Nav | Tab navigation testada en todos los componentes |

---

## 📋 Datos de Contacto Reales

| Canal | Detalle |
|---|---|
| 📍 Dirección | Ave. López de Vega #11, Santo Domingo, R.D. |
| 📞 Teléfono | 1 849-917-2435 |
| 📧 Email | info@leparc.do |
| 📱 WhatsApp | [wa.me/18499172435](https://wa.me/18499172435) |
| 📸 Instagram | [@leparcrd](https://instagram.com/leparcrd) |
| 🌐 Web actual | [leparc.do](https://leparc.do) |

---

## ⚙️ Integración API (Futuro)

El Event Configurator tiene placeholders preparados para:
- **ROLLER Software** — Sistema de reservas y waivers
- **Clubspeed** — Gestión de eventos y membresías
- Los CTAs actuales redirigen a WhatsApp como solución inmediata

---

## 📝 Licencia

Todos los derechos reservados a **Le Parc Santo Domingo**.
