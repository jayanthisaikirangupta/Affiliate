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

  const sizeClasses = { sm: 'px-4 py-2 text-xs min-h-[36px]', md: 'px-6 py-3 text-sm min-h-[48px]', lg: 'px-8 py-4 text-base min-h-[48px]' };
  const variantClasses = {
    primary: 'bg-amber-500 text-white font-bold hover:bg-amber-600 hover:shadow-[0_4px_16px_rgba(212,118,60,0.3)] hover:-translate-y-px',
    secondary: 'bg-navy-900 text-white font-bold hover:bg-navy-800',
    outline: 'border-2 border-amber-500 text-amber-500 font-bold hover:bg-amber-500 hover:text-white',
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Buy from ${link.retailer} (opens in new tab)`}
      className={`inline-flex items-center justify-center gap-2 font-body tracking-wide uppercase rounded-lg transition-all duration-200 active:translate-y-0 active:scale-[0.98] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <span>{link.retailer}{link.price && ` — ${link.price}`}</span>
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </button>
  );
}
