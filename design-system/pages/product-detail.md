# Product Detail Page Design Overrides

> Page-specific tokens and layout specifications for `/products/[slug]` pages.
> Inherits from [MASTER.md](../MASTER.md) -- only overrides and additions documented here.

---

## Layout Pattern

**Primary:** Product Review/Ratings Focused
**Secondary:** Comparison Table Focus
**Source:** landing.csv #19 (Product Review/Ratings Focused), #13 (Comparison Table Focus)

### Decision Rules Applied
```
from landing.csv #19:
  "User-generated content builds trust. Show verified purchases.
   Filter by rating. Respond to negative reviews."

from landing.csv #13:
  "Show value vs competitors. 35% higher conversion. Be factual."

from ui-reasoning.csv #3 (E-commerce):
  "if_conversion_focused" -> "add-urgency-colors"
  Anti-pattern: "Flat design without depth + Text-heavy pages"
```

---

## Section Order

1. **Breadcrumbs** -- Home > Category > Product Name
2. **Product Hero** -- Image gallery (left) + Product info panel (right)
3. **Table of Contents** -- Sticky sidebar on desktop, collapsible on mobile
4. **Expert Verdict / Quick Summary** -- Callout box with rating + one-liner
5. **Pros & Cons** -- Side-by-side ProsConsBox
6. **Detailed Review** -- Long-form editorial content (article typography)
7. **Specs Table** -- Full specifications in structured table
8. **Comparison Table** -- vs. similar products (optional)
9. **FAQ Accordion** -- Product-specific questions
10. **Related Products** -- Horizontal card carousel
11. **Newsletter CTA** -- Contextual ("Get more [category] reviews")
12. **Author Bio** -- Reviewer credentials and photo

---

## Product Hero Section

### Layout

```
Desktop (lg+):
  [Image Gallery 55%] | [Product Info Panel 45%]

Tablet (md):
  [Image Gallery 100%]
  [Product Info Panel 100%]

Mobile:
  [Image Gallery 100% - horizontal scroll]
  [Product Info Panel 100%]
```

### Image Gallery Tokens

```css
--gallery-main-aspect: 4/3;
--gallery-main-radius: var(--radius-lg);       /* 16px */
--gallery-main-bg: #FFFFFF;
--gallery-thumbnail-size: 72px;
--gallery-thumbnail-radius: var(--radius-sm);  /* 8px */
--gallery-thumbnail-border: 2px solid var(--warm-300);
--gallery-thumbnail-active-border: 2px solid var(--amber-500);
--gallery-thumbnail-gap: var(--space-2);       /* 8px */
--gallery-zoom-icon-size: 32px;
--gallery-zoom-icon-bg: rgba(27, 43, 58, 0.6);
--gallery-transition: 300ms ease-in-out;
```

### Image Gallery Behaviour

