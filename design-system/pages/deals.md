# Deals Page Design Overrides

> Page-specific tokens and layout specifications for `/deals`.
> Inherits from [MASTER.md](../MASTER.md) -- only overrides and additions documented here.

---

## Layout Pattern

**Primary:** Conversion-Optimized
**Secondary:** Marketplace/Directory (search-first)
**Source:** landing.csv #21 (Conversion-Optimized), #22 (Marketplace/Directory)

### Decision Rules Applied
```
from landing.csv #21 (Conversion-Optimized):
  "Single primary CTA, minimal distractions, trust badges,
   urgency elements (limited time), social proof."

from landing.csv #22 (Marketplace/Directory):
  "Search bar is the CTA. Reduce friction to search.
   Popular searches suggestions."

from ui-reasoning.csv #3 (E-commerce):
  "if_conversion_focused" -> "add-urgency-colors"
```

---

## Section Order

1. **Page Header** -- "Today's Best Pet Deals" + Deal count badge
2. **Filter Bar** -- Category filters, sort options, search
3. **Featured Deal** -- Full-width hero deal card with countdown
4. **Active Deals Grid** -- Filterable card grid
5. **Expiring Soon** -- Urgency section for deals ending within 24h
6. **Newsletter CTA** -- "Get deals in your inbox before they expire"
7. **Past Deals Archive** -- Collapsed section showing recently expired

---

## Page Header

### Tokens

```css
--deals-header-bg: var(--navy-900);
--deals-header-padding: var(--space-12) 0;
--deals-header-title-font: display-lg (Playfair Display, clamp(2rem, 4vw, 2.5rem), 700);
--deals-header-title-color: #FFFFFF;
--deals-header-subtitle-font: body-lg (DM Sans, 18px, 400);
--deals-header-subtitle-color: var(--navy-200);

/* Deal Count Badge */
--deal-count-bg: var(--amber-500);
--deal-count-text: #FFFFFF;
--deal-count-font: caption (12px, 700);
--deal-count-padding: var(--space-1) var(--space-3);
--deal-count-radius: var(--radius-full);
--deal-count-position: inline (after title);
```

Content:
```
Title:     "Today's Best Pet Deals"  [42 Active badge]
Subtitle:  "Hand-picked discounts updated daily. All prices in GBP."
```

---

## Filter Bar

### Layout

```
Desktop:  Horizontal bar -- [Search] [Category Dropdown] [Sort] [View Toggle]
Tablet:   Same, but category dropdown becomes icon-only
Mobile:   Search bar full-width, filters in bottom sheet (filter button)
```

### Tokens

```css
/* Filter Bar Container */
--filter-bar-bg: #FFFFFF;
--filter-bar-border-bottom: 1px solid var(--warm-300);
--filter-bar-padding: var(--space-4) 0;
--filter-bar-sticky-top: 72px;     /* Below nav */
--filter-bar-z-index: var(--z-sticky);
--filter-bar-shadow: 0 2px 8px rgba(27, 43, 58, 0.04);

/* Search Input */
--filter-search-bg: var(--warm-100);
--filter-search-border: 1px solid var(--warm-300);
--filter-search-focus-border: var(--amber-500);
--filter-search-radius: var(--radius-sm);
--filter-search-padding: var(--space-3) var(--space-4);
--filter-search-height: 44px;          /* Touch target */
--filter-search-icon: magnifying glass, 18px, navy-500;
--filter-search-placeholder-color: var(--warm-500);
--filter-search-font: body (16px, 400);

/* Category Filter Buttons */
--filter-cat-bg: transparent;
--filter-cat-border: 1px solid var(--warm-300);
--filter-cat-radius: var(--radius-full);
--filter-cat-padding: var(--space-2) var(--space-4);
--filter-cat-font: body-sm (14px, 500);
--filter-cat-color: var(--navy-700);
--filter-cat-active-bg: var(--navy-900);
--filter-cat-active-text: #FFFFFF;
--filter-cat-active-border: var(--navy-900);
--filter-cat-hover-bg: var(--warm-100);
--filter-cat-gap: var(--space-2);
--filter-cat-min-height: 40px;         /* Touch target */

/* Sort Dropdown */
--filter-sort-font: body-sm (14px, 500);
--filter-sort-color: var(--navy-700);
--filter-sort-icon: chevron-down, 16px;

/* Sort Options */
/* "Biggest Savings", "Ending Soon", "Price: Low to High", "Price: High to Low", "Newest" */
```

