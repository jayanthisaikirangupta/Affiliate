'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Category } from '@/lib/types';

// Fallback pet definitions used when API has no categories
const FALLBACK_PETS = [
  { id: 'dog-supplies', name: 'Dog Supplies', slug: 'dog-supplies', emoji: '🐕', bg: '#FFF3E8', border: 'rgba(245,130,32,0.15)' },
  { id: 'cat-products', name: 'Cat Products', slug: 'cat-products', emoji: '🐈', bg: '#FFF8F0', border: 'rgba(245,130,32,0.12)' },
  { id: 'bird-supplies', name: 'Bird Supplies', slug: 'bird-supplies', emoji: '🦜', bg: '#F3FBF0', border: 'rgba(100,180,80,0.15)' },
  { id: 'fish-and-aquatics', name: 'Fish & Aquatics', slug: 'fish-and-aquatics', emoji: '🐠', bg: '#EFF6FF', border: 'rgba(59,130,246,0.12)' },
  { id: 'small-pets', name: 'Small Pets', slug: 'small-pets', emoji: '🐹', bg: '#FFF0F5', border: 'rgba(236,72,153,0.12)' },
  { id: 'pet-health', name: 'Pet Health', slug: 'pet-health', emoji: '💊', bg: '#F0FFF4', border: 'rgba(34,197,94,0.12)' },
];

const PET_META = [
  { emoji: '🐕', bg: '#FFF3E8', border: 'rgba(245,130,32,0.15)' },
  { emoji: '🐈', bg: '#FFF8F0', border: 'rgba(245,130,32,0.12)' },
  { emoji: '🦜', bg: '#F3FBF0', border: 'rgba(100,180,80,0.15)' },
  { emoji: '🐠', bg: '#EFF6FF', border: 'rgba(59,130,246,0.12)' },
  { emoji: '🐹', bg: '#FFF0F5', border: 'rgba(236,72,153,0.12)' },
  { emoji: '🦎', bg: '#F0FFF4', border: 'rgba(34,197,94,0.12)' },
];

interface PetParadeCarouselProps {
  categories: Category[];
}

export default function PetParadeCarousel({ categories }: PetParadeCarouselProps) {
  const [paused, setPaused] = useState(false);
  // Build the item list — use real categories if available, otherwise fallbacks
  const items =
    categories.length > 0
      ? categories.map((cat, i) => {
          const meta = PET_META[i % PET_META.length];
          return {
            id: String(cat.id),
            name: cat.name,
            slug: cat.slug,
            count: cat._count?.products ?? 0,
            emoji: meta.emoji,
            bg: meta.bg,
            border: meta.border,
          };
        })
      : FALLBACK_PETS.map((p) => ({ ...p, count: 0 }));

  // Ensure we always have at least 6 items for a full-looking carousel
  const padded =
    items.length < 6
      ? [
          ...items,
          ...FALLBACK_PETS.slice(items.length, 6).map((p) => ({ ...p, count: 0 })),
        ]
      : items;

  // Triple the array for a seamless infinite loop: [A,B,C] → [A,B,C,A,B,C,A,B,C]
  // CSS animation translateX(-33.333%) moves exactly one set width
  const looped = [...padded, ...padded, ...padded];

  // Duration scales with number of items so speed stays consistent
  const durationSeconds = padded.length * 4.5;

  return (
    <div
      className="relative overflow-hidden"
      aria-label="Browse pet categories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Left fade mask */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #FAF8F5, transparent)' }}
        aria-hidden="true"
      />
      {/* Right fade mask */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #FAF8F5, transparent)' }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div
        className="flex gap-4 py-3"
        style={{
          width: 'max-content',
          animation: `pet-parade ${durationSeconds}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {looped.map((item, idx) => (
          <Link
            key={`${item.id}-${idx}`}
            href={`/categories/${item.slug}`}
            className="flex-shrink-0 flex flex-col items-center gap-3 w-44 py-7 px-4 rounded-2xl
                       border shadow-sm relative overflow-hidden
                       hover:shadow-hover hover:-translate-y-1.5 hover:scale-[1.03]
                       transition-all duration-300"
            style={{
              background: item.bg,
              borderColor: item.border,
            }}
            tabIndex={idx >= padded.length && idx < padded.length * 2 ? 0 : -1}
          >
            {/* Emoji */}
            <span
              className="text-5xl leading-none select-none"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))' }}
            >
              {item.emoji}
            </span>

            {/* Name */}
            <span className="font-body text-sm font-bold text-navy-900 text-center leading-snug">
              {item.name}
            </span>

            {/* Count */}
            {item.count > 0 && (
              <span className="font-body text-xs text-warm-600">
                {item.count} {item.count === 1 ? 'product' : 'products'}
              </span>
            )}

            {/* Subtle arrow — always subtle, slightly visible */}
            <span
              className="absolute bottom-3 right-4 text-xs font-bold text-amber-500/40"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes pet-parade {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-33.333%); }
            }
          `,
        }}
      />
    </div>
  );
}
