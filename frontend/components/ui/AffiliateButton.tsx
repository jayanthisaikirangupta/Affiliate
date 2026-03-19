'use client';

interface AffiliateLink {
  retailer: string;
  url: string;
  price?: string;
}

interface AffiliateButtonProps {
  link: AffiliateLink;
  productId?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function AffiliateButton({ link, productId, variant = 'primary', size = 'md', className = '' }: AffiliateButtonProps) {
  const handleClick = () => {
    if (productId) {
      fetch(`${API_URL}/analytics/click/${productId}`, { method: 'POST' }).catch(() => {});
    }
    window.open(link.url, '_blank', 'noopener noreferrer');
  };

  const sizeClasses = { sm: 'px-4 py-2 text-xs', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' };
  const variantClasses = {
    primary: 'bg-accent text-white hover:bg-accent-dark',
    secondary: 'bg-primary text-white hover:bg-primary/90',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 font-body font-semibold tracking-wide uppercase rounded-full transition-all duration-200 active:scale-[0.98] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <span>{link.retailer}{link.price && ` — ${link.price}`}</span>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </button>
  );
}
