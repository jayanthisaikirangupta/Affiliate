# Blog Article Page Design Overrides

> Page-specific tokens and layout specifications for `/blog/[slug]` pages.
> Inherits from [MASTER.md](../MASTER.md) -- only overrides and additions documented here.

---

## Layout Pattern

**Primary:** Storytelling-Driven
**Secondary:** Newsletter/Content First
**Source:** landing.csv #27 (Storytelling-Driven), #23 (Newsletter/Content First), ui-reasoning.csv #67 (Magazine/Blog)

### Decision Rules Applied
```
from ui-reasoning.csv #67 (Magazine/Blog):
  "must_have": "article-showcase"
  "must_have": "newsletter-signup"
  Anti-pattern: "Poor typography + Slow loading"

from landing.csv #27 (Storytelling-Driven):
  "Narrative increases time-on-page 3x. Use progress indicator.
   Mobile: simplify animations."

from landing.csv #23 (Newsletter/Content First):
  "Single field form (Email only). Show 'Join X,000 readers'. Read sample link."
```

---

## Section Order

1. **Breadcrumbs** -- Home > Blog > Category > Article Title
2. **Article Header** -- Category badge, title, subtitle, author row, featured image
3. **Table of Contents** -- Collapsible, sticky on desktop sidebar
4. **Article Body** -- Long-form editorial content with rich media
5. **Author Bio** -- Reviewer/writer credentials
6. **Related Articles** -- 3-card grid
7. **Newsletter CTA** -- Contextual to article category
8. **Comments / Discussion** (optional)

---

## Article Header Section

### Layout

```
Full-width container, centred content (max-w-4xl = 896px)

[Category Badge]
[Article Title]                    -- h1, Playfair Display
[Subtitle / Excerpt]              -- body-lg, navy-700
[Author Row: Avatar + Name + Date + Read Time]
[Featured Image]                   -- full-width with rounded corners
```

### Tokens

```css
/* Container */
--article-header-max-width: 896px;
--article-header-padding: var(--space-16) 0 var(--space-8);
--article-header-text-align: center;      /* Desktop: centre-aligned header */

/* Category Badge */
--article-cat-badge-bg: category colour at 10% opacity;
--article-cat-badge-text: category colour;
--article-cat-badge-font: overline (12px, 700, uppercase, letter-spacing: 0.05em);
--article-cat-badge-padding: var(--space-1) var(--space-3);
--article-cat-badge-radius: var(--radius-full);
--article-cat-badge-margin-bottom: var(--space-4);

/* Title */
--article-title-font: display-lg (Playfair Display, clamp(2rem, 4vw, 2.5rem), 700);
--article-title-color: var(--navy-900);
--article-title-line-height: 1.2;
--article-title-margin-bottom: var(--space-4);
--article-title-max-width: 800px;

/* Subtitle */
--article-subtitle-font: body-lg (DM Sans, 18px, 400);
--article-subtitle-color: var(--navy-600);
--article-subtitle-line-height: 1.6;
--article-subtitle-margin-bottom: var(--space-6);
--article-subtitle-max-width: 640px;

/* Author Row */
--author-row-gap: var(--space-3);
--author-row-align: center;      /* Centred on desktop */
--author-avatar-size: 44px;
--author-avatar-radius: var(--radius-full);
--author-name-font: body-sm (14px, 600);
--author-name-color: var(--navy-900);
--author-meta-font: body-sm (14px, 400);
--author-meta-color: var(--warm-600);
--author-meta-separator: "  ·  ";    /* e.g., "Mar 15, 2026 · 8 min read" */

/* Featured Image */
--featured-image-aspect: 16/9;
--featured-image-radius: var(--radius-lg);         /* 16px */
--featured-image-margin-top: var(--space-8);
--featured-image-shadow: var(--shadow-md);
```

### Featured Image Rules

