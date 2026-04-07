# Homepage Design Overrides

> Page-specific tokens and layout specifications for the PetGearHub homepage.
> Inherits from [MASTER.md](../MASTER.md) -- only overrides and additions documented here.

---

## Layout Pattern

**Primary:** Hero-Centric Design + Feature-Rich Showcase
**Secondary:** Social Proof-Focused
**Source:** landing.csv #20 (Hero-Centric), #22 (Feature-Rich Showcase), #24 (Social Proof-Focused)

### Section Order

1. **Sticky Navigation** (navy-900 bg, 72px height)
2. **Hero Section** -- Full-bleed with headline, value prop, primary CTA, category quick-links
3. **Trust Bar** -- Partner logos, "As featured in" strip
4. **Featured Categories** -- Bento grid with category icons (Dog, Cat, Bird, Fish, etc.)
5. **Top Picks / Editor's Choice** -- Horizontal scroll carousel of product cards
6. **How It Works** -- 3-step value prop (We Research > We Review > You Save)
7. **Latest Reviews** -- Article card grid (3-4 columns)
8. **Deal Spotlight** -- Featured deal with countdown timer
9. **Testimonials / Trust Signals** -- User reviews carousel
10. **Newsletter CTA** -- Full-width navy section
11. **Footer** -- navy-950 bg, site links, legal

### Decision Rules Applied
```
from ui-reasoning.csv:
  E-commerce:     "if_conversion_focused" -> urgency colours in Deal Spotlight
  Pet Tech App:   "must_have" -> pet personality (category icons, warm imagery)
  Magazine/Blog:  "must_have" -> article showcase (Latest Reviews section)
```

---

## Hero Section

