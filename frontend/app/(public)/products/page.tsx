'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProductCard from '@/components/public/ProductCard';
import api from '@/lib/api';
import type { Product, Category } from '@/lib/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (page = 1, categoryId = '') => {
    setLoading(true);
    setError(null);
    try {
      const params: Record<string, string | number | boolean> = {
        page,
        limit: 12,
        status: 'PUBLISHED',
      };
      if (categoryId) params.categoryId = categoryId;
      const res = await api.getProducts(params);
      setProducts(res.data);
      setMeta({ total: res.meta.total, page: res.meta.page, totalPages: res.meta.totalPages });
    } catch (e) {
      console.error(e);
      setError('Failed to load products. Please try again.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryFilter = (categoryId: string) => {
    setActiveCategory(categoryId);
    fetchProducts(1, categoryId);
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="editorial-container">
        {/* Page header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-accent">
              The Collection
            </span>
            <h1 className="font-display text-hero text-primary mt-3 mb-4">
              All Products
            </h1>
            <p className="text-text-secondary font-body text-lg">
              Every product reviewed and recommended by our editorial team.
            </p>
          </div>
        </ScrollReveal>

        {/* Category filters */}
        {categories.length > 0 && (
          <ScrollReveal>
            <div className="flex flex-wrap gap-3 mb-12 pb-8 border-b border-border-light">
              <button
                onClick={() => handleCategoryFilter('')}
                className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeCategory === ''
                    ? 'bg-primary text-white'
                    : 'bg-background text-text-secondary hover:bg-border-light'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-background text-text-secondary hover:bg-border-light'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="font-body text-text-secondary mb-4" role="alert">{error}</p>
            <button
              onClick={() => fetchProducts(1, activeCategory)}
              className="btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Product grid */}
        {!error && (loading ? (
          <div className="editorial-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-border-light" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="editorial-grid">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.04}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>

            {/* Pagination */}
            {meta.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-16">
                {Array.from({ length: meta.totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => fetchProducts(i + 1, activeCategory)}
                    className={`w-10 h-10 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                      meta.page === i + 1
                        ? 'bg-accent text-white'
                        : 'bg-background text-text-secondary hover:bg-border-light'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-display text-xl text-primary mb-2">No products yet</h3>
            <p className="text-text-secondary font-body">
              Products will appear here once published from the admin panel.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
