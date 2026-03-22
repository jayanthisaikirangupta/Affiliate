'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PawIcon } from '@/components/PawIcon';
import type { Product, Article } from '@/lib/types';

// ─── Navigation data ──────────────────────────────────────────────────────────

interface ProductTypeLink {
  label: string;
  href: string;
}

interface FeaturedGuide {
  label: string;
  href: string;
  type: string;
}

interface PetNavItem {
  label: string;
  petKey: string;
  productTypes: ProductTypeLink[];
  featuredGuides: FeaturedGuide[];
}

interface BlogNavItem {
  label: 'Blog';
  categories: { label: string; href: string }[];
}

interface SimpleNavItem {
  label: string;
  href: string;
}

type NavItem = PetNavItem | BlogNavItem | SimpleNavItem;

const isPetItem = (item: NavItem): item is PetNavItem =>
  'petKey' in item;

const isBlogItem = (item: NavItem): item is BlogNavItem =>
  item.label === 'Blog' && 'categories' in item;

const isSimpleItem = (item: NavItem): item is SimpleNavItem =>
  'href' in item;

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dogs',
    petKey: 'dogs',
    productTypes: [
      { label: 'Food & Treats', href: '/products?petType=dogs&subCategory=food-treats' },
      { label: 'Beds & Furniture', href: '/products?petType=dogs&subCategory=beds-furniture' },
      { label: 'Toys & Play', href: '/products?petType=dogs&subCategory=toys-play' },
      { label: 'Health & Grooming', href: '/products?petType=dogs&subCategory=health-grooming' },
      { label: 'Collars & Leads', href: '/products?petType=dogs&subCategory=collars-leads' },
    ],
    featuredGuides: [
      { label: 'Best Dog Food UK 2026', href: '/blog?petType=dogs', type: "Buyer's Guide" },
      { label: 'Top Rated Dog Beds', href: '/blog?petType=dogs', type: 'Comparison' },
    ],
  },
  {
    label: 'Cats',
    petKey: 'cats',
    productTypes: [
      { label: 'Food & Treats', href: '/products?petType=cats&subCategory=food-treats' },
      { label: 'Beds & Furniture', href: '/products?petType=cats&subCategory=beds-furniture' },
      { label: 'Toys & Play', href: '/products?petType=cats&subCategory=toys-play' },
      { label: 'Health & Grooming', href: '/products?petType=cats&subCategory=health-grooming' },
      { label: 'Litter & Hygiene', href: '/products?petType=cats&subCategory=litter-hygiene' },
    ],
    featuredGuides: [
      { label: 'Best Cat Food UK 2026', href: '/blog?petType=cats', type: "Buyer's Guide" },
      { label: 'Indoor Cat Enrichment', href: '/blog?petType=cats', type: 'Care Tips' },
    ],
  },
  {
    label: 'Small Pets',
    petKey: 'small-pets',
    productTypes: [
      { label: 'Food & Hay', href: '/products?petType=small-pets&subCategory=food-hay' },
      { label: 'Cages & Enclosures', href: '/products?petType=small-pets&subCategory=cages' },
      { label: 'Bedding & Substrate', href: '/products?petType=small-pets&subCategory=bedding' },
      { label: 'Toys & Enrichment', href: '/products?petType=small-pets&subCategory=toys' },
      { label: 'Health & Care', href: '/products?petType=small-pets&subCategory=health' },
    ],
    featuredGuides: [
      { label: 'Best Rabbit Hutches', href: '/blog?petType=small-pets', type: "Buyer's Guide" },
      { label: 'Guinea Pig Care Guide', href: '/blog?petType=small-pets', type: 'Care Tips' },
    ],
  },
  {
    label: 'Birds',
    petKey: 'birds',
    productTypes: [
      { label: 'Food & Seeds', href: '/products?petType=birds&subCategory=food-seeds' },
      { label: 'Cages & Aviaries', href: '/products?petType=birds&subCategory=cages' },
      { label: 'Perches & Toys', href: '/products?petType=birds&subCategory=perches-toys' },
      { label: 'Health & Vitamins', href: '/products?petType=birds&subCategory=health' },
      { label: 'Feeders & Baths', href: '/products?petType=birds&subCategory=feeders' },
    ],
    featuredGuides: [
      { label: 'Best Parrot Cages UK', href: '/blog?petType=birds', type: "Buyer's Guide" },
      { label: 'Bird Nutrition 101', href: '/blog?petType=birds', type: 'Care Tips' },
    ],
  },
  {
    label: 'Fish & Aquatics',
    petKey: 'fish',
    productTypes: [
      { label: 'Aquariums & Tanks', href: '/products?petType=fish&subCategory=tanks' },
      { label: 'Filters & Pumps', href: '/products?petType=fish&subCategory=filters' },
      { label: 'Food & Supplements', href: '/products?petType=fish&subCategory=food' },
      { label: 'Lighting & Heating', href: '/products?petType=fish&subCategory=lighting' },
      { label: 'Decor & Plants', href: '/products?petType=fish&subCategory=decor' },
    ],
    featuredGuides: [
      { label: 'Best Fish Tanks UK 2026', href: '/blog?petType=fish', type: "Buyer's Guide" },
      { label: 'Beginner Aquarium Setup', href: '/blog?petType=fish', type: 'Care Tips' },
    ],
  },
  {
    label: 'Blog',
    categories: [
      { label: "Buyer's Guides", href: '/blog?type=buyers-guide' },
      { label: 'Comparisons', href: '/blog?type=comparison' },
      { label: 'Care Tips', href: '/blog?type=care-tips' },
      { label: 'News', href: '/blog?type=news' },
    ],
  } as BlogNavItem,
  {
    label: 'Deals',
    href: '/deals',
  },
];