**Pattern:** Hero-Centric Design (landing.csv #20)
- Hero occupies **60-80% above fold** (landing.csv #32 rule)
- One primary CTA with 7:1 contrast ratio
- CTA also appears sticky in nav

### Hero Tokens

```css
--hero-min-height: 85vh;        /* Mobile: 75vh */
--hero-bg: var(--navy-900);
--hero-bg-image: url('/hero-pets.webp');
--hero-overlay: rgba(27, 43, 58, 0.7);
--hero-headline-size: clamp(2.5rem, 5vw, 3.5rem);  /* display-xl responsive */
--hero-headline-color: #FFFFFF;
--hero-headline-font: var(--font-serif);             /* Playfair Display */
--hero-subtitle-size: clamp(1rem, 2vw, 1.25rem);
--hero-subtitle-color: var(--navy-200);
--hero-cta-bg: var(--amber-500);
--hero-cta-hover-bg: var(--amber-600);
--hero-cta-text: #FFFFFF;
--hero-cta-shadow: 0 4px 14px rgba(212, 118, 60, 0.4);
--hero-cta-padding: 1rem 2.5rem;
--hero-cta-radius: var(--radius-sm);
--hero-cta-font-size: 1.125rem;
--hero-cta-font-weight: 700;
```

### Hero Content

```
Headline:       "Expert Pet Product Reviews You Can Trust"
Subtitle:       "Independently tested and reviewed gear for every pet. UK-based, always honest."
Primary CTA:    "Browse All Reviews" -> /products
Secondary CTA:  "Latest Deals" -> /deals (outline variant, white border)
```

### Hero Animation (Framer Motion)

```typescript
// Staggered entrance
const heroAnimation = {
  container: { animate: { transition: { staggerChildren: 0.15 } } },
  headline: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  subtitle: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } },
  cta: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4 } },
}
```

---

## Featured Categories Section

**Layout:** Bento Grid (styles.csv #53)

### Grid Spec

```
Desktop (xl+):  6 columns, 1 row -- all categories equal
Desktop (lg):   3 columns x 2 rows
Tablet (md):    2 columns x 3 rows + 1 (or horizontal scroll)
Mobile:         Horizontal scroll carousel, snap
```

### Category Card Tokens

```css
--category-card-bg: #FFFFFF;
--category-card-radius: var(--radius-lg);          /* 16px */
--category-card-shadow: var(--shadow-card);
--category-card-hover-shadow: var(--shadow-hover);
--category-card-hover-transform: translateY(-4px);
--category-card-padding: var(--space-6);            /* 24px */
--category-card-transition: 200ms ease-in-out;
--category-icon-size: 48px;
--category-icon-bg-opacity: 0.1;
--category-icon-radius: var(--radius-md);           /* 12px */
--category-title-font: h4 (DM Sans, 20px, 600);
--category-count-font: caption (DM Sans, 12px, 500);
--category-count-color: var(--warm-600);
```

### Category Colour Map (from MASTER.md)

| Category | Colour | Icon BG |
|---|---|---|
| Dog | #D4763C | rgba(212, 118, 60, 0.1) |
| Cat | #7C3AED | rgba(124, 58, 237, 0.1) |
| Bird | #0EA5E9 | rgba(14, 165, 233, 0.1) |
| Fish | #0D9488 | rgba(13, 148, 136, 0.1) |
| Small Pets | #F59E0B | rgba(245, 158, 11, 0.1) |
| Pet Health | #059669 | rgba(5, 150, 105, 0.1) |
| Accessories | #6366F1 | rgba(99, 102, 241, 0.1) |

---

## Top Picks Carousel

### Layout

- Horizontal scroll with scroll-snap-type: x mandatory
- 4 cards visible on desktop, 2 on tablet, 1.2 on mobile (peek next card)
- Navigation arrows on desktop (left/right)
- Dot indicators on mobile

### Product Card Tokens (Homepage Variant)

```css
--product-card-width: 280px;                   /* Fixed in carousel */
--product-card-min-height: 380px;
--product-card-image-aspect: 4/3;
--product-card-image-radius: var(--radius-lg) var(--radius-lg) 0 0;
--product-card-body-padding: var(--space-4);
--product-card-title-lines: 2;                 /* line-clamp-2 */
--product-card-rating-size: 16px;
```

---

## Trust Bar

**Source:** landing.csv #24 (Social Proof-Focused)

```css
--trust-bar-bg: var(--warm-200);
--trust-bar-padding: var(--space-4) 0;
--trust-logo-height: 32px;
--trust-logo-filter: grayscale(100%) opacity(0.6);
--trust-logo-hover-filter: grayscale(0%) opacity(1);
--trust-logo-transition: 300ms ease;
--trust-logo-gap: var(--space-10);
```

Content: "Independently reviewed | 500+ products tested | Trusted by 50,000 UK pet owners"

---

## Deal Spotlight Section

### Tokens

```css
--deal-bg: var(--warm-50);
--deal-card-bg: #FFFFFF;
--deal-card-radius: var(--radius-xl);
--deal-card-shadow: var(--shadow-lg);
--deal-badge-bg: #DC2626;
--deal-badge-text: #FFFFFF;
--deal-badge-radius: var(--radius-full);
--deal-badge-padding: var(--space-1) var(--space-3);
--deal-savings-color: var(--green-500);
```

---

## Newsletter CTA Section

**Pattern:** Newsletter/Content First (landing.csv #23)

```css
--newsletter-section-bg: var(--navy-900);
--newsletter-section-radius: var(--radius-xl);     /* 24px when inside container */
--newsletter-section-padding: var(--space-16) var(--space-8);
--newsletter-headline-font: display-lg (Playfair, 40px, 700);
--newsletter-headline-color: #FFFFFF;
--newsletter-body-color: var(--navy-200);
--newsletter-input-height: 52px;
--newsletter-input-bg: rgba(255, 255, 255, 0.08);
--newsletter-input-border: 1px solid rgba(255, 255, 255, 0.15);
--newsletter-input-focus-border: var(--amber-400);
--newsletter-input-radius: var(--radius-sm);
--newsletter-btn-bg: var(--amber-500);
--newsletter-btn-hover-bg: var(--amber-600);
```

Content:
```
Headline: "Never Miss a Deal"
Body:     "Weekly curated picks, exclusive discounts, and expert pet care tips. Join 12,000+ UK pet owners."
CTA:      "Subscribe" (single email field)
```

---

## Performance Requirements

**Source:** stacks/nextjs.csv

- Hero image: Use `<Image priority />` for LCP optimisation (nextjs #21)
- Product carousel images: Use `loading="lazy"` (nextjs #17)
- Category icons: Inline SVG or `<Image>` with explicit width/height
- Trust logos: Lazy-loaded, below fold
- Newsletter section: Can be in a `<Suspense>` boundary
- Deal countdown timer: Use `dynamic()` import -- heavy component (nextjs #39)
- Target LCP < 2.5s, CLS < 0.1, FID < 100ms

---

## SEO / Metadata

**Source:** stacks/nextjs.csv #25-#27

```typescript
// app/page.tsx
export const metadata: Metadata = {
  title: 'PetGearHub | Expert Pet Product Reviews & Deals UK',
  description: 'Independently tested pet product reviews. Find the best gear for dogs, cats, birds, fish and small pets. UK-based expert reviews with honest ratings.',
  openGraph: {
    title: 'PetGearHub | Expert Pet Product Reviews & Deals UK',
    description: 'Independently tested pet product reviews for UK pet owners.',
    images: ['/og-homepage.png'],
    locale: 'en_GB',
    type: 'website',
  },
}
```
