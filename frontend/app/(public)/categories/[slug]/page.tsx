'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProductCard from '@/components/public/ProductCard';
import api from '@/lib/api';
import type { CategoryWithProducts } from '@/lib/api';
import type { Product } from '@/lib/types';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [category, setCategory] = useState<CategoryWithProducts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    api
      .getCategory(slug)
      .then(setCategory)
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : 'Failed to load category.';
        setError(msg);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-28 pb-24">
        <div className="editorial-container">
          <div className="h-10 w-64 bg-white rounded animate-pulse mb-8" />
          <div className="editorial-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-white rounded-xl animate-pulse" />
            ))}
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
          <Link href="/products" className="btn-primary">Browse All Products</Link>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="pt-28 pb-24 text-center">
        <div className="editorial-container">
          <h1 className="font-display text-3xl text-primary mb-4">Category Not Found</h1>
          <Link href="/products" className="btn-primary">Browse All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="editorial-container">
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <Link href="/products" className="text-sm font-body text-text-muted hover:text-accent transition-colors mb-4 inline-block">
              ← All Products
            </Link>
            <span className="block text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent mt-4">
              Category
            </span>
            <h1 className="font-display text-hero text-primary mt-3 mb-4">{category.name}</h1>
            {category.description && (
              <p className="text-text-secondary font-body text-lg">{category.description}</p>
            )}
          </div>
        </ScrollReveal>

        {category.products && category.products.length > 0 ? (
          <div className="editorial-grid">
            {category.products.map((product: Product, i: number) => (
              <ScrollReveal key={product.id} delay={i * 0.04}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary font-body">No products in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