---

## Featured Deal Card (Hero Deal)

### Layout

```
Desktop:
  Full-width card with gradient background
  [Product Image 40%] | [Deal Info 60%]
  Includes countdown timer, savings badge, CTA

Mobile:
  Stacked: Image top, info bottom
```

### Tokens

```css
/* Card */
--featured-deal-bg: linear-gradient(135deg, var(--navy-900) 0%, var(--navy-800) 100%);
--featured-deal-radius: var(--radius-xl);          /* 24px */
--featured-deal-padding: var(--space-8);
--featured-deal-shadow: var(--shadow-lg);
--featured-deal-margin-bottom: var(--space-8);

/* Urgency Badge */
--featured-deal-badge-bg: #DC2626;
--featured-deal-badge-text: #FFFFFF;
--featured-deal-badge-font: caption (12px, 700, uppercase);
--featured-deal-badge-padding: var(--space-1) var(--space-3);
--featured-deal-badge-radius: var(--radius-full);
--featured-deal-badge-content: "HOT DEAL" or "ENDING SOON";
--featured-deal-badge-animation: pulse 2s infinite;  /* Subtle attention pulse */

/* Product Image */
--featured-deal-image-bg: rgba(255, 255, 255, 0.08);
--featured-deal-image-radius: var(--radius-lg);
--featured-deal-image-padding: var(--space-4);
--featured-deal-image-aspect: 1/1;

/* Title & Info */
--featured-deal-title-font: h2 (Playfair Display, 30px, 700);
--featured-deal-title-color: #FFFFFF;
--featured-deal-category-font: overline (12px, 700, uppercase);
--featured-deal-category-color: var(--amber-400);
--featured-deal-description-font: body (16px, 400);
--featured-deal-description-color: var(--navy-200);

/* Pricing */
--featured-deal-price-font: display-xl (DM Sans, 48px, 700);
--featured-deal-price-color: #FFFFFF;
--featured-deal-original-font: h3 (DM Sans, 24px, 400);
--featured-deal-original-color: var(--navy-400);
--featured-deal-original-decoration: line-through;
--featured-deal-savings-bg: var(--green-500);
--featured-deal-savings-text: #FFFFFF;
--featured-deal-savings-font: body-sm (14px, 700);
--featured-deal-savings-padding: var(--space-1) var(--space-3);
--featured-deal-savings-radius: var(--radius-full);

/* Countdown Timer */
--featured-deal-countdown-digit-font: h2 (DM Sans, 30px, 700);
--featured-deal-countdown-digit-color: #FFFFFF;
--featured-deal-countdown-digit-bg: rgba(255, 255, 255, 0.1);
--featured-deal-countdown-digit-radius: var(--radius-sm);
--featured-deal-countdown-digit-padding: var(--space-3) var(--space-4);
--featured-deal-countdown-label-font: caption (12px, 500);
--featured-deal-countdown-label-color: var(--navy-300);
--featured-deal-countdown-separator: ":";
--featured-deal-countdown-separator-color: var(--amber-400);
--featured-deal-countdown-gap: var(--space-2);

/* Urgency state: < 1 hour remaining */
--featured-deal-urgent-countdown-color: #FCA5A5;
--featured-deal-urgent-countdown-bg: rgba(220, 38, 38, 0.2);

/* CTA */
--featured-deal-cta-bg: var(--amber-500);
--featured-deal-cta-hover-bg: var(--amber-600);
--featured-deal-cta-text: #FFFFFF;
--featured-deal-cta-font: body (16px, 700);
--featured-deal-cta-padding: var(--space-4) var(--space-8);
--featured-deal-cta-radius: var(--radius-sm);
--featured-deal-cta-shadow: 0 4px 14px rgba(212, 118, 60, 0.4);
--featured-deal-cta-min-height: 52px;
```

---

## Active Deals Grid

### Layout

