'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProductCard from '@/components/public/ProductCard';
import api from '@/lib/api';
import type { Product, Category } from '@/lib/types';

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [latest, setLatest] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  useEffect(() => {
    Promise.all([
      api.getFeatured(4).catch(() => []),
      api.getLatest(8).catch(() => []),
      api.getCategories().catch(() => []),
    ]).then(([feat, lat, cats]) => {
      setFeatured(feat as Product[]);
      setLatest(lat as Product[]);
      setCategories(cats as Category[]);
      setLoading(false);
    });
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterStatus('loading');
    setNewsletterMessage('');
    try {
      const res = await api.subscribeNewsletter(newsletterEmail.trim());
      setNewsletterStatus('success');
      setNewsletterMessage(res.message || 'Successfully subscribed!');
      setNewsletterEmail('');
    } catch (err: unknown) {
      setNewsletterStatus('error');
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setNewsletterMessage(message.includes('already') ? 'You are already subscribed!' : message);
    }
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/3 rounded-full blur-3xl" />
        </div>

        <div className="editorial-container relative z-10 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-accent text-xs font-body font-semibold
                             tracking-[0.25em] uppercase mb-6">
                Top Picks This Week
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-hero text-white leading-[1.05] mb-6"
            >
              Gear Your
              <br />
              <span className="text-gold-gradient italic">Pet Deserves</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/50 text-lg font-body leading-relaxed max-w-lg mb-10"
            >
              Expert-picked products for every kind of companion. We test, compare, and recommend so you can skip the guesswork.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/products" className="btn-primary">
                Browse All Products
              </Link>
              <Link href="#featured" className="btn-outline border-white/20 text-white hover:bg-white hover:text-primary">
                Featured Picks
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border-2 border-white/20 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-accent rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────── */}
      <section id="featured" className="py-24 lg:py-32">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
                Staff Picks
              </span>
              <h2 className="font-display text-section-title text-primary mt-3 mb-4">
                Staff Picks
              </h2>
              <div className="divider" />
            </div>
          </ScrollReveal>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-border-light" />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="space-y-8">
              {featured.slice(0, 1).map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.1}>
                  <ProductCard product={product} variant="featured" />
                </ScrollReveal>
              ))}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featured.slice(1, 4).map((product, i) => (
                  <ScrollReveal key={product.id} delay={i * 0.1}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary font-body">
                Featured products will appear here once published from the admin panel.
              </p>
              <Link href="/admin" className="btn-primary mt-6 inline-block">
                Go to Admin →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── EDITORIAL DIVIDER ────────────────────────── */}
      <section className="py-20 bg-primary">
        <div className="editorial-container text-center">
          <ScrollReveal>
            <p className="font-display text-2xl lg:text-3xl text-white/90 italic max-w-2xl mx-auto leading-relaxed">
              &ldquo;We don&apos;t list everything — we list the right things.&rdquo;
            </p>
            <div className="w-12 h-px bg-accent mx-auto mt-8" />
          </ScrollReveal>
        </div>
      </section>

      {/* ─── LATEST PRODUCTS ──────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-16">
              <div>
                <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
                  Just In
                </span>
                <h2 className="font-display text-section-title text-primary mt-3">
                  Just In
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden md:inline-block text-sm font-body font-semibold text-accent
                           hover:underline underline-offset-4"
              >
                View All →
              </Link>
            </div>
          </ScrollReveal>

          {latest.length > 0 ? (
            <div className="editorial-grid">
              {latest.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-secondary font-body">
                Products will appear here once you add and publish them.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-24 lg:py-32 bg-white">
          <div className="editorial-container">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
                  Explore
                </span>
                <h2 className="font-display text-section-title text-primary mt-3 mb-4">
                  Shop by Category
                </h2>
                <div className="divider" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, i) => (
                <ScrollReveal key={cat.id} delay={i * 0.05}>
                  <Link href={`/categories/${cat.slug}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="group bg-background rounded-xl p-6 text-center
                                 border border-transparent hover:border-accent/20
                                 transition-all duration-300"
                    >
                      <div
                        className="w-12 h-12 mx-auto mb-3 gold-gradient rounded-lg
                                    flex items-center justify-center opacity-60
                                    group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      >
                        <span className="text-white font-display font-bold text-lg">
                          {cat.name.charAt(0)}
                        </span>
                      </div>
                      <h3 className="font-body text-sm font-semibold text-primary">
                        {cat.name}
                      </h3>
                      {cat._count && (
                        <p className="text-xs text-text-muted mt-1">
                          {cat._count.products} products
                        </p>
                      )}
                    </motion.div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── NEWSLETTER ───────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="max-w-xl mx-auto text-center">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
                Newsletter
              </span>
              <h2 className="font-display text-section-title text-primary mt-3 mb-4">
                Join the Pack
              </h2>
              <p className="text-text-secondary font-body mb-8">
                Get weekly picks, exclusive deals, and honest product reviews delivered straight to your inbox.
              </p>

              {newsletterStatus === 'success' ? (
                <div className="py-4 px-6 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-green-700 font-body font-medium">{newsletterMessage}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex gap-3 max-w-md mx-auto"
                  aria-label="Newsletter subscription form"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="admin-input flex-1"
                    required
                    aria-required="true"
                    disabled={newsletterStatus === 'loading'}
                  />
                  <button
                    type="submit"
                    className="btn-primary whitespace-nowrap disabled:opacity-50"
                    disabled={newsletterStatus === 'loading'}
                  >
                    {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}

              {newsletterStatus === 'error' && (
                <p className="text-red-500 text-sm font-body mt-3">{newsletterMessage}</p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
