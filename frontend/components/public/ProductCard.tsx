'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return null;
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
  };

  const renderStars = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-[#FBBF24]' : 'text-warm-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-navy-500 font-body">
          {rating.toFixed(1)}
          {product.reviewCount ? ` (${product.reviewCount.toLocaleString()})` : ''}
        </span>
      </div>
    );
  };

  if (variant === 'featured') {
    return (
      <Link href={`/products/${product.slug}`}>
        <motion.article
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="group grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl
                     overflow-hidden border border-warm-300 hover:border-orange-300 transition-all duration-200 h-full shadow-card hover:shadow-hover"
        >
          {/* Image */}
          <div className="aspect-[4/3] lg:aspect-auto relative overflow-hidden bg-warm-100">
            {product.images?.[0] ? (
              <>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700
                             group-hover:scale-105"
                />
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-warm-100">
                <svg className="w-10 h-10 text-navy-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <span className="text-xs text-navy-400 font-body">No Image Available</span>
              </div>
            )}
            {product.platform && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-navy-900/80 text-white
                             text-xs font-body font-medium rounded-full capitalize">
                {product.platform}
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-8 lg:py-12 flex flex-col justify-center">
            {product.category && (
              <span className="text-xs font-body font-semibold tracking-widest uppercase text-orange-500 mb-3">
                {product.category.name}
              </span>
            )}
            <h3 className="font-display text-2xl lg:text-3xl font-semibold text-navy-900 mb-3
                          leading-tight line-clamp-2">
              {product.title}
            </h3>
            {product.description && (
              <p className="text-navy-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {product.description}
              </p>
            )}
            {renderStars(product.rating)}
            <div className="mt-6 flex items-center gap-4">
              {formatPrice(product.price) && (
                <span className="font-display text-2xl font-bold text-navy-900">
                  {formatPrice(product.price)}
                </span>
              )}
              {product.originalPrice && product.price && product.originalPrice > product.price && (
                <span className="text-sm text-navy-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="mt-6">
              <span className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors uppercase tracking-wide">
                View Details
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.article
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group bg-white rounded-2xl overflow-hidden border border-warm-300 hover:border-orange-300 hover:-translate-y-1 transition-all duration-200 h-full flex flex-col shadow-card hover:shadow-hover"
      >
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden bg-warm-100">
          {product.images?.[0] ? (
            <>
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-700
                           group-hover:scale-105"
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-warm-100">
              <svg className="w-10 h-10 text-navy-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
              </svg>
              <span className="text-xs text-navy-400 font-body">No Image Available</span>
            </div>
          )}
          {product.platform && (
            <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-navy-900/80 text-white
                           text-xs font-body font-medium rounded-full capitalize">
              {product.platform}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {product.category && (
            <span className="text-xs font-body font-semibold tracking-widest uppercase text-orange-500 mb-2">
              {product.category.name}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold text-navy-900 mb-2 leading-snug line-clamp-2">
            {product.title}
          </h3>
          {product.description && (
            <p className="text-navy-700 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
              {product.description}
            </p>
          )}
          {renderStars(product.rating)}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-warm-300">
            {formatPrice(product.price) ? (
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold text-navy-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.price && product.originalPrice > product.price && (
                  <span className="text-xs text-navy-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-sm text-navy-400">See price</span>
            )}
            <span className="text-xs font-body font-semibold text-orange-500
                           group-hover:text-orange-600 group-hover:underline underline-offset-2 tracking-wide uppercase transition-colors">
              Details
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