- Use `<Image priority />` for LCP optimisation (nextjs.csv #21)
- Provide `width={1280} height={720}` for 16:9 aspect (nextjs.csv #18)
- Alt text: Descriptive of article topic, not just "featured image"
- Mobile: Full-bleed (extends past container padding) with 0 border-radius

---

## Article Body Section

### Layout

```
Desktop (lg+):
  [TOC Sidebar 25%] | [Article Content 75%]
  Sidebar: position sticky, top: 88px
  Content: max-width 720px (max-w-prose equivalent)

Tablet/Mobile:
  [TOC: collapsible at top]
  [Article Content 100%]
  Content: max-width 100%, padding 16-24px
```

### Reading Progress Indicator

**Source:** landing.csv #27 -- "Use progress indicator"

```css
--progress-bar-height: 3px;
--progress-bar-bg: var(--warm-300);
--progress-bar-fill: var(--amber-500);
--progress-bar-position: fixed;
--progress-bar-top: 72px;                /* Below sticky nav */
--progress-bar-z-index: var(--z-sticky);
```

Implementation: Track scroll position relative to article body element, update `scaleX` transform.

### Body Typography Tokens

```css
/* Core Text */
--body-font: DM Sans;
--body-size: 18px;
--body-line-height: 1.75;          /* More generous than standard for long-form */
--body-color: var(--navy-800);
--body-max-width: 720px;

/* Headings in Article (Playfair Display) */
--body-h2-size: 30px;
--body-h2-weight: 600;
--body-h2-margin-top: var(--space-12);     /* 48px before h2 */
--body-h2-margin-bottom: var(--space-4);   /* 16px after h2 */
--body-h2-color: var(--navy-900);

--body-h3-size: 24px;
--body-h3-weight: 600;
--body-h3-margin-top: var(--space-8);      /* 32px before h3 */
--body-h3-margin-bottom: var(--space-3);   /* 12px after h3 */
--body-h3-color: var(--navy-900);

--body-h4-size: 20px;
--body-h4-weight: 600;
--body-h4-font: DM Sans;                   /* h4 switches to sans */
--body-h4-margin-top: var(--space-6);
--body-h4-margin-bottom: var(--space-3);

/* Paragraphs */
--body-p-margin-bottom: var(--space-5);    /* 20px between paragraphs */

/* Lists */
--body-list-padding-left: var(--space-6);
--body-list-item-margin: var(--space-2);
--body-list-marker-color: var(--amber-500);

/* Links */
--body-link-color: var(--amber-600);
--body-link-hover-color: var(--amber-700);
--body-link-decoration: underline;
--body-link-decoration-color: rgba(212, 118, 60, 0.3);
--body-link-hover-decoration-color: var(--amber-600);

/* Blockquotes */
--body-blockquote-border-left: 4px solid var(--amber-400);
--body-blockquote-bg: var(--warm-50);
--body-blockquote-padding: var(--space-5) var(--space-6);
--body-blockquote-radius: 0 var(--radius-md) var(--radius-md) 0;
--body-blockquote-font: body-lg (18px, 400, italic);
--body-blockquote-color: var(--navy-700);

/* Inline Code */
--body-code-bg: var(--warm-200);
--body-code-padding: 2px 6px;
--body-code-radius: 4px;
--body-code-font: monospace;
--body-code-size: 0.9em;

/* Horizontal Rule */
--body-hr-border: 1px solid var(--warm-300);
--body-hr-margin: var(--space-10) 0;
```

### Rich Media in Articles

#### In-Article Images

```css
--article-image-radius: var(--radius-md);         /* 12px */
--article-image-margin: var(--space-8) 0;
--article-image-shadow: var(--shadow-sm);
--article-image-caption-font: body-sm (14px, 400, italic);
--article-image-caption-color: var(--warm-600);
--article-image-caption-margin-top: var(--space-2);
--article-image-caption-align: center;
```

#### Embedded Product Cards (In-Article)

When an article mentions a specific product, embed a compact product card:

```css
--embed-product-bg: var(--warm-50);
--embed-product-border: 1px solid var(--warm-300);
--embed-product-radius: var(--radius-md);
--embed-product-padding: var(--space-5);
--embed-product-margin: var(--space-8) 0;
--embed-product-image-size: 120px;
--embed-product-image-radius: var(--radius-sm);
--embed-product-title-font: h4 (DM Sans, 20px, 600);
--embed-product-price-font: price-sm (16px, 700);
--embed-product-cta-bg: var(--amber-500);
--embed-product-cta-font: body-sm (14px, 700);
--embed-product-cta-padding: var(--space-2) var(--space-4);
```

Layout: Horizontal on desktop (image left, info right, CTA right-aligned). Stacked on mobile.

#### CalloutBox Variants (in Articles)

Inherits from MASTER.md CalloutBox tokens. Commonly used variants:

| Variant | Use Case | Border Colour |
|---|---|---|
| `info` | General tips, context | `#0369A1` (blue) |
| `tip` | Expert recommendations | `#059669` (green) |
| `warning` | Safety cautions for pets | `#D97706` (amber) |
| `important` | Critical product warnings | `#DC2626` (red) |

---

## Table of Contents (Sidebar)

Same tokens as product-detail.md TOC with these blog-specific additions:

```css
--toc-reading-time-font: caption (12px, 500);
--toc-reading-time-color: var(--warm-600);
--toc-reading-time-icon: clock icon, 14px;

/* Active section tracking */
--toc-active-indicator: 2px solid var(--amber-500);
--toc-active-text-color: var(--amber-600);
--toc-active-font-weight: 600;
--toc-scroll-behavior: smooth;
```

Implementation: Use Intersection Observer to track which h2/h3 is in viewport and highlight corresponding TOC item.

---

## Related Articles Section

### Layout

```
Desktop:  3-column grid
Tablet:   2-column grid
Mobile:   Horizontal scroll carousel (snap)
```

### ArticleCard Override Tokens

Inherits from MASTER.md ArticleCard. Blog-specific heading:

```css
--related-section-title: "You Might Also Like";
--related-section-title-font: h2 (Playfair Display, 30px, 600);
--related-section-padding: var(--space-16) 0;
--related-grid-gap: var(--space-6);
```

---

## Newsletter CTA (Contextual)

### Context Rules

| Article Category | Headline | Subtext |
|---|---|---|
| Dog | "More Expert Dog Gear Reviews" | "Weekly picks for your pup, straight to your inbox." |
| Cat | "The Best Cat Products, Delivered" | "Curated recommendations from our feline experts." |
| Pet Health | "Stay Updated on Pet Health" | "Expert advice and product safety alerts." |
| General | "Never Miss a Review" | "Weekly curated picks and exclusive deals for UK pet owners." |

Same visual tokens as homepage NewsletterCTA (see homepage.md).

---

## Share Buttons (Floating)

### Behaviour

- Desktop (lg+): Floating sticky on the left side of the article, vertical stack
- Tablet/Mobile: Horizontal bar at the bottom of the article header, before body

### Tokens

```css
/* Desktop Floating */
--share-float-position: fixed;
--share-float-left: calc((100vw - 720px) / 2 - 80px);  /* Left of article */
--share-float-top: 200px;
--share-float-gap: var(--space-2);

/* Shared Button Tokens */
--share-btn-size: 40px;
--share-btn-radius: var(--radius-full);
--share-btn-bg: var(--warm-200);
--share-btn-hover-bg: platform-specific colour;
--share-btn-icon-size: 18px;
--share-btn-icon-color: var(--navy-700);
--share-btn-hover-icon-color: #FFFFFF;
--share-btn-transition: 200ms ease;

/* Platform Colours (hover bg) */
--share-facebook: #1877F2;
--share-twitter: #1DA1F2;
--share-pinterest: #E60023;
--share-whatsapp: #25D366;
--share-email: var(--navy-700);
--share-copy: var(--navy-500);
```

---

## Performance Considerations

**Source:** stacks/nextjs.csv, ui-reasoning.csv #67

- Blog article pages should use ISR with `revalidate = 3600` (1 hour) for content freshness
- Featured image: `<Image priority />` for LCP
- In-article images: `loading="lazy"` (below fold)
- TOC: Client Component (needs Intersection Observer), keep as leaf component (nextjs #9)
- Share buttons: Client Component (needs navigator.clipboard, window.open)
- Reading progress bar: Client Component (needs scroll event)
- Related articles: Server Component (static data fetch)
- Embedded product cards: Server Component (data fetched server-side)
- Article body: Render as Server Component, MDX or Markdown
- Target page weight < 500KB (excluding images)
- Use `generateStaticParams` to pre-render known blog slugs (nextjs #11)

---

## SEO / Structured Data

```typescript
// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug)
  return {
    title: `${article.title} | PetGearHub Blog`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      locale: 'en_GB',
    },
  }
}
```

### JSON-LD Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "image": "featured-image-url",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "PetGearHub",
    "logo": { "@type": "ImageObject", "url": "logo-url" }
  },
  "datePublished": "2026-03-15",
  "dateModified": "2026-03-20"
}
```

---

## Accessibility Specifics

- Article uses `<article>` semantic element
- Heading hierarchy: exactly one `<h1>` (article title), then sequential h2 > h3 > h4
- All in-article images have descriptive alt text
- Embedded product cards: CTA has `aria-label="View [Product] on Amazon (opens in new tab)"`
- TOC links use `aria-current="true"` for the active section
- Reading progress bar: `role="progressbar"` with `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`
- Share buttons: Each has `aria-label="Share on [Platform]"`
- Blockquotes use `<blockquote>` semantic element with optional `<cite>`
- Skip link targets `<main>` element wrapping article content
