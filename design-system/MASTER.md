# PetGearHub Design System

> Comprehensive design system for **petgearhub.co.uk** -- a curated pet products affiliate website for the UK market.
> Generated from UI/UX Pro Max skill data analysis.

---

## 1. Project Info

| Field | Value |
|---|---|
| **Brand** | PetGearHub |
| **Domain** | petgearhub.co.uk |
| **Market** | United Kingdom (GBP) |
| **Stack** | Next.js 14 (App Router), React 18, TypeScript, TailwindCSS, Framer Motion |
| **Product Type** | Curated affiliate / editorial e-commerce (pet products) |
| **Categories** | Dog, Cat, Bird, Fish, Small Pets, Pet Health, Pet Accessories |

---

## 2. Recommended Pattern & Layout Approach

### Primary Pattern: Feature-Rich Showcase + Social Proof
**Source:** products.csv (E-commerce #3), ui-reasoning.csv (E-commerce #3, Pet Tech App #23, Magazine/Blog #67)

PetGearHub sits at the intersection of three product archetypes from the skill database:

1. **E-commerce** -- Feature-Rich Showcase with card hover lift, scale effects, and high visual hierarchy for product conversions
2. **Pet Tech App** -- Storytelling + Feature-Rich with playful warm colours, pet profile animations, and friendly personality
3. **Magazine/Blog** -- Storytelling + Hero-Centric with editorial colours, article showcase, and typography-focused layout

### Landing Page Patterns by Page

| Page | Primary Pattern | Secondary Pattern | Source |
|---|---|---|---|
| Homepage | Hero-Centric Design + Feature-Rich Showcase | Social Proof-Focused | landing.csv #20, #22 |
| Product Detail | Product Review/Ratings Focused (#19) | Comparison Table Focus (#13) | landing.csv #19, #13 |
| Blog Article | Storytelling-Driven (#27) | Newsletter/Content First (#23) | landing.csv #27, #23 |
| Deals | Conversion-Optimized (#21) | Before-After Transformation (#21) | landing.csv #21 |
| Products Listing | Marketplace/Directory (#22) | Feature-Rich Showcase (#22) | landing.csv #22 |

### Layout Grid
**Source:** styles.csv (Swiss Modernism 2.0 #50), Bento Grids (#53)

- **12-column grid** for desktop (max-width: 1280px)
- **4-column grid** for tablet (768px-1023px)
- **1-column stack** for mobile (<768px)
- Content max-width: `max-w-7xl` (1280px) for full layouts, `max-w-prose` (65ch) for article body text
- Grid gap: `gap-6` (24px) desktop, `gap-4` (16px) mobile
- Section padding: `py-16` (64px) desktop, `py-10` (40px) mobile

---

## 3. Style Recommendation

### Primary Style: Swiss Modernism 2.0 + Organic Biophilic Hybrid
**Source:** styles.csv (#50 Swiss Modernism 2.0, #42 Organic Biophilic), ui-reasoning.csv (#67 Magazine/Blog, #23 Pet Tech App)

#### Why This Combination (Decision Rules from ui-reasoning.csv)

```
E-commerce rule:     if_conversion_focused -> add-urgency-colors
Pet Tech App rule:   must_have -> pet-profiles; if_health -> add-vet-integration
Magazine/Blog rule:  must_have -> article-showcase, newsletter-signup
```

**Swiss Modernism 2.0** provides:
- Strict grid system for scannable product layouts
- Mathematical spacing (8px base unit) for consistency
- Clean typography hierarchy essential for editorial content
- High contrast verification (WCAG AAA capable)
- Excellent performance (Tailwind 10/10 compatibility)
- Framework compatibility: Tailwind 10/10, Bootstrap 9/10

**Organic Biophilic** provides:
- Nature-inspired warmth appropriate for a pet brand
- Rounded corners (12-16px) that feel friendly and approachable
- Earthy, warm colour palette that pairs with the existing navy/amber brand
- Natural soft shadows that add depth without harshness
- Wellness aesthetic resonating with pet health content

### Secondary Style Influences
- **Soft UI Evolution** (#19): Improved contrast pastels, modern 200-300ms animations, focus visible states
- **Motion-Driven** (#15): Scroll-triggered animations, parallax for storytelling, entrance animations

### Style Variables

```css
/* Core Style Tokens */
--border-radius-sm: 8px;
--border-radius-md: 12px;
--border-radius-lg: 16px;
--border-radius-xl: 24px;
--border-radius-full: 9999px;

--shadow-soft: 0 2px 8px rgba(27, 43, 58, 0.06);
--shadow-md: 0 4px 16px rgba(27, 43, 58, 0.08);
--shadow-lg: 0 8px 32px rgba(27, 43, 58, 0.1);
--shadow-card: 0 1px 3px rgba(27, 43, 58, 0.04), 0 4px 12px rgba(27, 43, 58, 0.06);
--shadow-hover: 0 8px 24px rgba(27, 43, 58, 0.12);

--grid-columns: 12;
--grid-gap: 24px;
--base-unit: 8px;
```

---

## 4. Complete Colour System

### Three-Layer Token Architecture

Built upon PetGearHub's existing brand identity (#1B2B3A navy, #D4763C amber, #FAF8F5 off-white), expanded using data from colors.csv (E-commerce #3, Pet Tech App #23, Veterinary Clinic #61, Magazine/Blog #67).

#### Layer 1: Primitive Tokens (Raw Values)

```css
/* Navy Family (from brand primary #1B2B3A) */
--navy-50: #F0F4F8;
--navy-100: #D9E2EC;
--navy-200: #BCCCDC;
--navy-300: #9FB3C8;
--navy-400: #829AB1;
--navy-500: #627D98;
--navy-600: #486581;
--navy-700: #334E68;
--navy-800: #243B53;
--navy-900: #1B2B3A;   /* Brand primary */
--navy-950: #102A43;

/* Amber Family (from brand accent #D4763C) */
--amber-50: #FFF8F0;
--amber-100: #FFEDD5;
--amber-200: #FED7AA;
--amber-300: #FDBA74;
--amber-400: #F59E42;
--amber-500: #D4763C;  /* Brand accent */
--amber-600: #B85C2A;
--amber-700: #9A4A20;
--amber-800: #7C3A18;
--amber-900: #5F2D12;

/* Warm Neutrals (from brand background #FAF8F5) */
--warm-50: #FDFCFA;
--warm-100: #FAF8F5;   /* Brand background */
--warm-200: #F5F1EC;
--warm-300: #EDE8E1;
--warm-400: #D8D0C7;
--warm-500: #B8AFA5;
--warm-600: #8C847C;
--warm-700: #6B6560;
--warm-800: #4A4541;
--warm-900: #2D2A27;

/* Semantic Primitives */
--green-500: #059669;   /* Source: colors.csv E-commerce success green */
--green-600: #047857;
--green-400: #34D399;
--red-500: #DC2626;     /* Source: colors.csv destructive universal */
--red-600: #B91C1C;
--yellow-500: #D97706;  /* Source: colors.csv warning amber */
--blue-500: #0369A1;    /* Source: colors.csv trust blue */
```

#### Layer 2: Semantic Tokens (Purpose-Driven)

```css
/* === LIGHT MODE (default) === */

/* Brand */
--color-primary: var(--navy-900);          /* #1B2B3A */
--color-primary-hover: var(--navy-800);    /* #243B53 */
--color-primary-foreground: #FFFFFF;
--color-secondary: var(--navy-700);        /* #334E68 */
--color-secondary-foreground: #FFFFFF;

/* Accent / CTA */
--color-accent: var(--amber-500);          /* #D4763C */
--color-accent-hover: var(--amber-600);    /* #B85C2A */
--color-accent-foreground: #FFFFFF;
/* Contrast ratio: #D4763C on #FFFFFF = 3.28:1 (large text AA)
   For small text CTA buttons, use amber-600 #B85C2A = 4.87:1 (AA) */

/* Surfaces */
--color-background: var(--warm-100);       /* #FAF8F5 */
--color-surface: #FFFFFF;
--color-surface-raised: #FFFFFF;
--color-surface-sunken: var(--warm-200);   /* #F5F1EC */
--color-surface-overlay: rgba(27, 43, 58, 0.5);

/* Text */
--color-foreground: var(--navy-900);       /* #1B2B3A - 12.5:1 on #FAF8F5 */
--color-foreground-secondary: var(--navy-700); /* #334E68 */
--color-foreground-muted: var(--warm-600); /* #8C847C - 4.54:1 on #FAF8F5 */
--color-foreground-inverse: #FFFFFF;

/* Cards & Containers */
--color-card: #FFFFFF;
--color-card-foreground: var(--navy-900);
--color-card-border: var(--warm-300);      /* #EDE8E1 */
--color-card-hover-border: var(--amber-300); /* #FDBA74 */

/* Borders & Dividers */
--color-border: var(--warm-300);           /* #EDE8E1 */
--color-border-strong: var(--warm-400);    /* #D8D0C7 */
--color-ring: var(--amber-500);            /* Focus ring */

/* Muted / Disabled */
--color-muted: var(--warm-200);            /* #F5F1EC */
--color-muted-foreground: var(--warm-600); /* #8C847C */

/* Semantic Status */
--color-success: var(--green-500);         /* #059669 */
--color-success-bg: #ECFDF5;
--color-success-foreground: #FFFFFF;
--color-warning: var(--yellow-500);        /* #D97706 */
--color-warning-bg: #FFFBEB;
--color-warning-foreground: #FFFFFF;
--color-destructive: var(--red-500);       /* #DC2626 */
--color-destructive-bg: #FEF2F2;
--color-destructive-foreground: #FFFFFF;
--color-info: var(--blue-500);             /* #0369A1 */
--color-info-bg: #F0F9FF;
--color-info-foreground: #FFFFFF;

/* Category Colours (pet-specific) */
--color-cat-dog: #D4763C;      /* Amber - warm, loyal */
--color-cat-cat: #7C3AED;      /* Purple - independent, elegant */
--color-cat-bird: #0EA5E9;     /* Sky blue - freedom, flight */
--color-cat-fish: #0D9488;     /* Teal - aquatic, calm */
--color-cat-small: #F59E0B;    /* Gold - playful, small */
--color-cat-health: #059669;   /* Green - wellness, care */
--color-cat-accessories: #6366F1; /* Indigo - versatile */

/* Deal / Urgency Tokens */
--color-deal-badge: #DC2626;
--color-deal-badge-text: #FFFFFF;
--color-deal-savings: #059669;
--color-deal-countdown: var(--amber-500);
--color-deal-expired: var(--warm-500);

/* Star Rating */
--color-star-filled: #FBBF24;
--color-star-empty: var(--warm-300);

/* Affiliate CTA */
--color-affiliate-cta: var(--amber-500);
--color-affiliate-cta-hover: var(--amber-600);
--color-affiliate-cta-text: #FFFFFF;
```

#### Layer 3: Component Tokens

```css
/* Navigation */
--nav-bg: var(--navy-900);
--nav-text: #FFFFFF;
--nav-text-active: var(--amber-400);
--nav-height: 72px;
--nav-height-mobile: 64px;

/* Hero */
--hero-bg: var(--navy-900);
--hero-text: #FFFFFF;
--hero-accent: var(--amber-400);

/* Product Card */
--product-card-bg: var(--color-surface);
--product-card-border: var(--color-card-border);
--product-card-radius: var(--border-radius-lg);
--product-card-shadow: var(--shadow-card);
--product-card-shadow-hover: var(--shadow-hover);

/* Price Display */
--price-current: var(--navy-900);
--price-original: var(--warm-500);
--price-savings: var(--green-500);
--price-currency: inherit;

/* Blog / Article */
--article-max-width: 720px;
--article-text: var(--navy-800);
--article-heading: var(--navy-900);
--article-link: var(--amber-600);
--article-link-hover: var(--amber-700);
--article-blockquote-border: var(--amber-400);
--article-code-bg: var(--warm-200);

/* Pros/Cons Box */
--pros-bg: #ECFDF5;
--pros-border: #A7F3D0;
--pros-icon: var(--green-500);
--cons-bg: #FEF2F2;
--cons-border: #FECACA;
--cons-icon: var(--red-500);

/* Newsletter CTA */
--newsletter-bg: var(--navy-900);
--newsletter-text: #FFFFFF;
--newsletter-input-bg: rgba(255, 255, 255, 0.1);
--newsletter-input-border: rgba(255, 255, 255, 0.2);
--newsletter-btn: var(--amber-500);

/* Trust Bar */
--trust-bg: var(--warm-200);
--trust-text: var(--navy-700);
--trust-icon: var(--amber-500);

/* Footer */
--footer-bg: var(--navy-950);
--footer-text: var(--navy-300);
--footer-heading: #FFFFFF;
--footer-link: var(--navy-200);
--footer-link-hover: var(--amber-400);
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Brand primitives
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#1B2B3A',
          950: '#102A43',
        },
        amber: {
          50: '#FFF8F0',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#F59E42',
          500: '#D4763C',
          600: '#B85C2A',
          700: '#9A4A20',
          800: '#7C3A18',
          900: '#5F2D12',
        },
        warm: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F5F1EC',
          300: '#EDE8E1',
          400: '#D8D0C7',
          500: '#B8AFA5',
          600: '#8C847C',
          700: '#6B6560',
          800: '#4A4541',
          900: '#2D2A27',
        },
        // Semantic
        primary: '#1B2B3A',
        accent: '#D4763C',
        background: '#FAF8F5',
        // Category colours
        'cat-dog': '#D4763C',
        'cat-cat': '#7C3AED',
        'cat-bird': '#0EA5E9',
        'cat-fish': '#0D9488',
        'cat-small': '#F59E0B',
        'cat-health': '#059669',
        'cat-accessories': '#6366F1',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(27, 43, 58, 0.06)',
        'card': '0 1px 3px rgba(27, 43, 58, 0.04), 0 4px 12px rgba(27, 43, 58, 0.06)',
        'hover': '0 8px 24px rgba(27, 43, 58, 0.12)',
        'lg': '0 8px 32px rgba(27, 43, 58, 0.1)',
      },
    },
  },
}
export default config
```

---

## 5. Typography System

### Font Pairing: Playfair Display + DM Sans (Confirmed)
**Source:** typography.csv #1 "Classic Elegant" (Playfair Display + Inter -- closest match, confirms Playfair as editorial heading font). PetGearHub's existing pairing of Playfair Display (headings) + DM Sans (body) is validated by cross-referencing:

- **typography.csv #1 "Classic Elegant"** -- Playfair Display for "luxury, editorial, magazines, high-end e-commerce"
- **typography.csv #3 "Tech Startup"** -- DM Sans validated as "highly readable" body font
- **typography.csv #20 "Premium Sans"** -- DM Sans confirmed as premium body option

This pairing creates the perfect blend: Playfair Display's editorial sophistication establishes authority for product reviews, while DM Sans' clean geometric forms ensure readability for product specs, prices, and body content.

### Font Import

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
```

### Tailwind Font Config

```typescript
fontFamily: {
  serif: ['Playfair Display', 'Georgia', 'serif'],
  sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
}
```

### Type Scale (Major Third -- 1.25 ratio)

| Token | Size | Line Height | Weight | Font | Usage |
|---|---|---|---|---|---|
| `display-xl` | 48px / 3rem | 1.1 | 700 | Playfair Display | Homepage hero |
| `display-lg` | 40px / 2.5rem | 1.15 | 700 | Playfair Display | Page heroes |
| `h1` | 36px / 2.25rem | 1.2 | 700 | Playfair Display | Page titles |
| `h2` | 30px / 1.875rem | 1.25 | 600 | Playfair Display | Section headings |
| `h3` | 24px / 1.5rem | 1.3 | 600 | Playfair Display | Card titles, subsections |
| `h4` | 20px / 1.25rem | 1.35 | 600 | DM Sans | Minor headings |
| `h5` | 18px / 1.125rem | 1.4 | 700 | DM Sans | Label headings |
| `body-lg` | 18px / 1.125rem | 1.7 | 400 | DM Sans | Article body (long-form) |
| `body` | 16px / 1rem | 1.6 | 400 | DM Sans | Default body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | DM Sans | Secondary text, captions |
| `caption` | 12px / 0.75rem | 1.4 | 500 | DM Sans | Labels, badges, meta |
| `overline` | 12px / 0.75rem | 1.3 | 700 | DM Sans | Category tags, overlines |
| `price-lg` | 28px / 1.75rem | 1 | 700 | DM Sans | Product price (featured) |
| `price` | 22px / 1.375rem | 1 | 700 | DM Sans | Product price (standard) |
| `price-sm` | 16px / 1rem | 1 | 700 | DM Sans | Product price (compact) |

### Weight Usage

| Weight | Token | Usage |
|---|---|---|
| 400 (Regular) | `font-normal` | Body text, descriptions |
| 500 (Medium) | `font-medium` | Navigation, buttons, labels |
| 600 (SemiBold) | `font-semibold` | Subheadings (Playfair) |
| 700 (Bold) | `font-bold` | Headlines, prices, emphasis |

### Article Typography Rules
**Source:** ux-guidelines.csv #72 (Line Height), #73 (Line Length), #74 (Font Size Scale), #76 (Contrast Readability), #77 (Heading Clarity)

- Body text: 18px with `leading-relaxed` (1.625) for long-form readability
- Line length: `max-w-prose` (65ch) for optimal reading comfort
- Heading-to-body size contrast: minimum 1.25x ratio
- Body text colour: `navy-800` (#243B53) on `warm-100` (#FAF8F5) = 10.2:1 contrast ratio

---

## 6. Spacing System (8pt Grid)

**Source:** styles.csv Swiss Modernism 2.0 -- mathematical spacing with 8px base unit

### Scale

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `space-0` | 0px | `p-0` | Reset |
| `space-1` | 4px | `p-1` | Tight internal (badge padding) |
| `space-2` | 8px | `p-2` | Icon gaps, tight spacing |
| `space-3` | 12px | `p-3` | Compact card padding |
| `space-4` | 16px | `p-4` | Default card padding, input padding |
| `space-5` | 20px | `p-5` | Comfortable spacing |
| `space-6` | 24px | `p-6` | Card padding (desktop), grid gap |
| `space-8` | 32px | `p-8` | Section internal padding |
| `space-10` | 40px | `p-10` | Section spacing (mobile) |
| `space-12` | 48px | `p-12` | Large section gaps |
| `space-16` | 64px | `p-16` | Section padding (desktop) |
| `space-20` | 80px | `p-20` | Page-level vertical spacing |
| `space-24` | 96px | `p-24` | Hero section padding |

### Component Spacing Rules

| Context | Internal Padding | Gap Between Items | Margin Between Sections |
|---|---|---|---|
| Product Card | `p-4` (16px) | `gap-3` (12px) | `mb-6` (24px) |
| Blog Article Card | `p-5` (20px) | `gap-4` (16px) | `mb-8` (32px) |
| Page Section | `py-16` (64px) | `gap-8` (32px) | -- |
| Nav | `px-6 py-4` | `gap-6` (24px) | -- |
| Form Fields | `px-4 py-3` | `gap-4` (16px) | -- |
| Button | `px-6 py-3` | `gap-2` (8px) | -- |

---

## 7. Effects

### Shadows
**Source:** styles.csv Organic Biophilic (#42), Soft UI Evolution (#19)

```css
/* Elevation System */
--shadow-xs: 0 1px 2px rgba(27, 43, 58, 0.04);
--shadow-sm: 0 2px 4px rgba(27, 43, 58, 0.06);
--shadow-md: 0 4px 8px rgba(27, 43, 58, 0.06), 0 2px 4px rgba(27, 43, 58, 0.04);
--shadow-lg: 0 8px 16px rgba(27, 43, 58, 0.08), 0 4px 8px rgba(27, 43, 58, 0.04);
--shadow-xl: 0 16px 32px rgba(27, 43, 58, 0.1), 0 8px 16px rgba(27, 43, 58, 0.06);

/* Coloured Shadows (for CTA emphasis) */
--shadow-amber: 0 4px 14px rgba(212, 118, 60, 0.3);
--shadow-amber-lg: 0 8px 24px rgba(212, 118, 60, 0.35);
```

### Border Radius
```css
--radius-sm: 8px;    /* Buttons, badges, inputs */
--radius-md: 12px;   /* Cards, containers */
--radius-lg: 16px;   /* Featured cards, modals */
--radius-xl: 24px;   /* Hero sections, large cards */
--radius-full: 9999px; /* Pills, avatars, tags */
```

### Borders
```css
--border-width-default: 1px;
--border-width-thick: 2px;
--border-color-default: var(--warm-300);  /* #EDE8E1 */
--border-color-strong: var(--warm-400);   /* #D8D0C7 */
--border-color-accent: var(--amber-300);  /* #FDBA74 */
```

### Blur / Backdrop
```css
/* For overlays and modals */
--backdrop-blur: blur(8px);
--backdrop-bg: rgba(27, 43, 58, 0.5);
```

---

## 8. Animation Guidelines

**Source:** styles.csv Motion-Driven (#15), Micro-interactions (#16); ux-guidelines.csv #7-#14 (Animation section)

### Timing Tokens

| Token | Duration | Easing | Usage |
|---|---|---|---|
| `instant` | 0ms | -- | Tooltips, toggles |
| `micro` | 100ms | `ease-out` | Button press, focus ring |
| `fast` | 150ms | `ease-out` | Hover states, colour changes |
| `normal` | 200ms | `ease-in-out` | Card hover lift, dropdown open |
| `moderate` | 300ms | `ease-in-out` | Modal open/close, page transitions |
| `slow` | 500ms | `ease-out` | Scroll reveals, section entrances |
| `dramatic` | 800ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero animations, counters |

### Framer Motion Presets

```typescript
// animation-presets.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
}

export const cardHover = {
  whileHover: {
    y: -4,
    boxShadow: '0 8px 24px rgba(27, 43, 58, 0.12)',
    transition: { duration: 0.2 }
  }
}

export const scalePress = {
  whileTap: { scale: 0.97 },
  transition: { duration: 0.1 }
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } }
}

export const slideInFromRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.4, ease: 'easeOut' }
}
```

### Animation Rules

1. **Max 1-2 animated elements per viewport** (ux-guidelines.csv #7 -- Severity: High)
2. **150-300ms for micro-interactions** (ux-guidelines.csv #8)
3. **Always respect `prefers-reduced-motion`** (ux-guidelines.csv #9 -- Severity: High)
4. **Use `transform` and `opacity` only** for GPU-accelerated performance (ux-guidelines.csv #13)
5. **Use `ease-out` for entering, `ease-in` for exiting** (ux-guidelines.csv #14)
6. **Hover effects are NOT tap substitutes** -- use `onClick` for primary interactions (ux-guidelines.csv #11)
7. **Loading states mandatory** for async operations (ux-guidelines.csv #10)

### Reduced Motion Implementation

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 9. Component Token Specifications

### StarRating
| Token | Value |
|---|---|
| Star size | 20px (product card), 24px (product detail) |
| Filled colour | `#FBBF24` (gold) |
| Empty colour | `var(--warm-300)` |
| Half-star | Clip path or gradient fill |
| Gap between stars | 2px |
| Rating text | `body-sm`, `font-medium`, `navy-700` |

### PriceDisplay
| Token | Value |
|---|---|
| Current price font | `price-lg` (featured) or `price` (card) |
| Current price colour | `navy-900` |
| Original price | `body-sm`, `line-through`, `warm-500` |
| Savings badge bg | `green-500` |
| Savings badge text | `#FFFFFF`, `caption`, `font-bold` |
| Currency symbol | Same font, slightly smaller |

### ProsConsBox
| Token | Value |
|---|---|
| Pros bg | `#ECFDF5` |
| Pros border-left | `4px solid #059669` |
| Pros icon | Checkmark, `#059669` |
| Cons bg | `#FEF2F2` |
| Cons border-left | `4px solid #DC2626` |
| Cons icon | X mark, `#DC2626` |
| Border radius | `var(--radius-md)` (12px) |
| Padding | `p-5` (20px) |

### AffiliateButton (Primary CTA)
| Token | Value |
|---|---|
| Background | `var(--amber-500)` (#D4763C) |
| Hover background | `var(--amber-600)` (#B85C2A) |
| Text colour | `#FFFFFF` |
| Font | `body`, `font-bold` |
| Padding | `px-8 py-4` (32px x 16px) |
| Border radius | `var(--radius-sm)` (8px) |
| Shadow | `var(--shadow-amber)` |
| Hover shadow | `var(--shadow-amber-lg)` |
| Hover transform | `translateY(-1px)` |
| Active transform | `translateY(0) scale(0.98)` |
| Transition | `200ms ease-in-out` |
| Min width | 200px |
| Min height | 48px (touch target -- ux-guidelines.csv #22) |

### ArticleCard
| Token | Value |
|---|---|
| Background | `var(--color-surface)` |
| Border | `1px solid var(--warm-300)` |
| Border radius | `var(--radius-lg)` (16px) |
| Shadow | `var(--shadow-card)` |
| Hover shadow | `var(--shadow-hover)` |
| Hover border | `var(--amber-300)` |
| Image aspect ratio | `16/9` |
| Image border radius | `var(--radius-lg) var(--radius-lg) 0 0` |
| Padding (body) | `p-5` (20px) |
| Title font | `h3` (Playfair Display, 24px, 600) |
| Meta font | `caption` (DM Sans, 12px, 500) |
| Excerpt font | `body-sm` (DM Sans, 14px, 400) |
| Hover transform | `translateY(-4px)` over `200ms` |

### DealCountdown
| Token | Value |
|---|---|
| Background | `var(--navy-900)` |
| Text | `#FFFFFF` |
| Timer digits font | `price-lg`, `font-bold` |
| Timer label font | `caption`, `warm-300` |
| Separator colour | `var(--amber-400)` |
| Urgency (<1hr) bg | `#DC2626` |
| Border radius | `var(--radius-md)` |

### Breadcrumbs
| Token | Value |
|---|---|
| Font | `body-sm`, `font-normal` |
| Link colour | `var(--navy-500)` |
| Active colour | `var(--navy-900)` |
| Separator | `/` or `>`, `warm-400` |
| Gap | `space-2` (8px) |

### FAQAccordion
| Token | Value |
|---|---|
| Question font | `h5` (DM Sans, 18px, 700) |
| Answer font | `body` (DM Sans, 16px, 400) |
| Border | `1px solid var(--warm-300)` |
| Expanded bg | `var(--warm-50)` |
| Icon | Chevron, `navy-500`, rotates 180deg |
| Transition | `300ms ease-in-out` |
| Padding | `p-5` |

### CategoryIcon
| Token | Value |
|---|---|
| Size | 48px (default), 64px (featured) |
| Background | Category colour at 10% opacity |
| Border radius | `var(--radius-md)` (12px) |
| Icon colour | Category colour at 100% |
| Hover scale | `1.05` |

### CalloutBox
| Token | Value |
|---|---|
| Info bg | `#F0F9FF` / border `#0369A1` |
| Warning bg | `#FFFBEB` / border `#D97706` |
| Tip bg | `#ECFDF5` / border `#059669` |
| Border-left | `4px solid` |
| Padding | `p-5` |
| Border radius | `var(--radius-md)` |
| Icon size | 20px |

### NewsletterCTA
| Token | Value |
|---|---|
| Background | `var(--navy-900)` |
| Heading | Playfair Display, `h2`, `#FFFFFF` |
| Body | DM Sans, `body`, `navy-200` |
| Input bg | `rgba(255, 255, 255, 0.1)` |
| Input border | `rgba(255, 255, 255, 0.2)` |
| Input focus border | `var(--amber-400)` |
| Button bg | `var(--amber-500)` |
| Button hover bg | `var(--amber-600)` |
| Border radius (section) | `var(--radius-xl)` |
| Padding | `py-16 px-8` |

### TrustBar
| Token | Value |
|---|---|
| Background | `var(--warm-200)` |
| Text | `body-sm`, `navy-700` |
| Icon colour | `var(--amber-500)` |
| Icon size | 24px |
| Gap | `space-8` (32px) |
| Padding | `py-4` |

### ShareButtons
| Token | Value |
|---|---|
| Size | 40px x 40px |
| Border radius | `var(--radius-full)` |
| Default bg | `var(--warm-200)` |
| Hover bg | Respective platform colour |
| Icon size | 18px |
| Gap | `space-2` (8px) |

---

## 10. Anti-Patterns to Avoid

**Source:** ui-reasoning.csv decision rules + ux-guidelines.csv

### Critical (HIGH severity from ui-reasoning.csv)

| Anti-Pattern | Source Rule | What to Do Instead |
|---|---|---|
| Flat design without depth on product cards | ui-reasoning #3 E-commerce | Use card shadows + hover lift effects |
| Text-heavy product pages | ui-reasoning #3 E-commerce | Use visual hierarchy: images, badges, star ratings |
| Generic design with no personality | ui-reasoning #23 Pet Tech App | Add pet-themed icons, warm colours, playful micro-interactions |
| Poor typography on blog content | ui-reasoning #67 Magazine/Blog | Use Playfair for headings, 18px body, max-w-prose line length |
| Slow-loading pages | ui-reasoning #67 Magazine/Blog | next/image optimization, lazy loading, code splitting |
| Auto-play video loops | ux-guidelines #96 Sustainability | Click-to-play or pause when off-screen |
| Animate everything | ux-guidelines #7 | Max 1-2 animated elements per viewport |
| Force scroll effects | ux-guidelines #99 | Respect prefers-reduced-motion |
| Tiny touch targets | ux-guidelines #22 | Min 44x44px touch targets |
| Color-only error indicators | ux-guidelines #37 | Use icons + text in addition to colour |
| Removing focus outlines | ux-guidelines #28 | Use `focus:ring-2 focus:ring-amber-500` |
| Missing alt text on product images | ux-guidelines #38 | Descriptive alt text: "Dog harness - front view" |

### Medium Severity

| Anti-Pattern | What to Do Instead |
|---|---|
| Using AI purple/pink gradients | Not appropriate for pet affiliate; use warm navy/amber palette |
| Full-width text paragraphs | Limit to `max-w-prose` (65ch) for readability |
| Using `z-[9999]` | Define z-index scale: 10 (base), 20 (dropdown), 30 (sticky), 40 (modal), 50 (toast) |
| No loading states for affiliate links | Show spinner/skeleton while redirect processes |
| Placeholder-only form inputs | Always use visible labels above inputs |
| No confirmation on newsletter signup | Show success toast with confirmation message |
| Images without dimensions | Always set width/height or use aspect-ratio to prevent CLS |

---

## 11. Accessibility Checklist

**Source:** ux-guidelines.csv #36-#45 (Accessibility section), styles.csv #8 (Accessible & Ethical), #17 (Inclusive Design)

### WCAG AA Minimum (Target: AAA where possible)

- [ ] **Colour Contrast** -- 4.5:1 for normal text, 3:1 for large text (18px+ bold or 24px+), 3:1 for UI components (ux-guidelines #36)
- [ ] **No colour-only indicators** -- Star ratings, deal badges, and status use icons + text, not just colour (ux-guidelines #37)
- [ ] **Alt text on all images** -- Product images, author photos, category icons (ux-guidelines #38)
- [ ] **Heading hierarchy** -- Sequential h1 > h2 > h3, no skipped levels (ux-guidelines #39)
- [ ] **ARIA labels** -- All icon-only buttons (share, close, menu toggle) have `aria-label` (ux-guidelines #40)
- [ ] **Keyboard navigation** -- Tab order matches visual order; all interactive elements reachable (ux-guidelines #41)
- [ ] **Semantic HTML** -- `<nav>`, `<main>`, `<article>`, `<aside>`, not div soup (ux-guidelines #42)
- [ ] **Form labels** -- Every input has `<label>` with `for` attribute (ux-guidelines #43)
- [ ] **Error messages announced** -- Use `aria-live` or `role="alert"` for form errors (ux-guidelines #44)
- [ ] **Skip links** -- "Skip to main content" link on every page (ux-guidelines #45)
- [ ] **Focus visible** -- 3-4px focus ring on all interactive elements (`focus-visible:ring-2 focus-visible:ring-amber-500`)
- [ ] **Touch targets** -- Minimum 44x44px on all clickable elements (ux-guidelines #22)
- [ ] **Touch spacing** -- Minimum 8px gap between adjacent touch targets (ux-guidelines #23)
- [ ] **Reduced motion** -- `@media (prefers-reduced-motion: reduce)` disables animations (ux-guidelines #9)
- [ ] **Font size minimum** -- 16px body text on all devices (ux-guidelines #67)
- [ ] **Viewport meta** -- `width=device-width, initial-scale=1` (ux-guidelines #68)
- [ ] **Image scaling** -- All images use `max-w-full h-auto` (ux-guidelines #70)
- [ ] **Table handling** -- Product comparison tables use `overflow-x-auto` wrapper on mobile (ux-guidelines #71)

### PetGearHub-Specific Accessibility

- [ ] Price displays use `aria-label` for screen readers: "Current price: 29 pounds 99. Was 39 pounds 99."
- [ ] Star ratings use `aria-label`: "Rated 4.5 out of 5 stars"
- [ ] Affiliate "Buy Now" buttons clearly indicate external link: `aria-label="Buy [Product Name] on Amazon (opens in new tab)"`
- [ ] DealCountdown uses `aria-live="polite"` for timer updates
- [ ] Product image galleries have keyboard navigation (arrow keys)
- [ ] Category filter controls are keyboard-accessible with `role="radiogroup"`

---

## 12. Dark Mode Considerations

### Strategy: System-Preference Based with Manual Toggle

Dark mode is optional but recommended for PetGearHub. The warm off-white background makes this a natural candidate for a comfortable dark alternative.

### Dark Mode Semantic Token Overrides

```css
[data-theme="dark"], .dark {
  /* Surfaces */
  --color-background: #0F1419;
  --color-surface: #1A2332;
  --color-surface-raised: #243344;
  --color-surface-sunken: #0A0F14;

  /* Text */
  --color-foreground: #F0F4F8;
  --color-foreground-secondary: #BCCCDC;
  --color-foreground-muted: #829AB1;

  /* Brand (keep recognisable) */
  --color-primary: #BCCCDC;
  --color-primary-hover: #D9E2EC;
  --color-primary-foreground: #0F1419;
  --color-accent: #F59E42;           /* Slightly lighter amber for dark bg */
  --color-accent-hover: #D4763C;
  --color-accent-foreground: #0F1419;

  /* Cards */
  --color-card: #1A2332;
  --color-card-foreground: #F0F4F8;
  --color-card-border: #243344;
  --color-card-hover-border: #D4763C;

  /* Borders */
  --color-border: #243344;
  --color-border-strong: #334E68;

  /* Muted */
  --color-muted: #1A2332;
  --color-muted-foreground: #829AB1;

  /* Navigation */
  --nav-bg: #0A0F14;
  --nav-text: #F0F4F8;

  /* Shadows (darker, more subtle) */
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.25);
}
```

### Dark Mode Implementation Rules

1. **Never use pure black** (#000000) -- use `#0F1419` (very dark navy) for warmth
2. **Reduce image brightness** slightly: `filter: brightness(0.9)` on product images
3. **Keep amber CTA visible** -- lighten to `#F59E42` for adequate contrast on dark
4. **Maintain star rating gold** -- `#FBBF24` works on both light and dark
5. **Test all category colours** for 4.5:1 contrast on dark backgrounds

---

## 13. Next.js Best Practices

**Source:** stacks/nextjs.csv

### Critical Rules (HIGH severity from nextjs.csv)

| Rule | Do | Don't |
|---|---|---|
| **Server Components** (nextjs #7) | Keep components server by default | Add `'use client'` unnecessarily |
| **Client Components** (nextjs #8) | Add `'use client'` only for onClick, useState | Marking static content as client |
| **Push Client down** (nextjs #9) | Use `<InteractiveButton/>` in Server pages | Mark entire page as client |
| **Fetch in Server** (nextjs #12) | `async function Page() { const data = await fetch() }` | `useEffect(() => fetch())` |
| **next/image** (nextjs #17) | `<Image>` for all product/blog images | `<img>` tags directly |
| **Image dimensions** (nextjs #18) | Always provide width/height or `fill` | Missing dimensions causing CLS |
| **Priority LCP images** (nextjs #21) | `priority` on hero product images | Omitting priority on above-fold images |
| **next/font** (nextjs #22) | `next/font/google` for Playfair + DM Sans | `<link>` to Google Fonts |
| **next/link** (nextjs #42) | `<Link>` for all internal navigation | `<a>` for internal links |
| **Input validation** (nextjs #31) | Zod validation on Server Actions | Trusting client input |
| **Sanitize input** (nextjs #50) | `DOMPurify.sanitize()` for user content | `dangerouslySetInnerHTML` with raw input |
| **CSP headers** (nextjs #51) | Configure Content-Security-Policy | No security headers |
| **Error boundaries** (nextjs #6) | `error.tsx` per route segment | Try/catch in every component |
| **Loading states** (nextjs #5) | `loading.tsx` with skeleton screens | Manual loading state management |

### Performance (from nextjs.csv)

- Use `dynamic()` for heavy components like charts, carousels, countdown timers (nextjs #39)
- Use skeleton loaders with `aspect-ratio` for product cards to prevent CLS (nextjs #40)
- Bundle analysis with `@next/bundle-analyzer` (nextjs #38)
- Configure `remotePatterns` for affiliate product image CDNs (nextjs #20)
- Use `generateStaticParams` for known product/blog slugs (nextjs #11)
- Use `generateMetadata` for dynamic page titles and OpenGraph (nextjs #25, #26)

### Font Loading Implementation

```typescript
// app/layout.tsx
import { Playfair_Display, DM_Sans } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans bg-warm-100 text-navy-900">
        {children}
      </body>
    </html>
  )
}
```

---

## 14. Chart Recommendations (Deals Dashboard / Analytics)

**Source:** charts.csv

| Use Case | Chart Type | Library | Notes |
|---|---|---|---|
| Price history over time | Line Chart (#1) | Recharts | Use `#0080FF` primary, dashed for projections |
| Category comparison | Horizontal Bar (#2) | Recharts | Sort descending, value labels on bars |
| Deal savings breakdown | Waterfall Chart (#13) | Recharts | Green increases, red decreases |
| Product rating comparison | Radar Chart (#14) | Recharts | 5-8 axes max, 20% fill opacity |
| Conversion funnel | Funnel Chart (#7) | Recharts | Show drop-off % between stages |
| Price vs target | Bullet Chart (#18) | Custom SVG | Compact KPI for deal dashboards |

---

## 15. Responsive Breakpoints

```typescript
// Consistent with Tailwind defaults
const breakpoints = {
  sm: '640px',   // Large phones
  md: '768px',   // Tablets
  lg: '1024px',  // Small laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px' // Large monitors
}
```

### Layout Rules per Breakpoint

| Breakpoint | Grid Columns | Product Cards/Row | Sidebar | Nav |
|---|---|---|---|---|
| < 640px | 1 | 1 | Hidden | Mobile hamburger |
| 640-767px | 2 | 2 | Hidden | Mobile hamburger |
| 768-1023px | 2-3 | 2-3 | Collapsible | Full nav |
| 1024-1279px | 3-4 | 3 | Visible | Full nav |
| 1280px+ | 4 | 4 | Visible | Full nav + search |

---

## 16. Z-Index Scale

**Source:** ux-guidelines.csv #15 (Z-Index Management -- Severity: High)

```css
--z-base: 0;
--z-raised: 10;       /* Cards with hover state */
--z-dropdown: 20;     /* Dropdown menus, autocomplete */
--z-sticky: 30;       /* Sticky nav, sticky sidebar */
--z-overlay: 40;      /* Modal backdrop */
--z-modal: 50;        /* Modal content */
--z-popover: 60;      /* Tooltips, popovers */
--z-toast: 70;        /* Toast notifications */
--z-maximum: 100;     /* Emergency/debug only */
```

---

## References

This design system was generated by cross-referencing the following data sources:

- **products.csv**: E-commerce (#3), Pet Tech App (#23), Magazine/Blog (#67), Marketplace P2P (#48), Veterinary Clinic (#61)
- **styles.csv**: Swiss Modernism 2.0 (#50), Organic Biophilic (#42), Soft UI Evolution (#19), Motion-Driven (#15), Micro-interactions (#16), Feature-Rich Showcase (#22)
- **colors.csv**: E-commerce (#3), Pet Tech App (#23), Veterinary Clinic (#61), Notes & Writing App (#93 -- warm cream palette)
- **typography.csv**: Classic Elegant #1 (Playfair Display), Tech Startup #3 (DM Sans), Soft Rounded #19, Magazine Style #35
- **landing.csv**: Product Review/Ratings (#19), Feature-Rich Showcase (#22), Storytelling-Driven (#27), Newsletter/Content First (#23), Marketplace/Directory (#22), Conversion-Optimized (#21)
- **charts.csv**: Line Chart (#1), Bar Chart (#2), Radar (#14), Waterfall (#13), Funnel (#7), Bullet (#18)
- **ux-guidelines.csv**: All 99 guidelines reviewed; 47 directly applicable rules incorporated
- **ui-reasoning.csv**: E-commerce (#3), Pet Tech App (#23), Magazine/Blog (#67), Marketplace (#48)
- **stacks/nextjs.csv**: All 52 guidelines reviewed; 16 critical rules incorporated