- Desktop: Main image with thumbnail strip below (4-6 thumbnails)
- Mobile: Horizontal swipe gallery with dot indicators
- Click/tap to open full-screen lightbox
- All images must have descriptive alt text: "[Product Name] - [angle/view]"
- Main image uses `<Image priority />` for LCP (nextjs.csv #21)
- Thumbnail images: `loading="lazy"`

### Product Info Panel Tokens

```css
/* Panel Container */
--info-panel-padding: 0 0 0 var(--space-8);    /* Desktop: left padding only */
--info-panel-padding-mobile: var(--space-6) 0;

/* Category Badge */
--category-badge-bg: category colour at 10% opacity;
--category-badge-text: category colour;
--category-badge-font: overline (12px, 700, uppercase);
--category-badge-padding: var(--space-1) var(--space-3);
--category-badge-radius: var(--radius-full);

/* Product Title */
--product-title-font: h1 (Playfair Display, 36px, 700);
--product-title-color: var(--navy-900);
--product-title-margin-bottom: var(--space-3);

/* Rating Row */
--rating-star-size: 24px;
--rating-star-filled: #FBBF24;
--rating-star-empty: var(--warm-300);
--rating-score-font: h4 (DM Sans, 20px, 700);
--rating-score-color: var(--navy-900);
--rating-count-font: body-sm (DM Sans, 14px, 400);
--rating-count-color: var(--warm-600);

/* Price Block */
--price-current-font: price-lg (DM Sans, 28px, 700);
--price-current-color: var(--navy-900);
--price-original-font: body (DM Sans, 16px, 400);
--price-original-color: var(--warm-500);
--price-original-decoration: line-through;
--price-savings-bg: var(--green-500);
--price-savings-text: #FFFFFF;
--price-savings-font: caption (12px, 700);
--price-savings-padding: var(--space-1) var(--space-2);
--price-savings-radius: var(--radius-full);
--price-currency: "£";

/* Affiliate CTA (Primary) */
--cta-bg: var(--amber-500);
--cta-hover-bg: var(--amber-600);
--cta-text: #FFFFFF;
--cta-font: body (16px, 700);
--cta-padding: var(--space-4) var(--space-8);
--cta-radius: var(--radius-sm);
--cta-shadow: 0 4px 14px rgba(212, 118, 60, 0.3);
--cta-hover-shadow: 0 8px 24px rgba(212, 118, 60, 0.35);
--cta-hover-transform: translateY(-1px);
--cta-active-transform: translateY(0) scale(0.98);
--cta-width: 100%;
--cta-min-height: 52px;
--cta-transition: 200ms ease-in-out;
--cta-icon: external link arrow (16px, right side);

/* Retailer Info */
--retailer-font: body-sm (14px, 400);
--retailer-color: var(--warm-600);
--retailer-icon-size: 20px;

/* Meta Info (Last updated, etc.) */
--meta-font: caption (12px, 500);
--meta-color: var(--warm-600);
--meta-icon-size: 14px;
```

### Product Info Panel Content Stack

```
[Category Badge]         "Dog Gear"
[Product Title]          "Ruffwear Front Range Harness"
[Star Rating + Count]    ★★★★½ 4.7  (128 reviews)
[Price Block]            £42.99  £54.99  -22%
[Affiliate CTA]          "View on Amazon →"
[Retailer Note]          "Prices checked daily. Last updated 2 hours ago."
[Quick Features]         • Padded chest panel  • 2 lead attachment points  • Machine washable
[Share Buttons]          [Facebook] [Twitter] [Pinterest] [Copy Link]
```

---

## Expert Verdict Section

### CalloutBox Override (Info Variant)

```css
--verdict-bg: var(--warm-50);
--verdict-border: 1px solid var(--warm-300);
--verdict-border-left: 4px solid var(--amber-500);
--verdict-radius: var(--radius-md);
--verdict-padding: var(--space-6);
--verdict-badge-bg: var(--amber-500);
--verdict-badge-text: #FFFFFF;
--verdict-badge-font: caption (12px, 700, uppercase);
--verdict-rating-font: display-lg (Playfair, 40px, 700);
--verdict-rating-color: var(--navy-900);
--verdict-rating-suffix: "/10";
--verdict-summary-font: body-lg (18px, 400);
--verdict-summary-color: var(--navy-700);
```

Content structure:
```
[EDITOR'S VERDICT badge]
[8.5/10]
"The Ruffwear Front Range Harness is our top pick for everyday walks.
 Excellent padding, easy to fit, and built to last."
```

---

## Pros & Cons Section

### Layout

```
Desktop (md+):  [Pros 50%] | [Cons 50%]  -- side by side
Mobile:         [Pros 100%] then [Cons 100%]  -- stacked
```

### Tokens (inherits from MASTER.md ProsConsBox)

```css
/* Additional overrides for product detail context */
--proscons-title-font: h4 (DM Sans, 20px, 600);
--proscons-item-font: body (DM Sans, 16px, 400);
--proscons-item-icon-size: 18px;
--proscons-item-gap: var(--space-3);
--proscons-padding: var(--space-6);
--proscons-radius: var(--radius-lg);
```

---

## Detailed Review Section

### Article Typography (inherits from MASTER.md)

```css
--review-max-width: 720px;                        /* max-w-prose */
--review-body-font: body-lg (DM Sans, 18px, 400);
--review-body-line-height: 1.7;
--review-body-color: var(--navy-800);
--review-heading-font: Playfair Display;
--review-h2-size: 30px;
--review-h3-size: 24px;
--review-paragraph-spacing: var(--space-6);
--review-image-radius: var(--radius-md);
--review-image-caption-font: body-sm (14px, 400, italic);
--review-image-caption-color: var(--warm-600);
--review-blockquote-border: 4px solid var(--amber-400);
--review-blockquote-bg: var(--warm-50);
--review-blockquote-padding: var(--space-5);
--review-link-color: var(--amber-600);
--review-link-hover-color: var(--amber-700);
--review-link-decoration: underline;
```

### In-Content Affiliate CTAs

When the review mentions a product purchase opportunity mid-article:

```css
--inline-cta-bg: var(--warm-50);
--inline-cta-border: 1px solid var(--warm-300);
--inline-cta-radius: var(--radius-md);
--inline-cta-padding: var(--space-5);
--inline-cta-btn-bg: var(--amber-500);
--inline-cta-btn-text: #FFFFFF;
```

---

## Specs Table Section

### SpecsTable Override Tokens

```css
--specs-table-bg: #FFFFFF;
--specs-table-radius: var(--radius-lg);
--specs-table-border: 1px solid var(--warm-300);
--specs-row-padding: var(--space-4);
--specs-row-border: 1px solid var(--warm-200);
--specs-row-alt-bg: var(--warm-50);
--specs-label-font: body-sm (14px, 600);
--specs-label-color: var(--navy-700);
--specs-label-width: 40%;
--specs-value-font: body (16px, 400);
--specs-value-color: var(--navy-900);
```

### Mobile Behaviour

On mobile (<768px), specs table remains a two-column layout (label | value) but uses `overflow-x-auto` wrapper if content is wide (ux-guidelines.csv #71).

---

## Comparison Table Section

**Source:** landing.csv #13 (Comparison Table Focus)

```css
--comparison-bg: #FFFFFF;
--comparison-radius: var(--radius-lg);
--comparison-border: 1px solid var(--warm-300);
--comparison-highlight-bg: rgba(212, 118, 60, 0.05);  /* Current product column */
--comparison-highlight-border-top: 3px solid var(--amber-500);
--comparison-header-bg: var(--navy-900);
--comparison-header-text: #FFFFFF;
--comparison-header-font: h5 (DM Sans, 18px, 700);
--comparison-cell-padding: var(--space-4);
--comparison-cell-border: 1px solid var(--warm-200);
--comparison-check-color: var(--green-500);
--comparison-cross-color: var(--red-500);
--comparison-best-badge-bg: var(--amber-500);
--comparison-best-badge-text: #FFFFFF;
```

### Comparison Table Rules

- Highlight the current product column with accent background
- Use checkmarks (green) and crosses (red) plus text labels -- never colour alone (ux-guidelines #37)
- Maximum 4 products compared side by side
- Mobile: horizontal scroll with sticky first column (product names)
- Include price row with affiliate links per product

---

## Table of Contents (Sticky Sidebar)

### Layout

```
Desktop (lg+):
  [Article Content 65%] | [TOC Sidebar 35%]
  TOC is position: sticky, top: 88px (nav height + 16px)

Tablet/Mobile:
  TOC is collapsible accordion at top of review section
```

### Tokens

```css
--toc-bg: var(--warm-50);
--toc-radius: var(--radius-md);
--toc-padding: var(--space-5);
--toc-border: 1px solid var(--warm-300);
--toc-title-font: h5 (DM Sans, 18px, 700);
--toc-item-font: body-sm (14px, 400);
--toc-item-color: var(--navy-600);
--toc-item-active-color: var(--amber-600);
--toc-item-active-border-left: 2px solid var(--amber-500);
--toc-item-padding: var(--space-2) var(--space-3);
--toc-item-gap: var(--space-1);
--toc-sticky-top: 88px;
```

---

## FAQ Accordion Section

Inherits FAQAccordion tokens from MASTER.md.

### Product-Specific Content Structure

```
Q: "Is the [Product] worth the price?"
Q: "What size should I get for my [pet type]?"
Q: "How does this compare to [competitor]?"
Q: "Where can I buy the [Product] in the UK?"
Q: "Does this come with a warranty?"
```

### Schema Markup

Each FAQ page should include `FAQPage` structured data (JSON-LD) for Google rich results.

---

## Related Products Carousel

Same tokens as homepage Top Picks carousel, with contextual heading:

```
Heading:  "Similar Products You Might Like"
Subhead:  "More [category] reviews"
```

---

## Author Bio Section

### AuthorBio Tokens

```css
--author-bg: var(--warm-50);
--author-radius: var(--radius-lg);
--author-padding: var(--space-6);
--author-border: 1px solid var(--warm-300);
--author-avatar-size: 64px;
--author-avatar-radius: var(--radius-full);
--author-name-font: h4 (DM Sans, 20px, 700);
--author-name-color: var(--navy-900);
--author-role-font: body-sm (14px, 500);
--author-role-color: var(--amber-600);
--author-bio-font: body-sm (14px, 400);
--author-bio-color: var(--navy-700);
--author-social-icon-size: 20px;
--author-social-gap: var(--space-3);
```

---

## Structured Data Requirements

```typescript
// Product Review schema (JSON-LD)
{
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "Product",
    "name": "Product Name",
    "image": "product-image-url",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "GBP",
      "price": "42.99",
      "availability": "https://schema.org/InStock",
      "url": "affiliate-link"
    }
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "8.5",
    "bestRating": "10"
  },
  "author": { "@type": "Person", "name": "Reviewer Name" },
  "publisher": { "@type": "Organization", "name": "PetGearHub" }
}
```

---

## Accessibility Specifics

- Product images: `alt="[Product Name] - [view description]"`
- Star rating: `aria-label="Rated 4.7 out of 5 stars based on 128 reviews"`
- Price: `aria-label="Current price: 42 pounds 99. Was 54 pounds 99. You save 22 percent."`
- Affiliate CTA: `aria-label="Buy [Product Name] on Amazon (opens in new tab)"` with `target="_blank" rel="noopener noreferrer"`
- Comparison table: Use `<th scope="col">` for column headers, `<th scope="row">` for product names
- FAQ accordion: Use `aria-expanded`, `aria-controls`, and `role="button"` on triggers
- Image gallery: Support arrow key navigation with `role="tablist"` / `role="tab"` pattern

---

## Performance

- Main product image: `<Image priority />` for LCP
- Gallery thumbnails: `loading="lazy"`
- Comparison table: Render server-side (Server Component)
- FAQ accordion: Client Component with `'use client'` (minimal -- only for toggle state)
- Related products carousel: Use `dynamic()` import, render below fold
- SpecsTable: Server Component, no client JS needed
- Use `generateStaticParams` for pre-rendering known product slugs (nextjs.csv #11)
- Use `generateMetadata` for dynamic page titles and OG images (nextjs.csv #25)
