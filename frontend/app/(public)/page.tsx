import Link from 'next/link';
import ProductCard from '@/components/public/ProductCard';
import ArticleCard from '@/components/ui/ArticleCard';
import CategoryIcon from '@/components/ui/CategoryIcon';
import HeroSearch from '@/components/public/HeroSearch';
import type { Product, Category, Article } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// ── Server-side fetchers (plain fetch — api client relies on localStorage) ──

async function fetchFeatured(limit: number): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products/featured?limit=${limit}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchDeals(limit: number): Promise<Product[]> {
  try {
    const res = await fetch(
      `${API_URL}/products?isDeal=true&limit=${limit}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    // getProducts returns { data, meta }
    return Array.isArray(json) ? json : (json?.data ?? []);
  } catch {
    return [];
  }
}

async function fetchBuyersGuides(limit: number): Promise<Article[]> {
  try {
    const res = await fetch(
      `${API_URL}/articles?type=buyers-guide&limit=${limit}`,
      { next: { revalidate: 600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : (json?.data ?? []);
  } catch {
    return [];
  }
}

// ── Pet quick-links ──────────────────────────────────────────────────────────

const PET_LINKS = [
  { label: 'Dogs', emoji: '🐕', slug: 'dogs' },
  { label: 'Cats', emoji: '🐈', slug: 'cats' },
  { label: 'Small Pets', emoji: '🐹', slug: 'small-pets' },
  { label: 'Birds', emoji: '🦜', slug: 'birds' },
  { label: 'Fish', emoji: '🐠', slug: 'fish' },
] as const;

const TRUST_BADGES = [
  { stat: 'Expert', label: 'trusted reviews' },
  { stat: 'UK', label: 'prices & availability' },
  { stat: '100%', label: 'independent advice' },
] as const;

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const [featured, categories, deals, guides] = await Promise.all([
    fetchFeatured(6),
    fetchCategories(),
    fetchDeals(4),
    fetchBuyersGuides(3),
  ]);

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PetGearHub',
    url: 'https://petgearhub.co.uk',
    description:
      'Independent, expert-reviewed pet product guides and comparisons for UK pet owners.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://petgearhub.co.uk/products?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 1 — HERO                                          */}
      {/* ────────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden max-h-[90vh]"
        style={{ background: 'linear-gradient(135deg, #FBF7F2 0%, #F5EFE6 50%, #EDE5D8 100%)' }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20"
               style={{ background: 'radial-gradient(circle, #F58220 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 -left-12 w-72 h-72 rounded-full opacity-10"
               style={{ background: 'radial-gradient(circle, #1C1C1E 0%, transparent 70%)' }} />
          {/* Dot-grid texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#1C1C1E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="editorial-container relative z-10 py-12 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent-text mb-5">
              <span aria-hidden="true">🐾</span>
              Trusted by UK pet owners
            </p>

            {/* Headline */}
            <h1 className="font-display text-hero text-primary leading-[1.05] mb-5">
              Find the Best Gear{' '}
              <span className="font-body italic font-medium" style={{ color: '#C05E00' }}>for Your Pet</span>
            </h1>

            {/* Subheadline */}
            <p className="font-body text-lg text-text-secondary leading-relaxed max-w-xl mx-auto mb-10">
              Expert-reviewed products and honest guides for UK pet owners —
              from independent writers who actually own pets.
            </p>

            {/* Search bar (client component) */}
            <div className="flex justify-center mb-10">
              <HeroSearch />
            </div>

            {/* Pet quick-links */}
            <nav aria-label="Browse by pet type" className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {PET_LINKS.map(({ label, emoji, slug }) => (
                <Link
                  key={slug}
                  href={`/products?petType=${slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-border-light
                             font-body text-sm font-medium text-primary shadow-sm
                             hover:border-accent hover:text-accent hover:shadow-md
                             transition-all duration-200"
                >
                  <span aria-hidden="true">{emoji}</span>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
              {TRUST_BADGES.map(({ stat, label }) => (
                <div key={stat} className="text-center">
                  <p className="font-display text-2xl font-bold text-primary">{stat}</p>
                  <p className="font-body text-xs text-text-secondary uppercase tracking-wider mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave divider */}
        <div aria-hidden="true" className="relative h-12 -mb-px">
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
               className="absolute inset-0 w-full h-full" fill="#FFFFFF">
            <path d="M0,48 L0,24 Q360,0 720,24 Q1080,48 1440,24 L1440,48 Z" />
          </svg>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 2 — CATEGORY QUICK LINKS                         */}
      {/* ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="categories-heading" className="py-12 lg:py-16 bg-surface">
        <div className="editorial-container">
          <div className="text-center mb-12">
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent-text mb-2">
              Explore
            </p>
            <h2
              id="categories-heading"
              className="font-display text-section-title text-primary"
            >
              Shop by Category
            </h2>
          </div>

          {(() => {
            const activeCategories = categories.filter(cat => cat._count && cat._count.products > 0);
            const emptyCategories = categories.filter(cat => !cat._count || cat._count.products === 0);

            if (activeCategories.length === 0 && categories.length === 0) {
              return (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-36 rounded-2xl bg-background border border-border-light animate-pulse" />
                  ))}
                </div>
              );
            }

            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {activeCategories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="group flex flex-col items-center gap-3 p-6 rounded-2xl
                               bg-background border border-transparent
                               hover:border-accent/30 hover:bg-accent/5 hover:-translate-y-1
                               transition-all duration-200"
                  >
                    <CategoryIcon slug={cat.slug} size="lg" />
                    <span className="font-body text-sm font-semibold text-primary group-hover:text-accent transition-colors text-center">
                      {cat.name}
                    </span>
                    <span className="font-body text-xs text-text-secondary">
                      {cat._count!.products} {cat._count!.products === 1 ? 'product' : 'products'}
                    </span>
                  </Link>
                ))}
                {activeCategories.length < 3 && emptyCategories.slice(0, 3 - activeCategories.length).map((cat) => (
                  <div
                    key={cat.id}
                    className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl
                               bg-background border border-dashed border-border text-center opacity-60"
                  >
                    <CategoryIcon slug={cat.slug} size="lg" />
                    <span className="font-body text-sm font-medium text-text-muted">{cat.name}</span>
                    <span className="font-body text-xs text-text-muted">Coming Soon</span>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>


      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 3 — EDITOR'S TOP PICKS                           */}
      {/* ────────────────────────────────────────────────────────── */}
      <section aria-labelledby="top-picks-heading" className="py-12 lg:py-16 bg-background">
        <div className="editorial-container">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent-text mb-2">
                Staff Picks
              </p>
              <h2
                id="top-picks-heading"
                className="font-display text-section-title text-primary"
              >
                Editor&rsquo;s Top Picks
              </h2>
            </div>
            <Link
              href="/products"
              className="font-body text-sm font-semibold text-accent-text hover:underline underline-offset-4 whitespace-nowrap self-start sm:self-auto"
            >
              View all products →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className={`grid gap-6 ${
              featured.length === 1
                ? 'grid-cols-1 max-w-2xl mx-auto'
                : featured.length === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} variant={featured.length === 1 ? 'featured' : 'default'} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border-light rounded-2xl">
              <p className="font-body text-text-secondary">
                Featured products will appear here once published from the admin panel.
              </p>
              <Link href="/admin" className="btn-primary mt-6 inline-block">
                Go to Admin →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 4 — WHY TRUST PETGEARHUB                        */}
      {/* ────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="trust-heading"
        className="py-12 lg:py-16"
        style={{ background: '#1C1C1E' }}
      >
        <div className="editorial-container">
          <div className="text-center mb-14">
            <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mb-2">
              Our Promise
            </p>
            <h2
              id="trust-heading"
              className="font-display text-section-title text-white"
            >
              Why Trust PetGearHub?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                   style={{ background: 'rgba(245,130,32,0.15)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F58220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white font-semibold mb-3">
                Independent Reviews
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                We never accept payment for reviews. Every recommendation is based
                on genuine testing and research — no sponsored rankings, ever.
              </p>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                   style={{ background: 'rgba(245,130,32,0.15)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F58220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h4M18 12h4M12 2v4M12 18v4" />
                  <path d="M7 7l2 2M15 15l2 2M15 7l-2 2M7 17l2-2" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white font-semibold mb-3">
                UK-Focused
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                All prices shown in GBP. We only recommend products readily
                available in the UK — no misleading US links or out-of-stock items.
              </p>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
                   style={{ background: 'rgba(245,130,32,0.15)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F58220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-white font-semibold mb-3">
                Expert Authors
              </h3>
              <p className="font-body text-sm text-white/60 leading-relaxed">
                Our guides are written by qualified vets, veterinary nurses, and
                experienced pet owners with years of hands-on knowledge.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <div className="mt-16 text-center">
            <p className="font-display text-xl lg:text-2xl text-white/80 italic max-w-2xl mx-auto leading-relaxed">
              &ldquo;We don&rsquo;t list everything — we list the right things.&rdquo;
            </p>
            <div className="w-10 h-px bg-accent mx-auto mt-6" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 5 — LATEST BUYER'S GUIDES                        */}
      {/* ────────────────────────────────────────────────────────── */}
      {guides.length > 0 && (
        <section aria-labelledby="guides-heading" className="py-12 lg:py-16 bg-background">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent-text mb-2">
                  Guides
                </p>
                <h2
                  id="guides-heading"
                  className="font-display text-section-title text-primary"
                >
                  Latest Buyer&rsquo;s Guides
                </h2>
              </div>
              <Link
                href="/blog?type=buyers-guide"
                className="font-body text-sm font-semibold text-accent-text hover:underline underline-offset-4 whitespace-nowrap self-start sm:self-auto"
              >
                View all guides →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((article) => (
                <ArticleCard key={article.id} article={article} variant="default" />
              ))}
            </div>
          </div>
        </section>
      )}


      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 6 — CURRENT DEALS                                */}
      {/* ────────────────────────────────────────────────────────── */}
      {deals.length > 0 && (
        <section aria-labelledby="deals-heading" className="py-12 lg:py-16 bg-background">
          <div className="editorial-container">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent-text mb-2">
                  Limited Time
                </p>
                <h2
                  id="deals-heading"
                  className="font-display text-section-title text-primary"
                >
                  Current Deals
                </h2>
              </div>
              <Link
                href="/products?isDeal=true"
                className="font-body text-sm font-semibold text-accent-text hover:underline underline-offset-4 whitespace-nowrap self-start sm:self-auto"
              >
                View all deals →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {deals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
