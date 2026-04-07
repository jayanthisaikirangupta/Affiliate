'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PawIcon } from '@/components/PawIcon';
import type { Product, Article } from '@/lib/types';

// Design System Tokens
const COLORS = {
  textPrimary: '#1B2B3A',
  textSecondary: '#334E68',
  textMuted: '#8C847C',
  accent: '#D4763C',
  accentDark: '#B85C2A',
  background: '#FAF8F5',
  surface: '#FFFFFF',
  surfaceLight: '#F5F1EC',
  border: '#EDE8E1',
  borderLight: '#D8D0C7',
};

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
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[580px]
                 bg-white border border-warm-300 rounded-xl
                 shadow-lg overflow-hidden z-50"
    >
      <div className="grid grid-cols-2 gap-0">
        {/* Left: Product Types */}
        <div className="p-6 border-r border-warm-300">
          <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-amber-500 mb-4">
            Shop by Product Type
          </p>
          <ul className="space-y-1">
            {item.productTypes.map((pt) => (
              <li key={pt.href}>
                <Link
                  href={pt.href}
                  onClick={onClose}
                  className="block text-sm font-body text-navy-700 hover:text-amber-500
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
          <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-amber-500 mb-4">
            Featured Guides
          </p>
          <div className="space-y-3">
            {item.featuredGuides.map((guide) => (
              <Link
                key={guide.href + guide.label}
                href={guide.href}
                onClick={onClose}
                className="block p-3 rounded-lg border border-warm-300
                           hover:border-amber-300 hover:bg-warm-200
                           transition-all duration-150 group"
              >
                <span className="text-[10px] font-body font-semibold tracking-[0.15em] uppercase
                                 text-amber-500 block mb-1">
                  {guide.type}
                </span>
                <span className="text-sm font-body font-medium text-navy-900 group-hover:text-amber-500
                                 transition-colors duration-150 leading-snug line-clamp-2">
                  {guide.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="px-6 py-3 border-t border-warm-300 bg-warm-200">
        <Link
          href={`/products?petType=${item.petKey}`}
          onClick={onClose}
          className="text-sm font-body font-medium text-amber-500 hover:text-amber-600
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
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64
                 bg-white border border-warm-300 rounded-xl
                 shadow-lg overflow-hidden z-50"
    >
      <div className="p-5">
        <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-amber-500 mb-4">
          Browse by Type
        </p>
        <ul className="space-y-1">
          {item.categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                onClick={onClose}
                className="block text-sm font-body text-navy-700 hover:text-amber-500
                           hover:translate-x-1 transition-all duration-150 py-1.5"
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 py-3 border-t border-warm-300 bg-warm-200">
        <Link
          href="/blog"
          onClick={onClose}
          className="text-sm font-body font-medium text-amber-500 hover:text-amber-600
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
      <div className="flex items-center gap-3 bg-white border border-warm-300
                      rounded-2xl px-4 py-2.5 shadow-sm
                      focus-within:border-amber-500 focus-within:ring-2
                      focus-within:ring-amber-500/20 transition-all duration-200">
        <svg
          className="w-4 h-4 text-navy-500 shrink-0"
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
          className="flex-1 text-sm font-body text-navy-900 placeholder:text-navy-400
                     bg-transparent outline-none"
          aria-label="Search"
          autoComplete="off"
        />
        {searching && (
          <svg
            className="w-4 h-4 text-amber-500 animate-spin shrink-0"
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
          className="shrink-0 text-navy-400 hover:text-navy-900 transition-colors"
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
            className="absolute top-full left-0 right-0 mt-2 bg-white
                       border border-warm-300 rounded-xl shadow-lg overflow-hidden z-50
                       max-h-[420px] overflow-y-auto"
          >
            {showNoResults && (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-body text-navy-500">
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
                                  uppercase text-amber-500/80">
                      Products
                    </p>
                    {results.products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-warm-100
                                   transition-colors duration-150 group"
                      >
                        {product.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded-md border border-warm-300 shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-md bg-warm-100 border border-warm-300
                                          flex items-center justify-center shrink-0">
                            <PawIcon className="w-5 h-5 text-navy-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-body font-medium text-navy-900 truncate
                                        group-hover:text-amber-500 transition-colors">
                            {product.title}
                          </p>
                          {product.price != null && (
                            <p className="text-xs font-body text-navy-500">
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
                  <div className={results.products.length > 0 ? 'border-t border-warm-300' : ''}>
                    <p className="px-5 pt-4 pb-2 text-[10px] font-body font-semibold tracking-[0.2em]
                                  uppercase text-amber-500/80">
                      Articles
                    </p>
                    {results.articles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/blog/${article.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-5 py-3 hover:bg-warm-100
                                   transition-colors duration-150 group"
                      >
                        <div className="w-10 h-10 rounded-md bg-amber-500/10 flex items-center
                                        justify-center shrink-0">
                          <svg
                            className="w-5 h-5 text-amber-500"
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
                          <p className="text-sm font-body font-medium text-navy-900 truncate
                                        group-hover:text-amber-500 transition-colors">
                            {article.title}
                          </p>
                          {article.readTime && (
                            <p className="text-xs font-body text-navy-500">
                              {article.readTime} min read
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {/* View all footer */}
                <div className="border-t border-warm-300 px-5 py-3">
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-sm font-body font-medium text-amber-500 hover:text-amber-600
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
      <div className="border-b border-warm-300 last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-4 text-left"
          aria-expanded={open}
        >
          <span className="font-display text-lg text-navy-900">{item.label}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-navy-400"
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
                    className="block py-2 text-sm font-body text-navy-700 hover:text-amber-400
                               transition-colors"
                  >
                    {pt.label}
                  </Link>
                ))}
                <Link
                  href={`/products?petType=${item.petKey}`}
                  onClick={onNavigate}
                  className="block pt-3 text-sm font-body font-medium text-amber-400"
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
    <div className="border-b border-warm-300 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg text-navy-900">Blog</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-navy-400"
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
                  className="block py-2 text-sm font-body text-navy-700 hover:text-amber-400
                             transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/blog"
                onClick={onNavigate}
                className="block pt-3 text-sm font-body font-medium text-amber-400"
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
    'after:absolute after:bottom-[-4px] after:left-0 after:h-[1.5px] after:bg-amber-400 ' +
    'after:transition-all after:duration-300';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[30] transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'backdrop-blur-2xl bg-navy-900/95 border-b border-navy-800 shadow-sm'
            : 'backdrop-blur-xl bg-navy-900 border-b border-navy-800/50'
        }`}
      >
        <div className="editorial-container">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">

            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <img src="/logo-full.svg" alt="PetGearHub" className="h-12 w-auto" />
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
                          ? 'text-amber-400 after:w-full'
                          : 'text-white hover:text-amber-300 after:w-0 hover:after:w-full'
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
                          ? 'text-amber-400 after:w-full'
                          : 'text-white hover:text-amber-300 after:w-0 hover:after:w-full'
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
                           text-navy-300 hover:text-white hover:bg-navy-800
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
                    className="absolute top-full right-0 left-0 z-50
                               bg-white border-b border-warm-300 shadow-sm"
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
                className="text-sm font-body font-medium py-2 px-5 rounded-lg
                           bg-amber-500 text-white hover:bg-amber-600
                           shadow-lg shadow-amber-500/20
                           transition-all duration-200"
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
                           text-navy-300 hover:text-white transition-colors"
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
                  className="w-6 h-[1.5px] bg-white block"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-[1.5px] bg-white block"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-[1.5px] bg-white block"
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
              className="lg:hidden border-t border-warm-300
                         bg-white overflow-visible"
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
                <div className="border-t border-warm-300">
                  {NAV_ITEMS.map((item) => {
                    if (isSimpleItem(item)) {
                      return (
                        <div key={item.href} className="border-b border-warm-300 last:border-0">
                          <Link
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-4 font-display text-lg transition-colors ${
                              isActivePath(item.href)
                                ? 'text-amber-400'
                                : 'text-navy-900 hover:text-amber-400'
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
                <div className="mt-8 pt-6 border-t border-warm-300 flex flex-col gap-3">
                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-body font-medium py-2 px-5 rounded-lg text-center
                               bg-amber-500 text-white hover:bg-amber-600
                               shadow-lg shadow-amber-500/20
                               transition-all duration-200"
                  >
                    Shop All Products
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-body text-navy-400 hover:text-amber-400
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
