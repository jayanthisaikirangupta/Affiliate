'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const TYPE_FILTERS = [
  { label: 'All', value: '' },
  { label: "Buyer's Guides", value: 'buyers-guide' },
  { label: 'Comparisons', value: 'comparison' },
  { label: 'Tips & Advice', value: 'blog-post' },
  { label: 'News', value: 'news' },
] as const;

const PET_FILTERS = [
  { label: 'All Pets', value: '' },
  { label: 'Dogs', value: 'dog' },
  { label: 'Cats', value: 'cat' },
  { label: 'Small Pets', value: 'small-pet' },
  { label: 'Birds', value: 'bird' },
  { label: 'Fish', value: 'fish' },
] as const;

interface BlogFiltersProps {
  activeType: string;
  activePetType: string;
}

export default function BlogFilters({ activeType, activePetType }: BlogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      // Reset to page 1 whenever filters change
      params.delete('page');
      return params.toString();
    },
    [searchParams]
  );

  const handleTypeChange = (value: string) => {
    const qs = createQueryString({ type: value });
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  const handlePetTypeChange = (value: string) => {
    const qs = createQueryString({ petType: value });
    router.push(`${pathname}${qs ? `?${qs}` : ''}`);
  };

  return (
    <div className="space-y-4 mb-10">
      {/* Article type tabs */}
      <div
        className="flex flex-wrap gap-2 pb-4 border-b border-warm-200"
        role="tablist"
        aria-label="Filter by article type"
      >
        {TYPE_FILTERS.map(({ label, value }) => (
          <button
            key={value || 'all'}
            role="tab"
            aria-selected={activeType === value}
            onClick={() => handleTypeChange(value)}
            className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 ${
              activeType === value
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-navy-700 border border-warm-300 hover:border-orange-500 hover:text-orange-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pet type filter row */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by pet type"
      >
        {PET_FILTERS.map(({ label, value }) => (
          <button
            key={value || 'all-pets'}
            onClick={() => handlePetTypeChange(value)}
            aria-pressed={activePetType === value}
            className={`px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 ${
              activePetType === value
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white text-navy-700 border border-warm-300 hover:border-orange-500 hover:text-orange-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
