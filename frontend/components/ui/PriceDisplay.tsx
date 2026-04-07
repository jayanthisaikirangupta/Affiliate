interface PriceDisplayProps {
  price?: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg';
  showSavings?: boolean;
}

function formatGBP(price: number): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(price);
}

export default function PriceDisplay({ price, originalPrice, size = 'md', showSavings = true }: PriceDisplayProps) {
  if (!price) return <span className="text-sm text-warm-500 font-body">See price on retailer</span>;

  const savings = originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const priceClasses = { sm: 'text-lg font-bold', md: 'text-2xl font-bold', lg: 'text-4xl font-bold' };

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={`font-display ${priceClasses[size]} text-navy-900`}>{formatGBP(price)}</span>
      {originalPrice && originalPrice > price && (
        <span className="text-sm text-warm-500 line-through font-body">{formatGBP(originalPrice)}</span>
      )}
      {showSavings && savings && (
        <span className="px-2 py-0.5 bg-success text-white text-xs font-bold font-body rounded-full">
          Save {savings}%
        </span>
      )}
    </div>
  );
}
