const icons: Record<string, string> = {
  'dog-supplies': '🐕', 'dogs': '🐕',
  'cat-products': '🐈', 'cats': '🐈',
  'bird-supplies': '🦜', 'birds': '🦜',
  'fish-aquatics': '🐠', 'fish': '🐠', 'fish-aquatics': '🐠',
  'small-pets': '🐹',
  'pet-accessories': '🎾',
  'pet-health': '💊',
};

export default function CategoryIcon({ slug, className = '', size = 'md' }: { slug: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-xl', md: 'text-3xl', lg: 'text-5xl' };
  return <span className={`${sizes[size]} ${className}`} role="img" aria-hidden="true">{icons[slug] || '🐾'}</span>;
}