```
Desktop (xl):   4 columns
Desktop (lg):   3 columns
Tablet (md):    2 columns
Mobile:         1 column (or 2 compact columns)
Gap:            var(--space-6) (24px)
```

### Deal Card Tokens

```css
/* Card Container */
--deal-card-bg: #FFFFFF;
--deal-card-border: 1px solid var(--warm-300);
--deal-card-radius: var(--radius-lg);              /* 16px */
--deal-card-shadow: var(--shadow-card);
--deal-card-hover-shadow: var(--shadow-hover);
--deal-card-hover-border: var(--amber-300);
--deal-card-hover-transform: translateY(-4px);
--deal-card-transition: 200ms ease-in-out;
--deal-card-overflow: hidden;

/* Deal Badge (top-left overlay on image) */
--deal-badge-position: absolute;
--deal-badge-top: var(--space-3);
--deal-badge-left: var(--space-3);
--deal-badge-bg: #DC2626;
--deal-badge-text: #FFFFFF;
--deal-badge-font: caption (12px, 700);
--deal-badge-padding: var(--space-1) var(--space-2);
--deal-badge-radius: var(--radius-sm);
--deal-badge-content: "-30%" or "SAVE £15";

/* Product Image */
--deal-card-image-aspect: 4/3;
--deal-card-image-bg: var(--warm-100);
--deal-card-image-padding: var(--space-4);         /* Breathing room around product */

/* Card Body */
--deal-card-body-padding: var(--space-4);

/* Category + Retailer */
--deal-card-category-font: overline (12px, 700, uppercase);
--deal-card-category-color: category colour;
--deal-card-retailer-font: caption (12px, 400);
--deal-card-retailer-color: var(--warm-600);
--deal-card-retailer-icon-size: 16px;

/* Title */
--deal-card-title-font: h4 (DM Sans, 18px, 600);  /* Slightly smaller than product page */
--deal-card-title-color: var(--navy-900);
--deal-card-title-lines: 2;                        /* line-clamp-2 */

/* Price Row */
--deal-card-price-font: price (DM Sans, 22px, 700);
--deal-card-price-color: var(--navy-900);
--deal-card-original-font: body-sm (14px, 400);
--deal-card-original-color: var(--warm-500);
--deal-card-original-decoration: line-through;
--deal-card-savings-font: body-sm (14px, 700);
--deal-card-savings-color: var(--green-500);

/* Rating */
--deal-card-star-size: 16px;
--deal-card-rating-font: body-sm (14px, 500);
--deal-card-rating-color: var(--navy-700);

/* Mini Countdown (if deal has expiry) */
--deal-card-countdown-font: caption (12px, 600);
--deal-card-countdown-color: #DC2626;
--deal-card-countdown-icon: clock, 14px;
--deal-card-countdown-bg: #FEF2F2;
--deal-card-countdown-padding: var(--space-1) var(--space-2);
--deal-card-countdown-radius: var(--radius-sm);

/* CTA */
--deal-card-cta-bg: var(--amber-500);
--deal-card-cta-hover-bg: var(--amber-600);
--deal-card-cta-text: #FFFFFF;
--deal-card-cta-font: body-sm (14px, 700);
--deal-card-cta-padding: var(--space-3) var(--space-4);
--deal-card-cta-radius: var(--radius-sm);
--deal-card-cta-width: 100%;
--deal-card-cta-min-height: 44px;                  /* Touch target */
```

### Deal Card Content Stack

```
[Image with Deal Badge overlay]
[Category · Retailer]
[Product Title (2 lines max)]
[★★★★½ 4.5 (89)]
[£29.99  £44.99  Save 33%]
[⏰ Ends in 6h 23m]            -- only if time-limited
[View Deal →]                   -- full-width CTA
```

---

## Expiring Soon Section

### Urgency Treatment

```css
--expiring-section-bg: #FEF2F2;                   /* Light red bg */
--expiring-section-border: 1px solid #FECACA;
--expiring-section-radius: var(--radius-xl);
--expiring-section-padding: var(--space-8);
--expiring-section-title-font: h2 (Playfair Display, 30px, 700);
--expiring-section-title-color: #DC2626;
--expiring-section-title-icon: flame or clock, 28px;
--expiring-section-subtitle-font: body (16px, 400);
--expiring-section-subtitle-color: var(--navy-700);
```

