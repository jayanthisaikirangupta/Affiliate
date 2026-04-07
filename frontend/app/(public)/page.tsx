import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/public/ProductCard';
import ArticleCard from '@/components/ui/ArticleCard';
import CategoryIcon from '@/components/ui/CategoryIcon';
import HeroSearch from '@/components/public/HeroSearch';
import FloatingPets from '@/components/ui/FloatingPets';
import WordReveal from '@/components/ui/WordReveal';
import ScrollDotNav from '@/components/ui/ScrollDotNav';
import PetParadeCarousel from '@/components/ui/PetParadeCarousel';
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

// ── Scroll dot-nav sections ──────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: 'hero',       label: 'Home' },
  { id: 'categories', label: 'Categories' },
  { id: 'top-picks',  label: 'Top Picks' },
  { id: 'why-trust',  label: 'Why Trust' },
  { id: 'cta',        label: 'Get Started' },
] as const;

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

      {/* Fixed scroll dot navigation — desktop only */}
      <ScrollDotNav sections={[...NAV_SECTIONS]} />

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 1 — HERO (HIGH-RES PET PHOTO)                     */}
      {/* ────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        aria-label="Hero"
        className="relative overflow-hidden min-h-screen flex items-center justify-center bg-navy-900"
      >
        {/* Background photo — high-res cat & dog */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <Image
            src="/hero-pets.jpg"
            alt=""
            fill
            priority
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Wider center vignette so all hero content sits on dimmer photo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 95% 75% at 50% 50%, rgba(15,12,8,0.72) 0%, rgba(15,12,8,0.45) 50%, rgba(15,12,8,0.20) 80%, transparent 100%)',
            }}
          />
          {/* Stronger top fade — protects header logo legibility */}
          <div
            className="absolute top-0 left-0 right-0 h-48"
            style={{
              background: 'linear-gradient(to bottom, rgba(15,12,8,0.75) 0%, rgba(15,12,8,0.30) 60%, transparent 100%)',
            }}
          />
          {/* Bottom fade into next section */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1/3"
            style={{
              background: 'linear-gradient(to top, rgba(15,12,8,0.50) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* Decorative layer — subtle pattern */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Sunny top-right glow */}
          <div
            className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,221,136,0.18) 0%, rgba(255,179,71,0.08) 40%, transparent 70%)',
              animation: 'pulse-slow 9s ease-in-out infinite',
            }}
          />
          {/* Cyan glow bottom-left */}
          <div
            className="absolute -bottom-24 -left-24 w-[520px] h-[520px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(186,230,253,0.18) 0%, transparent 65%)',
            }}
          />
          {/* Fine dot grid */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.08 }}>
            <defs>
              <pattern id="hero-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-dots)" />
          </svg>
          <style>{`
            @keyframes pulse-slow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.85;transform:scale(1.06)} }
          `}</style>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 py-10 md:py-16 lg:py-28 w-full">
          <div className="text-center">
            {/* Eyebrow pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 border border-amber-400/60 backdrop-blur-md"
              style={{ background: 'rgba(15,12,8,0.55)' }}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-amber-300">
                Trusted by UK Pet Owners
              </p>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-bold leading-[1.06] mb-6 text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4rem)' }}
            >
              Expert Pet Product Reviews
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg, #FFD98A 0%, #FFB347 50%, #FF9A3C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                You Can Trust
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-body text-lg text-white/95 leading-relaxed max-w-xl mx-auto mb-10 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
              Independently tested and reviewed gear for every pet. UK-based, always honest.
            </p>

            {/* Search */}
            <div className="flex justify-center mb-10">
              <HeroSearch />
            </div>

            {/* Pet quick-links */}
            <nav aria-label="Browse by pet type" className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
              {PET_LINKS.map(({ label, emoji, slug }) => (
                <Link
                  key={slug}
                  href={`/products?petType=${slug}`}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full
                             bg-black/45 border border-white/50 shadow-lg backdrop-blur-md
                             font-body text-sm font-semibold text-white
                             hover:bg-amber-500 hover:text-white hover:border-amber-400 hover:shadow-xl hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  <span aria-hidden="true">{emoji}</span>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Trust stats — horizontal with dividers */}
            <div
              className="inline-flex flex-wrap items-center justify-center gap-0 rounded-2xl border border-white/30 shadow-2xl overflow-hidden backdrop-blur-md"
              style={{ background: 'rgba(15,12,8,0.55)' }}
            >
              {TRUST_BADGES.map(({ stat, label }, i) => (
                <div key={stat} className="flex items-center">
                  <div className="px-8 py-5 text-center">
                    <p
                      className="font-display text-2xl font-bold leading-none mb-1"
                      style={{
                        background: 'linear-gradient(90deg, #FFE4A3 0%, #FFB347 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {stat}
                    </p>
                    <p className="font-body text-xs text-white/90 uppercase tracking-widest">{label}</p>
                  </div>
                  {i < TRUST_BADGES.length - 1 && (
                    <div className="w-px h-10 bg-white/30" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient fade into next section */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #FAF8F5)' }}
        />

        {/* Floating paw prints / pet shapes */}
        <FloatingPets />
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* MARQUEE STRIP — SOCIAL PROOF                             */}
      {/* ────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden py-3 border-y border-warm-300 bg-warm-200"
      >
        <div className="flex gap-0 whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
          {[...Array(3)].map((_, repeat) => (
            <div key={repeat} className="flex items-center gap-0 flex-shrink-0">
              {[
                'Independent Reviews',
                'UK Prices & Availability',
                'No Sponsored Rankings',
                'Expert-Tested Products',
                'Qualified Vet Authors',
                '100% Honest Advice',
              ].map((text) => (
                <span key={text} className="inline-flex items-center gap-3 px-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 flex-shrink-0" />
                  <span className="font-body text-xs font-semibold tracking-[0.18em] uppercase text-navy-700">
                    {text}
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 2 — CATEGORY QUICK LINKS (LIGHT)                 */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="categories" aria-labelledby="categories-heading" className="py-20 lg:py-24 relative" style={{ background: '#FAFAF9' }}>
        {/* Subtle top border */}
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(245,130,32,0.15) 50%, transparent)' }} />
        <div className="editorial-container relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-amber-500/50" aria-hidden="true" />
              <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-amber-500">
                Explore Collections
              </p>
              <div className="w-8 h-px bg-amber-500/50" aria-hidden="true" />
            </div>
            <WordReveal
              id="categories-heading"
              text="Shop by Category"
              className="font-display text-4xl sm:text-5xl font-bold text-navy-900"
              as="h2"
              stagger={0.09}
            />
          </div>

          {/* Full-width Pet Parade carousel */}
          <PetParadeCarousel categories={categories} />
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 3 — EDITOR'S TOP PICKS (LIGHT)                    */}
      {/* ────────────────────────────────────────────────────────── */}
      <section id="top-picks" aria-labelledby="top-picks-heading" className="py-20 lg:py-24 relative overflow-hidden" style={{ background: '#F5EFE6' }}>
        {/* Decorative top border */}
        <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(245,130,32,0.15) 50%, transparent)' }} />
        {/* Subtle radial glow */}
        <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
             style={{ background: 'radial-gradient(ellipse, rgba(245,130,32,0.06) 0%, transparent 65%)' }} />

        <div className="editorial-container relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-amber-500/50" aria-hidden="true" />
                <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-amber-500">
                  Handpicked Selection
                </p>
              </div>
              <WordReveal
                id="top-picks-heading"
                text="Editor's Top Picks"
                className="font-display text-4xl sm:text-5xl font-bold text-navy-900"
                as="h2"
                stagger={0.1}
              />
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-amber-500 hover:text-amber-500 transition-colors whitespace-nowrap"
            >
              View all products
              <span aria-hidden="true">→</span>
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
              {featured.map((product, idx) => (
                <div
                  key={product.id}
                  style={{
                    animation: `slideUp 0.6s ease-out ${idx * 0.08}s both`,
                  }}
                >
                  <ProductCard product={product} variant={featured.length === 1 ? 'featured' : 'default'} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-warm-300 rounded-xl bg-warm-50">
              <p className="font-body text-navy-700 mb-6">
                Featured products will appear here once published from the admin panel.
              </p>
              <Link href="/admin" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-white font-semibold hover:opacity-90 transition-opacity">
                Go to Admin
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 4 — WHY TRUST PETGEARHUB (LIGHT PREMIUM)          */}
      {/* ────────────────────────────────────────────────────────── */}
      <section
        id="why-trust"
        aria-labelledby="trust-heading"
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: '#F5F1EC' }}
      >
        {/* Subtle warm orange glow top-right */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,130,32,0.07) 0%, transparent 65%)' }}
        />
        {/* Subtle warm glow bottom-left */}
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,130,32,0.05) 0%, transparent 65%)' }}
        />

        <div className="editorial-container relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-amber-500" aria-hidden="true" />
              <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-amber-500">
                Our Promise
              </p>
              <div className="w-8 h-px bg-amber-500" aria-hidden="true" />
            </div>
            <WordReveal
              id="trust-heading"
              text="Why Trust PetGearHub?"
              className="font-display text-4xl sm:text-5xl font-bold text-navy-900"
              as="h2"
              stagger={0.08}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Column 1 */}
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-warm-200 shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(245,130,32,0.12) 0%, rgba(255,179,71,0.08) 100%)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4763C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 12l2 2 4-4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                Independent Reviews
              </h3>
              <p className="font-body text-sm text-navy-700 leading-relaxed">
                We never accept payment for reviews. Every recommendation is based on genuine testing and research — no sponsored rankings, ever.
              </p>
            </div>

            {/* Column 2 — highlighted middle card */}
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl border border-amber-300/20 shadow-glow hover:shadow-glow-lg hover:-translate-y-1 transition-all duration-300"
                 style={{ background: 'linear-gradient(160deg, #fff 0%, #FFF8F2 100%)' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(245,130,32,0.15) 0%, rgba(255,179,71,0.10) 100%)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4763C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h4M18 12h4M12 2v4M12 18v4" />
                  <path d="M7 7l2 2M15 15l2 2M15 7l-2 2M7 17l2-2" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                UK-Focused
              </h3>
              <p className="font-body text-sm text-navy-700 leading-relaxed">
                All prices shown in GBP. We only recommend products readily available in the UK — no misleading US links or out-of-stock items.
              </p>
            </div>

            {/* Column 3 */}
            <div className="group flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-warm-200 shadow-sm hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(245,130,32,0.12) 0%, rgba(255,179,71,0.08) 100%)' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4763C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 mb-3">
                Expert Authors
              </h3>
              <p className="font-body text-sm text-navy-700 leading-relaxed">
                Our guides are written by qualified vets, veterinary nurses, and experienced pet owners with years of hands-on knowledge.
              </p>
            </div>
          </div>

          {/* Pull quote — styled as a premium banner */}
          <div
            className="text-center py-10 px-8 rounded-2xl border border-amber-500/15"
            style={{ background: 'linear-gradient(135deg, rgba(245,130,32,0.04) 0%, rgba(255,179,71,0.03) 100%)' }}
          >
            <p className="font-display text-2xl lg:text-3xl text-navy-900 italic max-w-3xl mx-auto leading-relaxed mb-4">
              &ldquo;We don&rsquo;t list everything &mdash; we list the <span className="text-amber-500 not-italic font-semibold">right</span> things.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3" aria-hidden="true">
              <div className="w-8 h-px bg-amber-500/40" />
              <div className="w-2 h-2 rounded-full bg-amber-500/60" />
              <div className="w-8 h-px bg-amber-500/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 5 — LATEST BUYER'S GUIDES (LUXURY)                */}
      {/* ────────────────────────────────────────────────────────── */}
      {guides.length > 0 && (
        <section aria-labelledby="guides-heading" className="py-16 lg:py-20 bg-warm-100 relative">
          <div className="editorial-container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-amber-500 mb-3">
                  Expert Guides
                </p>
                <h2
                  id="guides-heading"
                  className="font-display text-4xl sm:text-5xl font-bold text-navy-900"
                >
                  Latest Buyer&rsquo;s Guides
                </h2>
              </div>
              <Link
                href="/blog?type=buyers-guide"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-amber-500 hover:text-amber-500 transition-colors whitespace-nowrap"
              >
                View all guides
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((article, idx) => (
                <div
                  key={article.id}
                  style={{
                    animation: `slideUp 0.6s ease-out ${idx * 0.08}s both`,
                  }}
                >
                  <ArticleCard article={article} variant="default" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* SECTION 6 — CURRENT DEALS (LIGHT)                         */}
      {/* ────────────────────────────────────────────────────────── */}
      {deals.length > 0 && (
        <section aria-labelledby="deals-heading" className="py-16 lg:py-20 bg-warm-200 relative overflow-hidden">
          {/* Subtle accent glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 1000px 600px at 50% 50%, rgba(245, 130, 32, 0.04) 0%, transparent 60%)',
            }}
          />

          <div className="editorial-container relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
                  <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-amber-500">
                    Limited Time Offers
                  </p>
                </div>
                <h2
                  id="deals-heading"
                  className="font-display text-4xl sm:text-5xl font-bold text-navy-900"
                >
                  Current Deals
                </h2>
              </div>
              <Link
                href="/products?isDeal=true"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-amber-500 hover:text-amber-500 transition-colors whitespace-nowrap"
              >
                View all deals
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {deals.map((product, idx) => (
                <div
                  key={product.id}
                  style={{
                    animation: `slideUp 0.6s ease-out ${idx * 0.08}s both`,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────────────────────── */}
      {/* CTA BANNER — PREMIUM ORANGE                              */}
      {/* ────────────────────────────────────────────────────────── */}
      <section
        id="cta"
        aria-label="Call to action"
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: 'linear-gradient(135deg, #D4763C 0%, #B85C2A 50%, #9A4A20 100%)' }}
      >
        {/* Decorative circles */}
        <div aria-hidden="true" className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 65%)' }} />
        <div aria-hidden="true" className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 65%)' }} />
        {/* Fine dot grid overlay */}
        <svg aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
          <defs>
            <pattern id="cta-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>

        <div className="editorial-container relative z-10 text-center">
          <p className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-white/70 mb-5">
            Your Pet Deserves the Best
          </p>
          <h2 className="font-display font-bold leading-tight text-white mb-6"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}>
            Find the Perfect Gear<br />
            <span style={{ opacity: 0.9 }}>for Your Pet Today</span>
          </h2>
          <p className="font-body text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Thousands of UK pet owners trust PetGearHub for honest, expert-reviewed recommendations — all at UK prices.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full bg-white text-amber-500 font-body font-bold text-sm
                         shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 tracking-wide"
            >
              Browse All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2.5 px-9 py-4 rounded-full border-2 border-white/60 text-white font-body font-semibold text-sm
                         hover:bg-white/10 hover:border-white transition-all duration-200 tracking-wide"
            >
              Shop by Category
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
