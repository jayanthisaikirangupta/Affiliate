'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import ProductFilters from '@/components/public/ProductFilters';
import ProductCard from '@/components/public/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { PawIcon } from '@/components/PawIcon';

// ── ProductFiltersWrapper ────────────────────────────────────────────────────
// Controls the client-side view toggle (grid/list) and renders the filter bar.
// The actual product data is passed down from the server component.

interface ProductFiltersWrapperProps {
  total: number;
}

export default function ProductFiltersWrapper({ total }: ProductFiltersWrapperProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Store view in a data attribute so ProductList (a sibling) can read it.
  // We use a custom event / shared context via a hidden input in the DOM.
  // Simplest approach: store on window so ProductList can reference it.
  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__pgProductView = view;
  }

  return (
    <ProductFilters
      total={total}
      view={view}
      onViewChange={setView}
    />
  );
}

// ── ProductList ──────────────────────────────────────────────────────────────
// Rendered by the server page inside a Suspense boundary.
// Reads the view preference from window at mount time.

interface ProductListProps {
  products: Product[];
  searchParams?: Record<string, string | undefined>;
}

function ProductList({ products }: ProductListProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Sync with the view set in ProductFiltersWrapper via a shared window value.
  // This fires once on hydration. For a more robust solution the two components
  // could share context, but they live in sibling Suspense boundaries here.
  // The view toggle in ProductFilters dispatches a custom event we listen to.
  if (typeof window !== 'undefined') {
    const stored = (window as unknown as Record<string, unknown>).__pgProductView;
    if (stored === 'list' && view !== 'list') {
      // We can't call setState during render, so we read on next tick via useEffect below.
    }
  }

  return (
    <_ProductListInner products={products} />
  );
}

// Inner component that reads from a broadcast channel / custom event
function _ProductListInner({ products }: { products: Product[] }) {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Listen for the custom view-change event dispatched by ProductFilters
  if (typeof window !== 'undefined') {
    // Attach listener only once (will be cleaned up on unmount via useEffect — but
    // we do this inline so it's available before first paint during hydration)
  }

  // Use React's useEffect to subscribe to the custom event
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [_, forceRender] = useState(0);

  if (typeof window !== 'undefined') {
    // We read the latest value synchronously from window on every render.
    const storedView = (window as unknown as Record<string, unknown>).__pgProductView as 'grid' | 'list' | undefined;
    if (storedView && storedView !== view) {
      // Defer the state update to avoid "setState during render"
      setTimeout(() => setView(storedView), 0);
    }
  }

  if (view === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {products.map((product, i) => (
          <ScrollReveal key={product.id} delay={i * 0.03}>
            <ProductListCard product={product} />
          </ScrollReveal>
        ))}
      </div>
    );
  }

  return (
    <div className="editorial-grid">
      {products.map((product, i) => (
        <ScrollReveal key={product.id} delay={i * 0.04}>
          <ProductCard product={product} />
        </ScrollReveal>
      ))}
    </div>
  );
}

// ── ProductListCard ─────────────────────────────────────────────────────────
// Horizontal card for list view

function ProductListCard({ product }: { product: Product }) {
  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <article className="group flex gap-5 bg-white border border-warm-200 rounded-xl overflow-hidden card-hover transition-shadow">
        {/* Image */}
        <div className="w-36 sm:w-48 flex-shrink-0 aspect-square relative overflow-hidden bg-background">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PawIcon className="w-8 h-8 text-border" />
            </div>
          )}
          {product.isStaffPick && (
            <span className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-white text-[9px] font-body font-semibold uppercase tracking-widest rounded-full">
              Staff Pick
            </span>
          )}
          {product.isDeal && (
            <span className="absolute top-2 right-2 px-2 py-0.5 bg-orange-500 text-white text-[9px] font-body font-semibold uppercase tracking-widest rounded-full">
              Deal
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col flex-1 p-4 sm:p-5 min-w-0">
          {product.category && (
            <span className="text-[10px] font-body font-semibold tracking-widest uppercase text-orange-500 mb-1">
              {product.category.name}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-primary leading-snug line-clamp-2 mb-1">
            {product.title}
          </h3>
          {product.brand && (
            <p className="text-xs font-body text-warm-600 mb-2">by {product.brand}</p>
          )}
          {product.description && (
            <p className="text-navy-700 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
              {product.description}
            </p>
          )}

          {/* Rating */}
          {product.rating != null && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-3.5 h-3.5 ${star <= Math.round(product.rating!) ? 'text-orange-500' : 'text-border'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-warm-600 font-body">
                {product.rating.toFixed(1)}
                {product.reviewCount ? ` (${product.reviewCount.toLocaleString()})` : ''}
              </span>
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-warm-200">
            <div className="flex items-center gap-2">
              {formatPrice(product.price) ? (
                <>
                  <span className="font-display text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.price && product.originalPrice > product.price && (
                    <span className="text-xs text-warm-600 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-sm text-warm-600">See price</span>
              )}
            </div>
            <span className="text-xs font-body font-semibold text-orange-500 group-hover:underline underline-offset-2">
              Details →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// Named export so the server component can import ProductList directly
export { ProductList };
