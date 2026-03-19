'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const PET_TYPES = [
  { label: 'All', value: '' },
  { label: 'Dogs', value: 'dogs' },
  { label: 'Cats', value: 'cats' },
  { label: 'Small Pets', value: 'small-pets' },
  { label: 'Birds', value: 'birds' },
  { label: 'Fish', value: 'fish' },
];

const PRICE_RANGES = [
  { label: 'Any Price', minPrice: '', maxPrice: '' },
  { label: 'Under £25', minPrice: '', maxPrice: '25' },
  { label: '£25 – £50', minPrice: '25', maxPrice: '50' },
  { label: '£50 – £100', minPrice: '50', maxPrice: '100' },
  { label: 'Over £100', minPrice: '100', maxPrice: '' },
];

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating_desc' },
];

interface ProductFiltersProps {
  total: number;
  view: 'grid' | 'list';
  onViewChange: (v: 'grid' | 'list') => void;
}

export default function ProductFilters({ total, view, onViewChange }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') || 'newest';
  const currentPetType = searchParams.get('petType') || '';
  const currentMinPrice = searchParams.get('minPrice') || '';
  const currentMaxPrice = searchParams.get('maxPrice') || '';

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      // Reset to page 1 on any filter change
      params.delete('page');
      Object.entries(updates).forEach(([key, value]) => {
        if (value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const activePriceRange = PRICE_RANGES.find(
    (r) => r.minPrice === currentMinPrice && r.maxPrice === currentMaxPrice
  );

  return (
    <div className="space-y-6 mb-10 pb-8 border-b border-border-light">
      {/* Row 1: Pet type tabs + view toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Pet type tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by pet type">
          {PET_TYPES.map((pet) => (
            <button
              key={pet.value}
              role="tab"
              aria-selected={currentPetType === pet.value}
              onClick={() => updateParams({ petType: pet.value })}
              className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                currentPetType === pet.value
                  ? 'bg-primary text-white'
                  : 'bg-white border border-border-light text-text-secondary hover:border-accent hover:text-accent'
              }`}
            >
              {pet.label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div
          className="flex items-center gap-1 border border-border-light rounded-lg p-1 bg-white"
          role="group"
          aria-label="View style"
        >
          <button
            onClick={() => onViewChange('grid')}
            aria-label="Grid view"
            aria-pressed={view === 'grid'}
            className={`p-2 rounded-md transition-colors ${
              view === 'grid'
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => onViewChange('list')}
            aria-label="List view"
            aria-pressed={view === 'list'}
            className={`p-2 rounded-md transition-colors ${
              view === 'list'
                ? 'bg-primary text-white'
                : 'text-text-muted hover:text-primary'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Row 2: Price range + sort + count */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Price range pills */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by price range">
          {PRICE_RANGES.map((range) => {
            const isActive =
              range.minPrice === currentMinPrice && range.maxPrice === currentMaxPrice;
            return (
              <button
                key={range.label}
                onClick={() =>
                  updateParams({ minPrice: range.minPrice, maxPrice: range.maxPrice })
                }
                className={`px-3 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border-light text-text-secondary hover:border-accent hover:text-accent'
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>

        {/* Right: sort + product count */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Product count */}
          <span className="text-sm font-body text-text-muted whitespace-nowrap">
            Showing{' '}
            <span className="font-semibold text-text-secondary">{total.toLocaleString()}</span>{' '}
            {total === 1 ? 'product' : 'products'}
          </span>

          {/* Sort dropdown */}
          <div className="relative">
            <label htmlFor="sort-select" className="sr-only">
              Sort products
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => updateParams({ sort: e.target.value })}
              className="appearance-none pl-3 pr-8 py-2 text-sm font-body text-text-secondary bg-white border border-border-light rounded-lg hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 cursor-pointer transition-colors"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-text-muted">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Active filter pills (when non-default filters are applied) */}
      {(currentPetType || currentMinPrice || currentMaxPrice || currentSort !== 'newest') && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-body text-text-muted">Active:</span>
          {currentPetType && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-body font-medium rounded-full">
              {PET_TYPES.find((p) => p.value === currentPetType)?.label ?? currentPetType}
              <button
                aria-label="Remove pet type filter"
                onClick={() => updateParams({ petType: '' })}
                className="hover:text-accent"
              >
                ×
              </button>
            </span>
          )}
          {(currentMinPrice || currentMaxPrice) && activePriceRange && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-body font-medium rounded-full">
              {activePriceRange.label}
              <button
                aria-label="Remove price filter"
                onClick={() => updateParams({ minPrice: '', maxPrice: '' })}
                className="hover:text-accent-dark"
              >
                ×
              </button>
            </span>
          )}
          {currentSort !== 'newest' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-border-light text-text-secondary text-xs font-body font-medium rounded-full">
              {SORT_OPTIONS.find((s) => s.value === currentSort)?.label ?? currentSort}
              <button
                aria-label="Remove sort"
                onClick={() => updateParams({ sort: 'newest' })}
                className="hover:text-primary"
              >
                ×
              </button>
            </span>
          )}
          <button
            onClick={() =>
              router.push('/products')
            }
            className="text-xs font-body text-text-muted hover:text-accent underline underline-offset-2 ml-1"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
