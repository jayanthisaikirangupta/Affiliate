'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api';
import type { Product } from '@/lib/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .getProduct(slug)
      .then((p) => {
        setProduct(p);
        // Track view
        api.trackView(p.id).catch(() => {});
      })
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to load product.';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const formatPrice = (price?: number, currency = 'USD') => {
    if (!price) return null;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
  };

  const handleAffiliateClick = () => {
    if (!product) return;
    api.trackClick(product.id).catch(() => {});
    window.open(product.affiliateLink, '_blank', 'noopener');
  };

  if (loading) {
    return (
      <div className="pt-28 pb-24">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-white rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-white rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-white rounded w-1/2 animate-pulse" />
              <div className="h-12 bg-white rounded w-1/3 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 pb-24 text-center">
        <div className="editorial-container">
          <p className="font-body text-text-secondary mb-6" role="alert">{error}</p>
          <Link href="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-24 text-center">
        <div className="editorial-container">
          <h1 className="font-display text-3xl text-primary mb-4">Product Not Found</h1>
          <Link href="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-24 lg:pt-28">
        <div className="editorial-container">
          <nav className="flex items-center gap-2 text-sm font-body text-text-muted py-4">
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-text-secondary truncate max-w-xs">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <section className="pb-24 lg:pb-32">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ── Image Gallery ─────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main image */}
              <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-border-light mb-4">
                {product.images?.[activeImage] ? (
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[activeImage]}
                    alt={product.title}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl font-display text-border">C</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1} of ${product.images.length} for ${product.title}`}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        activeImage === i ? 'border-accent' : 'border-border-light hover:border-border'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.title} — image ${i + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Product Info (sticky) ─────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              {product.category && (
                <Link
                  href={`/categories/${product.category.slug}`}
                  className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent
                           hover:underline underline-offset-4"
                >
                  {product.category.name}
                </Link>
              )}

              <h1 className="font-display text-3xl lg:text-4xl font-semibold text-primary mt-3 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(product.rating!) ? 'text-accent' : 'text-border'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-text-secondary font-body">
                    {product.rating.toFixed(1)}
                    {product.reviewCount && ` · ${product.reviewCount.toLocaleString()} reviews`}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-border-light">
                {formatPrice(product.price, product.currency) ? (
                  <>
                    <span className="font-display text-4xl font-bold text-primary">
                      {formatPrice(product.price, product.currency)}
                    </span>
                    {product.originalPrice && product.price && product.originalPrice > product.price && (
                      <>
                        <span className="text-lg text-text-muted line-through">
                          {formatPrice(product.originalPrice, product.currency)}
                        </span>
                        <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded">
                          Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span className="text-lg text-text-secondary">See price on {product.platform}</span>
                )}
              </div>

              {/* AI Summary */}
              {product.aiSummary && (
                <div className="mb-8">
                  <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wide mb-2">
                    Our Take
                  </h3>
                  <p className="text-text-primary font-body leading-relaxed">
                    {product.aiSummary}
                  </p>
                </div>
              )}

              {/* Pros & Cons */}
              {(product.pros?.length > 0 || product.cons?.length > 0) && (
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {product.pros?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-body font-semibold text-green-700 uppercase tracking-wide mb-3">
                        Pros
                      </h3>
                      <ul className="space-y-2">
                        {product.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-text-primary">
                            <span className="text-green-600 mt-0.5">✓</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {product.cons?.length > 0 && (
                    <div>
                      <h3 className="text-sm font-body font-semibold text-red-700 uppercase tracking-wide mb-3">
                        Cons
                      </h3>
                      <ul className="space-y-2">
                        {product.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm font-body text-text-primary">
                            <span className="text-red-500 mt-0.5">✗</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* CTA Button */}
              <button
                onClick={handleAffiliateClick}
                className="w-full btn-primary text-base py-4 mb-4"
              >
                View on {product.platform ? product.platform.charAt(0).toUpperCase() + product.platform.slice(1) : 'Store'}
                <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>

              <p className="text-xs text-text-muted text-center font-body">
                As an affiliate, we earn from qualifying purchases.
              </p>

              {/* Description */}
              {product.description && (
                <div className="mt-8 pt-8 border-t border-border-light">
                  <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wide mb-3">
                    Description
                  </h3>
                  <p className="text-text-primary font-body leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="mt-8 pt-8 border-t border-border-light">
                  <h3 className="text-sm font-body font-semibold text-text-secondary uppercase tracking-wide mb-3">
                    Specifications
                  </h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-border-light last:border-0">
                        <dt className="text-sm font-body text-text-secondary">{key}</dt>
                        <dd className="text-sm font-body font-medium text-primary">{val}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
