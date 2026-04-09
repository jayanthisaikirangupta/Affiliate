'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TrustBarProps {
  authorName?: string;
  authorPhoto?: string;
  authorCredentials?: string;
  reviewerName?: string;
  reviewerCredentials?: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime?: number;
}

const fmt = (d?: string) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;

export default function TrustBar({ authorName, authorPhoto, authorCredentials, reviewerName, reviewerCredentials, publishedAt, updatedAt, readTime }: TrustBarProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-warm-200 rounded-xl overflow-hidden">
      <div className="flex flex-wrap items-center gap-8 px-5 py-4">
        <div className="flex items-center gap-1.5 text-sm font-body text-navy-700">
          <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Research-driven
        </div>
        {fmt(publishedAt) && <span className="text-sm font-body text-navy-700">Published: {fmt(publishedAt)}</span>}
        {fmt(updatedAt) && <span className="text-sm font-body text-navy-700">Updated: {fmt(updatedAt)}</span>}
        {readTime && <span className="text-sm font-body text-navy-700">{readTime} min read</span>}
        <button onClick={() => setExpanded(!expanded)} className="ml-auto text-sm font-body font-semibold text-orange-500 hover:underline">
          {expanded ? 'Less ▲' : 'Why trust us? ▼'}
        </button>
      </div>
      {expanded && (
        <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {authorName && (
            <div className="flex items-start gap-3">
              {authorPhoto ? (
                <img src={authorPhoto} alt={authorName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-navy-500">{authorName.charAt(0)}</span>
                </div>
              )}
              <div>
                <p className="text-sm font-body font-semibold text-navy-900">Written by {authorName}</p>
                {authorCredentials && <p className="text-xs font-body text-navy-500">{authorCredentials}</p>}
              </div>
            </div>
          )}
          {reviewerName && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-700 text-xs font-semibold">✓</span>
              </div>
              <div>
                <p className="text-sm font-body font-semibold text-navy-900">Reviewed by {reviewerName}</p>
                {reviewerCredentials && <p className="text-xs font-body text-navy-500">{reviewerCredentials}</p>}
              </div>
            </div>
          )}
          <div className="sm:col-span-2 pt-2 border-t border-warm-300">
            <p className="text-xs font-body text-navy-500">
              PetGearHub may earn a commission from links on this page at no extra cost to you.{' '}
              <Link href="/affiliate-disclosure" className="text-orange-500 underline hover:no-underline">Learn more</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
