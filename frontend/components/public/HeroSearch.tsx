'use client';

import { useState, useRef, type FormEvent, type KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmed = query.trim();
      if (!trimmed) return;
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search products and guides"
      className="flex items-center w-full max-w-xl bg-white rounded-full shadow-xl border border-warm-300 overflow-hidden focus-within:ring-2 focus-within:ring-amber-500/20 focus-within:border-amber-500 transition-all"
    >
      <label htmlFor="hero-search-input" className="sr-only">
        Search products and guides
      </label>
      {/* Search icon */}
      <div className="pl-5 pr-2 flex-shrink-0 text-navy-500" aria-hidden="true">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        ref={inputRef}
        id="hero-search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search dog beds, cat food, leads..."
        className="flex-1 py-3.5 pr-2 text-sm font-body text-navy-900 placeholder:text-navy-400 bg-transparent outline-none"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="bg-amber-500 text-white hover:bg-amber-600 rounded-full m-1.5 px-6 py-2.5 text-xs font-bold whitespace-nowrap flex-shrink-0 transition-colors"
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}