Content:
```
Title:    "⏰ Ending Soon"
Subtitle: "These deals expire within 24 hours"
```

Deals in this section use the same deal card tokens but with an additional urgency indicator:

```css
--expiring-card-border: 1px solid #FECACA;
--expiring-card-countdown-color: #DC2626;
--expiring-card-countdown-weight: 700;
--expiring-card-pulse: subtle border pulse animation (2s);
```

---

## Past Deals Archive

### Collapsed State

```css
--archive-toggle-font: body (16px, 500);
--archive-toggle-color: var(--navy-600);
--archive-toggle-icon: chevron-down, 18px;
--archive-toggle-padding: var(--space-4) 0;
--archive-toggle-border-top: 1px solid var(--warm-300);
```

### Expired Deal Card Overrides

```css
--expired-card-opacity: 0.7;
--expired-card-image-filter: grayscale(50%);
--expired-card-badge-bg: var(--warm-500);
--expired-card-badge-text: #FFFFFF;
--expired-card-badge-content: "EXPIRED";
--expired-card-cta-bg: var(--warm-400);
--expired-card-cta-text: #FFFFFF;
--expired-card-cta-content: "View Review" (links to product page, not affiliate);
--expired-card-cta-cursor: pointer;
```

---

## Empty / No Results State

**Source:** ux-guidelines.csv #79 (Empty States), #90 (No Results)

```css
--empty-state-padding: var(--space-16);
--empty-state-text-align: center;
--empty-state-icon-size: 64px;
--empty-state-icon-color: var(--warm-400);
--empty-state-title-font: h3 (Playfair Display, 24px, 600);
--empty-state-title-color: var(--navy-700);
--empty-state-body-font: body (16px, 400);
--empty-state-body-color: var(--warm-600);
--empty-state-cta-font: body (16px, 500);
--empty-state-cta-color: var(--amber-600);
```

Content options:
```
No deals in category:
  "No [Category] deals right now"
  "We update deals daily -- check back soon or browse all deals."
  CTA: "Browse All Deals"

No search results:
  "No deals matching '[query]'"
  "Try searching for something else or browse by category."
  CTA: "Clear Search" + "Browse Categories"
```

---

## Newsletter CTA (Deals Context)

Inherits from homepage newsletter tokens with deal-specific copy:

```
Headline:  "Deals Straight to Your Inbox"
Body:      "Be the first to know when prices drop. Weekly deal alerts for UK pet owners."
CTA:       "Get Deal Alerts"
```

---

## Performance Considerations

- Filter bar: Client Component (needs state for search, category, sort)
- Deal grid: Server Component for initial render, client-side filtering via search params
- DealCountdown: Client Component, use `dynamic()` import (nextjs #39)
- Deal cards: Use `<Image>` with explicit dimensions for all product images (nextjs #18)
- Featured deal image: `<Image priority />` (above fold)
- Grid images: `loading="lazy"`
- Deal data: ISR with `revalidate = 300` (5 minutes) for price freshness
- Sort/filter: Update URL search params, not client state, for shareability (ux-guidelines #5)
- Pagination: Infinite scroll with Intersection Observer, or "Load More" button

---

## Accessibility Specifics

- Filter category buttons: `role="radiogroup"` with individual `role="radio"` and `aria-checked`
- Sort dropdown: Native `<select>` or custom with `role="listbox"` + `aria-activedescendant`
- Deal badges: `aria-label="30 percent discount"` (not just visual "-30%")
- Countdown timer: `aria-live="polite"` with updates every 60 seconds (not every second)
- Expired deals: `aria-label="This deal has expired"` on expired badge
- Deal CTA: `aria-label="View deal for [Product Name] on [Retailer] (opens in new tab)"`
- Search input: `<label>` with `for` attribute, not placeholder-only (ux-guidelines #54)
- Loading state: Skeleton cards with `aria-busy="true"` on grid container
- Filter state changes: Announce result count with `aria-live="polite"`: "Showing 12 dog deals"
