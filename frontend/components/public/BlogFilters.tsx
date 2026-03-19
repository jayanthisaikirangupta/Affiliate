'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const TYPE_FILTERS = [
  { label: 'All', value: '' },
  { label: "Buyer's Guides", value: 'buyers-guide' },
  { label: 'Comparisons', value: 'comparison' },
  { label: 'Blog Posts', value: 'blog-post' },
  { label: 'News', value: 'news' },
] as const;

const PET_FILTERS = [
  { label: 'All Pets', value: '' },
  { label: 'Dogs', value: 'dogs' },
  { label: 'Cats', value: 'cats' },
  { label: 'Small Pets', value: 'small-pets' },
  { label: 'Birds', value: 'birds' },
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
        className="flex flex-wrap gap-2 pb-4 border-b border-border-light"
        role="tablist"
        aria-label="Filter by article type"
      >
        {TYPE_FILTERS.map(({ label, value }) => (
          <button
            key={value || 'all'}
            role="tab"
            aria-selected={activeType === value}
            onClick={() => handleTypeChange(value)}
            className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
              activeType === value
                ? 'bg-primary text-white shadow-sm'
                : 'bg-background text-text-secondary border border-border-light hover:border-accent/30 hover:text-primary'
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
            className={`px-4 py-1.5 rounded-full text-xs font-body font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
              activePetType === value
                ? 'bg-accent text-white shadow-sm'
                : 'bg-background text-text-secondary border border-border-light hover:border-accent/30 hover:text-primary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
