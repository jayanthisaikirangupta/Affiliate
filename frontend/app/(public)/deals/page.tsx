'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import DealCountdown from '@/components/ui/DealCountdown';
import StarRating from '@/components/ui/StarRating';
import PriceDisplay from '@/components/ui/PriceDisplay';
import api from '@/lib/api';
import type { Product } from '@/lib/types';

const PET_TYPES = ['All', 'Dogs', 'Cats', 'Birds', 'Fish', 'Small Pets', 'Reptiles'];

export default function DealsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [activePetType, setActivePetType] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getProducts({ isDeal: true, limit: 20, status: 'PUBLISHED' });
      setAllProducts(res.data);
    } catch (e) {
      console.error(e);
      setError('Unable to load deals right now. Please try again shortly.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDeals();
  }, [fetchDeals]);

  const filteredProducts =
    activePetType === 'All'
      ? allProducts
      : allProducts.filter(
          (p) =>
            p.petType?.toLowerCase() === activePetType.toLowerCase()
        );

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-primary py-16 lg:py-20 mb-16">
        <div className="editorial-container">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mb-4 block">
                Updated Daily
              </span>
              <h1 className="font-display text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                Today&apos;s Best Pet Deals
              </h1>
              <p className="text-white/60 font-body text-lg leading-relaxed">
                Hand-picked deals on top-rated pet products, updated daily
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="editorial-container">
        {/* Filter bar */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-border-light">
            {PET_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setActivePetType(type)}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activePetType === type
                    ? 'bg-primary text-white'
                    : 'bg-white text-text-secondary border border-border-light hover:border-accent hover:text-accent'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="font-body text-text-secondary mb-4" role="alert">{error}</p>
            <button onClick={fetchDeals} className="btn-primary text-sm">
              Try Again
            </button>
          </div>
        )}

        {/* Loading skeleton */}
        {!error && loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse border border-border-light" />
            ))}
          </div>
        )}

        {/* Deals grid */}
        {!error && !loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.04}>
                <DealCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!error && !loading && filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl" aria-hidden="true">🐾</span>
            </div>
            <h2 className="font-display text-2xl text-primary mb-3">
              {activePetType === 'All' ? 'No deals right now' : `No ${activePetType} deals right now`}
            </h2>
            <p className="text-text-secondary font-body max-w-md mx-auto">
              Check back soon — we update our deals daily with the best hand-picked offers for your pets.
            </p>
            {activePetType !== 'All' && (
              <button
                onClick={() => setActivePetType('All')}
                className="btn-outline mt-6 text-sm"
              >
                View All Deals
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DealCard({ product }: { product: Product }) {
  const hasDiscount =
    product.price !== undefined &&
    product.originalPrice !== undefined &&
    product.originalPrice > product.price;

  const savingsPct = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price!) / product.originalPrice!) * 100
      )
    : null;

  return (
    <article className="card-hover bg-white rounded-2xl border border-border-light overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full aspect-[4/3] bg-background overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl" aria-hidden="true">🐾</span>
          </div>
        )}
        {/* Savings badge */}
        {savingsPct && (
          <div className="absolute top-3 left-3 bg-accent text-white text-xs font-body font-bold px-2.5 py-1 rounded-full shadow-sm">
            -{savingsPct}%
          </div>
        )}
        {/* Deal badge */}
        {product.isDeal && (
          <div className="absolute top-3 right-3 bg-primary text-white text-xs font-body font-semibold px-2.5 py-1 rounded-full shadow-sm">
            Deal
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Pet type tag */}
        {product.petType && (
          <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
            {product.petType}
          </span>
        )}

        {/* Product name */}
        <h3 className="font-display text-base font-semibold text-primary leading-snug line-clamp-2">
          {product.title}
        </h3>

        {/* Star rating */}
        {product.rating !== undefined && (
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            size="sm"
          />
        )}

        {/* Pricing */}
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          size="sm"
          showSavings={false}
        />

        {/* Countdown */}
        {product.isDeal && product.dealExpiry && (
          <DealCountdown expiryDate={product.dealExpiry} />
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-primary w-full text-center text-sm block"
          >
            Get This Deal
          </a>
        </div>
      </div>
    </article>
  );
}
