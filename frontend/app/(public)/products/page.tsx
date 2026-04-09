import { Suspense } from 'react';
import type { Product } from '@/lib/types';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ProductCard from '@/components/public/ProductCard';
import ProductFiltersWrapper, { ProductList } from './_components/ProductFiltersWrapper';
import { PawIcon } from '@/components/PawIcon';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Map UI sort values to API params
const SORT_MAP: Record<string, Record<string, string>> = {
  newest: { sortBy: 'createdAt', sortOrder: 'desc' },
  price_asc: { sortBy: 'price', sortOrder: 'asc' },
  price_desc: { sortBy: 'price', sortOrder: 'desc' },
  rating_desc: { sortBy: 'rating', sortOrder: 'desc' },
};

interface SearchParams {
  page?: string;
  sort?: string;
  petType?: string;
  minPrice?: string;
  maxPrice?: string;
  categoryId?: string;
}

async function fetchProducts(searchParams: SearchParams): Promise<{
  data: Product[];
  meta: { total: number; page: number; totalPages: number };
}> {
  const {
    page = '1',
    sort = 'newest',
    petType,
    minPrice,
    maxPrice,
    categoryId,
  } = searchParams;

  const sortParams = SORT_MAP[sort] ?? SORT_MAP.newest;

  const params = new URLSearchParams({
    page,
    limit: '12',
    status: 'PUBLISHED',
    ...sortParams,
  });

  if (petType) params.set('petType', petType);
  if (minPrice) params.set('minPrice', minPrice);
  if (maxPrice) params.set('maxPrice', maxPrice);
  if (categoryId) params.set('categoryId', categoryId);

  try {
    const res = await fetch(`${API_URL}/products?${params}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch {
    return { data: [], meta: { total: 0, page: 1, totalPages: 1 } };
  }
}

interface PageProps {
  searchParams: SearchParams;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const { data: products, meta } = await fetchProducts(searchParams);

  const currentPage = Number(searchParams.page ?? 1);

  return (
    <div className="pt-24 lg:pt-32 pb-24">
      <div className="editorial-container">

        {/* Page header */}
        <ScrollReveal>
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-body font-semibold tracking-[0.25em] uppercase text-orange-500">
              The Collection
            </span>
            <h1 className="font-display text-hero text-navy-900 mt-3 mb-4">
              All Products
            </h1>
            <p className="text-navy-700 font-body text-lg">
              Every product reviewed and recommended by our editorial team.
            </p>
          </div>
        </ScrollReveal>

        {/* Filters — client island wrapped in Suspense */}
        <Suspense fallback={<div className="h-24 animate-pulse bg-white rounded-xl border border-warm-200 mb-10" />}>
          <ProductFiltersWrapper total={meta.total} />
        </Suspense>

        {/* Product grid / list */}
        {products.length > 0 ? (
          <ProductsGrid products={products} searchParams={searchParams} />
        ) : (
          <div className="text-center py-20">
            <h3 className="font-display text-xl text-navy-900 mb-2">No products found</h3>
            <p className="text-navy-700 font-body mb-6">
              Try adjusting your filters or browse the full collection.
            </p>
            <Link href="/products" className="btn-primary text-sm">
              Clear Filters
            </Link>
          </div>
        )}

        {/* Pagination */}
        {meta.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={meta.totalPages}
            searchParams={searchParams}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────────── */

function ProductsGrid({
  products,
  searchParams,
}: {
  products: Product[];
  searchParams: SearchParams;
}) {
  // The view toggle is purely client-side; we render grid by default here on the server.
  // ProductFiltersWrapper controls the view state client-side and swaps the layout.
  return (
    <Suspense fallback={null}>
      <ProductList products={products} />
    </Suspense>
  );
}

function buildPageHref(searchParams: SearchParams, page: number): string {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([k, v]) => {
    if (v && k !== 'page') params.set(k, v);
  });
  params.set('page', String(page));
  return `/products?${params.toString()}`;
}

function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  // Show max 7 pages around the current page
  const pages: (number | 'ellipsis')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }

  return (
    <div className="flex justify-center gap-2 mt-16" aria-label="Pagination">
      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-warm-600 font-body text-sm">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildPageHref(searchParams, p)}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? 'page' : undefined}
            className={`w-10 h-10 rounded-full text-sm font-body font-medium flex items-center justify-center transition-all duration-200 ${
              p === currentPage
                ? 'bg-orange-500 text-white'
                : 'bg-white border border-warm-300 text-navy-700 hover:border-orange-500 hover:text-orange-500'
            }`}
          >
            {p}
          </Link>
        )
      )}
    </div>
  );
}