// ─── Search result types ──────────────────────────────────────────────────────

interface SearchResults {
  products: Product[];
  articles: Article[];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PetMegaMenu({ item, onClose }: { item: PetNavItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-white
                 border border-border-light rounded-xl shadow-xl overflow-hidden z-50"
    >
      <div className="grid grid-cols-2 gap-0">
        {/* Left: Product Types */}
        <div className="p-6 border-r border-border-light">
          <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
            Shop by Product Type
          </p>
          <ul className="space-y-1">
            {item.productTypes.map((pt) => (
              <li key={pt.href}>
                <Link
                  href={pt.href}
                  onClick={onClose}
                  className="block text-sm font-body text-text-secondary hover:text-accent
                             hover:translate-x-1 transition-all duration-150 py-1.5"
                >
                  {pt.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Featured Guides */}
        <div className="p-6">
          <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
            Featured Guides
          </p>
          <div className="space-y-3">
            {item.featuredGuides.map((guide) => (
              <Link
                key={guide.href + guide.label}
                href={guide.href}
                onClick={onClose}
                className="block p-3 rounded-lg border border-border-light hover:border-accent/40
                           hover:bg-background transition-all duration-150 group"
              >
                <span className="text-[10px] font-body font-semibold tracking-[0.15em] uppercase
                                 text-accent block mb-1">
                  {guide.type}
                </span>
                <span className="text-sm font-body font-medium text-primary group-hover:text-accent
                                 transition-colors duration-150 leading-snug line-clamp-2">
                  {guide.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="px-6 py-3 bg-background border-t border-border-light">
        <Link
          href={`/products?petType=${item.petKey}`}
          onClick={onClose}
          className="text-sm font-body font-medium text-accent hover:text-accent-dark
                     transition-colors duration-150 flex items-center gap-1"
        >
          View all {item.label} products
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

function BlogMegaMenu({ item, onClose }: { item: BlogNavItem; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white
                 border border-border-light rounded-xl shadow-xl overflow-hidden z-50"
    >
      <div className="p-5">
        <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted mb-4">
          Browse by Type
        </p>
        <ul className="space-y-1">
          {item.categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                onClick={onClose}
                className="block text-sm font-body text-text-secondary hover:text-accent
                           hover:translate-x-1 transition-all duration-150 py-1.5"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-3 bg-background border-t border-border-light">
        <Link
          href="/blog"
          onClick={onClose}
          className="text-sm font-body font-medium text-accent hover:text-accent-dark
                     transition-colors duration-150 flex items-center gap-1"
        >
          View all articles
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Search overlay ───────────────────────────────────────────────────────────

function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const performSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null);
      return;
    }
    setSearching(true);
    try {
      const [productsRes, articlesRes] = await Promise.all([
        fetch(`${API_BASE}/products?search=${encodeURIComponent(q)}&limit=5`).then((r) =>
          r.ok ? r.json() : { data: [] }
        ),
        fetch(`${API_BASE}/articles?search=${encodeURIComponent(q)}&limit=3`).then((r) =>
          r.ok ? r.json() : { data: [] }
        ),
      ]);
      setResults({
        products: productsRes.data ?? [],
        articles: articlesRes.data ?? [],
      });
    } catch {
      setResults({ products: [], articles: [] });
    } finally {
      setSearching(false);
    }
  }, [API_BASE]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => performSearch(val), 300);
  };

  const hasResults =
    results && (results.products.length > 0 || results.articles.length > 0);
  const showNoResults =
    results && !hasResults && query.trim().length > 1 && !searching;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-xl"
    >
      {/* Input row */}
      <div className="flex items-center gap-3 bg-white border border-border-light rounded-xl
                      px-4 py-2.5 shadow-sm focus-within:border-accent/60 focus-within:ring-2
                      focus-within:ring-accent/10 transition-all duration-200">
        <svg
          className="w-4 h-4 text-text-muted shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search products, guides, reviews…"
          className="flex-1 text-sm font-body text-primary placeholder:text-text-muted
                     bg-transparent outline-none"
          aria-label="Search"
          autoComplete="off"
        />
        {searching && (
          <svg
            className="w-4 h-4 text-accent animate-spin shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        <button
          onClick={onClose}
          className="shrink-0 text-text-muted hover:text-primary transition-colors"
          aria-label="Close search"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {(hasResults || showNoResults) && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-border-light
                       rounded-xl shadow-xl overflow-hidden z-50 max-h-[420px] overflow-y-auto"
          >
            {showNoResults && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-body text-text-muted">
                  No results for &ldquo;{query}&rdquo;
                </p>
              </div>
            )}

            {hasResults && (
              <>
                {/* Products section */}
                {results.products.length > 0 && (
                  <div>
                    <p className="px-5 pt-4 pb-2 text-[10px] font-body font-semibold tracking-[0.2em]
                                  uppercase text-text-muted">
                      Products
                    </p>
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-background
                                   transition-colors duration-150 group"
                      >
                        {product.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-md border border-border-light shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-background border border-border-light
                                          flex items-center justify-center shrink-0">
                            <PawIcon className="w-5 h-5 text-text-muted" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-body font-medium text-primary truncate
                                        group-hover:text-accent transition-colors">
                            {product.title}
                          </p>
                          {product.price != null && (
                            <p className="text-xs font-body text-text-muted">
                              £{product.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* Articles section */}
                {results.articles.length > 0 && (
                  <div className={results.products.length > 0 ? 'border-t border-border-light' : ''}>
                    <p className="px-5 pt-4 pb-2 text-[10px] font-body font-semibold tracking-[0.2em]
                                  uppercase text-text-muted">
                      Articles
                    </p>
                    {results.articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/blog/${article.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-background
                                   transition-colors duration-150 group"
                      >
                        <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center
                                        justify-center shrink-0">
                          <svg
                            className="w-5 h-5 text-accent"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-body font-medium text-primary truncate
                                        group-hover:text-accent transition-colors">
                            {article.title}
                          </p>
                          {article.readTime && (
                            <p className="text-xs font-body text-text-muted">
                              {article.readTime} min read
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* View all footer */}
                <div className="border-t border-border-light px-5 py-3">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-sm font-body font-medium text-accent hover:text-accent-dark
                               transition-colors duration-150 flex items-center gap-1"
                  >
                    View all results for &ldquo;{query}&rdquo;
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile accordion item ─────────────────────────────────────────────────────

function MobileAccordionItem({
  item,
  onNavigate,
}: {
  item: PetNavItem | BlogNavItem;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  if (isPetItem(item)) {
    return (
      <div className="border-b border-border-light last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-4 text-left"
          aria-expanded={open}
        >
          <span className="font-display text-lg text-primary">{item.label}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-text-muted"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div className="pb-4 pl-4 space-y-1">
                {item.productTypes.map((pt) => (
                  <Link
                    key={pt.href}
                    href={pt.href}
                    onClick={onNavigate}
                    className="block py-2 text-sm font-body text-text-secondary hover:text-accent
                               transition-colors"
                  >
                    {pt.label}
                  </Link>
                ))}
                <Link
                  href={`/products?petType=${item.petKey}`}
                  onClick={onNavigate}
                  className="block pt-3 text-sm font-body font-medium text-accent"
                >
                  View all {item.label} products →
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Blog accordion
  return (
    <div className="border-b border-border-light last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-primary">Blog</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-muted"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-4 space-y-1">
              {(item as BlogNavItem).categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={onNavigate}
                  className="block py-2 text-sm font-body text-text-secondary hover:text-accent
                             transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={onNavigate}
                className="block pt-3 text-sm font-body font-medium text-accent"
              >
                View all articles →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Header component ─────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActivePath = (href: string) => pathname === href;

  const navItemBaseClass =
    'text-sm font-body font-medium transition-colors duration-200 relative ' +
    'after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:bg-accent ' +
    'after:transition-all after:duration-300';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-border-light'
            : 'bg-transparent'
        }`}
      >
        <div className="editorial-container">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center">
                <PawIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-semibold tracking-tight text-primary">
                PetGearHub
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              aria-label="Main navigation"
              className="hidden lg:flex items-center gap-8 xl:gap-10"
              onMouseLeave={() => setActiveMenu(null)}
            >
              {NAV_ITEMS.map((item) => {
                if (isSimpleItem(item)) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${navItemBaseClass} ${
                        isActivePath(item.href)
                          ? 'text-primary after:w-full'
                          : 'text-text-secondary hover:text-primary after:w-0 hover:after:w-full'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const isActive = activeMenu === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveMenu(item.label)}
                  >
                    <button
                      className={`${navItemBaseClass} flex items-center gap-1 ${
                        isActive
                          ? 'text-primary after:w-full'
                          : 'text-text-secondary hover:text-primary after:w-0 hover:after:w-full'
                      }`}
                      aria-expanded={isActive}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <motion.svg
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.15 }}
                        className="w-3 h-3 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        isPetItem(item) ? (
                          <PetMegaMenu
                            item={item}
                            onClose={() => setActiveMenu(null)}
                          />
                        ) : isBlogItem(item) ? (
                          <BlogMegaMenu
                            item={item}
                            onClose={() => setActiveMenu(null)}
                          />
                        ) : null
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right side: Search + CTA */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search icon (always in flow) */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg
                           text-text-secondary hover:text-primary hover:bg-background
                           transition-all duration-200"
                aria-label={searchOpen ? 'Close search' : 'Open search'}
              >
                <svg
                  className="w-[18px] h-[18px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>

              {/* Search overlay (absolutely positioned, doesn't affect nav layout) */}
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    key="searchbar"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full right-0 left-0 z-50 bg-white/95 backdrop-blur-md
                               border-b border-border-light shadow-sm"
                  >
                    <div className="editorial-container py-3">
                      <SearchBar onClose={() => setSearchOpen(false)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <Link
                href="/products"
                className="btn-primary text-sm py-2 px-5"
              >
                Shop All
              </Link>
            </div>

            {/* Mobile: Search icon + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(!searchOpen);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-lg
                           text-text-secondary hover:text-primary transition-colors"
                aria-label="Toggle search"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
              </button>

              <button
                onClick={() => {
                  setSearchOpen(false);
                  setMobileOpen(!mobileOpen);
                }}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-[1.5px] bg-primary block"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-[1.5px] bg-primary block"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-[1.5px] bg-primary block"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar (below header bar) */}
        <AnimatePresence>
          {searchOpen && !mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border-light bg-white/95 backdrop-blur-md
                         overflow-visible"
            >
              <div className="editorial-container py-3">
                <SearchBar onClose={() => setSearchOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile full-screen drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col"
            style={{ top: '4rem' }} // aligns below header bar (h-16)
          >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              <nav
                aria-label="Mobile navigation"
                className="editorial-container py-6"
              >
                {/* Mobile search */}
                <div className="mb-6">
                  <SearchBar onClose={() => { setSearchOpen(false); setMobileOpen(false); }} />
                </div>

                {/* Nav items */}
                <div className="border-t border-border-light">
                  {NAV_ITEMS.map((item) => {
                    if (isSimpleItem(item)) {
                      return (
                        <div key={item.href} className="border-b border-border-light last:border-0">
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-4 font-display text-lg transition-colors ${
                              isActivePath(item.href)
                                ? 'text-accent'
                                : 'text-primary hover:text-accent'
                            }`}
                          >
                            {item.label}
                          </Link>
                        </div>
                      );
                    }

                    return (
                      <MobileAccordionItem
                        key={item.label}
                        item={item as PetNavItem | BlogNavItem}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    );
                  })}
                </div>

                {/* Footer links */}
                <div className="mt-8 pt-6 border-t border-border-light flex flex-col gap-3">
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-sm text-center"
                  >
                    Shop All Products
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-body text-text-muted hover:text-accent
                               transition-colors text-center"
                  >
                    Admin Dashboard →
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
