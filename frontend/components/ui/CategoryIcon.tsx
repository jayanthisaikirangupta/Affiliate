import { Dog, Cat, Bird, Fish, Rabbit, Bone, HeartPulse, PawPrint } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  'dog-supplies': Dog, 'dogs': Dog,
  'cat-products': Cat, 'cats': Cat,
  'bird-supplies': Bird, 'birds': Bird,
  'fish-aquatics': Fish, 'fish': Fish,
  'small-pets': Rabbit,
  'pet-accessories': Bone,
  'pet-health': HeartPulse,
};

export default function CategoryIcon({ slug, className = '', size = 'md' }: { slug: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const IconComponent = icons[slug] || PawPrint;
  return (
    <div className={`${sizes[size]} text-accent ${className}`} aria-hidden="true">
      <IconComponent className="w-full h-full" strokeWidth={1.5} />
    </div>
  );
}
